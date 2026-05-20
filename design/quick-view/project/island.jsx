// island.jsx — top-down schematic island prototype with click-to-walk.

// ─── BUILDING LAYOUT ────────────────────────────────────────────────────
// World coords: 1400 × 900. Spawn plaza centered.

const PLAZA = { x: 700, y: 470, r: 56 };

const NODES = [
  { id: 'updt',       ring: 'inner', x: 700,  y: 250,  label: 'UPDT Stadium',          sub: 'Co-founder & CTO · UPDT.',     reg: 'futurist', shape: 'stadium' },
  { id: 'rmaict',     ring: 'inner', x: 980,  y: 470,  label: 'RMAICT Tower',          sub: 'AI Engineer Intern · 2024',    reg: 'fusion',   shape: 'tower' },
  { id: 'pong',       ring: 'inner', x: 700,  y: 690,  label: 'Pong Frat House',       sub: 'Baseball logging · 2025–26',   reg: 'real',     shape: 'frat' },

  { id: 'edu',        ring: 'mid',   x: 440,  y: 250,  label: 'Collegiate Tower',      sub: 'B.S. Computer Science',        reg: 'real',     shape: 'collegiate' },
  { id: 'about',      ring: 'mid',   x: 980,  y: 200,  label: 'Twin Towers',           sub: 'About me · KL + ATL',          reg: 'real',     shape: 'twins' },
  { id: 'forge',      ring: 'mid',   x: 1030, y: 700,  label: 'The Forge',             sub: 'Skills · languages + GPUs',    reg: 'fusion',   shape: 'forge' },
  { id: 'lighthouse', ring: 'mid',   x: 320,  y: 720,  label: 'The Lighthouse',        sub: 'Contact',                      reg: 'real',     shape: 'lighthouse' },

  { id: 'qard',       ring: 'outer', x: 250,  y: 140,  label: 'Qard Greenhouse',       sub: 'Fintech frontend · Three.js',  reg: 'futurist', shape: 'dome' },
  { id: 'football',   ring: 'outer', x: 1240, y: 270,  label: 'Athletic Stadium',      sub: 'CFB valuation',                reg: 'real',     shape: 'fb-stadium' },
  { id: 'archive',    ring: 'outer', x: 140,  y: 470,  label: 'Whispering Archive',    sub: 'FAISS · Gemma-3',              reg: 'fusion',   shape: 'archive' },
  { id: 'zen',        ring: 'outer', x: 230,  y: 800,  label: 'Zen Garden',            sub: 'Soothe · mental-health app',   reg: 'real',     shape: 'zen' },
  { id: 'heatmap',    ring: 'outer', x: 680,  y: 820,  label: 'Heatmap Garden',        sub: 'xGenius · ORIS',               reg: 'fusion',   shape: 'heatmap' },
  { id: 'workshop',   ring: 'outer', x: 1260, y: 540,  label: "Robot's Workshop",      sub: 'Litter robot · the origin',    reg: 'real',     shape: 'shed' },
];

const BY_ID = Object.fromEntries(NODES.map(n => [n.id, n]));

// ─── PATH GRAPH ──────────────────────────────────────────────────────────
// We connect each building back to PLAZA via 1-2 intermediate waypoints
// for nicer cobblestone curves and to make pathfinding feel deliberate.

const WAYS = [
  // To inner ring — direct
  ['plaza', 'updt'], ['plaza', 'rmaict'], ['plaza', 'pong'],
  // Spokes to mid ring (slight curves via intermediate waypoints)
  ['plaza', 'edu'], ['plaza', 'about'], ['plaza', 'forge'], ['plaza', 'lighthouse'],
  // Outer ring branches off mid ring
  ['edu', 'qard'], ['about', 'football'], ['edu', 'archive'],
  ['lighthouse', 'zen'], ['pong', 'heatmap'], ['forge', 'workshop'],
];

function nodePos(id) {
  if (id === 'plaza') return { x: PLAZA.x, y: PLAZA.y };
  const n = BY_ID[id];
  return { x: n.x, y: n.y };
}

// BFS shortest path on building graph
function findPath(fromId, toId) {
  const adj = {};
  for (const [a, b] of WAYS) {
    (adj[a] ||= []).push(b);
    (adj[b] ||= []).push(a);
  }
  const q = [[fromId]];
  const seen = new Set([fromId]);
  while (q.length) {
    const path = q.shift();
    const last = path[path.length - 1];
    if (last === toId) return path;
    for (const n of (adj[last] || [])) {
      if (seen.has(n)) continue;
      seen.add(n);
      q.push([...path, n]);
    }
  }
  return [fromId, toId];
}

// ─── ISLAND PROTOTYPE ───────────────────────────────────────────────────

