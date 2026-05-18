// elevations2.jsx — Remaining elevation buildings (outer ring + small features).
// Anchor: (0,0) = ground line, center.

// ─── 8. QARD GREENHOUSE (XL) ────────────────────────────────────────────
// Futurist geodesic dome with floating card-flowers inside.
function QardGreenhouseXL({ tod }) {
  const lit = tod === 'night' ? .95 : .8;
  return (
    <g>
      <window.GroundShadow rx="180" ry="14"/>
      {/* Concrete base ring */}
      <rect x="-180" y="-30" width="360" height="32" fill="url(#elev-stone)"/>
      <rect x="-180" y="-30" width="360" height="4" fill="#fffaee"/>
      {/* Glass dome */}
      <path d="M-180 -30 Q-180 -240 0 -270 Q180 -240 180 -30 Z" fill="url(#elev-glass-mint)" opacity=".88"/>
      <path d="M-180 -30 Q-180 -240 0 -270 Q180 -240 180 -30 Z" fill="none" stroke="#3a6a5a" strokeWidth="1.5"/>
      {/* Triangulation — geodesic facets */}
      <g stroke="#fffaee" strokeWidth="1" fill="none" opacity=".85">
        <line x1="-180" y1="-30" x2="0" y2="-270"/>
        <line x1="180" y1="-30" x2="0" y2="-270"/>
        <line x1="-180" y1="-30" x2="-60" y2="-180"/>
        <line x1="180" y1="-30" x2="60" y2="-180"/>
        <line x1="-60" y1="-180" x2="60" y2="-180"/>
        <line x1="-60" y1="-180" x2="0" y2="-270"/>
        <line x1="60" y1="-180" x2="0" y2="-270"/>
        <line x1="-180" y1="-30" x2="-100" y2="-100"/>
        <line x1="-100" y1="-100" x2="0" y2="-50"/>
        <line x1="0" y1="-50" x2="100" y2="-100"/>
        <line x1="100" y1="-100" x2="180" y2="-30"/>
        <line x1="-100" y1="-100" x2="-60" y2="-180"/>
        <line x1="100" y1="-100" x2="60" y2="-180"/>
        <line x1="-130" y1="-60" x2="130" y2="-60"/>
        <line x1="-90" y1="-130" x2="90" y2="-130"/>
        <line x1="-40" y1="-220" x2="40" y2="-220"/>
      </g>
      {/* Card-flower garden bloom inside */}
      <CardFlowerStem x={-120} h={140} color="#e07ec3"/>
      <CardFlowerStem x={-80} h={180} color="#6fd5e0"/>
      <CardFlowerStem x={-40} h={120} color="#f5d97a"/>
      <CardFlowerStem x={0} h={200} color="#94e2c0"/>
      <CardFlowerStem x={40} h={130} color="#e07ec3"/>
      <CardFlowerStem x={80} h={170} color="#6fd5e0"/>
      <CardFlowerStem x={120} h={140} color="#f5d97a"/>
      {/* Water feature */}
      <ellipse cx="-130" cy="-20" rx="22" ry="6" fill="#6db9c4"/>
      <ellipse cx="-130" cy="-22" rx="20" ry="5" fill="#9ed6dd"/>
      <ellipse cx="130" cy="-20" rx="22" ry="6" fill="#6db9c4"/>
      <ellipse cx="130" cy="-22" rx="20" ry="5" fill="#9ed6dd"/>
      {/* Front entry */}
      <rect x="-30" y="-100" width="60" height="100" fill="url(#elev-glass-mint)"/>
      <rect x="-30" y="-100" width="60" height="100" fill="none" stroke="#3a6a5a" strokeWidth="1"/>
      <line x1="0" y1="-100" x2="0" y2="0" stroke="#3a6a5a" strokeWidth=".8"/>
      <line x1="-30" y1="-50" x2="30" y2="-50" stroke="#3a6a5a" strokeWidth=".5" opacity=".5"/>
      <window.ElevDoor x={-15} y={0} w={30} h={50} lit={lit + .1} kind="glass"/>
      {/* qard.dev sign */}
      <g transform="translate(-110, -260)">
        <rect x="-32" y="-12" width="64" height="22" rx="2" fill="#0e1820" stroke="#94e2c0" strokeWidth="1"/>
        <text x="0" y="3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="700" fill="#94e2c0">qard.dev</text>
      </g>
    </g>
  );
}

