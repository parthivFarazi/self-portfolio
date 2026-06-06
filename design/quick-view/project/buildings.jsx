// buildings.jsx — Detailed isometric-ish SVG building art for each node.
// Each component is an <g> rendered at its node coords (anchor: 0,0 = ground/door).
// Light comes from upper-right; right side wall = lighter, left = shaded.
// Coordinates are SVG user units; the parent SVG is 1400×900.

// Shared <defs> block — drop into the parent SVG once.
function BuildingDefs() {
  return (
    <defs>
      {/* Cast-shadow blur */}
      <filter id="bld-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3.5" />
        <feComponentTransfer><feFuncA type="linear" slope=".6"/></feComponentTransfer>
      </filter>
      <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.6"/>
      </filter>
      {/* Painterly grass noise */}
      <pattern id="grass-tuft" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="8" r="1.2" fill="#a8d49f"/>
        <circle cx="22" cy="14" r="1" fill="#4a8a48"/>
        <circle cx="10" cy="24" r="1.4" fill="#5a9558"/>
        <circle cx="26" cy="28" r=".9" fill="#7eb86a"/>
        <circle cx="18" cy="4" r=".7" fill="#3e6a3c"/>
        <circle cx="2" cy="18" r=".8" fill="#a8d49f"/>
      </pattern>
      <pattern id="flower-dots" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="18" cy="22" r="2" fill="#f5d97a" opacity=".75"/>
        <circle cx="80" cy="40" r="1.6" fill="#e07ec3" opacity=".7"/>
        <circle cx="50" cy="90" r="1.8" fill="#fffaee" opacity=".8"/>
        <circle cx="100" cy="100" r="1.5" fill="#f5d97a" opacity=".7"/>
      </pattern>
      {/* Cobblestone */}
      <pattern id="cobble" x="0" y="0" width="22" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
        <rect width="22" height="14" fill="#e8d5a8"/>
        <ellipse cx="6" cy="5" rx="5.5" ry="3.2" fill="#dbc592"/>
        <ellipse cx="16" cy="10" rx="6" ry="3.4" fill="#d4ba80"/>
        <ellipse cx="2" cy="11" rx="2" ry="1.4" fill="#c8b585"/>
      </pattern>
      <radialGradient id="island-base" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#80c374"/>
        <stop offset="60%" stopColor="#6db862"/>
        <stop offset="100%" stopColor="#4a8a48"/>
      </radialGradient>
      {/* Sun + ambient occlusion preset — used for building bases */}
      <radialGradient id="bld-base-ao" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="80%" stopColor="rgba(0,0,0,0)"/>
        <stop offset="100%" stopColor="rgba(0,0,0,.35)"/>
      </radialGradient>
      {/* Glass tint for futurist buildings */}
      <linearGradient id="glass-mint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cdf3e2"/>
        <stop offset="50%" stopColor="#9ee0c8"/>
        <stop offset="100%" stopColor="#5fa896"/>
      </linearGradient>
      <linearGradient id="glass-cyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d6f4f8"/>
        <stop offset="50%" stopColor="#6fd5e0"/>
        <stop offset="100%" stopColor="#357a8a"/>
      </linearGradient>
      {/* Brick gradient */}
      <linearGradient id="brick-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c46950"/>
        <stop offset="100%" stopColor="#8a4332"/>
      </linearGradient>
      <pattern id="brick-pat" x="0" y="0" width="12" height="6" patternUnits="userSpaceOnUse">
        <rect width="12" height="6" fill="transparent"/>
        <line x1="0" y1="3" x2="12" y2="3" stroke="rgba(0,0,0,.22)" strokeWidth=".6"/>
        <line x1="6" y1="0" x2="6" y2="3" stroke="rgba(0,0,0,.22)" strokeWidth=".6"/>
        <line x1="0" y1="3" x2="0" y2="6" stroke="rgba(0,0,0,.22)" strokeWidth=".6"/>
      </pattern>
      {/* White wash */}
      <linearGradient id="white-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffaee"/>
        <stop offset="100%" stopColor="#d8cfb8"/>
      </linearGradient>
      {/* Wood */}
      <linearGradient id="wood-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a5234"/>
        <stop offset="100%" stopColor="#3a2410"/>
      </linearGradient>
      <linearGradient id="stone-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d8cfb8"/>
        <stop offset="100%" stopColor="#857a5a"/>
      </linearGradient>
      {/* Holographic pitch */}
      <radialGradient id="holo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#94e2c0" stopOpacity=".9"/>
        <stop offset="100%" stopColor="#6fd5e0" stopOpacity=".4"/>
      </radialGradient>
      {/* Window glow */}
      <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff1c8"/>
        <stop offset="100%" stopColor="#f5d97a" stopOpacity="0"/>
      </radialGradient>
    </defs>
  );
}

// Cast shadow under building footprint
function CastShadow({ rx = 50, ry = 14, dy = 4 }) {
  return <ellipse cx="0" cy={dy} rx={rx} ry={ry} fill="rgba(0,0,0,.4)" filter="url(#bld-shadow)"/>;
}

// Door — shared
function Door({ x = 0, y = 0, w = 10, h = 16, glow = '#f5d97a', glowOp = .6 }) {
  return (
    <g transform={`translate(${x - w/2}, ${y - h})`}>
      <rect width={w} height={h} fill="#1a1410"/>
      <rect width={w} height="2" y={h - 2} fill="#5a3a18"/>
      <rect x="1" y="1.5" width={w - 2} height={h - 4} fill={glow} opacity={glowOp}/>
    </g>
  );
}