function IslandPrototype({ tod = 'golden', onOpenPanel }) {
  const sky = window.SKY_PRESETS[tod] || window.SKY_PRESETS.golden;
  const [avatar, setAvatar] = React.useState({ x: PLAZA.x, y: PLAZA.y, facing: 'south' });
  const [walking, setWalking] = React.useState(false);
  const [target, setTarget] = React.useState(null);    // building id
  const [activePanel, setActivePanel] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const animRef = React.useRef(null);

  // Click-to-walk
  const goTo = React.useCallback((nodeId) => {
    if (walking) return;
    setActivePanel(null);
    setTarget(nodeId);
    // Find path from current location (we treat avatar at plaza as 'plaza' for routing)
    // For simplicity, route from plaza; the avatar always returns through plaza.
    const dest = BY_ID[nodeId];
    // Pre-build waypoint list: plaza -> intermediate -> destination
    const path = findPath('plaza', nodeId);
    const waypoints = path.map(nodePos);
    // If avatar isn't at plaza, first prepend a 'go to plaza' leg
    const here = { x: avatar.x, y: avatar.y };
    const atPlaza = Math.hypot(here.x - PLAZA.x, here.y - PLAZA.y) < 8;
    const route = atPlaza ? waypoints : [here, ...waypoints];

    setWalking(true);
    animateRoute(route, (p, facing) => setAvatar({ x: p.x, y: p.y, facing }), () => {
      setWalking(false);
      setActivePanel(nodeId);
      onOpenPanel && onOpenPanel(nodeId);
    }, animRef);
  }, [walking, avatar, onOpenPanel]);

  // Return-to-plaza
  const returnToPlaza = React.useCallback(() => {
    if (walking) return;
    setActivePanel(null);
    setTarget(null);
    const here = { x: avatar.x, y: avatar.y };
    if (Math.hypot(here.x - PLAZA.x, here.y - PLAZA.y) < 8) return;
    // Reverse path
    const lastTarget = NODES.find(n => Math.hypot(n.x - here.x, n.y - here.y) < 30);
    const path = lastTarget ? findPath(lastTarget.id, 'plaza').map(nodePos) : [{ x: PLAZA.x, y: PLAZA.y }];
    const route = [here, ...path];
    setWalking(true);
    animateRoute(route, (p, facing) => setAvatar({ x: p.x, y: p.y, facing }), () => setWalking(false), animRef);
  }, [walking, avatar]);

  // Cancel any in-flight anim on unmount
  React.useEffect(() => () => { animRef.current && cancelAnimationFrame(animRef.current); }, []);

  return (
    <div style={{
      width: 1400, height: 900, position: 'relative', overflow: 'hidden',
      background: sky.gradient,
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Distant sky / clouds (top band) */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 120, background: sky.gradient, opacity: .85 }}></div>
      {/* SVG island */}
      <svg viewBox="0 0 1400 900" width="1400" height="900" style={{ position: 'absolute', inset: 0 }}>
        <window.BuildingDefs />
        <defs>
          <radialGradient id="plaza-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff1c8" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#fff1c8" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="water-deep" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#9ed6dd"/>
            <stop offset="100%" stopColor="#4a8896"/>
          </radialGradient>
          <filter id="island-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation=".6"/>
          </filter>
        </defs>

        {/* Island cliff/water shadow */}
        <ellipse cx="706" cy="492" rx="672" ry="402" fill="#3a5666" opacity=".55"/>
        {/* Island silhouette */}
        <ellipse cx="700" cy="475" rx="660" ry="395" fill="url(#island-base)" />
        {/* Sandy beach edge */}
        <ellipse cx="700" cy="480" rx="656" ry="388" fill="#e8d5a8" opacity=".35"/>
        <ellipse cx="700" cy="475" rx="645" ry="382" fill="url(#island-base)" />
        {/* Painterly grass patches */}
        {[
          [200,260,90,40], [300,160,110,40], [560,140,130,42], [900,160,120,40],
          [1180,260,110,40], [1240,460,120,50], [1180,680,110,42], [950,820,140,40],
          [600,840,160,42], [240,800,110,40], [120,560,90,40], [180,380,90,38],
          [460,380,90,30], [820,420,110,35], [700,500,140,40], [560,580,120,40], [820,600,130,42],
        ].map(([cx, cy, rx, ry], i) => <window.GrassPatch key={`gp${i}`} cx={cx} cy={cy} rx={rx} ry={ry} seed={i} />)}
        {/* Subtle grass noise overlay */}
        <ellipse cx="700" cy="475" rx="645" ry="382" fill="url(#grass-tuft)" opacity=".55"/>
        {/* Flower sprinkles */}
        <ellipse cx="700" cy="475" rx="645" ry="382" fill="url(#flower-dots)" opacity=".8"/>

        {/* Koi pond near zen */}
        <ellipse cx="170" cy="800" rx="44" ry="22" fill="#3a6470" opacity=".5"/>
        <ellipse cx="170" cy="798" rx="40" ry="20" fill="url(#water-deep)"/>
        <ellipse cx="170" cy="795" rx="40" ry="20" fill="none" stroke="#fffaee" strokeWidth=".8" opacity=".6"/>
        <path d="M150 795 Q160 793 170 795 Q180 797 190 795" stroke="#fffaee" strokeWidth=".6" fill="none" opacity=".55"/>

        {/* Paths */}
        <PathLayer />

        {/* Plaza */}
        <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r + 20} fill="url(#plaza-glow)" />
        <circle cx={PLAZA.x} cy={PLAZA.y} r={PLAZA.r} fill="var(--rw-path)" stroke="var(--rw-path-deep)" strokeWidth="2"/>
        {/* Plaza pavers */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const r1 = 14, r2 = PLAZA.r - 4;
          const x1 = PLAZA.x + Math.cos(a) * r1, y1 = PLAZA.y + Math.sin(a) * r1;
          const x2 = PLAZA.x + Math.cos(a) * r2, y2 = PLAZA.y + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--rw-path-deep)" strokeWidth="1" opacity=".6"/>;
        })}
        {/* Map pedestal */}
        <circle cx={PLAZA.x} cy={PLAZA.y} r="14" fill="#2a2520" />
        <circle cx={PLAZA.x} cy={PLAZA.y} r="12" fill="var(--rw-gold)" />
        <text x={PLAZA.x} y={PLAZA.y + 4} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="700" fill="#2a2520">PF</text>
        {/* Welcome flag */}
        <g transform={`translate(${PLAZA.x - 70}, ${PLAZA.y - 70})`}>
          <line x1="0" y1="0" x2="0" y2="44" stroke="#2a2520" strokeWidth="1.5"/>
          <path d="M0 4 L26 8 L20 14 L26 22 L0 18 Z" fill="#f5d97a" stroke="#2a2520" strokeWidth="1"/>
          <text x="6" y="15" fontFamily="Instrument Serif,serif" fontSize="10" fontWeight="400" fill="#2a2520" fontStyle="italic">welcome</text>
        </g>

        {/* Lush trees scattered (drawn behind buildings) */}
        {[
          [120, 250, 0], [160, 320, 1], [110, 420, 2], [120, 540, 0], [140, 640, 1], [180, 720, 2],
          [320, 800, 0], [440, 840, 1], [620, 870, 2], [780, 870, 0], [960, 860, 1], [1120, 820, 2],
          [1260, 740, 0], [1300, 620, 1], [1320, 480, 2], [1320, 360, 0], [1240, 240, 1], [1140, 130, 2],
          [980, 90, 0], [800, 80, 1], [620, 80, 2], [460, 100, 0], [320, 130, 1], [380, 380, 2],
          [580, 380, 0], [820, 400, 1], [580, 580, 2], [820, 580, 0], [900, 820, 1], [560, 220, 2],
          [840, 220, 0], [340, 540, 1], [880, 740, 2],
        ].map(([cx, cy, v], i) => <window.LushTree key={`lt${i}`} cx={cx} cy={cy} seed={v} />)}
        {/* Garden lanterns along main loop */}
        {[[500, 440], [880, 440], [700, 380], [700, 580], [560, 580], [820, 580]].map(([x, y], i) => <window.Lantern key={`lan${i}`} x={x} y={y}/>)}

        {/* Buildings */}
        {NODES.map(n => (
          <Building key={n.id} node={n}
            highlighted={hovered === n.id || target === n.id}
            onHover={setHovered}
            onClick={() => goTo(n.id)}
            tod={tod}
          />
        ))}

        {/* Compass rose, bottom-right */}
        <Compass cx={1310} cy={830}/>
      </svg>

      {/* Avatar token — DOM, animated with smooth transition */}
      <div style={{
        position: 'absolute',
        left: avatar.x - 14, top: avatar.y - 16,
        transition: walking ? 'left .18s linear, top .18s linear' : 'left .25s ease, top .25s ease',
        pointerEvents: 'none',
        zIndex: 5,
      }}>
        <window.AvatarToken size={32} facing={avatar.facing} />
      </div>

      {/* Hover tooltip */}
      {hovered && !activePanel ? <HoverChip node={BY_ID[hovered]} /> : null}

      {/* Toolbar */}
      <div style={{ position: 'absolute', left: 24, top: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ padding: '10px 16px', background: 'rgba(250,247,238,.85)', backdropFilter: 'blur(8px)', borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,.18)', font: '12px var(--rw-mono)', color: 'var(--rw-ink)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Parthiv's World</span>
          <span style={{ width: 1, height: 14, background: '#c8bb95' }}></span>
          <span>Click a building →</span>
        </div>
        {activePanel ? (
          <button onClick={returnToPlaza} style={{ padding: '10px 16px', background: 'var(--rw-ink)', color: 'var(--rw-cream)', border: 0, borderRadius: 10, font: '500 12px var(--rw-sans)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 18px rgba(0,0,0,.25)' }}>
            ← Return to plaza
          </button>
        ) : null}
      </div>

      {/* Mini legend */}
      <div style={{ position: 'absolute', right: 24, top: 24, padding: '12px 16px', background: 'rgba(250,247,238,.85)', backdropFilter: 'blur(8px)', borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,.18)', font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#a8553c' }}></span> Real-world</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#6fd5e0' }}></span> Futurist</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#94e2c0' }}></span> Fusion</div>
      </div>

      {/* Active panel overlay */}
      {activePanel ? <PanelOverlay nodeId={activePanel} onClose={returnToPlaza} /> : null}
    </div>
  );
}

