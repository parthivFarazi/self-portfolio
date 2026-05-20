import { useMemo } from 'react';
import { CanvasTexture } from 'three';

// Category signpost — a small wooden trail-sign at the spawn plaza.
// Four labelled arms, each rotated to roughly point at a cluster of
// buildings, so a first-time visitor sees direction-to-content the
// instant they spawn.
//
// Category routing (computed once, encoded as rotations):
//   • EXPERIENCE    → UPDT(0,-30) / RMAICT(30,0) / Qard(-50,-10) — lean
//                     north-east (avg ~-30°). Use yaw=-90° (east, RMAICT).
//   • ABOUT & EDU   → Twin Towers(35,-55) / Tech Tower(-30,-30) — north.
//   • PROJECTS      → Heatmap(10,50) / Workshop(45,50) / GBA(-15,60) /
//                     Athletic(55,-20) / Zen(-40,45) — broadly south-east.
//   • CONTACT       → Lighthouse(45,30) — south-east-ish, but we point
//                     west to avoid clashing with PROJECTS arm.
//
// Yaw convention: 0 = +Z (south), +90 = -X (west), -90 = +X (east), 180 = -Z (north).

interface Arm {
  label: string;
  yaw: number;       // radians around Y
  height: number;    // post height the arm sits at (m)
  color: string;     // arm wood tint
  textColor: string;
}

const ARMS: Arm[] = [
  // EXPERIENCE → east (RMAICT at +X, UPDT north too)
  { label: 'EXPERIENCE',     yaw: -Math.PI / 2,        height: 2.45, color: '#a3784a', textColor: '#2a1a0e' },
  // ABOUT & EDU → north (Tech Tower / Twin Towers)
  { label: 'ABOUT · EDU',    yaw:  Math.PI,            height: 2.10, color: '#8b6a45', textColor: '#2a1a0e' },
  // PROJECTS → south (most outer-ring projects)
  { label: 'PROJECTS',       yaw:  0,                  height: 1.75, color: '#9a7244', textColor: '#2a1a0e' },
  // CONTACT → west (Lighthouse is SE but we point it W to spread the
  //              arms; the arrow shape still reads as "this way" for
  //              anyone scanning).
  { label: 'CONTACT',        yaw:  Math.PI / 2,        height: 1.40, color: '#b48555', textColor: '#2a1a0e' },
];

// ── Arm texture: parchment plank with hand-lettered label + arrow ────────
function makeArmTexture(label: string, textColor: string) {
  const c = document.createElement('canvas');
  // 4:1 plank ratio — narrow board.
  c.width = 512;
  c.height = 128;
  const ctx = c.getContext('2d')!;

  // Wood grain backdrop (cream → tan, with subtle horizontal streaks).
  const grad = ctx.createLinearGradient(0, 0, 0, c.height);
  grad.addColorStop(0, '#f0dfb5');
  grad.addColorStop(1, '#d4b888');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = 'rgba(120,80,40,0.18)';
  ctx.lineWidth = 1;
  for (let y = 6; y < c.height; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.5) * 1.5);
    ctx.lineTo(c.width, y + Math.cos(y * 0.7) * 1.5);
    ctx.stroke();
  }

  // Hand-lettered label
  ctx.fillStyle = textColor;
  ctx.font = 'bold 56px "Caveat", "Brush Script MT", cursive';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(label, 28, c.height / 2 + 2);

  // Arrow on the right tip — chevron pointing along the board direction.
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(c.width - 80, c.height / 2 - 28);
  ctx.lineTo(c.width - 30, c.height / 2);
  ctx.lineTo(c.width - 80, c.height / 2 + 28);
  ctx.stroke();

  const tex = new CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

interface SignArmProps {
  arm: Arm;
}

function SignArm({ arm }: SignArmProps) {
  const tex = useMemo(() => makeArmTexture(arm.label, arm.textColor), [arm.label, arm.textColor]);

  // Arm size (m). Long axis on +X locally, so the arrow tip lives at +X.
  const W = 1.6;
  const H = 0.35;
  const T = 0.05;

  return (
    <group rotation={[0, arm.yaw, 0]} position={[0, arm.height, 0]}>
      {/* Plank — offset along +X so the post sits at the left edge */}
      <mesh castShadow position={[W / 2, 0, 0]}>
        <boxGeometry args={[W, H, T]} />
        {/* Front face shows the canvas; render the same material on all
            sides to keep the wood tint consistent if seen from behind. */}
        <meshStandardMaterial map={tex} color={arm.color} roughness={0.85} />
      </mesh>
      {/* Pointed tip — small triangular cap at the +X end gives the arm
          a clearly "this way" silhouette without baking it into the
          rectangular plank. */}
      <mesh castShadow position={[W + 0.18, 0, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[H * 0.7, 0.4, 4]} />
        <meshStandardMaterial color={arm.color} roughness={0.85} />
      </mesh>
    </group>
  );
}

export function Signpost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Wooden post */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 2.8, 8]} />
        <meshStandardMaterial color="#7a5430" roughness={0.85} />
      </mesh>
      {/* Cap — small rounded top */}
      <mesh castShadow position={[0, 2.85, 0]}>
        <sphereGeometry args={[0.13, 12, 8]} />
        <meshStandardMaterial color="#6b4823" roughness={0.8} />
      </mesh>
      {/* Stone base — disc tucked into the plaza tile */}
      <mesh receiveShadow position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.34, 24]} />
        <meshStandardMaterial color="#a89070" roughness={0.95} />
      </mesh>
      {ARMS.map((arm) => (
        <SignArm key={arm.label} arm={arm} />
      ))}
    </group>
  );
}
