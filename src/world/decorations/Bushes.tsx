import { useEffect, useMemo, useRef } from 'react';
import {
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from 'three';
import type { BushPlacement } from './placements';

// Each bush = 3 overlapping smooth spheres. To keep it to one draw call
// per "layer," we render 3 InstancedMeshes (one per cluster slot) — total
// across the whole island: 6 bushes × 3 spheres = 18 instances.

export function Bushes({ bushes }: { bushes: BushPlacement[] }) {
  const aRef = useRef<InstancedMesh>(null);
  const bRef = useRef<InstancedMesh>(null);
  const cRef = useRef<InstancedMesh>(null);

  const geom = useMemo(() => new SphereGeometry(0.5, 14, 10), []);
  const matA = useMemo(
    () => new MeshStandardMaterial({ color: '#3d733a', roughness: 0.9, emissive: '#1c3318', emissiveIntensity: 0.08 }),
    [],
  );
  const matB = useMemo(
    () => new MeshStandardMaterial({ color: '#4f914a', roughness: 0.88, emissive: '#203d1c', emissiveIntensity: 0.08 }),
    [],
  );
  const matC = useMemo(
    () => new MeshStandardMaterial({ color: '#60a257', roughness: 0.86, emissive: '#274720', emissiveIntensity: 0.08 }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!aRef.current || !bRef.current || !cRef.current) return;
    bushes.forEach((bush, i) => {
      const s = bush.scale;
      // Sphere A — anchor at center
      dummy.position.set(bush.pos[0], 0.35 * s, bush.pos[1]);
      dummy.scale.setScalar(s);
      dummy.rotation.set(0, bush.seed * 4.1, 0);
      dummy.updateMatrix();
      aRef.current!.setMatrixAt(i, dummy.matrix);

      // Sphere B — offset front-left, slightly larger
      dummy.position.set(
        bush.pos[0] + Math.cos(bush.seed * 6) * 0.35 * s,
        0.42 * s,
        bush.pos[1] + Math.sin(bush.seed * 6) * 0.35 * s,
      );
      dummy.scale.setScalar(s * 0.85);
      dummy.rotation.set(0, bush.seed * 2.7, 0);
      dummy.updateMatrix();
      bRef.current!.setMatrixAt(i, dummy.matrix);

      // Sphere C — offset back-right, smaller
      dummy.position.set(
        bush.pos[0] + Math.cos(bush.seed * 6 + Math.PI) * 0.32 * s,
        0.3 * s,
        bush.pos[1] + Math.sin(bush.seed * 6 + Math.PI) * 0.32 * s,
      );
      dummy.scale.setScalar(s * 0.7);
      dummy.rotation.set(0, bush.seed * 5.3, 0);
      dummy.updateMatrix();
      cRef.current!.setMatrixAt(i, dummy.matrix);
    });
    aRef.current.instanceMatrix.needsUpdate = true;
    bRef.current.instanceMatrix.needsUpdate = true;
    cRef.current.instanceMatrix.needsUpdate = true;
  }, [bushes, dummy]);

  if (bushes.length === 0) return null;
  return (
    <group>
      <instancedMesh ref={aRef} args={[geom, matA, bushes.length]} />
      <instancedMesh ref={bRef} args={[geom, matB, bushes.length]} />
      <instancedMesh ref={cRef} args={[geom, matC, bushes.length]} />
    </group>
  );
}
