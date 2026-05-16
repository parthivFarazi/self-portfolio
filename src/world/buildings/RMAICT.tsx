import { useMemo } from 'react';
import { Billboard, Text } from '@react-three/drei';
import { CanvasTexture, RepeatWrapping } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneWarm, glassFuturistic, metalSilverDark, neonCyan } from '../materials';

// Songket-pattern tilework texture wrapping the lower 1/4 of the tower.
function makeSongketTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  // base — deep teracotta + ink
  ctx.fillStyle = '#3a1f12';
  ctx.fillRect(0, 0, c.width, c.height);
  // Repeating diamond motif: gold diamonds, red lozenges, dots
  const tileSize = 32;
  for (let row = -1; row < c.height / tileSize + 1; row++) {
    for (let col = -1; col < c.width / tileSize + 1; col++) {
      const cx = col * tileSize + tileSize / 2;
      const cy = row * tileSize + tileSize / 2;
      // outer diamond (gold)
      ctx.strokeStyle = '#d4c178';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 12);
      ctx.lineTo(cx + 12, cy);
      ctx.lineTo(cx, cy + 12);
      ctx.lineTo(cx - 12, cy);
      ctx.closePath();
      ctx.stroke();
      // inner diamond (bright gold)
      ctx.strokeStyle = '#f5d97a';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx + 6, cy);
      ctx.lineTo(cx, cy + 6);
      ctx.lineTo(cx - 6, cy);
      ctx.closePath();
      ctx.stroke();
      // center red dot
      ctx.fillStyle = (row + col) % 2 === 0 ? '#c44a3a' : '#f5d97a';
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
      ctx.fill();
      // corner dots
      ctx.fillStyle = '#d4c178';
      ctx.beginPath();
      ctx.arc(cx, cy - tileSize / 2, 0.8, 0, Math.PI * 2);
      ctx.arc(cx + tileSize / 2, cy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  return tex;
}

// Floor-band glass texture so the tower has visible horizontal seams.
function makeFloorBandTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#9ad6e0';
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 16; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(20,30,50,0.6)' : 'rgba(120,180,200,0.4)';
    ctx.fillRect(0, i * 16, c.width, 1.5);
    // Window-light dots
    if (Math.random() > 0.4) {
      ctx.fillStyle = '#f5d97a';
      ctx.fillRect(8 + Math.random() * 48, i * 16 + 6, 6, 4);
    }
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  return tex;
}

export function RMAICT({ def }: { def: BuildingDef }) {
  const [px, , pz] = def.position;
  const songketTex = useMemo(makeSongketTexture, []);
  const glassTex = useMemo(makeFloorBandTexture, []);

  // Base 1/4 stone + songket pattern, upper 3/4 glass
  const W = 5;
  const D = 5;
  const H = 14;
  const baseH = H * 0.25;
  const upperH = H - baseH;

  // Custom songket-wrapped base material
  const songketMat = useMemo(() => {
    const m = stoneWarm.clone();
    const t = songketTex.clone();
    t.repeat.set(2, 1);
    t.needsUpdate = true;
    m.map = t;
    m.color.set('#a86a4a');
    return m;
  }, [songketTex]);

  const glassMat = useMemo(() => {
    const m = glassFuturistic.clone();
    const t = glassTex.clone();
    t.repeat.set(2, 6);
    t.needsUpdate = true;
    m.map = t;
    m.opacity = 0.7;
    m.transparent = true;
    return m;
  }, [glassTex]);

  return (
    <group position={[px, 0, pz]}>
      {/* Slight stone foundation step */}
      <mesh receiveShadow position={[0, 0.2, 0]} material={stoneWarm}>
        <boxGeometry args={[W + 0.8, 0.4, D + 0.8]} />
      </mesh>

      {/* Songket-pattern base */}
      <mesh castShadow receiveShadow position={[0, 0.4 + baseH / 2, 0]} material={songketMat}>
        <boxGeometry args={[W, baseH, D]} />
      </mesh>

      {/* Glass tower body */}
      <mesh castShadow receiveShadow position={[0, 0.4 + baseH + upperH / 2, 0]} material={glassMat}>
        <boxGeometry args={[W - 0.3, upperH, D - 0.3]} />
      </mesh>

      {/* Inner amber column visible through glass (warm lit interior) */}
      <mesh position={[0, 0.4 + baseH + upperH / 2, 0]}>
        <boxGeometry args={[W - 1.2, upperH - 1, D - 1.2]} />
        <meshStandardMaterial
          color="#3a2418"
          emissive="#f5b15a"
          emissiveIntensity={0.35}
          roughness={0.6}
        />
      </mesh>

      {/* Antenna / spire on the crown */}
      <mesh castShadow position={[0, 0.4 + H + 1, 0]} material={metalSilverDark}>
        <cylinderGeometry args={[0.04, 0.12, 2, 8]} />
      </mesh>
      <mesh position={[0, 0.4 + H + 2.1, 0]} material={neonCyan}>
        <sphereGeometry args={[0.12, 12, 8]} />
      </mesh>

      {/* Amber lantern at the entrance */}
      <mesh position={[0, 1.2, D / 2 + 0.4]}>
        <boxGeometry args={[0.5, 0.6, 0.2]} />
        <meshStandardMaterial color="#3a2410" emissive="#f5d97a" emissiveIntensity={0.6} roughness={0.5} />
      </mesh>
      <pointLight position={[0, 1.4, D / 2 + 0.5]} intensity={0.4} distance={4} decay={2} color="#f5d97a" />

      <Billboard position={[0, H + 4, 0]}>
        <Text fontSize={1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
