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
import { BUILDINGS, getVisualTopY } from '@/data/buildings';

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
  const { size } = useThree();

  useFrame((_state, delta) => {
    if (!camRef.current) return;
    const [px, py, pz] = useGame.getState().playerPosition;

    // Compute the desired bias: max across nearby tall buildings, weighted by
    // proximity. Cosine falloff so it eases in/out smoothly with distance.
    let wantBias = 0;
    for (const b of BUILDINGS) {
      const top = getVisualTopY(b);
      if (top <= BIAS_THRESHOLD) continue;
      const dx = px - b.position[0];
      const dz = pz - b.position[2];
      const d = Math.hypot(dx, dz);
      if (d >= BIAS_FALLOFF) continue;
      const t = 1 - d / BIAS_FALLOFF;
      const weight = 0.5 - 0.5 * Math.cos(t * Math.PI); // smoothstep-ish
      const candidate = (top - BIAS_THRESHOLD) * BIAS_DAMP * weight;
      if (candidate > wantBias) wantBias = candidate;
    }
    // Smooth ease toward wantBias so transitions aren't snappy.
    biasY.current = MathUtils.damp(biasY.current, wantBias, BIAS_LERP, delta);

    target.current.set(px, py + 1 + biasY.current, pz);
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
      far={500}
      position={[OFFSET.x, OFFSET.y, OFFSET.z]}
    />
  );
}
