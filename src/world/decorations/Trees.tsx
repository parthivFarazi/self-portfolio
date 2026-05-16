import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CylinderGeometry,
  IcosahedronGeometry,
  ConeGeometry,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  type BufferAttribute,
} from 'three';
import type { TreePlacement } from './placements';

// Per-instance wind sway: gentle rotation of canopies. Each tree carries a
// stable phase from its seed, so the forest doesn't pulse in unison.
const SWAY_FREQ = 0.3;            // Hz
const SWAY_AMPLITUDE_DEG = 2;     // ±2 degrees
const SWAY_RAD = (SWAY_AMPLITUDE_DEG * Math.PI) / 180;

// Subtly displace icosahedron vertices for organic canopy silhouettes —
// shared deformation across all canopy instances is fine (it reads as "leafy"
// not "identical") and costs nothing per-frame.
function jitterIco(geo: IcosahedronGeometry, amount: number): IcosahedronGeometry {
  const pos = geo.attributes.position as BufferAttribute;
  const arr = pos.array as Float32Array;
  for (let i = 0; i < arr.length; i += 3) {
    const seed = i * 0.137;
    const dx = (Math.sin(seed) * 0.5 + Math.sin(seed * 2.3) * 0.3) * amount;
    const dy = (Math.sin(seed * 1.7) * 0.5 + Math.cos(seed * 3.1) * 0.3) * amount;
    const dz = (Math.cos(seed * 1.3) * 0.5 + Math.sin(seed * 4.1) * 0.3) * amount;
    arr[i] += dx;
    arr[i + 1] += dy;
    arr[i + 2] += dz;
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function Trees({ trees }: { trees: TreePlacement[] }) {
  // Split by kind so pines and oaks use different geometries.
  const oaks = useMemo(() => trees.filter((t) => t.kind !== 'pine'), [trees]);
  const pines = useMemo(() => trees.filter((t) => t.kind === 'pine'), [trees]);

  return (
    <group>
      {oaks.length > 0 && <OakForest trees={oaks} />}
      {pines.length > 0 && <PineForest trees={pines} />}
    </group>
  );
}

// ── Oak / deciduous: tapered trunk + 2 canopy spheres ─────────────────────
function OakForest({ trees }: { trees: TreePlacement[] }) {
  const trunkRef = useRef<InstancedMesh>(null);
  const canopyARef = useRef<InstancedMesh>(null);
  const canopyBRef = useRef<InstancedMesh>(null);

  const trunkGeo = useMemo(() => new CylinderGeometry(0.18, 0.32, 1.6, 8), []);
  const canopyAGeo = useMemo(() => jitterIco(new IcosahedronGeometry(1, 1), 0.12), []);
  const canopyBGeo = useMemo(() => jitterIco(new IcosahedronGeometry(1, 1), 0.15), []);
  const trunkMat = useMemo(
    () => new MeshStandardMaterial({ color: '#6b4a2e', roughness: 0.92 }),
    [],
  );
  const canopyMatA = useMemo(
    () => new MeshStandardMaterial({ color: '#4a8a48', roughness: 0.88 }),
    [],
  );
  const canopyMatB = useMemo(
    () => new MeshStandardMaterial({ color: '#5fa854', roughness: 0.86 }),
    [],
  );

  const dummy = useMemo(() => new Object3D(), []);

  // Trunks are static — set once.
  useEffect(() => {
    if (!trunkRef.current) return;
    trees.forEach((tree, i) => {
      dummy.position.set(tree.pos[0], 0.8 * tree.scale, tree.pos[1]);
      dummy.scale.setScalar(tree.scale);
      dummy.rotation.set(0, tree.seed * 7.31, 0);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(i, dummy.matrix);
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;
  }, [trees, dummy]);

  // Canopies sway gently each frame.
  useFrame(({ clock }) => {
    if (!canopyARef.current || !canopyBRef.current) return;
    const t = clock.getElapsedTime();
    const w = SWAY_FREQ * 2 * Math.PI;
    trees.forEach((tree, i) => {
      const phase = tree.seed * 2.1;
      const swayX = Math.sin(t * w + phase) * SWAY_RAD;
      const swayZ = Math.cos(t * w * 0.9 + phase * 1.3) * SWAY_RAD;

      // Primary canopy — lower, larger
      dummy.position.set(tree.pos[0], (1.6 + 0.9) * tree.scale, tree.pos[1]);
      dummy.scale.setScalar(tree.scale * 1.15);
      dummy.rotation.set(swayX, tree.seed * 5.1, swayZ);
      dummy.updateMatrix();
      canopyARef.current!.setMatrixAt(i, dummy.matrix);

      // Secondary canopy — offset, smaller, perched higher
      const offX = Math.cos(tree.seed * 7.7) * 0.5 * tree.scale;
      const offZ = Math.sin(tree.seed * 7.7) * 0.5 * tree.scale;
      dummy.position.set(
        tree.pos[0] + offX,
        (1.6 + 1.4) * tree.scale,
        tree.pos[1] + offZ,
      );
      dummy.scale.setScalar(tree.scale * 0.78);
      dummy.rotation.set(swayX * 0.85, tree.seed * 3.7, swayZ * 0.85);
      dummy.updateMatrix();
      canopyBRef.current!.setMatrixAt(i, dummy.matrix);
    });
    canopyARef.current.instanceMatrix.needsUpdate = true;
    canopyBRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeo, trunkMat, trees.length]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={canopyARef}
        args={[canopyAGeo, canopyMatA, trees.length]}
        castShadow
      />
      <instancedMesh
        ref={canopyBRef}
        args={[canopyBGeo, canopyMatB, trees.length]}
        castShadow
      />
    </group>
  );
}

// ── Pine / conifer: trunk + 2 stacked cones ───────────────────────────────
function PineForest({ trees }: { trees: TreePlacement[] }) {
  const trunkRef = useRef<InstancedMesh>(null);
  const coneARef = useRef<InstancedMesh>(null);
  const coneBRef = useRef<InstancedMesh>(null);

  const trunkGeo = useMemo(() => new CylinderGeometry(0.15, 0.22, 1.4, 8), []);
  const coneAGeo = useMemo(() => new ConeGeometry(1.0, 1.8, 8), []);
  const coneBGeo = useMemo(() => new ConeGeometry(0.75, 1.4, 8), []);
  const trunkMat = useMemo(
    () => new MeshStandardMaterial({ color: '#6b4a2e', roughness: 0.92 }),
    [],
  );
  const needleMat = useMemo(
    () => new MeshStandardMaterial({ color: '#3a6b3a', roughness: 0.9 }),
    [],
  );

  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!trunkRef.current) return;
    trees.forEach((tree, i) => {
      dummy.position.set(tree.pos[0], 0.7 * tree.scale, tree.pos[1]);
      dummy.scale.setScalar(tree.scale);
      dummy.rotation.set(0, tree.seed * 4.1, 0);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(i, dummy.matrix);
    });
    trunkRef.current.instanceMatrix.needsUpdate = true;
  }, [trees, dummy]);

  useFrame(({ clock }) => {
    if (!coneARef.current || !coneBRef.current) return;
    const t = clock.getElapsedTime();
    const w = SWAY_FREQ * 2 * Math.PI;
    trees.forEach((tree, i) => {
      const phase = tree.seed * 2.1;
      const swayX = Math.sin(t * w + phase) * SWAY_RAD * 0.7;
      const swayZ = Math.cos(t * w * 0.9 + phase * 1.3) * SWAY_RAD * 0.7;

      dummy.position.set(tree.pos[0], (1.4 + 0.9) * tree.scale, tree.pos[1]);
      dummy.scale.setScalar(tree.scale);
      dummy.rotation.set(swayX, 0, swayZ);
      dummy.updateMatrix();
      coneARef.current!.setMatrixAt(i, dummy.matrix);

      dummy.position.set(tree.pos[0], (1.4 + 2.1) * tree.scale, tree.pos[1]);
      dummy.scale.setScalar(tree.scale);
      dummy.rotation.set(swayX * 1.2, 0, swayZ * 1.2);
      dummy.updateMatrix();
      coneBRef.current!.setMatrixAt(i, dummy.matrix);
    });
    coneARef.current.instanceMatrix.needsUpdate = true;
    coneBRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeo, trunkMat, trees.length]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={coneARef}
        args={[coneAGeo, needleMat, trees.length]}
        castShadow
      />
      <instancedMesh
        ref={coneBRef}
        args={[coneBGeo, needleMat, trees.length]}
        castShadow
      />
    </group>
  );
}
