import { Billboard, Text } from '@react-three/drei';
import { useMemo } from 'react';
import type { BuildingDef } from '@/data/buildings';
import { stoneCool, woodDark } from '../materials';

// Heatmap color palette: red (hot) → orange → yellow → green → blue (cool)
function heatColor(t: number): string {
  // t in [0, 1], 0 = blue cool, 1 = red hot
  if (t < 0.25) return '#3a6ec8';      // blue
  if (t < 0.45) return '#5aa454';      // green
  if (t < 0.65) return '#e3c572';      // yellow
  if (t < 0.85) return '#d97c3a';      // orange
  return '#c44a3a';                     // red
}

export function HeatmapGarden({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const R = 5;

  // Place ~140 flower dots distributed within the disc with a heat gradient
  // that has its hot zone at the +x side (the "high-impact" cluster) and cools
  // toward -x.
  const flowers = useMemo(() => {
    const arr: Array<{ x: number; z: number; t: number }> = [];
    const rng = (n: number) => Math.sin(n * 12.97 + 7.13) * 0.5 + 0.5;
    for (let i = 0; i < 140; i++) {
      const a = rng(i) * Math.PI * 2;
      const r = Math.sqrt(rng(i * 1.7)) * (R - 0.4);
      const fx = Math.cos(a) * r;
      const fz = Math.sin(a) * r;
      // Heat value falls off radially from a hot zone offset toward +x
      const hotX = 2.2;
      const hotZ = -1;
      const dHot = Math.hypot(fx - hotX, fz - hotZ);
      const t = Math.max(0, Math.min(1, 1 - dHot / (R * 1.1)));
      arr.push({ x: fx, z: fz, t });
    }
    return arr;
  }, []);

  return (
    <group position={[px, 0, pz]}>
      {/* Garden bed — flat oval slightly raised */}
      <mesh receiveShadow position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 48]} />
        <meshStandardMaterial color="#5a3a22" roughness={0.95} />
      </mesh>
      {/* Stone border */}
      <mesh receiveShadow position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R, R + 0.35, 48]} />
        <meshStandardMaterial color="#7a6a52" roughness={0.95} />
      </mesh>

      {/* Heatmap flowers — tiny cylinders + sphere top, color by heat */}
      {flowers.map((f, i) => {
        const c = heatColor(f.t);
        return (
          <group key={i} position={[f.x, 0.06, f.z]}>
            <mesh>
              <cylinderGeometry args={[0.025, 0.025, 0.18, 6]} />
              <meshStandardMaterial color="#3a5a2a" roughness={0.95} />
            </mesh>
            <mesh position={[0, 0.18, 0]} castShadow>
              <sphereGeometry args={[0.08, 8, 6]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.25} roughness={0.6} />
            </mesh>
          </group>
        );
      })}

      {/* Center pedestal + soccer ball */}
      <group position={[0, 0, 0]}>
        <mesh castShadow material={stoneCool} position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.5, 0.6, 0.7, 12]} />
        </mesh>
        <mesh castShadow position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.32, 18, 16]} />
          <meshStandardMaterial color="#fffaee" roughness={0.6} />
        </mesh>
        {/* Tiny dark pentagons hint to the soccer ball pattern */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.27, 0.95, Math.sin(a) * 0.27]}>
              <circleGeometry args={[0.06, 5]} />
              <meshStandardMaterial color="#1a1410" roughness={0.7} />
            </mesh>
          );
        })}
      </group>

      {/* Floating ORIS placard */}
      <group position={[0, 2.4, 0]}>
        <mesh material={woodDark}>
          <boxGeometry args={[1.6, 0.6, 0.04]} />
        </mesh>
        <Text position={[0, 0.05, 0.03]} fontSize={0.22} color="#f5d97a" anchorX="center" anchorY="middle">
          ORIS
        </Text>
        <Text position={[0, -0.18, 0.03]} fontSize={0.12} color="#cdf3e2" anchorX="center" anchorY="middle">
          Off-Ball Run Impact Score
        </Text>
      </group>

      <Billboard position={[0, 4, 0]}>
        <Text fontSize={0.95} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
