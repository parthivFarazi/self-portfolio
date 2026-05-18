// elevations.jsx — Architectural-scale building elevations.
// Anchor: (0, 0) = ground line at center of building.
// Building extends upward (negative y) and outward (±x).
// Avatar reference height = ~90px (one floor ≈ 50px).

function ElevationDefs() {
  return (
    <defs>
      {/* Ground shadow */}
      <filter id="grd-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6"/>
        <feComponentTransfer><feFuncA type="linear" slope=".75"/></feComponentTransfer>
      </filter>
      {/* Brick gradient — Tech Tower / DU base */}
      <linearGradient id="elev-brick" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bc6048"/>
        <stop offset="40%" stopColor="#a8553c"/>
        <stop offset="100%" stopColor="#7a3a28"/>
      </linearGradient>
      <pattern id="elev-brick-pat" x="0" y="0" width="22" height="9" patternUnits="userSpaceOnUse">
        <rect width="22" height="9" fill="transparent"/>
        <line x1="0" y1="4.5" x2="22" y2="4.5" stroke="rgba(60,30,18,.45)" strokeWidth=".8"/>
        <line x1="11" y1="0" x2="11" y2="4.5" stroke="rgba(60,30,18,.45)" strokeWidth=".8"/>
        <line x1="0" y1="4.5" x2="0" y2="9" stroke="rgba(60,30,18,.45)" strokeWidth=".8"/>
        <rect width="22" height="9" fill="rgba(255,255,255,.04)"/>
      </pattern>
      {/* Stone trim */}
      <linearGradient id="elev-stone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffaee"/>
        <stop offset="100%" stopColor="#d8cfb8"/>
      </linearGradient>
      {/* Window glow */}
      <radialGradient id="elev-window-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff1c8"/>
        <stop offset="100%" stopColor="#f5d97a" stopOpacity="0"/>
      </radialGradient>
      {/* Silver glass for Petronas */}
      <linearGradient id="elev-silver" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8eef2"/>
        <stop offset="30%" stopColor="#c0ccd4"/>
        <stop offset="70%" stopColor="#8a98a4"/>
        <stop offset="100%" stopColor="#4a5662"/>
      </linearGradient>
      <linearGradient id="elev-silver-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a8b4bc"/>
        <stop offset="100%" stopColor="#3a4652"/>
      </linearGradient>
      {/* Cyan glass for futurist */}
      <linearGradient id="elev-glass-cyan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dff4f7"/>
        <stop offset="40%" stopColor="#a8d8e0"/>
        <stop offset="100%" stopColor="#3a6a78"/>
      </linearGradient>
      {/* Mint glass */}
      <linearGradient id="elev-glass-mint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dcf3e6"/>
        <stop offset="50%" stopColor="#94d4b8"/>
        <stop offset="100%" stopColor="#3a7a64"/>
      </linearGradient>
      {/* Slate roof */}
      <linearGradient id="elev-slate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a5258"/>
        <stop offset="100%" stopColor="#262a2e"/>
      </linearGradient>
      {/* White siding */}
      <linearGradient id="elev-white" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffaee"/>
        <stop offset="100%" stopColor="#c8bea5"/>
      </linearGradient>
      {/* Wood */}
      <linearGradient id="elev-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a5234"/>
        <stop offset="100%" stopColor="#3a2410"/>
      </linearGradient>
      {/* Holo pitch */}
      <radialGradient id="elev-holo" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#94e2c0" stopOpacity=".95"/>
        <stop offset="100%" stopColor="#6fd5e0" stopOpacity=".5"/>
      </radialGradient>
    </defs>
  );
}

// Shared helpers ───────────────────────────────────────────────────────

function GroundShadow({ rx = 80, ry = 12 }) {
  return <ellipse cx="0" cy="6" rx={rx} ry={ry} fill="rgba(0,0,0,.4)" filter="url(#grd-shadow)"/>;
}

// Window — simple lit rect
function W({ x, y, w, h, lit, color = '#f5d97a' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#1a1410"/>
      <rect x={x + .5} y={y + .5} width={w - 1} height={h - 1} fill={color} opacity={lit}/>
    </g>
  );
}

// Arched window
function ArchW({ x, y, w, h, lit }) {
  const r = w / 2;
  return (
    <g>
      <rect x={x} y={y + r} width={w} height={h - r} fill="#fffaee"/>
      <rect x={x + 2} y={y + r} width={w - 4} height={h - r} fill="#0e1820"/>
      <path d={`M${x} ${y + r} Q${x} ${y} ${x + r} ${y} Q${x + w} ${y} ${x + w} ${y + r} Z`} fill="#fffaee"/>
      <path d={`M${x + 2} ${y + r} Q${x + 2} ${y + 2} ${x + r} ${y + 2} Q${x + w - 2} ${y + 2} ${x + w - 2} ${y + r} Z`} fill="#0e1820"/>
      <rect x={x + 2} y={y + r} width={w - 4} height={h - r} fill="#f5d97a" opacity={lit * .9}/>
      <path d={`M${x + 2} ${y + r} Q${x + 2} ${y + 2} ${x + r} ${y + 2} Q${x + w - 2} ${y + 2} ${x + w - 2} ${y + r} Z`} fill="#f5d97a" opacity={lit * .9}/>
      <line x1={x + r} y1={y + 2} x2={x + r} y2={y + h} stroke="#fffaee" strokeWidth=".7"/>
      <line x1={x + 2} y1={y + r + (h - r) / 2} x2={x + w - 2} y2={y + r + (h - r) / 2} stroke="#fffaee" strokeWidth=".5"/>
    </g>
  );
}

function ElevDoor({ x, y, w, h, lit, kind = 'wood' }) {
  // y = ground line top of door's bottom (so door extends from y-h up to y)
  return (
    <g transform={`translate(${x}, ${y - h})`}>
      <rect width={w} height={h} fill={kind === 'wood' ? '#3a2410' : '#1a1410'}/>
      <rect width={w} height="3" fill="#5a4a3e"/>
      <rect x="1.5" y="1.5" width={w - 3} height={h - 4} fill={kind === 'glass' ? '#94e2c0' : '#5a3a18'} opacity={lit * .85}/>
      {kind === 'wood' && <line x1={w / 2} y1="3" x2={w / 2} y2={h - 1} stroke="#1a1410" strokeWidth=".5"/>}
      {/* knob */}
      <circle cx={kind === 'wood' ? w - 4 : w / 2 + 4} cy={h / 2 + 4} r="1" fill="#b3a369"/>
    </g>
  );
}

