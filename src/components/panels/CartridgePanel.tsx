import { useEffect, useRef } from 'react';
import type { PanelProps } from './UPDTPanel';

// The Cartridge — pixel-art themed panel framed as a GBA console screen.
// Deliberate aesthetic break from the parchment-warm rest of the deck:
// the project itself is a deliberate technical regression (writing C for
// 2001 hardware in 2025), so the panel echoes that.

const CASE = '#7E6CBC';
const CASE_HI = '#A18EE5';
const CASE_DARK = '#5A4A8E';
const CRT_BG = '#0e1a2e';
const NEON_GREEN = '#94e2c0';
const NEON_CYAN = '#6fd5e0';
const NEON_PINK = '#f5b6da';
const NEON_AMBER = '#f5d97a';
const OFF_WHITE = '#fffaee';

// Pixel font — falls back if 'Press Start 2P' isn't loaded
const PIXEL_FONT = '"Press Start 2P", "Pixelify Sans", "VT323", ui-monospace, monospace';
const PIXEL_BODY = '"VT323", "Pixelify Sans", ui-monospace, monospace';

export function CartridgePanel({ width = 820, height = 760 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${CASE} 0%, ${CASE_DARK} 100%)`,
      fontFamily: PIXEL_BODY,
    }}>
      {/* GBA case bevel highlight (top edge) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: `linear-gradient(180deg, ${CASE_HI}, transparent)` }}/>
      {/* GBA case bevel shadow (bottom edge) */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: `linear-gradient(0deg, rgba(0,0,0,.35), transparent)` }}/>

      {/* ──────────── Top bezel labels (engraved) ──────────────────────── */}
      <div style={{
        position: 'absolute', top: 18, left: 36, right: 36,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        font: `10px ${PIXEL_FONT}`, letterSpacing: '.18em', color: '#bca6e0',
      }}>
        <span>GAME BOY ADVANCE</span>
        <span style={{ color: '#9a8ad0' }}>HMV-AGB001</span>
      </div>

      {/* ──────────── CRT screen — the real content ─────────────────────── */}
      <div style={{
        position: 'absolute', top: 50, left: 36, right: 36, bottom: 110,
        background: CRT_BG,
        borderRadius: 12,
        boxShadow: `
          inset 0 0 0 4px #1a1a2e,
          inset 0 0 0 8px ${CASE_DARK},
          inset 0 0 60px rgba(0,0,0,.55),
          0 6px 14px rgba(0,0,0,.45)
        `,
        overflow: 'hidden',
      }}>
        {/* Scanlines overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.18) 2px 3px)',
        }}/>
        {/* Subtle chromatic aberration at edges */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(255, 80, 200, 0.06) 80%, rgba(80, 200, 255, 0.08) 100%)`,
        }}/>

        <div style={{ position: 'relative', height: '100%', padding: '20px 26px 18px', color: OFF_WHITE, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* ── Title + subtitle ──────────────────────────────────────── */}
          <header>
            <div style={{ font: `9.5px ${PIXEL_FONT}`, letterSpacing: '.22em', color: NEON_AMBER }}>
              ARCADE GAME · GAME BOY ADVANCE · APRIL 2025
            </div>
            <h1 style={{
              font: `400 28px/1.05 ${PIXEL_FONT}`,
              margin: '8px 0 0',
              color: NEON_GREEN,
              letterSpacing: '.04em',
              textShadow: `0 0 12px rgba(148,226,192,.6), 2px 2px 0 rgba(0,0,0,.45)`,
            }}>
              60 FPS, in C.
            </h1>
            <div style={{ font: `14px ${PIXEL_BODY}`, letterSpacing: '.04em', color: NEON_CYAN, marginTop: 4 }}>
              Sixty frames a second, the hard way.
            </div>
          </header>

          {/* ── Animated mini "screen" — pixel sprite chasing the goal ── */}
          <PixelPreview />

          {/* ── What it does ─────────────────────────────────────────── */}
          <div style={{ font: `15.5px/1.35 ${PIXEL_BODY}`, color: OFF_WHITE, opacity: 0.92 }}>
            A complete GBA game built from the metal up — sprite engine, input loop,
            collision, win/loss states, all in C against the bare hardware framebuffer.
          </div>

          {/* ── Three callout boxes ──────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <Callout
              label="THE LOOP"
              accent={NEON_PINK}
              body="4-state game loop: TITLE · PLAY · WIN · LOSE. State transitions on input and win/loss conditions."
            />
            <Callout
              label="THE GRAPHICS"
              accent={NEON_CYAN}
              body="60 FPS via DMA-rendered tile graphics on the 240×160 hardware framebuffer."
            />
            <Callout
              label="THE GAME"
              accent={NEON_GREEN}
              body="2-life system, collision detection on 5+ interactive elements. Input via the GBA D-pad."
            />
          </div>

          {/* ── Stat row + CTA ───────────────────────────────────────── */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Stat n="240×160" k="screen res" />
              <Stat n="60 FPS" k="DMA render" />
              <Stat n="4" k="states" />
              <Stat n="2" k="lives" />
              <Stat n="5+" k="entities" />
            </div>
            <a
              href="https://github.com/parthivFarazi/GameBoyCGame"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                font: `9.5px ${PIXEL_FONT}`,
                letterSpacing: '.18em',
                color: '#0e1a2e',
                background: NEON_AMBER,
                padding: '10px 14px',
                borderRadius: 2,
                textDecoration: 'none',
                boxShadow: `0 0 14px rgba(245,217,122,.55), 0 3px 0 #b39440`,
                whiteSpace: 'nowrap',
              }}
            >
              ▶ VIEW ON GITHUB
            </a>
          </div>
        </div>
      </div>

      {/* ──────────── D-pad mock-up (bottom-left) ───────────────────── */}
      <div style={{
        position: 'absolute', bottom: 32, left: 70,
        width: 50, height: 50,
        display: 'grid', placeItems: 'center',
      }}>
        <div style={{ position: 'absolute', width: 50, height: 14, background: '#1a1a2e', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', width: 14, height: 50, background: '#1a1a2e', borderRadius: 2 }}/>
      </div>

      {/* A / B buttons (bottom-right) */}
      <div style={{
        position: 'absolute', bottom: 26, right: 60,
        display: 'flex', gap: 10, alignItems: 'flex-end',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#a01818', boxShadow: 'inset 0 -3px 4px rgba(0,0,0,.4), 0 2px 0 #5a0c0c',
          display: 'grid', placeItems: 'center',
          font: `10px ${PIXEL_FONT}`, color: OFF_WHITE,
        }}>B</div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#a01818', boxShadow: 'inset 0 -3px 4px rgba(0,0,0,.4), 0 2px 0 #5a0c0c',
          display: 'grid', placeItems: 'center',
          font: `10px ${PIXEL_FONT}`, color: OFF_WHITE,
          transform: 'translateY(-10px)',
        }}>A</div>
      </div>

      {/* START / SELECT pills */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 10,
      }}>
        {['SELECT', 'START'].map((label) => (
          <div key={label} style={{
            transform: 'rotate(-22deg)',
            padding: '4px 12px', borderRadius: 999,
            background: '#3a3450',
            boxShadow: 'inset 0 -2px 2px rgba(0,0,0,.4)',
            font: `7.5px ${PIXEL_FONT}`, letterSpacing: '.16em', color: '#bca6e0',
          }}>{label}</div>
        ))}
      </div>
    </div>
  );
}

