import { Billboard, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneWarm, stoneCool, goldEmissive, neonCyan, woodDark } from '../materials';

function Firefly({ seed }: { seed: number }) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.getElapsedTime() + seed;
    g.current.position.x = Math.cos(t * 0.5 + seed) * 4 + Math.sin(t * 0.2) * 0.8;
    g.current.position.y = 3.5 + Math.sin(t * 0.4 + seed) * 1.2;
    g.current.position.z = Math.sin(t * 0.5 + seed) * 4 + Math.cos(t * 0.2) * 0.8;
  });
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshStandardMaterial color="#f5d97a" emissive="#f5d97a" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export function Archive({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const baseH = 4;
  const R = 3.5;

  return (
    <group position={[px, 0, pz]}>
      {/* Stone foundation */}
      <mesh receiveShadow position={[0, 0.25, 0]} material={stoneCool}>
        <boxGeometry args={[R * 2 + 0.6, 0.5, R * 2 + 0.6]} />
      </mesh>

      {/* Stone temple body */}
      <mesh castShadow receiveShadow position={[0, 0.5 + baseH / 2, 0]} material={stoneWarm}>
        <boxGeometry args={[R * 2, baseH, R * 2]} />
      </mesh>

      {/* Arched window cutouts — 3 per side, just paint as dark rectangles */}
      {[-R + 1.2, 0, R - 1.2].map((wx, i) => (
        <group key={i}>
          {/* Front face */}
          <mesh position={[wx, 0.5 + 2.4, R + 0.01]}>
            <boxGeometry args={[0.8, 1.6, 0.08]} />
            <meshStandardMaterial color="#1a1410" emissive="#3a2410" emissiveIntensity={0.3} roughness={0.5} />
          </mesh>
          <mesh position={[wx, 0.5 + 3.5, R + 0.04]} material={stoneCool}>
            <cylinderGeometry args={[0.4, 0.4, 0.08, 16, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Mirrored on the back */}
          <mesh position={[wx, 0.5 + 2.4, -R - 0.01]}>
            <boxGeometry args={[0.8, 1.6, 0.08]} />
            <meshStandardMaterial color="#1a1410" emissive="#3a2410" emissiveIntensity={0.3} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Arched doorway — front center */}
      <mesh position={[0, 0.5 + 1.4, R + 0.02]}>
        <boxGeometry args={[1.4, 2.8, 0.1]} />
        <meshStandardMaterial color="#3a2410" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.5 + 2.8, R + 0.05]} material={stoneWarm}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 16, 1, false, 0, Math.PI]} />
      </mesh>

      {/* Stone steps in front */}
      {[0, 1].map((i) => (
        <mesh key={i} receiveShadow position={[0, 0.5 - 0.2 - i * 0.18, R + 0.6 + i * 0.5]} material={stoneCool}>
          <boxGeometry args={[2.2 + i * 0.4, 0.2, 0.6]} />
        </mesh>
      ))}

      {/* Hemispherical dome */}
      <mesh castShadow receiveShadow position={[0, 0.5 + baseH, 0]}>
        <sphereGeometry args={[R + 0.2, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c5beaa" roughness={0.75} emissive="#f5d97a" emissiveIntensity={0.15} />
      </mesh>
      {/* Tiny gold finial */}
      <mesh position={[0, 0.5 + baseH + R + 0.5, 0]} material={goldEmissive}>
        <coneGeometry args={[0.14, 0.6, 8]} />
      </mesh>

      {/* Stone columns at the entrance corners */}
      {[[-R + 0.4, R + 0.4], [R - 0.4, R + 0.4]].map(([cx, cz], i) => (
        <group key={i} position={[cx, 0.5, cz]}>
          <mesh castShadow material={stoneCool}>
            <cylinderGeometry args={[0.22, 0.26, baseH, 12]} />
          </mesh>
          <mesh castShadow material={stoneCool} position={[0, baseH / 2, 0]}>
            <boxGeometry args={[0.5, 0.2, 0.5]} />
          </mesh>
        </group>
      ))}

      {/* Ivy splashes on side walls — small green dabs */}
      {[1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[(-R) - 0.01, 0.5 + 1 + (i % 2) * 1.6, -R + i * 1.2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial color="#3a5a2a" roughness={0.9} side={2} />
        </mesh>
      ))}

      {/* Brass plaque outside */}
      <mesh position={[-R - 0.05, 1.4, R - 1]}>
        <boxGeometry args={[0.06, 0.8, 0.5]} />
        <meshStandardMaterial color="#b89860" metalness={0.7} roughness={0.4} emissive="#9a7a40" emissiveIntensity={0.2} />
      </mesh>

      {/* H100 GPU rack peeking through one window (cyan LEDs) */}
      <group position={[0, 1.4, -R + 0.3]}>
        <mesh material={woodDark}>
          <boxGeometry args={[1, 1.5, 0.4]} />
        </mesh>
        {[0, 0.3, 0.6, -0.3, -0.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0.21]} material={neonCyan}>
            <sphereGeometry args={[0.04, 6, 6]} />
          </mesh>
        ))}
      </group>

      {/* Floating glowing quote-fireflies around the building */}
      {[0.0, 0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9].map((s) => (
        <Firefly key={s} seed={s} />
      ))}
      <pointLight position={[0, baseH + 1, 0]} intensity={1.2} distance={10} decay={2} color="#f5d97a" />

      <Billboard position={[0, baseH + R + 3, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
