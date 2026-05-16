import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  SphereGeometry,
  PlaneGeometry,
  InstancedMesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  CanvasTexture,
} from 'three';
import { ISLAND_RADIUS } from '@/constants/world';

// Three GPU-friendly ambient particle systems. Each uses a single
// InstancedMesh and updates matrices in useFrame. No per-particle React.

// ── Dust motes ────────────────────────────────────────────────────────────
const DUST_COUNT = 30;
const DUST_RISE = 0.18;        // upward drift speed (u/s)
const DUST_Y_MIN = 0.4;
const DUST_Y_MAX = 4.5;

interface Dust {
  x: number;
  y: number;
  z: number;
  vy: number;
  vx: number;
  vz: number;
  phase: number;
}

function buildDust(): Dust[] {
  const out: Dust[] = [];
  for (let i = 0; i < DUST_COUNT; i++) {
    const seed = i * 11.31;
    const a = seed * 0.97;
    // Spread across most of the island radius.
    const r = (Math.sin(seed * 1.3) * 0.5 + 0.5) * (ISLAND_RADIUS - 8);
    out.push({
      x: Math.cos(a) * r,
      y: DUST_Y_MIN + (Math.sin(seed) * 0.5 + 0.5) * (DUST_Y_MAX - DUST_Y_MIN),
      z: Math.sin(a) * r,
      vy: DUST_RISE * (0.7 + Math.cos(seed * 2.1) * 0.3),
      vx: Math.sin(seed * 3.1) * 0.04,
      vz: Math.cos(seed * 3.7) * 0.04,
      phase: seed,
    });
  }
  return out;
}

function DustMotes() {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(() => new SphereGeometry(0.045, 5, 4), []);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        color: '#fff5d4',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        fog: false,
      }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);
  const motes = useMemo(buildDust, []);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    motes.forEach((m, i) => {
      m.y += m.vy * delta;
      // Gentle lateral wobble — feels like air currents.
      const wobbleX = Math.sin(t * 0.6 + m.phase) * 0.15;
      const wobbleZ = Math.cos(t * 0.5 + m.phase * 1.3) * 0.15;
      m.x += m.vx * delta;
      m.z += m.vz * delta;
      if (m.y > DUST_Y_MAX) {
        m.y = DUST_Y_MIN;
      }
      dummy.position.set(m.x + wobbleX, m.y, m.z + wobbleZ);
      dummy.scale.setScalar(0.8 + Math.sin(t + m.phase) * 0.15);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, DUST_COUNT]}
      frustumCulled={false}
    />
  );
}

// ── Cherry petals at Zen Garden ──────────────────────────────────────────
const PETAL_COUNT = 20;
// Zen Garden is at [-40, 0, 45] with R=5 and cherry tree near (R-1.6, R-1.6)
// from local origin, so world ~ [-38.4, 3.0, 43.4]. Petals spawn around there.
const PETAL_CENTER: [number, number, number] = [-38.5, 3.5, 43.5];
const PETAL_SPAWN_RADIUS = 1.6;
const PETAL_FALL_SPEED = 0.35;   // u/s downward
const PETAL_TOP_Y = 4.5;
const PETAL_GROUND_Y = 0.1;

interface Petal {
  x: number;
  y: number;
  z: number;
  driftX: number;
  driftZ: number;
  spin: number;
  rot: number;
  phase: number;
}

function buildPetals(): Petal[] {
  const out: Petal[] = [];
  for (let i = 0; i < PETAL_COUNT; i++) {
    const seed = i * 7.41;
    const a = seed * 1.13;
    const r = (Math.cos(seed) * 0.5 + 0.5) * PETAL_SPAWN_RADIUS;
    out.push({
      x: PETAL_CENTER[0] + Math.cos(a) * r,
      // Stagger initial Y so the column is full from the first frame.
      y: PETAL_GROUND_Y + (i / PETAL_COUNT) * (PETAL_TOP_Y - PETAL_GROUND_Y),
      z: PETAL_CENTER[2] + Math.sin(a) * r,
      driftX: Math.sin(seed * 2.1) * 0.06,
      driftZ: Math.cos(seed * 2.3) * 0.06,
      spin: 0.4 + Math.sin(seed * 1.7) * 0.3,
      rot: seed,
      phase: seed,
    });
  }
  return out;
}

function makePetalTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 32;
  const ctx = c.getContext('2d')!;
  // Pink teardrop-ish petal — radial gradient, slightly off-center.
  const grad = ctx.createRadialGradient(16, 14, 1, 16, 16, 14);
  grad.addColorStop(0, 'rgba(255, 230, 240, 1)');
  grad.addColorStop(0.5, 'rgba(245, 182, 218, 0.95)');
  grad.addColorStop(1, 'rgba(230, 130, 195, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(16, 16, 11, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  return new CanvasTexture(c);
}

function CherryPetals() {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(() => new PlaneGeometry(0.18, 0.22), []);
  const tex = useMemo(makePetalTexture, []);
  const mat = useMemo(
    () =>
      new MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        fog: false,
      }),
    [tex],
  );
  const dummy = useMemo(() => new Object3D(), []);
  const petals = useMemo(buildPetals, []);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    petals.forEach((p, i) => {
      p.y -= PETAL_FALL_SPEED * delta;
      p.x += p.driftX * delta + Math.sin(t * 0.7 + p.phase) * 0.01;
      p.z += p.driftZ * delta + Math.cos(t * 0.6 + p.phase * 1.1) * 0.01;
      p.rot += p.spin * delta;

      // Loop when near ground — also reset XZ to keep petals near the tree.
      if (p.y < PETAL_GROUND_Y) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * PETAL_SPAWN_RADIUS;
        p.x = PETAL_CENTER[0] + Math.cos(a) * r;
        p.z = PETAL_CENTER[2] + Math.sin(a) * r;
        p.y = PETAL_TOP_Y;
      }

      // Fade scale near the ground for a "dissolving" effect.
      const fade =
        p.y < 0.6 ? Math.max(0, (p.y - PETAL_GROUND_Y) / (0.6 - PETAL_GROUND_Y)) : 1;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(0.7 + 0.3 * fade);
      dummy.rotation.set(Math.PI / 2.5, p.rot, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, PETAL_COUNT]}
      frustumCulled={false}
    />
  );
}

// ── Path fireflies — bridge between Whispering Archive and lit lanterns ──
const FIREFLY_COUNT = 25;
// Anchor points distributed along the west side near the Archive + paths.
const FIREFLY_ANCHORS: [number, number][] = [
  [-50, 5],   // near Archive
  [-30, 0],
  [-16, 0],
  [-10, 0],
  [-3, 17],   // near west-south transition
];

interface Firefly {
  ax: number;
  az: number;     // anchor
  orbitR: number;
  orbitS: number; // angular speed
  phase: number;
  yBase: number;
  yAmp: number;
}

function buildFireflies(): Firefly[] {
  const out: Firefly[] = [];
  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const seed = i * 9.93;
    const anchor = FIREFLY_ANCHORS[i % FIREFLY_ANCHORS.length];
    out.push({
      ax: anchor[0],
      az: anchor[1],
      orbitR: 1.5 + (Math.sin(seed) * 0.5 + 0.5) * 2.5,
      orbitS: 0.2 + Math.cos(seed * 1.3) * 0.12,
      phase: seed,
      yBase: 1.4 + Math.sin(seed * 1.7) * 0.6,
      yAmp: 0.4 + Math.cos(seed * 2.1) * 0.2,
    });
  }
  return out;
}

function Fireflies() {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(() => new SphereGeometry(0.06, 6, 5), []);
  const mat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#fff1a8',
        emissive: '#f5d97a',
        emissiveIntensity: 1.6,
        roughness: 0.5,
        toneMapped: false,
      }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);
  const flies = useMemo(buildFireflies, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    flies.forEach((f, i) => {
      const a = t * f.orbitS + f.phase;
      const x = f.ax + Math.cos(a) * f.orbitR + Math.sin(t * 0.3 + f.phase) * 0.6;
      const z = f.az + Math.sin(a) * f.orbitR + Math.cos(t * 0.4 + f.phase) * 0.6;
      const y = f.yBase + Math.sin(t * 0.5 + f.phase * 1.7) * f.yAmp;
      // Soft size pulse — emissiveIntensity per-instance isn't free, so fake
      // a "glow" with scale modulation.
      const k = 0.85 + Math.sin(t * 1.2 + f.phase) * 0.15;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(k);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, FIREFLY_COUNT]}
      frustumCulled={false}
    />
  );
}

export function Particles() {
  return (
    <group>
      <DustMotes />
      <CherryPetals />
      <Fireflies />
    </group>
  );
}
