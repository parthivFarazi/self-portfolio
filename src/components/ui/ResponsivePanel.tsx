// ResponsivePanel — scales a fixed-size designed panel down to fit the
// viewport.
//
// All 13 themed panels were authored at fixed pixel dimensions (e.g. UPDT
// 820×780, Heatmap 820×880, Twin Towers 760×760). Rather than refactor each
// one to CSS-flex/wrap on mobile (which would compromise the
// chalkboard/parchment compositions), we uniformly scale the entire panel
// with CSS transform. Internal proportions are preserved — typography, drag
// slots, stat strips, all stay correct relative to one another.
//
// Behavior:
//  • Computes scale = min(maxW / panelW, maxH / panelH, 1).
//    Never upscales (1 cap) — desktop sees the design at 1:1.
//  • Wraps with a sized container so the layout flow reflects the visual
//    dimensions (transform: scale alone doesn't shrink the layout box).
//  • On mobile this lets a 820-wide panel sit in a 375-wide viewport at
//    ~0.43× — still readable, no horizontal scroll.

import { useEffect, useState, type ReactNode } from 'react';

const MARGIN_PCT = 0.92; // leave 4% padding on each side

export function ResponsivePanel({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const [viewport, setViewport] = useState(() => readViewport());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setViewport(readViewport());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  const maxW = viewport.w * MARGIN_PCT;
  const maxH = viewport.h * MARGIN_PCT;
  const scale = Math.min(maxW / width, maxH / height, 1);

  return (
    <div
      style={{
        width: width * scale,
        height: height * scale,
        position: 'relative',
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function readViewport(): { w: number; h: number } {
  if (typeof window === 'undefined') return { w: 1440, h: 900 };
  return { w: window.innerWidth, h: window.innerHeight };
}
