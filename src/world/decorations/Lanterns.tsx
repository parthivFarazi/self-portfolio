import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { type Mesh } from 'three';
import { stoneCool, woodDark } from '../materials';
import type { LanternPlacement } from './placements';

// Lanterns total ~22. We deliberately do NOT add a per-lantern <pointLight>:
// MeshStandardMaterial evaluates every light per fragment, so 22 dynamic
// lights would dominate the frame cost. The emissive amber material + the
// scene's existing Bloom pass deliver the "lit" visual without that cost.

const PULSE_FREQ = 0.5;       // Hz
const PULSE_AMPLITUDE = 0.10; // ±10% intensity
const EMISSIVE_BASE = 1.4;    // slightly higher to compensate for no light

function Lantern({ placement, seed }: { placement: LanternPlacement; seed: number }) {
  const glassRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const phase = seed * 1.7;
    const pulse = Math.sin(t * PULSE_FREQ * 2 * Math.PI + phase);
    const k = 1 + pulse * PULSE_AMPLITUDE;
    if (glassRef.current) {
      const mat = glassRef.current.material as any;
      if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = EMISSIVE_BASE * k;
    }
  });

  return (
    <group position={[placement.pos[0], 0, placement.pos[1]]} rotation={[0, placement.rot ?? 0, 0]}>
      {/* Wooden post */}
      <mesh castShadow material={woodDark} position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 1.4, 6]} />
      </mesh>
      {/* Stone base ring */}
      <mesh castShadow receiveShadow material={stoneCool} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.1, 8]} />
      </mesh>
      {/* Crossbeam under the lantern head */}
      <mesh castShadow material={woodDark} position={[0, 1.42, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.08]} />
      </mesh>
      {/* Glass head — emissive amber, gently pulsing */}
      <mesh ref={glassRef} position={[0, 1.6, 0]}>
        <boxGeometry args={[0.22, 0.28, 0.22]} />
        <meshStandardMaterial
          color="#fbe6cc"
          emissive="#f5b66a"
          emissiveIntensity={EMISSIVE_BASE}
          roughness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Pyramidal cap on top */}
      <mesh castShadow material={woodDark} position={[0, 1.82, 0]}>
        <coneGeometry args={[0.18, 0.16, 4]} />
      </mesh>
    </group>
  );
}

export function Lanterns({ lanterns }: { lanterns: LanternPlacement[] }) {
  // Stable per-lantern seeds so pulses are out of phase.
  const seeded = useMemo(
    () => lanterns.map((l, i) => ({ placement: l, seed: i * 0.317 + 0.05 })),
    [lanterns],
  );
  return (
    <group>
      {seeded.map((entry, i) => (
        <Lantern key={i} placement={entry.placement} seed={entry.seed} />
      ))}
    </group>
  );
}
