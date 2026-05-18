// panels.jsx — Building-matched UI panels.
// Each panel is themed to its building's identity.

// ─── 1. COLLEGIATE TOWER — Education — Parchment scroll + wax seal ──────

function CollegiateTowerPanel({ width = 720, height = 760 }) {
  const courses = [
    'Data Structures', 'Algorithms', 'Discrete Math', 'OOP', 'Operating Systems',
    'Algorithm Design', 'Software Engineering', 'Linear Algebra',
    'Machine Learning', 'Artificial Intelligence', 'Combinatorics',
    'Systems & Networks', 'Cognitive Science',
  ];
  return (
    <div style={{ width, height, position: 'relative', background: 'radial-gradient(ellipse at 50% 40%, rgba(20,15,8,.45), rgba(0,0,0,.7))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      {/* Floating dust motes for atmosphere */}
      <Motes count={14} />
      {/* The scroll */}
      <div style={{ position: 'relative', width: width - 80, height: height - 80 }}>
        {/* Top dowel */}
        <Dowel y={0} />
        {/* Bottom dowel */}
        <Dowel y={height - 80 - 22} />

        {/* Parchment body */}
        <div style={{
          position: 'absolute', left: 28, right: 28, top: 18, bottom: 18,
          background: `
            radial-gradient(ellipse at 50% 50%, #f4e7c4 0%, #ecd9a8 70%, #d8c285 100%)
          `,
          boxShadow: '0 18px 48px rgba(0,0,0,.5), inset 0 0 60px rgba(140,100,40,.25)',
          padding: '48px 60px 60px',
          fontFamily: 'var(--rw-serif)',
          color: '#3a2818',
          overflow: 'hidden',
        }}>
          {/* Tea stain edges */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.18), transparent 40%), radial-gradient(ellipse at 0% 100%, rgba(120,70,20,.16), transparent 40%)' }}></div>
          {/* Decorative top frame */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            <Flourish />
          </div>
          <div style={{ textAlign: 'center', font: '11px var(--rw-mono)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30' }}>
            Collegiate Tower · Education
          </div>
          <h1 style={{ font: 'italic 56px/1 var(--rw-serif)', margin: '14px 0 6px', textAlign: 'center', color: '#2a1a0e' }}>
            On scholarship<br/>and engineering.
          </h1>
          <div style={{ textAlign: 'center', font: '14px var(--rw-mono)', color: '#7a5a30', marginBottom: 18 }}>
            Anno · 2022 — 2026
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <Flourish narrow />
          </div>

          <div style={{ font: '20px/1.5 var(--rw-serif)', textAlign: 'center', color: '#2a1a0e', margin: '0 auto 18px', maxWidth: 460 }}>
            Georgia Institute of Technology<br/>
            <em style={{ font: '17px var(--rw-serif)', color: '#5a3e20' }}>Bachelor of Science · Computer Science</em><br/>
            <span style={{ font: '14px var(--rw-mono)', color: '#7a5a30' }}>Expected · December 2026</span>
          </div>

          {/* Coursework — like a course catalog index */}
          <div style={{ borderTop: '1px solid #b89860', borderBottom: '1px solid #b89860', padding: '14px 0', margin: '8px 0 20px' }}>
            <div style={{ textAlign: 'center', font: '10px var(--rw-mono)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 8 }}>
              · Coursework ·
            </div>
            <div style={{ columnCount: 2, columnGap: 32, font: '14.5px/1.7 var(--rw-serif)', color: '#3a2818' }}>
              {courses.map((c, i) => (
                <div key={c} style={{ breakInside: 'avoid', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>{c}</span>
                  <span style={{ font: '11px var(--rw-mono)', color: '#a07a40' }}>{String(i + 1).padStart(2,'0')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signature + wax seal */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
            <div>
              <div style={{ font: '32px/1 "Caveat", var(--rw-serif)', color: '#2a1a0e' }}>Parthiv Farazi</div>
              <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30', marginTop: 4 }}>
                Candidate · cs · atl
              </div>
            </div>
            <WaxSeal />
          </div>
        </div>

        {/* Subtle scroll curl shadow */}
        <div style={{ position: 'absolute', left: 22, right: 22, top: 24, height: 16, background: 'linear-gradient(to bottom, rgba(0,0,0,.25), transparent)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 26, height: 16, background: 'linear-gradient(to top, rgba(0,0,0,.25), transparent)', pointerEvents: 'none' }}></div>
      </div>
    </div>
  );
}

function Dowel({ y }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: y, height: 22, display: 'flex' }}>
      {/* End cap left */}
      <div style={{ width: 30, height: 22, background: 'radial-gradient(ellipse at 30% 40%, #c89860, #5a3a18 70%)', borderRadius: '50%' }}></div>
      {/* Bar */}
      <div style={{ flex: 1, height: 22, background: 'linear-gradient(180deg, #8a5a28, #5a3a18 50%, #3a2410)', borderTop: '1px solid #c89860', borderBottom: '1px solid #2a1808', boxShadow: 'inset 0 -4px 8px rgba(0,0,0,.5)' }}></div>
      <div style={{ width: 30, height: 22, background: 'radial-gradient(ellipse at 70% 40%, #c89860, #5a3a18 70%)', borderRadius: '50%' }}></div>
    </div>
  );
}

function Flourish({ narrow }) {
  return (
    <svg viewBox="0 0 240 24" width={narrow ? 160 : 240} height="24" style={{ display: 'block', color: '#7a5a30' }}>
      <path d="M2 12 L80 12" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M158 12 L238 12" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M80 12 Q90 4 100 12 Q110 20 120 12 Q130 4 140 12 Q150 20 160 12" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="120" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

function WaxSeal() {
  return (
    <div style={{ width: 96, height: 96, position: 'relative' }}>
      {/* Drip shadow */}
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,20,.4), transparent 65%)', filter: 'blur(4px)' }}></div>
      {/* Main wax */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #d35a4a 0%, #9a2a1a 60%, #5a1208 100%)',
        boxShadow: 'inset 0 -8px 12px rgba(0,0,0,.5), inset 0 4px 8px rgba(255,180,160,.45), 0 4px 10px rgba(0,0,0,.4)',
        display: 'grid', placeItems: 'center',
      }}>
        <div style={{ font: 'italic 30px var(--rw-serif)', color: '#3a0a04', letterSpacing: '-.02em', textShadow: '0 1px 0 rgba(255,200,180,.4)' }}>PF</div>
      </div>
      {/* Wax drip */}
      <div style={{ position: 'absolute', left: 36, bottom: -8, width: 22, height: 18, background: 'radial-gradient(ellipse at top, #9a2a1a 30%, #5a1208 100%)', borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%' }}></div>
    </div>
  );
}

function Motes({ count = 12 }) {
  const motes = React.useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      left: (Math.sin(i * 4.21) * 0.5 + 0.5) * 100,
      top: (Math.cos(i * 3.13) * 0.5 + 0.5) * 100,
      size: 1 + (i % 4),
      delay: i * 0.5,
    }))
  ), [count]);
  return (
    <>
      <style>{`
        @keyframes mote-drift { 0%,100% { transform: translate(0,0); opacity: .3 } 50% { transform: translate(8px, -14px); opacity: .8 } }
      `}</style>
      {motes.map((m, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${m.left}%`, top: `${m.top}%`,
          width: m.size, height: m.size, borderRadius: '50%',
          background: '#f5d97a', opacity: .5, pointerEvents: 'none',
          animation: `mote-drift ${5 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${m.delay}s`,
        }} />
      ))}
    </>
  );
}

// ─── 2. TWIN TOWERS — About Me — Polaroid stack on a wooden desk ────────

function TwinTowersPanel({ width = 760, height = 760 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: `
        repeating-linear-gradient(12deg, #5a3a22 0 26px, #4a2e1c 26px 28px, #6a4628 28px 54px),
        #4a2e1c
      `,
      backgroundBlendMode: 'normal',
    }}>
      {/* Dim warm light from top */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(245,217,122,.3), transparent 60%)' }}></div>

      {/* Globe in corner */}
      <Globe x={width - 150} y={height - 170} />

      {/* "PF" doormat / nameplate */}
      <div style={{ position: 'absolute', left: 40, bottom: 40, width: 160, height: 64, background: 'linear-gradient(180deg, #6db862 0%, #4a8a48 100%)', border: '4px solid #2e2520', display: 'grid', placeItems: 'center', font: 'italic 36px var(--rw-serif)', color: '#fffaee', letterSpacing: '.12em', boxShadow: '0 6px 12px rgba(0,0,0,.5)', transform: 'rotate(-3deg)' }}>
        — PF —
      </div>

      {/* Title hand-written on parchment tag */}
      <div style={{ position: 'absolute', left: 32, top: 32, background: '#f6f1e4', padding: '10px 18px', font: 'italic 22px var(--rw-serif)', color: '#2a1a0e', boxShadow: '0 4px 12px rgba(0,0,0,.4)', transform: 'rotate(-2deg)' }}>
        <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Twin Towers · About</div>
        About me, in five photos
      </div>

      {/* Polaroid stack */}
      <Polaroid x={120} y={88} rotate={6} caption="KL · Petronas · home base">
        <SilhouetteTwinTowers />
      </Polaroid>
      <Polaroid x={300} y={120} rotate={-4} caption="Tech Square · Atlanta">
        <SilhouetteCollegiate />
      </Polaroid>
      <Polaroid x={480} y={92} rotate={3} caption="UPDT · ScoutPro dashboard">
        <SilhouetteDashboard />
      </Polaroid>
      <Polaroid x={170} y={340} rotate={-7} caption="On the pitch · data → decisions">
        <SilhouetteField />
      </Polaroid>
      <Polaroid x={400} y={360} rotate={2} caption="Hello — I'm Parthiv">
        <PortraitMini />
      </Polaroid>

      {/* The handwritten letter underneath everything */}
      <div style={{
        position: 'absolute', right: 24, top: 200, width: 260, padding: '20px 22px 24px',
        background: 'linear-gradient(180deg, #fbf3da, #f1e6c0)',
        boxShadow: '0 6px 14px rgba(0,0,0,.45)',
        transform: 'rotate(4deg)',
        font: '15px/1.55 "Caveat", var(--rw-serif)',
        color: '#2a1a0e',
      }}>
        Hey, I'm Parthiv. CS @ Georgia Tech (Dec '26), CTO of UPDT.<br/>
        Grew up between Kuala Lumpur and Atlanta. I build things at the seam of <em>sports, AI, and product</em>.<br/><br/>
        Most of my work comes from the same instinct: data should turn into decisions.<br/>
        <span style={{ display: 'inline-block', marginTop: 6, font: 'italic 18px var(--rw-serif)' }}>— PF</span>
      </div>
    </div>
  );
}

function Polaroid({ x, y, rotate = 0, caption, children }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 180, padding: '10px 10px 36px',
      background: '#f6f1e4', boxShadow: '0 8px 18px rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.3)',
      transform: `rotate(${rotate}deg)`, transformOrigin: 'center',
    }}>
      <div style={{ width: 160, height: 160, background: '#1a1410', overflow: 'hidden' }}>{children}</div>
      <div style={{ font: '15px "Caveat", var(--rw-serif)', color: '#2a1a0e', textAlign: 'center', marginTop: 8 }}>{caption}</div>
    </div>
  );
}

function SilhouetteTwinTowers() {
  // ORIGINAL twin-spire design — NOT Petronas. Tapered silver shafts with a sky bridge, faceted.
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="tts-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd4a3"/>
          <stop offset="60%" stopColor="#e3c5e1"/>
          <stop offset="100%" stopColor="#b3dfd7"/>
        </linearGradient>
        <linearGradient id="tts-spire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfd8dc"/>
          <stop offset="100%" stopColor="#475158"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="url(#tts-sky)" />
      {/* tiny sun */}
      <circle cx="40" cy="38" r="12" fill="#fff1c8" opacity=".7"/>
      {/* Left spire — original silhouette, stepped + faceted */}
      <path d="M48 158 L50 60 L52 50 L56 42 L60 50 L62 60 L62 158 Z" fill="url(#tts-spire)" />
      <path d="M56 36 L56 8" stroke="#cfd8dc" strokeWidth="2"/>
      {/* Right spire */}
      <path d="M98 158 L100 60 L102 50 L106 42 L110 50 L112 60 L112 158 Z" fill="url(#tts-spire)" />
      <path d="M106 36 L106 8" stroke="#cfd8dc" strokeWidth="2"/>
      {/* Sky bridge */}
      <rect x="60" y="92" width="42" height="6" fill="#2e3338" />
      <rect x="60" y="89" width="42" height="3" fill="#cfd8dc" />
      {/* Window grid (warm gold at golden hour) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`l${i}`} x="50" y={68 + i * 7} width="12" height="3" fill="#f5d97a" opacity=".85"/>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={`r${i}`} x="100" y={68 + i * 7} width="12" height="3" fill="#f5d97a" opacity=".85"/>
      ))}
      {/* Ground */}
      <rect x="0" y="148" width="160" height="12" fill="#3a4a3e"/>
    </svg>
  );
}

function SilhouetteCollegiate() {
  // Original brick clock tower (inspired by collegiate tower form — not a specific landmark)
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#5a8a98"/>
      <circle cx="125" cy="35" r="14" fill="#fff1c8" opacity=".7"/>
      {/* tower body */}
      <rect x="64" y="40" width="32" height="118" fill="#a8553c"/>
      <rect x="64" y="40" width="32" height="118" fill="url(#brickPat)" opacity=".3"/>
      {/* trim */}
      <rect x="60" y="60" width="40" height="4" fill="#f6f1e4"/>
      <rect x="60" y="118" width="40" height="4" fill="#f6f1e4"/>
      {/* top */}
      <rect x="58" y="30" width="44" height="14" fill="#6e4a2a"/>
      <rect x="62" y="24" width="36" height="8" fill="#b3a369"/>
      <text x="80" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fontWeight="700" fill="#2a1a0e" letterSpacing="2">PF</text>
      {/* roof spike */}
      <path d="M76 24 L80 6 L84 24 Z" fill="#1a1410"/>
      {/* clock face */}
      <circle cx="80" cy="78" r="9" fill="#f6f1e4" stroke="#1a1410" strokeWidth="1"/>
      <line x1="80" y1="78" x2="80" y2="72" stroke="#1a1410" strokeWidth="1"/>
      <line x1="80" y1="78" x2="85" y2="80" stroke="#1a1410" strokeWidth="1"/>
      {/* windows */}
      {[100,118,138].map((y, i) => <rect key={i} x="72" y={y} width="16" height="6" fill="#f5d97a"/>)}
      {/* base lawn */}
      <rect x="0" y="148" width="160" height="12" fill="#6db862"/>
    </svg>
  );
}

function SilhouetteDashboard() {
  // Holographic ScoutPro-style mini
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#0e1820"/>
      <rect x="8" y="8" width="144" height="20" fill="#162536" stroke="#6fd5e0" strokeWidth=".5"/>
      <text x="14" y="22" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#6fd5e0">SCOUTPRO · U23 ATTACK · /search</text>
      {/* Scatter */}
      <rect x="8" y="34" width="86" height="84" fill="#0a141c" stroke="#6fd5e0" strokeWidth=".5"/>
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={14 + (i * 11) % 76} cy={42 + ((i * 17) % 64)} r="2" fill={i % 5 === 0 ? '#e07ec3' : '#6fd5e0'} opacity={.6 + (i % 3) * .15}/>
      ))}
      {/* player card */}
      <rect x="100" y="34" width="52" height="84" fill="#162536" stroke="#6fd5e0" strokeWidth=".5"/>
      <rect x="106" y="40" width="40" height="22" fill="#1f3344"/>
      <text x="106" y="74" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#94e2c0">PLAYER · 2K7</text>
      <text x="106" y="84" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#f6f1e4">xG 0.42 · xA 0.18</text>
      <text x="106" y="94" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#f6f1e4">Press 88 · Dist 11.2</text>
      <rect x="106" y="100" width="40" height="3" fill="#6fd5e0"/>
      <rect x="106" y="106" width="28" height="3" fill="#e07ec3"/>
      {/* heat bar */}
      <rect x="8" y="124" width="144" height="28" fill="#0a141c" stroke="#6fd5e0" strokeWidth=".5"/>
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={10 + i * 4.6} y={128} width="3.4" height="20" fill={`hsl(${30 + (Math.sin(i) * .5 + .5) * 180}, 80%, 55%)`} opacity=".8"/>
      ))}
    </svg>
  );
}

function SilhouetteField() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#5a9558"/>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 18} y="0" width="9" height="160" fill={i % 2 ? '#4f8b4f' : '#5a9558'}/>
      ))}
      {/* center circle */}
      <circle cx="80" cy="80" r="22" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      <circle cx="80" cy="80" r="2" fill="#f6f1e4"/>
      {/* lines */}
      <rect x="78.5" y="0" width="3" height="160" fill="#f6f1e4" opacity=".7"/>
      <rect x="0" y="40" width="40" height="80" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      <rect x="120" y="40" width="40" height="80" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      {/* heatmap dots */}
      <circle cx="50" cy="70" r="14" fill="#e07ec3" opacity=".4"/>
      <circle cx="100" cy="90" r="10" fill="#f5d97a" opacity=".5"/>
      <circle cx="120" cy="60" r="8" fill="#6fd5e0" opacity=".5"/>
    </svg>
  );
}

function PortraitMini() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="pm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd4a3"/>
          <stop offset="100%" stopColor="#e3c5e1"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="url(#pm-bg)"/>
      {/* simple front-facing avatar bust */}
      <ellipse cx="80" cy="160" rx="62" ry="34" fill="#f6f1e4"/>
      <rect x="50" y="120" width="60" height="40" fill="#f6f1e4"/>
      <rect x="78" y="120" width="4" height="40" fill="#dcd3bf"/>
      <ellipse cx="80" cy="86" rx="28" ry="32" fill="#d9a779"/>
      {/* hair */}
      <path d="M52 76 Q52 50 80 46 Q108 50 108 76 Q108 64 102 60 Q90 50 80 52 Q70 50 58 60 Q52 64 52 76 Z" fill="#1a1410"/>
      {/* beard */}
      <path d="M58 88 Q58 110 70 116 Q80 122 90 116 Q102 110 102 88 Q92 96 80 96 Q68 96 58 88 Z" fill="#241a14"/>
      {/* eyes */}
      <ellipse cx="70" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      <ellipse cx="90" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      {/* smile */}
      <path d="M70 104 Q80 108 90 104" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      {/* gold wristband (on neck-edge nod — visible at collar) */}
      <rect x="110" y="138" width="14" height="5" fill="#d4c178"/>
    </svg>
  );
}

function Globe({ x, y }) {
  return (
    <svg viewBox="0 0 120 130" width="120" height="130" style={{ position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,.5))' }}>
      {/* Stand */}
      <rect x="44" y="106" width="32" height="6" fill="#3a2410"/>
      <rect x="52" y="112" width="16" height="14" fill="#3a2410"/>
      {/* Axis ring */}
      <ellipse cx="60" cy="60" rx="48" ry="48" fill="none" stroke="#b3a369" strokeWidth="2"/>
      <circle cx="60" cy="60" r="40" fill="#5a9598" />
      {/* continents */}
      <path d="M30 40 Q40 32 52 36 Q66 32 78 42 Q88 52 84 64 Q92 72 86 84 Q70 90 56 84 Q44 88 32 78 Q24 64 28 52 Z" fill="#6db862"/>
      <path d="M40 56 Q52 50 62 56 Q72 62 68 70 Q60 74 48 70 Q40 66 40 56 Z" fill="#4a8a48"/>
      {/* Pins — KL + ATL */}
      <circle cx="78" cy="60" r="4" fill="#e07ec3" stroke="#fff" strokeWidth="1"/>
      <text x="82" y="62" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#fff">KL</text>
      <circle cx="42" cy="48" r="4" fill="#6fd5e0" stroke="#fff" strokeWidth="1"/>
      <text x="22" y="50" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#fff">ATL</text>
      {/* Connecting arc */}
      <path d="M42 48 Q58 22 78 60" stroke="#f5d97a" strokeWidth="1.4" fill="none" strokeDasharray="2 3"/>
    </svg>
  );
}

// ─── 3. PONG FRAT HOUSE — Baseball Logging — Notebook on pong table ─────

function PongPanel({ width = 720, height = 760 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: `
        repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.04) 38px 39px),
        linear-gradient(180deg, #6a4a2c 0%, #4a2e1c 100%)
      `,
    }}>
      {/* Pong table — top-down rectangle with cups */}
      <div style={{ position: 'absolute', inset: '40px 40px 40px 40px', background: 'linear-gradient(180deg, #c8985e, #8a6532)', boxShadow: 'inset 0 0 40px rgba(0,0,0,.4)' }}>
        {/* center line */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, borderTop: '2px dashed rgba(255,255,255,.4)' }}></div>
        {/* Cups arranged top + bottom triangles */}
        <CupTriangle side="top" />
        <CupTriangle side="bottom" />

        {/* The notebook taped onto the table */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-2deg)',
          width: 480, minHeight: 560, background: '#fbf6e6',
          boxShadow: '0 16px 36px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)',
          padding: '36px 38px 32px',
          backgroundImage: `
            linear-gradient(to bottom, transparent 0 31px, rgba(80,40,40,.18) 31px 32px),
            radial-gradient(ellipse at 50% 0%, rgba(120,80,30,.06), transparent 60%)
          `,
          backgroundSize: '100% 32px, 100% 100%',
        }}>
          {/* Red margin line */}
          <div style={{ position: 'absolute', left: 44, top: 0, bottom: 0, width: 1, background: '#c44a3a', opacity: .55 }}></div>
          {/* Spiral binding holes */}
          <div style={{ position: 'absolute', left: 18, top: 24, bottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 12 }}>
            {Array.from({ length: 16 }).map((_, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff, #c8b585 70%, #6a5a30)' }}/>)}
          </div>

          {/* Tape pieces */}
          <div style={{ position: 'absolute', top: -16, left: 36, width: 96, height: 28, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(-7deg)' }}/>
          <div style={{ position: 'absolute', top: -16, right: 28, width: 96, height: 28, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(5deg)' }}/>

          {/* Header */}
          <div style={{ paddingLeft: 36, font: '11px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>
            Pong · baseball logging app
          </div>
          <h1 style={{ paddingLeft: 36, font: '600 30px/1.1 "Caveat", var(--rw-serif)', margin: '4px 0 0', color: '#2a1a0e', fontFamily: '"Caveat", cursive', fontSize: 40 }}>
            From the front porch:<br/>a cleaner scorebook.
          </h1>
          <div style={{ paddingLeft: 36, font: '13px var(--rw-mono)', color: '#7a5a30', margin: '6px 0 14px' }}>
            Nov 2025 — Jan 2026 · React Native · Expo · Supabase · PostgreSQL
          </div>

          {/* Body bullets — handwritten */}
          <div style={{ paddingLeft: 36, font: '22px/1.48 "Caveat", cursive', color: '#1a1410' }}>
            <p style={{ margin: '0 0 10px' }}><span style={{ color: '#c44a3a' }}>★</span> Cross-platform mobile app. <em>70+ users</em>, multiple locations.</p>
            <p style={{ margin: '0 0 10px' }}><span style={{ color: '#c44a3a' }}>★</span> Scalable Supabase backend — secure auth, real-time data, cloud storage.</p>
            <p style={{ margin: '0 0 10px' }}><span style={{ color: '#c44a3a' }}>★</span> Replaced a paper logging system — saved <strong style={{ background: '#f5d97a' }}>2+ hours</strong> of post-game entry per night.</p>
          </div>

          {/* Margin sketch — beer pong cup with a baseball */}
          <div style={{ position: 'absolute', right: 16, top: 200, opacity: .85 }}>
            <CupBaseballSketch />
          </div>

          {/* Stats row at bottom */}
          <div style={{ paddingLeft: 36, marginTop: 18, paddingTop: 12, borderTop: '2px dashed rgba(60,40,20,.35)' }}>
            <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 8 }}>The score sheet</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              <Stat top="70+" bot="active users" />
              <Stat top="2 hr" bot="saved per game" />
              <Stat top="∞" bot="solo cups retired" />
            </div>
          </div>

          {/* Score scribble */}
          <div style={{ position: 'absolute', right: 24, bottom: 16, font: '20px "Caveat", cursive', color: '#c44a3a', transform: 'rotate(-4deg)' }}>
            we won.
          </div>
        </div>

      </div>
    </div>
  );
}

function CupTriangle({ side }) {
  // 10-cup triangle in classic pong arrangement
  const rows = [4,3,2,1];
  const cupSize = 26;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, ...(side === 'top' ? { top: 16 } : { bottom: 16 }), display: 'flex', flexDirection: side === 'top' ? 'column' : 'column-reverse', alignItems: 'center', gap: 4, pointerEvents: 'none' }}>
      {rows.map((n, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: n }).map((_, ci) => (
            <Cup key={ci} size={cupSize} score={side === 'top' ? `${(ri * 4 + ci + 3) % 9}-${(ri+ci) % 9}` : `${(ci + 2) % 9}-${(ri+1) % 9}`}/>
          ))}
        </div>
      ))}
    </div>
  );
}

function Cup({ size = 26, score }) {
  return (
    <div style={{ position: 'relative', width: size, height: size * 1.05 }}>
      {/* Cup body */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #d8362a, #a01a14)',
        clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
        boxShadow: 'inset -2px -2px 4px rgba(0,0,0,.35), inset 2px 2px 3px rgba(255,255,255,.25)',
      }}/>
      {/* Rim */}
      <div style={{ position: 'absolute', left: '12%', right: '12%', top: -1, height: 2, background: '#fff', opacity: .5 }}/>
      {/* Tiny LCD score */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: '6.5px "JetBrains Mono", monospace', color: '#94e2c0', textShadow: '0 0 4px #6fd5e0' }}>
        {score}
      </div>
    </div>
  );
}

function CupBaseballSketch() {
  return (
    <svg viewBox="0 0 90 110" width="90" height="110">
      {/* Cup */}
      <path d="M14 28 L76 28 L66 96 L24 96 Z" fill="none" stroke="#1a1410" strokeWidth="1.5"/>
      <path d="M14 28 Q28 22 45 22 Q62 22 76 28 Q62 32 45 32 Q28 32 14 28 Z" fill="none" stroke="#1a1410" strokeWidth="1.5"/>
      {/* Baseball inside */}
      <circle cx="44" cy="56" r="14" fill="none" stroke="#1a1410" strokeWidth="1.5"/>
      <path d="M32 50 Q44 60 56 50" stroke="#c44a3a" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
      <path d="M32 62 Q44 52 56 62" stroke="#c44a3a" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
      {/* annotation */}
      <text x="2" y="110" fontFamily="Caveat,cursive" fontSize="14" fill="#7a5a30">cup as scorebook</text>
    </svg>
  );
}

function Stat({ top, bot }) {
  return (
    <div style={{ borderLeft: '3px solid #c44a3a', paddingLeft: 10 }}>
      <div style={{ font: '700 26px "Caveat", cursive', color: '#2a1a0e', lineHeight: 1 }}>{top}</div>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7a5a30', marginTop: 2 }}>{bot}</div>
    </div>
  );
}

Object.assign(window, { CollegiateTowerPanel, TwinTowersPanel, PongPanel });