// ─── 1. PETRONAS TWIN TOWERS ────────────────────────────────────────────
// Two tapered silver shafts, stepped setbacks, double-deck sky bridge,
// tall slender pinnacles. Scale: ~720px tall total.
function PetronasTowers({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .8 : .55;
  return (
    <g>
      <GroundShadow rx="140" ry="14"/>
      {/* Plaza base */}
      <rect x="-130" y="-20" width="260" height="20" fill="#c8bb95"/>
      <rect x="-130" y="-20" width="260" height="4" fill="#fffaee"/>
      {/* Plaza fountain */}
      <ellipse cx="0" cy="-8" rx="22" ry="5" fill="#6db9c4"/>
      <ellipse cx="0" cy="-9" rx="20" ry="4" fill="#9ed6dd"/>
      <circle cx="0" cy="-11" r="2" fill="#fffaee"/>
      <PetronasSingleTower x={-70} tod={tod}/>
      <PetronasSingleTower x={70} tod={tod}/>
      {/* Double-decker sky bridge at floor 41-42 (~y=-380) */}
      <g transform="translate(0, -380)">
        {/* Upper deck */}
        <rect x="-50" y="-12" width="100" height="9" fill="#3a4652"/>
        <rect x="-50" y="-12" width="100" height="2" fill="#a8b4bc"/>
        {/* Strut V's beneath */}
        <path d="M-30 -3 L0 16 L30 -3 L0 -3 Z" fill="#3a4652"/>
        <path d="M-30 -3 L0 16 L30 -3 L0 -3 Z" fill="none" stroke="#262a2e" strokeWidth=".6"/>
        {/* Lower deck */}
        <rect x="-50" y="3" width="100" height="6" fill="#4a5662"/>
        <rect x="-50" y="3" width="100" height="1.5" fill="#c0ccd4"/>
        {/* Sky-bridge glow tubes */}
        <rect x="-48" y="-10" width="96" height="2" fill="#fff1c8" opacity={lit * .9}/>
        <rect x="-48" y="4.5" width="96" height="1.5" fill="#fff1c8" opacity={lit * .9}/>
      </g>
    </g>
  );
}

function PetronasSingleTower({ x, tod }) {
  // Tower body: 4 stepped setbacks from y=0 to y=-580; pinnacle on top to y=-720
  const lit = tod === 'night' ? .9 : tod === 'dusk' ? .75 : .4;
  const SEGS = [
    // Each setback: [yTop, halfWidth]
    { y: 0,    hw: 32 },
    { y: -160, hw: 30 },
    { y: -260, hw: 26 },
    { y: -380, hw: 22 },
    { y: -500, hw: 18 },
    { y: -580, hw: 14 },
  ];
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Build sequential tapered body */}
      {SEGS.slice(0, -1).map((s, i) => {
        const next = SEGS[i + 1];
        // Trapezoidal segment (slight inward step at top)
        return (
          <g key={i}>
            <path d={`M${-s.hw} ${s.y} L${s.hw} ${s.y} L${next.hw} ${s.y - 4} L${-next.hw} ${s.y - 4} Z`} fill="#262a2e"/>
            <rect x={-s.hw} y={next.y} width={s.hw * 2} height={s.y - next.y} fill="url(#elev-silver)"/>
            {/* Vertical ribbing — every 6px to suggest faceted polygon plan */}
            {Array.from({ length: Math.floor((s.hw * 2) / 6) - 1 }).map((_, k) => (
              <line key={k} x1={-s.hw + 6 + k * 6} y1={next.y} x2={-s.hw + 6 + k * 6} y2={s.y} stroke="rgba(60,70,80,.3)" strokeWidth=".4"/>
            ))}
            {/* Window bands — thin horizontal slats every 8px */}
            {Array.from({ length: Math.floor((s.y - next.y) / 8) }).map((_, k) => (
              <g key={`w${k}`}>
                <rect x={-s.hw + 2} y={next.y + 4 + k * 8} width={s.hw * 2 - 4} height="3" fill="#0e1820"/>
                <rect x={-s.hw + 2} y={next.y + 4 + k * 8} width={s.hw * 2 - 4} height="3" fill="#f5d97a" opacity={lit * (.55 + (k % 3) * .12)}/>
              </g>
            ))}
            {/* Outer edge highlight (sun-facing right) */}
            <line x1={s.hw - .5} y1={next.y} x2={s.hw - .5} y2={s.y} stroke="#e8eef2" strokeWidth="1" opacity=".7"/>
            {/* Edge shadow (left) */}
            <line x1={-s.hw + .5} y1={next.y} x2={-s.hw + .5} y2={s.y} stroke="rgba(0,0,0,.4)" strokeWidth="1"/>
          </g>
        );
      })}
      {/* Crown — a stepped pagoda-like top */}
      <g>
        <rect x="-14" y="-600" width="28" height="22" fill="url(#elev-silver)"/>
        <rect x="-12" y="-616" width="24" height="16" fill="url(#elev-silver)"/>
        <rect x="-10" y="-630" width="20" height="14" fill="url(#elev-silver)"/>
        <rect x="-8" y="-642" width="16" height="12" fill="url(#elev-silver)"/>
        <rect x="-6" y="-652" width="12" height="10" fill="url(#elev-silver)"/>
        <line x1="-14" y1="-600" x2="-14" y2="-578" stroke="rgba(0,0,0,.4)" strokeWidth=".8"/>
      </g>
      {/* Tall slender pinnacle */}
      <line x1="0" y1="-652" x2="0" y2="-790" stroke="#262a2e" strokeWidth="3"/>
      <line x1="0" y1="-652" x2="0" y2="-790" stroke="#a8b4bc" strokeWidth=".8"/>
      {/* Pinnacle ball */}
      <circle cx="0" cy="-712" r="4" fill="#a8b4bc"/>
      <circle cx="0" cy="-712" r="4" fill="none" stroke="#262a2e" strokeWidth=".5"/>
      {/* Tip light */}
      <circle cx="0" cy="-790" r="2.5" fill="#f5d97a"/>
      <circle cx="0" cy="-790" r="5" fill="#f5d97a" opacity={lit * .5}/>
      {/* Door at base */}
      <ElevDoor x={-12} y={0} w={24} h={32} lit={lit + .1} kind="glass"/>
      {/* Tower nameplate */}
      <rect x="-22" y="-50" width="44" height="14" fill="#0e1820" opacity=".8"/>
      <text x="0" y="-39" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill="#a8b4bc" letterSpacing="1">KLCC</text>
    </g>
  );
}

