import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { CanvasTexture, LinearFilter, SRGBColorSpace } from 'three';
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
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.generateMipmaps = false;
  tex.magFilter = LinearFilter;
  tex.minFilter = LinearFilter;
  return tex;
}

export function Sky() {
  const tex = useMemo(makeGradient, []);
  const { scene } = useThree();

  useEffect(() => {
    const previousBackground = scene.background;
    scene.background = tex;
    return () => {
      scene.background = previousBackground;
    };
  }, [scene, tex]);

  // scene.background alone carries the sky — the fixed orthographic camera
  // never sees parallax, so the old 500u BackSide sphere was just a full
  // screen of overdraw every frame on top of the same gradient.
  return null;
}
