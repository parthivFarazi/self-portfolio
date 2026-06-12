import { Billboard, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import {
  stoneCool,
  brickRed,
  metalDark,
  lampAmber,
  goldEmissive,
  woodDark,
} from '../materials';

export function Lighthouse({ def, liteWorld = false }: { def: BuildingDef; liteWorld?: boolean }) {
  const [px, , pz] = def.position;
  const H = 14;
  const R = 2;

  const beam = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (beam.current) {
      beam.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={[px, 0, pz]}>
      {/* Stone foundation — flares outward at base */}
      <mesh receiveShadow position={[0, 0.3, 0]} material={stoneCool}>
        <cylinderGeometry args={[R + 1.2, R + 1.4, 0.6, 24]} />
      </mesh>

      {/* Main lighthouse body — alternating red and white bands */}
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 0.6 + (H / 7) * i + H / 14;
        return (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[0, y, 0]}
            material={i % 2 === 0 ? brickRed : stoneCool}
          >
            <cylinderGeometry args={[R, R, H / 7, 24]} />
          </mesh>
        );
      })}

      {/* Lantern room — octagonal glass enclosure at top */}
      <mesh position={[0, 0.6 + H + 0.4, 0]} material={metalDark}>
        <cylinderGeometry args={[R + 0.2, R + 0.2, 0.4, 8]} />
      </mesh>
      <mesh position={[0, 0.6 + H + 1.2, 0]}>
        <cylinderGeometry args={[R - 0.2, R - 0.2, 1.4, 8]} />
        <meshStandardMaterial color="#fffaee" transparent opacity={0.35} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Glowing lamp inside lantern */}
      <mesh position={[0, 0.6 + H + 1.2, 0]} material={lampAmber}>
        <sphereGeometry args={[0.5, 16, 12]} />
      </mesh>
      {/* Reduced from intensity=4/distance=28 — that single light dominated
          the per-fragment shader cost across half the island. Emissive lamp
          + bloom still reads as the focal beacon. Skipped entirely on
          liteWorld (lights mounting on LOD swaps force shader recompiles). */}
      {liteWorld ? null : (
        <pointLight position={[0, 0.6 + H + 1.2, 0]} intensity={1.4} distance={14} decay={2} color="#f5d97a" />
      )}

      {/* Sweeping beam — flat cone from the lantern */}
      <group ref={beam} position={[0, 0.6 + H + 1.2, 0]}>
        <mesh position={[0, 0, 6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.4, 12, 24, 1, true]} />
          <meshStandardMaterial
            color="#f5d97a"
            transparent
            opacity={0.18}
            emissive="#f5d97a"
            emissiveIntensity={0.6}
            depthWrite={false}
            side={2}
          />
        </mesh>
      </group>

      {/* Black conical cap */}
      <mesh castShadow position={[0, 0.6 + H + 2.4, 0]} material={metalDark}>
        <coneGeometry args={[R, 1.6, 12]} />
      </mesh>
      {/* Tiny gold finial */}
      <mesh position={[0, 0.6 + H + 3.4, 0]} material={goldEmissive}>
        <coneGeometry args={[0.1, 0.4, 8]} />
      </mesh>

      {/* Vintage red mailbox — east side, visible to camera */}
      <group position={[R + 0.7, 0.6, 1.0]}>
        <mesh castShadow material={woodDark} position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
        </mesh>
        <mesh castShadow position={[0, 0.8, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.3]} />
          <meshStandardMaterial color="#a01a14" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.95, 0.16]} material={goldEmissive}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
        </mesh>
      </group>

      {/* Terminal post — moved to the south side so it reads from camera. */}
      <group position={[-0.8, 0.6, R + 0.8]}>
        <mesh castShadow material={metalDark} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 6]} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.5, 0.32, 0.06]} />
          <meshStandardMaterial color="#0a1a14" emissive="#7cd17a" emissiveIntensity={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* Small wooden entry door at the base, on the south-facing side */}
      <mesh position={[0.6, 1.0, R + 0.05]}>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color="#3a2410" roughness={0.7} />
      </mesh>
      {/* Door arch top */}
      <mesh position={[0.6, 1.7, R + 0.08]} material={stoneCool}>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 12, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Stone stoop in front of the door */}
      <mesh receiveShadow position={[0.6, 0.55, R + 0.45]} material={stoneCool}>
        <boxGeometry args={[1.2, 0.15, 0.55]} />
      </mesh>

      <Billboard position={[0, H + 6, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
