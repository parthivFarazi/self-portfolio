// world.jsx — Side-scrolling Sims-style world with camera follow.
// Replaces the top-down island map. Avatar walks left/right; camera
// tracks; buildings tower over the avatar at architectural scale.

const WORLD_W = 11800;
const WORLD_H = 1200;
const GROUND_Y = 1040;          // y of ground line in world coords
const VIEW_W = 1400;
const VIEW_H = 900;

// Buildings positioned along x-axis at world coords.
// Order roughly follows the brief's narrative: arrival → resume essentials → projects.
const WORLD_NODES = [
  { id: 'lighthouse', x: 600,   label: 'The Lighthouse',     sub: 'Contact · find me here' },
  { id: 'archive',    x: 1500,  label: 'Whispering Archive', sub: 'FAISS · Gemma-3 · semantic search' },
  { id: 'edu',        x: 2400,  label: 'Tech Tower',         sub: 'B.S. Computer Science · GT' },
  { id: 'about',      x: 3350,  label: 'Petronas Towers', sub: 'About me · KL + Atlanta' },
  // Spawn plaza at x = 4250
  { id: 'updt',       x: 5150,  label: 'UPDT. Stadium',      sub: 'Co-founder & CTO' },
  { id: 'pong',       x: 6200,  label: 'Delta Upsilon',      sub: 'Pong · baseball app' },
  { id: 'rmaict',     x: 7000,  label: 'RMAICT Tower',       sub: 'AI internship · Kuala Lumpur' },
  { id: 'forge',      x: 7900,  label: 'The Forge',          sub: 'Skills · languages + GPUs' },
  { id: 'qard',       x: 8800,  label: 'Qard Greenhouse',    sub: 'Fintech frontend · Three.js' },
  { id: 'zen',        x: 9500,  label: 'Zen Garden',         sub: 'Soothe · mental health' },
  { id: 'heatmap',    x: 10200, label: 'Heatmap Garden',     sub: 'xGenius · ORIS metric' },
  { id: 'football',   x: 10800, label: 'Athletic Stadium',   sub: 'CFB valuation' },
  { id: 'workshop',   x: 11400, label: "Robot's Workshop",   sub: 'Litter robot · the origin' },
];
const PLAZA_X = 4250;
const NODE_BY_ID = Object.fromEntries(WORLD_NODES.map(n => [n.id, n]));

// ─── WORLD SCENE ────────────────────────────────────────────────────────

