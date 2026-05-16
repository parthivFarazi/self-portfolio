import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CanvasTexture,
  PlaneGeometry,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  DoubleSide,
} from 'three';

// Painterly drifting clouds — flat alpha-mapped planes high in the sky.
// All clouds share one InstancedMesh; per-frame we update X position so they
// drift slowly westward and loop.

const CLOUD_COUNT = 6;
const DRIFT_SPEED = 0.05;     // units per second
const SKY_X_MIN = -180;
const SKY_X_MAX = 180;
const SKY_HEIGHT = 95;        // y altitude
const SKY_Z_RANGE = 280;      // z half-extent

function makeCloudTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  // Build a soft cloud silhouette by stacking large feathered blobs.
  const blobs = [
    { x: 60, y: 80, r: 50 },
    { x: 110, y: 65, r: 60 },
    { x: 160, y: 75, r: 55 },
    { x: 200, y: 85, r: 45 },
    { x: 85, y: 90, r: 40 },
    { x: 145, y: 95, r: 38 },
  ];
  for (const b of blobs) {
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
    grad.addColorStop(0, 'rgba(255, 250, 240, 0.95)');
    grad.addColorStop(0.5, 'rgba(255, 240, 225, 0.6)');
    grad.addColorStop(1, 'rgba(255, 240, 225, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new CanvasTexture(c);
}

interface CloudData {
  x: number;
  y: number;
  z: number;
  scale: number;
  drift: number;
}

function buildClouds(): CloudData[] {
  // Deterministic spread so reload doesn't shuffle the sky.
  const out: CloudData[] = [];
  for (let i = 0; i < CLOUD_COUNT; i++) {
    const seed = i * 13.37;
    out.push({
      x: ((Math.sin(seed) * 0.5 + 0.5) * (SKY_X_MAX - SKY_X_MIN)) + SKY_X_MIN,
      y: SKY_HEIGHT + Math.sin(seed * 1.7) * 12,
      z: (Math.cos(seed * 0.7) * 0.7) * SKY_Z_RANGE - 40, // bias toward distant horizon
      scale: 26 + Math.cos(seed * 2.3) * 8,
      drift: DRIFT_SPEED * (0.85 + Math.sin(seed * 3.1) * 0.25),
    });
  }
  return out;
}

export function Clouds() {
  const ref = useRef<InstancedMesh>(null);
  const tex = useMemo(makeCloudTexture, []);
  const geom = useMemo(() => new PlaneGeometry(2, 1), []);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        fog: false,
        side: DoubleSide,
      }),
    [tex],
  );
  const dummy = useMemo(() => new Object3D(), []);
  const clouds = useMemo(buildClouds, []);

  useEffect(() => {
    if (!ref.current) return;
    clouds.forEach((c, i) => {
      dummy.position.set(c.x, c.y, c.z);
      dummy.scale.set(c.scale, c.scale * 0.5, 1);
      // Tilt slightly toward the camera (camera looks down at ~30° pitch from
      // the +x/+z octant). Flat planes facing world-up read fine because the
      // orthographic projection keeps them legible.
      dummy.rotation.set(-Math.PI / 6, 0, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [clouds, dummy]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    clouds.forEach((c, i) => {
      c.x += c.drift * delta;
      if (c.x > SKY_X_MAX) c.x = SKY_X_MIN;
      dummy.position.set(c.x, c.y, c.z);
      dummy.scale.set(c.scale, c.scale * 0.5, 1);
      dummy.rotation.set(-Math.PI / 6, 0, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, CLOUD_COUNT]}
      frustumCulled={false}
    />
  );
}