// ─── 2. TECH TOWER ──────────────────────────────────────────────────────
// Red brick Victorian-era clock tower with gold "TECH" letters at top,
// slate pyramidal roof, white stone trim, flanking brick wings.
// Scale: ~520px total height.
function TechTower({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .5;
  return (
    <g>
      <GroundShadow rx="180" ry="14"/>
      {/* Sandstone foundation */}
      <rect x="-180" y="-22" width="360" height="22" fill="url(#elev-stone)"/>
      <rect x="-180" y="-22" width="360" height="4" fill="#fffaee"/>
      {/* Left wing — 2-story brick with gabled slate roof */}
      <g>
        <rect x="-160" y="-160" width="80" height="138" fill="url(#elev-brick)"/>
        <rect x="-160" y="-160" width="80" height="138" fill="url(#elev-brick-pat)"/>
        {/* Cornice */}
        <rect x="-164" y="-164" width="88" height="6" fill="url(#elev-stone)"/>
        <rect x="-164" y="-90" width="88" height="3" fill="url(#elev-stone)"/>
        {/* Slate gabled roof */}
        <path d="M-164 -160 L-120 -204 L-76 -160 Z" fill="url(#elev-slate)"/>
        <path d="M-164 -160 L-120 -204" stroke="#a8b4bc" strokeWidth=".8"/>
        {/* Dormer in gable */}
        <rect x="-128" y="-186" width="16" height="14" fill="url(#elev-stone)"/>
        <rect x="-126" y="-184" width="12" height="11" fill="#0e1820"/>
        <rect x="-126" y="-184" width="12" height="11" fill="#f5d97a" opacity={lit * .9}/>
        {/* Upper floor arched windows */}
        {[-148, -130, -112, -94].map(x => <ArchW key={x} x={x} y={-150} w={14} h={26} lit={lit}/>)}
        {/* Lower floor rectangular windows */}
        {[-148, -130, -112, -94].map(x => <g key={`l${x}`}>
          <rect x={x - 1} y="-76" width="16" height="32" fill="#fffaee"/>
          <rect x={x + 1} y="-74" width="12" height="28" fill="#0e1820"/>
          <rect x={x + 1} y="-74" width="12" height="28" fill="#f5d97a" opacity={lit * .85}/>
          <line x1={x + 7} y1="-74" x2={x + 7} y2="-46" stroke="#fffaee" strokeWidth=".5"/>
          <line x1={x + 1} y1="-60" x2={x + 13} y2="-60" stroke="#fffaee" strokeWidth=".5"/>
        </g>)}
      </g>
      {/* Right wing — similar */}
      <g>
        <rect x="80" y="-160" width="80" height="138" fill="url(#elev-brick)"/>
        <rect x="80" y="-160" width="80" height="138" fill="url(#elev-brick-pat)"/>
        <rect x="76" y="-164" width="88" height="6" fill="url(#elev-stone)"/>
        <rect x="76" y="-90" width="88" height="3" fill="url(#elev-stone)"/>
        <path d="M76 -160 L120 -204 L164 -160 Z" fill="url(#elev-slate)"/>
        <path d="M164 -160 L120 -204" stroke="#a8b4bc" strokeWidth=".8"/>
        <rect x="112" y="-186" width="16" height="14" fill="url(#elev-stone)"/>
        <rect x="114" y="-184" width="12" height="11" fill="#0e1820"/>
        <rect x="114" y="-184" width="12" height="11" fill="#f5d97a" opacity={lit * .9}/>
        {[88, 106, 124, 142].map(x => <ArchW key={x} x={x} y={-150} w={14} h={26} lit={lit}/>)}
        {[88, 106, 124, 142].map(x => <g key={`l${x}`}>
          <rect x={x - 1} y="-76" width="16" height="32" fill="#fffaee"/>
          <rect x={x + 1} y="-74" width="12" height="28" fill="#0e1820"/>
          <rect x={x + 1} y="-74" width="12" height="28" fill="#f5d97a" opacity={lit * .85}/>
          <line x1={x + 7} y1="-74" x2={x + 7} y2="-46" stroke="#fffaee" strokeWidth=".5"/>
          <line x1={x + 1} y1="-60" x2={x + 13} y2="-60" stroke="#fffaee" strokeWidth=".5"/>
        </g>)}
      </g>
      {/* Central tower — 5 stories */}
      <g>
        {/* Tower body */}
        <rect x="-50" y="-380" width="100" height="380" fill="url(#elev-brick)"/>
        <rect x="-50" y="-380" width="100" height="380" fill="url(#elev-brick-pat)"/>
        {/* Edge highlight (sun on right) */}
        <rect x="46" y="-380" width="4" height="380" fill="rgba(0,0,0,.18)"/>
        <rect x="-50" y="-380" width="3" height="380" fill="rgba(255,255,255,.1)"/>
        {/* Floor course bands */}
        {[-360, -290, -220, -150, -80].map(y => <g key={y}>
          <rect x="-54" y={y} width="108" height="4" fill="url(#elev-stone)"/>
          <rect x="-54" y={y + 4} width="108" height="1" fill="rgba(0,0,0,.2)"/>
        </g>)}
        {/* Top tier with gold "TECH" letters */}
        <rect x="-58" y="-380" width="116" height="56" fill="url(#elev-brick)"/>
        <rect x="-58" y="-380" width="116" height="56" fill="url(#elev-brick-pat)"/>
        <rect x="-58" y="-380" width="116" height="6" fill="url(#elev-stone)"/>
        <rect x="-58" y="-324" width="116" height="3" fill="url(#elev-stone)"/>
        {/* TECH letters — channel-lit gold */}
        <g transform="translate(0, -358)">
          <rect x="-50" y="-12" width="100" height="24" fill="rgba(0,0,0,.3)"/>
          {['T', 'E', 'C', 'H'].map((ch, i) => (
            <g key={ch}>
              <text x={-37 + i * 24} y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="900" fill="#1a1410" stroke="#1a1410" strokeWidth="2.5">{ch}</text>
              <text x={-37 + i * 24} y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="900" fill="#d4b94a">{ch}</text>
              <text x={-37 + i * 24} y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="900" fill="#fff1c8" opacity={lit * .85}>{ch}</text>
            </g>
          ))}
          {/* Letter glow */}
          {tod !== 'golden' && <ellipse cx="0" cy="0" rx="60" ry="20" fill="#f5d97a" opacity={lit * .25}/>}
        </g>
        {/* Pyramidal slate roof */}
        <path d="M-58 -380 L0 -460 L58 -380 Z" fill="url(#elev-slate)"/>
        <path d="M0 -460 L58 -380" stroke="#a8b4bc" strokeWidth="1"/>
        {/* Roof texture — slate course lines */}
        {[-440, -420, -400].map((y, i) => {
          const w = 58 - (-y - 380) * 58 / 80;
          return <g key={y}>
            <line x1={-w} y1={y} x2={w} y2={y} stroke="rgba(0,0,0,.3)" strokeWidth=".5"/>
          </g>;
        })}
        {/* Decorative corner pinnacles */}
        <rect x="-62" y="-394" width="6" height="14" fill="url(#elev-stone)"/>
        <path d="M-62 -394 L-59 -402 L-56 -394 Z" fill="url(#elev-stone)"/>
        <rect x="56" y="-394" width="6" height="14" fill="url(#elev-stone)"/>
        <path d="M56 -394 L59 -402 L62 -394 Z" fill="url(#elev-stone)"/>
        {/* Spire and finial */}
        <line x1="0" y1="-460" x2="0" y2="-500" stroke="#262a2e" strokeWidth="2.5"/>
        <circle cx="0" cy="-484" r="3" fill="#b3a369"/>
        <path d="M-3 -498 L0 -510 L3 -498 Z" fill="#b3a369"/>
        {/* Clock face on tower */}
        <circle cx="0" cy="-258" r="22" fill="url(#elev-stone)" stroke="#1a1410" strokeWidth="1.4"/>
        <circle cx="0" cy="-258" r="20" fill="#fffaee"/>
        <circle cx="0" cy="-258" r="20" fill="none" stroke="#5a4a3e" strokeWidth=".5"/>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
          const rad = (a - 90) * Math.PI / 180;
          const x1 = Math.cos(rad) * 18, y1 = Math.sin(rad) * 18 - 258;
          const x2 = Math.cos(rad) * 20, y2 = Math.sin(rad) * 20 - 258;
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1410" strokeWidth={a % 90 === 0 ? "1.4" : ".7"}/>;
        })}
        <line x1="0" y1="-258" x2="0" y2="-272" stroke="#1a1410" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="0" y1="-258" x2="9" y2="-254" stroke="#1a1410" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="0" cy="-258" r="1.6" fill="#1a1410"/>
        {/* Arched windows below clock */}
        {[-180, -100].map(y => <g key={y}>
          <ArchW x={-32} y={y - 26} w={20} h={36} lit={lit}/>
          <ArchW x={12} y={y - 26} w={20} h={36} lit={lit}/>
        </g>)}
        {/* Grand front door */}
        <path d="M-18 0 L-18 -50 Q-18 -64 0 -64 Q18 -64 18 -50 L18 0 Z" fill="#3a2410"/>
        <path d="M-15 -2 L-15 -50 Q-15 -62 0 -62 Q15 -62 15 -50 L15 -2 Z" fill="#5a3a18"/>
        <path d="M-15 -2 L-15 -50 Q-15 -62 0 -62 Q15 -62 15 -50 L15 -2 Z" fill="#f5d97a" opacity={lit * .7}/>
        <line x1="0" y1="-62" x2="0" y2="-2" stroke="#3a2410" strokeWidth="1"/>
        {/* Stone door surround */}
        <path d="M-22 0 L-22 -50 Q-22 -68 0 -68 Q22 -68 22 -50 L22 0" stroke="url(#elev-stone)" strokeWidth="4" fill="none"/>
        {/* Step */}
        <rect x="-30" y="-2" width="60" height="3" fill="url(#elev-stone)"/>
        <rect x="-32" y="0" width="64" height="3" fill="url(#elev-stone)"/>
      </g>
    </g>
  );
}

