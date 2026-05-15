import { useMemo } from 'react';
import { CanvasTexture, BackSide } from 'three';
import { COLORS } from '@/constants/world';

function makeGradient(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 512;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, c.height);
  grad.addColorStop(0, COLORS.skyTop);
  grad.addColorStop(0.55, COLORS.skyMid);
  grad.addColorStop(1, COLORS.skyBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, c.width, c.height);
  return new CanvasTexture(c);
}

export function Sky() {
  const tex = useMemo(makeGradient, []);
  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <meshBasicMaterial map={tex} side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  );
}