// ── Small subcomponents ────────────────────────────────────────────────

function Callout({ label, accent, body }: { label: string; accent: string; body: string }) {
  return (
    <div style={{
      padding: '10px 12px',
      background: 'rgba(255,255,255,.04)',
      border: `1px solid ${accent}55`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,.04), 0 0 14px ${accent}22`,
      position: 'relative',
    }}>
      {/* Corner ticks */}
      <span style={{ position: 'absolute', top: -1, left: -1, width: 6, height: 6, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 6, height: 6, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 6, height: 6, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>

      <div style={{ font: `8.5px ${PIXEL_FONT}`, letterSpacing: '.22em', color: accent, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ font: `13.5px/1.35 ${PIXEL_BODY}`, color: OFF_WHITE }}>
        {body}
      </div>
    </div>
  );
}

function Stat({ n, k }: { n: string; k: string }) {
  return (
    <div style={{ borderLeft: `2px solid ${NEON_GREEN}55`, paddingLeft: 8 }}>
      <div style={{ font: `400 13px ${PIXEL_FONT}`, color: NEON_GREEN, lineHeight: 1, letterSpacing: '.04em' }}>{n}</div>
      <div style={{ font: `10.5px ${PIXEL_FONT}`, letterSpacing: '.16em', color: 'rgba(255,250,238,.55)', marginTop: 4 }}>{k}</div>
    </div>
  );
}

// ── Animated pixel preview (canvas-driven, raf loop while mounted) ────
function PixelPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      drawPreview(ctx, t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ position: 'relative', height: 120, background: '#06101e', border: `1px solid ${NEON_GREEN}44`, boxShadow: `0 0 18px ${NEON_GREEN}22, inset 0 0 24px rgba(0,0,0,.5)` }}>
      <canvas
        ref={canvasRef}
        width={240}
        height={120}
        style={{
          width: '100%', height: '100%',
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />
      <div style={{ position: 'absolute', bottom: 4, right: 8, font: `9.5px ${PIXEL_FONT}`, color: NEON_AMBER, letterSpacing: '.18em', textShadow: '0 0 4px rgba(0,0,0,.8)' }}>
        ★ LIVE
      </div>
    </div>
  );
}

function drawPreview(ctx: CanvasRenderingContext2D, t: number) {
  ctx.fillStyle = '#06101e';
  ctx.fillRect(0, 0, 240, 120);
  // Title bar
  ctx.fillStyle = '#1f3a6c';
  ctx.fillRect(0, 0, 240, 12);
  ctx.fillStyle = NEON_GREEN;
  ctx.font = '700 8px "Press Start 2P", monospace';
  ctx.fillText('LV 1', 6, 9);
  ctx.fillStyle = NEON_PINK;
  for (let i = 0; i < 2; i++) {
    const hx = 232 - i * 12;
    ctx.fillRect(hx + 1, 2, 3, 1);
    ctx.fillRect(hx + 5, 2, 3, 1);
    ctx.fillRect(hx, 3, 4, 1);
    ctx.fillRect(hx + 4, 3, 4, 1);
    ctx.fillRect(hx + 1, 4, 6, 1);
    ctx.fillRect(hx + 2, 5, 4, 1);
    ctx.fillRect(hx + 3, 6, 2, 1);
  }
  // Grid
  ctx.fillStyle = 'rgba(120, 180, 220, 0.08)';
  for (let y = 16; y < 120; y += 6) ctx.fillRect(0, y, 240, 1);
  for (let x = 0; x < 240; x += 6) ctx.fillRect(x, 16, 1, 104);

  // Goal — pulsing emerald
  const gp = 1 + Math.sin(t * 0.005) * 0.18;
  const gw = 10 * gp;
  ctx.fillStyle = `rgba(125, 231, 168, ${0.65 + 0.35 * Math.sin(t * 0.008)})`;
  ctx.fillRect(218 - gw / 2, 64 - gw / 2, gw, gw);

  // Obstacles
  const obstacles: Array<[number, number]> = [[80, 40], [120, 80], [160, 30], [140, 100]];
  ctx.fillStyle = '#c44a3a';
  obstacles.forEach(([ox, oy]) => ctx.fillRect(ox - 3, oy - 3, 6, 6));

  // Player — wanders toward goal
  const phase = t * 0.0008;
  const px = 30 + Math.cos(phase) * 50 + 60 * (0.5 + 0.5 * Math.sin(phase * 0.5));
  const py = 64 + Math.sin(phase * 1.7) * 24;
  ctx.fillStyle = NEON_PINK;
  ctx.fillRect(px - 3, py - 3, 6, 6);
  ctx.fillStyle = OFF_WHITE;
  ctx.fillRect(px - 2, py - 2, 2, 2);

  // Footer caption
  ctx.fillStyle = NEON_CYAN;
  ctx.font = '6px monospace';
  ctx.fillText('C · DMA · 60 FPS', 6, 116);
}