function WorldScene({ tod = 'golden' }) {
  const sky = (window.SKY_PRESETS || {})[tod] || (window.SKY_PRESETS || {}).golden;
  const [avatar, setAvatar] = React.useState({ x: PLAZA_X, dir: 1, walking: false, facing: 'east' });
  const [target, setTarget] = React.useState(null);
  const [activePanel, setActivePanel] = React.useState(null);
  const [hovered, setHovered] = React.useState(null);
  const keys = React.useRef({});
  const animRef = React.useRef(null);
  const containerRef = React.useRef(null);

  // Camera: follow avatar, clamped to world edges.
  const camX = Math.max(0, Math.min(WORLD_W - VIEW_W, avatar.x - VIEW_W / 2));

  // Keyboard controls — when focused
  React.useEffect(() => {
    const down = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
        keys.current[e.key.toLowerCase()] = true;
        e.preventDefault();
        if (activePanel) setActivePanel(null);
        setTarget(null);
      }
      if (e.key === 'Escape' && activePanel) {
        setActivePanel(null);
      }
    };
    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    const c = containerRef.current;
    c.addEventListener('keydown', down);
    c.addEventListener('keyup', up);
    c.focus();
    return () => { c.removeEventListener('keydown', down); c.removeEventListener('keyup', up); };
  }, [activePanel]);

  // Free-walk loop driven by keyboard
  React.useEffect(() => {
    let last = performance.now();
    let raf;
    const SPEED = 320; // px / sec
    const tick = (now) => {
      const dt = Math.min(.05, (now - last) / 1000);
      last = now;
      let dx = 0;
      if (keys.current['arrowleft'] || keys.current['a']) dx -= 1;
      if (keys.current['arrowright'] || keys.current['d']) dx += 1;
      if (dx !== 0 && !target) {
        setAvatar(av => {
          const nx = Math.max(80, Math.min(WORLD_W - 80, av.x + dx * SPEED * dt));
          return { x: nx, dir: dx, walking: true, facing: dx > 0 ? 'east' : 'west' };
        });
      } else if (dx === 0 && !target) {
        setAvatar(av => av.walking ? { ...av, walking: false } : av);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // Click-to-walk
  const goTo = React.useCallback((nodeId) => {
    const node = NODE_BY_ID[nodeId];
    if (!node) return;
    setActivePanel(null);
    setTarget(nodeId);
    const from = avatar.x;
    const to = node.x;
    const dir = to > from ? 1 : -1;
    const dist = Math.abs(to - from);
    const SPEED = 360;
    const dur = (dist / SPEED) * 1000;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = t * (2 - t); // easeOutQuad
      const x = from + (to - from) * e;
      setAvatar({ x, dir, walking: t < 1, facing: dir > 0 ? 'east' : 'west' });
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setTarget(null);
        setActivePanel(nodeId);
      }
    };
    animRef.current = requestAnimationFrame(step);
  }, [avatar.x]);

  React.useEffect(() => () => animRef.current && cancelAnimationFrame(animRef.current), []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{
        width: VIEW_W, height: VIEW_H, position: 'relative',
        overflow: 'hidden', background: sky.gradient,
        outline: 'none', cursor: 'pointer',
        fontFamily: 'var(--rw-sans)',
      }}
    >
      {/* Far parallax — distant floating islands */}
      <ParallaxLayer camX={camX} speed={0.18}>
        <BackdropIslands tod={tod}/>
      </ParallaxLayer>
      {/* Middle parallax — sky + sun */}
      <ParallaxLayer camX={camX} speed={0.35}>
        <SkyOrnaments tod={tod}/>
      </ParallaxLayer>
      {/* Mid-ground sea + far cliffs */}
      <ParallaxLayer camX={camX} speed={0.55}>
        <DistantHorizon tod={tod}/>
      </ParallaxLayer>

      {/* World layer (1:1 with camera) */}
      <div style={{
        position: 'absolute', left: -camX, top: 0,
        width: WORLD_W, height: WORLD_H,
        willChange: 'transform',
      }}>
        <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H}
          style={{ display: 'block' }}>
          <window.ElevationDefs />
          <window.BuildingDefs />
          <defs>
            <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6db862"/>
              <stop offset="100%" stopColor="#3e6a3c"/>
            </linearGradient>
            <linearGradient id="cliff-edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9a8260"/>
              <stop offset="100%" stopColor="#4a3a22"/>
            </linearGradient>
          </defs>

          {/* Grass ground band */}
          <rect x="0" y={GROUND_Y} width={WORLD_W} height={WORLD_H - GROUND_Y} fill="url(#ground-grad)"/>
          {/* Cliff edge under ground */}
          <rect x="0" y={WORLD_H - 110} width={WORLD_W} height="110" fill="url(#cliff-edge)"/>
          {/* Cobblestone main path */}
          <rect x="0" y={GROUND_Y - 4} width={WORLD_W} height="14" fill="#c8b585"/>
          <rect x="0" y={GROUND_Y - 4} width={WORLD_W} height="14" fill="url(#cobble)" opacity=".9"/>
          <rect x="0" y={GROUND_Y - 4} width={WORLD_W} height="2" fill="rgba(255,250,238,.4)"/>

          {/* Lush trees scattered along the path edge */}
          {Array.from({ length: 60 }).map((_, i) => {
            const x = 200 + i * 200 + ((i * 137) % 130);
            if (x > WORLD_W - 200) return null;
            const isFront = i % 3 === 0;
            return <ParallaxTree key={i} x={x} y={GROUND_Y - (isFront ? 0 : -10)} variant={i % 3} scale={isFront ? 1.6 : (i % 2 === 0 ? 1.1 : 0.85)}/>;
          })}
          {/* Flower beds */}
          {Array.from({ length: 120 }).map((_, i) => {
            const x = 60 + i * 100 + ((i * 73) % 60);
            const c = ['#f5d97a', '#e07ec3', '#fffaee', '#94e2c0'][i % 4];
            return <circle key={`f${i}`} cx={x} cy={GROUND_Y + 26 + (i % 4) * 6} r={1.6} fill={c} opacity=".85"/>;
          })}

          {/* Spawn plaza */}
          <SpawnPlaza x={PLAZA_X} y={GROUND_Y}/>

          {/* Buildings */}
          {WORLD_NODES.map(n => (
            <g key={n.id} transform={`translate(${n.x}, ${GROUND_Y})`}>
              <window.BuildingElevation id={n.id} tod={tod}/>
              {/* Door hotzone */}
              <rect x="-60" y="-100" width="120" height="100" fill="transparent" style={{ cursor: 'pointer' }} onClick={() => goTo(n.id)} onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}/>
              {/* Approach indicator when nearby */}
              {Math.abs(avatar.x - n.x) < 200 && !activePanel ? (
                <g transform="translate(0, -120)" pointerEvents="none">
                  <rect x="-90" y="-22" width="180" height="44" rx="10" fill="rgba(15,15,12,.85)" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
                  <text x="0" y="-6" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="700" fill="#fffaee" letterSpacing="2">{n.label.toUpperCase()}</text>
                  <text x="0" y="8" textAnchor="middle" fontFamily="var(--rw-sans), sans-serif" fontSize="10" fill="#d4c178">{n.sub}</text>
                  <text x="0" y="18" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="rgba(255,255,255,.6)" letterSpacing="2">[E] · STEP INSIDE</text>
                </g>
              ) : null}
            </g>
          ))}

          {/* Foreground grass tufts (in front of building bases) */}
          {Array.from({ length: 80 }).map((_, i) => {
            const x = 30 + i * 150 + ((i * 53) % 110);
            return <GrassTuft key={i} x={x} y={GROUND_Y + 10 + (i % 4) * 5}/>;
          })}
        </svg>

        {/* Avatar — DOM element layered atop SVG */}
        <div style={{
          position: 'absolute',
          left: avatar.x - 26, top: GROUND_Y - 142,
          width: 52, height: 144,
          transformOrigin: 'bottom center',
          transform: avatar.facing === 'west' ? 'scaleX(-1)' : 'scaleX(1)',
          pointerEvents: 'none',
          animation: avatar.walking ? 'rw-bob .3s ease-in-out infinite' : 'none',
        }}>
          {avatar.walking
            ? <window.AvatarSide size={144} />
            : <window.AvatarFront size={144} />
          }
        </div>
        <style>{`@keyframes rw-bob { 0%, 100% { transform: ${avatar.facing === 'west' ? 'scaleX(-1)' : 'scaleX(1)'} translateY(0); } 50% { transform: ${avatar.facing === 'west' ? 'scaleX(-1)' : 'scaleX(1)'} translateY(-3px); } }`}</style>
      </div>

      {/* Foreground sea level / island base (parallax slightly faster) */}
      <ParallaxLayer camX={camX} speed={1.15}>
        <SeaForeground tod={tod}/>
      </ParallaxLayer>

      {/* HUD */}
      <Hud tod={tod} avatar={avatar} hovered={hovered ? NODE_BY_ID[hovered] : null} camX={camX} onJump={goTo} returnToPlaza={() => goTo('plaza')}/>
      {/* Minimap */}
      <Minimap avatarX={avatar.x} hovered={hovered} onJump={goTo}/>

      {/* Active panel overlay */}
      {activePanel ? <PanelOverlay nodeId={activePanel} onClose={() => setActivePanel(null)}/> : null}
    </div>
  );
}