// ─── PATHS ──────────────────────────────────────────────────────────────

function PathLayer() {
  return (
    <g>
      {WAYS.map(([a, b], i) => {
        const p1 = nodePos(a), p2 = nodePos(b);
        const mx = (p1.x + p2.x) / 2 + (i % 3 - 1) * 18;
        const my = (p1.y + p2.y) / 2 + (i % 3 - 1) * 18;
        const d = `M${p1.x} ${p1.y} Q${mx} ${my} ${p2.x} ${p2.y}`;
        return (
          <g key={i}>
            {/* Soft shadow under path */}
            <path d={d} stroke="rgba(0,0,0,.18)" strokeWidth="26" fill="none" strokeLinecap="round"/>
            {/* Cobble base */}
            <path d={d} stroke="#c8b585" strokeWidth="24" fill="none" strokeLinecap="round"/>
            {/* Cobble pattern */}
            <path d={d} stroke="url(#cobble)" strokeWidth="20" fill="none" strokeLinecap="round"/>
            {/* Edge highlight */}
            <path d={d} stroke="rgba(255,250,238,.4)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeDasharray="6 12"/>
          </g>
        );
      })}
    </g>
  );
}

function Compass({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="32" fill="rgba(250,247,238,.85)" stroke="#c8bb95"/>
      <path d={`M${cx} ${cy - 24} L${cx + 5} ${cy} L${cx} ${cy + 24} L${cx - 5} ${cy} Z`} fill="#a8553c"/>
      <path d={`M${cx - 24} ${cy} L${cx} ${cy + 5} L${cx + 24} ${cy} L${cx} ${cy - 5} Z`} fill="#2a2520"/>
      <text x={cx} y={cy - 32} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#2a2520">N</text>
      <text x={cx} y={cy + 42} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#2a2520">S</text>
      <text x={cx + 42} y={cy + 3} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#2a2520">E</text>
      <text x={cx - 42} y={cy + 3} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#2a2520">W</text>
    </g>
  );
}

