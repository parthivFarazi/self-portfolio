import { useEffect, useMemo, useRef } from 'react';
import {
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from 'three';
import type { RockPlacement } from './placements';

// Smooth raised boulders. The old low-poly icosahedron looked like broken
// triangles, while the half-dome read as a flat spot. This keeps a clear 3D
// rock silhouette without shard-like facets.

function makeRockGeometry(): SphereGeometry {
  const geo = new SphereGeometry(1, 24, 14);
  geo.computeVertexNormals();
  return geo;
}

export function Rocks({ rocks }: { rocks: RockPlacement[] }) {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(makeRockGeometry, []);
  const mat = useMemo(
    () => new MeshStandardMaterial({ color: '#8f8066', roughness: 0.9, emissive: '#3a301f', emissiveIntensity: 0.05 }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!ref.current) return;
    rocks.forEach((r, i) => {
      const sx = r.scale * (0.9 + Math.sin(r.seed * 8.1) * 0.16);
      const sz = r.scale * (0.72 + Math.cos(r.seed * 5.7) * 0.12);
      const sy = r.scale * 0.42;
      dummy.position.set(r.pos[0], sy * 0.92, r.pos[1]);
      dummy.scale.set(sx, sy, sz);
      dummy.rotation.set(0, r.seed * 6.2, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [rocks, dummy]);

  if (rocks.length === 0) return null;
  return (
    <instancedMesh
      ref={ref}
      args={[geom, mat, rocks.length]}
    />
  );
}
