import { Billboard, Text } from '@react-three/drei';
import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneFoundation, metalSilverDark, lampAmber } from '../materials';

// American football pitch — green with yard-line stripes every 10 yards.
function makeFootballPitchTexture() {
  const c = document.createElement('canvas');
  c.width = 480; c.height = 200;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#3e8a3e';
  ctx.fillRect(0, 0, c.width, c.height);
  // Mowed stripes
  for (let i = 0; i < 12; i++) {
    if (i % 2) {
      ctx.fillStyle = '#458f45';
      ctx.fillRect((i * c.width) / 12, 0, c.width / 12, c.height);
    }
  }
  ctx.strokeStyle = '#f6f1e4';
  ctx.lineWidth = 3;
  // Outline
  ctx.strokeRect(20, 20, c.width - 40, c.height - 40);
  // Yard lines every 40px
  for (let x = 40; x < c.width - 20; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, c.height - 20);
    ctx.stroke();
  }
  // Numbers (just dabs)
  ctx.fillStyle = '#f6f1e4';
  ctx.font = 'bold 14px sans-serif';
  for (let n = 1; n < 11; n++) {
    ctx.fillText(`${Math.min(n, 10 - n) * 10}`, n * 40 + 12, 50);
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  return tex;
}

function Banner({ x, label, color }: { x: number; label: string; color: string }) {
  return (
    <group position={[x, 9, -7]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.9, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.4} emissive={color} emissiveIntensity={0.18} />
      </mesh>
      <Text position={[0, 0, 0.06]} fontSize={0.32} color="#fffaee" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

export function Athletic({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const pitch = useMemo(makeFootballPitchTexture, []);

  const rx = 12;
  const rz = 8;
  const wallH = 5.5;

  return (
    <group position={[px, 0, pz]}>
      {/* Concrete foundation */}
      <mesh receiveShadow position={[0, 0.25, 0]} material={stoneFoundation} scale={[rx + 0.8, 0.5, rz + 0.8]}>
        <cylinderGeometry args={[1, 1, 1, 64]} />
      </mesh>

      {/* Field — flat green oval */}
      <mesh receiveShadow position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[rx - 1.5, rz - 1.2, 1]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial map={pitch} roughness={0.95} color="#3e8a3e" />
      </mesh>

      {/* Concrete bowl walls */}
      <mesh castShadow position={[0, 0.5 + wallH / 2, 0]} scale={[rx, 1, rz]}>
        <cylinderGeometry args={[1, 1.02, wallH, 64, 1, true]} />
        <meshStandardMaterial color="#c5beaa" roughness={0.92} side={2} />
      </mesh>

      {/* Exterior pilasters every 30° — adds vertical rhythm and depth */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x = Math.cos(a) * rx * 1.01;
        const z = Math.sin(a) * rz * 1.01;
        const yaw = Math.atan2(x, z);
        return (
          <mesh key={`pi-${i}`} castShadow position={[x, 0.5 + wallH / 2, z]} rotation={[0, yaw, 0]} material={stoneFoundation}>
            <boxGeometry args={[0.5, wallH, 0.3]} />
          </mesh>
        );
      })}

      {/* Top cornice — flat concrete cap ring lying on the bowl rim */}
      <mesh castShadow position={[0, 0.5 + wallH + 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[rx + 0.05, rz + 0.05, 1]}>
        <ringGeometry args={[0.98, 1.05, 64]} />
        <meshStandardMaterial color="#a8a298" roughness={0.85} side={2} />
      </mesh>
      <mesh castShadow position={[0, 0.5 + wallH + 0.1, 0]} scale={[rx + 0.07, 1, rz + 0.07]}>
        <cylinderGeometry args={[1, 1, 0.2, 64, 1, true]} />
        <meshStandardMaterial color="#bcb6a0" roughness={0.9} side={2} />
      </mesh>

      {/* Exterior banner panels — alternating navy/red around the bowl */}
      {[
        { ang: Math.PI * 0.10, color: '#1a3458' },
        { ang: Math.PI * 0.32, color: '#c44a3a' },
        { ang: Math.PI * 0.68, color: '#1a3458' },
        { ang: Math.PI * 0.90, color: '#c44a3a' },
        { ang: Math.PI * 1.10, color: '#1a3458' },
        { ang: Math.PI * 1.32, color: '#c44a3a' },
        { ang: Math.PI * 1.68, color: '#1a3458' },
        { ang: Math.PI * 1.90, color: '#c44a3a' },
      ].map((b, i) => {
        const x = Math.cos(b.ang) * (rx * 1.05);
        const z = Math.sin(b.ang) * (rz * 1.05);
        const yaw = Math.atan2(x, z);
        return (
          <mesh key={`bn-${i}`} position={[x, 3.2, z]} rotation={[0, yaw, 0]}>
            <planeGeometry args={[1.0, 2.4]} />
            <meshStandardMaterial color={b.color} roughness={0.7} side={2} />
          </mesh>
        );
      })}

      {/* Two American football goalposts (the U-shape) */}
      {[-rx + 2, rx - 2].map((gx, i) => (
        <group key={i} position={[gx, 0.5, 0]}>
          <mesh castShadow material={metalSilverDark}>
            <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
          </mesh>
          <mesh castShadow position={[0, 2, 0]} material={metalSilverDark}>
            <boxGeometry args={[0.1, 0.1, 3]} />
          </mesh>
          <mesh castShadow position={[0, 2.6, 1.5]} material={metalSilverDark}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
          </mesh>
          <mesh castShadow position={[0, 2.6, -1.5]} material={metalSilverDark}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
          </mesh>
        </group>
      ))}

      {/* Floating conference banners above the upper deck */}
      <Banner x={-6} label="B1G" color="#1a3458" />
      <Banner x={-2} label="SEC" color="#c44a3a" />
      <Banner x={2} label="ACC" color="#3a6a8c" />
      <Banner x={6} label="B12" color="#7a3a4a" />

      {/* "THE VALUATION ISSUE" jumbotron — mounted on the north (-z) interior
          wall instead of floating over the field, so the pitch reads clearly
          from the camera angle. */}
      <group position={[0, 4.2, -rz + 0.3]} rotation={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[5.4, 2.4, 0.12]} />
          <meshStandardMaterial color="#1a1410" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <boxGeometry args={[5.0, 2.0, 0.02]} />
          <meshStandardMaterial color="#fbf6e6" emissive="#f5d97a" emissiveIntensity={0.18} roughness={0.55} />
        </mesh>
        <Text position={[0, 0.55, 0.1]} fontSize={0.36} color="#1a1410" anchorX="center" anchorY="middle">
          THE VALUATION ISSUE
        </Text>
        <Text position={[0, -0.05, 0.1]} fontSize={0.2} color="#7a5a30" anchorX="center" anchorY="middle">
          a Parthiv Farazi feature
        </Text>
        <Text position={[0, -0.55, 0.1]} fontSize={0.16} color="#9a7a50" anchorX="center" anchorY="middle">
          Athletic Department · 2026
        </Text>
      </group>

      {/* Grand entrance — stepped pediment + columns + ticket booth */}
      <mesh castShadow position={[0, 2.6, rz + 0.6]} material={stoneFoundation}>
        <boxGeometry args={[5.6, 5.2, 1.2]} />
      </mesh>
      {/* Stepped pediment */}
      <mesh castShadow position={[0, 5.3, rz + 0.6]} material={stoneFoundation}>
        <boxGeometry args={[6.4, 0.35, 1.4]} />
      </mesh>
      <mesh castShadow position={[0, 5.65, rz + 0.6]} material={stoneFoundation}>
        <boxGeometry args={[5.8, 0.25, 1.4]} />
      </mesh>
      {/* Doorway opening — dark glass with warm glow behind */}
      <mesh position={[0, 1.9, rz + 1.22]}>
        <boxGeometry args={[2.8, 3.4, 0.05]} />
        <meshStandardMaterial color="#1a1410" roughness={0.4} emissive="#f5b66a" emissiveIntensity={0.25} />
      </mesh>
      {/* Two flanking columns */}
      {[-2.0, 2.0].map((cx, i) => (
        <mesh key={`col-${i}`} castShadow position={[cx, 2.5, rz + 1.15]} material={stoneFoundation}>
          <cylinderGeometry args={[0.22, 0.25, 4.8, 12]} />
        </mesh>
      ))}
      {/* "VALUATION" lettering above the entrance */}
      <Text
        position={[0, 4.7, rz + 1.23]}
        fontSize={0.42}
        color="#fffaee"
        outlineWidth={0.04}
        outlineColor="#7a3a26"
        anchorX="center"
        anchorY="middle"
      >
        VALUATION
      </Text>
      {/* Small lamp on the right-hand column */}
      <mesh position={[2.0, 4.0, rz + 1.4]} material={lampAmber}>
        <boxGeometry args={[0.25, 0.45, 0.2]} />
      </mesh>
      {/* Side entry plaza */}
      <mesh receiveShadow position={[0, 0.04, rz + 4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 5]} />
        <meshStandardMaterial color="#cdb582" roughness={0.85} />
      </mesh>

      <Billboard position={[0, wallH + 5, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
