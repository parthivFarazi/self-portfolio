import { useMemo } from 'react';
import { CanvasTexture, RepeatWrapping } from 'three';
import { COLORS, ISLAND_RADIUS, ISLAND_THICKNESS } from '@/constants/world';

function makeGrassTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = COLORS.grass;
  ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const r = 1 + Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.5 ? COLORS.grassDeep : '#7fc471';
    ctx.globalAlpha = 0.35 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new CanvasTexture(c);
  tex.wrapS = tex.wrapT = RepeatWrapping;
  tex.repeat.set(16, 16);
  return tex;
}

export function Island() {
  const grass = useMemo(makeGrassTexture, []);
  return (
    <group>
      <mesh receiveShadow position={[0, -ISLAND_THICKNESS / 2, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS, ISLAND_THICKNESS, 96]} />
        <meshStandardMaterial map={grass} roughness={0.95} />
      </mesh>
      <mesh position={[0, -ISLAND_THICKNESS - 0.5, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS - 0.5, ISLAND_RADIUS - 6, 1.5, 96]} />
        <meshStandardMaterial color={COLORS.edgeRock} roughness={1} />
      </mesh>
    </group>
  );
}
