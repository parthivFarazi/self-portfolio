import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Billboard, Text } from '@react-three/drei';
import { CanvasTexture, RepeatWrapping, type Group } from 'three';
import type { BuildingDef } from '@/data/buildings';
import {
  metalSilverDark,
  metalDark,
  stoneFoundation,
  goldEmissive,
  neonCyan,
  lampAmber,
} from '../materials';

// ── Drones ─────────────────────────────────────────────────────────────────
// 5 small drones in slow elliptical orbits over the pitch. Each has 4 rotors
// that spin much faster than the orbit period for a subtle motion read.
interface DroneOrbit {
  rx: number;       // ellipse x-radius
  rz: number;       // ellipse z-radius
  altitude: number;
  speed: number;    // angular speed
  phase: number;    // start offset
  bobAmp: number;
}

const DRONE_ORBITS: DroneOrbit[] = [
  { rx: 11, rz: 8, altitude: 13.0, speed: 0.40, phase: 0,             bobAmp: 0.35 },
  { rx: 13, rz: 7, altitude: 14.2, speed: 0.40, phase: Math.PI,        bobAmp: 0.40 },
  { rx: 10, rz: 9, altitude: 13.6, speed: 0.32, phase: Math.PI * 0.5,  bobAmp: 0.30 },
  { rx: 12, rz: 8, altitude: 12.4, speed: 0.46, phase: Math.PI * 1.5,  bobAmp: 0.45 },
  { rx: 9,  rz: 7, altitude: 15.0, speed: 0.36, phase: Math.PI * 0.75, bobAmp: 0.32 },
];

function Drone({ onMount, onRotorMount }: {
  onMount: (el: Group | null) => void;
  onRotorMount: (i: number, el: Group | null) => void;
}) {
  return (
    <group ref={onMount}>
      {/* Main body — dark, slightly larger than the previous version */}
      <mesh material={metalDark}>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
      </mesh>
      {/* Faint blue LED on the underside */}
      <mesh position={[0, -0.09, 0]} material={neonCyan}>
        <sphereGeometry args={[0.05, 8, 6]} />
      </mesh>
      {/* 4 rotor arms + spinning rotor discs */}
      {[
        [-0.32, 0.32], [0.32, 0.32], [-0.32, -0.32], [0.32, -0.32],
      ].map(([rx, rz], i) => (
        <group key={i} position={[rx, 0.05, rz]}>
          {/* Rotor mount */}
          <mesh material={metalSilverDark}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 6]} />
          </mesh>
          {/* Spinning disc — child rotates fast */}
          <group ref={(el) => onRotorMount(i, el)} position={[0, 0.06, 0]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.18, 0.012, 12]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.4} transparent opacity={0.6} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

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

  // One group ref per drone + per-drone array of 4 rotor refs.
  const droneRefs = useRef<(Group | null)[]>(Array(DRONE_ORBITS.length).fill(null));
  const rotorRefs = useRef<(Group | null)[][]>(
    DRONE_ORBITS.map(() => [null, null, null, null]),
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    DRONE_ORBITS.forEach((o, i) => {
      const g = droneRefs.current[i];
      if (!g) return;
      const a = t * o.speed + o.phase;
      g.position.x = Math.cos(a) * o.rx;
      g.position.z = Math.sin(a) * o.rz;
      g.position.y = o.altitude + Math.sin(t * 1.2 + o.phase) * o.bobAmp;
      // Drone faces direction of travel — tangent to the ellipse.
      g.rotation.y = -a - Math.PI / 2;
      // Spin rotors much faster than the orbit.
      const rotors = rotorRefs.current[i];
      const spin = t * 22 + o.phase;
      rotors.forEach((r, k) => {
        if (r) r.rotation.y = spin + k * 0.3;
      });
    });
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

      {/* Five circling drones with rotors */}
      {DRONE_ORBITS.map((_, i) => (
        <Drone
          key={i}
          onMount={(el) => { droneRefs.current[i] = el; }}
          onRotorMount={(rIdx, el) => { rotorRefs.current[i][rIdx] = el; }}
        />
      ))}

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
