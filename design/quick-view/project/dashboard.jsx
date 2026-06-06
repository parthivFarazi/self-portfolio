// dashboard.jsx — Landing page + Quick View dashboard.
// Warm parchment/golden-hour aesthetic. Tiles open the existing UI panels.

// ─── PANEL LOOKUP ───────────────────────────────────────────────────────
// Maps building id -> rendered panel component. Uses panels we've already
// built; falls back to a small placeholder card for the not-yet-designed ones.
const DASHBOARD_PANELS = {
  updt:       () => <window.UPDTPanel       width={820} height={780}/>,
  qard:       () => <window.QardPanel       width={760} height={780}/>,
  pong:       () => <window.PongPanelV2     width={760} height={780}/>,
  zen:        () => <window.SoothePanel     width={760} height={780}/>,
  workshop:   () => <window.WorkshopPanel   width={760} height={780}/>,
  edu:        () => <window.CollegiateTowerPanel width={680} height={760}/>,
  about:      () => <window.PetronasTowersPanel width={720} height={760}/>,
};

function PanelPlaceholder({ b }) {
  return (
    <div style={{ width: 540, padding: 36, background: '#f5e9c9', borderRadius: 6, boxShadow: '0 24px 60px rgba(0,0,0,.45)', fontFamily: 'var(--rw-sans)', color: '#2a1a0e', border: '1px solid #d4c178' }}>
      <div style={{ font: '11px var(--rw-term)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>{b.tag}</div>
      <h2 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 6px' }}>{b.title}</h2>
      <div style={{ font: '13px var(--rw-mono)', color: '#7a5a30', marginBottom: 18 }}>{b.sub}</div>
      <p style={{ font: '14.5px/1.5 var(--rw-sans)', color: '#3a2a1e', margin: '0 0 18px' }}>{b.body}</p>
      <div style={{ padding: '12px 14px', border: '1px dashed #c8bb95', borderRadius: 4, font: '12px var(--rw-mono)', color: '#7a5a30' }}>
        Panel coming soon — themed to its building.
      </div>
    </div>
  );
}

// ─── BUILDING DATA (canonical source for tiles) ─────────────────────────
const DASH_BUILDINGS = [
  // The Work — featured large
  { id: 'updt', group: 'work', title: 'UPDT. Stadium',
    role: 'Co-founder & CTO',
    sub: 'AI soccer analytics platform',
    tag: 'COMPANY · 2026 — PRESENT',
    chip: 'updt.pro', body: 'Building an AI-driven soccer analytics platform — ScoutPro for scouts and coaches, CV tracking, automated match reports.',
    thumb: 'updt' },
  { id: 'qard', group: 'work', title: 'Qard Greenhouse',
    role: 'Founding Frontend Developer',
    sub: 'Interactive 3D credit-card system',
    tag: 'FINTECH · JUN — AUG 2025',
    chip: '200+ users', body: 'Three.js + Framer Motion card system. Production landing reached 200+ users in under a month with +40% session and -35% load.',
    thumb: 'qard' },
  { id: 'rmaict', group: 'work', title: 'RMAICT Tower',
    role: 'AI Engineer Intern · Kuala Lumpur',
    sub: 'Receipt-to-JSON via Donut model',
    tag: 'AI · MAY — AUG 2024',
    chip: '1,000+ receipts', body: 'Donut model converting 1,000+ receipt images into structured JSON. Transfer-learning extension for invoices saved another 2 hours.',
    thumb: 'rmaict' },

  // Projects — medium
  { id: 'pong', group: 'projects', title: 'Pong (Baseball)',
    role: 'Cross-platform mobile app',
    sub: 'React Native · Expo · Supabase',
    tag: 'PROJECT · NOV 2025 — JAN 2026',
    chip: '70+ users', body: '',
    thumb: 'pong' },
  { id: 'football', group: 'projects', title: 'Athletic Stadium',
    role: 'CFB Valuation models',
    sub: 'Featured in The Athletic',
    tag: 'PROJECT · JAN 2025 — PRESENT',
    chip: '60+ schools', body: '',
    thumb: 'football' },
  { id: 'archive', group: 'projects', title: 'Whispering Archive',
    role: 'Embedding-based quote retrieval',
    sub: 'FAISS · Gemma-3 · PACE H100',
    tag: 'PROJECT · NOV 2025',
    chip: '490k+ quotes', body: '',
    thumb: 'archive' },
  { id: 'zen', group: 'projects', title: 'Zen Garden · Soothe',
    role: 'AI mental-health journaling',
    sub: 'React Native · FastAPI · GPT-4',
    tag: 'PROJECT · MAY — JUL 2025',
    chip: '90%+ tests', body: '',
    thumb: 'zen' },
  { id: 'heatmap', group: 'projects', title: 'Heatmap Garden · xGenius',
    role: 'Off-ball run impact (ORIS)',
    sub: 'US Soccer Federation data',
    tag: 'PROJECT · APRIL 2025',
    chip: '4 datasets', body: '',
    thumb: 'heatmap' },
  { id: 'workshop', group: 'projects', title: "Robot's Workshop",
    role: 'Solar litter-picking robot',
    sub: 'Arduino · C++ · Fusion 360',
    tag: 'ORIGIN · 2021 · KL',
    chip: 'the start', body: '',
    thumb: 'workshop' },

  // About — small
  { id: 'about',      group: 'about', title: 'Petronas Towers',     role: 'About me', sub: 'KL ↔ Atlanta', tag: 'STORY', chip: '', body: '', thumb: 'about' },
  { id: 'edu',        group: 'about', title: 'Tech Tower',      role: 'Education', sub: 'B.S. CS · Georgia Tech · Dec 2026', tag: 'EDUCATION', chip: '', body: '', thumb: 'edu' },
  { id: 'forge',      group: 'about', title: 'The Forge',       role: 'Skills', sub: 'Languages · frameworks · AI/ML · DevOps', tag: 'SKILLS', chip: '', body: '', thumb: 'forge' },
  { id: 'lighthouse', group: 'about', title: 'The Lighthouse',  role: 'Contact', sub: 'Email · GitHub · LinkedIn', tag: 'CONTACT', chip: '', body: '', thumb: 'lighthouse' },
];
const DASH_BY_ID = Object.fromEntries(DASH_BUILDINGS.map(b => [b.id, b]));

// ─── TILE THUMBNAILS ────────────────────────────────────────────────────
// Tiny stylized building icons drawn in the same warm-palette language.

function ThumbDefs() {
  return (
    <defs>
      <linearGradient id="dt-cream" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f9efd1"/>
        <stop offset="100%" stopColor="#e6d5a8"/>
      </linearGradient>
      <linearGradient id="dt-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd9a8"/>
        <stop offset="100%" stopColor="#f3c6c0"/>
      </linearGradient>
      <linearGradient id="dt-brick" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bc6048"/>
        <stop offset="100%" stopColor="#7a3a28"/>
      </linearGradient>
      <linearGradient id="dt-silver" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8eef2"/>
        <stop offset="100%" stopColor="#6a7480"/>
      </linearGradient>
      <linearGradient id="dt-mint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dff4e8"/>
        <stop offset="100%" stopColor="#5fa896"/>
      </linearGradient>
      <linearGradient id="dt-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7eb86a"/>
        <stop offset="100%" stopColor="#4a8a48"/>
      </linearGradient>
      <linearGradient id="dt-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a5234"/>
        <stop offset="100%" stopColor="#3a2410"/>
      </linearGradient>
      <radialGradient id="dt-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff1c8"/>
        <stop offset="100%" stopColor="#f5d97a" stopOpacity="0"/>
      </radialGradient>
      <filter id="dt-soft" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1"/>
      </filter>
    </defs>
  );
}

function Thumb({ kind, w = 200, h = 140 }) {
  return (
    <svg viewBox="0 0 200 140" width={w} height={h} style={{ display: 'block' }}>
      <ThumbDefs/>
      {/* Soft sky */}
      <rect x="0" y="0" width="200" height="100" fill="url(#dt-sky)" opacity=".8"/>
      {/* Sun */}
      <circle cx="170" cy="32" r="16" fill="#fff1c8" opacity=".7"/>
      {/* Ground */}
      <rect x="0" y="100" width="200" height="40" fill="url(#dt-grass)"/>
      <path d="M0 100 Q100 96 200 100 L200 102 Q100 98 0 102 Z" fill="#a8d49f" opacity=".5"/>
      {/* Cobblestone strip */}
      <rect x="0" y="120" width="200" height="8" fill="#c8b585"/>
      <rect x="0" y="120" width="200" height="8" fill="url(#cobble)" opacity=".9"/>
      <g>{thumbBody(kind)}</g>
    </svg>
  );
}

function thumbBody(kind) {
  switch (kind) {
    case 'updt': return <>
      {/* Stadium oval */}
      <ellipse cx="100" cy="98" rx="64" ry="14" fill="#3a4652"/>
      <ellipse cx="100" cy="92" rx="60" ry="12" fill="url(#dt-mint)" opacity=".85"/>
      <ellipse cx="100" cy="92" rx="60" ry="12" fill="none" stroke="#2a2520" strokeWidth=".6"/>
      <ellipse cx="100" cy="88" rx="48" ry="8" fill="#5a9558"/>
      <line x1="100" y1="80" x2="100" y2="96" stroke="#fffaee" strokeWidth=".7"/>
      <ellipse cx="100" cy="88" rx="6" ry="2" fill="none" stroke="#fffaee" strokeWidth=".7"/>
      {/* Players */}
      <circle cx="86" cy="89" r="1.5" fill="#e07ec3"/>
      <circle cx="98" cy="87" r="1.5" fill="#6fd5e0"/>
      <circle cx="112" cy="89" r="1.5" fill="#6fd5e0"/>
      {/* Floodlights */}
      <line x1="44" y1="80" x2="44" y2="60" stroke="#1a1410" strokeWidth="1"/>
      <rect x="40" y="56" width="8" height="5" fill="#fff1c8"/>
      <line x1="156" y1="80" x2="156" y2="60" stroke="#1a1410" strokeWidth="1"/>
      <rect x="152" y="56" width="8" height="5" fill="#fff1c8"/>
      {/* UPDT sign */}
      <rect x="80" y="74" width="40" height="10" rx="2" fill="#0e1820"/>
      <text x="100" y="82" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="900" fill="#94e2c0" letterSpacing="2">UPDT.</text>
    </>;

    case 'qard': return <>
      {/* Geodesic dome */}
      <path d="M40 100 Q40 60 100 50 Q160 60 160 100 Z" fill="url(#dt-mint)" opacity=".85"/>
      <path d="M40 100 Q40 60 100 50 Q160 60 160 100 Z" fill="none" stroke="#3a6a5a" strokeWidth=".7"/>
      <line x1="40" y1="100" x2="100" y2="50" stroke="#fffaee" strokeWidth=".5"/>
      <line x1="160" y1="100" x2="100" y2="50" stroke="#fffaee" strokeWidth=".5"/>
      <line x1="60" y1="76" x2="140" y2="76" stroke="#fffaee" strokeWidth=".5"/>
      <line x1="70" y1="90" x2="130" y2="90" stroke="#fffaee" strokeWidth=".5"/>
      {/* Card flower */}
      <line x1="100" y1="100" x2="100" y2="78" stroke="#3e6a3c" strokeWidth="1"/>
      <rect x="90" y="68" width="20" height="12" rx="1.5" fill="#e07ec3" stroke="#0e1820" strokeWidth=".3"/>
      <rect x="91" y="70" width="18" height="2" fill="#0e1820" opacity=".4"/>
      {/* Smaller stem */}
      <line x1="78" y1="100" x2="78" y2="86" stroke="#3e6a3c" strokeWidth=".8"/>
      <rect x="72" y="78" width="12" height="8" rx="1" fill="#6fd5e0" stroke="#0e1820" strokeWidth=".3"/>
      <line x1="122" y1="100" x2="122" y2="86" stroke="#3e6a3c" strokeWidth=".8"/>
      <rect x="116" y="78" width="12" height="8" rx="1" fill="#f5d97a" stroke="#0e1820" strokeWidth=".3"/>
    </>;

    case 'rmaict': return <>
      {/* Tower body */}
      <rect x="84" y="40" width="32" height="60" fill="url(#dt-silver)"/>
      <rect x="84" y="40" width="32" height="60" fill="none" stroke="#1a3a44" strokeWidth=".6"/>
      {/* Songket base */}
      <rect x="80" y="92" width="40" height="14" fill="#a8553c"/>
      <rect x="80" y="92" width="40" height="3" fill="#f5d97a"/>
      <rect x="80" y="100" width="40" height="2" fill="#f5d97a" opacity=".7"/>
      {[86, 94, 102, 110].map(x => <path key={x} d={`M${x} 97 L${x+3} 95 L${x+6} 97 L${x+3} 99 Z`} fill="#f5d97a" opacity=".8"/>)}
      {/* Windows */}
      {[44, 54, 64, 74, 84].map(y => <g key={y}>
        <rect x="86" y={y} width="12" height="3" fill="#f5d97a" opacity=".75"/>
        <rect x="102" y={y} width="12" height="3" fill="#f5d97a" opacity=".75"/>
      </g>)}
      {/* Scan beam */}
      <rect x="84" y="64" width="32" height="1.5" fill="#94e2c0"/>
      {/* Antenna */}
      <line x1="100" y1="40" x2="100" y2="28" stroke="#1a1410" strokeWidth="1"/>
      <circle cx="100" cy="28" r="2" fill="#e07ec3"/>
      <circle cx="100" cy="28" r="4" fill="#e07ec3" opacity=".4"/>
    </>;

    case 'pong': return <>
      {/* DU-ish house: brick base, white columns */}
      <rect x="44" y="86" width="112" height="20" fill="#7a3a28"/>
      <rect x="44" y="80" width="112" height="6" fill="url(#dt-cream)"/>
      <rect x="38" y="60" width="124" height="22" fill="url(#dt-brick)"/>
      <path d="M38 60 L100 38 L162 60 Z" fill="#5a6672"/>
      <path d="M70 50 L100 38 L130 50 L120 50 L100 42 L80 50 Z" fill="url(#dt-cream)"/>
      <text x="100" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="900" fill="#1f3a6e">ΔΥ</text>
      {/* Columns */}
      {[58, 78, 122, 142].map(x => <rect key={x} x={x} y="82" width="4" height="22" fill="url(#dt-cream)"/>)}
      <rect x="56" y="80" width="92" height="2" fill="#fffaee"/>
      {/* Door */}
      <rect x="92" y="86" width="16" height="20" fill="#1f3a4a"/>
      <rect x="93" y="87" width="14" height="18" fill="#f5d97a" opacity=".6"/>
      {/* Solo cups */}
      {[60, 70, 130, 140].map(x => <path key={x} d={`M${x} 80 L${x+4} 80 L${x+3.5} 82 L${x+0.5} 82 Z`} fill="#d8362a"/>)}
    </>;

    case 'football': return <>
      {/* Football stadium oval, smaller, more compact */}
      <ellipse cx="100" cy="98" rx="60" ry="13" fill="#7a3a28"/>
      <ellipse cx="100" cy="96" rx="58" ry="12" fill="url(#dt-brick)"/>
      <ellipse cx="100" cy="92" rx="44" ry="8" fill="#5a9558"/>
      {[80, 90, 100, 110, 120].map(x => <line key={x} x1={x} y1="86" x2={x} y2="98" stroke="#fffaee" strokeWidth=".5"/>)}
      {/* Goalposts */}
      <line x1="58" y1="92" x2="58" y2="84" stroke="#f5d97a" strokeWidth="1"/>
      <line x1="54" y1="86" x2="62" y2="86" stroke="#f5d97a" strokeWidth="1"/>
      <line x1="142" y1="92" x2="142" y2="84" stroke="#f5d97a" strokeWidth="1"/>
      <line x1="138" y1="86" x2="146" y2="86" stroke="#f5d97a" strokeWidth="1"/>
      {/* Floating magazine */}
      <g transform="translate(100, 64) rotate(-3)">
        <rect x="-16" y="-10" width="32" height="20" fill="#fffaee" stroke="#1a1410" strokeWidth=".4"/>
        <rect x="-16" y="-10" width="32" height="5" fill="#1a1410"/>
        <text x="0" y="-6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3.5" fontWeight="900" fill="#fffaee" letterSpacing="1">VALUATION</text>
        <rect x="-14" y="-3" width="14" height="11" fill="#5a9558"/>
        <rect x="2" y="-2" width="12" height="1" fill="#1a1410"/>
        <rect x="2" y="0" width="12" height="1" fill="#5a5048"/>
        <rect x="2" y="2" width="10" height="1" fill="#5a5048"/>
        <rect x="2" y="4" width="12" height="1" fill="#5a5048"/>
        <rect x="2" y="6" width="8" height="1" fill="#5a5048"/>
      </g>
      <text x="44" y="62" fontFamily="Georgia,serif" fontSize="14" fontWeight="900" fill="#b3a369" opacity=".7">$</text>
      <text x="148" y="58" fontFamily="Georgia,serif" fontSize="10" fontWeight="900" fill="#b3a369" opacity=".6">$</text>
    </>;

    case 'archive': return <>
      {/* Stone library with dome */}
      <rect x="58" y="64" width="84" height="42" fill="#a89878"/>
      <rect x="58" y="64" width="84" height="3" fill="#fffaee"/>
      {[74, 84, 94].map(y => <line key={y} x1="58" y1={y} x2="142" y2={y} stroke="#5a4a3e" strokeWidth=".4" opacity=".5"/>)}
      <path d="M70 64 Q100 36 130 64 Z" fill="#a89878"/>
      <path d="M70 64 Q100 36 130 64" stroke="#5a4a3e" strokeWidth=".5" fill="none"/>
      {/* Dome lantern */}
      <circle cx="100" cy="48" r="3" fill="#f5d97a"/>
      <circle cx="100" cy="48" r="6" fill="url(#dt-glow)"/>
      {/* Arched door */}
      <path d="M92 106 L92 88 Q92 80 100 80 Q108 80 108 88 L108 106 Z" fill="#3a2410"/>
      <path d="M93 105 L93 88 Q93 82 100 82 Q107 82 107 88 L107 105 Z" fill="#f5d97a" opacity=".7"/>
      {/* Arched window */}
      <path d="M66 96 L66 80 Q66 74 70 74 Q74 74 74 80 L74 96 Z" fill="#0e1820"/>
      <path d="M66 96 L66 80 Q66 74 70 74 Q74 74 74 80 L74 96 Z" fill="#94e2c0" opacity=".7"/>
      <path d="M126 96 L126 80 Q126 74 130 74 Q134 74 134 80 L134 96 Z" fill="#0e1820"/>
      <path d="M126 96 L126 80 Q126 74 130 74 Q134 74 134 80 L134 96 Z" fill="#94e2c0" opacity=".7"/>
      {/* Firefly tags */}
      <circle cx="38" cy="56" r="2" fill="#f5d97a"/>
      <circle cx="38" cy="56" r="5" fill="#f5d97a" opacity=".35"/>
      <circle cx="162" cy="50" r="2" fill="#e07ec3"/>
      <circle cx="162" cy="50" r="5" fill="#e07ec3" opacity=".35"/>
      <circle cx="48" cy="34" r="1.5" fill="#6fd5e0"/>
      <circle cx="48" cy="34" r="4" fill="#6fd5e0" opacity=".4"/>
    </>;

    case 'zen': return <>
      {/* Sand bed */}
      <ellipse cx="100" cy="100" rx="78" ry="14" fill="#e8d5a8"/>
      <ellipse cx="100" cy="100" rx="64" ry="11" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      <ellipse cx="100" cy="100" rx="42" ry="7" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      <ellipse cx="100" cy="100" rx="22" ry="3" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      {/* Cherry tree */}
      <g transform="translate(48, 64)">
        <rect x="-1.5" y="0" width="3" height="32" fill="#3a2410"/>
        <ellipse cx="0" cy="-10" rx="18" ry="16" fill="#e07ec3"/>
        <ellipse cx="-6" cy="-14" rx="9" ry="8" fill="#f0a5d3"/>
        <ellipse cx="7" cy="-12" rx="8" ry="8" fill="#f5b6da"/>
      </g>
      {/* Koi pond */}
      <ellipse cx="140" cy="92" rx="22" ry="8" fill="#6db9c4"/>
      <ellipse cx="140" cy="92" rx="22" ry="8" fill="none" stroke="#fffaee" strokeWidth=".4"/>
      <path d="M132 92 Q140 88 148 92 L150 94 Q140 96 130 94 Z" fill="#e07ec3"/>
      {/* Bench + journal */}
      <rect x="80" y="92" width="24" height="3" fill="#857a5a"/>
      <rect x="82" y="95" width="2" height="6" fill="#5a5048"/>
      <rect x="100" y="95" width="2" height="6" fill="#5a5048"/>
      <rect x="86" y="86" width="12" height="6" fill="#fffaee" stroke="#1a1410" strokeWidth=".3"/>
      <ellipse cx="92" cy="89" rx="14" ry="6" fill="#f5d97a" opacity=".45"/>
      {/* Cherry petals */}
      <circle cx="68" cy="80" r="1" fill="#f5b6da"/>
      <circle cx="80" cy="78" r="1" fill="#e07ec3"/>
      <circle cx="58" cy="88" r="1" fill="#f5b6da"/>
    </>;

    case 'heatmap': return <>
      {/* Garden bed */}
      <rect x="20" y="78" width="160" height="32" fill="#5a4a30"/>
      <rect x="20" y="78" width="160" height="3" fill="#5a9558"/>
      {/* Heatmap flowers gradient */}
      {(() => {
        const out = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 14; c++) {
            const x = 26 + c * 11;
            const y = 86 + r * 8;
            const d = Math.hypot(x - 100, y - 96);
            const hot = Math.max(0, 1 - d / 50);
            const hue = 220 - hot * 220;
            const sat = 60 + hot * 30;
            out.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={1 + hot * 1.6} fill={`hsl(${hue}, ${sat}%, 55%)`}/>);
          }
        }
        return out;
      })()}
      {/* Ball */}
      <ellipse cx="100" cy="98" rx="4" ry="1.5" fill="rgba(0,0,0,.35)"/>
      <circle cx="100" cy="94" r="4" fill="#fffaee" stroke="#1a1410" strokeWidth=".4"/>
      <path d="M97 92 L100 93 L103 92 L102 95 L98 95 Z" fill="#1a1410"/>
      {/* ORIS placard */}
      <g transform="translate(100, 50)">
        <rect x="-22" y="-10" width="44" height="20" fill="rgba(15,30,40,.85)" stroke="#6fd5e0" strokeWidth=".5"/>
        <text x="0" y="-3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fontWeight="600" fill="#6fd5e0">ORIS · 0.84</text>
        <text x="0" y="5" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fill="#94e2c0">off-ball impact</text>
      </g>
    </>;

    case 'workshop': return <>
      {/* Foundation */}
      <rect x="58" y="92" width="84" height="14" fill="#5a4a30"/>
      {/* Body */}
      <rect x="62" y="60" width="76" height="34" fill="url(#dt-wood)"/>
      {[68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 128, 134].map(x => <line key={x} x1={x} y1="60" x2={x} y2="94" stroke="#1a1410" strokeWidth=".3" opacity=".7"/>)}
      {/* Pitched roof */}
      <path d="M58 60 L78 42 L122 42 L142 60 Z" fill="#3a2410"/>
      {/* Door open */}
      <rect x="93" y="74" width="14" height="22" fill="#1a1410"/>
      <rect x="94" y="75" width="12" height="20" fill="#f5d97a" opacity=".8"/>
      {/* Window */}
      <rect x="68" y="68" width="12" height="10" fill="#1a1410"/>
      <rect x="69" y="69" width="10" height="8" fill="#f5d97a" opacity=".75"/>
      {/* Solar panel on roof */}
      <rect x="92" y="48" width="20" height="6" fill="#0e1820" transform="skewX(-15)"/>
      <rect x="94" y="50" width="16" height="3" fill="#3a5a78" transform="skewX(-15)"/>
      {/* Litter robot outside */}
      <g transform="translate(36, 100)">
        <rect x="-5" y="-4" width="10" height="6" fill="#c8bb95" stroke="#1a1410" strokeWidth=".4"/>
        <rect x="-4" y="-7" width="8" height="3" fill="#0e1820"/>
        <line x1="0" y1="-7" x2="0" y2="-10" stroke="#1a1410" strokeWidth=".4"/>
        <circle cx="0" cy="-11" r="1" fill="#e07ec3"/>
        <circle cx="-3" cy="3" r="1.6" fill="#1a1410"/>
        <circle cx="3" cy="3" r="1.6" fill="#1a1410"/>
      </g>
    </>;

    case 'about': return <>
      {/* Petronas-ish towers */}
      <path d="M62 100 L62 50 L66 32 L70 22 L74 32 L78 50 L78 100 Z" fill="url(#dt-silver)" stroke="#3a4652" strokeWidth=".4"/>
      <path d="M122 100 L122 50 L126 32 L130 22 L134 32 L138 50 L138 100 Z" fill="url(#dt-silver)" stroke="#3a4652" strokeWidth=".4"/>
      <line x1="70" y1="22" x2="70" y2="14" stroke="#3a4652" strokeWidth="1"/>
      <line x1="130" y1="22" x2="130" y2="14" stroke="#3a4652" strokeWidth="1"/>
      {/* Sky bridge */}
      <rect x="78" y="58" width="44" height="5" fill="#3a4652"/>
      <rect x="78" y="56" width="44" height="2" fill="#fff1c8" opacity=".9"/>
      <rect x="78" y="63" width="44" height="3" fill="#4a5662"/>
      {/* Windows */}
      {Array.from({ length: 8 }).map((_, i) => <g key={i}>
        <rect x="64" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8"/>
        <rect x="71" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8"/>
        <rect x="124" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8"/>
        <rect x="131" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8"/>
      </g>)}
    </>;

    case 'edu': return <>
      {/* Brick clock tower */}
      <rect x="76" y="34" width="48" height="68" fill="url(#dt-brick)"/>
      <rect x="74" y="34" width="52" height="3" fill="#fffaee"/>
      <rect x="74" y="74" width="52" height="2" fill="#fffaee"/>
      {/* Top tier with TECH letters */}
      <rect x="70" y="22" width="60" height="14" fill="url(#dt-brick)"/>
      <rect x="70" y="22" width="60" height="3" fill="#fffaee"/>
      <rect x="70" y="33" width="60" height="2" fill="#fffaee"/>
      <text x="100" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="900" fill="#d4b94a" letterSpacing="2">TECH</text>
      {/* Pyramidal roof */}
      <path d="M70 22 L100 6 L130 22 Z" fill="#3a4652"/>
      <line x1="100" y1="6" x2="100" y2="0" stroke="#1a1410" strokeWidth="1"/>
      <circle cx="100" cy="0" r="1.5" fill="#b3a369"/>
      {/* Clock */}
      <circle cx="100" cy="58" r="7" fill="#fffaee" stroke="#1a1410" strokeWidth=".5"/>
      <line x1="100" y1="58" x2="100" y2="54" stroke="#1a1410" strokeWidth=".8"/>
      <line x1="100" y1="58" x2="103" y2="59" stroke="#1a1410" strokeWidth=".8"/>
      {/* Arched windows */}
      {[44, 86].map(y => <g key={y}>
        <path d={`M82 ${y+12} L82 ${y+4} Q82 ${y} 86 ${y} Q90 ${y} 90 ${y+4} L90 ${y+12} Z`} fill="#f5d97a" opacity=".85" stroke="#1a1410" strokeWidth=".3"/>
        <path d={`M110 ${y+12} L110 ${y+4} Q110 ${y} 114 ${y} Q118 ${y} 118 ${y+4} L118 ${y+12} Z`} fill="#f5d97a" opacity=".85" stroke="#1a1410" strokeWidth=".3"/>
      </g>)}
      {/* Door */}
      <path d="M93 102 L93 88 Q93 82 100 82 Q107 82 107 88 L107 102 Z" fill="#3a2410"/>
    </>;

    case 'forge': return <>
      {/* Stone foundation */}
      <rect x="44" y="92" width="112" height="14" fill="#a89878"/>
      {/* Body half-timber */}
      <rect x="50" y="68" width="100" height="26" fill="#d8cfb8"/>
      <rect x="50" y="68" width="100" height="3" fill="#3a2410"/>
      <rect x="50" y="91" width="100" height="3" fill="#3a2410"/>
      <rect x="50" y="68" width="3" height="26" fill="#3a2410"/>
      <rect x="147" y="68" width="3" height="26" fill="#3a2410"/>
      <rect x="98" y="68" width="3" height="26" fill="#3a2410"/>
      <path d="M50 68 L100 81 L150 68" stroke="#3a2410" strokeWidth="2" fill="none"/>
      {/* Roof */}
      <path d="M44 68 L70 48 L130 48 L156 68 Z" fill="#5a3a18"/>
      {/* Open glow */}
      <rect x="74" y="74" width="50" height="20" fill="#f5d97a" opacity=".85"/>
      <rect x="74" y="74" width="50" height="20" fill="url(#dt-glow)"/>
      <rect x="92" y="86" width="16" height="3" fill="#1a1410" opacity=".7"/>
      {/* Floating language icons */}
      <circle cx="80" cy="56" r="5" fill="#6fd5e0" opacity=".7"/>
      <text x="80" y="58" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#0e1820">py</text>
      <circle cx="100" cy="48" r="5" fill="#e07ec3" opacity=".7"/>
      <text x="100" y="50" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#fffaee">JS</text>
      <circle cx="120" cy="56" r="5" fill="#94e2c0" opacity=".7"/>
      <text x="120" y="58" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fontWeight="700" fill="#0e1820">c++</text>
      {/* Chimney + sparks */}
      <rect x="130" y="38" width="10" height="14" fill="#a8553c"/>
      <circle cx="134" cy="32" r="2" fill="#fffaee" opacity=".6"/>
      <circle cx="138" cy="28" r="1" fill="#f5d97a"/>
      <circle cx="132" cy="26" r=".8" fill="#e07ec3"/>
    </>;

    case 'lighthouse': return <>
      {/* Rocky base */}
      <ellipse cx="100" cy="100" rx="40" ry="8" fill="#7a7064"/>
      {/* Tapered tower */}
      <path d="M86 100 L88 64 L92 38 L108 38 L112 64 L114 100 Z" fill="url(#dt-cream)" stroke="#5a4a3e" strokeWidth=".5"/>
      {/* Red stripes */}
      <path d="M88 78 L112 78 L113 82 L87 82 Z" fill="#a8553c"/>
      <path d="M89 56 L111 56 L112 60 L88 60 Z" fill="#a8553c"/>
      {/* Top platform */}
      <rect x="86" y="32" width="28" height="6" fill="#5a4a3e"/>
      <rect x="88" y="22" width="24" height="10" fill="#1a1410"/>
      <rect x="89" y="23" width="22" height="8" fill="#f5d97a"/>
      {/* Dome */}
      <path d="M86 22 Q100 12 114 22 Z" fill="#5a4a3e"/>
      <line x1="100" y1="12" x2="100" y2="4" stroke="#1a1410" strokeWidth="1"/>
      <circle cx="100" cy="4" r="1.5" fill="#a8553c"/>
      {/* Beam */}
      <path d="M100 26 L160 14 L160 32 Z" fill="#f5d97a" opacity=".5"/>
      <path d="M100 26 L40 14 L40 32 Z" fill="#f5d97a" opacity=".3"/>
    </>;

    default: return null;
  }
}

