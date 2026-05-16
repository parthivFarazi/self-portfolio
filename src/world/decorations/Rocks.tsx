import { useEffect, useMemo, useRef } from 'react';
import {
  IcosahedronGeometry,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  type BufferAttribute,
} from 'three';
import type { RockPlacement } from './placements';

// Angular stones, low-poly, with displaced vertices for variation. All rocks
// share one InstancedMesh — single draw call for the whole island's stones.

function makeRockGeometry(): IcosahedronGeometry {
  const geo = new IcosahedronGeometry(1, 0);
  const pos = geo.attributes.position as BufferAttribute;
  const arr = pos.array as Float32Array;
  for (let i = 0; i < arr.length; i += 3) {
    const s = i * 0.213;
    arr[i] += Math.sin(s) * 0.18;
    arr[i + 1] += Math.cos(s * 1.7) * 0.14;
    arr[i + 2] += Math.sin(s * 2.3) * 0.18;
  }
  // Flatten the bottom so rocks sit on the ground.
  for (let i = 0; i < arr.length; i += 3) {
    if (arr[i + 1] < -0.5) arr[i + 1] = -0.5;
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function Rocks({ rocks }: { rocks: RockPlacement[] }) {
  const ref = useRef<InstancedMesh>(null);
  const geom = useMemo(makeRockGeometry, []);
  const mat = useMemo(
    () => new MeshStandardMaterial({ color: '#a59a86', roughness: 0.95 }),
    [],
  );
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!ref.current) return;
    rocks.forEach((r, i) => {
      dummy.position.set(r.pos[0], r.scale * 0.4, r.pos[1]);
      // Squash slightly so the rock is wider than tall.
      dummy.scale.set(r.scale, r.scale * 0.7, r.scale);
      dummy.rotation.set(r.seed * 0.3, r.seed * 6.2, r.seed * 0.4);
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
      castShadow
      receiveShadow
    />
  );
}