// ─── PARALLAX HELPER ────────────────────────────────────────────────────
function ParallaxLayer({ camX, speed, children }) {
  return (
    <div style={{
      position: 'absolute', left: -camX * speed, top: 0,
      width: WORLD_W, height: WORLD_H, pointerEvents: 'none',
    }}>
      {children}
    </div>
  );
}

// ─── BACKDROP — distant floating islands ────────────────────────────────
function BackdropIslands({ tod }) {
  const fade = tod === 'night' ? .35 : tod === 'dusk' ? .55 : .7;
  return (
    <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H} style={{ position: 'absolute' }}>
      {[
        [800, 280, 1, .8],
        [2400, 220, 2, .7],
        [4400, 260, 1, .85],
        [6200, 200, 3, .6],
        [8400, 250, 2, .75],
        [10400, 230, 1, .7],
      ].map(([x, y, v, s], i) => (
        <g key={i} transform={`translate(${x}, ${y}) scale(${s})`} opacity={fade}>
          <BackdropIsland variant={v}/>
        </g>
      ))}
    </svg>
  );
}

function BackdropIsland({ variant }) {
  return (
    <g>
      {/* Island body */}
      <path d="M0 0 Q60 -28 160 -32 Q280 -28 360 -10 Q400 6 380 22 Q300 36 200 32 Q80 30 20 18 Q-20 6 0 0 Z" fill="#9aae8a" opacity=".9"/>
      <path d="M40 16 Q120 60 180 70 Q240 76 300 60 Q360 30 380 20 Q360 30 280 28 Q200 28 120 24 Q60 20 40 16 Z" fill="#6e8268"/>
      {/* trees */}
      <ellipse cx="100" cy="-22" rx="22" ry="26" fill="#3e6a3c" opacity=".85"/>
      <ellipse cx="170" cy="-30" rx="28" ry="32" fill="#3e6a3c" opacity=".85"/>
      <ellipse cx="250" cy="-26" rx="24" ry="28" fill="#3e6a3c" opacity=".85"/>
      {/* tiny structure */}
      {variant === 1 && <rect x="200" y="-50" width="6" height="20" fill="#a8553c" opacity=".7"/>}
      {variant === 2 && <path d="M180 -36 L186 -56 L192 -36 Z" fill="#857a5a" opacity=".7"/>}
    </g>
  );
}