function CardFlowerStem({ x, h, color }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      <path d={`M0 0 Q-4 ${-h/2} 0 -${h}`} stroke="#3e6a3c" strokeWidth="2" fill="none"/>
      {/* Leaf */}
      <ellipse cx="3" cy={-h/2 + 20} rx="5" ry="2" fill="#5a9558" transform={`rotate(20 3 ${-h/2 + 20})`}/>
      <ellipse cx="-3" cy={-h/2 - 8} rx="5" ry="2" fill="#5a9558" transform={`rotate(-30 -3 ${-h/2 - 8})`}/>
      {/* Card "flower" */}
      <g transform={`translate(0, ${-h})`}>
        <rect x="-20" y="-13" width="40" height="26" rx="3" fill={color} stroke="#0e1820" strokeWidth=".8"/>
        <rect x="-18" y="-11" width="36" height="4" fill="#0e1820" opacity=".4"/>
        <rect x="-18" y="-2" width="14" height="3" fill="#fffaee" opacity=".75"/>
        <rect x="-18" y="4" width="22" height="2" fill="#fffaee" opacity=".55"/>
        <circle cx="14" cy="6" r="3" fill="#fffaee" opacity=".7"/>
        <text x="-18" y="-3" fontFamily="JetBrains Mono,monospace" fontSize="3" fontWeight="700" fill="#fffaee">•• 1234</text>
      </g>
    </g>
  );
}

// ─── 9. ATHLETIC STADIUM (XL) ───────────────────────────────────────────
// Mid-size college football stadium with floating banners, magazine, dollar signs.
function AthleticStadiumXL({ tod }) {
  const lit = tod === 'night' ? 1 : .7;
  return (
    <g>
      <window.GroundShadow rx="280" ry="20"/>
      {/* Plaza */}
      <rect x="-300" y="-12" width="600" height="14" fill="#c8bb95"/>
      {/* Stadium bowl — brick exterior */}
      <path d="M-260 -210 Q-260 -250 0 -250 Q260 -250 260 -210 L260 -12 L-260 -12 Z" fill="url(#elev-brick)"/>
      <path d="M-260 -210 Q-260 -250 0 -250 Q260 -250 260 -210 L260 -12 L-260 -12 Z" fill="url(#elev-brick-pat)" opacity=".5"/>
      {/* Stadium rim — stone */}
      <path d="M-260 -210 Q-260 -250 0 -250 Q260 -250 260 -210" stroke="url(#elev-stone)" strokeWidth="6" fill="none"/>
      {/* Upper deck — stands visible above rim */}
      <path d="M-240 -210 Q-240 -240 0 -240 Q240 -240 240 -210 L240 -190 L-240 -190 Z" fill="#1a1410" opacity=".6"/>
      {/* Field glimpse through arches */}
      <ellipse cx="0" cy="-110" rx="180" ry="40" fill="#3e6a3c"/>
      <ellipse cx="0" cy="-110" rx="180" ry="40" fill="#5a9558"/>
      {/* Yard lines */}
      {[-150, -100, -50, 0, 50, 100, 150].map(x => (
        <line key={x} x1={x} y1="-150" x2={x} y2="-70" stroke="#fffaee" strokeWidth="1.2" opacity=".95"/>
      ))}
      <text x="-100" y="-120" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="14" fontWeight="900" fill="#fffaee" opacity=".7">50</text>
      <text x="100" y="-120" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="14" fontWeight="900" fill="#fffaee" opacity=".7">50</text>
      {/* Field goal posts */}
      <g transform="translate(-200, -110)">
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="-12" y1="-32" x2="12" y2="-32" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="-12" y1="-32" x2="-12" y2="-60" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="12" y1="-32" x2="12" y2="-60" stroke="#f5d97a" strokeWidth="2"/>
      </g>
      <g transform="translate(200, -110)">
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="-12" y1="-32" x2="12" y2="-32" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="-12" y1="-32" x2="-12" y2="-60" stroke="#f5d97a" strokeWidth="2"/>
        <line x1="12" y1="-32" x2="12" y2="-60" stroke="#f5d97a" strokeWidth="2"/>
      </g>
      {/* Conference banners hanging from rim */}
      {['B10', 'SEC', 'ACC', 'B12'].map((c, i) => <g key={c} transform={`translate(${-180 + i * 120}, -212)`}>
        <rect x="-16" y="0" width="32" height="40" fill="#fffaee"/>
        <rect x="-16" y="0" width="32" height="4" fill="#a8553c"/>
        <rect x="-16" y="36" width="32" height="4" fill="#a8553c"/>
        <text x="0" y="22" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="14" fontWeight="900" fill="#1a1410">{c}</text>
      </g>)}
      {/* Floating sports-magazine page over the 50-yard line */}
      <g transform="translate(0, -300)">
        <rect x="-66" y="-44" width="132" height="80" fill="#fffaee" stroke="#1a1410" strokeWidth="1"/>
        <rect x="-66" y="-44" width="132" height="16" fill="#1a1410"/>
        <text x="0" y="-32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="900" fill="#fffaee" letterSpacing="2">VALUATIONS</text>
        <text x="0" y="-22" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5" fontStyle="italic" fill="#1a1410">CFB · MARCH 2026</text>
        <rect x="-60" y="-16" width="58" height="48" fill="#5a9558"/>
        <text x="-30" y="14" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="20" fontWeight="900" fill="#fffaee" opacity=".5">50</text>
        <rect x="4" y="-16" width="58" height="6" fill="#1a1410"/>
        <rect x="4" y="-6" width="58" height="2" fill="#5a5048"/>
        <rect x="4" y="-2" width="48" height="2" fill="#5a5048"/>
        <rect x="4" y="2" width="58" height="2" fill="#5a5048"/>
        <rect x="4" y="6" width="40" height="2" fill="#5a5048"/>
        <rect x="4" y="10" width="58" height="2" fill="#5a5048"/>
        <rect x="4" y="14" width="50" height="2" fill="#5a5048"/>
        <rect x="4" y="18" width="58" height="2" fill="#5a5048"/>
        <rect x="4" y="22" width="44" height="2" fill="#5a5048"/>
        <rect x="4" y="26" width="58" height="2" fill="#5a5048"/>
        {/* Magazine shadow */}
      </g>
      {/* Floating dollar signs */}
      <text x="-180" y="-280" fontFamily="Georgia,serif" fontSize="36" fontWeight="900" fill="#b3a369" opacity=".6">$</text>
      <text x="180" y="-260" fontFamily="Georgia,serif" fontSize="28" fontWeight="900" fill="#b3a369" opacity=".55">$</text>
      <text x="120" y="-300" fontFamily="Georgia,serif" fontSize="20" fontWeight="900" fill="#b3a369" opacity=".5">$</text>
      <text x="-100" y="-310" fontFamily="Georgia,serif" fontSize="16" fontWeight="900" fill="#b3a369" opacity=".5">$</text>
      {/* Arched entrances */}
      {[-180, -60, 60, 180].map(x => <g key={`arch${x}`}>
        <path d={`M${x - 20} 0 L${x - 20} -40 Q${x - 20} -60 ${x} -60 Q${x + 20} -60 ${x + 20} -40 L${x + 20} 0 Z`} fill="#0e1820"/>
        <path d={`M${x - 18} -2 L${x - 18} -40 Q${x - 18} -58 ${x} -58 Q${x + 18} -58 ${x + 18} -40 L${x + 18} -2 Z`} fill="#f5d97a" opacity={lit * .5}/>
      </g>)}
      {/* Stadium nameplate */}
      <rect x="-100" y="-185" width="200" height="22" fill="#0e1820"/>
      <text x="0" y="-169" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="14" fontWeight="900" fill="#f5d97a" letterSpacing="3">VALUATION FIELD</text>
    </g>
  );
}

