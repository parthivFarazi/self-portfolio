// system.jsx — Brand teaser, palette, type, materials cards.

// ─── TEASER LANDING ─────────────────────────────────────────────────────

function TeaserCard({ tod = 'golden' }) {
  const sky = SKY_PRESETS[tod] || SKY_PRESETS.golden;
  return (
    <div style={{
      width: 1280, height: 720, position: 'relative', overflow: 'hidden',
      background: sky.gradient,
      fontFamily: 'var(--rw-sans)', color: sky.ink,
    }}>
      {/* Distant floating islands */}
      <FloatingIsland style={{ position: 'absolute', top: 90, left: 110, opacity: .55, transform: 'scale(.7)' }} tod={tod} />
      <FloatingIsland style={{ position: 'absolute', top: 180, right: 140, opacity: .4, transform: 'scale(.5)' }} tod={tod} variant={2} />
      <FloatingIsland style={{ position: 'absolute', top: 60, right: 380, opacity: .25, transform: 'scale(.35)' }} tod={tod} variant={3} />

      {/* Soft sun / orb */}
      <div style={{
        position: 'absolute', right: 220, top: 120, width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${sky.sun} 0%, ${sky.sun}66 40%, transparent 70%)`,
        filter: 'blur(2px)',
      }} />

      {/* Top utility row */}
      <div style={{ position: 'absolute', top: 32, left: 56, right: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: '11.5px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: sky.inkSoft }}>
        <span>PF · Portfolio v2026</span>
        <span style={{ display: 'inline-flex', gap: 20 }}>
          <span style={{ opacity: .7 }}>↳ scroll</span>
          <span style={{ opacity: .7 }}>↳ click any building</span>
          <span style={{ opacity: .7 }}>↳ open inside</span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7cd17a' }}></span>
          Now building
        </span>
      </div>

      {/* Hero text */}
      <div style={{ position: 'absolute', left: 80, bottom: 110, maxWidth: 760 }}>
        <div style={{ font: '12px var(--rw-mono)', letterSpacing: '.22em', textTransform: 'uppercase', color: sky.inkSoft, marginBottom: 28 }}>
          A portfolio · in the shape of an island
        </div>
        <h1 style={{ font: `italic 132px/0.92 var(--rw-serif)`, margin: 0, color: sky.ink, letterSpacing: '-0.01em' }}>
          Resume <span style={{ fontStyle: 'normal' }}>World</span>
        </h1>
        <div style={{ display: 'flex', gap: 32, marginTop: 36, alignItems: 'flex-start' }}>
          <p style={{ font: '17px/1.5 var(--rw-sans)', color: sky.ink, margin: 0, maxWidth: 460 }}>
            Walk an avatar around a small dreamlike island. Every job, project, and chapter has its own building. Step inside to read the story.
          </p>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: sky.inkSoft, marginBottom: 8 }}>By</div>
            <div style={{ font: '20px var(--rw-sans)', fontWeight: 600 }}>Parthiv Farazi</div>
            <div style={{ font: '13px var(--rw-mono)', color: sky.inkSoft, marginTop: 2 }}>CS · Georgia Tech · Dec 2026 · CTO @ UPDT.</div>
          </div>
        </div>
      </div>

      {/* Bottom-right CTA stack */}
      <div style={{ position: 'absolute', right: 72, bottom: 96, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        <div style={{
          background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,.9)', borderRadius: 999, padding: '14px 22px',
          font: '13px var(--rw-sans)', color: 'var(--rw-ink)', fontWeight: 500,
          boxShadow: '0 8px 32px rgba(40,30,20,.18)',
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <span>Enter the world</span>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--rw-ink)', color: 'var(--rw-cream)', display: 'inline-grid', placeItems: 'center', font: '11px var(--rw-mono)' }}>↗</span>
        </div>
        <div style={{ font: '11px var(--rw-mono)', color: sky.inkSoft, letterSpacing: '.14em', textTransform: 'uppercase', textAlign: 'right' }}>
          13 buildings · 1 plaza · 1 lighthouse
        </div>
      </div>

      {/* Ground / horizon */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, background: `linear-gradient(to top, ${sky.ground} 0%, transparent 100%)` }} />
      {/* Tiny island silhouette on horizon */}
      <svg viewBox="0 0 1280 200" width="1280" height="200" style={{ position: 'absolute', left: 0, bottom: 0, opacity: .55 }}>
        <path d={`M0 160 L120 140 L260 152 L360 120 L500 130 L640 105 L800 122 L940 100 L1080 118 L1200 105 L1280 130 L1280 200 L0 200 Z`} fill={sky.ground} />
        <path d={`M0 180 L1280 180 L1280 200 L0 200 Z`} fill={sky.groundDeep} />
      </svg>
    </div>
  );
}

const SKY_PRESETS = {
  golden: {
    gradient: 'linear-gradient(180deg, #ffd4a3 0%, #f5b69a 30%, #e3c5e1 65%, #b3dfd7 100%)',
    sun: '#fff1c8', ink: '#2a2520', inkSoft: 'rgba(42,37,32,.6)',
    ground: '#7eb86a', groundDeep: '#4a8a48',
  },
  dusk: {
    gradient: 'linear-gradient(180deg, #d97a72 0%, #ad5b7e 35%, #6e4f8a 70%, #3a3b6a 100%)',
    sun: '#ffb78a', ink: '#f6f1e4', inkSoft: 'rgba(246,241,228,.7)',
    ground: '#3e5a44', groundDeep: '#1f3329',
  },
  night: {
    gradient: 'linear-gradient(180deg, #15183a 0%, #1f1f4a 35%, #2e2856 70%, #1a1f3a 100%)',
    sun: '#cfe0ff', ink: '#f6f1e4', inkSoft: 'rgba(246,241,228,.6)',
    ground: '#1e2a2a', groundDeep: '#0d1414',
  },
};

function FloatingIsland({ style, tod = 'golden', variant = 1 }) {
  const v = variant;
  return (
    <svg viewBox="0 0 240 130" width="240" height="130" style={style}>
      <defs>
        <linearGradient id={`fi-grass-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fc77c" />
          <stop offset="100%" stopColor="#5a9558" />
        </linearGradient>
        <linearGradient id={`fi-rock-${v}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a08868" />
          <stop offset="100%" stopColor="#5a4a30" />
        </linearGradient>
      </defs>
      <path d="M20 60 Q40 38 80 36 Q140 30 180 38 Q220 44 220 62 Q220 70 200 72 Q140 78 80 74 Q30 72 20 62 Z" fill={`url(#fi-grass-${v})`} />
      <path d="M30 62 Q60 110 110 120 Q140 124 160 116 Q190 100 210 70 Q200 78 180 80 Q140 86 90 82 Q50 78 30 62 Z" fill={`url(#fi-rock-${v})`} />
      {/* Tree silhouettes */}
      <ellipse cx={70} cy={36} rx="10" ry="14" fill="#3e6a3c" />
      <ellipse cx={130} cy={32} rx="14" ry="18" fill="#3e6a3c" />
      <ellipse cx={170} cy={36} rx="9" ry="12" fill="#3e6a3c" />
    </svg>
  );
}

// ─── PALETTE CARD ────────────────────────────────────────────────────────

const PALETTE = [
  { group: 'Ground', items: [
    { name: 'Grass',         hex: '#6db862', use: 'Primary turf' },
    { name: 'Grass Shadow',  hex: '#4a8a48', use: 'Tree silhouettes, shaded turf' },
    { name: 'Grass Pale',    hex: '#a8d49f', use: 'Sun-bleached patches' },
    { name: 'Path Stone',    hex: '#e8d5a8', use: 'Cobblestone paths' },
    { name: 'Path Shadow',   hex: '#c8b585', use: 'Path edge, joint shadow' },
  ]},
  { group: 'Architecture', items: [
    { name: 'Brick',         hex: '#a8553c', use: 'Collegiate brick · workshop' },
    { name: 'Terracotta',    hex: '#c97e58', use: 'Roof tile · plaza accents' },
    { name: 'Moss',          hex: '#6e8b5a', use: 'Greenhouse trim · roofs' },
    { name: 'Ink',           hex: '#2a2520', use: 'Beams · doorways · lettering' },
    { name: 'Cream',         hex: '#f6f1e4', use: 'Window frames · UI paper' },
  ]},
  { group: 'Futurist accents', items: [
    { name: 'Cyan',          hex: '#6fd5e0', use: 'Holos · scan beams · drones' },
    { name: 'Magenta',       hex: '#e07ec3', use: 'Highlights · data callouts' },
    { name: 'Mint',          hex: '#94e2c0', use: 'Glass · greenhouse glow' },
    { name: 'Amber Window',  hex: '#f5d97a', use: 'Interior light · welcome glow' },
    { name: 'Collegiate Gold', hex: '#b3a369', use: 'Wristband · tower lettering · seals', star: true },
  ]},
  { group: 'Sky · Golden hour', items: [
    { name: 'Peach',         hex: '#ffd4a3', use: 'Top of sky · clouds' },
    { name: 'Lavender',      hex: '#e3c5e1', use: 'Sky mid-band' },
    { name: 'Teal',          hex: '#b3dfd7', use: 'Sky horizon' },
    { name: 'Water',         hex: '#6db9c4', use: 'Koi pond · sea below' },
  ]},
];

function PaletteCard() {
  return (
    <div style={{ width: 980, height: 660, background: 'var(--rw-cream)', padding: '36px 40px', fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Palette · 02</div>
        <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }}></div>
        <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>oklch-friendly · soft saturations</div>
      </div>
      <h2 style={{ font: 'italic 44px/.95 var(--rw-serif)', margin: '8px 0 4px' }}>The island, in colors</h2>
      <p style={{ font: '13.5px/1.5 var(--rw-sans)', color: 'var(--rw-ink-soft)', margin: '0 0 22px', maxWidth: 620 }}>
        Painterly greens for the ground, warm cream for paths and paper, brick + terracotta for the real-world architecture, three glowing accents for everything futuristic, and a collegiate gold that recurs as the through-line.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '22px 36px' }}>
        {PALETTE.map((grp) => (
          <div key={grp.group}>
            <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)', marginBottom: 10, paddingBottom: 6, borderBottom: '1px dashed #c8bb95' }}>{grp.group}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {grp.items.map((c) => (
                <div key={c.hex} style={{ display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, background: c.hex, borderRadius: 4, border: '1px solid rgba(0,0,0,.12)', boxShadow: c.star ? `0 0 0 2px #fff, 0 0 0 3px ${c.hex}` : 'none', position: 'relative' }}>
                    {c.star ? <span style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%', background: 'var(--rw-ink)', color: 'var(--rw-amber)', font: '9px var(--rw-mono)', display: 'grid', placeItems: 'center' }}>★</span> : null}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ font: '13px var(--rw-sans)', fontWeight: 500 }}>{c.name}</span>
                    <span style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>{c.use}</span>
                  </div>
                  <span style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TYPE CARD ───────────────────────────────────────────────────────────

function TypeCard() {
  return (
    <div style={{ width: 980, height: 660, background: 'var(--rw-cream)', padding: '36px 40px', fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Typography · 03</div>
        <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }}></div>
        <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>4 families · 1 voice</div>
      </div>
      <h2 style={{ font: 'italic 44px/.95 var(--rw-serif)', margin: '8px 0 22px' }}>How the world speaks</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 24 }}>
        <div style={{ border: '1px dashed #c8bb95', padding: 18, borderRadius: 4 }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Display · Instrument Serif</div>
          <div style={{ font: 'italic 88px/.9 var(--rw-serif)', margin: '8px 0 0' }}>Parthiv's World</div>
          <div style={{ font: '13px var(--rw-sans)', color: 'var(--rw-ink-soft)', marginTop: 8 }}>Hero titles · building names · the dreamy register.</div>
        </div>
        <div style={{ border: '1px dashed #c8bb95', padding: 18, borderRadius: 4 }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Body · Geist</div>
          <div style={{ font: '600 22px/1.2 var(--rw-sans)', margin: '8px 0 4px' }}>A portfolio, in the shape of an island.</div>
          <div style={{ font: '14px/1.55 var(--rw-sans)', color: 'var(--rw-ink-soft)' }}>Used for everything readable: panel copy, captions, longer passages. Soft 400, confident 500–600 for headings.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div style={{ border: '1px dashed #c8bb95', padding: 18, borderRadius: 4 }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Mono · JetBrains Mono</div>
          <div style={{ font: '15px var(--rw-mono)', marginTop: 8, lineHeight: 1.5 }}>
            <span style={{ color: 'var(--rw-ink-soft)' }}>// labels · stats · code</span><br/>
            UPDT_STADIUM · 01 · /north<br/>
            scout_pro.players({'{ club: "*", age:'} &lt;25 {'}'})
          </div>
        </div>
        <div style={{ border: '1px dashed #c8bb95', padding: 18, borderRadius: 4 }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Handwritten · Caveat</div>
          <div style={{ font: '32px var(--rw-hand)', marginTop: 6, color: 'var(--rw-ink)' }}>journal pages, sticky notes,<br/>and the polaroid captions</div>
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {['10/12', '12/16', '14/20', '17/24', '22/28', '32/36', '56/56', '88/82', '132/124'].map((s) => (
          <span key={s} style={{ font: '11px var(--rw-mono)', padding: '5px 10px', borderRadius: 999, background: 'rgba(212,193,120,.18)', border: '1px solid #d4c178', color: 'var(--rw-ink-soft)' }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ─── MATERIALS / MOOD CARD ───────────────────────────────────────────────

function MaterialsCard() {
  const materials = [
    { name: 'Cobblestone', desc: 'Warm cream pavers, mortar a half-shade darker. Subtle wear.', bg: 'repeating-conic-gradient(from 0deg at 30% 30%, #e8d5a8 0deg 90deg, #d8c498 90deg 180deg)' },
    { name: 'Brick',       desc: 'Hand-laid, slightly mossy at the joints. For the collegiate tower.', bg: 'repeating-linear-gradient(0deg, #a8553c 0 12px, #8a4332 12px 14px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(0,0,0,.2) 22px 24px)' },
    { name: 'Glass (futurist)', desc: 'Slightly mint-tinted, soft mint glow from inside. UPDT, Qard, Forge.', bg: 'linear-gradient(135deg, rgba(148,226,192,.6), rgba(111,213,224,.55) 50%, rgba(255,255,255,.4)), linear-gradient(#bfeadf, #6fa5b0)' },
    { name: 'Aged paper',  desc: 'UI panels for older buildings. Tea-stained at the edges.', bg: 'radial-gradient(ellipse at center, #f9f3df, #e6d8b6 90%)' },
    { name: 'Lacquered wood', desc: 'Frat porch · workshop bench · welcome bench.', bg: 'repeating-linear-gradient(15deg, #6e4a2a 0 18px, #5a3a22 18px 19px, #7a5234 19px 30px)' },
    { name: 'Koi water',   desc: 'Glassy with slow reflection ripples.', bg: 'linear-gradient(180deg, #8acdd5, #4a8896), radial-gradient(ellipse at 30% 40%, #fff6 0%, transparent 60%)' },
  ];
  return (
    <div style={{ width: 980, height: 540, background: 'var(--rw-cream)', padding: '36px 40px', fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Materials · 04</div>
        <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }}></div>
        <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>realism + soft futurism</div>
      </div>
      <h2 style={{ font: 'italic 38px/.95 var(--rw-serif)', margin: '8px 0 18px' }}>What everything is made of</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px 22px' }}>
        {materials.map((m) => (
          <div key={m.name} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 110, borderRadius: 4, background: m.bg, border: '1px solid rgba(0,0,0,.12)', boxShadow: 'inset 0 -8px 12px rgba(0,0,0,.1)' }}></div>
            <div style={{ font: '13.5px var(--rw-sans)', fontWeight: 600 }}>{m.name}</div>
            <div style={{ font: '11.5px/1.4 var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAP LEGEND (overview of 13 buildings) ──────────────────────────────

const BUILDINGS = [
  { id: 'updt',      name: 'UPDT Stadium',          ring: 'inner', cat: 'company', kw: 'CTO · soccer analytics' },
  { id: 'rmaict',    name: 'RMAICT Tower',          ring: 'inner', cat: 'work',    kw: 'AI internship · KL' },
  { id: 'pong',      name: 'Pong Frat House',       ring: 'inner', cat: 'project', kw: 'Baseball logging app' },
  { id: 'edu',       name: 'Collegiate Tower',      ring: 'mid',   cat: 'edu',     kw: 'Education · CS' },
  { id: 'about',     name: 'Petronas Towers',           ring: 'mid',   cat: 'about',   kw: 'About me · KL + ATL' },
  { id: 'forge',     name: 'The Forge',             ring: 'mid',   cat: 'skills',  kw: 'Languages + GPUs' },
  { id: 'lighthouse',name: 'The Lighthouse',        ring: 'mid',   cat: 'contact', kw: 'Contact · find me' },
  { id: 'qard',      name: 'Qard Greenhouse',       ring: 'outer', cat: 'project', kw: 'Fintech frontend · Three.js' },
  { id: 'football',  name: 'Athletic Stadium',      ring: 'outer', cat: 'project', kw: 'CFB valuation' },
  { id: 'archive',   name: 'Whispering Archive',    ring: 'outer', cat: 'project', kw: 'FAISS · Gemma-3' },
  { id: 'zen',       name: 'Zen Garden',            ring: 'outer', cat: 'project', kw: 'Soothe · mental health' },
  { id: 'heatmap',   name: 'Heatmap Garden',        ring: 'outer', cat: 'project', kw: 'xGenius · ORIS' },
  { id: 'workshop',  name: "Robot's Workshop",      ring: 'outer', cat: 'origin',  kw: 'Litter robot · the start' },
];

Object.assign(window, { TeaserCard, FloatingIsland, SKY_PRESETS, PaletteCard, TypeCard, MaterialsCard, BUILDINGS });
