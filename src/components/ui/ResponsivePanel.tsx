// ResponsivePanel — scales a fixed-size designed panel down to fit the
// viewport.
//
// All 13 themed panels were authored at fixed pixel dimensions (e.g. UPDT
// 820×780, Heatmap 820×880, Petronas Towers 760×760). Rather than refactor each
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

// Desktop & tablet: leave 8% padding around the panel so the design
// breathes inside the modal overlay.
const MARGIN_PCT_DESKTOP = 0.92;
// Mobile: panels look tiny if we also keep an 8% gutter on a 390px
// viewport. Push to ~98% width so every panel — whatever its native
// aspect ratio — fills roughly the same horizontal area on screen,
// which is what makes the set feel uniform.
const MARGIN_PCT_MOBILE_W = 0.98;
// Vertical headroom on mobile: panels are allowed to be tall (the
// overlay scrolls), so we don't constrain by height as aggressively.
// Allow up to 1.4× the visible viewport height before we let height
// kick in as the limiting factor — in practice this means width is
// almost always the binding constraint, so all mobile panels render
// at the same on-screen width.
const MOBILE_H_HEADROOM = 1.4;
const MOBILE_BREAKPOINT = 700;

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

  const isMobile = viewport.w <= MOBILE_BREAKPOINT;
  const marginW = isMobile ? MARGIN_PCT_MOBILE_W : MARGIN_PCT_DESKTOP;
  const maxW = viewport.w * marginW;
  // On mobile we let the panel be taller than the viewport (the modal
  // overlay scrolls). On desktop we keep the original behavior so the
  // panel always fits in the viewport without scrolling.
  const maxH = viewport.h * (isMobile ? MOBILE_H_HEADROOM : MARGIN_PCT_DESKTOP);
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