// ─── 10. WHISPERING ARCHIVE (XL) ────────────────────────────────────────
// Stone library with glowing dome, ivy, firefly quote-tags, GPU inside.
function WhisperingArchiveXL({ tod }) {
  const lit = tod === 'night' ? 1 : .8;
  return (
    <g>
      <window.GroundShadow rx="160" ry="14"/>
      {/* Stone base */}
      <rect x="-140" y="-30" width="280" height="32" fill="url(#elev-stone)"/>
      <rect x="-140" y="-30" width="280" height="4" fill="#fffaee"/>
      {/* Building body */}
      <rect x="-130" y="-180" width="260" height="150" fill="url(#elev-stone)"/>
      <rect x="-130" y="-180" width="260" height="150" fill="none" stroke="#5a4a3e" strokeWidth=".8"/>
      {/* Stone block courses */}
      {[-150, -120, -90, -60].map(y => <g key={y}>
        <line x1="-130" y1={y} x2="130" y2={y} stroke="#5a4a3e" strokeWidth=".7" opacity=".6"/>
      </g>)}
      {/* Vertical block joints */}
      {[-100, -60, -20, 20, 60, 100].map(x => <line key={x} x1={x} y1="-180" x2={x} y2="-30" stroke="#5a4a3e" strokeWidth=".4" opacity=".4"/>)}
      {/* Cornice */}
      <rect x="-134" y="-184" width="268" height="6" fill="url(#elev-stone)"/>
      <rect x="-134" y="-184" width="268" height="2" fill="#fffaee"/>
      {/* Glowing dome */}
      <path d="M-100 -180 Q0 -280 100 -180 Z" fill="url(#elev-stone)"/>
      <path d="M-100 -180 Q0 -280 100 -180" stroke="#5a4a3e" strokeWidth=".8" fill="none"/>
      {/* Dome ribs */}
      {[-60, -30, 30, 60].map(x => <path key={x} d={`M${x} -180 Q${x*.5} -270 0 -270`} stroke="#5a4a3e" strokeWidth=".4" fill="none" opacity=".5"/>)}
      {/* Dome lantern */}
      <rect x="-12" y="-292" width="24" height="14" fill="url(#elev-stone)"/>
      <rect x="-10" y="-290" width="20" height="10" fill="#f5d97a" opacity={lit}/>
      <path d="M-14 -292 Q0 -304 14 -292 Z" fill="#5a4a3e"/>
      <line x1="0" y1="-304" x2="0" y2="-312" stroke="#1a1410" strokeWidth="1.4"/>
      <circle cx="0" cy="-312" r="2" fill="#b3a369"/>
      <ellipse cx="0" cy="-286" rx="40" ry="14" fill="#f5d97a" opacity={lit * .25}/>
      {/* Ivy climbing */}
      <g>
        <path d="M-130 -30 Q-126 -50 -120 -80 Q-124 -110 -118 -130 Q-122 -150 -116 -170" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
        <circle cx="-120" cy="-50" r="5" fill="#5a9558"/>
        <circle cx="-124" cy="-80" r="4" fill="#3e6a3c"/>
        <circle cx="-118" cy="-110" r="5" fill="#5a9558"/>
        <circle cx="-122" cy="-140" r="4" fill="#3e6a3c"/>
        <circle cx="-116" cy="-170" r="5" fill="#5a9558"/>
      </g>
      {/* Brass plaques on facade */}
      <rect x="-90" y="-60" width="20" height="10" fill="#b3a369"/>
      <text x="-80" y="-53" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" fill="#1a1410">490k</text>
      <rect x="70" y="-60" width="20" height="10" fill="#b3a369"/>
      <text x="80" y="-53" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4" fill="#1a1410">FAISS</text>
      {/* Arched windows on facade */}
      {[-70, 70].map(x => (
        <g key={x}>
          <path d={`M${x - 18} -50 L${x - 18} -130 Q${x - 18} -150 ${x} -150 Q${x + 18} -150 ${x + 18} -130 L${x + 18} -50 Z`} fill="url(#elev-stone)"/>
          <path d={`M${x - 14} -54 L${x - 14} -128 Q${x - 14} -146 ${x} -146 Q${x + 14} -146 ${x + 14} -128 L${x + 14} -54 Z`} fill="#0e1820"/>
          <path d={`M${x - 14} -54 L${x - 14} -128 Q${x - 14} -146 ${x} -146 Q${x + 14} -146 ${x + 14} -128 L${x + 14} -54 Z`} fill="#94e2c0" opacity={lit * .55}/>
          {/* Latticework */}
          <line x1={x - 14} y1="-90" x2={x + 14} y2="-90" stroke="#1a1410" strokeWidth=".5"/>
          <line x1={x} y1="-128" x2={x} y2="-54" stroke="#1a1410" strokeWidth=".5"/>
          {/* GPU rack glimpse */}
          <rect x={x - 8} y="-80" width="16" height="20" fill="#0e1820" opacity=".8"/>
          {[-76, -72, -68, -64].map(y => <rect key={y} x={x - 6} y={y} width="12" height="2" fill="#6fd5e0" opacity={lit}/>)}
        </g>
      ))}
      {/* Grand arched entrance */}
      <g>
        <path d="M-30 0 L-30 -90 Q-30 -120 0 -120 Q30 -120 30 -90 L30 0 Z" fill="url(#elev-stone)"/>
        <path d="M-26 -2 L-26 -88 Q-26 -116 0 -116 Q26 -116 26 -88 L26 -2 Z" fill="#3a2410"/>
        <path d="M-22 -4 L-22 -88 Q-22 -112 0 -112 Q22 -112 22 -88 L22 -4 Z" fill="#5a3a18"/>
        <path d="M-22 -4 L-22 -88 Q-22 -112 0 -112 Q22 -112 22 -88 L22 -4 Z" fill="#f5d97a" opacity={lit * .65}/>
        <line x1="0" y1="-112" x2="0" y2="-4" stroke="#3a2410" strokeWidth=".8"/>
        {/* Keystone */}
        <rect x="-4" y="-122" width="8" height="6" fill="url(#elev-stone)"/>
      </g>
      {/* Firefly quote-tags floating around */}
      {[[-160, -100, '#f5d97a'], [-140, -200, '#e07ec3'], [-100, -230, '#6fd5e0'], [100, -220, '#94e2c0'], [140, -190, '#f5d97a'], [160, -100, '#e07ec3'], [0, -240, '#f5d97a']].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <circle r="9" fill={c} opacity=".2"/>
          <circle r="3" fill={c}/>
          <rect x="4" y="-3" width="18" height="6" fill={c} opacity=".4"/>
          <rect x="4" y="-3" width="18" height="6" fill="rgba(15,30,40,.5)" opacity=".4"/>
          <text x="13" y="1" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3" fill="#fffaee">"…"</text>
        </g>
      ))}
    </g>
  );
}

