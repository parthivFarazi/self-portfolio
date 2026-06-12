import { Billboard, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CanvasTexture, type Mesh } from 'three';
import type { BuildingDef } from '@/data/buildings';

// The Cartridge — an oversized Game Boy Advance lying on the grass.
//
// Body is tilted ~10° on Y so it reads as "placed" rather than built.
// The screen is a CanvasTexture redrawn each frame in useFrame, showing a
// tiny pixel-art game loop: player chases a goal, dodges obstacles.

const CASE_COLOR = '#7E6CBC';     // GBA indigo-purple
const CASE_HIGHLIGHT = '#9486D2';
const CASE_DARK = '#5A4A8E';
const BUTTON_RED = '#a01818';
const SPEAKER_DARK = '#3a3450';

// Pixel-art game loop on the screen. 240×160 native, scaled to fit.
function makeScreenTexture() {
  const c = document.createElement('canvas');
  c.width = 240;
  c.height = 160;
  return { canvas: c, tex: new CanvasTexture(c) };
}

function drawScreen(ctx: CanvasRenderingContext2D, t: number) {
  // Background — dark indigo with subtle scanlines
  ctx.fillStyle = '#0e1a2e';
  ctx.fillRect(0, 0, 240, 160);
  // Title bar
  ctx.fillStyle = '#1f3a6c';
  ctx.fillRect(0, 0, 240, 18);
  ctx.fillStyle = '#94e2c0';
  ctx.font = '700 12px "Press Start 2P", monospace';
  ctx.fillText('LV 1', 8, 13);
  // Hearts (2 lives)
  ctx.fillStyle = '#e07ec3';
  pixelHeart(ctx, 220, 4);
  pixelHeart(ctx, 206, 4);

  // Playfield grid lines (very faint)
  ctx.fillStyle = 'rgba(120, 180, 220, 0.06)';
  for (let y = 24; y < 160; y += 8) ctx.fillRect(0, y, 240, 1);
  for (let x = 0; x < 240; x += 8) ctx.fillRect(x, 24, 1, 136);

  // Goal — pulsing emerald square at right
  const goalPulse = 1 + Math.sin(t * 0.005) * 0.15;
  ctx.fillStyle = `rgba(125, 231, 168, ${0.6 + 0.4 * Math.sin(t * 0.008)})`;
  const gw = 10 * goalPulse;
  ctx.fillRect(214 - gw / 2, 80 - gw / 2, gw, gw);
  ctx.fillStyle = '#fffaee';
  ctx.fillRect(214 - 1, 80 - 1, 2, 2);

  // Static obstacles
  const obstacles: Array<[number, number]> = [[80, 60], [120, 100], [160, 50], [140, 130]];
  ctx.fillStyle = '#c44a3a';
  obstacles.forEach(([ox, oy]) => ctx.fillRect(ox - 4, oy - 4, 8, 8));

  // Player — small pink square chasing the goal in a wandering loop
  const phase = t * 0.0008;
  const px = 40 + Math.cos(phase) * 60 + 60 * (0.5 + 0.5 * Math.sin(phase * 0.5));
  const py = 80 + Math.sin(phase * 1.7) * 30;
  ctx.fillStyle = '#f5b6da';
  ctx.fillRect(px - 4, py - 4, 8, 8);
  // Player highlight pixel
  ctx.fillStyle = '#fffaee';
  ctx.fillRect(px - 3, py - 3, 2, 2);

  // FPS readout
  ctx.fillStyle = '#94e2c0';
  ctx.font = '6px monospace';
  ctx.fillText('60 FPS', 8, 156);
  // C / DMA tag
  ctx.fillStyle = 'rgba(245, 217, 122, 0.7)';
  ctx.fillText('C · DMA', 200, 156);
}

function pixelHeart(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillRect(x + 1, y, 3, 1);
  ctx.fillRect(x + 5, y, 3, 1);
  ctx.fillRect(x, y + 1, 4, 1);
  ctx.fillRect(x + 4, y + 1, 4, 1);
  ctx.fillRect(x + 1, y + 2, 6, 1);
  ctx.fillRect(x + 2, y + 3, 4, 1);
  ctx.fillRect(x + 3, y + 4, 2, 1);
}