// ─── 1. UPDT STADIUM ────────────────────────────────────────────────────
// Big futuristic oval; translucent glass walls; holographic pitch inside; drones above.
function UPDTStadium({ tod, glow }) {
  const lights = tod === 'night' ? 1 : tod === 'dusk' ? .85 : .55;
  return (
    <g>
      {/* Stadium base shadow */}
      <CastShadow rx="78" ry="22" dy="32" />
      {/* Outer rim — dark concrete */}
      <ellipse cx="0" cy="20" rx="78" ry="22" fill="#3a4a52"/>
      <ellipse cx="0" cy="18" rx="78" ry="22" fill="#5a6a72"/>
      {/* Glass wall band — slightly mint */}
      <ellipse cx="0" cy="14" rx="78" ry="22" fill="url(#glass-mint)" opacity=".9"/>
      <ellipse cx="0" cy="14" rx="78" ry="22" fill="none" stroke="#2e3a32" strokeWidth="1"/>
      {/* Inner ground (pitch) — holographic */}
      <ellipse cx="0" cy="8" rx="56" ry="14" fill="#1f3a3e"/>
      <ellipse cx="0" cy="8" rx="56" ry="14" fill="url(#holo)" opacity=".85"/>
      <ellipse cx="0" cy="8" rx="54" ry="13" fill="none" stroke="#94e2c0" strokeWidth=".5"/>
      {/* Pitch markings */}
      <line x1="-54" y1="8" x2="54" y2="8" stroke="#cff8e6" strokeWidth=".5" opacity=".8"/>
      <line x1="0" y1="-2" x2="0" y2="18" stroke="#cff8e6" strokeWidth=".5" opacity=".8"/>
      <ellipse cx="0" cy="8" rx="9" ry="3" fill="none" stroke="#cff8e6" strokeWidth=".5"/>
      {/* Player dots (drifting) */}
      {[[-32,4],[-22,12],[-10,6],[6,10],[20,4],[34,12]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="1.5" fill="#e07ec3" opacity=".95"/>
          <circle cx={x} cy={y} r="3.5" fill="#e07ec3" opacity=".3"/>
        </g>
      ))}
      {[[-26,8],[2,14],[28,6]].map(([x,y],i)=>(
        <g key={`b${i}`}>
          <circle cx={x} cy={y} r="1.4" fill="#6fd5e0" opacity=".95"/>
          <circle cx={x} cy={y} r="3.5" fill="#6fd5e0" opacity=".3"/>
        </g>
      ))}
      {/* Top rim */}
      <ellipse cx="0" cy="-8" rx="78" ry="22" fill="none" stroke="#5a6a72" strokeWidth=".8"/>
      <path d="M-78 -8 L-78 14 M78 -8 L78 14" stroke="#5a6a72" strokeWidth="1.5"/>
      {/* Stadium lights — four poles */}
      {[[-58,-22],[-18,-30],[18,-30],[58,-22]].map(([x,y],i)=>(
        <g key={`l${i}`}>
          <line x1={x} y1={y + 14} x2={x} y2={y - 4} stroke="#2a2520" strokeWidth="1.4"/>
          <rect x={x-5} y={y-8} width="10" height="6" fill="#2a2520"/>
          <rect x={x-4} y={y-7} width="8" height="4" fill="#fff1c8"/>
          {/* Light cone */}
          <path d={`M${x} ${y - 4} L${x - 14} ${y + 16} L${x + 14} ${y + 16} Z`} fill="#fff1c8" opacity={lights * .25}/>
        </g>
      ))}
      {/* UPDT signage */}
      <rect x="-26" y="-4" width="52" height="12" rx="2" fill="#0e1820"/>
      <rect x="-26" y="-4" width="52" height="12" rx="2" fill="none" stroke="#6fd5e0" strokeWidth=".5"/>
      <text x="0" y="5" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill="#94e2c0" letterSpacing="1.5">UPDT.</text>
      {/* Drones overhead */}
      <g>
        <Drone x={-40} y={-46}/>
        <Drone x={20} y={-50}/>
        <Drone x={50} y={-40}/>
      </g>
      {/* Arched entrance */}
      <path d="M-8 28 Q-8 16 0 16 Q8 16 8 28 Z" fill="#0e1820"/>
      <path d="M-8 28 Q-8 16 0 16 Q8 16 8 28 Z" fill="url(#window-glow)" opacity=".55"/>
    </g>
  );
}

function Drone({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-4" y="-1" width="8" height="2" fill="#2a2520"/>
      <line x1="-7" y1="-1" x2="7" y2="-1" stroke="#2a2520" strokeWidth=".8"/>
      <circle cx="-7" cy="-1" r="2" fill="#6fd5e0" opacity=".8"/>
      <circle cx="7" cy="-1" r="2" fill="#6fd5e0" opacity=".8"/>
      <circle cx="0" cy="6" r="1.4" fill="#e07ec3"/>
    </g>
  );
}