// ─── 11. ZEN GARDEN (XL) ────────────────────────────────────────────────
// Japanese meditation garden — not a building, a ground feature.
function ZenGardenXL({ tod }) {
  return (
    <g>
      <window.GroundShadow rx="190" ry="14"/>
      {/* Sand bed */}
      <ellipse cx="0" cy="-8" rx="180" ry="32" fill="#e8d5a8"/>
      <ellipse cx="0" cy="-12" rx="178" ry="30" fill="#f6e9c4"/>
      {/* Raked sand patterns */}
      {[140, 110, 80, 50, 26].map((r, i) => (
        <ellipse key={i} cx="0" cy="-12" rx={r} ry={r * .18} fill="none" stroke="#d8c290" strokeWidth=".8"/>
      ))}
      {/* Border stones */}
      {[-160, -140, -100, -60, 60, 100, 140, 160].map((x, i) => (
        <ellipse key={i} cx={x} cy={-4 + (i % 2) * 2} rx={4 + (i % 3) * 2} ry={3} fill={i % 2 ? '#7a7064' : '#857a5a'}/>
      ))}
      {/* Big focal stones */}
      <ellipse cx="-80" cy="-18" rx="16" ry="9" fill="#5a5048"/>
      <ellipse cx="-80" cy="-22" rx="16" ry="9" fill="#7a7064"/>
      <ellipse cx="-80" cy="-24" rx="14" ry="7" fill="#857a5a"/>
      <ellipse cx="86" cy="-18" rx="12" ry="7" fill="#5a5048"/>
      <ellipse cx="86" cy="-22" rx="12" ry="7" fill="#7a7064"/>
      {/* Koi pond */}
      <g transform="translate(60, -10)">
        <ellipse cx="0" cy="0" rx="40" ry="14" fill="#3a6470"/>
        <ellipse cx="0" cy="-3" rx="38" ry="12" fill="#6db9c4"/>
        <ellipse cx="0" cy="-3" rx="38" ry="12" fill="none" stroke="#fffaee" strokeWidth=".8" opacity=".7"/>
        {/* Koi */}
        <path d="M-16 -2 Q-8 -6 0 -2 Q4 0 0 4 Q-8 6 -16 2 Z" fill="#e07ec3"/>
        <circle cx="-13" cy="0" r="1" fill="#1a1410"/>
        <path d="M-16 -2 L-22 -6 L-20 0 L-22 4 Z" fill="#e07ec3"/>
        <path d="M14 4 Q22 0 16 -2 Q12 0 14 4 Z" fill="#f5d97a"/>
        <circle cx="17" cy="-1" r=".8" fill="#1a1410"/>
        {/* Ripple */}
        <path d="M-30 -4 Q-15 -8 0 -4" stroke="#fffaee" strokeWidth=".6" fill="none" opacity=".7"/>
      </g>
      {/* Cherry tree (LEFT side) */}
      <g transform="translate(-130, -30)">
        <ellipse cx="2" cy="6" rx="14" ry="3" fill="rgba(0,0,0,.3)"/>
        <rect x="-3" y="-30" width="6" height="36" fill="#3a2410"/>
        {/* Branches */}
        <path d="M0 -20 Q-12 -28 -20 -34" stroke="#3a2410" strokeWidth="3" fill="none"/>
        <path d="M0 -20 Q12 -30 22 -36" stroke="#3a2410" strokeWidth="3" fill="none"/>
        {/* Pink canopy — multiple ellipses */}
        <ellipse cx="0" cy="-40" rx="30" ry="22" fill="#f0a5d3"/>
        <ellipse cx="-18" cy="-44" rx="14" ry="14" fill="#e07ec3"/>
        <ellipse cx="20" cy="-46" rx="16" ry="14" fill="#e07ec3"/>
        <ellipse cx="-4" cy="-58" rx="18" ry="14" fill="#f5b6da"/>
        <ellipse cx="10" cy="-50" rx="10" ry="10" fill="#fffaee" opacity=".5"/>
        {/* Falling petals */}
        <circle cx="-22" cy="-12" r="1" fill="#f5b6da"/>
        <circle cx="-32" cy="-2" r="1" fill="#e07ec3"/>
        <circle cx="-10" cy="-4" r="1" fill="#f5b6da"/>
        <circle cx="12" cy="-12" r="1.2" fill="#e07ec3"/>
        <circle cx="28" cy="-4" r="1" fill="#f5b6da"/>
      </g>
      {/* Stone bench with journal */}
      <g transform="translate(-30, -16)">
        <rect x="-20" y="-2" width="40" height="6" fill="#857a5a"/>
        <rect x="-20" y="-2" width="40" height="2" fill="#a89878"/>
        <rect x="-18" y="4" width="4" height="10" fill="#5a5048"/>
        <rect x="14" y="4" width="4" height="10" fill="#5a5048"/>
        {/* Journal — slightly open, with glow */}
        <rect x="-10" y="-12" width="20" height="11" fill="#f6f1e4" stroke="#1a1410" strokeWidth=".5"/>
        <path d="M-10 -12 L0 -10 L10 -12 L10 -1 L0 -3 L-10 -1 Z" fill="#fffaee"/>
        <line x1="0" y1="-10" x2="0" y2="-3" stroke="#5a4a3e" strokeWidth=".4"/>
        {/* Hand-written lines */}
        <line x1="-7" y1="-9" x2="-3" y2="-9" stroke="#1a1410" strokeWidth=".4"/>
        <line x1="-7" y1="-7" x2="-2" y2="-7" stroke="#1a1410" strokeWidth=".4"/>
        <line x1="3" y1="-9" x2="7" y2="-9" stroke="#1a1410" strokeWidth=".4"/>
        <line x1="3" y1="-7" x2="6" y2="-7" stroke="#1a1410" strokeWidth=".4"/>
        {/* Glowing aura */}
        <ellipse cx="0" cy="-7" rx="20" ry="10" fill="#f5d97a" opacity=".55"/>
        <ellipse cx="0" cy="-7" rx="14" ry="6" fill="#fff1c8" opacity=".5"/>
      </g>
      {/* Stone lantern */}
      <g transform="translate(-100, -20)">
        <ellipse cx="0" cy="2" rx="6" ry="2" fill="rgba(0,0,0,.4)"/>
        <rect x="-3" y="-10" width="6" height="10" fill="#857a5a"/>
        <rect x="-5" y="-14" width="10" height="4" fill="#7a7064"/>
        <rect x="-7" y="-22" width="14" height="8" fill="#857a5a"/>
        <rect x="-5" y="-20" width="10" height="4" fill="#f5d97a" opacity={tod === 'night' ? 1 : .7}/>
        <path d="M-9 -22 L9 -22 L7 -26 L-7 -26 Z" fill="#5a5048"/>
        <path d="M-3 -26 L0 -32 L3 -26 Z" fill="#5a5048"/>
      </g>
      {/* Sign post */}
      <g transform="translate(140, -20)">
        <rect x="-1.5" y="-30" width="3" height="32" fill="#3a2410"/>
        <rect x="-22" y="-30" width="40" height="14" fill="url(#elev-wood)" stroke="#1a1410" strokeWidth=".5"/>
        <text x="-2" y="-21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7" fontWeight="700" fill="#f6f1e4">Soothe</text>
      </g>
    </g>
  );
}

