import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Float32BufferAttribute,
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
} from 'three';

// 1-3 birds cross the upper sky at staggered intervals. We render a fixed
// pool of 3 instanced V-silhouettes and individually schedule when each
// "flight" begins and ends. Most of the time, instances are scaled to 0
// (invisible) until their gap timer expires.

const BIRD_POOL = 3;
const SPAWN_X = -160;
const DESPAWN_X = 160;
const MIN_GAP = 15;     // seconds between this bird's flights
const MAX_GAP = 30;
const FLIGHT_DURATION_BASE = 18;  // seconds to cross the sky

interface BirdState {
  active: boolean;
  startTime: number;     // when this flight started
  duration: number;
  y: number;
  zStart: number;
  zEnd: number;
  size: number;
  wakeAt: number;        // next time to spawn (when inactive)
}

function scheduleNext(now: number, base: number): { wakeAt: number } {
  const gap = MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP);
  return { wakeAt: now + gap + base };
}

function freshFlight(now: number, seed: number): BirdState {
  return {
    active: true,
    startTime: now,
    duration: FLIGHT_DURATION_BASE + Math.random() * 8,
    y: 55 + Math.random() * 25,
    zStart: -90 + Math.random() * 40 * (seed % 2 === 0 ? 1 : -1),
    zEnd: -120 + Math.random() * 60,
    size: 0.85 + Math.random() * 0.35,
    wakeAt: 0,
  };
}

// V-shaped bird silhouette: 2 triangles sharing the apex. Tiny — they're
// pixel-scale in the orthographic view from this far.
function makeVGeometry(): BufferGeometry {
  const g = new BufferGeometry();
  // Two triangles forming a V (one for each wing).
  // Apex at (0, 0, 0); wing tips at (-1, 0.3, 0) and (1, 0.3, 0); trailing
  // back point at (0, 0.05, -0.2) gives the wing some body.
  const verts = new Float32Array([
    // Left wing
    0, 0, 0,
    -1, 0.3, 0,
    -0.3, 0.1, -0.1,
    // Right wing
    0, 0, 0,
    0.3, 0.1, -0.1,
    1, 0.3, 0,
  ]);
  g.setAttribute('position', new Float32BufferAttribute(verts, 3));
  g.computeVertexNormals();
  return g;
}

export function Birds() {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(makeVGeometry, []);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        color: '#3a2e3a',
        transparent: true,
        opacity: 0.85,
        fog: false,
      }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);

  const states = useMemo<BirdState[]>(() => {
    const out: BirdState[] = [];
    for (let i = 0; i < BIRD_POOL; i++) {
      out.push({
        active: false,
        startTime: 0,
        duration: 0,
        y: 60,
        zStart: 0,
        zEnd: 0,
        size: 1,
        wakeAt: i * (MIN_GAP / BIRD_POOL) + Math.random() * 5,
      });
    }
    return out;
  }, []);

  // Start all instances hidden.
  useEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < BIRD_POOL; i++) {
      dummy.position.set(0, -100, 0);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const now = clock.getElapsedTime();
    for (let i = 0; i < BIRD_POOL; i++) {
      const s = states[i];
      if (!s.active) {
        if (now >= s.wakeAt) {
          Object.assign(s, freshFlight(now, i));
        } else {
          // Keep hidden.
          dummy.scale.setScalar(0);
          dummy.position.set(0, -100, 0);
          dummy.updateMatrix();
          ref.current.setMatrixAt(i, dummy.matrix);
          continue;
        }
      }
      const t = (now - s.startTime) / s.duration;
      if (t >= 1) {
        s.active = false;
        const nxt = scheduleNext(now, 0);
        s.wakeAt = nxt.wakeAt;
        dummy.scale.setScalar(0);
        dummy.position.set(0, -100, 0);
        dummy.updateMatrix();
        ref.current.setMatrixAt(i, dummy.matrix);
        continue;
      }
      const x = SPAWN_X + (DESPAWN_X - SPAWN_X) * t;
      const z = s.zStart + (s.zEnd - s.zStart) * t;
      // Wing flap — gentle Z rotation oscillation.
      const flap = Math.sin(now * 6 + i) * 0.18;
      dummy.position.set(x, s.y, z);
      dummy.scale.setScalar(s.size);
      dummy.rotation.set(0, 0, flap);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, BIRD_POOL]}
      frustumCulled={false}
    />
  );
}