// ─── SKY ORNAMENTS ──────────────────────────────────────────────────────
function SkyOrnaments({ tod }) {
  if (tod === 'night') {
    return (
      <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H} style={{ position: 'absolute' }}>
        {/* Moon */}
        <circle cx="2400" cy="220" r="60" fill="#fffaee" opacity=".9"/>
        <circle cx="2400" cy="220" r="60" fill="#a8b4bc" opacity=".25"/>
        <circle cx="2384" cy="208" r="6" fill="#a8b4bc" opacity=".5"/>
        <circle cx="2418" cy="232" r="8" fill="#a8b4bc" opacity=".4"/>
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (i * 247) % WORLD_W;
          const y = ((i * 91) % 400) + 40;
          return <circle key={i} cx={x} cy={y} r={Math.random() * 1.2 + .4} fill="#fffaee" opacity={.5 + Math.random() * .4}/>;
        })}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H} style={{ position: 'absolute' }}>
      {/* Sun */}
      <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff1c8"/>
        <stop offset="60%" stopColor="#ffc88a" stopOpacity=".5"/>
        <stop offset="100%" stopColor="#ffc88a" stopOpacity="0"/>
      </radialGradient>
      <circle cx="3400" cy="200" r="180" fill="url(#sun-glow)"/>
      <circle cx="3400" cy="200" r="50" fill="#fff1c8"/>
      {/* Soft clouds */}
      {[
        [1200, 120], [2200, 160], [4800, 130], [6400, 180], [8200, 140], [10200, 170],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="0" rx="60" ry="14" fill="#fffaee" opacity=".55"/>
          <ellipse cx="-30" cy="-4" rx="34" ry="12" fill="#fffaee" opacity=".5"/>
          <ellipse cx="30" cy="-4" rx="36" ry="12" fill="#fffaee" opacity=".5"/>
          <ellipse cx="0" cy="-12" rx="22" ry="10" fill="#fffaee" opacity=".4"/>
        </g>
      ))}
    </svg>
  );
}

