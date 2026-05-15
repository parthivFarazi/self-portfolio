import { useMemo } from 'react';
import { Text3D, Billboard, Text } from '@react-three/drei';
import { CanvasTexture, RepeatWrapping } from 'three';
import type { BuildingDef } from '@/data/buildings';
import {
  brickRed,
  brickRedDark,
  stoneWarm,
  stoneCool,
  goldEmissive,
  woodDark,
  metalDark,
} from '../materials';

const FONT_URL = '/fonts/helvetiker_regular.typeface.json';

// ── Brick wall texture: subtle vertical seams + courses ──────────────────
function makeBrickTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#a8553c';
  ctx.fillRect(0, 0, c.width, c.height);
  const brickH = 14;
  const brickW = 48;
  // mortar lines
  for (let row = 0; row < c.height / brickH + 1; row++) {
    const y = row * brickH;
    const xShift = row % 2 === 0 ? 0 : brickW / 2;
    // horizontal mortar
    ctx.fillStyle = 'rgba(40, 22, 14, 0.35)';
    ctx.fillRect(0, y, c.width, 1.5);
    // brick variation
    for (let col = -1; col < c.width / brickW + 1; col++) {
      const x = col * brickW + xShift;
      const v = Math.sin(row * 11.3 + col * 5.7);
      const shade = 168 + Math.floor(v * 20);
      ctx.fillStyle = `rgb(${shade}, ${shade * 0.55}, ${shade * 0.4})`;
      ctx.fillRect(x + 1, y + 2, brickW - 2, brickH - 3);
      // vertical mortar
      ctx.fillStyle = 'rgba(40, 22, 14, 0.4)';
      ctx.fillRect(x + brickW - 1, y, 1.5, brickH);
    }
  }
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

// ── Clock face texture, hands fixed at 4:25 ──────────────────────────────
function makeClockTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  const cx = 128;
  const cy = 128;
  // background ivory
  ctx.fillStyle = '#f6f1e4';
  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#2a2520';
  ctx.lineWidth = 4;
  ctx.stroke();
  // tick marks
  ctx.strokeStyle = '#2a2520';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const isHour = i % 3 === 0;
    const r1 = isHour ? 100 : 108;
    const r2 = 116;
    ctx.lineWidth = isHour ? 4 : 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }
  // hour hand — 4:25 → hour rotated 4*30 + 25*0.5 = 132.5°
  ctx.strokeStyle = '#2a2520';
  ctx.lineCap = 'round';
  const drawHand = (angleDeg: number, len: number, width: number) => {
    const a = (angleDeg - 90) * (Math.PI / 180);
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len);
    ctx.stroke();
  };
  drawHand(132.5, 56, 7); // hour
  drawHand(150, 88, 5);  // minute (25 → 150°)
  // center cap
  ctx.fillStyle = '#2a2520';
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();
  return new CanvasTexture(c);
}