// ─── 3. DELTA UPSILON HOUSE ─────────────────────────────────────────────
// Red brick 2-story Greek revival fraternity house with white columns,
// front porch, gable above porch with ΔΥ letters, brick base.
// Scale: ~240px tall.
function DeltaUpsilon({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .55;
  return (
    <g>
      <GroundShadow rx="200" ry="14"/>
      {/* Yard */}
      <rect x="-220" y="-2" width="440" height="4" fill="#5a9558"/>
      {/* Brick foundation base */}
      <rect x="-200" y="-30" width="400" height="32" fill="#7a3a28"/>
      <rect x="-200" y="-30" width="400" height="32" fill="url(#elev-brick-pat)"/>
      {/* Main facade — 2 stories of brick */}
      <rect x="-180" y="-180" width="360" height="150" fill="url(#elev-brick)"/>
      <rect x="-180" y="-180" width="360" height="150" fill="url(#elev-brick-pat)"/>
      {/* White trim band between floors */}
      <rect x="-184" y="-110" width="368" height="4" fill="url(#elev-white)"/>
      {/* White trim at top */}
      <rect x="-184" y="-184" width="368" height="6" fill="url(#elev-white)"/>
      {/* Gable roof */}
      <path d="M-184 -180 L0 -240 L184 -180 Z" fill="url(#elev-slate)" opacity=".88"/>
      <path d="M-184 -180 L0 -240" stroke="#a8b4bc" strokeWidth=".8"/>
      <path d="M184 -180 L0 -240" stroke="#262a2e" strokeWidth=".8"/>
      {/* White pediment (the triangle is partially white) */}
      <path d="M-100 -210 L0 -240 L100 -210 L80 -210 L0 -232 L-80 -210 Z" fill="url(#elev-white)"/>
      {/* ΔΥ on pediment */}
      <text x="0" y="-217" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#1f3a6e">ΔΥ</text>
      {/* Chimney */}
      <rect x="100" y="-228" width="22" height="48" fill="#7a3a28"/>
      <rect x="100" y="-228" width="22" height="48" fill="url(#elev-brick-pat)"/>
      <rect x="96" y="-228" width="30" height="6" fill="#5a2a1c"/>
      {/* Upper floor windows */}
      {[-150, -100, -50, 0, 50, 100, 150].map(x => <g key={`u${x}`}>
        <rect x={x - 10} y="-172" width="20" height="40" fill="url(#elev-stone)"/>
        <rect x={x - 8} y="-170" width="16" height="36" fill="#0e1820"/>
        <rect x={x - 8} y="-170" width="16" height="36" fill="#f5d97a" opacity={lit * .85}/>
        <line x1={x} y1="-170" x2={x} y2="-134" stroke="#fffaee" strokeWidth=".5"/>
        <line x1={x - 8} y1="-152" x2={x + 8} y2="-152" stroke="#fffaee" strokeWidth=".5"/>
        {/* Shutter */}
        <rect x={x - 14} y="-170" width="3" height="36" fill="#1f3a4a"/>
        <rect x={x + 11} y="-170" width="3" height="36" fill="#1f3a4a"/>
      </g>)}
      {/* Front-porch roof (extending out from facade) */}
      <rect x="-120" y="-110" width="240" height="6" fill="url(#elev-white)"/>
      <rect x="-122" y="-104" width="244" height="3" fill="rgba(0,0,0,.25)"/>
      {/* Porch ceiling */}
      <rect x="-118" y="-104" width="236" height="2" fill="#f6f1e4" opacity=".7"/>
      {/* White columns — 4 of them */}
      {[-90, -30, 30, 90].map(x => <g key={x}>
        <rect x={x - 5} y="-110" width="10" height="80" fill="url(#elev-white)"/>
        <rect x={x - 5} y="-110" width="10" height="3" fill="#fffaee"/>
        <rect x={x - 7} y="-32" width="14" height="4" fill="#fffaee"/>
        <rect x={x - 7} y="-30" width="14" height="2" fill="rgba(0,0,0,.25)"/>
        {/* Fluting line */}
        <line x1={x - 2} y1="-110" x2={x - 2} y2="-32" stroke="rgba(0,0,0,.15)" strokeWidth=".5"/>
        <line x1={x + 2} y1="-110" x2={x + 2} y2="-32" stroke="rgba(0,0,0,.15)" strokeWidth=".5"/>
      </g>)}
      {/* Porch railing between columns (white spindles) */}
      {[-90, -30, 30, 90].map((x, i) => {
        if (i === 3) return null;
        const next = [-30, 30, 90][i];
        return <g key={`r${i}`}>
          <rect x={x + 6} y="-52" width={next - x - 12} height="3" fill="url(#elev-white)"/>
          <rect x={x + 6} y="-32" width={next - x - 12} height="3" fill="url(#elev-white)"/>
          {Array.from({ length: 8 }).map((_, k) => {
            const sx = x + 8 + k * ((next - x - 16) / 7);
            return <rect key={k} x={sx} y="-50" width="1.5" height="18" fill="url(#elev-white)"/>;
          })}
        </g>;
      })}
      {/* Front door */}
      <g transform="translate(0, 0)">
        <rect x="-14" y="-86" width="28" height="56" fill="url(#elev-white)"/>
        <rect x="-12" y="-84" width="24" height="52" fill="#1f3a4a"/>
        <rect x="-12" y="-84" width="24" height="52" fill="#f5d97a" opacity={lit * .65}/>
        <line x1="0" y1="-84" x2="0" y2="-32" stroke="#fffaee" strokeWidth=".5"/>
        <line x1="-12" y1="-68" x2="12" y2="-68" stroke="#fffaee" strokeWidth=".5"/>
        <line x1="-12" y1="-52" x2="12" y2="-52" stroke="#fffaee" strokeWidth=".5"/>
        {/* Door knob */}
        <circle cx="8" cy="-58" r="1.5" fill="#b3a369"/>
        {/* Transom above door */}
        <rect x="-16" y="-92" width="32" height="6" fill="#0e1820"/>
        <rect x="-16" y="-92" width="32" height="6" fill="#f5d97a" opacity={lit * .8}/>
      </g>
      {/* Welcome mat — ΔΥ */}
      <rect x="-16" y="-30" width="32" height="6" fill="#1f3a4a"/>
      <text x="0" y="-25" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5" fontWeight="700" fill="#fffaee">ΔΥ</text>
      {/* Steps from porch to ground */}
      <rect x="-30" y="-28" width="60" height="5" fill="url(#elev-white)"/>
      <rect x="-30" y="-23" width="60" height="2" fill="rgba(0,0,0,.25)"/>
      <rect x="-34" y="-21" width="68" height="5" fill="url(#elev-white)"/>
      <rect x="-34" y="-16" width="68" height="2" fill="rgba(0,0,0,.25)"/>
      <rect x="-38" y="-14" width="76" height="5" fill="url(#elev-white)"/>
      <rect x="-38" y="-9" width="76" height="2" fill="rgba(0,0,0,.25)"/>
      <rect x="-42" y="-7" width="84" height="6" fill="url(#elev-white)"/>
      {/* Solo cups on porch railing */}
      {[-78, -64, -48, 48, 64, 78].map((x, i) => <g key={i} transform={`translate(${x}, -56)`}>
        <path d="M-2.5 0 L2.5 0 L2 4 L-2 4 Z" fill="#d8362a"/>
        <ellipse cx="0" cy="0" rx="2.5" ry=".6" fill="#a01a14"/>
      </g>)}
      {/* Greek-letter house sign hanging from porch */}
      <line x1="-50" y1="-104" x2="-50" y2="-94" stroke="#2a2520" strokeWidth=".8"/>
      <line x1="-30" y1="-104" x2="-30" y2="-94" stroke="#2a2520" strokeWidth=".8"/>
      <rect x="-52" y="-94" width="24" height="12" fill="url(#elev-wood)" stroke="#1a1410" strokeWidth=".5"/>
      <text x="-40" y="-85" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="700" fill="#fffaee">ΔΥ</text>
    </g>
  );
}

// ─── 4. UPDT STADIUM (XL) ───────────────────────────────────────────────
// Soccer stadium: visible green pitch, full markings, tiered stands,
// curving cantilevered roof, scoreboard, floodlight pylons, drones.
// Scale: ~360px tall x ~760px wide.
function UPDTStadiumXL({ tod }) {
  const lit = tod === 'night' ? 1 : tod === 'dusk' ? .85 : .55;
  const pitchLit = tod === 'night' ? 1 : .9;
  return (
    <g>
      <GroundShadow rx="380" ry="22"/>
      {/* Concrete plaza */}
      <rect x="-400" y="-12" width="800" height="14" fill="#c8bb95"/>
      <rect x="-400" y="-12" width="800" height="3" fill="#fffaee"/>

      {/* Outer concrete bowl (back, dark) */}
      <path d="M-360 -260 Q-360 -310 0 -320 Q360 -310 360 -260 L360 -12 L-360 -12 Z" fill="#3a4652"/>
      {/* Concrete ribs along bowl base */}
      {[-300, -210, -120, -30, 60, 150, 240, 330, -330, -250, -160, -70, 20, 110, 200, 290].slice(0, 12).map((x, i) => (
        <rect key={i} x={x} y="-12" width="6" height="32" fill="#262a2e" opacity=".5"/>
      ))}

      {/* MIDDLE TIER — bowl with visible seats (back rim only) */}
      <path d="M-340 -260 Q-340 -300 0 -310 Q340 -300 340 -260 L340 -210 L-340 -210 Z" fill="#5a4a3e"/>
      {/* Tiered seating rows visible in upper deck */}
      {[-260, -250, -240, -230, -220].map((y, row) => (
        <g key={y}>
          <path d={`M-340 ${y} Q-340 ${y - 4} 0 ${y - 8} Q340 ${y - 4} 340 ${y}`} stroke="rgba(0,0,0,.35)" strokeWidth="1" fill="none"/>
          {/* Tiny seat dots scattered across upper tier */}
          {Array.from({ length: 60 }).map((_, i) => {
            const cx = -320 + i * 11;
            const cy = y - 2 - Math.abs(cx) * .015;
            return <circle key={i} cx={cx} cy={cy} r=".9" fill={['#d8362a', '#0e1820', '#94e2c0', '#f5d97a'][i % 4]} opacity=".7"/>;
          })}
        </g>
      ))}

      {/* The OPEN PITCH visible from the front — large green field */}
      {/* Pitch base */}
      <ellipse cx="0" cy="-100" rx="320" ry="100" fill="#3e6a3c"/>
      <ellipse cx="0" cy="-100" rx="316" ry="96" fill="#5a9558"/>
      {/* Stripe pattern (slightly darker bands) */}
      {[-260, -200, -140, -80, -20, 40, 100, 160, 220, 280].map(x => (
        <ellipse key={x} cx={x * .5} cy="-100" rx="32" ry="96" fill="#4f8b4f" opacity=".5"/>
      ))}
      {/* Pitch markings — perspective-foreshortened (ellipse arcs, not circles) */}
      {/* Outer touchline */}
      <ellipse cx="0" cy="-100" rx="300" ry="86" fill="none" stroke="#fffaee" strokeWidth="2.5"/>
      {/* Halfway line */}
      <line x1="0" y1="-186" x2="0" y2="-14" stroke="#fffaee" strokeWidth="2.5"/>
      {/* Center circle (ellipse for perspective) */}
      <ellipse cx="0" cy="-100" rx="46" ry="14" fill="none" stroke="#fffaee" strokeWidth="2.5"/>
      <circle cx="0" cy="-100" r="3" fill="#fffaee"/>
      {/* Left penalty box (perspective ellipse-arc) */}
      <path d="M-300 -150 L-220 -150 L-220 -50 L-300 -50" fill="none" stroke="#fffaee" strokeWidth="2.5"/>
      <path d="M-300 -130 L-250 -130 L-250 -70 L-300 -70" fill="none" stroke="#fffaee" strokeWidth="2"/>
      {/* Right penalty box */}
      <path d="M300 -150 L220 -150 L220 -50 L300 -50" fill="none" stroke="#fffaee" strokeWidth="2.5"/>
      <path d="M300 -130 L250 -130 L250 -70 L300 -70" fill="none" stroke="#fffaee" strokeWidth="2"/>
      {/* Penalty arcs */}
      <path d="M-220 -110 Q-202 -100 -220 -90" fill="none" stroke="#fffaee" strokeWidth="2"/>
      <path d="M220 -110 Q202 -100 220 -90" fill="none" stroke="#fffaee" strokeWidth="2"/>
      {/* Corner arcs */}
      <path d="M-300 -50 Q-294 -55 -290 -50" fill="none" stroke="#fffaee" strokeWidth="1.5"/>
      <path d="M-300 -150 Q-294 -145 -290 -150" fill="none" stroke="#fffaee" strokeWidth="1.5"/>
      <path d="M300 -50 Q294 -55 290 -50" fill="none" stroke="#fffaee" strokeWidth="1.5"/>
      <path d="M300 -150 Q294 -145 290 -150" fill="none" stroke="#fffaee" strokeWidth="1.5"/>
      {/* Goal posts + nets (perspective) */}
      <g>
        <rect x="-308" y="-118" width="6" height="36" fill="#fffaee"/>
        <rect x="-308" y="-118" width="22" height="2" fill="#fffaee"/>
        {/* Net pattern */}
        {[-300, -296, -292, -288].map(x => <line key={x} x1={x} y1="-118" x2={x} y2="-84" stroke="rgba(255,255,255,.4)" strokeWidth=".5"/>)}
        {[-114, -108, -102, -96, -90, -86].map(y => <line key={y} x1="-308" y1={y} x2="-286" y2={y} stroke="rgba(255,255,255,.4)" strokeWidth=".5"/>)}
      </g>
      <g>
        <rect x="302" y="-118" width="6" height="36" fill="#fffaee"/>
        <rect x="286" y="-118" width="22" height="2" fill="#fffaee"/>
        {[290, 294, 298, 302].map(x => <line key={x} x1={x} y1="-118" x2={x} y2="-84" stroke="rgba(255,255,255,.4)" strokeWidth=".5"/>)}
        {[-114, -108, -102, -96, -90, -86].map(y => <line key={y} x1="286" y1={y} x2="308" y2={y} stroke="rgba(255,255,255,.4)" strokeWidth=".5"/>)}
      </g>
      {/* Penalty spots */}
      <circle cx="-240" cy="-100" r="2" fill="#fffaee"/>
      <circle cx="240" cy="-100" r="2" fill="#fffaee"/>

      {/* Holographic ScoutPro overlays drifting over the pitch */}
      {[[-150, -110], [-80, -130], [-30, -100], [40, -120], [110, -90], [180, -110], [-180, -90]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill={i % 3 === 0 ? '#e07ec3' : '#6fd5e0'} opacity=".95"/>
          <circle cx={x} cy={y} r="9" fill={i % 3 === 0 ? '#e07ec3' : '#6fd5e0'} opacity=".3"/>
          <text x={x + 6} y={y - 2} fontFamily="JetBrains Mono,monospace" fontSize="6" fill={i % 3 === 0 ? '#e07ec3' : '#94e2c0'} opacity=".85">#{(i + 7) % 11 + 1}</text>
        </g>
      ))}
      {/* Passing network */}
      <g opacity=".85">
        <line x1="-150" y1="-110" x2="-30" y2="-100" stroke="#94e2c0" strokeWidth="1"/>
        <line x1="-30" y1="-100" x2="40" y2="-120" stroke="#94e2c0" strokeWidth="1"/>
        <line x1="40" y1="-120" x2="110" y2="-90" stroke="#94e2c0" strokeWidth="1"/>
        <line x1="110" y1="-90" x2="180" y2="-110" stroke="#e07ec3" strokeWidth="1" strokeDasharray="3 2"/>
      </g>

      {/* Front bowl barrier with mint glass top */}
      <path d="M-340 -200 Q-340 -212 0 -212 Q340 -212 340 -200 L340 -180 L-340 -180 Z" fill="#262a2e"/>
      <path d="M-340 -200 Q-340 -212 0 -212 Q340 -212 340 -200" stroke="#94e2c0" strokeWidth="1.5" fill="none"/>

      {/* SCOREBOARD — large, above pitch */}
      <g transform="translate(0, -270)">
        <rect x="-130" y="-28" width="260" height="52" rx="3" fill="#0a141c"/>
        <rect x="-130" y="-28" width="260" height="52" rx="3" fill="none" stroke="#6fd5e0" strokeWidth="1.5"/>
        {/* Brand bar */}
        <rect x="-130" y="-28" width="260" height="12" fill="#0e1820"/>
        <text x="-122" y="-18" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="700" fill="#94e2c0" letterSpacing="2">UPDT · LIVE</text>
        <text x="122" y="-18" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#6fd5e0" letterSpacing="1">MATCH · 24'</text>
        {/* Teams */}
        <text x="-90" y="6" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="14" fontWeight="900" fill="#fffaee">HOME</text>
        <text x="-30" y="14" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="32" fontWeight="900" fill="#f5d97a">2</text>
        <text x="0" y="10" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="14" fill="#6fd5e0">·</text>
        <text x="30" y="14" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="32" fontWeight="900" fill="#f5d97a">1</text>
        <text x="90" y="6" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="14" fontWeight="900" fill="#fffaee">AWAY</text>
        {/* xG bar tickers */}
        <rect x="-122" y="18" width="34" height="3" fill="#94e2c0" opacity=".8"/>
        <rect x="88" y="18" width="22" height="3" fill="#94e2c0" opacity=".5"/>
      </g>

      {/* Cantilevered curved roof */}
      <path d="M-360 -316 Q-360 -360 0 -370 Q360 -360 360 -316 L340 -300 Q0 -310 -340 -300 Z" fill="#262a2e"/>
      <path d="M-360 -316 Q-360 -360 0 -370 Q360 -360 360 -316" stroke="#a8b4bc" strokeWidth="2" fill="none"/>
      {/* Roof underside ribs */}
      {[-280, -200, -120, -40, 40, 120, 200, 280].map(x => (
        <line key={x} x1={x} y1="-300" x2={x * .85} y2="-360" stroke="#5a6a72" strokeWidth=".8"/>
      ))}
      {/* Roof front lip with running LED */}
      <rect x="-360" y="-322" width="720" height="3" fill="#6fd5e0" opacity={lit * .85}/>

      {/* Big UPDT signage centered above scoreboard, anchored to roof */}
      <g transform="translate(0, -340)">
        <rect x="-95" y="-22" width="190" height="32" rx="4" fill="#0e1820"/>
        <rect x="-95" y="-22" width="190" height="32" rx="4" fill="none" stroke="#94e2c0" strokeWidth="1.5"/>
        <text x="0" y="2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="24" fontWeight="900" fill="#94e2c0" letterSpacing="6">UPDT.</text>
        <text x="0" y="14" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5.5" fontWeight="600" fill="#6fd5e0" letterSpacing="4">UPDATE ANALYTICS</text>
      </g>

      {/* Floodlight pylons — 4 of them, soaring above the roof */}
      {[-300, -120, 120, 300].map(x => <g key={`fl${x}`}>
        <line x1={x} y1="-330" x2={x} y2="-420" stroke="#1a1410" strokeWidth="3"/>
        {/* Cross-truss */}
        <line x1={x - 4} y1="-380" x2={x + 4} y2="-380" stroke="#1a1410" strokeWidth="1"/>
        <line x1={x - 5} y1="-360" x2={x + 5} y2="-360" stroke="#1a1410" strokeWidth="1"/>
        {/* Light fixture */}
        <rect x={x - 22} y="-438" width="44" height="20" rx="2" fill="#1a1410"/>
        <rect x={x - 22} y="-438" width="44" height="3" fill="#3a3a3a"/>
        {/* Bulbs */}
        {[-16, -10, -4, 2, 8, 14].map(dx => <rect key={dx} x={x + dx} y="-432" width="4" height="10" fill="#fff1c8"/>)}
        <rect x={x - 22} y="-422" width="44" height="3" fill="#3a3a3a"/>
        {/* Light cone */}
        <path d={`M${x - 22} -422 L${x - 120} -180 L${x + 120} -180 L${x + 22} -422 Z`} fill="#fff1c8" opacity={lit * .22}/>
      </g>)}

      {/* Drones */}
      <UpdtDrone x={-220} y={-400}/>
      <UpdtDrone x={40} y={-420}/>
      <UpdtDrone x={240} y={-390}/>

      {/* Stadium entry concourse — 5 archways at ground level */}
      {[-220, -110, 0, 110, 220].map(x => <g key={`arch${x}`}>
        {/* Stone surround */}
        <path d={`M${x - 28} 0 L${x - 28} -54 Q${x - 28} -84 ${x} -84 Q${x + 28} -84 ${x + 28} -54 L${x + 28} 0 Z`} fill="#3a4652"/>
        {/* Tunnel */}
        <path d={`M${x - 22} -2 L${x - 22} -54 Q${x - 22} -78 ${x} -78 Q${x + 22} -78 ${x + 22} -54 L${x + 22} -2 Z`} fill="#0e1820"/>
        <path d={`M${x - 22} -2 L${x - 22} -54 Q${x - 22} -78 ${x} -78 Q${x + 22} -78 ${x + 22} -54 L${x + 22} -2 Z`} fill="#fff1c8" opacity={lit * .55}/>
        <path d={`M${x - 22} -2 L${x - 22} -54 Q${x - 22} -78 ${x} -78 Q${x + 22} -78 ${x + 22} -54 L${x + 22} -2 Z`} fill="url(#elev-window-glow)" opacity=".7"/>
        {/* Gate number */}
        <text x={x} y="-60" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#6fd5e0">G{([220, 110, 0, -110, -220].indexOf(x)) + 1}</text>
      </g>)}

      {/* Foreground crowd silhouettes — tiny heads peeking over the front barrier */}
      {Array.from({ length: 26 }).map((_, i) => {
        const cx = -316 + i * 24;
        const cy = -184 + (i % 2) * 2;
        return <g key={`fan${i}`}>
          <ellipse cx={cx} cy={cy} rx="6" ry="4" fill={['#a8553c', '#0e1820', '#f5d97a', '#fffaee', '#5a9558'][i % 5]} opacity=".85"/>
          <circle cx={cx} cy={cy - 4} r="3.5" fill={['#d9a779', '#8a6240', '#d9a779', '#a87856'][i % 4]}/>
        </g>;
      })}
    </g>
  );
}