export function Cartridge({ def, liteWorld = false }: { def: BuildingDef; liteWorld?: boolean }) {
  const [px, , pz] = def.position;
  // Slight tilt so it reads as "placed"
  const tilt = (10 * Math.PI) / 180;

  const W = 4;
  const D = 2.5;
  const H = 0.6;

  const screen = useMemo(makeScreenTexture, []);
  const screenMeshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const ctx = screen.canvas.getContext('2d');
    if (!ctx) return;
    drawScreen(ctx, clock.elapsedTime * 1000);
    screen.tex.needsUpdate = true;
    // Subtle screen flicker
    if (screenMeshRef.current) {
      const mat = screenMeshRef.current.material as { emissiveIntensity?: number };
      mat.emissiveIntensity = 0.85 + Math.sin(clock.elapsedTime * 6) * 0.05;
    }
  });

  return (
    <group position={[px, 0, pz]} rotation={[0, tilt, 0]}>
      {/* Grass shadow under the cartridge */}
      <mesh receiveShadow position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W + 0.6, D + 0.6]} />
        <meshBasicMaterial color="#000" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      {/* Main body — flat purple plastic case */}
      <mesh castShadow receiveShadow position={[0, H / 2, 0]}>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color={CASE_COLOR} roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Top bevel highlight strip — a thin lighter slab on top of the body */}
      <mesh position={[0, H, 0]}>
        <boxGeometry args={[W - 0.06, 0.02, D - 0.06]} />
        <meshStandardMaterial color={CASE_HIGHLIGHT} roughness={0.5} />
      </mesh>

      {/* Side seam line (darker groove around mid-height) */}
      <mesh position={[0, H * 0.5, D / 2 + 0.001]}>
        <boxGeometry args={[W - 0.1, 0.04, 0.002]} />
        <meshBasicMaterial color={CASE_DARK} />
      </mesh>

      {/* SCREEN — recessed area with animated pixel-art texture */}
      {/* Screen bezel (slightly darker frame around the screen) */}
      <mesh position={[0, H + 0.001, 0]}>
        <boxGeometry args={[2.1, 0.02, 1.4]} />
        <meshStandardMaterial color={CASE_DARK} roughness={0.6} />
      </mesh>
      {/* Live screen */}
      <mesh ref={screenMeshRef} position={[0, H + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshStandardMaterial
          map={screen.tex}
          emissive="#fffaee"
          emissiveMap={screen.tex}
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
      {/* Soft glow halo above the screen — so it reads "powered on" at
          distance. Skipped on liteWorld (lights mounting on LOD swaps force
          shader recompiles; the emissive screen still reads powered-on). */}
      {liteWorld ? null : (
        <pointLight position={[0, H + 0.5, 0]} intensity={0.6} distance={3.6} decay={2} color="#94e2c0" />
      )}

      {/* D-PAD — small dark cross on the left of the body top */}
      <group position={[-W / 2 + 0.55, H + 0.03, 0]}>
        <mesh>
          <boxGeometry args={[0.28, 0.04, 0.09]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.09, 0.04, 0.28]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} />
        </mesh>
      </group>

      {/* A / B buttons — two red circles on the right */}
      {[
        { x: W / 2 - 0.30, z: -0.08, label: 'A' },
        { x: W / 2 - 0.55, z: 0.18, label: 'B' },
      ].map((b) => (
        <group key={b.label} position={[b.x, H + 0.03, b.z]}>
          <mesh>
            <cylinderGeometry args={[0.10, 0.10, 0.04, 18]} />
            <meshStandardMaterial color={BUTTON_RED} roughness={0.5} />
          </mesh>
          {/* Tiny letter on top */}
          <Text
            position={[0, 0.025, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.07}
            color="#fffaee"
            anchorX="center"
            anchorY="middle"
          >
            {b.label}
          </Text>
        </group>
      ))}

      {/* START / SELECT — two tiny pill buttons below the screen */}
      {[
        { x: -0.18, label: 'SELECT' },
        { x: 0.18, label: 'START' },
      ].map((b) => (
        <group key={b.label} position={[b.x, H + 0.03, 0.72]}>
          <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.05, 0.05, 0.04, 14]} />
            <meshStandardMaterial color="#3a3450" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Speaker grill — lined detail on the lower-right corner of the top */}
      <group position={[W / 2 - 0.32, H + 0.022, 0.85]} rotation={[0, -Math.PI / 5, 0]}>
        {[-0.10, -0.04, 0.02, 0.08].map((dz) => (
          <mesh key={dz} position={[0, 0, dz]}>
            <boxGeometry args={[0.32, 0.012, 0.022]} />
            <meshStandardMaterial color={SPEAKER_DARK} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* "GAME BOY ADVANCE" subtle text under the screen */}
      <Text
        position={[0, H + 0.022, -0.78]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.085}
        color="#bca6e0"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.04}
      >
        GAME BOY ADVANCE
      </Text>

      {/* Floating label */}
      <Billboard position={[0, 3.6, 0]}>
        <Text
          fontSize={0.95}
          color="#2a2520"
          outlineWidth={0.06}
          outlineColor="#fffaee"
          anchorX="center"
          anchorY="middle"
        >
          {def.shortLabel}
        </Text>
      </Billboard>
    </group>
  );
}
