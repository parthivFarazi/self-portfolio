import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  CylinderGeometry,
  ConeGeometry,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from 'three';
import type { TreePlacement } from './placements';

// Per-instance wind sway: gentle rotation of canopies. Each tree carries a
// stable phase from its seed, so the forest doesn't pulse in unison.
const SWAY_FREQ = 0.3;            // Hz
const SWAY_AMPLITUDE_DEG = 2;     // ±2 degrees
const SWAY_RAD = (SWAY_AMPLITUDE_DEG * Math.PI) / 180;

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
  const canopyAGeo = useMemo(() => new SphereGeometry(1, 14, 10), []);
  const canopyBGeo = useMemo(() => new SphereGeometry(1, 14, 10), []);
  const trunkMat = useMemo(
    () => new MeshStandardMaterial({ color: '#6b4a2e', roughness: 0.92 }),
    [],
  );
  const canopyMatA = useMemo(
    () => new MeshStandardMaterial({ color: '#4f9349', roughness: 0.88, emissive: '#23451f', emissiveIntensity: 0.08 }),
    [],
  );
  const canopyMatB = useMemo(
    () => new MeshStandardMaterial({ color: '#66a85a', roughness: 0.86, emissive: '#2d5126', emissiveIntensity: 0.08 }),
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
      />
      <instancedMesh
        ref={canopyBRef}
        args={[canopyBGeo, canopyMatB, trees.length]}
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
      />
      <instancedMesh
        ref={coneBRef}
        args={[coneBGeo, needleMat, trees.length]}
      />
    </group>
  );
}