// ─── DISTANT HORIZON ────────────────────────────────────────────────────
function DistantHorizon({ tod }) {
  const isNight = tod === 'night';
  return (
    <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H} style={{ position: 'absolute' }}>
      {/* Far hills/mountains */}
      <path d={`M0 ${GROUND_Y - 40} ` + Array.from({ length: 40 }).map((_, i) => {
        const x = (i / 40) * WORLD_W;
        const y = GROUND_Y - 40 - Math.abs(Math.sin(i * 0.62)) * 80;
        return `L${x} ${y} `;
      }).join('') + `L${WORLD_W} ${GROUND_Y - 40} Z`} fill={isNight ? '#1e2a3a' : '#7a8b6a'} opacity=".6"/>
      {/* Closer hills */}
      <path d={`M0 ${GROUND_Y - 20} ` + Array.from({ length: 50 }).map((_, i) => {
        const x = (i / 50) * WORLD_W;
        const y = GROUND_Y - 20 - Math.abs(Math.sin(i * 0.41 + 1)) * 50;
        return `L${x} ${y} `;
      }).join('') + `L${WORLD_W} ${GROUND_Y - 20} Z`} fill={isNight ? '#15202e' : '#5a7a4e'} opacity=".75"/>
    </svg>
  );
}

// ─── SEA FOREGROUND ─────────────────────────────────────────────────────
function SeaForeground({ tod }) {
  return (
    <svg viewBox={`0 0 ${WORLD_W} ${WORLD_H}`} width={WORLD_W} height={WORLD_H} style={{ position: 'absolute' }}>
      {/* Foreground grass wisps moved in front */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * WORLD_W) / 40 + ((i * 37) % 100);
        return <g key={i} transform={`translate(${x}, ${GROUND_Y + 40})`}>
          <path d="M0 0 Q-2 -8 -1 -14 L1 -12 Q3 -6 2 0 Z" fill="#3e6a3c" opacity=".7"/>
          <path d="M3 0 Q5 -10 8 -14 L9 -10 Q7 -2 5 0 Z" fill="#5a9558" opacity=".7"/>
        </g>;
      })}
    </svg>
  );
}

// ─── PARALLAX TREE (in-world) ────────────────────────────────────────────
function ParallaxTree({ x, y, variant = 0, scale = 1 }) {
  const trunkColor = '#3a2410';
  const canopyA = ['#5a9558', '#3e6a3c', '#4f8b4f'][variant];
  const canopyB = ['#3e6a3c', '#5a9558', '#3a5e3a'][variant];
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="6" rx="22" ry="5" fill="rgba(0,0,0,.25)"/>
      <rect x="-3" y="-26" width="6" height="32" fill={trunkColor}/>
      <ellipse cx="-12" cy="-32" rx="18" ry="22" fill={canopyA}/>
      <ellipse cx="12" cy="-36" rx="22" ry="26" fill={canopyB}/>
      <ellipse cx="0" cy="-48" rx="16" ry="18" fill={canopyA}/>
      {/* Highlight */}
      <ellipse cx="8" cy="-46" rx="10" ry="10" fill="#7eb86a" opacity=".5"/>
      {/* Falling leaves */}
      <circle cx="20" cy="-10" r="1.5" fill="#7eb86a"/>
      <circle cx="-18" cy="-4" r="1.5" fill="#a8d49f"/>
    </g>
  );
}

