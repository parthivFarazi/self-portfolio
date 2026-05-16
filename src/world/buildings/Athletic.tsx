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

      {/* Tiered seating — three concentric ovals stepping up */}
      {[0, 1, 2].map((i) => {
        const r = i * 0.6;
        return (
          <mesh
            key={i}
            castShadow
            receiveShadow
            position={[0, 0.5 + 1 + i * 1.4, 0]}
            material={stoneFoundation}
            scale={[rx - r, 1, rz - r]}
          >
            <ringGeometry args={[0.78, 1, 64]} />
            <meshStandardMaterial color={i % 2 ? '#c9c2b0' : '#a8a298'} roughness={0.9} />
          </mesh>
        );
      })}

      {/* Concrete bowl walls */}
      <mesh castShadow position={[0, 0.5 + wallH / 2, 0]} scale={[rx, 1, rz]}>
        <cylinderGeometry args={[1, 1.02, wallH, 64, 1, true]} />
        <meshStandardMaterial color="#c5beaa" roughness={0.92} side={2} />
      </mesh>

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

      {/* Magazine page hovering above 50-yard line */}
      <group position={[0, 7.5, 0]} rotation={[-Math.PI / 6, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 2.4, 0.06]} />
          <meshStandardMaterial color="#fbf6e6" emissive="#f5d97a" emissiveIntensity={0.15} roughness={0.65} />
        </mesh>
        <Text position={[0, 0.6, 0.04]} fontSize={0.3} color="#1a1410" anchorX="center" anchorY="middle">
          THE VALUATION ISSUE
        </Text>
        <Text position={[0, -0.5, 0.04]} fontSize={0.18} color="#7a5a30" anchorX="center" anchorY="middle">
          a Parthiv Farazi feature
        </Text>
      </group>

      {/* Small entrance ticket booth */}
      <mesh castShadow position={[0, 1.4, rz + 0.6]}>
        <boxGeometry args={[2.2, 2.6, 1]} />
        <meshStandardMaterial color="#bca795" roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.6, rz + 1.12]} material={lampAmber}>
        <boxGeometry args={[1.6, 0.6, 0.04]} />
      </mesh>

      <Billboard position={[0, wallH + 5, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