// ─── 2. RMAICT TOWER ────────────────────────────────────────────────────
// Tall futurist with Malaysian-pattern base, antenna, OCR scan beams inside.
function RMAICTTower({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .55;
  return (
    <g>
      <CastShadow rx="32" ry="9" dy="28"/>
      {/* Base — songket-patterned terracotta */}
      <rect x="-26" y="14" width="52" height="14" fill="#a8553c"/>
      <rect x="-26" y="14" width="52" height="14" fill="url(#brick-pat)" opacity=".4"/>
      <path d="M-26 16 L26 16" stroke="#f5d97a" strokeWidth=".8"/>
      <path d="M-26 22 L26 22" stroke="#f5d97a" strokeWidth=".8"/>
      {/* Songket diamonds */}
      {[-18, -6, 6, 18].map(x => <path key={x} d={`M${x} 19 L${x+4} 17 L${x+8} 19 L${x+4} 21 Z`} fill="#f5d97a" opacity=".7"/>)}
      {/* Vine on base */}
      <path d="M-26 14 Q-22 6 -18 14 Q-14 6 -10 14" stroke="#3e6a3c" strokeWidth="1.6" fill="none"/>
      <circle cx="-22" cy="8" r="2" fill="#5a9558"/>
      <circle cx="-14" cy="8" r="2" fill="#5a9558"/>
      {/* Doors */}
      <Door x="0" y="28" w="10" h="14" glow="#f5d97a" glowOp={lit}/>
      {/* Lower entrance lights */}
      <circle cx="-14" cy="22" r="1.2" fill="#f5d97a" opacity={lit}/>
      <circle cx="14" cy="22" r="1.2" fill="#f5d97a" opacity={lit}/>
      {/* Right side wall (shaded) */}
      <path d="M14 -56 L22 -52 L22 14 L14 14 Z" fill="#3a7080"/>
      {/* Front face — glass */}
      <rect x="-14" y="-56" width="28" height="70" fill="url(#glass-cyan)"/>
      <rect x="-14" y="-56" width="28" height="70" fill="none" stroke="#1a3a44" strokeWidth=".8"/>
      {/* Window rows */}
      {[-50, -38, -26, -14, -2].map(y => <g key={y}>
        <rect x="-12" y={y} width="11" height="6" fill="#162536"/>
        <rect x="-12" y={y} width="11" height="6" fill="#f5d97a" opacity={lit * .8}/>
        <rect x="1" y={y} width="11" height="6" fill="#162536"/>
        <rect x="1" y={y} width="11" height="6" fill="#f5d97a" opacity={lit * .8}/>
      </g>)}
      {/* OCR scan beam — animated-feel */}
      <rect x="-14" y="-30" width="28" height="2" fill="#94e2c0" opacity=".75"/>
      <rect x="-14" y="-28" width="28" height="1" fill="#94e2c0" opacity=".3"/>
      {/* Roof — flat with antenna */}
      <rect x="-16" y="-60" width="32" height="6" fill="#1a3a44"/>
      <rect x="-16" y="-60" width="32" height="2" fill="#3a6a78"/>
      {/* Antenna */}
      <line x1="0" y1="-60" x2="0" y2="-82" stroke="#1a1410" strokeWidth="1.6"/>
      <circle cx="0" cy="-82" r="2.4" fill="#e07ec3"/>
      <circle cx="0" cy="-82" r="4.5" fill="#e07ec3" opacity=".3"/>
      {/* Floating Donut neural diagram (ghostly) */}
      <g transform="translate(0,-72)" opacity=".55">
        <ellipse cx="-10" cy="0" rx="3" ry="2" fill="none" stroke="#6fd5e0" strokeWidth=".7"/>
        <ellipse cx="0" cy="-3" rx="3" ry="2" fill="none" stroke="#6fd5e0" strokeWidth=".7"/>
        <ellipse cx="10" cy="0" rx="3" ry="2" fill="none" stroke="#6fd5e0" strokeWidth=".7"/>
        <line x1="-7" y1="-1" x2="-3" y2="-2" stroke="#6fd5e0" strokeWidth=".4"/>
        <line x1="3" y1="-2" x2="7" y2="-1" stroke="#6fd5e0" strokeWidth=".4"/>
      </g>
    </g>
  );
}

// ─── 3. PONG FRAT HOUSE ─────────────────────────────────────────────────
// Colonial house with white columns, wide porch, Greek letters, baseball diamond on lawn.
function PongFrat({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .5;
  return (
    <g>
      <CastShadow rx="44" ry="10" dy="22"/>
      {/* Lawn — baseball diamond mowed in */}
      <ellipse cx="0" cy="22" rx="56" ry="8" fill="#5a9558"/>
      <path d="M-22 22 L0 14 L22 22 L0 30 Z" fill="none" stroke="#a8d49f" strokeWidth="1.2"/>
      <circle cx="0" cy="22" r="1.6" fill="#fffaee"/>
      <circle cx="-22" cy="22" r="1.4" fill="#fffaee"/>
      <circle cx="22" cy="22" r="1.4" fill="#fffaee"/>
      <circle cx="0" cy="14" r="1.4" fill="#fffaee"/>
      <circle cx="0" cy="30" r="1.4" fill="#fffaee"/>
      {/* House right-side shaded wall */}
      <path d="M28 -22 L36 -18 L36 18 L28 18 Z" fill="#d8cfb8"/>
      {/* Main facade */}
      <rect x="-32" y="-22" width="60" height="40" fill="url(#white-shade)"/>
      <rect x="-32" y="-22" width="60" height="40" fill="none" stroke="#5a4a3e" strokeWidth=".75"/>
      {/* Roof — pediment */}
      <path d="M-36 -22 L0 -46 L32 -22 Z" fill="#a8553c"/>
      <path d="M-36 -22 L0 -46 L32 -22 Z" fill="url(#brick-pat)" opacity=".4"/>
      <path d="M-32 -22 L0 -42 L28 -22 Z" fill="none" stroke="#fffaee" strokeWidth="1"/>
      {/* Pediment Greek letters */}
      <text x="0" y="-29" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="700" fill="#f6f1e4">ΠΒΠ</text>
      {/* Porch roof line */}
      <rect x="-34" y="-2" width="64" height="2" fill="#5a4a3e"/>
      {/* Columns — 4 */}
      {[-26, -10, 8, 24].map(x => <g key={x}>
        <rect x={x - 2} y="-2" width="4" height="20" fill="url(#white-shade)" stroke="#a89878" strokeWidth=".4"/>
        <rect x={x - 3} y="-4" width="6" height="2" fill="#fffaee" stroke="#a89878" strokeWidth=".4"/>
        <rect x={x - 3} y="18" width="6" height="2" fill="#fffaee" stroke="#a89878" strokeWidth=".4"/>
      </g>)}
      {/* Solo cups on railing — red */}
      {[-22, -16, -4, 2, 14, 20].map((x, i) => <g key={i} transform={`translate(${x}, -4)`}>
        <path d="M-2 0 L2 0 L1.6 3 L-1.6 3 Z" fill="#d8362a"/>
        <ellipse cx="0" cy="0" rx="2" ry=".6" fill="#a01a14"/>
      </g>)}
      {/* Window — front, lit */}
      <rect x="-6" y="-16" width="14" height="10" fill="#2a2520"/>
      <rect x="-5" y="-15" width="12" height="8" fill="#f5d97a" opacity={lit}/>
      <line x1="1" y1="-16" x2="1" y2="-6" stroke="#2a2520" strokeWidth=".5"/>
      <line x1="-6" y1="-11" x2="8" y2="-11" stroke="#2a2520" strokeWidth=".5"/>
      {/* Beer pong table visible through window — tiny */}
      <rect x="-4" y="-12" width="10" height="2" fill="#c8985e" opacity=".9"/>
      {/* Door */}
      <Door x="0" y="18" w="10" h="18" glow="#f5d97a" glowOp={lit}/>
      {/* Chimney */}
      <rect x="-22" y="-42" width="6" height="14" fill="#8a4332"/>
      <rect x="-23" y="-42" width="8" height="3" fill="#5a2e22"/>
    </g>
  );
}

// ─── 4. COLLEGIATE TOWER (Education) ────────────────────────────────────
// Brick clock tower with white trim and gold plaque on top.
function CollegiateTower({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .5;
  return (
    <g>
      <CastShadow rx="30" ry="9" dy="26"/>
      {/* Base widening */}
      <rect x="-26" y="14" width="52" height="14" fill="#a8553c"/>
      <rect x="-26" y="14" width="52" height="14" fill="url(#brick-pat)" opacity=".5"/>
      <rect x="-26" y="14" width="52" height="3" fill="#fffaee"/>
      {/* Right-side wall (shaded) */}
      <path d="M18 -52 L24 -48 L24 14 L18 14 Z" fill="#7a3a28"/>
      {/* Main shaft */}
      <rect x="-18" y="-52" width="36" height="66" fill="url(#brick-grad)"/>
      <rect x="-18" y="-52" width="36" height="66" fill="url(#brick-pat)" opacity=".5"/>
      {/* White cornice bands */}
      <rect x="-20" y="-52" width="40" height="3" fill="#fffaee"/>
      <rect x="-20" y="-22" width="40" height="2" fill="#fffaee"/>
      <rect x="-20" y="2" width="40" height="2" fill="#fffaee"/>
      {/* Top section — slightly wider, with gold plaque */}
      <rect x="-22" y="-66" width="44" height="14" fill="#8a4332"/>
      <rect x="-22" y="-66" width="44" height="14" fill="url(#brick-pat)" opacity=".4"/>
      <rect x="-24" y="-66" width="48" height="3" fill="#fffaee"/>
      <rect x="-24" y="-55" width="48" height="3" fill="#fffaee"/>
      {/* Gold plaque */}
      <rect x="-18" y="-62" width="36" height="6" fill="#b3a369"/>
      <rect x="-18" y="-62" width="36" height="6" fill="none" stroke="#2a1a0e" strokeWidth=".4"/>
      <text x="0" y="-57" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fontWeight="700" fill="#2a1a0e" letterSpacing="1.5">CS · ATL</text>
      {/* Roof — pyramidal slate */}
      <path d="M-24 -66 L0 -88 L24 -66 Z" fill="#3a4a52"/>
      <path d="M0 -88 L24 -66 Z" fill="none"/>
      <path d="M-24 -66 L0 -88" stroke="#5a6a72" strokeWidth=".5"/>
      {/* Finial spire */}
      <line x1="0" y1="-88" x2="0" y2="-98" stroke="#1a1410" strokeWidth="1.4"/>
      <circle cx="0" cy="-100" r="2" fill="#b3a369"/>
      {/* Clock face */}
      <circle cx="0" cy="-32" r="8" fill="#fffaee" stroke="#1a1410" strokeWidth=".9"/>
      <circle cx="0" cy="-32" r="6.5" fill="none" stroke="#5a4a3e" strokeWidth=".3"/>
      <line x1="0" y1="-32" x2="0" y2="-38" stroke="#1a1410" strokeWidth="1"/>
      <line x1="0" y1="-32" x2="4" y2="-30" stroke="#1a1410" strokeWidth="1"/>
      {[0, 90, 180, 270].map(a => <line key={a} x1="0" y1="-32" x2="0" y2="-32" stroke="#1a1410" strokeWidth=".5" transform={`rotate(${a} 0 -32) translate(0 -7)`} markerEnd=""/>)}
      {/* Windows — arched */}
      {[-10, -2, 8].map(y => <g key={y}>
        <path d={`M-8 ${y + 4} L-8 ${y - 4} Q-8 ${y - 8} -4 ${y - 8} Q0 ${y - 8} 0 ${y - 4} L0 ${y + 4} Z`} fill="#1a1410"/>
        <path d={`M-7 ${y + 3} L-7 ${y - 4} Q-7 ${y - 7} -4 ${y - 7} Q-1 ${y - 7} -1 ${y - 4} L-1 ${y + 3} Z`} fill="#f5d97a" opacity={lit}/>
        <path d={`M2 ${y + 4} L2 ${y - 4} Q2 ${y - 8} 5 ${y - 8} Q8 ${y - 8} 8 ${y - 4} L8 ${y + 4} Z`} fill="#1a1410"/>
        <path d={`M3 ${y + 3} L3 ${y - 4} Q3 ${y - 7} 5 ${y - 7} Q7 ${y - 7} 7 ${y - 4} L7 ${y + 3} Z`} fill="#f5d97a" opacity={lit}/>
      </g>)}
      {/* Grand door */}
      <path d="M-6 28 L-6 14 Q-6 8 0 8 Q6 8 6 14 L6 28 Z" fill="#1a1410"/>
      <path d="M-5 27 L-5 14 Q-5 9 0 9 Q5 9 5 14 L5 27 Z" fill="#f5d97a" opacity={lit * .9}/>
    </g>
  );
}

// ─── 5. PETRONAS TOWERS (About Me) ──────────────────────────────────────────
// Twin tapered silver spires with sky bridge.
function PetronasTowers({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .55;
  return (
    <g>
      <CastShadow rx="40" ry="9" dy="28"/>
      {/* Plaza base */}
      <rect x="-36" y="20" width="72" height="8" fill="#c8b585"/>
      <rect x="-36" y="20" width="72" height="2" fill="#fffaee"/>
      {/* Welcome bench */}
      <rect x="-30" y="14" width="14" height="3" fill="#5a3a18"/>
      <rect x="-30" y="14" width="14" height="1" fill="#7a5234"/>
      <rect x="-28" y="17" width="2" height="4" fill="#5a3a18"/>
      <rect x="-20" y="17" width="2" height="4" fill="#5a3a18"/>
      {/* "PF" doormat */}
      <rect x="-4" y="18" width="14" height="4" fill="#6db862" stroke="#2a2520" strokeWidth=".5"/>
      <text x="3" y="21.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3.5" fontWeight="700" fill="#fffaee" letterSpacing="1">PF</text>

      {/* Right side wall — shaded */}
      <path d="M-2 -84 L4 -80 L4 18 L-2 18 Z" fill="#6a7480" opacity=".7"/>
      {/* Left tower */}
      <path d="M-30 18 L-30 -36 L-24 -68 L-18 -84 L-12 -68 L-12 -36 L-12 18 Z" fill="url(#glass-mint)"/>
      <path d="M-30 18 L-30 -36 L-24 -68 L-18 -84 L-12 -68 L-12 -36 L-12 18 Z" fill="none" stroke="#3a4a52" strokeWidth=".8"/>
      {/* Right tower */}
      <path d="M12 18 L12 -36 L18 -68 L24 -84 L30 -68 L30 -36 L30 18 Z" fill="url(#glass-mint)"/>
      <path d="M12 18 L12 -36 L18 -68 L24 -84 L30 -68 L30 -36 L30 18 Z" fill="none" stroke="#3a4a52" strokeWidth=".8"/>
      {/* Spire tips */}
      <line x1="-18" y1="-84" x2="-18" y2="-104" stroke="#3a4a52" strokeWidth="1.4"/>
      <circle cx="-18" cy="-104" r="1.6" fill="#f5d97a"/>
      <line x1="24" y1="-84" x2="24" y2="-104" stroke="#3a4a52" strokeWidth="1.4"/>
      <circle cx="24" cy="-104" r="1.6" fill="#f5d97a"/>
      {/* Sky bridge */}
      <rect x="-12" y="-30" width="24" height="8" fill="#3a4a52"/>
      <rect x="-12" y="-30" width="24" height="2" fill="#94a4ac"/>
      <rect x="-12" y="-26" width="24" height="2" fill="#cfd8dc" opacity=".5"/>
      {/* Window grid — left */}
      {Array.from({length: 14}).map((_, i) => <g key={`lw${i}`}>
        <rect x="-26" y={-32 + i * 4} width="5" height="2.5" fill="#f5d97a" opacity={lit * .75}/>
        <rect x="-20" y={-32 + i * 4} width="5" height="2.5" fill="#f5d97a" opacity={lit * .75}/>
      </g>)}
      {Array.from({length: 14}).map((_, i) => <g key={`rw${i}`}>
        <rect x="16" y={-32 + i * 4} width="5" height="2.5" fill="#f5d97a" opacity={lit * .75}/>
        <rect x="22" y={-32 + i * 4} width="5" height="2.5" fill="#f5d97a" opacity={lit * .75}/>
      </g>)}
      {/* Doors */}
      <Door x="-21" y="18" w="6" h="10" glowOp={lit}/>
      <Door x="21" y="18" w="6" h="10" glowOp={lit}/>
      {/* Globe by entrance */}
      <g transform="translate(-30, 14)">
        <ellipse cx="0" cy="0" rx="5" ry="5" fill="#5a9598"/>
        <path d="M-3 -1 Q0 -3 3 0 Q2 2 -2 1 Z" fill="#6db862"/>
        <circle cx="2" cy="-1" r="1" fill="#e07ec3"/>
        <circle cx="-2" cy="1" r="1" fill="#6fd5e0"/>
      </g>
    </g>
  );
}

// ─── 6. THE FORGE (Skills) ──────────────────────────────────────────────
// Medieval blacksmith × AI lab. Chimney with sparks, anvil glow, GPU hum.
function Forge({ tod }) {
  const lit = tod === 'night' ? 1 : .9;
  return (
    <g>
      <CastShadow rx="44" ry="10" dy="24"/>
      {/* Stone foundation */}
      <rect x="-36" y="18" width="72" height="6" fill="url(#stone-grad)"/>
      <rect x="-36" y="18" width="72" height="2" fill="#857a5a"/>
      {/* Right-side wall */}
      <path d="M30 -16 L36 -12 L36 18 L30 18 Z" fill="#5a3a18"/>
      {/* Main body — half-timber */}
      <rect x="-32" y="-16" width="64" height="36" fill="#d8cfb8"/>
      {/* Half-timber wood frame */}
      <rect x="-32" y="-16" width="64" height="3" fill="#3a2410"/>
      <rect x="-32" y="18" width="64" height="3" fill="#3a2410"/>
      <rect x="-32" y="-16" width="3" height="36" fill="#3a2410"/>
      <rect x="29" y="-16" width="3" height="36" fill="#3a2410"/>
      <rect x="-2" y="-16" width="3" height="36" fill="#3a2410"/>
      <path d="M-32 -16 L0 2 L32 -16" stroke="#3a2410" strokeWidth="2" fill="none"/>
      <path d="M0 -16 L0 2" stroke="#3a2410" strokeWidth="1.5"/>
      {/* Pitched roof */}
      <path d="M-36 -16 L-22 -36 L22 -36 L36 -16 Z" fill="#6e4a2a"/>
      <path d="M-36 -16 L36 -16" stroke="#3a2410" strokeWidth="1.2"/>
      {/* Roof shingles */}
      {[-30, -24, -18, -12, -6, 0, 6, 12, 18, 24].map(x => <line key={x} x1={x} y1="-36" x2={x} y2="-16" stroke="#3a2410" strokeWidth=".3" opacity=".5"/>)}
      {/* Open front — anvil glow */}
      <rect x="-14" y="-8" width="28" height="26" fill="#1a1410"/>
      <rect x="-14" y="-8" width="28" height="26" fill="#f5d97a" opacity={lit * .85}/>
      <rect x="-14" y="-8" width="28" height="26" fill="url(#window-glow)" opacity=".8"/>
      {/* Anvil silhouette inside */}
      <rect x="-6" y="10" width="12" height="4" fill="#1a1410" opacity=".75"/>
      <rect x="-8" y="14" width="16" height="4" fill="#1a1410" opacity=".7"/>
      {/* GPU rack visible in back — cyan accents */}
      <rect x="-12" y="-4" width="6" height="14" fill="#1a1410"/>
      {[0, 4, 8].map(y => <rect key={y} x="-11" y={-3 + y * .8} width="4" height="1" fill="#6fd5e0" opacity={lit}/>)}
      {/* Floating glowing language icons above forge */}
      <g transform="translate(0, -22)">
        <circle cx="-12" cy="0" r="3.5" fill="#6fd5e0" opacity=".7"/>
        <text x="-12" y="2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#1a1410">py</text>
        <circle cx="0" cy="-4" r="3.5" fill="#e07ec3" opacity=".7"/>
        <text x="0" y="-2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#fffaee">JS</text>
        <circle cx="12" cy="0" r="3.5" fill="#94e2c0" opacity=".7"/>
        <text x="12" y="2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#1a1410">c++</text>
      </g>
      {/* Chimney with sparks */}
      <rect x="14" y="-50" width="8" height="20" fill="#a8553c"/>
      <rect x="14" y="-50" width="8" height="20" fill="url(#brick-pat)" opacity=".5"/>
      <rect x="13" y="-50" width="10" height="3" fill="#5a2e22"/>
      {/* Smoke + sparks */}
      <circle cx="18" cy="-56" r="3" fill="#fffaee" opacity=".5"/>
      <circle cx="22" cy="-62" r="2" fill="#fffaee" opacity=".4"/>
      <circle cx="20" cy="-54" r="1" fill="#f5d97a"/>
      <circle cx="24" cy="-58" r=".8" fill="#e07ec3"/>
      <circle cx="16" cy="-60" r="1.2" fill="#6fd5e0"/>
    </g>
  );
}

// ─── 7. LIGHTHOUSE (Contact) ────────────────────────────────────────────
function Lighthouse({ tod }) {
  const beam = tod === 'night' ? .55 : tod === 'dusk' ? .4 : .22;
  return (
    <g>
      <CastShadow rx="20" ry="7" dy="22"/>
      {/* Rocky base */}
      <ellipse cx="0" cy="22" rx="22" ry="6" fill="#7a7064"/>
      <ellipse cx="-8" cy="20" rx="6" ry="4" fill="#5a5048"/>
      <ellipse cx="10" cy="22" rx="5" ry="3" fill="#5a5048"/>
      {/* Right side wall — shaded */}
      <path d="M9 -52 L14 -48 L14 18 L9 18 Z" fill="#a89878"/>
      {/* Tower body — tapered */}
      <path d="M-14 18 L-12 -20 L-8 -52 L8 -52 L12 -20 L14 18 Z" fill="url(#white-shade)"/>
      <path d="M-14 18 L-12 -20 L-8 -52 L8 -52 L12 -20 L14 18 Z" fill="none" stroke="#5a4a3e" strokeWidth=".7"/>
      {/* Red stripes */}
      <path d="M-13 0 L13 0 L12 6 L-12 6 Z" fill="#a8553c"/>
      <path d="M-13 14 L13 14 L13 20 L-13 20 Z" fill="#a8553c"/>
      <path d="M-10 -28 L10 -28 L9 -22 L-9 -22 Z" fill="#a8553c"/>
      {/* Top platform */}
      <rect x="-12" y="-58" width="24" height="6" fill="#5a4a3e"/>
      <rect x="-12" y="-60" width="24" height="3" fill="#3a2a1e"/>
      {/* Light room */}
      <rect x="-9" y="-72" width="18" height="14" fill="#1a1410"/>
      <rect x="-8" y="-71" width="16" height="12" fill="#f5d97a" opacity=".95"/>
      {/* Beam */}
      <path d="M0 -64 L80 -80 L80 -50 Z" fill="#f5d97a" opacity={beam}/>
      <path d="M0 -64 L60 -56 L60 -36 Z" fill="#fff1c8" opacity={beam * .8}/>
      {/* Dome top */}
      <path d="M-10 -72 L0 -82 L10 -72 Z" fill="#5a4a3e"/>
      <line x1="0" y1="-82" x2="0" y2="-90" stroke="#1a1410" strokeWidth="1.2"/>
      <circle cx="0" cy="-92" r="1.4" fill="#a8553c"/>
      {/* Mailbox + terminal at base */}
      <g transform="translate(-22, 14)">
        <rect x="-2" y="-6" width="6" height="6" fill="#a8553c"/>
        <rect x="-2" y="-6" width="6" height="1.5" fill="#d8362a"/>
        <rect x="0" y="0" width="2" height="4" fill="#3a2410"/>
      </g>
      <g transform="translate(22, 14)">
        <rect x="-1" y="-6" width="2" height="10" fill="#1a1410"/>
        <rect x="-4" y="-12" width="8" height="6" fill="#0e1820"/>
        <rect x="-3" y="-11" width="6" height="4" fill="#6fd5e0" opacity={tod === 'night' ? 1 : .9}/>
      </g>
      {/* Tiny drone */}
      <Drone x="-26" y="-30"/>
    </g>
  );
}

// ─── 8. QARD GREENHOUSE ─────────────────────────────────────────────────
// Geodesic glass dome with floating credit-card "flowers" inside.
function QardGreenhouse({ tod }) {
  const lit = tod === 'night' ? 1 : .8;
  return (
    <g>
      <CastShadow rx="36" ry="9" dy="22"/>
      {/* Base ring */}
      <ellipse cx="0" cy="20" rx="40" ry="6" fill="#d8cfb8"/>
      <ellipse cx="0" cy="20" rx="40" ry="6" fill="none" stroke="#857a5a" strokeWidth=".5"/>
      {/* Glass dome */}
      <path d="M-38 20 Q-38 -28 0 -38 Q38 -28 38 20 Z" fill="url(#glass-mint)" opacity=".88"/>
      <path d="M-38 20 Q-38 -28 0 -38 Q38 -28 38 20 Z" fill="none" stroke="#3a6a5a" strokeWidth=".8"/>
      {/* Triangulation lines */}
      <path d="M-38 20 L0 -38 M38 20 L0 -38" stroke="#fffaee" strokeWidth=".5" opacity=".9"/>
      <path d="M-38 20 L0 8 L38 20" stroke="#fffaee" strokeWidth=".5" opacity=".7"/>
      <path d="M-38 20 L-12 -32 L12 -32 L38 20" stroke="#fffaee" strokeWidth=".5" opacity=".7"/>
      <path d="M-26 -8 L26 -8" stroke="#fffaee" strokeWidth=".5" opacity=".7"/>
      <path d="M-30 6 L30 6" stroke="#fffaee" strokeWidth=".5" opacity=".7"/>
      {/* Card flowers floating inside */}
      <CardFlower x={-18} y={4} rot={-12} color="#e07ec3"/>
      <CardFlower x={6} y={-10} rot={18} color="#6fd5e0"/>
      <CardFlower x={20} y={6} rot={-6} color="#f5d97a"/>
      <CardFlower x={-6} y={-18} rot={8} color="#94e2c0"/>
      {/* Door */}
      <rect x="-5" y="6" width="10" height="14" fill="#1a1410"/>
      <rect x="-4" y="7" width="8" height="12" fill="#f5d97a" opacity={lit * .5}/>
      <line x1="0" y1="6" x2="0" y2="20" stroke="#5a4a3e" strokeWidth=".5"/>
      {/* qard.dev sign */}
      <rect x="14" y="14" width="14" height="6" rx="1" fill="#0e1820"/>
      <text x="21" y="18.5" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fontWeight="700" fill="#94e2c0">qard.dev</text>
      {/* Water feature dot */}
      <ellipse cx="-22" cy="20" rx="6" ry="2" fill="#6db9c4"/>
    </g>
  );
}

function CardFlower({ x, y, rot, color }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
      <rect x="-6" y="-4" width="12" height="8" rx="1.5" fill={color} stroke="#1a1410" strokeWidth=".4"/>
      <rect x="-5" y="-3" width="10" height="1.5" fill="#1a1410" opacity=".35"/>
      <rect x="-5" y="1" width="4" height="1" fill="#fffaee" opacity=".5"/>
      <line x1="0" y1="4" x2="0" y2="8" stroke="#3e6a3c" strokeWidth=".8"/>
    </g>
  );
}

// ─── 9. ATHLETIC STADIUM (College Football) ─────────────────────────────
function AthleticStadium({ tod }) {
  const lit = tod === 'night' ? .95 : .7;
  return (
    <g>
      <CastShadow rx="54" ry="14" dy="24"/>
      {/* Outer rim */}
      <ellipse cx="0" cy="18" rx="56" ry="18" fill="#7a3a28"/>
      <ellipse cx="0" cy="16" rx="56" ry="18" fill="#a8553c"/>
      <ellipse cx="0" cy="14" rx="56" ry="18" fill="url(#brick-pat)" opacity=".35"/>
      {/* Field */}
      <ellipse cx="0" cy="8" rx="40" ry="11" fill="#3e6a3c"/>
      <ellipse cx="0" cy="8" rx="40" ry="11" fill="#5a9558"/>
      {/* Yard lines */}
      {[-30, -20, -10, 0, 10, 20, 30].map(x => <line key={x} x1={x} y1="0" x2={x} y2="16" stroke="#fffaee" strokeWidth=".55" opacity=".85"/>)}
      <line x1="0" y1="0" x2="0" y2="16" stroke="#fffaee" strokeWidth="1" opacity=".95"/>
      {/* End zones */}
      <ellipse cx="-44" cy="8" rx="6" ry="9" fill="#a8553c" opacity=".7"/>
      <ellipse cx="44" cy="8" rx="6" ry="9" fill="#a8553c" opacity=".7"/>
      {/* Floating magazine page */}
      <g transform="translate(0, -22)">
        <rect x="-14" y="-6" width="28" height="18" fill="#fffaee" stroke="#1a1410" strokeWidth=".5"/>
        <rect x="-13" y="-5" width="26" height="4" fill="#1a1410"/>
        <text x="0" y="-2" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3" fontWeight="700" fill="#fffaee" letterSpacing=".5">VALUATIONS</text>
        <rect x="-12" y="0" width="14" height="9" fill="#5a9558"/>
        <rect x="4" y="0" width="8" height="1.5" fill="#1a1410"/>
        <rect x="4" y="2" width="8" height="1" fill="#5a5048"/>
        <rect x="4" y="4" width="6" height="1" fill="#5a5048"/>
        <rect x="4" y="6" width="8" height="1" fill="#5a5048"/>
        <rect x="4" y="8" width="5" height="1" fill="#5a5048"/>
      </g>
      {/* Floating dollar signs */}
      <text x="-32" y="-32" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#b3a369" opacity=".7">$</text>
      <text x="34" y="-28" fontFamily="Georgia,serif" fontSize="8" fontWeight="700" fill="#b3a369" opacity=".7">$</text>
      <text x="18" y="-36" fontFamily="Georgia,serif" fontSize="6" fontWeight="700" fill="#b3a369" opacity=".6">$</text>
      {/* Conference banners around upper deck */}
      {['B10', 'SEC', 'ACC', 'B12'].map((c, i) => <g key={c} transform={`translate(${-36 + i * 24}, -4)`}>
        <rect x="-7" y="-3" width="14" height="6" fill="#fffaee" stroke="#1a1410" strokeWidth=".4"/>
        <text x="0" y="1" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#1a1410">{c}</text>
      </g>)}
      {/* Entrance */}
      <rect x="-6" y="22" width="12" height="6" fill="#1a1410"/>
      <rect x="-5" y="23" width="10" height="4" fill="#f5d97a" opacity={lit}/>
    </g>
  );
}

// ─── 10. WHISPERING ARCHIVE ─────────────────────────────────────────────
// Small stone library with glowing dome and floating firefly quote-tags.
function WhisperingArchive({ tod }) {
  const lit = tod === 'night' ? 1 : .8;
  return (
    <g>
      <CastShadow rx="32" ry="9" dy="22"/>
      {/* Stone walls */}
      <path d="M30 -8 L36 -4 L36 18 L30 18 Z" fill="#857a5a"/>
      <rect x="-30" y="-8" width="60" height="26" fill="url(#stone-grad)"/>
      <rect x="-30" y="-8" width="60" height="26" fill="none" stroke="#5a4a3e" strokeWidth=".8"/>
      {/* Stone block lines */}
      {[-1, 5, 11].map(y => <line key={y} x1="-30" y1={y} x2="30" y2={y} stroke="#5a4a3e" strokeWidth=".4" opacity=".4"/>)}
      {/* Ivy climbing */}
      <path d="M-30 18 Q-26 8 -24 -2 Q-22 -6 -28 -8" stroke="#3e6a3c" strokeWidth="1.6" fill="none"/>
      <circle cx="-26" cy="2" r="1.6" fill="#5a9558"/>
      <circle cx="-22" cy="-2" r="1.4" fill="#5a9558"/>
      <circle cx="-28" cy="10" r="1.4" fill="#5a9558"/>
      {/* Dome */}
      <path d="M-30 -8 Q0 -40 30 -8 Z" fill="#857a5a"/>
      <path d="M-30 -8 Q0 -40 30 -8" stroke="#5a4a3e" strokeWidth=".8" fill="none"/>
      <circle cx="0" cy="-26" r="3" fill="#f5d97a" opacity={lit}/>
      <circle cx="0" cy="-26" r="6" fill="#f5d97a" opacity={lit * .3}/>
      {/* Brass plaques */}
      <rect x="-20" y="6" width="6" height="3" fill="#b3a369"/>
      <rect x="14" y="6" width="6" height="3" fill="#b3a369"/>
      {/* Door — arched */}
      <path d="M-5 18 L-5 6 Q-5 0 0 0 Q5 0 5 6 L5 18 Z" fill="#3a2410"/>
      <path d="M-4 17 L-4 6 Q-4 1 0 1 Q4 1 4 6 L4 17 Z" fill="#f5d97a" opacity={lit * .7}/>
      {/* Windows — arched */}
      <path d="M-22 8 L-22 -2 Q-22 -5 -18 -5 Q-14 -5 -14 -2 L-14 8 Z" fill="#1a1410"/>
      <path d="M-21 7 L-21 -2 Q-21 -4 -18 -4 Q-15 -4 -15 -2 L-15 7 Z" fill="#94e2c0" opacity={lit * .8}/>
      <path d="M14 8 L14 -2 Q14 -5 18 -5 Q22 -5 22 -2 L22 8 Z" fill="#1a1410"/>
      <path d="M15 7 L15 -2 Q15 -4 18 -4 Q21 -4 21 -2 L21 7 Z" fill="#94e2c0" opacity={lit * .8}/>
      {/* GPU rack glimpse */}
      <rect x="16" y="-2" width="4" height="6" fill="#0e1820"/>
      <rect x="17" y="-1" width="2" height="1" fill="#6fd5e0"/>
      <rect x="17" y="1" width="2" height="1" fill="#6fd5e0"/>
      {/* Floating quote-tag fireflies */}
      <FireflyTag x={-38} y={-20} color="#f5d97a"/>
      <FireflyTag x={36} y={-22} color="#e07ec3"/>
      <FireflyTag x={-32} y={-30} color="#6fd5e0"/>
      <FireflyTag x={28} y={-32} color="#94e2c0"/>
      <FireflyTag x={0} y={-50} color="#f5d97a"/>
    </g>
  );
}

function FireflyTag({ x, y, color }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="4" fill={color} opacity=".25"/>
      <circle r="1.4" fill={color}/>
      <rect x="2" y="-1" width="6" height="2" fill={color} opacity=".4"/>
    </g>
  );
}

// ─── 11. ZEN GARDEN ─────────────────────────────────────────────────────
// Japanese garden — raked sand circles, koi pond, cherry tree, bench, journal.
function ZenGarden({ tod }) {
  return (
    <g>
      <CastShadow rx="36" ry="8" dy="20"/>
      {/* Sand bed */}
      <ellipse cx="0" cy="14" rx="40" ry="14" fill="#e8d5a8"/>
      <ellipse cx="0" cy="14" rx="40" ry="14" fill="none" stroke="#c8b585" strokeWidth=".5"/>
      {/* Raked rings */}
      <ellipse cx="0" cy="14" rx="32" ry="11" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      <ellipse cx="0" cy="14" rx="24" ry="8" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      <ellipse cx="0" cy="14" rx="16" ry="5" fill="none" stroke="#c8b585" strokeWidth=".4"/>
      {/* Stones */}
      <ellipse cx="-22" cy="18" rx="6" ry="3" fill="#5a5048"/>
      <ellipse cx="-22" cy="17" rx="6" ry="3" fill="#7a7064"/>
      <ellipse cx="22" cy="18" rx="4" ry="2.5" fill="#5a5048"/>
      <ellipse cx="22" cy="17" rx="4" ry="2.5" fill="#7a7064"/>
      <ellipse cx="14" cy="20" rx="3" ry="1.8" fill="#7a7064"/>
      {/* Koi pond */}
      <ellipse cx="20" cy="6" rx="14" ry="6" fill="#6db9c4"/>
      <ellipse cx="20" cy="6" rx="14" ry="6" fill="none" stroke="#fffaee" strokeWidth=".4" opacity=".7"/>
      <path d="M14 6 Q18 4 22 6 Q24 8 22 9 Q18 10 14 9 Z" fill="#e07ec3" opacity=".85"/>
      <circle cx="24" cy="4" r="1.4" fill="#fffaee" opacity=".7"/>
      <path d="M10 8 Q14 7 18 8" stroke="#fffaee" strokeWidth=".4" fill="none" opacity=".7"/>
      {/* Cherry tree */}
      <g transform="translate(-14, -8)">
        <rect x="-1.5" y="0" width="3" height="14" fill="#3a2410"/>
        <ellipse cx="0" cy="-2" rx="10" ry="10" fill="#e07ec3"/>
        <ellipse cx="-5" cy="-5" rx="5" ry="5" fill="#f0a5d3"/>
        <ellipse cx="6" cy="-4" rx="5" ry="5" fill="#f0a5d3"/>
        {/* Petals falling */}
        <circle cx="-12" cy="6" r=".8" fill="#f0a5d3"/>
        <circle cx="12" cy="10" r=".8" fill="#f0a5d3"/>
        <circle cx="-6" cy="14" r=".7" fill="#e07ec3"/>
      </g>
      {/* Bench + journal */}
      <g transform="translate(0, 4)">
        <rect x="-10" y="0" width="20" height="2.5" fill="#5a3a18"/>
        <rect x="-9" y="2.5" width="2" height="4" fill="#3a2410"/>
        <rect x="7" y="2.5" width="2" height="4" fill="#3a2410"/>
        {/* Journal */}
        <rect x="-3" y="-3" width="6" height="4" fill="#f6f1e4" stroke="#1a1410" strokeWidth=".3"/>
        <line x1="0" y1="-3" x2="0" y2="1" stroke="#5a4a3e" strokeWidth=".3"/>
        {/* Glow */}
        <circle cx="0" cy="-1" r="4" fill="#f5d97a" opacity=".4"/>
      </g>
    </g>
  );
}

// ─── 12. HEATMAP GARDEN ─────────────────────────────────────────────────
function HeatmapGarden({ tod }) {
  return (
    <g>
      <CastShadow rx="38" ry="9" dy="20"/>
      {/* Soil bed */}
      <rect x="-38" y="-4" width="76" height="26" fill="#5a4a30"/>
      <rect x="-38" y="-4" width="76" height="3" fill="#3a2a1e"/>
      {/* Grass border */}
      <rect x="-38" y="-4" width="76" height="2" fill="#5a9558"/>
      {/* Heatmap flowers — soccer pitch layout */}
      {(() => {
        const dots = [];
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 11; c++) {
            const x = -34 + c * 6.8;
            const y = -1 + r * 6;
            const cx0 = 0, cy0 = 10;
            const d = Math.hypot(x - cx0, y - cy0);
            const hot = Math.max(0, 1 - d / 22);
            const hue = 220 - hot * 220;
            const sat = 70 + hot * 20;
            const lite = 60 - hot * 10;
            dots.push(<g key={`${r}-${c}`}>
              <circle cx={x} cy={y + 2} r={1.4 + hot * 1.4} fill="rgba(0,0,0,.25)"/>
              <circle cx={x} cy={y} r={1.4 + hot * 1.6} fill={`hsl(${hue}, ${sat}%, ${lite}%)`}/>
              <circle cx={x} cy={y} r={1.4 + hot * 1.6} fill={`hsl(${hue}, ${sat}%, ${lite + 12}%)`} opacity=".55"/>
            </g>);
          }
        }
        return dots;
      })()}
      {/* Soccer ball pedestal at center */}
      <rect x="-4" y="10" width="8" height="4" fill="#857a5a"/>
      <circle cx="0" cy="8" r="3.4" fill="#fffaee" stroke="#1a1410" strokeWidth=".5"/>
      <path d="M-2 6 L0 7 L2 6 L1.5 9 L-1.5 9 Z" fill="#1a1410"/>
      {/* Floating ORIS placard */}
      <g transform="translate(0, -22)">
        <rect x="-14" y="-6" width="28" height="10" fill="rgba(15,30,40,.85)" stroke="#6fd5e0" strokeWidth=".4"/>
        <text x="0" y="-1" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fontWeight="700" fill="#94e2c0">ORIS · 0.84</text>
        <text x="0" y="3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="2.8" fill="#6fd5e0">off-ball impact</text>
      </g>
      {/* Sign post */}
      <rect x="32" y="6" width="2" height="14" fill="#5a3a18"/>
      <rect x="28" y="2" width="10" height="5" fill="#f6f1e4" stroke="#1a1410" strokeWidth=".3"/>
      <text x="33" y="5.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="2.5" fontWeight="700" fill="#1a1410">xGenius</text>
    </g>
  );
}

