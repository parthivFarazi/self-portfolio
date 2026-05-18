import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Vector3, MathUtils } from 'three';
import {
  CAMERA_DISTANCE,
  CAMERA_LERP,
  CAMERA_PITCH_DEG,
  CAMERA_YAW_DEG,
  CAMERA_ZOOM,
} from '@/constants/world';
import { useGame } from '@/state/gameStore';
import { BUILDINGS, getVisualTopY, footprintHalfExtents, type BuildingDef } from '@/data/buildings';

// Phase 4 polish — gentle "handheld" breathing on the camera target Y, and a
// soft zoom-in when the player approaches any building edge.
const BREATH_FREQ = 0.1;            // Hz
const BREATH_AMPLITUDE = 0.05;      // ±0.05 units
const APPROACH_DISTANCE = 5;        // u from building edge
const APPROACH_ZOOM_MULT = 1.10;    // ~10% closer
const ZOOM_LERP = 2.2;              // smoothing rate (per second)

function distanceToBuildingEdge(px: number, pz: number, b: BuildingDef): number {
  const fp = footprintHalfExtents(b);
  if (!fp) return Math.hypot(px - b.position[0], pz - b.position[2]);
  const dx = Math.max(0, Math.abs(px - b.position[0]) - fp.halfX);
  const dz = Math.max(0, Math.abs(pz - b.position[2]) - fp.halfZ);
  return Math.hypot(dx, dz);
}

const pitch = (CAMERA_PITCH_DEG * Math.PI) / 180;
const yaw = (CAMERA_YAW_DEG * Math.PI) / 180;

// Camera offset relative to target. Looking down-and-in from +x, +y, +z octant.
const OFFSET = new Vector3(
  Math.cos(pitch) * Math.sin(yaw) * CAMERA_DISTANCE,
  Math.sin(pitch) * CAMERA_DISTANCE,
  Math.cos(pitch) * Math.cos(yaw) * CAMERA_DISTANCE,
);

// Vertical bias config — when player is near a tall building, lift the camera
// target Y so the upper portions stay in the orthographic frustum.
const BIAS_THRESHOLD = 12;   // tops below this height don't trigger bias
const BIAS_DAMP = 0.40;      // how much of (top - threshold) to apply at the closest
const BIAS_FALLOFF = 22;     // beyond this many units from a building, bias = 0
const BIAS_LERP = 3.5;       // how quickly the bias eases (per second)

export function IsometricCamera() {
  const camRef = useRef<any>(null);
  const target = useRef(new Vector3());
  const desired = useRef(new Vector3());
  const biasY = useRef(0);
  const zoomCurrent = useRef(CAMERA_ZOOM);
  const { size } = useThree();

  useFrame((state, delta) => {
    if (!camRef.current) return;
    const [px, py, pz] = useGame.getState().playerPosition;

    // Compute the desired bias: max across nearby tall buildings, weighted by
    // proximity. Cosine falloff so it eases in/out smoothly with distance.
    let wantBias = 0;
    let nearestEdge = Infinity;
    for (const b of BUILDINGS) {
      const top = getVisualTopY(b);
      const dx = px - b.position[0];
      const dz = pz - b.position[2];
      const d = Math.hypot(dx, dz);
      if (top > BIAS_THRESHOLD && d < BIAS_FALLOFF) {
        const t = 1 - d / BIAS_FALLOFF;
        const weight = 0.5 - 0.5 * Math.cos(t * Math.PI); // smoothstep-ish
        const candidate = (top - BIAS_THRESHOLD) * BIAS_DAMP * weight;
        if (candidate > wantBias) wantBias = candidate;
      }
      // Approach-zoom edge distance — independent of bias logic.
      const edge = distanceToBuildingEdge(px, pz, b);
      if (edge < nearestEdge) nearestEdge = edge;
    }
    // Smooth ease toward wantBias so transitions aren't snappy.
    biasY.current = MathUtils.damp(biasY.current, wantBias, BIAS_LERP, delta);

    // Approach-zoom: lerp camera.zoom up when close to a building edge.
    const tZoom = MathUtils.clamp(
      (APPROACH_DISTANCE - nearestEdge) / APPROACH_DISTANCE,
      0,
      1,
    );
    // Narrow viewports (mobile) zoom out a touch so buildings stay legible.
    // Drei's OrthographicCamera renders zoom in CSS-pixel space, so a lower
    // multiplier shows more world per pixel.
    const narrow = size.width < 768;
    const mobileMult = narrow ? 0.85 : 1.0;
    const targetZoom = CAMERA_ZOOM * mobileMult * (1 + (APPROACH_ZOOM_MULT - 1) * tZoom);
    zoomCurrent.current = MathUtils.damp(
      zoomCurrent.current,
      targetZoom,
      ZOOM_LERP,
      delta,
    );
    camRef.current.zoom = zoomCurrent.current;

    // Subtle "handheld" breathing — gentle Y wobble on the look-at target.
    const breath = Math.sin(state.clock.getElapsedTime() * BREATH_FREQ * 2 * Math.PI)
      * BREATH_AMPLITUDE;

    target.current.set(px, py + 1 + biasY.current + breath, pz);
    desired.current.copy(target.current).add(OFFSET);

    const t = Math.min(1, delta * CAMERA_LERP);
    camRef.current.position.lerp(desired.current, t);
    camRef.current.lookAt(target.current);
    camRef.current.updateProjectionMatrix();
  });

  // Reasonable frustum derived from zoom; drei recomputes on resize.
  const aspect = size.width / size.height;
  const halfH = CAMERA_DISTANCE / CAMERA_ZOOM;
  const halfW = halfH * aspect;
  void halfW;

  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      zoom={CAMERA_ZOOM}
      near={0.1}
      far={1200}
      position={[OFFSET.x, OFFSET.y, OFFSET.z]}
    />
  );
}