// ─── BUILDING (the silhouette + label hit-target) ───────────────────────

function Building({ node, highlighted, onHover, onClick, tod }) {
  const accentByReg = {
    real: '#a8553c',
    futurist: '#6fd5e0',
    fusion: '#94e2c0',
  };
  const accent = accentByReg[node.reg];
  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Hover halo */}
      {highlighted ? <circle r="82" fill={accent} opacity=".18"/> : null}
      {/* Detailed building art */}
      <window.BuildingArt id={node.id} tod={tod} />
      {/* Label */}
      <g transform={`translate(0, ${labelOffset(node.id)})`}>
        <rect x={-node.label.length * 4 - 10} y={-13} width={node.label.length * 8 + 20} height={22} rx={11} fill={highlighted ? accent : 'rgba(250,247,238,.94)'} stroke={highlighted ? '#2a2520' : 'rgba(0,0,0,.25)'} strokeWidth=".75" filter="url(#bld-shadow)" opacity={highlighted ? 1 : .92}/>
        <rect x={-node.label.length * 4 - 10} y={-13} width={node.label.length * 8 + 20} height={22} rx={11} fill={highlighted ? accent : 'rgba(250,247,238,.94)'} stroke={highlighted ? '#2a2520' : '#c8bb95'} strokeWidth=".75" />
        <text x="0" y="2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="600" fill={highlighted ? '#fffaee' : '#2a2520'} letterSpacing=".5">{node.label}</text>
      </g>
      {/* Hit area */}
      <circle r="60" fill="transparent" />
    </g>
  );
}