// ─── 12. HEATMAP GARDEN (XL) ────────────────────────────────────────────
function HeatmapGardenXL({ tod }) {
  return (
    <g>
      <window.GroundShadow rx="170" ry="14"/>
      {/* Garden bed */}
      <rect x="-170" y="-50" width="340" height="50" fill="#5a4a30"/>
      <rect x="-170" y="-50" width="340" height="6" fill="#3a2a1e"/>
      {/* Grass border around */}
      <rect x="-170" y="-52" width="340" height="4" fill="#5a9558"/>
      {/* Hedge perimeter — short bushes */}
      {[-160, -120, -80, -40, 0, 40, 80, 120, 160].map(x => (
        <g key={x}>
          <ellipse cx={x} cy={-50} rx="14" ry="6" fill="#3e6a3c"/>
          <ellipse cx={x} cy={-54} rx="13" ry="5" fill="#5a9558"/>
          <ellipse cx={x - 4} cy={-56} rx="5" ry="3" fill="#7eb86a"/>
        </g>
      ))}
      {/* Heatmap flowers — soccer-formation gradient */}
      {(() => {
        const flowers = [];
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 17; c++) {
            const x = -148 + c * 18;
            const y = -10 + r * 9;
            const cx0 = 0, cy0 = 14;
            const d = Math.hypot(x - cx0, y - cy0);
            const hot = Math.max(0, 1 - d / 70);
            const hue = 220 - hot * 220;
            const sat = 60 + hot * 30;
            const lite = 55 - hot * 8;
            const size = 3 + hot * 4;
            flowers.push(
              <g key={`${r}-${c}`}>
                {/* Stem */}
                <line x1={x} y1={y} x2={x} y2={y - 6} stroke="#3e6a3c" strokeWidth=".6"/>
                {/* Petals — 5 around center */}
                {[0, 72, 144, 216, 288].map(a => {
                  const ax = x + Math.cos(a * Math.PI / 180) * size * .55;
                  const ay = y - 8 + Math.sin(a * Math.PI / 180) * size * .55;
                  return <circle key={a} cx={ax} cy={ay} r={size * .55} fill={`hsl(${hue}, ${sat}%, ${lite + 8}%)`} opacity=".9"/>;
                })}
                <circle cx={x} cy={y - 8} r={size * .35} fill={`hsl(${hue}, ${sat + 10}%, ${lite + 18}%)`}/>
                <circle cx={x} cy={y - 8} r={size * .15} fill="#f5d97a"/>
              </g>
            );
          }
        }
        return flowers;
      })()}
      {/* Soccer ball pedestal at center */}
      <g transform="translate(0, -2)">
        <ellipse cx="0" cy="4" rx="14" ry="3" fill="rgba(0,0,0,.4)"/>
        <rect x="-10" y="0" width="20" height="6" fill="#857a5a"/>
        <rect x="-12" y="-2" width="24" height="3" fill="url(#elev-stone)"/>
        <circle cx="0" cy="-12" r="10" fill="#fffaee" stroke="#1a1410" strokeWidth=".8"/>
        <path d="M-6 -16 L0 -14 L6 -16 L4 -10 L-4 -10 Z" fill="#1a1410"/>
        <line x1="-6" y1="-16" x2="-10" y2="-10" stroke="#1a1410" strokeWidth=".5"/>
        <line x1="6" y1="-16" x2="10" y2="-10" stroke="#1a1410" strokeWidth=".5"/>
      </g>
      {/* Floating ORIS placard */}
      <g transform="translate(0, -110)">
        <rect x="-60" y="-26" width="120" height="44" rx="2" fill="rgba(15,30,40,.9)" stroke="#6fd5e0" strokeWidth="1"/>
        <text x="0" y="-12" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="600" fill="#6fd5e0">OFF-BALL RUN IMPACT</text>
        <text x="0" y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#94e2c0">ORIS · 0.84</text>
        <text x="0" y="14" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4.5" fill="#cdf3e2">1,000+ player movements analyzed</text>
      </g>
      {/* Garden sign */}
      <g transform="translate(160, -50)">
        <rect x="-1.5" y="-30" width="3" height="32" fill="#3a2410"/>
        <rect x="-30" y="-32" width="56" height="16" fill="url(#elev-wood)" stroke="#1a1410" strokeWidth=".5"/>
        <text x="-2" y="-21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fontStyle="italic" fontWeight="700" fill="#f5d97a">xGenius</text>
      </g>
    </g>
  );
}

