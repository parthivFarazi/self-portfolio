import { useMemo } from 'react';
import { CanvasTexture, BackSide } from 'three';
import { COLORS } from '@/constants/world';

function makeGradient(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 1024;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, c.height);
  // Painterly stops: teal stays clean overhead, lavender takes the upper mid,
  // peach hugs the horizon. Extra warm sliver below the horizon helps the
  // fog blend (scene fog uses the horizon peach).
  grad.addColorStop(0.0, COLORS.skyTop);     // zenith — soft teal
  grad.addColorStop(0.35, COLORS.skyTop);
  grad.addColorStop(0.55, COLORS.skyMid);    // upper mid — lavender
  grad.addColorStop(0.82, COLORS.skyBottom); // horizon — peach
  grad.addColorStop(1.0, '#e89a52');         // below horizon — deeper warm
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