function GrassTuft({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path d="M0 0 Q-3 -6 -2 -12 L0 -10 Q3 -4 0 0 Z" fill="#5a9558"/>
      <path d="M2 0 Q4 -8 6 -12 L7 -8 Q5 -2 3 0 Z" fill="#7eb86a"/>
      <path d="M-3 0 Q-5 -5 -6 -10 L-4 -9 Q-2 -4 -3 0 Z" fill="#4a8a48"/>
    </g>
  );
}

// ─── SPAWN PLAZA ────────────────────────────────────────────────────────
function SpawnPlaza({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Plaza paving */}
      <ellipse cx="0" cy="0" rx="220" ry="22" fill="#c8b585"/>
      <ellipse cx="0" cy="0" rx="220" ry="22" fill="url(#cobble)" opacity=".95"/>
      <ellipse cx="0" cy="-2" rx="220" ry="22" fill="none" stroke="#857a5a" strokeWidth="2"/>
      {/* Plaza pavers (radial) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x2 = Math.cos(a) * 200, y2 = Math.sin(a) * 20;
        return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke="#857a5a" strokeWidth=".8" opacity=".5"/>;
      })}
      {/* Welcome sign — wooden post */}
      <g transform="translate(-90, 0)">
        <rect x="-3" y="-90" width="6" height="90" fill="#3a2410"/>
        <rect x="-50" y="-110" width="100" height="40" fill="#5a3a18" stroke="#1a1410" strokeWidth="1.5"/>
        <rect x="-46" y="-106" width="92" height="32" fill="#7a5234"/>
        <text x="0" y="-90" textAnchor="middle" fontFamily="Caveat,cursive" fontSize="22" fontWeight="700" fill="#fffaee">welcome</text>
        <text x="0" y="-76" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#f5d97a" letterSpacing="2">PARTHIV'S WORLD · v.1</text>
        {/* Hanging chain */}
        <line x1="-46" y1="-110" x2="-50" y2="-118" stroke="#1a1410" strokeWidth="1.5"/>
      </g>
      {/* Map pedestal */}
      <g transform="translate(90, 0)">
        <rect x="-12" y="-32" width="24" height="32" fill="#5a4a3e"/>
        <rect x="-14" y="-34" width="28" height="4" fill="#3a2a1e"/>
        <rect x="-18" y="-46" width="36" height="14" fill="#7a5234"/>
        <rect x="-18" y="-46" width="36" height="3" fill="#a8553c"/>
        <text x="0" y="-36" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="700" fill="#fffaee">MAP · PF</text>
        {/* Compass on top */}
        <circle cx="0" cy="-52" r="8" fill="#b3a369"/>
        <path d="M0 -60 L2 -52 L0 -44 L-2 -52 Z" fill="#a8553c"/>
        <path d="M-8 -52 L0 -50 L8 -52 L0 -54 Z" fill="#2a2520"/>
      </g>
      {/* "You are here" pedestal flag */}
      <g transform="translate(0, -4)">
        <line x1="0" y1="0" x2="0" y2="-60" stroke="#2a2520" strokeWidth="2"/>
        <path d="M0 -56 L36 -52 L28 -44 L36 -36 L0 -40 Z" fill="#f5d97a" stroke="#1a1410" strokeWidth="1"/>
        <text x="8" y="-46" fontFamily="Instrument Serif,serif" fontStyle="italic" fontSize="12" fill="#1a1410">spawn</text>
      </g>
    </g>
  );
}