function UpdtDrone({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-10" y="-2" width="20" height="4" fill="#2a2520"/>
      <line x1="-16" y1="-2" x2="16" y2="-2" stroke="#2a2520" strokeWidth="1.5"/>
      <circle cx="-16" cy="-2" r="4" fill="#6fd5e0" opacity=".85"/>
      <circle cx="16" cy="-2" r="4" fill="#6fd5e0" opacity=".85"/>
      <circle cx="-16" cy="-2" r="6" fill="#6fd5e0" opacity=".25"/>
      <circle cx="16" cy="-2" r="6" fill="#6fd5e0" opacity=".25"/>
      <circle cx="0" cy="8" r="2.5" fill="#e07ec3"/>
    </g>
  );
}

// ─── 5. RMAICT TOWER (XL) ───────────────────────────────────────────────
// Tall futurist glass-and-steel tower; Malaysian-pattern songket tilework
// base; tropical greenery; OCR scan beams visible.
// Scale: ~480px tall.
function RMAICTTowerXL({ tod }) {
  const lit = tod === 'night' ? .95 : tod === 'dusk' ? .85 : .55;
  return (
    <g>
      <GroundShadow rx="100" ry="14"/>
      {/* Concrete base */}
      <rect x="-100" y="-22" width="200" height="22" fill="#c8bb95"/>
      <rect x="-100" y="-22" width="200" height="4" fill="#fffaee"/>
      {/* Songket-patterned terracotta base — 2 stories */}
      <rect x="-90" y="-130" width="180" height="108" fill="#a8553c"/>
      <rect x="-90" y="-130" width="180" height="108" fill="url(#elev-brick-pat)" opacity=".5"/>
      <rect x="-94" y="-134" width="188" height="6" fill="#fffaee"/>
      {/* Songket diamond pattern bands */}
      {[-110, -90, -70, -50].map(y => <g key={y}>
        <line x1="-88" y1={y} x2="88" y2={y} stroke="#f5d97a" strokeWidth="1.2" opacity=".8"/>
        {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map(x => (
          <path key={x} d={`M${x - 6} ${y + 4} L${x} ${y + 1} L${x + 6} ${y + 4} L${x} ${y + 7} Z`} fill="#f5d97a" opacity=".7"/>
        ))}
      </g>)}
      {/* Tropical greenery climbing */}
      <g>
        <path d="M-88 -22 Q-86 -50 -80 -78 Q-84 -100 -78 -120" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
        <circle cx="-80" cy="-40" r="6" fill="#5a9558"/>
        <circle cx="-84" cy="-60" r="5" fill="#3e6a3c"/>
        <circle cx="-76" cy="-80" r="6" fill="#5a9558"/>
        <circle cx="-82" cy="-100" r="5" fill="#3e6a3c"/>
        <ellipse cx="-72" cy="-50" rx="6" ry="3" fill="#7eb86a"/>
        <ellipse cx="-70" cy="-90" rx="5" ry="2.5" fill="#7eb86a"/>
      </g>
      <g>
        <path d="M88 -22 Q86 -50 80 -78 Q84 -100 78 -120" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
        <circle cx="80" cy="-40" r="6" fill="#5a9558"/>
        <circle cx="84" cy="-60" r="5" fill="#3e6a3c"/>
        <circle cx="76" cy="-80" r="6" fill="#5a9558"/>
        <circle cx="82" cy="-100" r="5" fill="#3e6a3c"/>
        <ellipse cx="72" cy="-50" rx="6" ry="3" fill="#7eb86a"/>
        <ellipse cx="70" cy="-90" rx="5" ry="2.5" fill="#7eb86a"/>
      </g>
      {/* Amber lanterns at entry */}
      <ElevLantern x={-40} y={-30}/>
      <ElevLantern x={40} y={-30}/>
      {/* Grand glass door */}
      <ElevDoor x={-22} y={0} w={44} h={70} lit={lit + .2} kind="glass"/>
      {/* Glass tower shaft — 6 stories above base */}
      <g>
        <rect x="-70" y="-410" width="140" height="280" fill="url(#elev-glass-cyan)"/>
        {/* Vertical mullion lines */}
        {[-56, -42, -28, -14, 0, 14, 28, 42, 56].map(x => (
          <line key={x} x1={x} y1="-410" x2={x} y2="-130" stroke="rgba(20,40,60,.25)" strokeWidth=".6"/>
        ))}
        {/* Horizontal floor lines + windows */}
        {[-394, -354, -314, -274, -234, -194, -154].map((y, i) => <g key={y}>
          <rect x="-70" y={y} width="140" height="4" fill="#1a3a44"/>
          <rect x="-66" y={y + 4} width="132" height="28" fill="#0e1820"/>
          <rect x="-66" y={y + 4} width="132" height="28" fill="#f5d97a" opacity={lit * .8}/>
          {/* Window mullions */}
          {[-42, -14, 14, 42].map(x => (
            <rect key={x} x={x - 1} y={y + 4} width="2" height="28" fill="#1a3a44"/>
          ))}
        </g>)}
        {/* Edge highlight */}
        <rect x="64" y="-410" width="6" height="280" fill="rgba(255,255,255,.3)"/>
        <rect x="-70" y="-410" width="4" height="280" fill="rgba(0,0,0,.25)"/>
        {/* OCR scan beam */}
        <rect x="-70" y="-274" width="140" height="3" fill="#94e2c0" opacity=".85"/>
        <rect x="-70" y="-272" width="140" height="1" fill="#94e2c0" opacity=".4"/>
        <text x="0" y="-269" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fill="#0e1820" opacity=".7">SCAN · OCR</text>
      </g>
      {/* Roof */}
      <rect x="-74" y="-420" width="148" height="14" fill="#1a3a44"/>
      <rect x="-74" y="-420" width="148" height="3" fill="#3a6a78"/>
      {/* Antenna */}
      <line x1="0" y1="-420" x2="0" y2="-490" stroke="#1a1410" strokeWidth="2.5"/>
      <circle cx="0" cy="-490" r="4" fill="#e07ec3"/>
      <circle cx="0" cy="-490" r="8" fill="#e07ec3" opacity=".4"/>
      {/* Floating Donut neural diagram ghosted above roof */}
      <g transform="translate(0, -448)" opacity=".6">
        <ellipse cx="-24" cy="0" rx="6" ry="4" fill="none" stroke="#6fd5e0" strokeWidth="1"/>
        <ellipse cx="0" cy="-8" rx="6" ry="4" fill="none" stroke="#6fd5e0" strokeWidth="1"/>
        <ellipse cx="24" cy="0" rx="6" ry="4" fill="none" stroke="#6fd5e0" strokeWidth="1"/>
        <line x1="-18" y1="-2" x2="-6" y2="-6" stroke="#6fd5e0" strokeWidth=".6"/>
        <line x1="6" y1="-6" x2="18" y2="-2" stroke="#6fd5e0" strokeWidth=".6"/>
        <circle cx="-24" cy="0" r="1.5" fill="#94e2c0"/>
        <circle cx="0" cy="-8" r="1.5" fill="#94e2c0"/>
        <circle cx="24" cy="0" r="1.5" fill="#94e2c0"/>
      </g>
      {/* Tower nameplate */}
      <rect x="-44" y="-90" width="88" height="20" fill="#fffaee" stroke="#1a1410" strokeWidth=".7"/>
      <text x="0" y="-76" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#1a1410" letterSpacing="2">RMAICT</text>
    </g>
  );
}

