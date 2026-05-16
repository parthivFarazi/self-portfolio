import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Billboard, Text } from '@react-three/drei';
import { CanvasTexture, RepeatWrapping, type Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import {
  metalSilverDark,
  stoneFoundation,
  goldEmissive,
  neonCyan,
  lampAmber,
} from '../materials';

const FONT_URL = '/fonts/helvetiker_regular.typeface.json';

// Pitch texture — striped grass + center line + center circle + penalty boxes
function makePitchTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 320;
  const ctx = c.getContext('2d')!;
  // Stripes
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#3e8a3e' : '#458f45';
    ctx.fillRect((i * c.width) / 10, 0, c.width / 10, c.height);
  }
  ctx.strokeStyle = '#f6f1e4';
  ctx.lineWidth = 4;
  // Outer touchline
  ctx.strokeRect(20, 20, c.width - 40, c.height - 40);
  // Center line
  ctx.beginPath();
  ctx.moveTo(c.width / 2, 20);
  ctx.lineTo(c.width / 2, c.height - 20);
  ctx.stroke();
  // Center circle
  ctx.beginPath();
  ctx.arc(c.width / 2, c.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(c.width / 2, c.height / 2, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#f6f1e4';
  ctx.fill();
  // Penalty boxes
  ctx.strokeRect(20, c.height / 2 - 90, 80, 180);
  ctx.strokeRect(c.width - 100, c.height / 2 - 90, 80, 180);
  // Goal boxes
  ctx.strokeRect(20, c.height / 2 - 40, 30, 80);
  ctx.strokeRect(c.width - 50, c.height / 2 - 40, 30, 80);
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  return tex;
}

function Floodlight({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh castShadow position={[0, 5, 0]} material={metalSilverDark}>
        <cylinderGeometry args={[0.12, 0.18, 10, 8]} />
      </mesh>
      <mesh position={[0, 10.4, 0]} material={lampAmber}>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
      </mesh>
      <pointLight position={[0, 10.4, 0]} intensity={0.9} distance={26} decay={2} color="#fff5d9" />
    </group>
  );
}

export function UPDT({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const pitchTex = useMemo(makePitchTexture, []);
  const droneA = useRef<Group>(null);
  const droneB = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (droneA.current) {
      droneA.current.position.x = Math.cos(t * 0.4) * 11;
      droneA.current.position.z = Math.sin(t * 0.4) * 8;
      droneA.current.position.y = 13 + Math.sin(t * 1.2) * 0.4;
    }
    if (droneB.current) {
      droneB.current.position.x = Math.cos(t * 0.4 + Math.PI) * 13;
      droneB.current.position.z = Math.sin(t * 0.4 + Math.PI) * 6;
      droneB.current.position.y = 14 + Math.sin(t * 1.4 + 1) * 0.4;
    }
  });

  // Half dimensions for the oval stadium
  const rx = 14;
  const rz = 10;
  const wallH = 8;

  return (
    <group position={[px, 0, pz]}>
      {/* Concrete foundation step */}
      <mesh receiveShadow position={[0, 0.25, 0]} material={stoneFoundation} scale={[rx + 1.2, 0.5, rz + 1.2]}>
        <cylinderGeometry args={[1, 1, 1, 64]} />
      </mesh>

      {/* Pitch — flat green oval inside */}
      <mesh receiveShadow position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[rx - 2, rz - 1.8, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial map={pitchTex} roughness={0.95} color="#3e8a3e" />
      </mesh>
      {/* Two goals */}
      {[[-rx + 2.6, 0, 0], [rx - 2.6, 0, 0]].map(([gx, , gz], i) => (
        <group key={i} position={[gx, 0.5, gz]}>
          <mesh material={metalSilverDark}>
            <boxGeometry args={[0.12, 1.8, 2.2]} />
          </mesh>
          <mesh position={[0, 0.9, 1.05]} material={metalSilverDark}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
          </mesh>
          <mesh position={[0, 0.9, -1.05]} material={metalSilverDark}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
          </mesh>
        </group>
      ))}

      {/* Outer ring stand — concrete tier surrounding the pitch */}
      <mesh castShadow receiveShadow position={[0, 1.8, 0]} material={stoneFoundation} scale={[rx, 1, rz]}>
        <ringGeometry args={[0.86, 1, 64]} />
        <meshStandardMaterial color="#bfb6a0" roughness={0.9} />
      </mesh>

      {/* Translucent glass curtain walls — outer shell */}
      <mesh castShadow position={[0, 0.5 + wallH / 2, 0]} scale={[rx, 1, rz]}>
        <cylinderGeometry args={[1, 1, wallH, 64, 1, true]} />
        <meshStandardMaterial
          color="#9ad6e0"
          roughness={0.18}
          metalness={0.2}
          transparent
          opacity={0.45}
          emissive="#1a3a40"
          emissiveIntensity={0.55}
          side={2}
        />
      </mesh>

      {/* Roof ring — open center but a structural beam ring around top */}
      <mesh castShadow position={[0, wallH + 0.7, 0]} material={metalSilverDark} scale={[rx, 1, rz]}>
        <torusGeometry args={[1, 0.06, 8, 64]} />
      </mesh>

      {/* Stadium lights (internal warm glow visible through translucent walls) */}
      <pointLight position={[0, 4, 0]} intensity={2.6} distance={30} decay={2} color="#fff1d6" />

      {/* Four floodlights at corner points of the oval */}
      <Floodlight pos={[-rx * 0.85, 0, -rz * 0.7]} />
      <Floodlight pos={[rx * 0.85, 0, -rz * 0.7]} />
      <Floodlight pos={[-rx * 0.85, 0, rz * 0.7]} />
      <Floodlight pos={[rx * 0.85, 0, rz * 0.7]} />

      {/* Entrance arch on the south side (toward spawn) */}
      <mesh castShadow position={[0, 2.5, rz + 0.4]} material={stoneFoundation}>
        <boxGeometry args={[5, 5, 1.2]} />
      </mesh>
      <mesh position={[0, 2.6, rz + 1.05]}>
        <boxGeometry args={[3, 3.4, 0.1]} />
        <meshStandardMaterial color="#0a1416" roughness={0.4} />
      </mesh>
      {/* Entrance plaza */}
      <mesh receiveShadow position={[0, 0.04, rz + 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#cdb582" roughness={0.85} />
      </mesh>

      {/* UPDT. gold signage above entrance — Text3D extruded, bloom-friendly */}
      <group position={[0, wallH + 0.6, rz + 0.95]} rotation={[0, 0, 0]}>
        <Text3D
          font={FONT_URL}
          size={1.5}
          height={0.35}
          bevelEnabled
          bevelSize={0.05}
          bevelThickness={0.07}
          letterSpacing={0.08}
          castShadow
          position={[-3.5, 0, 0]}
        >
          UPDT.
          <primitive object={goldEmissive} attach="material" />
        </Text3D>
      </group>

      {/* Two circling drones */}
      <group ref={droneA}>
        <mesh material={metalSilverDark}>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
        </mesh>
        <mesh position={[0, -0.1, 0]} material={neonCyan}>
          <sphereGeometry args={[0.06, 8, 6]} />
        </mesh>
      </group>
      <group ref={droneB}>
        <mesh material={metalSilverDark}>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
        </mesh>
        <mesh position={[0, -0.1, 0]} material={neonCyan}>
          <sphereGeometry args={[0.06, 8, 6]} />
        </mesh>
      </group>

      {/* Hologram glow over pitch — magenta/cyan ground spotlights */}
      <pointLight position={[-4, 1.5, 0]} intensity={1.8} distance={10} decay={2} color="#6fd5e0" />
      <pointLight position={[4, 1.5, 0]} intensity={1.6} distance={10} decay={2} color="#e07ec3" />

      <Billboard position={[0, wallH + 5, 0]}>
        <Text fontSize={1.2} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