// ─── 13. ROBOT'S WORKSHOP ───────────────────────────────────────────────
function RobotWorkshop({ tod }) {
  const lit = tod === 'night' ? 1 : .7;
  return (
    <g>
      <CastShadow rx="28" ry="8" dy="20"/>
      {/* Foundation */}
      <rect x="-26" y="14" width="52" height="6" fill="#5a4a30"/>
      {/* Right side wall */}
      <path d="M20 -10 L26 -6 L26 18 L20 18 Z" fill="#3a2410"/>
      {/* Body — weathered wood planks */}
      <rect x="-22" y="-10" width="42" height="28" fill="url(#wood-grad)"/>
      {[-18, -14, -10, -6, -2, 2, 6, 10, 14, 18].map(x => <line key={x} x1={x} y1="-10" x2={x} y2="18" stroke="#3a2410" strokeWidth=".4" opacity=".7"/>)}
      {/* Pitched roof */}
      <path d="M-26 -10 L-2 -28 L22 -10 Z" fill="#3a2410"/>
      <path d="M-26 -10 L-2 -28" stroke="#1a1410" strokeWidth=".8"/>
      <path d="M22 -10 L-2 -28" stroke="#1a1410" strokeWidth=".8"/>
      {/* Door (open) */}
      <rect x="-4" y="2" width="12" height="16" fill="#1a1410"/>
      <rect x="-3" y="3" width="10" height="14" fill="#f5d97a" opacity={lit * .85}/>
      {/* Workbench glimpse */}
      <rect x="-3" y="10" width="10" height="2" fill="#5a3a18"/>
      {/* Window */}
      <rect x="-18" y="-2" width="10" height="6" fill="#1a1410"/>
      <rect x="-17" y="-1" width="8" height="4" fill="#f5d97a" opacity={lit * .85}/>
      <line x1="-13" y1="-2" x2="-13" y2="4" stroke="#1a1410" strokeWidth=".5"/>
      {/* Solar panel on roof */}
      <rect x="-12" y="-22" width="14" height="6" fill="#0e1820" transform="skewX(-15)"/>
      <rect x="-11" y="-21" width="12" height="4" fill="#3a5a78" transform="skewX(-15)"/>
      {/* Litter robot outside */}
      <g transform="translate(-30, 12)">
        <rect x="-5" y="-4" width="10" height="6" fill="#c8bb95" stroke="#1a1410" strokeWidth=".5"/>
        <rect x="-4" y="-6" width="8" height="3" fill="#6fd5e0"/>
        <rect x="-3" y="-5" width="6" height="1" fill="#94e2c0"/>
        <circle cx="-3" cy="3" r="1.6" fill="#1a1410"/>
        <circle cx="3" cy="3" r="1.6" fill="#1a1410"/>
        <line x1="0" y1="-4" x2="0" y2="-8" stroke="#1a1410" strokeWidth=".4"/>
        <circle cx="0" cy="-9" r=".7" fill="#e07ec3"/>
      </g>
      {/* Small flag of malaysia colors — abstracted */}
      <line x1="14" y1="-22" x2="14" y2="-12" stroke="#3a2410" strokeWidth=".6"/>
      <rect x="14" y="-22" width="8" height="5" fill="#f5d97a"/>
    </g>
  );
}

