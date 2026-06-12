import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { CanvasTexture, RepeatWrapping, type Mesh } from 'three';
import type { BuildingDef } from '@/data/buildings';
import { stoneWarm, glassFuturistic, metalSilverDark, neonCyan, lampAmber, woodDark } from '../materials';

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

export function RMAICT({ def, liteWorld = false }: { def: BuildingDef; liteWorld?: boolean }) {
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

  // Document-scan beam — vertical cyan line that fades up the tower
  const scanBeam = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!scanBeam.current) return;
    const t = clock.getElapsedTime();
    scanBeam.current.position.y = 0.4 + baseH + 0.5 + ((t * 1.4) % (upperH - 1));
    const mat = scanBeam.current.material as { opacity: number };
    mat.opacity = 0.55 + Math.sin(t * 4) * 0.15;
  });

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
      {/* Stone cornice between base and glass tower */}
      <mesh castShadow position={[0, 0.4 + baseH + 0.1, 0]} material={stoneWarm}>
        <boxGeometry args={[W + 0.3, 0.2, D + 0.3]} />
      </mesh>

      {/* Entrance — dark wooden door on the +z (south) face of the songket base */}
      <mesh position={[0, 0.4 + 1.4, D / 2 + 0.01]} material={woodDark}>
        <boxGeometry args={[1.3, 2.4, 0.08]} />
      </mesh>
      {/* Gold door frame */}
      <mesh position={[0, 0.4 + 1.4, D / 2 + 0.06]}>
        <boxGeometry args={[1.45, 2.55, 0.04]} />
        <meshStandardMaterial color="#d4b86a" emissive="#9a7a40" emissiveIntensity={0.3} metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Two flanking amber lanterns */}
      <mesh position={[-1.2, 0.4 + 1.6, D / 2 + 0.08]} material={lampAmber}>
        <boxGeometry args={[0.22, 0.5, 0.18]} />
      </mesh>
      <mesh position={[1.2, 0.4 + 1.6, D / 2 + 0.08]} material={lampAmber}>
        <boxGeometry args={[0.22, 0.5, 0.18]} />
      </mesh>
      {/* Skipped on liteWorld — lights mounting on LOD swaps force shader
          recompiles; the lampAmber lanterns already glow via emissive. */}
      {liteWorld ? null : (
        <pointLight position={[0, 1.4, D / 2 + 0.4]} intensity={0.7} distance={6} decay={2} color="#f5b15a" />
      )}
      {/* Entrance step */}
      <mesh receiveShadow position={[0, 0.2, D / 2 + 0.6]} material={stoneWarm}>
        <boxGeometry args={[2.2, 0.3, 0.8]} />
      </mesh>

      {/* Marquee signage above the door — "RMAICT" in mono on a dark plaque */}
      <group position={[0, 0.4 + baseH - 0.3, D / 2 + 0.08]}>
        <mesh material={woodDark}>
          <boxGeometry args={[2.6, 0.45, 0.04]} />
        </mesh>
        <Text fontSize={0.32} color="#f5d97a" anchorX="center" anchorY="middle" position={[0, 0, 0.04]} letterSpacing={0.12}>
          RMAICT
        </Text>
      </group>

      {/* Glass tower body */}
      <mesh castShadow receiveShadow position={[0, 0.4 + baseH + upperH / 2, 0]} material={glassMat}>
        <boxGeometry args={[W - 0.3, upperH, D - 0.3]} />
      </mesh>

      {/* Floor seam lines on the glass tower — thin metal bands every 1.5u */}
      {Array.from({ length: Math.floor(upperH / 1.5) }).map((_, i) => {
        const y = 0.4 + baseH + (i + 1) * 1.5;
        return (
          <mesh key={i} position={[0, y, 0]} material={metalSilverDark}>
            <boxGeometry args={[W - 0.2, 0.06, D - 0.2]} />
          </mesh>
        );
      })}

      {/* Document-scan beam — sweeps vertically through the glass */}
      <mesh ref={scanBeam} position={[0, 0.4 + baseH + 1, D / 2 - 0.05]}>
        <boxGeometry args={[W - 0.4, 0.08, 0.04]} />
        <meshStandardMaterial color="#6fd5e0" emissive="#6fd5e0" emissiveIntensity={1.5} transparent opacity={0.7} />
      </mesh>
      {/* Ghostly receipt — small white rectangle drifting inside the tower */}
      <mesh position={[0, 0.4 + baseH + 4, 0]}>
        <boxGeometry args={[0.6, 0.9, 0.02]} />
        <meshStandardMaterial color="#fffaee" emissive="#fffaee" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.3, 0.4 + baseH + 6.5, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.6, 0.9, 0.02]} />
        <meshStandardMaterial color="#fffaee" emissive="#fffaee" emissiveIntensity={0.45} transparent opacity={0.5} />
      </mesh>

      {/* Crown — neural-diagram halo (small ring + dots) above the roof */}
      <mesh position={[0, 0.4 + H + 0.4, 0]} material={metalSilverDark}>
        <boxGeometry args={[W - 0.2, 0.25, D - 0.2]} />
      </mesh>
      <group position={[0, 0.4 + H + 1.2, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={neonCyan}>
          <torusGeometry args={[1.4, 0.04, 6, 32]} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.4, 0, Math.sin(a) * 1.4]} material={neonCyan}>
              <sphereGeometry args={[0.08, 8, 6]} />
            </mesh>
          );
        })}
      </group>

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

      {/* Antenna / spire above the halo */}
      <mesh castShadow position={[0, 0.4 + H + 2.4, 0]} material={metalSilverDark}>
        <cylinderGeometry args={[0.04, 0.12, 2.2, 8]} />
      </mesh>
      <mesh position={[0, 0.4 + H + 3.6, 0]} material={neonCyan}>
        <sphereGeometry args={[0.12, 12, 8]} />
      </mesh>

      <Billboard position={[0, H + 5, 0]}>
        <Text fontSize={1} color="#2a2520" sdfGlyphSize={128} outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