// ─── 13. ROBOT'S WORKSHOP (XL) ──────────────────────────────────────────
// Weathered wooden shed; original robot rolling outside; CAD sketches inside.
function RobotWorkshopXL({ tod }) {
  const lit = tod === 'night' ? 1 : .7;
  return (
    <g>
      <window.GroundShadow rx="130" ry="14"/>
      {/* Foundation */}
      <rect x="-120" y="-22" width="240" height="22" fill="#5a4a30"/>
      <rect x="-120" y="-22" width="240" height="3" fill="#3a2a1e"/>
      {/* Wood plank body */}
      <rect x="-110" y="-150" width="220" height="128" fill="url(#elev-wood)"/>
      {/* Plank lines */}
      {[-100, -86, -72, -58, -44, -30, -16, -2, 12, 26, 40, 54, 68, 82, 96].map(x => (
        <line key={x} x1={x} y1="-150" x2={x} y2="-22" stroke="#1a1410" strokeWidth=".6" opacity=".75"/>
      ))}
      {/* Knots and weathering */}
      <circle cx="-50" cy="-90" r="2" fill="#1a1410" opacity=".4"/>
      <circle cx="60" cy="-110" r="1.5" fill="#1a1410" opacity=".4"/>
      <circle cx="-78" cy="-60" r="2.5" fill="#1a1410" opacity=".4"/>
      <path d="M30 -120 Q40 -116 50 -118" stroke="#1a1410" strokeWidth=".4" fill="none" opacity=".4"/>
      {/* Pitched roof — corrugated metal */}
      <path d="M-118 -150 L-50 -210 L50 -210 L118 -150 Z" fill="#3a2a1e"/>
      <path d="M-50 -210 L50 -210" stroke="#1a1410" strokeWidth="1.2"/>
      {/* Corrugated ridges */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={-110 + i * 16} y1="-150" x2={-46 + i * 12} y2="-204" stroke="rgba(255,255,255,.12)" strokeWidth=".7"/>
      ))}
      {/* Solar panel on roof */}
      <g transform="translate(0, -180) skewX(-20)">
        <rect x="-30" y="-12" width="60" height="20" fill="#0e1820" stroke="#1a1410" strokeWidth=".8"/>
        <rect x="-28" y="-10" width="56" height="16" fill="#3a5a78"/>
        {/* Grid lines */}
        {[-22, -16, -10, -4, 2, 8, 14, 20].map(x => <line key={x} x1={x} y1="-10" x2={x} y2="6" stroke="#0e1820" strokeWidth=".4"/>)}
        <line x1="-28" y1="-2" x2="28" y2="-2" stroke="#0e1820" strokeWidth=".4"/>
      </g>
      {/* Wires from solar to door */}
      <path d="M-10 -180 Q-8 -170 -2 -160" stroke="#1a1410" strokeWidth="1" fill="none"/>
      {/* Open door — glowing inside */}
      <rect x="-26" y="-100" width="52" height="78" fill="#1a1410"/>
      <rect x="-24" y="-98" width="48" height="74" fill="#f5d97a" opacity={lit * .85}/>
      <rect x="-24" y="-98" width="48" height="74" fill="url(#elev-window-glow)" opacity=".7"/>
      {/* Workbench inside */}
      <rect x="-22" y="-44" width="44" height="6" fill="#5a3a18"/>
      <rect x="-22" y="-38" width="44" height="2" fill="#3a2410"/>
      {/* CAD sketches on the wall inside */}
      <rect x="-22" y="-86" width="14" height="20" fill="#fffaee" opacity=".95"/>
      <path d="M-20 -82 L-12 -82 M-20 -78 L-14 -78 M-20 -74 L-12 -74 M-16 -84 L-16 -68" stroke="#0e1820" strokeWidth=".5" opacity=".8"/>
      <rect x="6" y="-86" width="14" height="20" fill="#fffaee" opacity=".95"/>
      <circle cx="13" cy="-78" r="3" fill="none" stroke="#0e1820" strokeWidth=".5"/>
      <line x1="6" y1="-72" x2="20" y2="-72" stroke="#0e1820" strokeWidth=".5"/>
      <line x1="13" y1="-82" x2="13" y2="-72" stroke="#0e1820" strokeWidth=".5"/>
      {/* Window left of door */}
      <rect x="-86" y="-100" width="36" height="36" fill="#1a1410"/>
      <rect x="-84" y="-98" width="32" height="32" fill="#f5d97a" opacity={lit * .8}/>
      <line x1="-68" y1="-98" x2="-68" y2="-66" stroke="#3a2410" strokeWidth=".8"/>
      <line x1="-84" y1="-82" x2="-52" y2="-82" stroke="#3a2410" strokeWidth=".8"/>
      {/* Window right of door */}
      <rect x="50" y="-100" width="36" height="36" fill="#1a1410"/>
      <rect x="52" y="-98" width="32" height="32" fill="#f5d97a" opacity={lit * .8}/>
      <line x1="68" y1="-98" x2="68" y2="-66" stroke="#3a2410" strokeWidth=".8"/>
      <line x1="52" y1="-82" x2="84" y2="-82" stroke="#3a2410" strokeWidth=".8"/>
      {/* Small Malaysian-flag-themed pennant inside, glimpsed */}
      <rect x="56" y="-88" width="14" height="10" fill="#a8553c" opacity=".9"/>
      <rect x="56" y="-88" width="14" height="3" fill="#f5d97a"/>
      <path d="M61 -82 Q63 -84 65 -82" stroke="#fffaee" strokeWidth=".5" fill="none"/>
      {/* Hand-painted sign over door */}
      <rect x="-40" y="-114" width="80" height="14" fill="#3a2410" stroke="#1a1410" strokeWidth=".7"/>
      <text x="0" y="-104" textAnchor="middle" fontFamily="Caveat,cursive" fontSize="11" fontWeight="700" fill="#f5d97a">where it started</text>
      {/* The original litter-picking robot OUTSIDE rolling on grass */}
      <g transform="translate(-150, -8)">
        <ellipse cx="0" cy="6" rx="16" ry="4" fill="rgba(0,0,0,.35)"/>
        {/* Body */}
        <rect x="-14" y="-8" width="28" height="12" fill="#c8bb95" stroke="#1a1410" strokeWidth=".7"/>
        {/* Solar panel on top */}
        <rect x="-12" y="-14" width="24" height="6" fill="#0e1820"/>
        <rect x="-10" y="-12" width="20" height="2" fill="#3a5a78"/>
        {/* Antenna with light */}
        <line x1="0" y1="-14" x2="0" y2="-20" stroke="#1a1410" strokeWidth=".8"/>
        <circle cx="0" cy="-22" r="1.6" fill="#e07ec3"/>
        <circle cx="0" cy="-22" r="3" fill="#e07ec3" opacity=".35"/>
        {/* Eyes / sensors */}
        <rect x="-12" y="-6" width="6" height="4" fill="#6fd5e0"/>
        <rect x="6" y="-6" width="6" height="4" fill="#6fd5e0"/>
        {/* Wheels */}
        <circle cx="-8" cy="4" r="4" fill="#1a1410"/>
        <circle cx="-8" cy="4" r="2" fill="#3a2a1e"/>
        <circle cx="8" cy="4" r="4" fill="#1a1410"/>
        <circle cx="8" cy="4" r="2" fill="#3a2a1e"/>
        {/* Tiny arm holding a "leaf" */}
        <line x1="14" y1="0" x2="22" y2="-4" stroke="#1a1410" strokeWidth="1.2"/>
        <path d="M22 -4 Q24 -8 28 -6 Q26 -2 22 -4 Z" fill="#5a9558"/>
        {/* Bin */}
        <rect x="-4" y="-2" width="8" height="6" fill="#3a2a1e"/>
        <path d="M-4 -2 L4 -2 L3 -1 L-3 -1 Z" fill="#5a4a3e"/>
      </g>
    </g>
  );
}

// ─── REGISTRY ───────────────────────────────────────────────────────────
const ELEVATION_ART = {
  updt: window.UPDTStadiumXL,
  rmaict: window.RMAICTTowerXL,
  pong: window.DeltaUpsilon,      // renamed Pong → DU
  edu: window.TechTower,
  about: window.PetronasTowers,
  forge: window.ForgeXL,
  lighthouse: window.LighthouseXL,
  qard: QardGreenhouseXL,
  football: AthleticStadiumXL,
  archive: WhisperingArchiveXL,
  zen: ZenGardenXL,
  heatmap: HeatmapGardenXL,
  workshop: RobotWorkshopXL,
};

function BuildingElevation({ id, tod }) {
  const Cmp = ELEVATION_ART[id];
  if (!Cmp) return null;
  return <Cmp tod={tod} />;
}

Object.assign(window, {
  QardGreenhouseXL, AthleticStadiumXL, WhisperingArchiveXL,
  ZenGardenXL, HeatmapGardenXL, RobotWorkshopXL,
  ELEVATION_ART, BuildingElevation,
});
