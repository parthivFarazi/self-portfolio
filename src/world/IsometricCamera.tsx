import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Vector3 } from 'three';
import {
  CAMERA_DISTANCE,
  CAMERA_LERP,
  CAMERA_PITCH_DEG,
  CAMERA_YAW_DEG,
  CAMERA_ZOOM,
} from '@/constants/world';
import { useGame } from '@/state/gameStore';

const pitch = (CAMERA_PITCH_DEG * Math.PI) / 180;
const yaw = (CAMERA_YAW_DEG * Math.PI) / 180;

// Camera offset relative to player. Looking down-and-in from +x, +y, +z octant.
const OFFSET = new Vector3(
  Math.cos(pitch) * Math.sin(yaw) * CAMERA_DISTANCE,
  Math.sin(pitch) * CAMERA_DISTANCE,
  Math.cos(pitch) * Math.cos(yaw) * CAMERA_DISTANCE,
);

export function IsometricCamera() {
  const camRef = useRef<any>(null);
  const target = useRef(new Vector3());
  const desired = useRef(new Vector3());
  const { size } = useThree();

  useFrame((_state, delta) => {
    if (!camRef.current) return;
    const [px, py, pz] = useGame.getState().playerPosition;
    target.current.set(px, py + 1, pz);
    desired.current.copy(target.current).add(OFFSET);

    const t = Math.min(1, delta * CAMERA_LERP);
    camRef.current.position.lerp(desired.current, t);
    camRef.current.lookAt(target.current);
    camRef.current.updateProjectionMatrix();
  });

  // Reasonable frustum derived from zoom; drei will recompute on resize.
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
