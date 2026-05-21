import type { ReactNode } from 'react';
import type { PanelProps } from './UPDTPanel';

export function HeatmapPanel({ width = 820, height = 880 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#3a2410',
      padding: 20,
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Wood frame */}
      <div style={{
        position: 'absolute', inset: 12,
        border: '12px solid #5a3a18',
        borderRadius: 4,
        boxShadow: 'inset 0 0 24px rgba(0,0,0,.55), 0 12px 24px rgba(0,0,0,.5)',
      }}/>
      {/* Chalkboard surface */}
      <div style={{
        position: 'absolute', inset: 24,
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.04), transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(255,255,255,.03), transparent 60%),
          linear-gradient(180deg, #1c2820 0%, #0e1812 100%)
        `,
        boxShadow: 'inset 0 0 50px rgba(0,0,0,.5)',
      }}>
        {/* Chalk dust smudges */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 14% 18%, rgba(255,255,255,.025) 6px, transparent 18px), radial-gradient(circle at 78% 64%, rgba(255,255,255,.02) 8px, transparent 22px), radial-gradient(circle at 36% 84%, rgba(255,255,255,.02) 5px, transparent 16px)' }}/>

        <div style={{ position: 'relative', height: '100%', padding: '18px 22px 30px', color: '#f4ecd6', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* ── Header ───────────────────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(244,236,214,.55)' }}>
                The Heatmap Garden · xGenius
              </div>
              <h1 style={{ font: '34px/1 "Caveat", cursive', margin: '4px 0 4px', color: '#fffaee', letterSpacing: '.01em' }}>
                Off-ball runs, in color.
              </h1>
              <div style={{ font: '16px/1.45 var(--rw-sans, system-ui)', color: 'rgba(244,236,214,.82)', margin: '2px 0 5px', maxWidth: '52ch' }}>
                A pipeline that scores the runs soccer players make without the ball.
              </div>
              <div style={{ font: '10.5px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.65)', letterSpacing: '.04em' }}>
                April 2025 · US Soccer Federation data · Python · Pandas · Matplotlib · Seaborn
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, font: '9.5px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.7)', paddingTop: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 14, height: 2, background: '#fffaee', display: 'inline-block' }}/>run
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, background: 'radial-gradient(circle, #e07ec3, rgba(224,126,195,0))', borderRadius: '50%', display: 'inline-block' }}/>opponent
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, background: '#f5d97a', display: 'inline-block', boxShadow: '0 0 6px #f5d97a' }}/>ball
              </span>
            </div>
          </div>

          {/* ── What is ORIS? callout ────────────────────────────────── */}
          <div style={{
            border: '1px dashed rgba(245,217,122,.55)',
            background: 'rgba(245,217,122,.06)',
            padding: '12px 16px',
            position: 'relative',
            boxShadow: 'inset 0 0 12px rgba(245,217,122,.06)',
          }}>
            {/* Chalk corner glyphs */}
            <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: '2px solid rgba(245,217,122,.6)', borderLeft: '2px solid rgba(245,217,122,.6)' }}/>
            <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: '2px solid rgba(245,217,122,.6)', borderRight: '2px solid rgba(245,217,122,.6)' }}/>
            <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: '2px solid rgba(245,217,122,.6)', borderLeft: '2px solid rgba(245,217,122,.6)' }}/>
            <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: '2px solid rgba(245,217,122,.6)', borderRight: '2px solid rgba(245,217,122,.6)' }}/>

            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245,217,122,.85)' }}>
              · what is ORIS? ·
            </div>
            <div style={{ marginTop: 4, font: '17px/1.32 "Caveat", cursive', color: '#fffaee' }}>
              <b style={{ color: '#f5d97a' }}>ORIS · Off-Ball Run Impact Score</b> — a metric for what players do <em style={{ color: '#f5b6da' }}>without</em> the ball: decoy runs, third-man movements, space-creating actions that don't show up in traditional stats.
            </div>
          </div>

          {/* ── Tactical chalkboard diagram ──────────────────────────── */}
          {/* Trimmed from 340 → 286 so the methodology steps below can be
              noticeably larger — the steps carry the project explanation. */}
          <div style={{ position: 'relative', height: 286, border: '1px dashed rgba(244,236,214,.25)', padding: 10 }}>
            <ChalkPitch/>
            <div style={{ position: 'absolute', top: 24, right: 38, font: '22px "Caveat", cursive', color: '#fffaee', transform: 'rotate(-4deg)' }}>
              decoy run →
            </div>
            <div style={{ position: 'absolute', bottom: 32, left: 60, font: '20px "Caveat", cursive', color: '#f5d97a', transform: 'rotate(2deg)' }}>
              third-man.
            </div>
          </div>

          {/* ── Methodology strip — 3 illustrated chalk steps ────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <MethodStep
              n="01"
              title="4 raw datasets"
              sub="USSF match feeds"
              icon={<CsvIcon/>}
            />
            <MethodStep
              n="02"
              title="Multi-stage Python pipeline"
              sub="1,000+ player movements / game"
              icon={<PipelineIcon/>}
            />
            <MethodStep
              n="03"
              title="High-impact phases identified"
              sub="output: tagged match windows"
              icon={<TimelineIcon/>}
            />
          </div>

          {/* ── Devpost CTA ──────────────────────────────────────────── */}
          <a
            href="https://devpost.com/software/xgenius"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              alignSelf: 'center',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 22px',
              border: '2px dashed #f5d97a',
              background: 'rgba(245,217,122,.08)',
              color: '#f5d97a',
              font: '12px "JetBrains Mono", monospace',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              boxShadow: '0 0 18px rgba(245,217,122,.35), inset 0 0 12px rgba(245,217,122,.08)',
              textDecoration: 'none',
              transition: 'box-shadow .2s ease, transform .15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 24px rgba(245,217,122,.55), inset 0 0 16px rgba(245,217,122,.18)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 18px rgba(245,217,122,.35), inset 0 0 12px rgba(245,217,122,.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>view on devpost</span>
            <span style={{ font: '15px var(--rw-serif)' }}>→</span>
          </a>

          {/* ── Stat strip ───────────────────────────────────────────── */}
          <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px dashed rgba(244,236,214,.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
              <ChalkStat n="4" k="datasets"/>
              <ChalkStat n="1,000+" k="movements / game"/>
              <ChalkStat n="USSF" k="data partner"/>
              <ChalkStat n="xRun" k="off-ball score" italic/>
            </div>
          </div>
        </div>

        {/* Chalk tray at the bottom */}
        <div style={{ position: 'absolute', bottom: -10, left: 30, right: 30, height: 14, background: 'linear-gradient(180deg, #6e4a2a, #3a2410)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 6px rgba(0,0,0,.4)' }}>
          <div style={{ position: 'absolute', top: -6, left: 30, width: 60, height: 6, background: '#fffaee', borderRadius: 2, transform: 'rotate(-2deg)' }}/>
          <div style={{ position: 'absolute', top: -5, left: 110, width: 40, height: 5, background: '#f5d97a', borderRadius: 2 }}/>
          <div style={{ position: 'absolute', top: -6, left: 170, width: 48, height: 5, background: '#e07ec3', opacity: .85, borderRadius: 2, transform: 'rotate(3deg)' }}/>
          <div style={{ position: 'absolute', top: -9, left: 240, width: 56, height: 12, background: 'linear-gradient(180deg, #c44a3a, #8a1a14)', border: '1px solid #5a1208', boxShadow: '0 2px 3px rgba(0,0,0,.4)' }}/>
        </div>
      </div>
    </div>
  );
}

// ── Methodology step card ────────────────────────────────────────────
// Number, title and sub all stack flush-left so the three cards read
// consistently (no mixed left/right justification).
function MethodStep({ n, title, sub, icon }: { n: string; title: string; sub: string; icon: ReactNode }) {
  return (
    <div style={{
      padding: 16,
      border: '1px dashed rgba(244,236,214,.4)',
      background: 'rgba(255,255,255,.02)',
      display: 'flex', flexDirection: 'column', gap: 9,
      textAlign: 'left',
      position: 'relative',
    }}>
      <span style={{ font: '700 13px "JetBrains Mono", monospace', letterSpacing: '.2em', color: '#f5d97a' }}>{n}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flexShrink: 0 }}>{icon}</div>
        <div style={{ font: '19px/1.22 "Caveat", cursive', color: '#fffaee', flex: 1, minWidth: 0 }}>{title}</div>
      </div>
      <span style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.1em', color: 'rgba(244,236,214,.55)', textTransform: 'uppercase' }}>{sub}</span>
    </div>
  );
}

// ── Three chalk illustrated icons ────────────────────────────────────
function CsvIcon() {
  // Stack of CSV "files" — small sheet with row lines
  return (
    <svg viewBox="0 0 48 44" width="48" height="44">
      <g stroke="#fffaee" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".95">
        {/* Back sheet */}
        <rect x="10" y="4" width="26" height="32" rx="1.5" opacity=".55"/>
        {/* Middle sheet */}
        <rect x="7" y="8" width="26" height="32" rx="1.5" opacity=".75"/>
        {/* Front sheet */}
        <rect x="4" y="12" width="26" height="28" rx="1.5"/>
        {/* Row lines on front */}
        <line x1="7" y1="19" x2="27" y2="19"/>
        <line x1="7" y1="25" x2="27" y2="25"/>
        <line x1="7" y1="31" x2="27" y2="31"/>
        {/* Column line */}
        <line x1="17" y1="14" x2="17" y2="38" opacity=".5"/>
      </g>
      {/* "CSV" label */}
      <text x="38" y="38" fontFamily="Caveat, cursive" fontSize="11" fill="#f5d97a">.csv</text>
    </svg>
  );
}

function PipelineIcon() {
  // Three nodes connected by chevron arrows — represents stages
  return (
    <svg viewBox="0 0 64 44" width="64" height="44">
      <g stroke="#fffaee" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".95">
        {/* Stage 1 */}
        <rect x="2" y="14" width="14" height="14" rx="1.5"/>
        <line x1="5" y1="18" x2="13" y2="18"/>
        <line x1="5" y1="22" x2="11" y2="22"/>
        {/* arrow */}
        <path d="M18 21 L22 21"/>
        <path d="M21 19 L23 21 L21 23"/>
        {/* Stage 2 */}
        <rect x="25" y="14" width="14" height="14" rx="1.5"/>
        <circle cx="32" cy="21" r="3"/>
        {/* arrow */}
        <path d="M41 21 L45 21"/>
        <path d="M44 19 L46 21 L44 23"/>
        {/* Stage 3 */}
        <rect x="48" y="14" width="14" height="14" rx="1.5"/>
        <path d="M51 24 L55 18 L59 22"/>
      </g>
      <text x="2" y="40" fontFamily="JetBrains Mono, monospace" fontSize="6" fill="rgba(244,236,214,.55)" letterSpacing=".08em">pipeline.py</text>
    </svg>
  );
}

function TimelineIcon() {
  // Horizontal timeline with highlighted (impact) windows
  return (
    <svg viewBox="0 0 64 44" width="64" height="44">
      <g opacity=".95">
        {/* Baseline */}
        <line x1="3" y1="22" x2="61" y2="22" stroke="#fffaee" strokeWidth="1" strokeLinecap="round"/>
        {/* Tick marks */}
        {[3, 13, 23, 33, 43, 53, 61].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="24" stroke="#fffaee" strokeWidth=".8"/>
        ))}
        {/* Two highlighted windows */}
        <rect x="13" y="16" width="10" height="12" fill="#f5d97a" opacity=".25" stroke="#f5d97a" strokeWidth=".8" rx="1"/>
        <rect x="43" y="16" width="10" height="12" fill="#f5d97a" opacity=".25" stroke="#f5d97a" strokeWidth=".8" rx="1"/>
        {/* Impact stars */}
        <text x="16" y="14" fontSize="10" fill="#f5d97a" fontFamily="JetBrains Mono, monospace">★</text>
        <text x="46" y="14" fontSize="10" fill="#f5d97a" fontFamily="JetBrains Mono, monospace">★</text>
        {/* Caption */}
        <text x="3" y="38" fontFamily="Caveat, cursive" fontSize="9" fill="#cfe4ff">impact windows</text>
      </g>
    </svg>
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

function ChalkStat({ n, k, italic }: { n: ReactNode; k: ReactNode; italic?: boolean }) {
  return (
    <div style={{ borderLeft: '2px solid rgba(244,236,214,.5)', paddingLeft: 10 }}>
      <div style={{ font: italic ? 'italic 25px var(--rw-serif)' : '32px "Caveat", cursive', color: '#fffaee', lineHeight: 1, whiteSpace: 'nowrap' }}>{n}</div>
      <div style={{ font: '9.2px/1.25 "JetBrains Mono", monospace', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(244,236,214,.6)', marginTop: 4 }}>{k}</div>
    </div>
  );
}
