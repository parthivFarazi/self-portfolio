import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
} from 'three';
import { stoneCool, woodDark } from '../materials';
import type { LanternPlacement } from './placements';

// Lanterns total ~22, so instancing is mostly about keeping draw calls low
// rather than memory. All glass heads share the same soft pulse to preserve
// the "lit" look without per-lantern lights.

const PULSE_FREQ = 0.5;       // Hz
const PULSE_AMPLITUDE = 0.10; // ±10% intensity
const EMISSIVE_BASE = 1.4;    // slightly higher to compensate for no light

export function Lanterns({ lanterns }: { lanterns: LanternPlacement[] }) {
  const postRef = useRef<InstancedMesh>(null);
  const baseRef = useRef<InstancedMesh>(null);
  const beamRef = useRef<InstancedMesh>(null);
  const glassRef = useRef<InstancedMesh>(null);
  const capRef = useRef<InstancedMesh>(null);

  const postGeo = useMemo(() => new CylinderGeometry(0.06, 0.07, 1.4, 6), []);
  const baseGeo = useMemo(() => new CylinderGeometry(0.16, 0.2, 0.1, 8), []);
  const beamGeo = useMemo(() => new BoxGeometry(0.32, 0.05, 0.08), []);
  const glassGeo = useMemo(() => new BoxGeometry(0.22, 0.28, 0.22), []);
  const capGeo = useMemo(() => new ConeGeometry(0.18, 0.16, 4), []);
  const glassMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#fbe6cc',
        emissive: '#f5b66a',
        emissiveIntensity: EMISSIVE_BASE,
        roughness: 0.4,
        transparent: true,
        opacity: 0.92,
      }),
    [],
  );

  const root = useMemo(() => new Object3D(), []);
  const part = useMemo(() => new Object3D(), []);

  useEffect(() => {
    const refs = [postRef.current, baseRef.current, beamRef.current, glassRef.current, capRef.current];
    if (refs.some((ref) => !ref)) return;

    lanterns.forEach((placement, i) => {
      root.position.set(placement.pos[0], 0, placement.pos[1]);
      root.rotation.set(0, placement.rot ?? 0, 0);
      root.updateMatrix();

      setInstance(postRef.current!, i, root, part, [0, 0.7, 0]);
      setInstance(baseRef.current!, i, root, part, [0, 0.05, 0]);
      setInstance(beamRef.current!, i, root, part, [0, 1.42, 0]);
      setInstance(glassRef.current!, i, root, part, [0, 1.6, 0]);
      setInstance(capRef.current!, i, root, part, [0, 1.82, 0]);
    });

    postRef.current!.instanceMatrix.needsUpdate = true;
    baseRef.current!.instanceMatrix.needsUpdate = true;
    beamRef.current!.instanceMatrix.needsUpdate = true;
    glassRef.current!.instanceMatrix.needsUpdate = true;
    capRef.current!.instanceMatrix.needsUpdate = true;
  }, [lanterns, part, root]);

  useFrame(({ clock }) => {
    const pulse = Math.sin(clock.getElapsedTime() * PULSE_FREQ * 2 * Math.PI);
    const intensity = EMISSIVE_BASE * (1 + pulse * PULSE_AMPLITUDE);
    glassMat.emissiveIntensity = intensity;
  });

  return (
    <group>
      <instancedMesh ref={postRef} args={[postGeo, woodDark, lanterns.length]} castShadow />
      <instancedMesh ref={baseRef} args={[baseGeo, stoneCool, lanterns.length]} castShadow receiveShadow />
      <instancedMesh ref={beamRef} args={[beamGeo, woodDark, lanterns.length]} castShadow />
      <instancedMesh ref={glassRef} args={[glassGeo, glassMat, lanterns.length]} />
      <instancedMesh ref={capRef} args={[capGeo, woodDark, lanterns.length]} castShadow />
    </group>
  );
}

function setInstance(
  mesh: InstancedMesh,
  index: number,
  root: Object3D,
  part: Object3D,
  position: [number, number, number],
) {
  part.position.set(position[0], position[1], position[2]);
  part.rotation.set(0, 0, 0);
  part.scale.set(1, 1, 1);
  part.updateMatrix();
  part.matrix.premultiply(root.matrix);
  mesh.setMatrixAt(index, part.matrix);
}