// Per-building label offset to clear taller silhouettes
function labelOffset(id) {
  if (id === 'edu' || id === 'about' || id === 'rmaict' || id === 'lighthouse') return 56;
  if (id === 'forge' || id === 'workshop') return 42;
  return 50;
}

function BuildingShape({ shape, shadow, accent, tod }) {
  const sh = shadow;
  const sFill = sh ? 'rgba(0,0,0,.35)' : null;
  const stroke = sh ? 'none' : '#2a2520';
  const sw = sh ? 0 : 1.25;
  const transform = sh ? 'translate(3, 5)' : '';
  const fOpacity = sh ? '0.5' : 1;
  // Glow at night/dusk
  const interior = tod === 'night' ? '#f5d97a' : '#f5d97a';
  const interiorOp = tod === 'night' ? .95 : tod === 'dusk' ? .8 : .55;

  if (shape === 'stadium') {
    // UPDT — large futuristic oval stadium
    return (
      <g transform={transform} opacity={fOpacity}>
        <ellipse cx="0" cy="0" rx="56" ry="36" fill={sh ? sFill : '#94e2c0'} stroke={stroke} strokeWidth={sw} filter={sh ? 'url(#bldg-shadow)' : undefined}/>
        {!sh && <>
          <ellipse cx="0" cy="0" rx="44" ry="26" fill="#5a9558" stroke="#2a2520" strokeWidth="1"/>
          <rect x="-22" y="-2" width="44" height="4" fill="#f6f1e4"/>
          {/* center spot */}
          <circle cx="0" cy="0" r="3" fill="#f6f1e4"/>
          {/* drones */}
          <circle cx="-20" cy="-32" r="3" fill="#6fd5e0"/>
          <circle cx="22" cy="-30" r="3" fill="#6fd5e0"/>
          {/* glow above */}
          <ellipse cx="0" cy="-10" rx="40" ry="6" fill="#fff1c8" opacity={interiorOp - .2}/>
        </>}
      </g>
    );
  }
  if (shape === 'tower') {
    // RMAICT — tall thin futurist
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-16" y="-30" width="32" height="60" fill={sh ? sFill : '#6fd5e0'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          {/* songket base */}
          <rect x="-18" y="22" width="36" height="10" fill="#a8553c" stroke="#2a2520" strokeWidth=".75"/>
          <path d="M-18 28 L18 28" stroke="#f5d97a" strokeWidth="1"/>
          {/* windows */}
          {[-18, -8, 2, 12].map(y => <rect key={y} x="-10" y={y} width="20" height="3" fill={interior} opacity={interiorOp}/>)}
          {/* antenna */}
          <line x1="0" y1="-30" x2="0" y2="-44" stroke="#2a2520" strokeWidth="1.4"/>
          <circle cx="0" cy="-44" r="2" fill="#e07ec3"/>
        </>}
      </g>
    );
  }
  if (shape === 'frat') {
    // Pong — pitched-roof house
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-26" y="-12" width="52" height="34" fill={sh ? sFill : '#f6f1e4'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          <path d="M-30 -12 L0 -32 L30 -12 Z" fill="#a8553c" stroke="#2a2520" strokeWidth="1"/>
          {/* columns */}
          <rect x="-20" y="-6" width="4" height="28" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".75"/>
          <rect x="-2" y="-6" width="4" height="28" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".75"/>
          <rect x="16" y="-6" width="4" height="28" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".75"/>
          {/* door */}
          <rect x="-6" y="6" width="12" height="16" fill="#1a1410"/>
          {/* greek letters above */}
          <text x="0" y="-20" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="700" fill="#f6f1e4">ΠΒΠ</text>
          {/* baseball diamond on lawn */}
          <path d="M-30 28 L-20 24 L-10 28 L-20 32 Z" fill="none" stroke="#fffaee" strokeWidth=".75"/>
        </>}
      </g>
    );
  }
  if (shape === 'collegiate') {
    // Brick tower with gold letters
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-18" y="-30" width="36" height="58" fill={sh ? sFill : '#a8553c'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          {/* top trim + plaque */}
          <rect x="-22" y="-36" width="44" height="8" fill="#6e4a2a" stroke="#2a2520" strokeWidth="1"/>
          <rect x="-18" y="-32" width="36" height="6" fill="#b3a369"/>
          <text x="0" y="-26.5" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6" fontWeight="700" fill="#2a1a0e" letterSpacing="1.5">PF · CS</text>
          {/* spire */}
          <path d="M-4 -36 L0 -50 L4 -36 Z" fill="#1a1410"/>
          {/* clock */}
          <circle cx="0" cy="-12" r="6" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".8"/>
          <line x1="0" y1="-12" x2="0" y2="-16" stroke="#2a2520" strokeWidth=".8"/>
          <line x1="0" y1="-12" x2="3" y2="-10" stroke="#2a2520" strokeWidth=".8"/>
          {/* windows */}
          {[2, 14].map(y => <rect key={y} x="-8" y={y} width="16" height="4" fill={interior} opacity={interiorOp}/>)}
        </>}
      </g>
    );
  }
  if (shape === 'twins') {
    // Twin spires + sky bridge
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-22" y="-36" width="14" height="64" fill={sh ? sFill : '#cfd8dc'} stroke={stroke} strokeWidth={sw}/>
        <rect x="8" y="-36" width="14" height="64" fill={sh ? sFill : '#cfd8dc'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          <rect x="-8" y="-4" width="16" height="4" fill="#2a2520"/>
          {/* spire tips */}
          <line x1="-15" y1="-36" x2="-15" y2="-46" stroke="#2a2520" strokeWidth="1.2"/>
          <line x1="15" y1="-36" x2="15" y2="-46" stroke="#2a2520" strokeWidth="1.2"/>
          {/* windows */}
          {[-26, -16, -6, 6, 16].map(y => <g key={y}>
            <rect x="-20" y={y} width="10" height="3" fill={interior} opacity={interiorOp}/>
            <rect x="10" y={y} width="10" height="3" fill={interior} opacity={interiorOp}/>
          </g>)}
        </>}
      </g>
    );
  }
  if (shape === 'forge') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <path d="M-30 22 L-30 -6 L0 -22 L30 -6 L30 22 Z" fill={sh ? sFill : '#6e4a2a'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          {/* door */}
          <rect x="-10" y="0" width="20" height="22" fill="#f5d97a" opacity={interiorOp + .1}/>
          {/* anvil silhouette */}
          <rect x="-6" y="14" width="12" height="4" fill="#2a2520"/>
          {/* chimney */}
          <rect x="14" y="-30" width="8" height="20" fill="#a8553c" stroke="#2a2520" strokeWidth=".75"/>
          {/* sparks */}
          <circle cx="18" cy="-34" r="1.5" fill="#f5d97a"/>
          <circle cx="22" cy="-38" r="1" fill="#e07ec3"/>
          <circle cx="16" cy="-40" r=".8" fill="#6fd5e0"/>
        </>}
      </g>
    );
  }
  if (shape === 'lighthouse') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <path d="M-10 26 L-6 -20 L6 -20 L10 26 Z" fill={sh ? sFill : '#f6f1e4'} stroke={stroke} strokeWidth={sw}/>
        <rect x="-6" y="-20" width="12" height="8" fill={sh ? sFill : '#a8553c'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          <rect x="-8" y="-26" width="16" height="6" fill="#2a2520"/>
          <rect x="-4" y="-30" width="8" height="6" fill="#a8553c"/>
          <circle cx="0" cy="-15" r="3" fill="#f5d97a" opacity=".9"/>
          {/* beam */}
          <path d="M0 -15 L60 -50 L60 -30 Z" fill="#f5d97a" opacity=".22"/>
          {/* stripes */}
          <rect x="-8" y="-10" width="16" height="3" fill="#a8553c"/>
          <rect x="-9" y="4" width="18" height="3" fill="#a8553c"/>
          <rect x="-10" y="18" width="20" height="3" fill="#a8553c"/>
        </>}
      </g>
    );
  }
  if (shape === 'dome') {
    // Geodesic greenhouse
    return (
      <g transform={transform} opacity={fOpacity}>
        <ellipse cx="0" cy="0" rx="32" ry="22" fill={sh ? sFill : '#94e2c0'} stroke={stroke} strokeWidth={sw} opacity={sh ? 0.5 : 0.8}/>
        {!sh && <>
          {/* triangulation */}
          <line x1="-32" y1="0" x2="32" y2="0" stroke="#f6f1e4" strokeWidth=".75"/>
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#f6f1e4" strokeWidth=".75"/>
          <line x1="-22" y1="-15" x2="22" y2="15" stroke="#f6f1e4" strokeWidth=".75"/>
          <line x1="-22" y1="15" x2="22" y2="-15" stroke="#f6f1e4" strokeWidth=".75"/>
          {/* tiny card flowers inside */}
          <rect x="-12" y="-6" width="8" height="5" fill="#e07ec3" transform="rotate(15 -8 -4)"/>
          <rect x="4" y="-2" width="8" height="5" fill="#6fd5e0" transform="rotate(-20 8 0)"/>
          <rect x="-4" y="6" width="8" height="5" fill="#f5d97a" transform="rotate(10 0 8)"/>
        </>}
      </g>
    );
  }
  if (shape === 'fb-stadium') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <ellipse cx="0" cy="0" rx="42" ry="28" fill={sh ? sFill : '#a8553c'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          <ellipse cx="0" cy="0" rx="32" ry="20" fill="#5a9558" stroke="#2a2520" strokeWidth=".75"/>
          {Array.from({ length: 5 }).map((_, i) => <line key={i} x1={-24 + i * 12} y1={-12} x2={-24 + i * 12} y2={12} stroke="#f6f1e4" strokeWidth=".6"/>)}
          {/* floating magazine */}
          <rect x="-12" y="-32" width="24" height="14" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".75"/>
          <rect x="-10" y="-30" width="20" height="2" fill="#a8553c"/>
        </>}
      </g>
    );
  }
  if (shape === 'archive') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-22" y="-8" width="44" height="32" fill={sh ? sFill : '#c8bb95'} stroke={stroke} strokeWidth={sw}/>
        <path d="M-22 -8 Q0 -34 22 -8 Z" fill={sh ? sFill : '#6e8b5a'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          {/* dome top */}
          <circle cx="0" cy="-26" r="2" fill="#f5d97a"/>
          {/* fireflies */}
          <circle cx="-30" cy="-18" r="1.5" fill="#f5d97a" opacity=".8"/>
          <circle cx="28" cy="-22" r="1.5" fill="#6fd5e0" opacity=".8"/>
          <circle cx="-18" cy="-30" r="1.5" fill="#e07ec3" opacity=".8"/>
          {/* door */}
          <rect x="-5" y="8" width="10" height="16" fill="#2a2520"/>
        </>}
      </g>
    );
  }
  if (shape === 'zen') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <circle r="32" fill={sh ? sFill : '#e8d5a8'} stroke={stroke} strokeWidth={sw} />
        {!sh && <>
          <circle r="22" fill="none" stroke="#c8b585" strokeWidth=".75"/>
          <circle r="14" fill="none" stroke="#c8b585" strokeWidth=".75"/>
          <circle r="6" fill="none" stroke="#c8b585" strokeWidth=".75"/>
          {/* cherry tree */}
          <circle cx="0" cy="-2" r="6" fill="#e07ec3"/>
          <rect x="-1" y="0" width="2" height="6" fill="#3a2410"/>
          {/* stones */}
          <ellipse cx="14" cy="14" rx="4" ry="3" fill="#7a7064"/>
          <ellipse cx="-14" cy="14" rx="3" ry="2.5" fill="#7a7064"/>
        </>}
      </g>
    );
  }
  if (shape === 'heatmap') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-26" y="-22" width="52" height="44" fill={sh ? sFill : '#5a9558'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          {/* heatmap dots arranged in soccer-formation gradient */}
          {Array.from({ length: 28 }).map((_, i) => {
            const cx = -22 + (i % 7) * 7.5;
            const cy = -18 + Math.floor(i / 7) * 11;
            const d = Math.hypot(cx, cy);
            const hue = 50 - Math.min(50, d * 1.8);
            return <circle key={i} cx={cx} cy={cy} r="2.5" fill={`hsl(${hue}, 78%, 55%)`}/>;
          })}
          {/* center ball */}
          <circle cx="0" cy="0" r="3" fill="#f6f1e4" stroke="#2a2520" strokeWidth=".5"/>
        </>}
      </g>
    );
  }
  if (shape === 'shed') {
    return (
      <g transform={transform} opacity={fOpacity}>
        <rect x="-18" y="-8" width="36" height="28" fill={sh ? sFill : '#6e4a2a'} stroke={stroke} strokeWidth={sw}/>
        {!sh && <>
          <path d="M-22 -8 L0 -22 L22 -8 Z" fill="#5a3a18" stroke="#2a2520" strokeWidth="1"/>
          <rect x="-2" y="2" width="12" height="18" fill="#3a2410"/>
          {/* little robot on lawn */}
          <rect x="-30" y="14" width="8" height="6" fill="#c8bb95" stroke="#2a2520" strokeWidth=".5"/>
          <circle cx="-28" cy="20" r="1.5" fill="#2a2520"/>
          <circle cx="-24" cy="20" r="1.5" fill="#2a2520"/>
          <rect x="-29" y="11" width="6" height="3" fill="#6fd5e0"/>
        </>}
      </g>
    );
  }
  return null;
}