function ElevLantern({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="-50" stroke="#2a2520" strokeWidth="2"/>
      <rect x="-6" y="-50" width="12" height="3" fill="#2a2520"/>
      <path d="M-9 -50 L9 -50 L7 -44 L-7 -44 Z" fill="#3a2410"/>
      <rect x="-7" y="-44" width="14" height="16" fill="#f5d97a"/>
      <rect x="-7" y="-44" width="14" height="2" fill="rgba(255,255,255,.5)"/>
      <rect x="-9" y="-28" width="18" height="3" fill="#3a2410"/>
      {/* Glow */}
      <circle cy="-36" r="22" fill="#f5d97a" opacity=".2"/>
    </g>
  );
}

// ─── 6. THE FORGE (XL) ──────────────────────────────────────────────────
// Half-timber medieval workshop crossed with AI lab.
// Scale: ~280px.
function ForgeXL({ tod }) {
  const lit = tod === 'night' ? 1 : .9;
  return (
    <g>
      <GroundShadow rx="160" ry="14"/>
      {/* Stone foundation */}
      <rect x="-140" y="-32" width="280" height="32" fill="url(#elev-stone)"/>
      <rect x="-140" y="-32" width="280" height="4" fill="#fffaee"/>
      {/* Body — half-timber wattle and daub */}
      <rect x="-130" y="-150" width="260" height="118" fill="#d8cfb8"/>
      {/* Wood beams — diagonal cross */}
      <rect x="-130" y="-150" width="260" height="6" fill="#3a2410"/>
      <rect x="-130" y="-38" width="260" height="6" fill="#3a2410"/>
      <rect x="-130" y="-150" width="6" height="118" fill="#3a2410"/>
      <rect x="124" y="-150" width="6" height="118" fill="#3a2410"/>
      <rect x="-6" y="-150" width="6" height="118" fill="#3a2410"/>
      <path d="M-124 -150 L0 -90 L124 -150" stroke="#3a2410" strokeWidth="5" fill="none"/>
      <path d="M0 -150 L0 -90" stroke="#3a2410" strokeWidth="3"/>
      {/* Steep pitched roof */}
      <path d="M-140 -150 L-80 -240 L80 -240 L140 -150 Z" fill="#5a3a18"/>
      <path d="M-140 -150 L140 -150" stroke="#2a1a0e" strokeWidth="1.5"/>
      {/* Shingle texture */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={-128 + i * 16} y1="-150" x2={-72 + i * 16} y2="-230" stroke="#2a1a0e" strokeWidth=".4" opacity=".5"/>
      ))}
      {/* Open workshop front — glowing */}
      <rect x="-60" y="-100" width="120" height="68" fill="#1a1410"/>
      <rect x="-60" y="-100" width="120" height="68" fill="#f5d97a" opacity={lit * .85}/>
      <rect x="-60" y="-100" width="120" height="68" fill="url(#elev-window-glow)" opacity=".85"/>
      {/* Inside — anvil silhouette */}
      <rect x="-22" y="-58" width="44" height="14" fill="#1a1410" opacity=".75"/>
      <rect x="-28" y="-44" width="56" height="14" fill="#1a1410" opacity=".75"/>
      {/* GPU rack visible */}
      <rect x="-50" y="-92" width="14" height="48" fill="#1a1410"/>
      {[-86, -78, -70, -62, -54].map((y, i) => <rect key={y} x="-48" y={y} width="10" height="2" fill="#6fd5e0" opacity={lit}/>)}
      <rect x="36" y="-92" width="14" height="48" fill="#1a1410"/>
      {[-86, -78, -70, -62, -54].map((y, i) => <rect key={y} x="38" y={y} width="10" height="2" fill="#94e2c0" opacity={lit}/>)}
      {/* Floating glowing language icons */}
      <g transform="translate(0, -118)">
        <circle cx="-40" cy="0" r="10" fill="#6fd5e0" opacity=".75"/>
        <text x="-40" y="4" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fontWeight="700" fill="#0e1820">py</text>
        <circle cx="0" cy="-10" r="10" fill="#e07ec3" opacity=".75"/>
        <text x="0" y="-6" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#fffaee">JS</text>
        <circle cx="40" cy="0" r="10" fill="#94e2c0" opacity=".75"/>
        <text x="40" y="4" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill="#0e1820">C++</text>
      </g>
      {/* Stone chimney */}
      <rect x="62" y="-260" width="24" height="50" fill="#857a5a"/>
      <rect x="62" y="-260" width="24" height="50" fill="url(#elev-stone)"/>
      <rect x="58" y="-260" width="32" height="6" fill="#5a4a3e"/>
      {/* Smoke and sparks */}
      <circle cx="76" cy="-274" r="8" fill="#fffaee" opacity=".55"/>
      <circle cx="86" cy="-288" r="6" fill="#fffaee" opacity=".4"/>
      <circle cx="72" cy="-294" r="4" fill="#fffaee" opacity=".3"/>
      {/* Sparks */}
      <circle cx="80" cy="-262" r="2" fill="#f5d97a"/>
      <circle cx="90" cy="-270" r="1.6" fill="#e07ec3"/>
      <circle cx="68" cy="-278" r="1.4" fill="#6fd5e0"/>
      <circle cx="84" cy="-284" r="1" fill="#f5d97a"/>
      {/* Sign */}
      <rect x="-30" y="-18" width="60" height="14" fill="url(#elev-wood)" stroke="#1a1410" strokeWidth=".5"/>
      <text x="0" y="-8" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="700" fill="#f5d97a" letterSpacing="2">FORGE</text>
    </g>
  );
}

