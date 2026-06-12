import { Billboard, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Shape, ExtrudeGeometry, type Mesh } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneCool, woodDark, neonCyan, lampAmber, brickRedDark } from '../materials';

export function Forge({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const W = 8;
  const D = 6;
  const H = 4;

  // Gable roof: triangular prism extruded along X. Triangle cross-section in
  // the YZ plane with base = D+0.4, peak height = 2.4.
  const roofGeo = useMemo(() => {
    const s = new Shape();
    const halfD = D / 2 + 0.2;
    s.moveTo(-halfD, 0);
    s.lineTo(halfD, 0);
    s.lineTo(0, 2.4);
    s.closePath();
    return new ExtrudeGeometry(s, { depth: W + 0.6, bevelEnabled: false });
  }, []);

  const smoke = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (smoke.current) {
      const t = clock.getElapsedTime();
      smoke.current.position.y = H + 2 + Math.sin(t * 0.6) * 0.2;
      smoke.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.08);
    }
  });

  return (
    <group position={[px, 0, pz]}>
      {/* Stone foundation */}
      <mesh receiveShadow position={[0, 0.25, 0]} material={stoneCool}>
        <boxGeometry args={[W + 0.6, 0.5, D + 0.6]} />
      </mesh>

      {/* Rough stone walls — slightly displaced color for blocks */}
      <mesh castShadow receiveShadow position={[0, 0.5 + H / 2, 0]} material={stoneCool}>
        <boxGeometry args={[W, H, D]} />
      </mesh>

      {/* Wooden shingled gable roof — triangular prism running along X */}
      <mesh
        castShadow
        receiveShadow
        geometry={roofGeo}
        position={[-(W + 0.6) / 2, 0.5 + H, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#5a3a22" roughness={0.85} />
      </mesh>
      {/* Roof ridge cap */}
      <mesh castShadow position={[0, 0.5 + H + 2.4, 0]} material={woodDark}>
        <boxGeometry args={[W + 0.7, 0.18, 0.3]} />
      </mesh>

      {/* Stone chimney on left side */}
      <mesh castShadow position={[-W / 2 + 1.2, 0.5 + H + 1.6, -D / 2 + 1.2]} material={brickRedDark}>
        <boxGeometry args={[1, 3, 1]} />
      </mesh>
      <mesh position={[-W / 2 + 1.2, 0.5 + H + 3.2, -D / 2 + 1.2]} material={stoneCool}>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
      </mesh>
      {/* Smoke puff */}
      <mesh ref={smoke} position={[-W / 2 + 1.2, H + 2, -D / 2 + 1.2]}>
        <sphereGeometry args={[0.6, 12, 10]} />
        <meshStandardMaterial color="#cfc4b6" transparent opacity={0.55} roughness={1} emissive="#5a4030" emissiveIntensity={0.1} />
      </mesh>

      {/* Front archway — bigger opening on +z face so the camera reads it */}
      <mesh position={[0, 0.5 + 1.7, D / 2 + 0.01]}>
        <boxGeometry args={[3.0, 3.4, 0.1]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} />
      </mesh>
      {/* Archway top */}
      <mesh position={[0, 0.5 + 3.4, D / 2 + 0.05]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} />
      </mesh>
      {/* Wooden porch awning over the entrance */}
      <mesh castShadow position={[0, 0.5 + 4.1, D / 2 + 0.9]} material={woodDark}>
        <boxGeometry args={[3.8, 0.18, 1.8]} />
      </mesh>
      {/* Two support posts holding up the awning */}
      {[-1.6, 1.6].map((sx, i) => (
        <mesh key={`p-${i}`} castShadow position={[sx, 0.5 + 2.0, D / 2 + 1.6]} material={woodDark}>
          <cylinderGeometry args={[0.08, 0.1, 4.0, 6]} />
        </mesh>
      ))}
      {/* Stone steps in front of the door */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={`st-${i}`}
          receiveShadow
          castShadow
          position={[0, 0.4 - i * 0.16, D / 2 + 0.55 + i * 0.45]}
          material={stoneCool}
        >
          <boxGeometry args={[3.0 + i * 0.3, 0.18, 0.45]} />
        </mesh>
      ))}
      {/* Hanging "FORGE" wood plank above the door */}
      <mesh castShadow position={[0, 0.5 + 4.4, D / 2 + 0.4]} material={woodDark}>
        <boxGeometry args={[1.6, 0.5, 0.06]} />
      </mesh>

      {/* Through the archway: glowing GPU anvil */}
      <mesh position={[0, 0.5 + 0.6, D / 2 - 0.5]} material={neonCyan}>
        <boxGeometry args={[1.6, 0.8, 1.0]} />
      </mesh>
      {/* GPU rack silhouette behind the anvil */}
      <mesh position={[0.8, 0.5 + 1, -1]} material={woodDark}>
        <boxGeometry args={[1.2, 2, 0.6]} />
      </mesh>
      {/* GPU LED dots */}
      {[0, 0.3, 0.6, 0.9, 1.2].map((y, i) => (
        <mesh key={i} position={[0.8, 0.5 + 0.4 + y, -0.7]} material={neonCyan}>
          <sphereGeometry args={[0.06, 8, 6]} />
        </mesh>
      ))}

      {/* Warm orange interior glow — emissive + bloom does the visual work,
          so no <pointLight> needed (each one taxes every fragment). */}
      <mesh position={[0, 1.5, D / 2 - 0.6]}>
        <sphereGeometry args={[0.3, 10, 8]} />
        <meshStandardMaterial color="#f5a05a" emissive="#f5a05a" emissiveIntensity={1.4} roughness={0.6} />
      </mesh>

      {/* Lantern on outer wall */}
      <mesh position={[W / 2 - 0.6, 2, D / 2 + 0.05]} material={lampAmber}>
        <boxGeometry args={[0.25, 0.4, 0.25]} />
      </mesh>

      <Billboard position={[0, H + 6, 0]}>
        <Text fontSize={1} color="#2a2520" sdfGlyphSize={128} outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