// ─── HOVER CHIP ─────────────────────────────────────────────────────────

function HoverChip({ node }) {
  return (
    <div style={{
      position: 'absolute', left: node.x + 50, top: node.y - 32,
      pointerEvents: 'none',
      background: 'rgba(42,37,32,.94)', color: 'var(--rw-cream)',
      padding: '10px 14px', borderRadius: 8,
      font: '12px var(--rw-sans)', boxShadow: '0 8px 22px rgba(0,0,0,.3)',
      maxWidth: 240, zIndex: 6,
    }}>
      <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', opacity: .65, marginBottom: 2 }}>{node.ring} ring · {node.reg}</div>
      <div style={{ font: '14px var(--rw-sans)', fontWeight: 600 }}>{node.label}</div>
      <div style={{ font: '11px var(--rw-mono)', opacity: .75, marginTop: 2 }}>{node.sub}</div>
      <div style={{ font: '10px var(--rw-mono)', opacity: .55, marginTop: 6, letterSpacing: '.1em', textTransform: 'uppercase' }}>↳ click to enter</div>
    </div>
  );
}

// ─── PANEL OVERLAY ──────────────────────────────────────────────────────

function PanelOverlay({ nodeId, onClose }) {
  const node = BY_ID[nodeId];
  const Panel = THEMED_PANEL_BY_ID[nodeId] || (() => <GenericPanel node={node} />);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(20,15,8,.55)', backdropFilter: 'blur(4px)',
      display: 'grid', placeItems: 'center', zIndex: 10,
      animation: 'rw-fade .35s ease',
    }}>
      <style>{`
        @keyframes rw-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rw-rise { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
      <div style={{ animation: 'rw-rise .4s cubic-bezier(.2,.7,.3,1)', position: 'relative', maxWidth: '92%', maxHeight: '92%' }}>
        <button onClick={onClose} style={{
          position: 'absolute', right: -14, top: -14, width: 36, height: 36, borderRadius: '50%',
          background: 'var(--rw-cream)', color: 'var(--rw-ink)', border: '1px solid #c8bb95',
          font: '14px var(--rw-mono)', cursor: 'pointer', zIndex: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,.3)',
        }}>×</button>
        <Panel />
      </div>
    </div>
  );
}

const THEMED_PANEL_BY_ID = {
  edu:   () => <window.CollegiateTowerPanel width={680} height={720} />,
  about: () => <window.TwinTowersPanel       width={680} height={720} />,
  pong:  () => <window.PongPanel             width={680} height={720} />,
};

// Generic placeholder for buildings without a finished panel yet
function GenericPanel({ node }) {
  return (
    <div style={{ width: 540, padding: 36, background: 'var(--rw-cream)', borderRadius: 4, boxShadow: '0 24px 60px rgba(0,0,0,.45)', fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)' }}>
      <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>{node.ring} ring · {node.reg}</div>
      <h2 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 6px' }}>{node.label}</h2>
      <div style={{ font: '13px var(--rw-mono)', color: 'var(--rw-ink-soft)', marginBottom: 18 }}>{node.sub}</div>
      <div style={{ padding: 18, border: '1px dashed #c8bb95', borderRadius: 4, font: '13.5px/1.55 var(--rw-sans)' }}>
        <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)', marginBottom: 6 }}>Panel frame · to be designed</div>
        Each building gets a panel themed to its identity (see brief: holographic dashboard, polaroid stack, blueprint, magazine page, journal, etc.). Three of the thirteen are detailed in the design system; the rest live as placeholders here.
      </div>
    </div>
  );
}

// ─── ANIMATION HELPER ───────────────────────────────────────────────────

function animateRoute(route, onTick, onDone, animRef) {
  // Walk along route at constant speed (px / sec)
  const SPEED = 360;
  const segs = [];
  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i], b = route[i + 1];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    segs.push({ a, b, d, t: d / SPEED });
  }
  const total = segs.reduce((s, x) => s + x.t, 0);
  const start = performance.now();
  const step = (now) => {
    let elapsed = (now - start) / 1000;
    if (elapsed >= total) {
      const last = route[route.length - 1];
      onTick(last, facingFor(segs[segs.length - 1].a, segs[segs.length - 1].b));
      onDone();
      return;
    }
    let acc = 0;
    for (const s of segs) {
      if (elapsed <= acc + s.t) {
        const local = (elapsed - acc) / s.t;
        const p = { x: s.a.x + (s.b.x - s.a.x) * local, y: s.a.y + (s.b.y - s.a.y) * local };
        onTick(p, facingFor(s.a, s.b));
        break;
      }
      acc += s.t;
    }
    animRef.current = requestAnimationFrame(step);
  };
  animRef.current = requestAnimationFrame(step);
}

function facingFor(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'east' : 'west';
  return dy > 0 ? 'south' : 'north';
}

Object.assign(window, { IslandPrototype });