export function TechTower({ def }: { def: BuildingDef }) {
  const [x, , z] = def.position;
  const brickTex = useMemo(makeBrickTexture, []);
  const clockTex = useMemo(makeClockTexture, []);

  // Spec: 4×4 base, ~22 units tall (per Phase 3 prompt)
  const W = 4.4;
  const D = 4.4;
  const H = 22;
  const parapetH = 1.8;
  const beltY1 = 0.9; // base belt
  const beltY2 = H * 0.55; // mid belt
  const beltY3 = H - 0.4; // top belt (just below parapet)

  // Brick body — clone the material so the canvas map binds to it without
  // polluting the shared singleton.
  const brickMat = useMemo(() => {
    const m = brickRed.clone();
    const t = brickTex.clone();
    t.repeat.set(2.5, H / 3);
    t.needsUpdate = true;
    m.map = t;
    return m;
  }, [brickTex]);

  return (
    <group position={[x, 0, z]}>
      {/* Stone foundation step */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]} material={stoneWarm}>
        <boxGeometry args={[W + 0.6, 0.6, D + 0.6]} />
      </mesh>

      {/* Main brick shaft */}
      <mesh castShadow receiveShadow position={[0, 0.6 + H / 2, 0]} material={brickMat}>
        <boxGeometry args={[W, H, D]} />
      </mesh>

      {/* Horizontal stone belts (4 sides each) */}
      {[beltY1, beltY2, beltY3].map((y, i) => (
        <mesh key={i} castShadow position={[0, 0.6 + y, 0]} material={stoneWarm}>
          <boxGeometry args={[W + 0.16, 0.35, D + 0.16]} />
        </mesh>
      ))}

      {/* Arched window slits — 4 per side, two faces shown for clarity */}
      {[3.2, 7, 10.8, 14.6].map((y) => (
        <group key={y}>
          {/* Front face windows */}
          <mesh position={[0, 0.6 + y, D / 2 + 0.01]} material={metalDark}>
            <boxGeometry args={[0.7, 1.5, 0.08]} />
          </mesh>
          <mesh position={[0, 0.6 + y + 0.85, D / 2 + 0.02]} material={stoneWarm}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 16, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Mirror on the back */}
          <mesh position={[0, 0.6 + y, -D / 2 - 0.01]} material={metalDark} rotation={[0, Math.PI, 0]}>
            <boxGeometry args={[0.7, 1.5, 0.08]} />
          </mesh>
        </group>
      ))}

      {/* Clock face — sits on the front (positive-Z) face near the top */}
      <mesh position={[0, 0.6 + H - 4, D / 2 + 0.06]}>
        <circleGeometry args={[1.25, 48]} />
        <meshStandardMaterial map={clockTex} roughness={0.6} />
      </mesh>
      {/* Stone clock surround ring */}
      <mesh position={[0, 0.6 + H - 4, D / 2 + 0.04]} material={stoneCool}>
        <ringGeometry args={[1.25, 1.5, 48]} />
      </mesh>

      {/* Top parapet — slightly larger, stone */}
      <mesh castShadow receiveShadow position={[0, 0.6 + H + parapetH / 2, 0]} material={stoneCool}>
        <boxGeometry args={[W + 0.5, parapetH, D + 0.5]} />
      </mesh>
      {/* Battlement merlons along the parapet top edges */}
      {Array.from({ length: 6 }).map((_, i) => {
        const t = (i + 0.5) / 6 - 0.5;
        const px = t * (W + 0.5);
        const merlonY = 0.6 + H + parapetH + 0.18;
        return (
          <group key={i}>
            <mesh position={[px, merlonY, (D + 0.5) / 2]} material={stoneCool}>
              <boxGeometry args={[0.4, 0.36, 0.32]} />
            </mesh>
            <mesh position={[px, merlonY, -(D + 0.5) / 2]} material={stoneCool}>
              <boxGeometry args={[0.4, 0.36, 0.32]} />
            </mesh>
          </group>
        );
      })}

      {/* TECH letters — extruded, gold emissive, vertical on front parapet */}
      <group position={[0, 0.6 + H + parapetH + 0.85, D / 2 + 0.5]}>
        <Text3D
          font={FONT_URL}
          size={1.05}
          height={0.32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.06}
          bevelSegments={2}
          letterSpacing={0.08}
          castShadow
          // Centering: TextGeometry origin is left/bottom; nudge so it reads centered.
          position={[-2.05, 0, 0]}
        >
          TECH
          <primitive object={goldEmissive} attach="material" />
        </Text3D>
      </group>

      {/* Roof spike + pennant */}
      <mesh castShadow position={[0, 0.6 + H + parapetH + 0.9, 0]} material={woodDark}>
        <cylinderGeometry args={[0.05, 0.05, 1.8, 8]} />
      </mesh>
      <mesh position={[0.45, 0.6 + H + parapetH + 1.45, 0]} material={brickRedDark}>
        <planeGeometry args={[0.9, 0.5]} />
      </mesh>

      {/* Floating label for navigation */}
      <Billboard position={[0, 0.6 + H + parapetH + 4, 0]}>
        <Text fontSize={1.1} color="#2a2520" outlineWidth={0.06} outlineColor="#fffaee" anchorX="center" anchorY="middle">
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
