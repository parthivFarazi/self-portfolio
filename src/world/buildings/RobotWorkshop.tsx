import { Billboard, Text } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { woodDark, woodMid, metalSilverDark, neonCyan, brickRed, lampAmber } from '../materials';

export function RobotWorkshop({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const W = 3;
  const D = 3;
  const H = 3;

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

      {/* Corrugated metal roof — zigzag using a few overlapping triangular prisms */}
      <mesh castShadow position={[0, 0.5 + H + 0.4, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, D + 0.6, 3, 1]} />
        <meshStandardMaterial color="#5a6068" roughness={0.55} metalness={0.5} />
      </mesh>

      {/* Open doorway — dark inside */}
      <mesh position={[0, 0.5 + 1.1, D / 2 + 0.01]}>
        <boxGeometry args={[1.1, 2.2, 0.08]} />
        <meshStandardMaterial color="#1a1410" roughness={0.7} />
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
      <pointLight position={[0, 0.7, D / 2 - 0.7]} intensity={0.4} distance={2.4} decay={2} color="#6fd5e0" />

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
      <pointLight position={[W / 2 + 0.3, 1.4, D / 2 - 0.4]} intensity={0.5} distance={3.5} decay={2} color="#f5d97a" />

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
