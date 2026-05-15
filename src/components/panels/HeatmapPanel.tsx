import type { ReactNode } from 'react';
import { createElement } from 'react';
import type { PanelProps } from './UPDTPanel';

function PctSlot({ id, w, h, placeholder, shape = 'rect' }: { id: string; w: number | string; h: number | string; placeholder?: string; shape?: 'rect' | 'rounded' }) {
  return createElement('image-slot', { id, placeholder, shape, style: { width: w, height: h } });
}

export function HeatmapPanel({ width = 820, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#3a2410',
      padding: 20,
      fontFamily: 'var(--rw-sans)',
    }}>
      <div style={{
        position: 'absolute', inset: 12,
        border: '12px solid #5a3a18',
        borderRadius: 4,
        boxShadow: 'inset 0 0 24px rgba(0,0,0,.55), 0 12px 24px rgba(0,0,0,.5)',
      }}/>
      <div style={{
        position: 'absolute', inset: 24,
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.04), transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(255,255,255,.03), transparent 60%),
          linear-gradient(180deg, #1c2820 0%, #0e1812 100%)
        `,
        boxShadow: 'inset 0 0 50px rgba(0,0,0,.5)',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 14% 18%, rgba(255,255,255,.025) 6px, transparent 18px), radial-gradient(circle at 78% 64%, rgba(255,255,255,.02) 8px, transparent 22px), radial-gradient(circle at 36% 84%, rgba(255,255,255,.02) 5px, transparent 16px)' }}/>

        <div style={{ position: 'relative', height: '100%', padding: '20px 24px', color: '#f4ecd6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(244,236,214,.55)' }}>
                The Heatmap Garden · xGenius
              </div>
              <h1 style={{ font: '34px/1 "Caveat", cursive', margin: '6px 0 2px', color: '#fffaee', letterSpacing: '.01em' }}>
                Off-ball runs, in color.
              </h1>
              <div style={{ font: '11px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.55)' }}>
                2024 — 2025 · US Soccer Federation data · 4 datasets · Python + d3
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, font: '9.5px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.7)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 14, height: 2, background: '#fffaee', display: 'inline-block' }}/>run
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, background: 'radial-gradient(circle, #e07ec3, rgba(224,126,195,0))', borderRadius: '50%', display: 'inline-block' }}/>heat
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, background: '#f5d97a', display: 'inline-block', boxShadow: '0 0 6px #f5d97a' }}/>impact
              </span>
            </div>
          </div>

          <div style={{ marginTop: 14, position: 'relative', height: 380, border: '1px dashed rgba(244,236,214,.25)', padding: 10 }}>
            <ChalkPitch/>
            <div style={{ position: 'absolute', left: 14, top: 14, right: 14, bottom: 14, pointerEvents: 'none', display: 'grid', placeItems: 'center' }}>
              <div style={{ pointerEvents: 'auto', width: '94%', height: '88%', mixBlendMode: 'screen', opacity: .92 }}>
                <PctSlot id="heatmap-overlay" w="100%" h="100%" placeholder="heatmap overlay · drop image"/>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 28, right: 38, font: '22px "Caveat", cursive', color: '#fffaee', transform: 'rotate(-4deg)' }}>
              decoy run →
            </div>
            <div style={{ position: 'absolute', bottom: 36, left: 60, font: '20px "Caveat", cursive', color: '#f5d97a', transform: 'rotate(2deg)' }}>
              third-man.
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ChalkCard label="Plate II · scatter">
              <PctSlot id="heatmap-scatter" w="100%" h={120} placeholder="scatter plot · screenshot"/>
            </ChalkCard>
            <ChalkCard label="Plate III · run impact">
              <PctSlot id="heatmap-impact" w="100%" h={120} placeholder="run-impact chart · screenshot"/>
            </ChalkCard>
          </div>

          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(244,236,214,.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <ChalkStat n="4" k="datasets"/>
              <ChalkStat n="1,000+" k="player movements / game"/>
              <ChalkStat n="USSF" k="data partner"/>
              <ChalkStat n="x" k="genius" italic/>
            </div>
          </div>

          <div style={{ position: 'absolute', right: 26, bottom: 22, font: '18px "Caveat", cursive', color: '#f5d97a', transform: 'rotate(-3deg)' }}>
            ...the players you don't see.
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: -10, left: 30, right: 30, height: 14, background: 'linear-gradient(180deg, #6e4a2a, #3a2410)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 6px rgba(0,0,0,.4)' }}>
          <div style={{ position: 'absolute', top: -6, left: 30, width: 60, height: 6, background: '#fffaee', borderRadius: 2, transform: 'rotate(-2deg)' }}/>
          <div style={{ position: 'absolute', top: -5, left: 110, width: 40, height: 5, background: '#f5d97a', borderRadius: 2 }}/>
          <div style={{ position: 'absolute', top: -6, left: 170, width: 48, height: 5, background: '#e07ec3', opacity: .85, borderRadius: 2, transform: 'rotate(3deg)' }}/>
          <div style={{ position: 'absolute', top: -10, right: 40, width: 56, height: 12, background: 'linear-gradient(180deg, #c44a3a, #8a1a14)', border: '1px solid #5a1208', boxShadow: '0 2px 3px rgba(0,0,0,.4)' }}/>
        </div>
      </div>
    </div>
  );
}

function ChalkPitch() {
  return (
    <svg viewBox="0 0 720 360" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <filter id="rough">
          <feTurbulence baseFrequency="2" numOctaves="2" seed="3"/>
          <feDisplacementMap in="SourceGraphic" scale="0.6"/>
        </filter>
      </defs>
      <g stroke="#fffaee" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".88" filter="url(#rough)">
        <rect x="14" y="14" width="692" height="332"/>
        <line x1="360" y1="14" x2="360" y2="346"/>
        <circle cx="360" cy="180" r="54"/>
        <circle cx="360" cy="180" r="2" fill="#fffaee"/>
        <rect x="14" y="80" width="100" height="200"/>
        <rect x="14" y="130" width="40" height="100"/>
        <rect x="606" y="80" width="100" height="200"/>
        <rect x="666" y="130" width="40" height="100"/>
        <rect x="6" y="155" width="8" height="50"/>
        <rect x="706" y="155" width="8" height="50"/>
        <path d="M14 24 Q24 14 30 14"/>
        <path d="M706 24 Q696 14 690 14"/>
        <path d="M14 336 Q24 346 30 346"/>
        <path d="M706 336 Q696 346 690 346"/>
      </g>
      <g stroke="#fffaee" strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity=".82">
        <path d="M180 200 Q240 140 320 130 Q400 130 500 90"/>
        <path d="M520 240 Q580 220 600 170"/>
        <path d="M140 280 Q200 280 260 220"/>
      </g>
      <g fill="#fffaee" opacity=".9">
        <path d="M498 88 L506 84 L502 96 Z"/>
        <path d="M600 168 L606 162 L606 176 Z"/>
        <path d="M260 220 L268 214 L268 228 Z"/>
      </g>
      <g>
        {([[120, 180], [200, 100], [200, 260], [280, 180], [360, 130], [360, 230]] as Array<[number, number]>).map(([x, y], i) => (
          <circle key={`d${i}`} cx={x} cy={y} r="5" fill="#cfe4ff" stroke="#1a1410" strokeWidth=".5"/>
        ))}
        {([[440, 110], [520, 170], [580, 220], [640, 160]] as Array<[number, number]>).map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="5" fill="#e07ec3" stroke="#1a1410" strokeWidth=".5"/>
        ))}
        <circle cx="300" cy="180" r="3" fill="#f5d97a"/>
      </g>
      <g opacity=".25" fill="#fffaee">
        {Array.from({ length: 60 }).map((_, i) => (
          <circle key={i} cx={(Math.sin(i * 12.3) * 0.5 + 0.5) * 720} cy={(Math.cos(i * 7.1) * 0.5 + 0.5) * 360} r=".4"/>
        ))}
      </g>
    </svg>
  );
}

function ChalkCard({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div style={{
      padding: 8,
      border: '1px dashed rgba(244,236,214,.4)',
      background: 'rgba(255,255,255,.02)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(244,236,214,.6)' }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function ChalkStat({ n, k, italic }: { n: ReactNode; k: ReactNode; italic?: boolean }) {
  return (
    <div style={{ borderLeft: '2px solid rgba(244,236,214,.5)', paddingLeft: 10 }}>
      <div style={{ font: italic ? 'italic 28px var(--rw-serif)' : '32px "Caveat", cursive', color: '#fffaee', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,236,214,.6)', marginTop: 4 }}>{k}</div>
    </div>
  );
}
