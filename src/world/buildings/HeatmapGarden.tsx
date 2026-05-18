import { Billboard, Text } from '@react-three/drei';
import { useMemo } from 'react';
import type { BuildingDef } from '@/data/buildings';
import { stoneCool, woodDark } from '../materials';

// Heatmap palette — saturated, vivid stops so the data viz reads from across
// the island. Hot end gets emissive boost via getHeat() below.
function heatColor(t: number): string {
  if (t < 0.2) return '#1f5fd4';       // deep blue (cool)
  if (t < 0.35) return '#3aa0e0';      // cyan-blue
  if (t < 0.5) return '#3acf6a';       // bright green
  if (t < 0.65) return '#f5d72a';      // saturated yellow
  if (t < 0.8) return '#f59020';       // saturated orange
  return '#e8261e';                     // hot red
}

function heatEmissive(t: number): number {
  // Hot zone glows; cool zone is matte
  return t > 0.55 ? 0.4 + (t - 0.55) * 1.4 : 0.1;
}

export function HeatmapGarden({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const R = 5;

  // Flower dots distributed within the disc with a heat gradient that
  // has its hot zone offset toward +x.
  const flowers = useMemo(() => {
    const arr: Array<{ x: number; z: number; t: number; h: number }> = [];
    const rng = (n: number) => Math.sin(n * 12.97 + 7.13) * 0.5 + 0.5;
    const N = 160;
    for (let i = 0; i < N; i++) {
      const a = rng(i) * Math.PI * 2;
      const r = Math.sqrt(rng(i * 1.7)) * (R - 0.4);
      const fx = Math.cos(a) * r;
      const fz = Math.sin(a) * r;
      const hotX = 2.0;
      const hotZ = -0.5;
      const dHot = Math.hypot(fx - hotX, fz - hotZ);
      const t = Math.max(0, Math.min(1, 1 - dHot / (R * 0.95)));
      const h = 0.16 + rng(i * 2.3) * 0.18; // varied bloom heights
      arr.push({ x: fx, z: fz, t, h });
    }
    return arr;
  }, []);

  return (
    <group position={[px, 0, pz]}>
      {/* Garden bed — deeper soil tone so the bright blooms pop */}
      <mesh receiveShadow position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 48]} />
        <meshStandardMaterial color="#3a2410" roughness={0.95} />
      </mesh>
      {/* Stone border */}
      <mesh receiveShadow position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R, R + 0.35, 48]} />
        <meshStandardMaterial color="#7a6a52" roughness={0.95} />
      </mesh>

      {/* Hot-zone glow underneath the red cluster — paints warmth on the dirt */}
      <mesh position={[2.0, 0.055, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#c44a3a" emissive="#e8261e" emissiveIntensity={0.5} roughness={0.7} transparent opacity={0.5} />
      </mesh>
      <pointLight position={[2.0, 0.6, -0.5]} intensity={1.4} distance={4.5} decay={2} color="#ff7a3a" />

      {/* Heatmap flowers — slightly bigger blooms with stronger emissive on hot */}
      {flowers.map((f, i) => {
        const c = heatColor(f.t);
        const e = heatEmissive(f.t);
        return (
          <group key={i} position={[f.x, 0.06, f.z]}>
            <mesh>
              <cylinderGeometry args={[0.025, 0.025, f.h, 6]} />
              <meshStandardMaterial color="#3a5a2a" roughness={0.95} />
            </mesh>
            <mesh position={[0, f.h, 0]} castShadow>
              <sphereGeometry args={[0.11, 8, 6]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={e} roughness={0.55} />
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