// ─── HUD ────────────────────────────────────────────────────────────────
function Hud({ tod, avatar, hovered, camX, onJump, returnToPlaza }) {
  return (
    <>
      {/* Top bar */}
      <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 10, alignItems: 'center', pointerEvents: 'none' }}>
        <div style={{ padding: '8px 14px', background: 'rgba(15,15,12,.78)', backdropFilter: 'blur(8px)', borderRadius: 999, font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: '#fffaee', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7cd17a', boxShadow: '0 0 8px #7cd17a' }}></span>
          Parthiv's World
        </div>
        <div style={{ padding: '8px 14px', background: 'rgba(255,250,238,.85)', backdropFilter: 'blur(8px)', borderRadius: 999, font: '11px var(--rw-mono)', color: 'var(--rw-ink)', letterSpacing: '.06em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <kbd style={kbdStyle}>←</kbd><kbd style={kbdStyle}>→</kbd> or <kbd style={kbdStyle}>A</kbd><kbd style={kbdStyle}>D</kbd> · click to walk
        </div>
      </div>

      {/* Right-side hover info */}
      {hovered ? (
        <div style={{
          position: 'absolute', right: 24, top: 70,
          padding: '14px 18px',
          background: 'rgba(15,15,12,.88)', backdropFilter: 'blur(10px)',
          color: '#fffaee', borderRadius: 12,
          boxShadow: '0 12px 32px rgba(0,0,0,.4)',
          maxWidth: 260, pointerEvents: 'none',
        }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#d4c178', marginBottom: 4 }}>You see…</div>
          <div style={{ font: '17px var(--rw-serif)', fontStyle: 'italic', marginBottom: 2 }}>{hovered.label}</div>
          <div style={{ font: '11.5px var(--rw-mono)', color: 'rgba(255,250,238,.7)' }}>{hovered.sub}</div>
          <div style={{ marginTop: 8, font: '10px var(--rw-mono)', color: 'rgba(255,250,238,.5)', letterSpacing: '.1em' }}>↳ click to enter</div>
        </div>
      ) : null}

      {/* Bottom location ticker */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 18, padding: '8px 14px', background: 'rgba(15,15,12,.78)', backdropFilter: 'blur(8px)', borderRadius: 999, font: '11px var(--rw-mono)', color: '#fffaee', letterSpacing: '.14em', textTransform: 'uppercase', display: 'inline-flex', gap: 8, alignItems: 'center', pointerEvents: 'none' }}>
        <span style={{ opacity: .6 }}>x:</span>
        <span>{Math.round(avatar.x).toString().padStart(5, '0')}</span>
        <span style={{ opacity: .4 }}>/</span>
        <span style={{ opacity: .6 }}>{WORLD_W}</span>
        <span style={{ opacity: .4, padding: '0 4px' }}>·</span>
        <span style={{ color: '#94e2c0' }}>{nearestLocation(avatar.x)}</span>
      </div>

      {/* Tap to return to spawn */}
      <button onClick={returnToPlaza} style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 56,
        padding: '8px 14px',
        background: 'rgba(255,250,238,.92)', backdropFilter: 'blur(8px)',
        border: 'none', borderRadius: 999, font: '500 11.5px var(--rw-sans)', color: 'var(--rw-ink)',
        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 12px rgba(0,0,0,.18)',
      }}>↺ Back to plaza</button>
    </>
  );
}

const kbdStyle = {
  display: 'inline-grid', placeItems: 'center',
  minWidth: 18, height: 18, padding: '0 4px',
  background: '#fff', border: '1px solid rgba(0,0,0,.15)',
  borderBottomWidth: 2, borderRadius: 4,
  fontFamily: 'var(--rw-mono)', fontSize: 10, fontWeight: 600, color: 'var(--rw-ink)',
};

function nearestLocation(x) {
  let best = null, bestD = Infinity;
  for (const n of WORLD_NODES) {
    const d = Math.abs(n.x - x);
    if (d < bestD) { bestD = d; best = n; }
  }
  if (Math.abs(x - PLAZA_X) < bestD) return 'Spawn plaza';
  return bestD < 250 ? best.label : `→ ${best.label}`;
}