// ─── LANDING PAGE ───────────────────────────────────────────────────────

function LandingPage({ tod = 'golden', onPickQuick, onPickExplore }) {
  return (
    <div style={{
      width: 1440, height: 900, position: 'relative', overflow: 'hidden',
      background: tod === 'golden'
        ? 'linear-gradient(180deg, #ffe8c1 0%, #f7d1b6 30%, #e8c4d4 65%, #c8dfd6 100%)'
        : tod === 'dusk'
          ? 'linear-gradient(180deg, #d6906f 0%, #b06676 35%, #7a587f 70%, #423e62 100%)'
          : 'linear-gradient(180deg, #1c1f3a 0%, #2a2752 50%, #1f2640 100%)',
      fontFamily: 'var(--rw-sans)', color: '#2a1a0e',
    }}>
      {/* Soft grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.05) 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(0,0,0,.04) 1px, transparent 2px)', backgroundSize: '32px 32px, 28px 28px', pointerEvents: 'none' }}/>
      {/* Sun / clouds */}
      <div style={{ position: 'absolute', right: 200, top: 100, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, #fff1c8 0%, #ffc88a44 50%, transparent 70%)' }}/>
      <SoftCloud x={140} y={140} scale={1.1}/>
      <SoftCloud x={900} y={200} scale={.85}/>
      <SoftCloud x={1240} y={300} scale={.95}/>

      {/* Top utility row */}
      <div style={{ position: 'absolute', top: 30, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: '12px var(--rw-term)', letterSpacing: '.2em', textTransform: 'uppercase', color: tod === 'night' ? 'rgba(255,250,238,.7)' : 'rgba(42,26,14,.62)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Sigil/>
          <span>PF · Portfolio</span>
        </span>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span>↓ Resume PDF</span>
        </a>
      </div>

      {/* Hero text */}
      <div style={{ position: 'absolute', left: 100, top: 130, maxWidth: 760 }}>
        <div style={{ font: '13px var(--rw-term)', letterSpacing: '.32em', textTransform: 'uppercase', color: tod === 'night' ? 'rgba(255,250,238,.7)' : 'rgba(122,90,48,.85)', marginBottom: 22 }}>
          A portfolio · in two speeds
        </div>
        <h1 style={{ font: '500 92px/0.92 "Pixelify Sans", var(--rw-serif)', margin: 0, color: tod === 'night' ? '#fffaee' : '#2a1a0e', letterSpacing: '-0.01em' }}>
          Hi, I'm Parthiv.
        </h1>
        <p style={{ font: '18px/1.45 var(--rw-sans)', color: tod === 'night' ? 'rgba(255,250,238,.85)' : '#3a2a1e', margin: '24px 0 0', maxWidth: 580 }}>
          CS at Georgia Tech · Co-founder & CTO of <b style={{ color: tod === 'night' ? '#94e2c0' : '#5a3e20' }}>UPDT.</b> — an AI soccer analytics platform.
          Atlanta-based, originally Kuala Lumpur. I build things at the seam of sports, AI, and product.
        </p>
      </div>

      {/* Small avatar to the right of hero */}
      <div style={{ position: 'absolute', right: 130, top: 220, width: 220, height: 320, padding: 14, background: tod === 'night' ? 'rgba(255,250,238,.08)' : 'rgba(255,250,238,.75)', border: tod === 'night' ? '1px solid rgba(255,250,238,.25)' : '1px solid #d4c178', borderRadius: 4, boxShadow: '0 16px 36px rgba(40,20,8,.18)', transform: 'rotate(2deg)' }}>
        <div style={{ width: '100%', height: 240, background: tod === 'night' ? '#0e1422' : '#fcf2d8', borderRadius: 2, display: 'grid', placeItems: 'center' }}>
          {window.AvatarFront ? <window.AvatarFront size={240}/> : null}
        </div>
        <div style={{ font: '14px var(--rw-hand)', color: tod === 'night' ? '#fffaee' : '#2a1a0e', textAlign: 'center', marginTop: 8 }}>— PF, in person.</div>
      </div>

      {/* Choice cards */}
      <div style={{ position: 'absolute', left: 100, bottom: 80, right: 100, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <ChoiceCard
          kicker="THE FAST PATH · ~2 min"
          title={<>Quick<br/>View.</>}
          desc="One scannable page · stats, projects, contact — everything visible at once."
          preview={<DashboardMini/>}
          cta="Open Quick View"
          accent="#b3a369"
          onClick={onPickQuick}
          tod={tod}
        />
        <ChoiceCard
          kicker="THE SCENIC ROUTE · ~10 min"
          title={<>Exploration<br/>Mode.</>}
          desc="Walk an avatar around a Sims-style island. Step into 13 buildings to read each chapter."
          preview={<IslandMini/>}
          cta="Enter the world"
          accent="#6e8b5a"
          onClick={onPickExplore}
          tod={tod}
        />
      </div>

      {/* Bottom hint */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 24, font: '11px var(--rw-term)', letterSpacing: '.22em', textTransform: 'uppercase', color: tod === 'night' ? 'rgba(255,250,238,.5)' : 'rgba(42,26,14,.4)' }}>
          either way — same panels, same content, same person
      </div>
    </div>
  );
}

function Sigil() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 16 L8 8 L12 12 L16 8 L16 16" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SoftCloud({ x, y, scale = 1 }) {
  return (
    <svg viewBox="0 0 240 80" width={240 * scale} height={80 * scale} style={{ position: 'absolute', left: x, top: y, opacity: .55 }}>
      <ellipse cx="60" cy="50" rx="50" ry="22" fill="#fffaee"/>
      <ellipse cx="120" cy="40" rx="62" ry="28" fill="#fffaee"/>
      <ellipse cx="180" cy="48" rx="48" ry="22" fill="#fffaee"/>
      <ellipse cx="90" cy="30" rx="30" ry="14" fill="#fffaee" opacity=".85"/>
    </svg>
  );
}

function ChoiceCard({ kicker, title, desc, preview, cta, accent, onClick, tod }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      all: 'unset', cursor: 'pointer', display: 'block',
      background: tod === 'night' ? 'rgba(255,250,238,.06)' : '#f9efd1',
      border: hover ? `1.5px solid ${accent}` : (tod === 'night' ? '1px solid rgba(255,250,238,.18)' : '1px solid #d4c178'),
      borderRadius: 4,
      padding: '34px 36px',
      boxShadow: hover ? `0 24px 60px rgba(40,20,8,.32), 0 0 0 4px ${accent}22` : '0 12px 36px rgba(40,20,8,.18)',
      transition: 'all .2s ease', transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      color: tod === 'night' ? '#fffaee' : '#2a1a0e',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center' }}>
        <div>
          <div style={{ font: '11px var(--rw-term)', letterSpacing: '.22em', textTransform: 'uppercase', color: tod === 'night' ? 'rgba(255,250,238,.7)' : '#7a5a30', marginBottom: 10 }}>{kicker}</div>
          <h2 style={{ font: '500 56px/0.9 "Pixelify Sans", var(--rw-serif)', margin: '0 0 14px', letterSpacing: '-0.01em' }}>{title}</h2>
          <p style={{ font: '14.5px/1.5 var(--rw-sans)', color: tod === 'night' ? 'rgba(255,250,238,.78)' : '#3a2a1e', margin: 0, maxWidth: 320 }}>{desc}</p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 24, padding: '12px 18px', background: accent, color: '#1a1410', font: '13px var(--rw-term)', letterSpacing: '.16em', textTransform: 'uppercase', borderRadius: 2, boxShadow: hover ? '0 6px 14px rgba(40,20,8,.3)' : 'none' }}>
            <span>{cta}</span><span>→</span>
          </span>
        </div>
        <div style={{ aspectRatio: '4/3', background: tod === 'night' ? '#0e1422' : '#fcf2d8', border: '1px solid rgba(0,0,0,.1)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          {preview}
        </div>
      </div>
    </button>
  );
}

function DashboardMini() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect width="200" height="150" fill="#fcf2d8"/>
      {/* Identity strip */}
      <rect x="8" y="10" width="184" height="22" fill="#f9efd1" stroke="#d4c178" strokeWidth=".5"/>
      <circle cx="22" cy="21" r="6" fill="#d9a779"/>
      <rect x="34" y="16" width="60" height="3" fill="#2a1a0e"/>
      <rect x="34" y="22" width="80" height="2" fill="#7a5a30"/>
      {/* Stats row */}
      {[0,1,2,3,4,5].map(i => <g key={i}>
        <rect x={8 + i * 31} y="40" width="29" height="22" fill="#f9efd1" stroke="#d4c178" strokeWidth=".4"/>
        <rect x={11 + i * 31} y="44" width="14" height="6" fill="#b3a369"/>
        <rect x={11 + i * 31} y="52" width="20" height="2" fill="#7a5a30"/>
        <rect x={11 + i * 31} y="56" width="16" height="2" fill="#7a5a30" opacity=".6"/>
      </g>)}
      {/* Tiles */}
      {[0,1,2].map(c => <g key={`w${c}`}>
        <rect x={8 + c * 64} y="68" width="60" height="28" fill="#f9efd1" stroke="#d4c178" strokeWidth=".5"/>
        <rect x={10 + c * 64} y="70" width="28" height="22" fill="#e8d5a8"/>
      </g>)}
      {[0,1,2,3,4,5].map(c => <g key={`p${c}`}>
        <rect x={8 + (c % 3) * 64} y={102 + Math.floor(c/3) * 22} width="60" height="18" fill="#f9efd1" stroke="#d4c178" strokeWidth=".4"/>
        <rect x={10 + (c % 3) * 64} y={104 + Math.floor(c/3) * 22} width="18" height="14" fill="#e8d5a8"/>
      </g>)}
    </svg>
  );
}

function IslandMini() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="iml-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a8"/>
          <stop offset="100%" stopColor="#c8dfd6"/>
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#iml-sky)"/>
      <circle cx="160" cy="30" r="14" fill="#fff1c8" opacity=".75"/>
      {/* Ground */}
      <rect x="0" y="100" width="200" height="50" fill="#7eb86a"/>
      <rect x="0" y="100" width="200" height="3" fill="#a8d49f"/>
      <rect x="0" y="115" width="200" height="4" fill="#c8b585"/>
      {/* Buildings silhouettes */}
      <rect x="22" y="62" width="20" height="38" fill="#a8553c"/>
      <path d="M22 62 L32 50 L42 62 Z" fill="#3a4652"/>
      <rect x="58" y="50" width="14" height="50" fill="#cfd8dc"/>
      <line x1="65" y1="50" x2="65" y2="42" stroke="#1a1410" strokeWidth=".7"/>
      <ellipse cx="100" cy="98" rx="22" ry="6" fill="#3a4652"/>
      <ellipse cx="100" cy="94" rx="20" ry="5" fill="#94e2c0"/>
      <rect x="140" y="68" width="16" height="32" fill="#6fd5e0"/>
      <rect x="170" y="76" width="14" height="24" fill="#857a5a"/>
      {/* Tiny avatar */}
      <circle cx="98" cy="106" r="3" fill="#1a1410"/>
      <rect x="96" y="108" width="4" height="6" fill="#f6f1e4"/>
      {/* Hover indicator */}
      <rect x="36" y="42" width="14" height="6" rx="2" fill="rgba(15,15,12,.85)"/>
      <path d="M40 48 L43 52 L46 48 Z" fill="rgba(15,15,12,.85)"/>
    </svg>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────

function QuickViewDashboard({ tod = 'golden' }) {
  const [openId, setOpenId] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{
      width: 1440, minHeight: 2200,
      background: '#f5e9c9',
      backgroundImage: `
        radial-gradient(circle at 20% 8%, rgba(255,250,238,.65), transparent 60%),
        radial-gradient(circle at 80% 2%, rgba(255,210,170,.45), transparent 50%),
        radial-gradient(circle at 30% 30%, rgba(0,0,0,.025) 1px, transparent 2px),
        radial-gradient(circle at 70% 60%, rgba(255,255,255,.04) 1px, transparent 2px),
        #f5e9c9
      `,
      backgroundSize: 'auto, auto, 30px 30px, 28px 28px, auto',
      fontFamily: 'var(--rw-sans)', color: '#2a1a0e',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Soft sun glow top right */}
      <div style={{ position: 'absolute', right: -100, top: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #fff1c855 0%, transparent 70%)', pointerEvents: 'none' }}/>

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '56px 80px 80px' }}>
        {/* TOP NAV */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, font: '12px var(--rw-term)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(42,26,14,.62)' }}>
            <Sigil/><span>PF · Portfolio · Quick View</span>
          </span>
          <button style={navBtnStyle('#6e8b5a')}>Switch to Exploration →</button>
        </div>

        {/* IDENTITY STRIP */}
        <IdentityStrip/>

        {/* STATS STRIP */}
        <h2 style={sectionHeader}>The numbers, briefly</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 70 }}>
          <StatCard n="200+"     k="Qard users"        c="fintech landing · 30 days"/>
          <StatCard n="70+"      k="Pong active users" c="cross-platform · replaced paper"/>
          <StatCard n="490k+"    k="Quotes indexed"    c="semantic search · H100 cluster"/>
          <StatCard n="60+"      k="NCAA schools"      c="CFB valuation · The Athletic"/>
          <StatCard n="1,000+"   k="Receipts → JSON"   c="Donut model · RMAICT"/>
          <StatCard n="updt.pro" k="Live product"      c="AI soccer analytics · UPDT." big/>
        </div>

        {/* GROUP A — THE WORK */}
        <SectionHeader title="The work" subtitle="Where I am most of the time" count="3"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginBottom: 56 }}>
          {DASH_BUILDINGS.filter(b => b.group === 'work').map(b => (
            <Tile key={b.id} b={b} size="lg" onClick={() => setOpenId(b.id)} hovered={hover === b.id} onHover={setHover}/>
          ))}
        </div>

        {/* GROUP B — PROJECTS */}
        <SectionHeader title="Projects" subtitle="Things I built because I wanted to" count="6"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 56 }}>
          {DASH_BUILDINGS.filter(b => b.group === 'projects').map(b => (
            <Tile key={b.id} b={b} size="md" onClick={() => setOpenId(b.id)} hovered={hover === b.id} onHover={setHover}/>
          ))}
        </div>

        {/* GROUP C — ABOUT */}
        <SectionHeader title="About me" subtitle="Story, school, skills, hello" count="4"/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {DASH_BUILDINGS.filter(b => b.group === 'about').map(b => (
            <Tile key={b.id} b={b} size="sm" onClick={() => setOpenId(b.id)} hovered={hover === b.id} onHover={setHover}/>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 64, paddingTop: 28, borderTop: '1px dashed #c8bb95', display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: '11.5px var(--rw-term)', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(42,26,14,.55)' }}>
          <span>Built by PF · 2026 · same panels as the exploration mode</span>
          <span>parthivfarazi@icloud.com  ·  +1 (404) 203-5379</span>
        </div>
      </div>

      {/* Modal */}
      {openId ? <DashboardPanelOverlay id={openId} onClose={() => setOpenId(null)}/> : null}
    </div>
  );
}

const sectionHeader = { font: '400 13px var(--rw-term)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', margin: '0 0 18px' };

function navBtnStyle(c) {
  return {
    appearance: 'none', border: 'none', cursor: 'pointer',
    padding: '10px 16px', borderRadius: 999,
    background: '#fff8e2', color: '#2a1a0e',
    font: '12.5px var(--rw-sans)', fontWeight: 600,
    boxShadow: '0 2px 0 #d4c178, inset 0 0 0 1px #d4c178',
    transition: 'transform .12s',
  };
}

function IdentityStrip() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 24, alignItems: 'center',
      padding: '20px 24px', background: '#fcf2d8',
      border: '1px solid #d4c178', borderRadius: 4,
      boxShadow: '0 2px 0 #d4c178, 0 14px 30px rgba(40,20,8,.12)',
      marginBottom: 56,
    }}>
      {/* Avatar */}
      <div style={{ width: 80, height: 80, background: '#fff8e2', border: '1px solid #d4c178', borderRadius: 2, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        {window.AvatarFront ? <window.AvatarFront size={120}/> : null}
      </div>
      {/* Name + role */}
      <div>
        <div style={{ font: 'italic 32px/1 var(--rw-serif)', color: '#2a1a0e', marginBottom: 4 }}>Parthiv Farazi</div>
        <div style={{ font: '14px var(--rw-sans)', color: '#3a2a1e', fontWeight: 500 }}>
          Co-founder & CTO at <b>UPDT.</b>  ·  CS @ Georgia Tech '26  ·  building things at the seam of sports, AI & product
        </div>
        <div style={{ font: '11.5px var(--rw-term)', color: '#7a5a30', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Pin c="#a8553c"/> Atlanta, GA
          </span>
          <span style={{ opacity: .5 }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Pin c="#6fd5e0"/> originally Kuala Lumpur
          </span>
        </div>
      </div>
      {/* Quick links */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <QuickLink label="email"   sym="✉"/>
        <QuickLink label="github"  sym="GH"/>
        <QuickLink label="linkedin"sym="in"/>
        <QuickLink label="updt.pro"sym="↗"/>
      </div>
    </div>
  );
}

function Pin({ c }) {
  return (
    <svg viewBox="0 0 12 14" width="10" height="12"><path d="M6 0 Q1 0 1 5 Q1 10 6 14 Q11 10 11 5 Q11 0 6 0 Z" fill={c} stroke="rgba(0,0,0,.4)" strokeWidth=".5"/><circle cx="6" cy="5" r="1.8" fill="#fffaee"/></svg>
  );
}

function QuickLink({ sym, label }) {
  return (
    <button title={label} style={{
      width: 38, height: 38, borderRadius: 4,
      background: '#fff8e2', border: '1px solid #d4c178', cursor: 'pointer',
      display: 'grid', placeItems: 'center',
      font: '13px var(--rw-term)', letterSpacing: '.04em', color: '#2a1a0e', fontWeight: 700,
      boxShadow: '0 2px 0 #d4c178',
    }}>{sym}</button>
  );
}

function StatCard({ n, k, c, big }) {
  return (
    <div style={{
      padding: '20px 18px',
      background: big ? 'linear-gradient(180deg, #fff8e2, #f5d97a55)' : '#fff8e2',
      border: '1px solid #d4c178', borderRadius: 4,
      boxShadow: '0 2px 0 #d4c178, 0 10px 22px rgba(40,20,8,.08)',
      display: 'flex', flexDirection: 'column', gap: 4,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        font: big ? '500 24px "Pixelify Sans", var(--rw-serif)' : '500 36px "Pixelify Sans", var(--rw-serif)',
        color: '#b3a369', letterSpacing: '-.01em', lineHeight: 1,
        textShadow: '0 1px 0 #fffaee, 0 2px 0 #d4c178',
      }}>{n}</div>
      <div style={{ font: '13px var(--rw-sans)', fontWeight: 600, color: '#2a1a0e', marginTop: 2 }}>{k}</div>
      <div style={{ font: '10.5px var(--rw-term)', letterSpacing: '.14em', color: '#7a5a30', textTransform: 'uppercase' }}>{c}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 10, borderBottom: '1px dashed #c8bb95' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <h2 style={{ font: '500 32px "Pixelify Sans", var(--rw-serif)', margin: 0, color: '#2a1a0e' }}>{title}</h2>
        <span style={{ font: '12px var(--rw-term)', letterSpacing: '.22em', color: '#7a5a30', textTransform: 'uppercase' }}>{subtitle}</span>
      </div>
      <span style={{ font: '11px var(--rw-term)', letterSpacing: '.22em', color: '#7a5a30', textTransform: 'uppercase' }}>· {count} tiles ·</span>
    </div>
  );
}

function Tile({ b, size, onClick, hovered, onHover }) {
  // size: lg, md, sm
  const heights = { lg: 280, md: 200, sm: 156 };
  const thumbH = { lg: 160, md: 100, sm: 60 };
  const padPx = { lg: 18, md: 14, sm: 12 };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => onHover(b.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        all: 'unset', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        height: heights[size],
        background: '#fcf2d8',
        border: hovered ? '1px solid #b3a369' : '1px solid #d4c178',
        borderRadius: 4,
        boxShadow: hovered
          ? '0 4px 0 #b3a369, 0 18px 32px rgba(40,20,8,.18), 0 0 0 4px #b3a36922'
          : '0 2px 0 #d4c178, 0 8px 16px rgba(40,20,8,.1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all .15s ease',
        overflow: 'hidden', position: 'relative',
        color: '#2a1a0e',
      }}>
      {/* Thumbnail */}
      <div style={{ height: thumbH[size], background: '#fff8e2', borderBottom: '1px solid #e8dab0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'stretch' }}>
          <Thumb kind={b.thumb} w="100%" h="100%"/>
        </div>
        {/* Stat chip */}
        {b.chip ? (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            padding: '4px 10px',
            background: 'rgba(15,15,12,.85)', color: '#f5d97a',
            font: '10.5px var(--rw-term)', letterSpacing: '.16em', textTransform: 'uppercase',
            borderRadius: 999,
          }}>{b.chip}</span>
        ) : null}
        {/* tag */}
        <span style={{ position: 'absolute', bottom: 8, left: 10, font: '9.5px var(--rw-term)', letterSpacing: '.18em', color: 'rgba(255,250,238,.9)', textTransform: 'uppercase', background: 'rgba(15,15,12,.55)', padding: '3px 8px', borderRadius: 2 }}>{b.tag}</span>
      </div>
      {/* Text body */}
      <div style={{ padding: `${padPx[size]}px ${padPx[size] + 2}px`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: size === 'lg' ? '500 22px "Pixelify Sans", var(--rw-serif)' : '500 18px "Pixelify Sans", var(--rw-serif)', color: '#2a1a0e', marginBottom: 4 }}>{b.title}</div>
          {b.role ? <div style={{ font: '12.5px var(--rw-sans)', fontWeight: 600, color: '#5a3e20' }}>{b.role}</div> : null}
          {b.sub  ? <div style={{ font: '11.5px var(--rw-mono)', color: '#7a5a30', marginTop: 2 }}>{b.sub}</div> : null}
        </div>
        <div style={{ marginTop: 10, font: '10.5px var(--rw-term)', letterSpacing: '.18em', color: hovered ? '#b3a369' : '#7a5a30', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Press to open</span>
          {hovered ? <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>→</span> : <span style={{ opacity: .3, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>→</span>}
        </div>
      </div>
    </button>
  );
}

// ─── PANEL MODAL FOR DASHBOARD ──────────────────────────────────────────

function DashboardPanelOverlay({ id, onClose }) {
  const b = DASH_BY_ID[id];
  const Panel = DASHBOARD_PANELS[id];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(20,15,8,.6)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', animation: 'rw-fade .3s ease' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '92%', maxHeight: '94%', overflow: 'auto', animation: 'rw-rise .35s cubic-bezier(.2,.7,.3,1)' }}>
        <button onClick={onClose} style={{
          position: 'absolute', right: -14, top: -14, width: 36, height: 36, borderRadius: '50%',
          background: '#fcf2d8', color: '#2a1a0e', border: '1px solid #d4c178',
          font: '14px var(--rw-mono)', cursor: 'pointer', zIndex: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,.3)',
        }}>×</button>
        {Panel ? <Panel/> : <PanelPlaceholder b={b}/>}
      </div>
    </div>
  );
}

// ─── MOBILE LANDING ─────────────────────────────────────────────────────

function LandingPageMobile({ tod = 'golden' }) {
  return (
    <div style={{
      width: 390, height: 844, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #ffe8c1 0%, #f7d1b6 35%, #e8c4d4 70%, #c8dfd6 100%)',
      fontFamily: 'var(--rw-sans)', color: '#2a1a0e',
    }}>
      {/* Status bar */}
      <div style={{ height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 22px', font: '13.5px var(--rw-sans)', fontWeight: 600 }}>
        <span>9:41</span>
        <span style={{ display: 'inline-flex', gap: 6 }}>● ● ●</span>
      </div>

      {/* Sun */}
      <div style={{ position: 'absolute', right: 40, top: 60, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, #fff1c8 0%, transparent 70%)' }}/>

      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ font: '11px var(--rw-term)', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7a5a30', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Sigil/>PF · Portfolio
        </div>
        <h1 style={{ font: '500 48px/0.95 "Pixelify Sans", var(--rw-serif)', margin: '24px 0 12px', color: '#2a1a0e' }}>Hi, I'm<br/>Parthiv.</h1>
        <p style={{ font: '14.5px/1.45 var(--rw-sans)', color: '#3a2a1e', margin: 0 }}>CS at Georgia Tech · Co-founder & CTO of <b style={{ color: '#5a3e20' }}>UPDT.</b> Atlanta-based, originally KL.</p>
      </div>

      {/* Choices stacked */}
      <div style={{ padding: '28px 24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MobileChoice kicker="THE FAST PATH · ~2 MIN" title="Quick View" desc="Everything visible at once." accent="#b3a369" preview={<DashboardMini/>} cta="Open"/>
        <MobileChoice kicker="THE SCENIC ROUTE · ~10 MIN" title="Exploration" desc="Walk an island. 13 buildings." accent="#6e8b5a" preview={<IslandMini/>} cta="Enter"/>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center', font: '10px var(--rw-term)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(42,26,14,.45)' }}>
        either way · same content
      </div>
    </div>
  );
}

function MobileChoice({ kicker, title, desc, preview, cta, accent }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, background: '#f9efd1', border: '1px solid #d4c178', borderRadius: 4, padding: 12, boxShadow: '0 4px 14px rgba(40,20,8,.12)' }}>
      <div style={{ background: '#fcf2d8', borderRadius: 2, overflow: 'hidden' }}>{preview}</div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: '9.5px var(--rw-term)', letterSpacing: '.16em', color: '#7a5a30', textTransform: 'uppercase' }}>{kicker}</div>
          <div style={{ font: '500 24px/0.95 "Pixelify Sans", var(--rw-serif)', margin: '4px 0', color: '#2a1a0e' }}>{title}</div>
          <div style={{ font: '12px/1.35 var(--rw-sans)', color: '#3a2a1e' }}>{desc}</div>
        </div>
        <span style={{ alignSelf: 'flex-start', marginTop: 6, padding: '6px 12px', background: accent, color: '#1a1410', font: '10.5px var(--rw-term)', letterSpacing: '.18em', textTransform: 'uppercase', borderRadius: 2 }}>{cta} →</span>
      </div>
    </div>
  );
}

// ─── MOBILE DASHBOARD ───────────────────────────────────────────────────

function QuickViewDashboardMobile({ tod = 'golden' }) {
  return (
    <div style={{
      width: 390, minHeight: 1900,
      background: '#f5e9c9',
      backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,.025) 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.05) 1px, transparent 2px), #f5e9c9',
      backgroundSize: '24px 24px, 22px 22px, auto',
      fontFamily: 'var(--rw-sans)', color: '#2a1a0e',
      position: 'relative', padding: '20px 18px 32px',
    }}>
      {/* status bar */}
      <div style={{ height: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'center', font: '12px var(--rw-sans)', fontWeight: 600, marginBottom: 8 }}>
        <span>9:41</span><span style={{ display: 'inline-flex', gap: 6 }}>● ● ●</span>
      </div>

      {/* Identity card — compact */}
      <div style={{ padding: 14, background: '#fcf2d8', border: '1px solid #d4c178', borderRadius: 4, boxShadow: '0 2px 0 #d4c178, 0 8px 18px rgba(40,20,8,.1)', display: 'grid', gridTemplateColumns: '54px 1fr', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ width: 54, height: 54, background: '#fff8e2', border: '1px solid #d4c178', borderRadius: 2, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
          {window.AvatarFront ? <window.AvatarFront size={80}/> : null}
        </div>
        <div>
          <div style={{ font: 'italic 20px/1 var(--rw-serif)', color: '#2a1a0e' }}>Parthiv Farazi</div>
          <div style={{ font: '12px var(--rw-sans)', color: '#3a2a1e', marginTop: 4 }}>CTO @ UPDT · CS @ GT '26</div>
          <div style={{ font: '10px var(--rw-term)', color: '#7a5a30', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 4 }}>ATL ↔ KL</div>
        </div>
      </div>

      {/* Stats — 2 per row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
        <StatCard n="200+"   k="Qard users"        c="30 days"/>
        <StatCard n="70+"    k="Pong active users" c="cross-platform"/>
        <StatCard n="490k+"  k="Quotes indexed"    c="FAISS · H100"/>
        <StatCard n="60+"    k="NCAA schools"      c="featured · Athletic"/>
        <StatCard n="1,000+" k="Receipts · JSON"   c="Donut · RMAICT"/>
        <StatCard n="LIVE"   k="updt.pro"          c="AI soccer · UPDT."/>
      </div>

      {/* Work */}
      <MobileSection title="The work" count="3"/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {DASH_BUILDINGS.filter(b => b.group === 'work').map(b => <MobileTile key={b.id} b={b}/>)}
      </div>

      {/* Projects */}
      <MobileSection title="Projects" count="6"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
        {DASH_BUILDINGS.filter(b => b.group === 'projects').map(b => <MobileTile key={b.id} b={b} compact/>)}
      </div>

      {/* About */}
      <MobileSection title="About me" count="4"/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {DASH_BUILDINGS.filter(b => b.group === 'about').map(b => <MobileTile key={b.id} b={b} compact/>)}
      </div>

      <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px dashed #c8bb95', font: '10px var(--rw-term)', letterSpacing: '.18em', color: 'rgba(42,26,14,.55)', textAlign: 'center', textTransform: 'uppercase' }}>
        switch to exploration → · resume PDF ↓
      </div>
    </div>
  );
}

function MobileSection({ title, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 6, borderBottom: '1px dashed #c8bb95' }}>
      <h2 style={{ font: '500 22px "Pixelify Sans", var(--rw-serif)', margin: 0 }}>{title}</h2>
      <span style={{ font: '10px var(--rw-term)', letterSpacing: '.2em', color: '#7a5a30', textTransform: 'uppercase' }}>· {count} ·</span>
    </div>
  );
}

function MobileTile({ b, compact }) {
  return (
    <div style={{ background: '#fcf2d8', border: '1px solid #d4c178', borderRadius: 4, boxShadow: '0 2px 0 #d4c178', overflow: 'hidden' }}>
      <div style={{ background: '#fff8e2', height: compact ? 80 : 120, position: 'relative', overflow: 'hidden' }}>
        <Thumb kind={b.thumb} w="100%" h="100%"/>
        {b.chip ? <span style={{ position: 'absolute', top: 6, right: 6, padding: '2px 8px', background: 'rgba(15,15,12,.85)', color: '#f5d97a', font: '9.5px var(--rw-term)', letterSpacing: '.14em', textTransform: 'uppercase', borderRadius: 999 }}>{b.chip}</span> : null}
      </div>
      <div style={{ padding: '8px 10px' }}>
        <div style={{ font: '500 14px/1.1 "Pixelify Sans", var(--rw-serif)', color: '#2a1a0e' }}>{b.title}</div>
        <div style={{ font: '10.5px var(--rw-mono)', color: '#7a5a30', marginTop: 2 }}>{b.role}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LandingPage, QuickViewDashboard,
  LandingPageMobile, QuickViewDashboardMobile,
  DASH_BUILDINGS, DASH_BY_ID, Thumb, ThumbDefs,
});
