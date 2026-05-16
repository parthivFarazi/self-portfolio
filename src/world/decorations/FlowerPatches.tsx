import { useEffect, useMemo, useRef } from 'react';
import {
  CylinderGeometry,
  Color,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
} from 'three';
import type { FlowerPatchPlacement } from './placements';

// All flowers across every patch share one InstancedMesh. The per-instance
// color attribute is set once at mount; no per-frame work.

// Deterministic pseudo-random — keeps the patch layout stable across reloads.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface FlowerInstance {
  x: number;
  z: number;
  h: number; // flower height
  rot: number;
  color: Color;
}

function buildFlowers(patches: FlowerPatchPlacement[]): FlowerInstance[] {
  const out: FlowerInstance[] = [];
  for (const patch of patches) {
    const rand = rng(Math.floor(patch.seed * 10000));
    for (let i = 0; i < patch.count; i++) {
      const a = rand() * Math.PI * 2;
      // Bias outward slightly — flowers favor the edge of their patch radius.
      const r = patch.radius * (0.2 + 0.8 * Math.sqrt(rand()));
      const x = patch.pos[0] + Math.cos(a) * r;
      const z = patch.pos[1] + Math.sin(a) * r;
      const h = 0.25 + rand() * 0.35;
      const rot = rand() * Math.PI * 2;
      const colorHex = patch.palette[Math.floor(rand() * patch.palette.length)];
      out.push({ x, z, h, rot, color: new Color(colorHex) });
    }
  }
  return out;
}

export function FlowerPatches({ patches }: { patches: FlowerPatchPlacement[] }) {
  const stemRef = useRef<InstancedMesh>(null);
  const headRef = useRef<InstancedMesh>(null);

  const flowers = useMemo(() => buildFlowers(patches), [patches]);

  // Stem geometry — thin green cylinder.
  const stemGeo = useMemo(() => new CylinderGeometry(0.025, 0.025, 1, 5), []);
  // Flower head — short fat cylinder (reads as a top-down petal disc).
  const headGeo = useMemo(() => new CylinderGeometry(0.09, 0.06, 0.08, 6), []);

  const stemMat = useMemo(
    () => new MeshStandardMaterial({ color: '#3a6b3a', roughness: 0.85 }),
    [],
  );
  // head material uses per-instance color — set vertexColors via the
  // InstancedMesh setColorAt API; the material's base color is white so
  // instance colors come through unchanged.
  const headMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.75,
        emissive: '#1a1410',
        emissiveIntensity: 0.05,
      }),
    [],
  );

  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!stemRef.current || !headRef.current) return;
    flowers.forEach((f, i) => {
      // Stem: anchored at ground, scaled vertically to flower height.
      dummy.position.set(f.x, f.h / 2, f.z);
      dummy.scale.set(1, f.h, 1);
      dummy.rotation.set(0, f.rot, 0);
      dummy.updateMatrix();
      stemRef.current!.setMatrixAt(i, dummy.matrix);

      // Head: at stem top.
      dummy.position.set(f.x, f.h + 0.04, f.z);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, f.rot, 0);
      dummy.updateMatrix();
      headRef.current!.setMatrixAt(i, dummy.matrix);
      headRef.current!.setColorAt(i, f.color);
    });
    stemRef.current.instanceMatrix.needsUpdate = true;
    headRef.current.instanceMatrix.needsUpdate = true;
    if (headRef.current.instanceColor) headRef.current.instanceColor.needsUpdate = true;
  }, [flowers, dummy]);

  if (flowers.length === 0) return null;

  return (
    <group>
      <instancedMesh
        ref={stemRef}
        args={[stemGeo, stemMat, flowers.length]}
        castShadow
      />
      <instancedMesh
        ref={headRef}
        args={[headGeo, headMat, flowers.length]}
        castShadow
      />
    </group>
  );
}