// ─── MINIMAP ─────────────────────────────────────────────────────────────
function Minimap({ avatarX, hovered, onJump }) {
  const W = 380, H = 50;
  const scale = W / WORLD_W;
  return (
    <div style={{
      position: 'absolute', right: 18, bottom: 18,
      width: W + 24, padding: '10px 12px 14px',
      background: 'rgba(15,15,12,.82)', backdropFilter: 'blur(10px)',
      borderRadius: 12, color: '#fffaee',
      boxShadow: '0 12px 32px rgba(0,0,0,.35)',
    }}>
      <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#d4c178', marginBottom: 8 }}>Island · world map</div>
      <div style={{ position: 'relative', height: H, background: 'linear-gradient(180deg, #6db862 60%, #4a8896 80%, #2e5a68 100%)', borderRadius: 6 }}>
        {/* Buildings as ticks */}
        {WORLD_NODES.map(n => {
          const left = n.x * scale;
          return (
            <button key={n.id} onClick={() => onJump(n.id)} style={{
              position: 'absolute', left, top: 4, width: 14, height: H - 8,
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            }}>
              <div style={{ width: 3, height: H - 12, background: hovered === n.id ? '#f5d97a' : '#fffaee', margin: '0 auto', borderRadius: 1, opacity: .85 }}></div>
            </button>
          );
        })}
        {/* Plaza marker */}
        <div style={{ position: 'absolute', left: PLAZA_X * scale - 1, top: 2, width: 4, height: H - 4, background: '#f5d97a', boxShadow: '0 0 6px #f5d97a' }}></div>
        {/* Avatar position */}
        <div style={{ position: 'absolute', left: avatarX * scale - 6, top: -8, transition: 'left .15s linear' }}>
          <div style={{ width: 12, height: 16, background: '#e07ec3', clipPath: 'polygon(50% 100%, 0 0, 100% 0)', boxShadow: '0 2px 6px rgba(0,0,0,.5)' }}></div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, font: '9px var(--rw-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,250,238,.6)' }}>
        <span>← west</span>
        <span>spawn</span>
        <span>east →</span>
      </div>
    </div>
  );
}

// ─── PANEL OVERLAY ──────────────────────────────────────────────────────
const PANEL_BY_ID = {
  // Resume-essentials panels (themed paper/material)
  edu:   () => <window.CollegiateTowerPanel width={680} height={760} />,
  about: () => <window.PetronasTowersPanel       width={720} height={760} />,
  // Project panels (with image slots)
  updt:      () => <window.UPDTPanel        width={820} height={780} />,
  pong:      () => <window.PongPanelV2      width={760} height={780} />,
  qard:      () => <window.QardPanel        width={760} height={780} />,
  zen:       () => <window.SoothePanel      width={760} height={780} />,
  workshop:  () => <window.WorkshopPanel    width={760} height={780} />,
};

function PanelOverlay({ nodeId, onClose }) {
  const node = NODE_BY_ID[nodeId];
  const Panel = PANEL_BY_ID[nodeId] || (() => <GenericPanel node={node}/>);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(20,15,8,.6)', backdropFilter: 'blur(6px)',
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
        <Panel/>
      </div>
    </div>
  );
}

function GenericPanel({ node }) {
  return (
    <div style={{ width: 540, padding: 36, background: 'var(--rw-cream)', borderRadius: 4, boxShadow: '0 24px 60px rgba(0,0,0,.45)', fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)' }}>
      <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>{node.label}</div>
      <h2 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 6px' }}>{node.label}</h2>
      <div style={{ font: '13px var(--rw-mono)', color: 'var(--rw-ink-soft)', marginBottom: 18 }}>{node.sub}</div>
      <div style={{ padding: 18, border: '1px dashed #c8bb95', borderRadius: 4, font: '13.5px/1.55 var(--rw-sans)' }}>
        <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)', marginBottom: 6 }}>Panel frame · to be designed</div>
        Each building gets a panel themed to its identity (parchment scroll, polaroid stack, blueprint, magazine page, journal, etc.). Three of the thirteen are detailed in the design system; the rest live as placeholders here.
      </div>
    </div>
  );
}

// ─── PANEL OVERLAY (re-export from island) ──────────────────────────────
// island.jsx already exposes PanelOverlay — but in case of load order issues
// we provide a fallback. Use window.PanelOverlay set by island.jsx if present.

Object.assign(window, { WorldScene });
