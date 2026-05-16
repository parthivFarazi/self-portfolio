import { Billboard, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Shape, ExtrudeGeometry, type Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { woodDark, woodMid, metalSilverDark, neonCyan, brickRed, lampAmber } from '../materials';

export function RobotWorkshop({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const W = 3;
  const D = 3;
  const H = 3;

  // Small gable roof
  const roofGeo = useMemo(() => {
    const s = new Shape();
    const halfD = D / 2 + 0.25;
    s.moveTo(-halfD, 0);
    s.lineTo(halfD, 0);
    s.lineTo(0, 1.4);
    s.closePath();
    return new ExtrudeGeometry(s, { depth: W + 0.5, bevelEnabled: false });
  }, []);

  // Robot roams in a small loop around the shed
  const robot = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!robot.current) return;
    const t = clock.getElapsedTime() * 0.4;
    robot.current.position.x = Math.cos(t) * 3.5;
    robot.current.position.z = Math.sin(t) * 3.5;
    robot.current.rotation.y = -t + Math.PI / 2;
  });

  return (
    <group position={[px, 0, pz]}>
      {/* Dirt patch under the shed */}
      <mesh receiveShadow position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[W + 1.4, 32]} />
        <meshStandardMaterial color="#6a5a42" roughness={1} />
      </mesh>

      {/* Wooden walls — slightly weathered */}
      <mesh castShadow receiveShadow position={[0, 0.5 + H / 2, 0]} material={woodDark}>
        <boxGeometry args={[W, H, D]} />
      </mesh>
      {/* Plank seam lines (4 vertical strips on each wall, slightly lighter) */}
      {[-W / 3, 0, W / 3].map((sx, i) => (
        <mesh key={i} position={[sx, 0.5 + H / 2, D / 2 + 0.01]} material={woodMid}>
          <boxGeometry args={[0.04, H - 0.2, 0.05]} />
        </mesh>
      ))}

      {/* Corrugated metal gable roof */}
      <mesh
        castShadow
        receiveShadow
        geometry={roofGeo}
        position={[-(W + 0.5) / 2, 0.5 + H, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial color="#5a6068" roughness={0.5} metalness={0.5} />
      </mesh>
      {/* Roof ridge cap */}
      <mesh castShadow position={[0, 0.5 + H + 1.4, 0]} material={metalSilverDark}>
        <boxGeometry args={[W + 0.6, 0.1, 0.18]} />
      </mesh>

      {/* Open doorway — wider, dark inside so the workbench reads */}
      <mesh position={[0, 0.5 + 1.2, D / 2 + 0.01]}>
        <boxGeometry args={[1.4, 2.4, 0.08]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} />
      </mesh>
      {/* Wooden door frame around the opening */}
      <mesh position={[-0.75, 0.5 + 1.2, D / 2 + 0.04]} material={woodMid}>
        <boxGeometry args={[0.12, 2.5, 0.08]} />
      </mesh>
      <mesh position={[0.75, 0.5 + 1.2, D / 2 + 0.04]} material={woodMid}>
        <boxGeometry args={[0.12, 2.5, 0.08]} />
      </mesh>
      <mesh position={[0, 0.5 + 2.45, D / 2 + 0.04]} material={woodMid}>
        <boxGeometry args={[1.6, 0.12, 0.08]} />
      </mesh>

      {/* Small lit workshop window on the east (+x) face — glow visible from
          the camera's other visible side. */}
      <mesh position={[W / 2 + 0.01, 0.5 + 1.6, 0.5]}>
        <boxGeometry args={[0.04, 0.85, 0.9]} />
        <meshStandardMaterial
          color="#f5e0a0"
          emissive="#f5b66a"
          emissiveIntensity={0.85}
          roughness={0.5}
        />
      </mesh>
      {/* Window cross frame */}
      <mesh position={[W / 2 + 0.025, 0.5 + 1.6, 0.5]} material={woodMid}>
        <boxGeometry args={[0.03, 0.85, 0.06]} />
      </mesh>
      <mesh position={[W / 2 + 0.025, 0.5 + 1.6, 0.5]} material={woodMid}>
        <boxGeometry args={[0.03, 0.06, 0.9]} />
      </mesh>
      {/* Hanging tools / planters under the window */}
      <mesh castShadow position={[W / 2 + 0.16, 0.5 + 0.7, 0.5]} material={metalSilverDark}>
        <cylinderGeometry args={[0.06, 0.04, 0.22, 6]} />
      </mesh>
      <mesh castShadow position={[W / 2 + 0.18, 0.5 + 0.5, 0.5]} material={woodMid}>
        <boxGeometry args={[0.08, 0.4, 0.05]} />
      </mesh>

      {/* Tiny workbench inside */}
      <mesh castShadow position={[0, 0.5 + 0.45, D / 2 - 0.6]} material={woodMid}>
        <boxGeometry args={[1.4, 0.06, 0.6]} />
      </mesh>
      <mesh castShadow position={[-0.5, 0.5 + 0.2, D / 2 - 0.6]} material={woodMid}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
      </mesh>
      <mesh castShadow position={[0.5, 0.5 + 0.2, D / 2 - 0.6]} material={woodMid}>
        <boxGeometry args={[0.08, 0.4, 0.5]} />
      </mesh>
      {/* Arduino LED on the workbench */}
      <mesh position={[0, 0.5 + 0.5, D / 2 - 0.6]} material={neonCyan}>
        <sphereGeometry args={[0.04, 8, 6]} />
      </mesh>
      {/* (no <pointLight> — emissive Arduino LED + bloom is enough) */}

      {/* Malaysian flag pinned to the wall — red/white/blue stripes */}
      <group position={[-W / 2 + 0.45, 1.8, D / 2 + 0.05]}>
        <mesh material={brickRed}>
          <boxGeometry args={[0.5, 0.05, 0.06]} />
        </mesh>
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.06]} />
          <meshStandardMaterial color="#fffaee" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.06]} />
          <meshStandardMaterial color="#1a3458" roughness={0.5} />
        </mesh>
      </group>

      {/* Small lantern outside */}
      <mesh position={[W / 2 + 0.3, 1.2, D / 2 - 0.4]} material={lampAmber}>
        <boxGeometry args={[0.18, 0.3, 0.18]} />
      </mesh>
      {/* (no <pointLight> for the outside lantern — emissive material + bloom) */}

      {/* The robot — wheels + body + solar panel — roaming */}
      <group ref={robot}>
        <mesh castShadow position={[0, 0.4, 0]} material={metalSilverDark}>
          <boxGeometry args={[0.55, 0.35, 0.65]} />
        </mesh>
        {/* Wheels */}
        <mesh position={[-0.32, 0.2, 0.25]} rotation={[0, 0, Math.PI / 2]} material={woodDark}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        </mesh>
        <mesh position={[0.32, 0.2, 0.25]} rotation={[0, 0, Math.PI / 2]} material={woodDark}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        </mesh>
        <mesh position={[-0.32, 0.2, -0.25]} rotation={[0, 0, Math.PI / 2]} material={woodDark}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        </mesh>
        <mesh position={[0.32, 0.2, -0.25]} rotation={[0, 0, Math.PI / 2]} material={woodDark}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 12]} />
        </mesh>
        {/* Solar panel */}
        <mesh castShadow position={[0, 0.65, 0]} rotation={[Math.PI / 12, 0, 0]}>
          <boxGeometry args={[0.5, 0.04, 0.55]} />
          <meshStandardMaterial color="#1a2840" roughness={0.4} metalness={0.5} emissive="#3a6ec8" emissiveIntensity={0.2} />
        </mesh>
        {/* Tiny pickup arm */}
        <mesh castShadow position={[0, 0.45, 0.4]} material={metalSilverDark}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 6]} />
        </mesh>
      </group>

      <Billboard position={[0, H + 3, 0]}>
        <Text fontSize={0.9} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