// ─── 7. LIGHTHOUSE (XL) ─────────────────────────────────────────────────
// Tall striped lighthouse at the island's edge with sweeping beam.
// Scale: ~360px.
function LighthouseXL({ tod }) {
  const beam = tod === 'night' ? .6 : tod === 'dusk' ? .42 : .22;
  const lit = tod === 'night' ? 1 : .9;
  return (
    <g>
      <GroundShadow rx="80" ry="14"/>
      {/* Rocky base */}
      <ellipse cx="0" cy="-4" rx="80" ry="14" fill="#7a7064"/>
      <ellipse cx="-30" cy="-12" rx="22" ry="10" fill="#5a5048"/>
      <ellipse cx="36" cy="-8" rx="18" ry="9" fill="#5a5048"/>
      <ellipse cx="0" cy="-16" rx="40" ry="14" fill="#7a7064"/>
      <ellipse cx="-10" cy="-22" rx="14" ry="6" fill="#857a5a"/>
      {/* Tapered tower */}
      <path d="M-30 -16 L-26 -120 L-18 -240 L18 -240 L26 -120 L30 -16 Z" fill="url(#elev-white)"/>
      <path d="M-30 -16 L-26 -120 L-18 -240" stroke="rgba(0,0,0,.2)" strokeWidth="1" fill="none"/>
      <path d="M30 -16 L26 -120 L18 -240" stroke="rgba(255,255,255,.3)" strokeWidth="1" fill="none"/>
      {/* Red stripes */}
      <path d="M-30 -50 L30 -50 L29 -62 L-29 -62 Z" fill="#a8553c"/>
      <path d="M-28 -100 L28 -100 L27 -112 L-27 -112 Z" fill="#a8553c"/>
      <path d="M-26 -150 L26 -150 L25 -162 L-25 -162 Z" fill="#a8553c"/>
      <path d="M-23 -200 L23 -200 L22 -212 L-22 -212 Z" fill="#a8553c"/>
      {/* Small porthole windows */}
      <circle cx="0" cy="-80" r="4" fill="#1a1410"/>
      <circle cx="0" cy="-80" r="3" fill="#f5d97a" opacity={lit * .85}/>
      <circle cx="0" cy="-130" r="4" fill="#1a1410"/>
      <circle cx="0" cy="-130" r="3" fill="#f5d97a" opacity={lit * .85}/>
      <circle cx="0" cy="-180" r="4" fill="#1a1410"/>
      <circle cx="0" cy="-180" r="3" fill="#f5d97a" opacity={lit * .85}/>
      {/* Top platform railing */}
      <rect x="-26" y="-256" width="52" height="14" fill="#5a4a3e"/>
      <rect x="-26" y="-260" width="52" height="6" fill="#3a2a1e"/>
      <rect x="-22" y="-272" width="44" height="6" fill="#5a4a3e"/>
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={-20 + i * 6} y="-266" width="1" height="6" fill="#5a4a3e"/>
      ))}
      {/* Light room — glass */}
      <rect x="-20" y="-296" width="40" height="30" fill="#1a1410"/>
      <rect x="-18" y="-294" width="36" height="26" fill="#f5d97a" opacity=".95"/>
      <rect x="-18" y="-294" width="36" height="26" fill="url(#elev-window-glow)"/>
      {/* Mullions on light room */}
      <line x1="-12" y1="-294" x2="-12" y2="-268" stroke="#1a1410" strokeWidth=".7"/>
      <line x1="0" y1="-294" x2="0" y2="-268" stroke="#1a1410" strokeWidth=".7"/>
      <line x1="12" y1="-294" x2="12" y2="-268" stroke="#1a1410" strokeWidth=".7"/>
      {/* Dome cap */}
      <path d="M-22 -296 Q0 -322 22 -296 Z" fill="#5a4a3e"/>
      <path d="M-22 -296 Q0 -322 22 -296" stroke="#3a2a1e" strokeWidth="1.5" fill="none"/>
      <rect x="-2" y="-300" width="4" height="4" fill="#3a2a1e"/>
      {/* Weathervane */}
      <line x1="0" y1="-322" x2="0" y2="-340" stroke="#1a1410" strokeWidth="2"/>
      <path d="M-8 -334 L8 -334 L4 -330 L0 -332 L-4 -330 Z" fill="#a8553c"/>
      <text x="-12" y="-336" fontFamily="Georgia,serif" fontSize="5" fill="#1a1410">W</text>
      <text x="9" y="-336" fontFamily="Georgia,serif" fontSize="5" fill="#1a1410">E</text>
      {/* The beam — sweeping out */}
      <path d="M0 -282 L260 -340 L260 -240 Z" fill="#f5d97a" opacity={beam}/>
      <path d="M0 -282 L200 -310 L200 -250 Z" fill="#fff1c8" opacity={beam * .9}/>
      {/* Beam to the LEFT too for symmetric reach */}
      <path d="M0 -282 L-180 -300 L-180 -260 Z" fill="#f5d97a" opacity={beam * .55}/>
      {/* Mailbox by entrance */}
      <g transform="translate(-46, -10)">
        <rect x="-3" y="-22" width="12" height="14" fill="#a8553c"/>
        <rect x="-3" y="-22" width="12" height="4" fill="#d8362a"/>
        <circle cx="6" cy="-15" r="1.4" fill="#fffaee"/>
        <rect x="1" y="-8" width="3" height="10" fill="#3a2410"/>
        <text x="3" y="-13" fontFamily="Georgia,serif" fontSize="3" fill="#fffaee">MAIL</text>
      </g>
      {/* Terminal */}
      <g transform="translate(46, -10)">
        <rect x="-1" y="-30" width="2" height="32" fill="#1a1410"/>
        <rect x="-12" y="-46" width="24" height="20" fill="#0e1820" stroke="#1a1410" strokeWidth=".5"/>
        <rect x="-10" y="-44" width="20" height="16" fill="#6fd5e0" opacity={tod === 'night' ? 1 : .85}/>
        <text x="0" y="-38" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fill="#0e1820">@parthivFarazi</text>
        <text x="0" y="-32" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3" fill="#0e1820">$ contact --me</text>
      </g>
      {/* Door */}
      <ElevDoor x={-9} y={0} w={18} h={28} lit={lit} kind="wood"/>
    </g>
  );
}

Object.assign(window, {
  ElevationDefs, GroundShadow, ElevDoor, W, ArchW,
  PetronasTowers, TechTower, DeltaUpsilon, UPDTStadiumXL,
  RMAICTTowerXL, ForgeXL, LighthouseXL,
});
