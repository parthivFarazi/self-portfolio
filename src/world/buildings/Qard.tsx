import { Billboard, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneCool, woodDark, neonCyan, neonMagenta, goldEmissive } from '../materials';

function FloatingCard({
  offset,
  color,
  hue,
}: {
  offset: number;
  color: string;
  hue: number;
}) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime() + offset;
    g.current.position.y = 2.4 + Math.sin(t * 0.8) * 0.5;
    g.current.position.x = Math.cos(t * 0.3 + hue) * 1.2;
    g.current.position.z = Math.sin(t * 0.3 + hue) * 1.2;
    g.current.rotation.y = t * 0.6;
    g.current.rotation.z = Math.sin(t * 0.5) * 0.12;
  });
  return (
    <group ref={g}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.55, 0.04]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
      {/* Card chip detail */}
      <mesh position={[-0.25, 0.05, 0.03]}>
        <boxGeometry args={[0.18, 0.14, 0.005]} />
        <meshStandardMaterial color="#d4b86a" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function Qard({ def, liteWorld = false }: { def: BuildingDef; liteWorld?: boolean }) {
  const [px, , pz] = def.position;
  const R = 4;
  const baseH = 1.2;

  return (
    <group position={[px, 0, pz]}>
      {/* Foundation */}
      <mesh receiveShadow position={[0, 0.1, 0]} material={stoneCool}>
        <cylinderGeometry args={[R + 0.4, R + 0.6, 0.2, 32]} />
      </mesh>

      {/* White cylindrical base */}
      <mesh castShadow receiveShadow position={[0, 0.2 + baseH / 2, 0]}>
        <cylinderGeometry args={[R, R, baseH, 32]} />
        <meshStandardMaterial color="#fffaee" roughness={0.6} />
      </mesh>

      {/* Geodesic dome — IcosahedronGeometry with subdivision shows the facet pattern */}
      <mesh castShadow receiveShadow position={[0, 0.2 + baseH, 0]} scale={[R, R * 0.95, R]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#9ad6e0"
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.45}
          emissive="#1a3a40"
          emissiveIntensity={0.4}
          flatShading
        />
      </mesh>

      {/* White frame at the dome equator */}
      <mesh position={[0, 0.2 + baseH, 0]} material={woodDark}>
        <torusGeometry args={[R - 0.05, 0.07, 8, 48]} />
      </mesh>

      {/* Floating card-flowers inside */}
      <FloatingCard offset={0.0} color="#6fd5e0" hue={0} />
      <FloatingCard offset={1.2} color="#e07ec3" hue={Math.PI * 0.5} />
      <FloatingCard offset={2.4} color="#d4c178" hue={Math.PI} />
      <FloatingCard offset={3.6} color="#94e2c0" hue={Math.PI * 1.5} />

      {/* Soft interior glow — skipped on liteWorld (lights mounting on LOD
          swaps force shader recompiles; the emissive dome carries the look) */}
      {liteWorld ? null : (
        <pointLight position={[0, 2.5, 0]} intensity={1.6} distance={9} decay={2} color="#cdf3e2" />
      )}

      {/* "qard.dev" plaque at the entrance */}
      <group position={[0, 0.8, R + 0.3]}>
        <mesh castShadow material={woodDark}>
          <boxGeometry args={[1.4, 0.3, 0.08]} />
        </mesh>
        <mesh position={[0, 0, 0.05]} material={goldEmissive}>
          <boxGeometry args={[1.2, 0.18, 0.02]} />
        </mesh>
      </group>

      {/* Neon trim accent at dome base */}
      <mesh position={[0, 0.2 + baseH - 0.05, 0]} material={neonCyan}>
        <torusGeometry args={[R + 0.05, 0.04, 8, 48]} />
      </mesh>

      {/* Small water feature in front — pond */}
      <mesh receiveShadow position={[0, 0.05, R + 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 24]} />
        <meshStandardMaterial color="#3a5e7a" emissive="#1a3a4a" emissiveIntensity={0.2} roughness={0.25} />
      </mesh>

      {/* Magenta trim accent at the back */}
      <mesh position={[0, baseH + R * 0.95 + 0.2, 0]} material={neonMagenta}>
        <sphereGeometry args={[0.15, 12, 8]} />
      </mesh>

      <Billboard position={[0, R + 4, 0]}>
        <Text fontSize={1} color="#2a2520" sdfGlyphSize={128} outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