// ─── BUILDING REGISTRY ──────────────────────────────────────────────────

const BUILDING_ART = {
  updt: UPDTStadium,
  rmaict: RMAICTTower,
  pong: PongFrat,
  edu: CollegiateTower,
  about: PetronasTowers,
  forge: Forge,
  lighthouse: Lighthouse,
  qard: QardGreenhouse,
  football: AthleticStadium,
  archive: WhisperingArchive,
  zen: ZenGarden,
  heatmap: HeatmapGarden,
  workshop: RobotWorkshop,
};

function BuildingArt({ id, tod }) {
  const Cmp = BUILDING_ART[id];
  if (!Cmp) return null;
  return <Cmp tod={tod} />;
}

// ─── PAINTERLY GROUND HELPERS ───────────────────────────────────────────

function GrassPatch({ cx, cy, rx, ry, seed = 0 }) {
  // A subtle painterly patch — slightly different green than the base.
  const tones = ['#7eb86a', '#5a9558', '#a8d49f', '#4a8a48'];
  const fill = tones[seed % tones.length];
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} opacity={.35 + (seed % 3) * .1}/>;
}

function LushTree({ cx, cy, seed = 0 }) {
  const variants = [
    // Round oak
    { canopy: [{ r: 12, dx: 0, dy: -2, c: '#5a9558' }, { r: 9, dx: -5, dy: -7, c: '#4a8a48' }, { r: 8, dx: 6, dy: -5, c: '#7eb86a' }] },
    // Cypress-ish (taller)
    { canopy: [{ r: 8, dx: 0, dy: -4, c: '#3e6a3c' }, { r: 6, dx: -3, dy: -10, c: '#5a9558' }, { r: 5, dx: 3, dy: -14, c: '#4a8a48' }] },
    // Wide
    { canopy: [{ r: 10, dx: -6, dy: 0, c: '#5a9558' }, { r: 11, dx: 5, dy: -2, c: '#4a8a48' }, { r: 7, dx: 0, dy: -8, c: '#7eb86a' }] },
  ];
  const v = variants[seed % variants.length];
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx="2" cy="8" rx="9" ry="3" fill="rgba(0,0,0,.25)"/>
      <rect x="-1.2" y="-2" width="2.4" height="10" fill="#3a2410"/>
      {v.canopy.map((c, i) => <ellipse key={i} cx={c.dx} cy={c.dy} rx={c.r} ry={c.r * .95} fill={c.c}/>)}
      {/* Specular */}
      <ellipse cx={v.canopy[0].dx - v.canopy[0].r * .4} cy={v.canopy[0].dy - v.canopy[0].r * .4} rx={v.canopy[0].r * .3} ry={v.canopy[0].r * .25} fill="#a8d49f" opacity=".6"/>
    </g>
  );
}

function FlowerSprinkle({ x, y, c = '#f5d97a' }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="1.6" fill={c}/>
      <circle r=".7" fill="#fffaee" opacity=".7"/>
    </g>
  );
}

function Lantern({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="-12" stroke="#3a2410" strokeWidth="1.4"/>
      <rect x="-2.5" y="-12" width="5" height="1" fill="#3a2410"/>
      <path d="M-3.5 -12 L3.5 -12 L2.8 -8 L-2.8 -8 Z" fill="#5a3a18"/>
      <rect x="-2.5" y="-8" width="5" height="4" fill="#f5d97a"/>
      <rect x="-3" y="-4" width="6" height="1" fill="#3a2410"/>
      <circle r="6" fill="#f5d97a" opacity=".2" cy="-6"/>
    </g>
  );
}

Object.assign(window, {
  BuildingDefs, BuildingArt, BUILDING_ART,
  GrassPatch, LushTree, FlowerSprinkle, Lantern, CastShadow,
});
