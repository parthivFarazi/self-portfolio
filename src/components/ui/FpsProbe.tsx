import { useEffect, useRef, useState } from 'react';

// Tiny on-screen FPS readout, enabled with ?fps=1 — exists so real frame
// rates can be read off devices with no console (the iOS Simulator during
// development, a quick check on a physical phone). Renders nothing without
// the flag.
export function FpsProbe() {
  const [enabled] = useState(() => new URLSearchParams(window.location.search).get('fps') === '1');
  const [fps, setFps] = useState(0);
  const [low, setLow] = useState(0);
  const frames = useRef<number[]>([]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const f = frames.current;
      f.push(dt);
      if (f.length > 120) f.shift();
      if (f.length >= 10) {
        const avg = f.reduce((a, b) => a + b, 0) / f.length;
        const worst = Math.max(...f);
        setFps(Math.round(1000 / avg));
        setLow(Math.round(1000 / worst));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 4px)',
        zIndex: 9999,
        font: '700 16px monospace',
        background: 'rgba(0,0,0,0.75)',
        color: '#7CFC00',
        padding: '4px 10px',
        borderRadius: 8,
        pointerEvents: 'none',
      }}
    >
      {fps} fps · 1% low {low}
    </div>
  );
}
