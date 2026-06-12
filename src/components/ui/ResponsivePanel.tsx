// ResponsivePanel — scales a fixed-size designed panel down to fit the
// viewport.
//
// All 13 themed panels were authored at fixed pixel dimensions (e.g. UPDT
// 1280×1300, Heatmap 820×880, Petronas Towers 900×820). Rather than refactor
// each one to CSS-flex/wrap on mobile (which would compromise the
// chalkboard/parchment compositions), we uniformly scale the entire panel
// with CSS transform. Internal proportions are preserved — typography, drag
// slots, stat strips, all stay correct relative to one another.
//
// Behavior:
//  • PHONES fit the WHOLE panel on screen at once — the postcard view —
//    and the dialog wraps it in PanelZoom (pinch / double-tap / zoom
//    button) for reading. usePanelScale exposes the fit scale so the zoom
//    layer can compute its "readable" target.
//  • DESKTOP computes scale = min(maxW/w, maxH/h) with a readability floor
//    (tall panels on small laptops scroll vertically instead of shrinking
//    below legibility) and an upscale CAP: on large monitors panels grow
//    past their authored size — DOM text scales crisply, and the embedded
//    screenshots ship at ~3000px so they stay sharp well past 1x.

import { useEffect, useState, type ReactNode } from 'react';

// Desktop & tablet: panels render as large as the viewport allows — just a
// whisper of breathing room around the modal.
const MARGIN_PCT_DESKTOP = 0.97;
const MOBILE_BREAKPOINT = 700;
// Short-landscape phones (e.g. 667×375) must take the mobile path too —
// width alone would route them to desktop sizing.
const SHORT_VIEWPORT = 520;
// Mobile chrome the fit must clear: the close and zoom buttons float OVER
// the panel corners (photo-viewer style), so only safe-areas + a small
// margin remain.
const MOBILE_CHROME_Y = 90;
const MOBILE_MARGIN_W = 0.97;
// Desktop readability floor: never render below 70% of authored size —
// 16px body text at ~11px. Capped at width-fit so desktop never pans
// sideways; tall panels scroll vertically instead.
const MIN_SCALE_DESKTOP = 0.75;
// Upscale ceiling for large monitors — past ~1.6 the panel compositions
// start to feel like posters rather than cards.
const MAX_SCALE_DESKTOP = 1.6;
// The desktop dialog overlays wrap panels with 1.5rem padding top+bottom.
const OVERLAY_PADDING_Y = 48;

export function usePanelScale(width: number, height: number) {
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

  const isMobile = viewport.w <= MOBILE_BREAKPOINT || viewport.h <= SHORT_VIEWPORT;
  let scale: number;
  if (isMobile) {
    // The postcard fit: whole panel visible between the dialog chrome.
    const maxW = viewport.w * MOBILE_MARGIN_W;
    const maxH = Math.max(viewport.h - MOBILE_CHROME_Y, 240);
    scale = Math.min(maxW / width, maxH / height, 1);
  } else {
    const maxW = viewport.w * MARGIN_PCT_DESKTOP;
    const maxH = viewport.h * MARGIN_PCT_DESKTOP - OVERLAY_PADDING_Y;
    scale = Math.min(maxW / width, maxH / height, MAX_SCALE_DESKTOP);
    const floor = Math.min(MIN_SCALE_DESKTOP, maxW / width);
    scale = Math.max(scale, Math.min(floor, 1));
  }
  return { scale, isMobile };
}

export function ResponsivePanel({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  const { scale } = usePanelScale(width, height);

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
