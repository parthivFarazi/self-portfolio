// scenes-hero.jsx — Hero isometric concept scenes (landmarks + spawn + UPDT).
// Each scene: 1280×720, viewBox -640 -540 1280 720.
// World coords: +x bottom-right depth, +y bottom-left, +z up.
// Buildings are anchored around world origin; avatar placed ~front-right for scale.

// ─── COMMON HELPERS ─────────────────────────────────────────────────────

function PlazaTile({ x = 0, y = 0, w = 280, d = 220, lit }) {
  // Cobblestone hex-ish plaza at ground level
  const pts = [
    [x - w/2, y - d/2, 0], [x + w/2, y - d/2, 0],
    [x + w/2, y + d/2, 0], [x - w/2, y + d/2, 0],
  ];
  return (
    <g>
      <polygon points={window.poly(pts)} fill="#c8b585" stroke="#857a5a" strokeWidth="1"/>
      <polygon points={window.poly(pts)} fill="url(#cobble)" opacity=".9"/>
      {/* Subtle ambient occlusion at edges */}
      <polygon points={window.poly(pts)} fill="none" stroke="rgba(40,30,20,.3)" strokeWidth="2"/>
    </g>
  );
}

function AvatarAtWorld({ x, y, facing = 'south', size = 78 }) {
  const c = window.iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      {/* Long late-afternoon shadow trailing back-left */}
      <ellipse cx="14" cy="3" rx="22" ry="6" fill="rgba(0,0,0,.45)" transform="rotate(-22 0 0)"/>
      <window.IsoAvatar size={size} facing={facing}/>
    </g>
  );
}

// "Look up!" indicator dotted arc from avatar to building top — adds drama.
function GazeArc({ from, to, color = 'rgba(255,250,238,.4)' }) {
  const a = window.iso(from[0], from[1], from[2]);
  const b = window.iso(to[0], to[1], to[2]);
  const mx = (a.x + b.x) / 2 + 80;
  const my = Math.min(a.y, b.y) - 60;
  return (
    <path d={`M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`} stroke={color} strokeWidth="1.2" strokeDasharray="2 6" fill="none"/>
  );
}

// ─── SCENE 1: SPAWN PLAZA ───────────────────────────────────────────────

function SceneSpawnPlaza({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="01 · spawn" label="The Welcome Plaza" sub="Paths radiate to all 13 buildings">
      {/* Path rays — N (back), S (front), E (right), W (left) */}
      <window.IsoPath pts={[[0, 0], [-200, 0]]} width={62}/>
      <window.IsoPath pts={[[0, 0], [200, 0]]} width={62}/>
      <window.IsoPath pts={[[0, 0], [0, -200]]} width={62}/>
      <window.IsoPath pts={[[0, 0], [0, 200]]} width={62}/>
      {/* Plaza disk */}
      <PlazaTile x={0} y={0} w={280} d={280}/>
      {/* Radial cobblestone joints */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 130;
        const x1 = Math.cos(a) * 16, y1 = Math.sin(a) * 16;
        const x2 = Math.cos(a) * r, y2 = Math.sin(a) * r;
        const p1 = window.iso(x1, y1, 0), p2 = window.iso(x2, y2, 0);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(40,30,20,.25)" strokeWidth="1"/>;
      })}

      {/* UPDT stadium glimpsed in distance to the "north" (back) — far smaller */}
      <g transform="translate(-220, -260) scale(.5)" opacity=".75">
        <DistantStadiumSilhouette tod={tod}/>
      </g>
      {/* Tech Tower silhouette far-left */}
      <g transform="translate(-360, -200) scale(.35)" opacity=".55">
        <DistantTowerSilhouette tod={tod} kind="tech"/>
      </g>
      {/* Petronas glimpsed back-right */}
      <g transform="translate(280, -250) scale(.42)" opacity=".7">
        <DistantTowerSilhouette tod={tod} kind="petronas"/>
      </g>

      {/* Welcome sign — wooden post with carved sign */}
      <WelcomeSign worldX={-60} worldY={60} tod={tod}/>
      {/* Map pedestal */}
      <MapPedestal worldX={70} worldY={-70} tod={tod}/>
      {/* Directional arrows on each path */}
      <DirectionalSignpost worldX={140} worldY={0} dir="N" label="petronas →"/>
      <DirectionalSignpost worldX={-140} worldY={0} dir="S" label="← tech tower"/>
      <DirectionalSignpost worldX={0} worldY={140} dir="E" label="forge →"/>
      <DirectionalSignpost worldX={0} worldY={-140} dir="W" label="← lighthouse"/>

      {/* Lanterns on plaza corners */}
      <window.IsoLantern x={-120} y={120} lit={tod === 'night' ? 1 : .55}/>
      <window.IsoLantern x={120} y={-120} lit={tod === 'night' ? 1 : .55}/>
      <window.IsoLantern x={-120} y={-120} lit={tod === 'night' ? 1 : .55}/>
      <window.IsoLantern x={120} y={120} lit={tod === 'night' ? 1 : .55}/>

      {/* Foreground trees flanking */}
      <window.IsoTree x={220} y={-180} variant={0} scale={1.3} tod={tod}/>
      <window.IsoTree x={-220} y={180} variant={1} scale={1.15} tod={tod}/>
      <window.IsoTree x={-180} y={-220} variant={2} scale={1} tod={tod}/>
      <window.IsoBush x={150} y={100} scale={1.1}/>
      <window.IsoBush x={-150} y={-100} scale={1}/>

      {/* Player avatar — center on plaza */}
      <AvatarAtWorld x={-10} y={20} facing="south" size={78}/>

      {/* Cute "you" indicator */}
      <PlayerIndicator x={-10} y={20}/>
    </window.IsoScene>
  );
}

function DistantStadiumSilhouette({ tod }) {
  const lit = tod === 'night' ? 1 : .55;
  return (
    <g>
      <ellipse cx="0" cy="0" rx="120" ry="40" fill="#5a6a72"/>
      <ellipse cx="0" cy="-8" rx="120" ry="40" fill="#94d4b8" opacity=".7"/>
      <path d="M-120 -8 Q-120 -50 0 -52 Q120 -50 120 -8" stroke="#262a2e" strokeWidth="3" fill="none"/>
      {/* Floodlights */}
      {[-90, -30, 30, 90].map(x => <g key={x}>
        <line x1={x} y1="-52" x2={x} y2="-80" stroke="#1a1410" strokeWidth="2"/>
        <rect x={x - 6} y="-86" width="12" height="6" fill="#fff1c8"/>
      </g>)}
      {/* Sign */}
      <rect x="-50" y="-30" width="100" height="22" rx="2" fill="#0e1820"/>
      <text x="0" y="-15" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="16" fontWeight="900" fill="#94e2c0" letterSpacing="2">UPDT.</text>
    </g>
  );
}

function DistantTowerSilhouette({ tod, kind }) {
  if (kind === 'petronas') {
    return (
      <g>
        <rect x="-60" y="-180" width="40" height="180" fill="#a8b4bc"/>
        <rect x="20" y="-180" width="40" height="180" fill="#a8b4bc"/>
        <rect x="-20" y="-100" width="40" height="14" fill="#5a6a72"/>
        <line x1="-40" y1="-180" x2="-40" y2="-240" stroke="#262a2e" strokeWidth="2"/>
        <line x1="40" y1="-180" x2="40" y2="-240" stroke="#262a2e" strokeWidth="2"/>
        {Array.from({ length: 30 }).map((_, i) => (
          <g key={i}>
            <rect x="-60" y={-180 + i * 6 + 2} width="40" height="2" fill="#f5d97a" opacity={tod === 'night' ? .65 : .35}/>
            <rect x="20" y={-180 + i * 6 + 2} width="40" height="2" fill="#f5d97a" opacity={tod === 'night' ? .65 : .35}/>
          </g>
        ))}
      </g>
    );
  }
  // Tech tower
  return (
    <g>
      <rect x="-30" y="-180" width="60" height="180" fill="#a8553c"/>
      <rect x="-30" y="-200" width="60" height="20" fill="#8a4332"/>
      <rect x="-26" y="-196" width="52" height="14" fill="#d4b94a"/>
      <text x="0" y="-185" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="900" fill="#1a1410">TECH</text>
      <path d="M-32 -200 L0 -240 L32 -200 Z" fill="#3a4652"/>
      <line x1="0" y1="-240" x2="0" y2="-260" stroke="#1a1410" strokeWidth="2"/>
      <circle cx="0" cy="-130" r="11" fill="#fffaee" stroke="#1a1410" strokeWidth="1"/>
    </g>
  );
}

function WelcomeSign({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      {/* Shadow */}
      <ellipse cx="6" cy="2" rx="40" ry="6" fill="rgba(0,0,0,.4)"/>
      {/* Post */}
      <rect x="-3" y="-100" width="6" height="100" fill="#3a2410"/>
      {/* Sign board */}
      <g transform="translate(0, -120)">
        <rect x="-58" y="-32" width="116" height="44" fill="#5a3a18" stroke="#1a1410" strokeWidth="1.5"/>
        <rect x="-54" y="-28" width="108" height="36" fill="#7a5234"/>
        <rect x="-54" y="-28" width="108" height="6" fill="rgba(255,250,238,.18)"/>
        <text x="0" y="-8" textAnchor="middle" fontFamily="Caveat,cursive" fontSize="24" fontWeight="700" fill="#fffaee">welcome</text>
        <text x="0" y="6" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#f5d97a" letterSpacing="2">RESUME WORLD · v.1</text>
      </g>
      {/* Hanging chain */}
      <line x1="-58" y1="-120" x2="-50" y2="-100" stroke="#1a1410" strokeWidth="1.2"/>
    </g>
  );
}

function MapPedestal({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="2" cy="2" rx="22" ry="6" fill="rgba(0,0,0,.4)"/>
      {/* Stone pedestal */}
      <window.IsoBox x={worldX - 18 - worldX} y={worldY - 14 - worldY} z={0} w={36} d={28} h={40}
        front="#7a7064" right="#5a5048" top="#a89878" stroke="#3a2a1e"/>
      {/* Map plaque on top */}
      <g transform="translate(0, -50)">
        <polygon points={window.poly([
          [-20, -16, 0], [20, -16, 0], [20, 16, 0], [-20, 16, 0],
        ])} fill="#7a5234" stroke="#1a1410" strokeWidth="1"/>
        <polygon points={window.poly([
          [-16, -12, 0], [16, -12, 0], [16, 12, 0], [-16, 12, 0],
        ])} fill="#c8b585"/>
        {/* Tiny map dots */}
        <circle cx="0" cy="0" r="2.5" fill="#a8553c"/>
        <circle cx="-12" cy="-6" r="1.5" fill="#5a9558"/>
        <circle cx="10" cy="-4" r="1.5" fill="#5a9558"/>
        <circle cx="6" cy="6" r="1.5" fill="#5a9558"/>
        <circle cx="-8" cy="5" r="1.5" fill="#5a9558"/>
      </g>
      {/* Plate label */}
      <rect x="-22" y="-8" width="44" height="8" fill="#b3a369" stroke="#1a1410" strokeWidth=".5"/>
      <text x="0" y="-2" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7" fontWeight="700" fill="#1a1410" letterSpacing="1">MAP · PF</text>
    </g>
  );
}

function DirectionalSignpost({ worldX, worldY, dir, label }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <rect x="-2" y="-50" width="4" height="50" fill="#2a1c10"/>
      <rect x="-30" y="-58" width="60" height="14" fill="#5a3a18" stroke="#1a1410" strokeWidth=".5"/>
      <text x="0" y="-49" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="700" fill="#fffaee" letterSpacing="1">{label}</text>
      <circle cx="0" cy="-52" r="3" fill="#d4c178"/>
      <text x="0" y="-50" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fontWeight="700" fill="#1a1410">{dir}</text>
    </g>
  );
}

function PlayerIndicator({ x, y }) {
  const c = window.iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y - 120})`}>
      <path d="M-5 0 L0 -10 L5 0 Z" fill="#94e2c0"/>
      <circle cx="0" cy="-16" r="3" fill="#94e2c0"/>
      <circle cx="0" cy="-16" r="3" fill="#94e2c0" opacity=".4"/>
    </g>
  );
}

// ─── SCENE 2: UPDT STADIUM ──────────────────────────────────────────────

function SceneUPDTStadium({ tod = 'golden' }) {
  const lit = tod === 'night' ? 1 : tod === 'dusk' ? .85 : .55;
  return (
    <window.IsoScene tod={tod} location="02 · company" label="UPDT. Soccer Stadium" sub="Co-founder & CTO · updt.pro">
      {/* Path leading to stadium */}
      <window.IsoPath pts={[[100, 200], [80, 80]]} width={70}/>

      {/* Stadium — large translucent glass bowl */}
      <UPDTStadiumIso tod={tod}/>

      {/* Drones in the air */}
      <UpdtDroneIso x={-100} y={-220} z={140} tod={tod}/>
      <UpdtDroneIso x={120} y={-160} z={180} tod={tod}/>
      <UpdtDroneIso x={-40} y={-280} z={120} tod={tod}/>

      {/* Foreground: avatar + plant */}
      <window.IsoTree x={-200} y={140} variant={2} scale={1.2} tod={tod}/>
      <window.IsoBush x={140} y={160} scale={1.1}/>
      <AvatarAtWorld x={60} y={180} facing="south" size={68}/>
      <GazeArc from={[60, 180, 110]} to={[0, 0, 320]}/>
      <ScaleAnnotation worldX={140} worldY={170} text="player · 6 ft" color="#94e2c0"/>
    </window.IsoScene>
  );
}

function UPDTStadiumIso({ tod }) {
  const lit = tod === 'night' ? 1 : tod === 'dusk' ? .85 : .55;
  const I = window.iso;
  // Pitch half-extents (long axis runs along world x)
  const PX = 200, PY = 130;
  // Stadium outer envelope (concrete + bleachers extend out by ~70 on all sides)
  const OX = PX + 80, OY = PY + 80;
  const STAND_H = 78;     // bleacher height at the outer rim

  // ─── Helpers ─────────────────────────────────────────────────────────
  // Draw a single rectangular bleacher tier section — a flat quad from
  // inner-bottom (pitch level) to outer-top (rim level), sloping outward.
  // edges: inner = [x1,y1] -> [x2,y2] at pitch level; outer extends in dir.
  function Grandstand({ kind }) {
    // kind: 'N' (y=-PY → y=-OY) — visible to camera (FAR side)
    // kind: 'W' (x=-PX → x=-OX) — visible to camera (FAR side)
    // kind: 'S' (y=+PY → y=+OY) — near side, drawn as low barrier only
    // kind: 'E' (x=+PX → x=+OX) — near side, drawn as low barrier only
    if (kind === 'N') {
      const corners = [
        [-PX, -PY, 0], [PX, -PY, 0],
        [PX, -OY, STAND_H], [-PX, -OY, STAND_H],
      ];
      // Concrete face under bleachers
      const inset = 6;
      return (
        <g>
          {/* Concrete back exterior face (vertical wall behind the seating) */}
          <polygon points={window.poly([[-PX, -OY, 0], [PX, -OY, 0], [PX, -OY, STAND_H + 18], [-PX, -OY, STAND_H + 18]])}
            fill="#3a4652" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          {/* Top concrete ring */}
          <polygon points={window.poly([[-PX, -OY, STAND_H + 18], [PX, -OY, STAND_H + 18], [PX, -OY + inset, STAND_H + 18], [-PX, -OY + inset, STAND_H + 18]])}
            fill="#4a5662" stroke="rgba(0,0,0,.4)" strokeWidth=".5"/>
          {/* Sloped seating surface */}
          <polygon points={window.poly(corners)}
            fill={tod === 'night' ? '#2a323a' : '#6a7280'} stroke="rgba(0,0,0,.45)" strokeWidth=".6"/>
          {/* Seat row lines (rake) */}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = (i + 1) / 8;
            const z = STAND_H * t;
            const y = -PY - (OY - PY) * t;
            const p1 = I(-PX, y, z), p2 = I(PX, y, z);
            return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(0,0,0,.45)" strokeWidth="1"/>;
          })}
          {/* Crowd — colorful seat dots staggered along each tier */}
          {Array.from({ length: 7 }).map((_, row) => (
            Array.from({ length: 24 }).map((_, col) => {
              const t = (row + 1) / 8;
              const z = STAND_H * t - 3;
              const y = -PY - (OY - PY) * t + 4;
              const x = -PX + (PX * 2) * ((col + (row % 2) * .5) / 24);
              const p = I(x, y, z);
              const palette = ['#d8362a', '#0e1820', '#94e2c0', '#f5d97a', '#fffaee', '#6fd5e0', '#a8553c'];
              return <circle key={`${row}-${col}`} cx={p.x} cy={p.y} r="1.5" fill={palette[(row * 7 + col) % palette.length]} opacity=".95"/>;
            })
          ))}
        </g>
      );
    }
    if (kind === 'W') {
      const corners = [
        [-PX, -PY, 0], [-PX, PY, 0],
        [-OX, PY, STAND_H], [-OX, -PY, STAND_H],
      ];
      const inset = 6;
      return (
        <g>
          {/* Outer concrete wall */}
          <polygon points={window.poly([[-OX, -PY, 0], [-OX, PY, 0], [-OX, PY, STAND_H + 18], [-OX, -PY, STAND_H + 18]])}
            fill="#3a4652" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          {/* Top ring */}
          <polygon points={window.poly([[-OX, -PY, STAND_H + 18], [-OX, PY, STAND_H + 18], [-OX + inset, PY, STAND_H + 18], [-OX + inset, -PY, STAND_H + 18]])}
            fill="#4a5662" stroke="rgba(0,0,0,.4)" strokeWidth=".5"/>
          {/* Sloped seating */}
          <polygon points={window.poly(corners)}
            fill={tod === 'night' ? '#2a323a' : '#6a7280'} stroke="rgba(0,0,0,.45)" strokeWidth=".6"/>
          {/* Seat rows */}
          {Array.from({ length: 7 }).map((_, i) => {
            const t = (i + 1) / 8;
            const z = STAND_H * t;
            const x = -PX - (OX - PX) * t;
            const p1 = I(x, -PY, z), p2 = I(x, PY, z);
            return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(0,0,0,.45)" strokeWidth="1"/>;
          })}
          {/* Crowd */}
          {Array.from({ length: 7 }).map((_, row) => (
            Array.from({ length: 20 }).map((_, col) => {
              const t = (row + 1) / 8;
              const z = STAND_H * t - 3;
              const x = -PX - (OX - PX) * t + 4;
              const y = -PY + (PY * 2) * ((col + (row % 2) * .5) / 20);
              const p = I(x, y, z);
              const palette = ['#d8362a', '#0e1820', '#94e2c0', '#f5d97a', '#fffaee', '#6fd5e0', '#a8553c'];
              return <circle key={`${row}-${col}`} cx={p.x} cy={p.y} r="1.5" fill={palette[(row * 5 + col) % palette.length]} opacity=".95"/>;
            })
          ))}
        </g>
      );
    }
    if (kind === 'S') {
      // Near-camera side — show ONLY a low barrier rail (we look over it into the pitch)
      const RAIL_H = 14;
      return (
        <g>
          {/* Concrete top of bleacher — flat top showing the OUTER rim at this side */}
          <polygon points={window.poly([[-PX, PY, RAIL_H], [PX, PY, RAIL_H], [PX, OY, RAIL_H], [-PX, OY, RAIL_H]])}
            fill="#5a6672" stroke="rgba(0,0,0,.45)" strokeWidth=".6"/>
          {/* Outer concrete face */}
          <polygon points={window.poly([[-PX, OY, 0], [PX, OY, 0], [PX, OY, RAIL_H], [-PX, OY, RAIL_H]])}
            fill="#3a4652" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          {/* Inner barrier wall facing the pitch */}
          <polygon points={window.poly([[-PX, PY, 0], [PX, PY, 0], [PX, PY, RAIL_H], [-PX, PY, RAIL_H]])}
            fill="#4a5662" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          {/* Glass rail along top */}
          <polygon points={window.poly([[-PX, PY, RAIL_H], [PX, PY, RAIL_H], [PX, PY, RAIL_H + 8], [-PX, PY, RAIL_H + 8]])}
            fill="rgba(168,210,225,.45)" stroke="rgba(180,220,235,.7)" strokeWidth=".5"/>
        </g>
      );
    }
    if (kind === 'E') {
      const RAIL_H = 14;
      return (
        <g>
          {/* Top */}
          <polygon points={window.poly([[PX, -PY, RAIL_H], [PX, PY, RAIL_H], [OX, PY, RAIL_H], [OX, -PY, RAIL_H]])}
            fill="#5a6672" stroke="rgba(0,0,0,.45)" strokeWidth=".6"/>
          {/* Outer face */}
          <polygon points={window.poly([[OX, -PY, 0], [OX, PY, 0], [OX, PY, RAIL_H], [OX, -PY, RAIL_H]])}
            fill="#3a4652" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          {/* Inner barrier */}
          <polygon points={window.poly([[PX, -PY, 0], [PX, PY, 0], [PX, PY, RAIL_H], [PX, -PY, RAIL_H]])}
            fill="#4a5662" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
          <polygon points={window.poly([[PX, -PY, RAIL_H], [PX, PY, RAIL_H], [PX, PY, RAIL_H + 8], [PX, -PY, RAIL_H + 8]])}
            fill="rgba(168,210,225,.45)" stroke="rgba(180,220,235,.7)" strokeWidth=".5"/>
        </g>
      );
    }
  }

  // Goal: 3D netted goal at one end of pitch. dir = -1 (west end) or +1 (east end).
  function Goal({ dir }) {
    const baseX = dir < 0 ? -PX : PX;
    const back  = baseX + dir * 18; // 18 units of net depth
    const halfW = 28;
    const H = 16;
    return (
      <g>
        {/* Back net face */}
        <polygon points={window.poly([[back, -halfW, 0], [back, halfW, 0], [back, halfW, H], [back, -halfW, H]])}
          fill="rgba(20,30,28,.18)" stroke="rgba(20,30,28,.5)" strokeWidth=".6"/>
        {/* Net pattern */}
        {Array.from({ length: 6 }).map((_, i) => {
          const y = -halfW + i * (halfW * 2 / 5);
          const p1 = I(back, y, 0), p2 = I(back, y, H);
          return <line key={`v${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,.55)" strokeWidth=".4"/>;
        })}
        {Array.from({ length: 4 }).map((_, i) => {
          const z = i * (H / 3);
          const p1 = I(back, -halfW, z), p2 = I(back, halfW, z);
          return <line key={`h${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,.5)" strokeWidth=".4"/>;
        })}
        {/* Side net faces */}
        <polygon points={window.poly([[baseX, -halfW, 0], [back, -halfW, 0], [back, -halfW, H], [baseX, -halfW, H]])}
          fill="rgba(20,30,28,.1)" stroke="rgba(255,255,255,.5)" strokeWidth=".4"/>
        <polygon points={window.poly([[baseX, halfW, 0], [back, halfW, 0], [back, halfW, H], [baseX, halfW, H]])}
          fill="rgba(20,30,28,.1)" stroke="rgba(255,255,255,.5)" strokeWidth=".4"/>
        {/* Crossbar + posts */}
        {/* Left post */}
        {(() => {
          const p1 = I(baseX, -halfW, 0), p2 = I(baseX, -halfW, H);
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="2.2" strokeLinecap="round"/>;
        })()}
        {/* Right post */}
        {(() => {
          const p1 = I(baseX, halfW, 0), p2 = I(baseX, halfW, H);
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="2.2" strokeLinecap="round"/>;
        })()}
        {/* Crossbar */}
        {(() => {
          const p1 = I(baseX, -halfW, H), p2 = I(baseX, halfW, H);
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="2.2" strokeLinecap="round"/>;
        })()}
        {/* Back-top connectors */}
        {(() => {
          const p1 = I(baseX, -halfW, H), p2 = I(back, -halfW, H);
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="1.4"/>;
        })()}
        {(() => {
          const p1 = I(baseX, halfW, H), p2 = I(back, halfW, H);
          return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="1.4"/>;
        })()}
      </g>
    );
  }

  // Pitch markings — at z=0
  function PitchLine({ from, to, sw = 1.6, color = '#fffaee' }) {
    const p1 = I(from[0], from[1], 0), p2 = I(to[0], to[1], 0);
    return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={sw}/>;
  }
  function PitchRect({ x1, y1, x2, y2, sw = 1.6 }) {
    return <polygon points={window.poly([[x1, y1, 0], [x2, y1, 0], [x2, y2, 0], [x1, y2, 0]])} fill="none" stroke="#fffaee" strokeWidth={sw}/>;
  }
  // Center circle: a unit circle on the z=0 plane projects to an ellipse.
  // The iso projection rotates by π/4 and scales y by sin(π/6)=.5 vs x by cos(π/6).
  // For r=60 in world units, the projected ellipse has axes computed by sampling.
  const CC = (() => {
    const r = 60;
    const N = 24;
    const pts = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      return I(Math.cos(a) * r, Math.sin(a) * r, 0);
    });
    return pts;
  })();

  return (
    <g>
      {/* Outer plaza */}
      <polygon points={window.poly([[-OX - 60, -OY - 60, 0], [OX + 60, -OY - 60, 0], [OX + 60, OY + 60, 0], [-OX - 60, OY + 60, 0]])}
        fill="#c8b585"/>
      <polygon points={window.poly([[-OX - 60, -OY - 60, 0], [OX + 60, -OY - 60, 0], [OX + 60, OY + 60, 0], [-OX - 60, OY + 60, 0]])}
        fill="url(#cobble)" opacity=".85"/>

      {/* Back grandstands (rendered behind pitch) */}
      <Grandstand kind="N"/>
      <Grandstand kind="W"/>

      {/* Corner concrete blocks tying N+W together */}
      <polygon points={window.poly([[-OX, -OY, 0], [-PX, -OY, 0], [-PX, -OY, STAND_H + 18], [-OX, -OY, STAND_H + 18]])}
        fill="#3a4652" stroke="rgba(0,0,0,.5)" strokeWidth=".6"/>
      <polygon points={window.poly([[-OX, -OY, STAND_H + 18], [-PX, -OY, STAND_H + 18], [-PX, -PY, STAND_H + 18], [-OX, -PY, STAND_H + 18]])}
        fill="#4a5662" stroke="rgba(0,0,0,.4)" strokeWidth=".5"/>

      {/* PITCH SURFACE — striped */}
      <polygon points={window.poly([[-PX, -PY, 0], [PX, -PY, 0], [PX, PY, 0], [-PX, PY, 0]])}
        fill="#4a8a48"/>
      {/* Stripe bands (along x) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x1 = -PX + i * (PX * 2 / 10);
        const x2 = x1 + (PX * 2 / 10);
        return <polygon key={i} points={window.poly([[x1, -PY, 0], [x2, -PY, 0], [x2, PY, 0], [x1, PY, 0]])}
          fill={i % 2 === 0 ? '#5a9558' : '#4a8a48'}/>;
      })}
      {/* Grass speckle */}
      <polygon points={window.poly([[-PX, -PY, 0], [PX, -PY, 0], [PX, PY, 0], [-PX, PY, 0]])}
        fill="url(#grass-tuft)" opacity=".4"/>

      {/* Back goal (camera-FAR end, west) — drawn behind pitch markings */}
      <Goal dir={-1}/>

      {/* PITCH MARKINGS */}
      {/* Outer touchline */}
      <PitchRect x1={-PX} y1={-PY} x2={PX} y2={PY} sw={2.2}/>
      {/* Halfway line */}
      <PitchLine from={[0, -PY]} to={[0, PY]} sw={2}/>
      {/* Center circle */}
      <polyline points={CC.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' ' + `${CC[0].x.toFixed(1)},${CC[0].y.toFixed(1)}`} fill="none" stroke="#fffaee" strokeWidth="1.8"/>
      {/* Center spot */}
      <circle cx={I(0, 0, 0).x} cy={I(0, 0, 0).y} r="2.5" fill="#fffaee"/>
      {/* Penalty boxes */}
      <PitchRect x1={-PX} y1={-70} x2={-PX + 64} y2={70} sw={1.8}/>
      <PitchRect x1={PX} y1={-70} x2={PX - 64} y2={70} sw={1.8}/>
      {/* Goal areas */}
      <PitchRect x1={-PX} y1={-32} x2={-PX + 24} y2={32} sw={1.6}/>
      <PitchRect x1={PX} y1={-32} x2={PX - 24} y2={32} sw={1.6}/>
      {/* Penalty spots */}
      <circle cx={I(-PX + 50, 0, 0).x} cy={I(-PX + 50, 0, 0).y} r="2" fill="#fffaee"/>
      <circle cx={I(PX - 50, 0, 0).x} cy={I(PX - 50, 0, 0).y} r="2" fill="#fffaee"/>

      {/* Players + holo tags drifting on the pitch */}
      {[
        [-130, -50, '#e07ec3', '7'],
        [-70, 30, '#6fd5e0', '10'],
        [-20, -20, '#6fd5e0', '8'],
        [40, 40, '#6fd5e0', '11'],
        [90, -10, '#6fd5e0', '9'],
        [140, 30, '#e07ec3', '4'],
        [-150, 60, '#e07ec3', '2'],
        [110, -70, '#e07ec3', '3'],
      ].map(([wx, wy, c, n], i) => {
        const p = I(wx, wy, 0);
        return (
          <g key={i}>
            <ellipse cx={p.x} cy={p.y} rx="6" ry="2.4" fill="rgba(0,0,0,.35)"/>
            <circle cx={p.x} cy={p.y - 4} r="4.5" fill={c} stroke="rgba(0,0,0,.4)" strokeWidth=".6"/>
            <circle cx={p.x} cy={p.y - 4} r="4.5" fill={c} opacity=".4"/>
            <text x={p.x} y={p.y - 12} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="6" fontWeight="700" fill={c}>{n}</text>
          </g>
        );
      })}
      {/* Passing-network overlay */}
      {[
        [[-130, -50], [-70, 30]],
        [[-70, 30], [-20, -20]],
        [[-20, -20], [40, 40]],
        [[40, 40], [90, -10]],
        [[90, -10], [140, 30]],
      ].map(([a, b], i) => {
        const p1 = I(a[0], a[1], 0), p2 = I(b[0], b[1], 0);
        return <line key={i} x1={p1.x} y1={p1.y - 4} x2={p2.x} y2={p2.y - 4} stroke="#94e2c0" strokeWidth="1.4" opacity=".7" strokeDasharray="3 2"/>;
      })}
      {/* Ball */}
      {(() => { const p = I(0, 0, 0); return (<g>
        <ellipse cx={p.x} cy={p.y + 1.5} rx="4" ry="1.6" fill="rgba(0,0,0,.4)"/>
        <circle cx={p.x} cy={p.y - 2} r="3.6" fill="#fffaee" stroke="#1a1410" strokeWidth=".5"/>
        <path d={`M${p.x - 2} ${p.y - 3.6} L${p.x} ${p.y - 3} L${p.x + 2} ${p.y - 3.6}`} stroke="#1a1410" strokeWidth=".4" fill="none"/>
      </g>); })()}

      {/* Front (camera-near) goal — drawn AFTER pitch so it sits in front */}
      <Goal dir={1}/>

      {/* Near-side low barriers — drawn AFTER pitch */}
      <Grandstand kind="S"/>
      <Grandstand kind="E"/>

      {/* SCOREBOARD — suspended over the pitch */}
      <g transform={`translate(${I(0, 0, 220).x}, ${I(0, 0, 220).y})`}>
        {/* Suspending cable */}
        <line x1="0" y1="-180" x2="0" y2="-12" stroke="#1a1410" strokeWidth=".8" strokeDasharray="2 3"/>
        <rect x="-100" y="-32" width="200" height="48" rx="3" fill="#0a141c" stroke="#6fd5e0" strokeWidth="1.2"/>
        {/* Brand bar */}
        <rect x="-100" y="-32" width="200" height="10" fill="#0e1820"/>
        <text x="-92" y="-24" fontFamily="JetBrains Mono,monospace" fontSize="6" fontWeight="700" fill="#94e2c0" letterSpacing="2">UPDT · LIVE</text>
        <text x="92" y="-24" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="5" fill="#6fd5e0" letterSpacing="1">MATCH · 24'</text>
        {/* Teams */}
        <text x="-72" y="-2" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="9" fontWeight="900" fill="#fffaee">HOME</text>
        <text x="-30" y="8" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="20" fontWeight="900" fill="#f5d97a">2</text>
        <text x="0" y="2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#6fd5e0">·</text>
        <text x="30" y="8" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="20" fontWeight="900" fill="#f5d97a">1</text>
        <text x="72" y="-2" textAnchor="middle" fontFamily="Impact,Arial,sans-serif" fontSize="9" fontWeight="900" fill="#fffaee">AWAY</text>
        {/* xG ticker */}
        <rect x="-92" y="12" width="28" height="2" fill="#94e2c0" opacity=".8"/>
        <rect x="64" y="12" width="18" height="2" fill="#94e2c0" opacity=".5"/>
      </g>

      {/* Floodlight pylons — 4 corners */}
      {[[-OX, -OY], [OX, -OY], [-OX, OY], [OX, OY]].map(([fx, fy], i) => {
        const masttop = 180;
        const p0 = I(fx, fy, STAND_H + 18);
        const p1 = I(fx, fy, masttop);
        return (
          <g key={`fl${i}`}>
            <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#1a1410" strokeWidth="2.5"/>
            <rect x={p1.x - 18} y={p1.y - 10} width="36" height="10" fill="#1a1410"/>
            <rect x={p1.x - 16} y={p1.y - 9} width="32" height="6" fill="#fff1c8"/>
            {/* Light cone */}
            <path d={`M${p1.x} ${p1.y} L${p1.x - 50} ${p1.y + 120} L${p1.x + 50} ${p1.y + 120} Z`} fill="#fff1c8" opacity={lit * .14}/>
          </g>
        );
      })}

      {/* UPDT signage — large, attached to the back (camera-FAR) grandstand top */}
      <g transform={`translate(${I(-30, -OY, STAND_H + 18).x}, ${I(-30, -OY, STAND_H + 18).y})`}>
        <rect x="-78" y="-30" width="156" height="44" rx="3" fill="#0e1820"/>
        <rect x="-78" y="-30" width="156" height="44" rx="3" fill="none" stroke="#94e2c0" strokeWidth="1.2"/>
        <text x="0" y="0" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="22" fontWeight="900" fill="#94e2c0" letterSpacing="3">UPDT.</text>
        <text x="0" y="10" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fontWeight="600" fill="#6fd5e0" letterSpacing="3">UPDATE ANALYTICS</text>
      </g>

      {/* Two arched entrances on the near (S) side at ground level */}
      {[-60, 60].map(x => (
        <g key={x} transform={`translate(${I(x, OY, 0).x}, ${I(x, OY, 0).y})`}>
          <path d="M-16 0 L-16 -32 Q-16 -50 0 -50 Q16 -50 16 -32 L16 0 Z" fill="#0e1820"/>
          <path d="M-13 -2 L-13 -32 Q-13 -47 0 -47 Q13 -47 13 -32 L13 -2 Z" fill="#fff1c8" opacity={lit * .8}/>
          {/* Gate number */}
          <text x="0" y="-36" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="6" fontWeight="700" fill="#6fd5e0">G{x < 0 ? '1' : '2'}</text>
        </g>
      ))}
    </g>
  );
}

function UpdtDroneIso({ x, y, z, tod }) {
  const p = window.iso(x, y, z);
  return (
    <g transform={`translate(${p.x}, ${p.y})`}>
      <ellipse cx="0" cy="0" rx="14" ry="4" fill="rgba(0,0,0,.25)" transform={`translate(0 ${(z) / 6})`}/>
      <rect x="-14" y="-2" width="28" height="4" fill="#2a2520"/>
      <line x1="-22" y1="-2" x2="22" y2="-2" stroke="#2a2520" strokeWidth="1.5"/>
      <circle cx="-22" cy="-2" r="5" fill="#6fd5e0" opacity=".85"/>
      <circle cx="22" cy="-2" r="5" fill="#6fd5e0" opacity=".85"/>
      <circle cx="-22" cy="-2" r="8" fill="#6fd5e0" opacity=".3"/>
      <circle cx="22" cy="-2" r="8" fill="#6fd5e0" opacity=".3"/>
      <circle cx="0" cy="6" r="2.4" fill="#e07ec3"/>
      <line x1="0" y1="0" x2="0" y2={(z) / 4} stroke="rgba(0,0,0,.18)" strokeWidth=".5" strokeDasharray="2 4"/>
    </g>
  );
}

function ScaleAnnotation({ worldX, worldY, text, color = '#fffaee' }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y - 80})`}>
      <line x1="0" y1="0" x2="0" y2="60" stroke={color} strokeWidth=".8" strokeDasharray="2 3"/>
      <line x1="-4" y1="0" x2="4" y2="0" stroke={color} strokeWidth="1"/>
      <line x1="-4" y1="60" x2="4" y2="60" stroke={color} strokeWidth="1"/>
      <rect x="6" y="22" width={text.length * 5 + 12} height="16" rx="2" fill="rgba(15,15,12,.85)" stroke={color} strokeWidth=".4"/>
      <text x="12" y="34" fontFamily="JetBrains Mono,monospace" fontSize="9" fill={color}>{text}</text>
    </g>
  );
}

// ─── SCENE 3: PETRONAS TWIN TOWERS ──────────────────────────────────────

function ScenePetronas({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="03 · home" label="Petronas Twin Towers (KLCC)" sub="About me · Kuala Lumpur">
      {/* KLCC plaza base */}
      <PlazaTile x={0} y={0} w={420} d={300}/>
      {/* Plaza fountain */}
      <PlazaFountain worldX={120} worldY={80} tod={tod}/>
      {/* Palm trees flanking */}
      <PalmTree worldX={-170} worldY={130} scale={1.1}/>
      <PalmTree worldX={170} worldY={-90} scale={1}/>

      {/* The two towers — render LEFT tower first (further along +y, drawn after to layer correctly) */}
      <PetronasTower worldX={-80} worldY={-60} tod={tod}/>
      <PetronasTower worldX={40} worldY={40} tod={tod}/>
      {/* Sky bridge between them */}
      <PetronasSkyBridge worldX={-20} worldY={-10} tod={tod}/>

      {/* Avatar tiny at base, looking up */}
      <AvatarAtWorld x={140} y={180} facing="south" size={56}/>
      {/* Tiny KL pedestrians for scale + life */}
      <TinyPedestrian x={180} y={140}/>
      <TinyPedestrian x={210} y={100} dir={-1}/>
      {/* "Tower height" annotation */}
      <ScaleAnnotation worldX={-220} worldY={-100} text="450 m · 88 floors" color="#a8b4bc"/>
      <GazeArc from={[140, 180, 100]} to={[-20, -10, 700]}/>
    </window.IsoScene>
  );
}

function PetronasTower({ worldX = 0, worldY = 0, tod = 'golden' }) {
  const lit = tod === 'night' ? .9 : tod === 'dusk' ? .8 : .42;
  // Tower base ~ 60×60, stepped setbacks toward top (smaller w/d each tier).
  // Heights: tier 1: 0..200, tier 2: 200..320, tier 3: 320..400, tier 4: 400..460, crown 460..520, pinnacle 520..680.
  const tiers = [
    { z0: 0,   h: 200, hw: 30 },
    { z0: 200, h: 120, hw: 26 },
    { z0: 320, h: 80,  hw: 22 },
    { z0: 400, h: 60,  hw: 18 },
    { z0: 460, h: 40,  hw: 14 },
    { z0: 500, h: 20,  hw: 10 },
  ];
  return (
    <g transform={`translate(${window.iso(worldX, worldY, 0).x - window.iso(0, 0, 0).x}, ${window.iso(worldX, worldY, 0).y - window.iso(0, 0, 0).y})`}>
      {/* Ground shadow */}
      <ellipse cx="0" cy="6" rx="50" ry="14" fill="rgba(0,0,0,.45)"/>
      {tiers.map((t, i) => (
        <g key={i}>
          {/* Tier box */}
          <window.IsoBox
            x={-t.hw} y={-t.hw} z={t.z0} w={t.hw * 2} d={t.hw * 2} h={t.h}
            front="#a8b4bc" right="#6a7480" top="#cfd8dc"
            stroke="rgba(20,30,40,.6)" sw={0.5}
          />
          {/* Floor bands on FRONT (visible left face — high screen-x for +y face) */}
          {Array.from({ length: Math.floor(t.h / 6) }).map((_, k) => {
            // y=hw face. Two corners at z = t.z0 + k*6+1 and t.z0 + k*6+3, full width.
            const yA = window.iso(-t.hw, t.hw, t.z0 + k * 6 + 1);
            const yB = window.iso(t.hw, t.hw, t.z0 + k * 6 + 1);
            const yC = window.iso(t.hw, t.hw, t.z0 + k * 6 + 3);
            const yD = window.iso(-t.hw, t.hw, t.z0 + k * 6 + 3);
            return <polygon key={k} points={`${yA.x},${yA.y} ${yB.x},${yB.y} ${yC.x},${yC.y} ${yD.x},${yD.y}`} fill="#f5d97a" opacity={lit * (k % 3 === 0 ? .8 : .55)}/>;
          })}
          {/* Floor bands on right (+x face) */}
          {Array.from({ length: Math.floor(t.h / 6) }).map((_, k) => {
            const yA = window.iso(t.hw, -t.hw, t.z0 + k * 6 + 1);
            const yB = window.iso(t.hw, t.hw, t.z0 + k * 6 + 1);
            const yC = window.iso(t.hw, t.hw, t.z0 + k * 6 + 3);
            const yD = window.iso(t.hw, -t.hw, t.z0 + k * 6 + 3);
            return <polygon key={k} points={`${yA.x},${yA.y} ${yB.x},${yB.y} ${yC.x},${yC.y} ${yD.x},${yD.y}`} fill="#f5d97a" opacity={lit * .55}/>;
          })}
          {/* Vertical ribbing — light pinstripes */}
          {Array.from({ length: 8 }).map((_, k) => {
            const x = -t.hw + (k * t.hw * 2 / 7);
            const p1 = window.iso(x, t.hw, t.z0);
            const p2 = window.iso(x, t.hw, t.z0 + t.h);
            return <line key={`v${k}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(60,75,85,.35)" strokeWidth=".4"/>;
          })}
        </g>
      ))}
      {/* Pinnacle — tall slender spire */}
      {(() => {
        const baseZ = 520;
        const p0 = window.iso(0, 0, baseZ);
        const p1 = window.iso(0, 0, baseZ + 160);
        return (
          <g>
            <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#262a2e" strokeWidth="3"/>
            <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#cfd8dc" strokeWidth="1"/>
            {/* Ball at 2/3 */}
            <circle cx={(p0.x + p1.x * 2) / 3} cy={(p0.y + p1.y * 2) / 3} r="5" fill="#cfd8dc" stroke="#262a2e" strokeWidth=".5"/>
            <circle cx={p1.x} cy={p1.y} r="3" fill="#f5d97a"/>
            <circle cx={p1.x} cy={p1.y} r="6" fill="#f5d97a" opacity={tod === 'night' ? .8 : .35}/>
          </g>
        );
      })()}
      {/* Crown stepped detail */}
      {[460, 480, 500].map((z, i) => {
        const w = 28 - i * 6;
        const c1 = window.iso(-w/2, -w/2, z);
        const c2 = window.iso(w/2, -w/2, z);
        const c3 = window.iso(w/2, w/2, z);
        const c4 = window.iso(-w/2, w/2, z);
        return <polygon key={z} points={`${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}`} fill="#a8b4bc" stroke="rgba(20,30,40,.5)" strokeWidth=".5"/>;
      })}
      {/* Door at base (front face) */}
      {(() => {
        const dB = window.iso(-12, 30, 0);
        const dC = window.iso(12, 30, 0);
        const dG = window.iso(12, 30, 26);
        const dH = window.iso(-12, 30, 26);
        return (
          <g>
            <polygon points={`${dB.x},${dB.y} ${dC.x},${dC.y} ${dG.x},${dG.y} ${dH.x},${dH.y}`} fill="#0e1820"/>
            <polygon points={`${dB.x},${dB.y} ${dC.x},${dC.y} ${dG.x},${dG.y} ${dH.x},${dH.y}`} fill="#f5d97a" opacity={lit * .8}/>
          </g>
        );
      })()}
    </g>
  );
}

function PetronasSkyBridge({ worldX, worldY, tod }) {
  const lit = tod === 'night' ? .9 : tod === 'dusk' ? .75 : .55;
  // Sky bridge connects the two tower tops at world (-80, -60) ↔ (40, 40), at mid-tower height (z≈200-220).
  const zMid = 210;
  // Upper deck
  const a1 = window.iso(-50, -30, zMid + 20);
  const a2 = window.iso(10, 30, zMid + 20);
  const a3 = window.iso(10, 50, zMid + 20);
  const a4 = window.iso(-50, -10, zMid + 20);
  const b1 = window.iso(-50, -30, zMid + 12);
  const b2 = window.iso(10, 30, zMid + 12);
  const b3 = window.iso(10, 50, zMid + 12);
  const b4 = window.iso(-50, -10, zMid + 12);
  // Lower deck
  const c1 = window.iso(-50, -30, zMid - 12);
  const c2 = window.iso(10, 30, zMid - 12);
  const c3 = window.iso(10, 50, zMid - 12);
  const c4 = window.iso(-50, -10, zMid - 12);
  const d1 = window.iso(-50, -30, zMid - 20);
  const d2 = window.iso(10, 30, zMid - 20);
  const d3 = window.iso(10, 50, zMid - 20);
  const d4 = window.iso(-50, -10, zMid - 20);
  return (
    <g>
      {/* Upper deck box */}
      <polygon points={`${a1.x},${a1.y} ${a2.x},${a2.y} ${a3.x},${a3.y} ${a4.x},${a4.y}`} fill="#cfd8dc"/>
      <polygon points={`${a4.x},${a4.y} ${a3.x},${a3.y} ${b3.x},${b3.y} ${b4.x},${b4.y}`} fill="#6a7480"/>
      <polygon points={`${a2.x},${a2.y} ${a3.x},${a3.y} ${b3.x},${b3.y} ${b2.x},${b2.y}`} fill="#3a4652"/>
      {/* Glowing windows on bridge */}
      <line x1={a4.x} y1={a4.y - 3} x2={a3.x} y2={a3.y - 3} stroke="#fff1c8" strokeWidth="1.8" opacity={lit}/>
      <line x1={a2.x} y1={a2.y - 3} x2={a3.x} y2={a3.y - 3} stroke="#fff1c8" strokeWidth="1.8" opacity={lit * .65}/>

      {/* Strut V's between decks */}
      <line x1={a4.x} y1={a4.y + 4} x2={(d4.x + d3.x) / 2} y2={(d4.y + d3.y) / 2 - 10} stroke="#3a4652" strokeWidth="2"/>
      <line x1={a2.x} y1={a2.y + 4} x2={(d4.x + d3.x) / 2} y2={(d4.y + d3.y) / 2 - 10} stroke="#3a4652" strokeWidth="2"/>
      {/* Lower deck box */}
      <polygon points={`${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}`} fill="#cfd8dc"/>
      <polygon points={`${c4.x},${c4.y} ${c3.x},${c3.y} ${d3.x},${d3.y} ${d4.x},${d4.y}`} fill="#6a7480"/>
      <polygon points={`${c2.x},${c2.y} ${c3.x},${c3.y} ${d3.x},${d3.y} ${d2.x},${d2.y}`} fill="#3a4652"/>
      <line x1={c4.x} y1={c4.y - 3} x2={c3.x} y2={c3.y - 3} stroke="#fff1c8" strokeWidth="1.6" opacity={lit}/>
    </g>
  );
}

function PlazaFountain({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="2" rx="36" ry="10" fill="rgba(0,0,0,.25)"/>
      <ellipse cx="0" cy="0" rx="36" ry="10" fill="#857a5a"/>
      <ellipse cx="0" cy="-2" rx="34" ry="9" fill="#6db9c4"/>
      <ellipse cx="0" cy="-4" rx="30" ry="7.5" fill="#9ed6dd"/>
      {/* Center jet */}
      <rect x="-2" y="-12" width="4" height="10" fill="#6a7480"/>
      <path d="M0 -12 Q-6 -28 -3 -36 M0 -12 Q6 -28 3 -36 M0 -12 Q0 -32 0 -40" stroke="#fffaee" strokeWidth="1.2" fill="none" opacity=".8"/>
      <circle cx="0" cy="-40" r="3" fill="#fffaee" opacity=".7"/>
      <circle cx="-3" cy="-36" r="2" fill="#fffaee" opacity=".55"/>
      <circle cx="3" cy="-36" r="2" fill="#fffaee" opacity=".55"/>
    </g>
  );
}

function PalmTree({ worldX, worldY, scale = 1 }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${scale})`}>
      <ellipse cx="0" cy="4" rx="16" ry="4" fill="rgba(0,0,0,.4)"/>
      {/* Trunk segments */}
      <path d="M-3 0 L-4 -20 L-3 -40 L-3 -70 L-1 -90 L1 -90 L1 -70 L1 -40 L2 -20 L1 0 Z" fill="#6e4a2a"/>
      <line x1="-3" y1="-10" x2="0" y2="-10" stroke="#3a2410" strokeWidth=".5"/>
      <line x1="-3" y1="-22" x2="0" y2="-22" stroke="#3a2410" strokeWidth=".5"/>
      <line x1="-3" y1="-36" x2="1" y2="-36" stroke="#3a2410" strokeWidth=".5"/>
      <line x1="-2" y1="-52" x2="2" y2="-52" stroke="#3a2410" strokeWidth=".5"/>
      <line x1="-2" y1="-66" x2="2" y2="-66" stroke="#3a2410" strokeWidth=".5"/>
      {/* Fronds */}
      {[30, 70, 110, 150, 190, 230, 270, 310].map((a, i) => {
        const rad = a * Math.PI / 180;
        const tipX = Math.cos(rad) * 30;
        const tipY = Math.sin(rad) * 14 - 92;
        return <g key={a}>
          <path d={`M0 -92 Q${tipX/2} ${tipY - 10} ${tipX} ${tipY}`} stroke={i % 2 ? '#3e6a3c' : '#5a9558'} strokeWidth="6" fill="none" strokeLinecap="round"/>
          <path d={`M0 -92 Q${tipX/2} ${tipY - 10} ${tipX} ${tipY}`} stroke="#7eb86a" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        </g>;
      })}
      <circle cx="0" cy="-92" r="4" fill="#3a2410"/>
    </g>
  );
}

function TinyPedestrian({ x, y, dir = 1 }) {
  const c = window.iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${dir}, 1)`}>
      <ellipse cx="0" cy="0" rx="6" ry="2" fill="rgba(0,0,0,.4)"/>
      <rect x="-3" y="-20" width="6" height="14" fill="#5a4a3e"/>
      <circle cx="0" cy="-26" r="4" fill="#d9a779"/>
      <path d="M-3 -28 Q0 -32 3 -28" fill="#1a1410"/>
    </g>
  );
}

// ─── SCENE 4: TECH TOWER ────────────────────────────────────────────────

function SceneTechTower({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="04 · education" label="Tech Tower" sub="B.S. Computer Science · GT">
      <PlazaTile x={20} y={20} w={360} d={280}/>
      <CollegiateLamppost worldX={-130} worldY={140} lit={tod === 'night' ? 1 : .55}/>
      <CollegiateLamppost worldX={150} worldY={-140} lit={tod === 'night' ? 1 : .55}/>
      <CollegiateLamppost worldX={150} worldY={140} lit={tod === 'night' ? 1 : .55}/>
      <window.IsoTree x={-200} y={-200} variant={0} scale={1.3} tod={tod}/>
      <window.IsoTree x={200} y={200} variant={1} scale={1.2} tod={tod}/>
      <window.IsoBush x={-160} y={150} scale={1}/>
      <window.IsoBush x={160} y={-110} scale={.9}/>

      <TechTowerIso tod={tod}/>

      {/* Avatar small at base looking up at the gold TECH letters */}
      <AvatarAtWorld x={120} y={180} facing="north" size={62}/>
      <GazeArc from={[120, 180, 100]} to={[0, 0, 460]} color="rgba(212,193,120,.55)"/>
      <ScaleAnnotation worldX={-150} worldY={-100} text="60 m · Victorian · 1888" color="#d4c178"/>
    </window.IsoScene>
  );
}

function TechTowerIso({ tod }) {
  const lit = tod === 'night' ? .9 : tod === 'dusk' ? .75 : .35;
  // Building anchored at world (-90, -90, 0). Total footprint 180x180, height varies.
  // Wings: two side wings 60x180x140
  // Central tower 60x60x400 + roof
  return (
    <g>
      {/* Plinth — sandstone foundation */}
      <window.IsoBox x={-90} y={-90} z={0} w={180} d={180} h={26}
        front="#fffaee" right="#d8cfb8" top="#fffaee" stroke="#857a5a"/>
      {/* Left wing */}
      <window.IsoBox x={-90} y={-90} z={26} w={60} d={180} h={120}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.6)"
      />
      {/* Right wing */}
      <window.IsoBox x={30} y={-90} z={26} w={60} d={180} h={120}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.6)"
      />
      {/* Wing gabled roofs */}
      <window.IsoGabledRoof x={-90} y={-90} z={146} w={60} d={180} riseH={50} eaveOverhang={4}
        faceLight="#4a525a" faceDark="#262a2e" stroke="#0e1418"/>
      <window.IsoGabledRoof x={30} y={-90} z={146} w={60} d={180} riseH={50} eaveOverhang={4}
        faceLight="#4a525a" faceDark="#262a2e" stroke="#0e1418"/>

      {/* Brick stripes on wings (front faces visible — +y face = y=90) */}
      {[-60, 0].map(wx => Array.from({ length: 18 }).map((_, k) => {
        const z = 30 + k * 8;
        const a = window.iso(wx, 90, z), b = window.iso(wx + 60, 90, z);
        return <line key={`${wx}-${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(60,30,18,.4)" strokeWidth=".5"/>;
      }))}

      {/* Wing windows (lower + upper floors) on front face */}
      {[-60, 0].map(wx => (
        <g key={wx}>
          {/* lower 4 windows */}
          {[8, 26, 44, 62].map((y2, i) => {
            const wA = window.iso(wx + 6 + i * 14, 90, 50);
            const wB = window.iso(wx + 16 + i * 14, 90, 50);
            const wC = window.iso(wx + 16 + i * 14, 90, 90);
            const wD = window.iso(wx + 6 + i * 14, 90, 90);
            return <g key={i}>
              <polygon points={`${wA.x},${wA.y} ${wB.x},${wB.y} ${wC.x},${wC.y} ${wD.x},${wD.y}`} fill="#fffaee"/>
              <polygon points={`${wA.x + 1},${wA.y + 1} ${wB.x - 1},${wB.y + 1} ${wC.x - 1},${wC.y - 1} ${wD.x + 1},${wD.y - 1}`} fill="#0e1820"/>
              <polygon points={`${wA.x + 1},${wA.y + 1} ${wB.x - 1},${wB.y + 1} ${wC.x - 1},${wC.y - 1} ${wD.x + 1},${wD.y - 1}`} fill="#f5d97a" opacity={lit}/>
            </g>;
          })}
          {/* upper floor — arched windows */}
          {[8, 26, 44, 62].map((y2, i) => {
            const baseZ = 100;
            const wA = window.iso(wx + 7 + i * 14, 90, baseZ);
            const wB = window.iso(wx + 15 + i * 14, 90, baseZ);
            const wC = window.iso(wx + 15 + i * 14, 90, baseZ + 32);
            const wD = window.iso(wx + 7 + i * 14, 90, baseZ + 32);
            return <g key={`u${i}`}>
              <path d={`M${wA.x} ${wA.y} L${wB.x} ${wB.y} L${wC.x} ${wC.y} Q${(wC.x + wD.x) / 2} ${wC.y - 4} ${wD.x} ${wD.y} Z`} fill="#fffaee"/>
              <path d={`M${wA.x + 1} ${wA.y} L${wB.x - 1} ${wB.y} L${wC.x - 1} ${wC.y - 1} Q${(wC.x + wD.x) / 2} ${wC.y - 3} ${wD.x + 1} ${wD.y - 1} Z`} fill="#f5d97a" opacity={lit * .85}/>
            </g>;
          })}
        </g>
      ))}

      {/* CENTRAL TOWER — 60x60x400 */}
      <window.IsoBox x={-30} y={-30} z={26} w={60} d={60} h={380}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.7)"
      />
      {/* Brick courses on central tower */}
      {Array.from({ length: 50 }).map((_, k) => {
        const z = 26 + k * 8;
        const a = window.iso(-30, 30, z), b = window.iso(30, 30, z);
        return <line key={`tc${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(60,30,18,.3)" strokeWidth=".4"/>;
      })}
      {/* Stone trim bands */}
      {[80, 160, 240, 320].map(z => {
        const a = window.iso(-30, 30, z), b = window.iso(30, 30, z);
        const c = window.iso(30, -30, z);
        return (
          <g key={z}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fffaee" strokeWidth="3"/>
            <line x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke="#d8cfb8" strokeWidth="3"/>
          </g>
        );
      })}
      {/* Clock face — at z=200 on front (y=30) face */}
      {(() => {
        const ctr = window.iso(0, 30, 240);
        return (
          <g>
            <circle cx={ctr.x} cy={ctr.y} r="30" fill="#fffaee" stroke="#1a1410" strokeWidth="1.5"/>
            <circle cx={ctr.x} cy={ctr.y} r="27" fill="#fff1c8"/>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
              const rad = (a - 90) * Math.PI / 180;
              const x1 = ctr.x + Math.cos(rad) * 22, y1 = ctr.y + Math.sin(rad) * 22;
              const x2 = ctr.x + Math.cos(rad) * 27, y2 = ctr.y + Math.sin(rad) * 27;
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1410" strokeWidth={a % 90 === 0 ? "2" : "1"}/>;
            })}
            <line x1={ctr.x} y1={ctr.y} x2={ctr.x} y2={ctr.y - 20} stroke="#1a1410" strokeWidth="2" strokeLinecap="round"/>
            <line x1={ctr.x} y1={ctr.y} x2={ctr.x + 12} y2={ctr.y + 4} stroke="#1a1410" strokeWidth="2" strokeLinecap="round"/>
            <circle cx={ctr.x} cy={ctr.y} r="2.4" fill="#1a1410"/>
          </g>
        );
      })()}
      {/* Arched windows below clock */}
      {[140, 70].map(z => (
        <g key={z}>
          {[-12, 4].map(yx => {
            const wA = window.iso(yx, 30, z);
            const wB = window.iso(yx + 8, 30, z);
            const wC = window.iso(yx + 8, 30, z + 28);
            const wD = window.iso(yx, 30, z + 28);
            return <g key={yx}>
              <path d={`M${wA.x} ${wA.y} L${wB.x} ${wB.y} L${wC.x} ${wC.y} Q${(wC.x + wD.x) / 2} ${wC.y - 5} ${wD.x} ${wD.y} Z`} fill="#fffaee"/>
              <path d={`M${wA.x + 1} ${wA.y} L${wB.x - 1} ${wB.y} L${wC.x - 1} ${wC.y - 1} Q${(wC.x + wD.x) / 2} ${wC.y - 4} ${wD.x + 1} ${wD.y - 1} Z`} fill="#f5d97a" opacity={lit * .85}/>
            </g>;
          })}
        </g>
      ))}

      {/* TOP CROWN with "TECH" letters */}
      {/* Top tier */}
      <window.IsoBox x={-34} y={-34} z={406} w={68} d={68} h={56}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.7)"
      />
      {/* Stone trim above/below */}
      {(() => {
        const a = window.iso(-34, 34, 406), b = window.iso(34, 34, 406);
        const c = window.iso(-34, 34, 462), d = window.iso(34, 34, 462);
        return (
          <g>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fffaee" strokeWidth="4"/>
            <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="#fffaee" strokeWidth="4"/>
          </g>
        );
      })()}
      {/* Black box behind letters */}
      {(() => {
        const a = window.iso(-30, 34, 416);
        const b = window.iso(30, 34, 416);
        const c = window.iso(30, 34, 454);
        const d = window.iso(-30, 34, 454);
        return <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>;
      })()}
      {/* "TECH" channel-lit letters */}
      {['T', 'E', 'C', 'H'].map((ch, i) => {
        const p = window.iso(-22 + i * 14, 34, 432);
        return (
          <g key={ch}>
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#1a1410" stroke="#1a1410" strokeWidth="3">{ch}</text>
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#d4b94a">{ch}</text>
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="Georgia,serif" fontSize="22" fontWeight="900" fill="#fff1c8" opacity={lit * 1.2}>{ch}</text>
          </g>
        );
      })}
      {/* Soft halo from glowing letters (more visible at dusk/night) */}
      {tod !== 'golden' ? (() => {
        const ctr = window.iso(0, 34, 432);
        return <ellipse cx={ctr.x} cy={ctr.y} rx="74" ry="20" fill="#f5d97a" opacity={lit * .25}/>;
      })() : null}

      {/* Pyramidal slate roof */}
      <window.IsoHipRoof x={-34} y={-34} z={462} w={68} d={68} riseH={84}
        faceLight="#4a525a" faceDark="#262a2e" stroke="#0e1418"/>
      {/* Corner pinnacles */}
      {[[-34, -34], [34, -34], [34, 34], [-34, 34]].map(([cx, cy], i) => {
        const p0 = window.iso(cx, cy, 462);
        const p1 = window.iso(cx, cy, 478);
        const p2 = window.iso(cx, cy, 484);
        return (
          <g key={i}>
            <rect x={p0.x - 3} y={p1.y} width="6" height={p0.y - p1.y} fill="#fffaee" stroke="#857a5a" strokeWidth=".5"/>
            <path d={`M${p0.x - 3} ${p1.y} L${p2.x} ${p2.y} L${p0.x + 3} ${p1.y} Z`} fill="#d8cfb8" stroke="#857a5a" strokeWidth=".5"/>
          </g>
        );
      })}
      {/* Spire */}
      {(() => {
        const p0 = window.iso(0, 0, 546);
        const p1 = window.iso(0, 0, 600);
        return (
          <g>
            <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#262a2e" strokeWidth="3"/>
            <circle cx={(p0.x + p1.x * 2) / 3} cy={(p0.y + p1.y * 2) / 3} r="4" fill="#d4b94a" stroke="#1a1410" strokeWidth=".5"/>
            <path d={`M${p1.x - 3} ${p1.y + 4} L${p1.x} ${p1.y - 6} L${p1.x + 3} ${p1.y + 4} Z`} fill="#d4b94a"/>
          </g>
        );
      })()}

      {/* Grand door at base on front face */}
      {(() => {
        const a = window.iso(-18, 90, 26);
        const b = window.iso(18, 90, 26);
        const c = window.iso(18, 90, 88);
        const d = window.iso(-18, 90, 88);
        const mid = window.iso(0, 90, 100);
        return (
          <g>
            <path d={`M${a.x} ${a.y} L${b.x} ${b.y} L${c.x} ${c.y} Q${mid.x} ${mid.y} ${d.x} ${d.y} Z`} fill="#3a2410"/>
            <path d={`M${a.x + 2} ${a.y - 1} L${b.x - 2} ${b.y - 1} L${c.x - 1} ${c.y - 1} Q${mid.x} ${mid.y + 4} ${d.x + 1} ${d.y - 1} Z`} fill="#5a3a18"/>
            <path d={`M${a.x + 4} ${a.y - 2} L${b.x - 4} ${b.y - 2} L${c.x - 3} ${c.y - 2} Q${mid.x} ${mid.y + 6} ${d.x + 3} ${d.y - 2} Z`} fill="#f5d97a" opacity={lit * .75}/>
            <line x1={mid.x} y1={mid.y + 4} x2={mid.x} y2={(a.y + b.y) / 2} stroke="#3a2410" strokeWidth="1"/>
          </g>
        );
      })()}
    </g>
  );
}

function CollegiateLamppost({ worldX, worldY, lit }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="2" cy="4" rx="8" ry="3" fill="rgba(0,0,0,.35)"/>
      <rect x="-1.6" y="-72" width="3" height="74" fill="#1a1410"/>
      <rect x="-4" y="-72" width="8" height="4" fill="#1a1410"/>
      <rect x="-6" y="-78" width="12" height="6" fill="#1a1410"/>
      <rect x="-5" y="-77" width="10" height="4" fill="#f5d97a" opacity={lit}/>
      <path d="M-7 -78 L7 -78 L5 -82 L-5 -82 Z" fill="#1a1410"/>
      <circle cx="0" cy="-76" r="14" fill="#f5d97a" opacity={lit * .22}/>
    </g>
  );
}

// ─── SCENE 5: DELTA UPSILON ─────────────────────────────────────────────

function SceneDeltaUpsilon({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="05 · project" label="Delta Upsilon House" sub="Pong · baseball logging · 70+ users">
      {/* Lawn extension */}
      <polygon points={window.poly([
        [-220, -80, 0], [220, -80, 0], [220, 220, 0], [-220, 220, 0],
      ])} fill="#5a9558"/>
      {/* Stone walkway to porch */}
      <window.IsoPath pts={[[80, 200], [80, 50]]} width={42}/>
      {/* Trees flanking */}
      <window.IsoTree x={-220} y={150} variant={1} scale={1.4} tod={tod}/>
      <window.IsoTree x={220} y={-50} variant={0} scale={1.3} tod={tod}/>
      <window.IsoBush x={-100} y={120} scale={1.1}/>
      <window.IsoBush x={140} y={140} scale={1}/>
      <window.IsoBush x={-100} y={70} scale={.9}/>

      <DeltaUpsilonIso tod={tod}/>

      {/* Avatar walking up the path toward the house */}
      <AvatarAtWorld x={80} y={170} facing="north" size={68}/>
      <ScaleAnnotation worldX={210} worldY={140} text="DU · est. 1834 · GT chapter" color="#d4c178"/>
    </window.IsoScene>
  );
}

function DeltaUpsilonIso({ tod }) {
  const lit = tod === 'night' ? .9 : tod === 'dusk' ? .82 : .55;
  // House anchored at (-160, -100, 0), extending +320 along y, +200 along x ... wait let me re-orient.
  // I want the house facing the camera. So the front (with porch + columns) is the y=+ face.
  // Anchor: (-100, -80, 0) — house extends w=200 (x: -100..100), d=120 (y: -80..40), h=130.
  return (
    <g>
      {/* Brick foundation (low) */}
      <window.IsoBox x={-100} y={-80} z={0} w={200} d={120} h={20}
        front="#7a3a28" right="#5a2a1c" top="#3a1a12" stroke="rgba(40,15,8,.7)"/>
      {/* Brick courses on foundation front face */}
      {Array.from({ length: 3 }).map((_, k) => {
        const z = 4 + k * 6;
        const a = window.iso(-100, 40, z), b = window.iso(100, 40, z);
        return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(40,15,8,.5)" strokeWidth=".4"/>;
      })}
      {/* Stone water-table course */}
      {(() => {
        const a = window.iso(-100, 40, 20), b = window.iso(100, 40, 20);
        return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fffaee" strokeWidth="2.5"/>;
      })()}
      {/* MAIN HOUSE BODY — brick */}
      <window.IsoBox x={-100} y={-80} z={20} w={200} d={120} h={110}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.7)"/>
      {/* Brick courses */}
      {Array.from({ length: 14 }).map((_, k) => {
        const z = 26 + k * 7;
        const a = window.iso(-100, 40, z), b = window.iso(100, 40, z);
        return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(40,15,8,.4)" strokeWidth=".4"/>;
      })}
      {/* White trim — at top of facade and mid-band */}
      {(() => {
        const a = window.iso(-100, 40, 70), b = window.iso(100, 40, 70);
        const c = window.iso(-100, 40, 126), d = window.iso(100, 40, 126);
        return (
          <g>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fffaee" strokeWidth="2"/>
            <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="#fffaee" strokeWidth="3"/>
          </g>
        );
      })()}
      {/* WINDOWS — upper floor (6 across) on front face */}
      {[-86, -52, -18, 18, 52, 86].map(wx => (
        <g key={wx}>
          {/* Frame */}
          {(() => {
            const a = window.iso(wx - 8, 40, 72);
            const b = window.iso(wx + 8, 40, 72);
            const c = window.iso(wx + 8, 40, 116);
            const d = window.iso(wx - 8, 40, 116);
            return (
              <g>
                <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#fffaee"/>
                <polygon points={`${a.x + 2},${a.y - 1} ${b.x - 2},${b.y - 1} ${c.x - 2},${c.y + 1} ${d.x + 2},${d.y + 1}`} fill="#0e1820"/>
                <polygon points={`${a.x + 2},${a.y - 1} ${b.x - 2},${b.y - 1} ${c.x - 2},${c.y + 1} ${d.x + 2},${d.y + 1}`} fill="#f5d97a" opacity={lit * .85}/>
                <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2 - 1} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#fffaee" strokeWidth=".6"/>
                <line x1={(a.x + d.x) / 2 + 1} y1={(a.y + d.y) / 2} x2={(b.x + c.x) / 2 - 1} y2={(b.y + c.y) / 2} stroke="#fffaee" strokeWidth=".6"/>
              </g>
            );
          })()}
          {/* Shutters */}
          {(() => {
            const sA = window.iso(wx - 13, 40, 72);
            const sB = window.iso(wx - 9, 40, 72);
            const sC = window.iso(wx - 9, 40, 116);
            const sD = window.iso(wx - 13, 40, 116);
            const tA = window.iso(wx + 9, 40, 72);
            const tB = window.iso(wx + 13, 40, 72);
            const tC = window.iso(wx + 13, 40, 116);
            const tD = window.iso(wx + 9, 40, 116);
            return (
              <g>
                <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="#1f3a4a"/>
                <polygon points={`${tA.x},${tA.y} ${tB.x},${tB.y} ${tC.x},${tC.y} ${tD.x},${tD.y}`} fill="#1f3a4a"/>
              </g>
            );
          })()}
        </g>
      ))}

      {/* PORCH ROOF — extends out 30 along +y, white, supported by columns */}
      <PorchExtension lit={lit}/>

      {/* Gable roof — slate, ridge along y direction */}
      <window.IsoGabledRoof x={-100} y={-80} z={130} w={200} d={120} riseH={70} eaveOverhang={8}
        faceLight="#5a626a" faceDark="#262a2e" stroke="#0e1418"/>
      {/* White pediment triangle on FRONT (y=40 side) — partly covers the gable face. */}
      {(() => {
        const eaveL = window.iso(-100 - 8, 40 + 8, 130);
        const eaveR = window.iso(100 + 8, 40 + 8, 130);
        const apex = window.iso(0, 40 + 8, 200);
        return (
          <g>
            <polygon points={`${eaveL.x},${eaveL.y} ${eaveR.x},${eaveR.y} ${apex.x},${apex.y}`} fill="#fffaee" stroke="#857a5a" strokeWidth="1"/>
            {/* Inset frame */}
            <polygon points={`${eaveL.x + 14},${eaveL.y - 4} ${eaveR.x - 14},${eaveR.y - 4} ${apex.x},${apex.y + 14}`} fill="rgba(0,0,0,.06)" stroke="#857a5a" strokeWidth=".5"/>
            <text x={apex.x} y={apex.y + 38} textAnchor="middle" fontFamily="Georgia,serif" fontSize="32" fontWeight="900" fill="#1f3a6e">ΔΥ</text>
          </g>
        );
      })()}

      {/* Chimney */}
      <window.IsoBox x={70} y={-60} z={188} w={24} d={28} h={40}
        front="#7a3a28" right="#5a2a1c" top="#3a1a12" stroke="rgba(40,15,8,.7)"/>
      <window.IsoBox x={68} y={-62} z={225} w={28} d={32} h={6}
        front="#5a2a1c" right="#3a1a12" top="#262017" stroke="rgba(20,8,4,.7)"/>
    </g>
  );
}

function PorchExtension({ lit }) {
  // Porch deck — extends from y=40 outward to y=80, on top of foundation z=20, height 4
  return (
    <g>
      {/* Deck base */}
      <window.IsoBox x={-100} y={40} z={20} w={200} d={40} h={4}
        front="#fffaee" right="#c8bea5" top="#e4dac0" stroke="#857a5a"/>
      {/* Porch roof line - a thin slab extending forward */}
      <window.IsoBox x={-100} y={40} z={108} w={200} d={40} h={6}
        front="#fffaee" right="#c8bea5" top="#dcd3bf" stroke="#857a5a"/>
      {/* Front door — center, at x=0 */}
      {(() => {
        const a = window.iso(-12, 40, 24);
        const b = window.iso(12, 40, 24);
        const c = window.iso(12, 40, 86);
        const d = window.iso(-12, 40, 86);
        return (
          <g>
            <polygon points={`${a.x - 2},${a.y + 1} ${b.x + 2},${b.y + 1} ${c.x + 2},${c.y - 1} ${d.x - 2},${d.y - 1}`} fill="#fffaee"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#1f3a4a"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .7}/>
            <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#fffaee" strokeWidth=".6"/>
            {/* Door knob */}
            <circle cx={(b.x + c.x) / 2 - 1} cy={(b.y + c.y) / 2} r="1.4" fill="#b3a369"/>
          </g>
        );
      })()}
      {/* Transom above door */}
      {(() => {
        const a = window.iso(-14, 40, 90);
        const b = window.iso(14, 40, 90);
        const c = window.iso(14, 40, 100);
        const d = window.iso(-14, 40, 100);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .9}/>
          </g>
        );
      })()}
      {/* COLUMNS — 4 of them on the front (y=80) edge of the porch deck */}
      {[-70, -22, 26, 74].map(cx => {
        // Column base
        const baseA = window.iso(cx - 4, 76, 24);
        const baseB = window.iso(cx + 4, 76, 24);
        const baseC = window.iso(cx + 4, 80, 28);
        const baseD = window.iso(cx - 4, 80, 28);
        // Column shaft polygon (just rectangle in iso projection)
        const sA = window.iso(cx - 3, 78, 28);
        const sB = window.iso(cx + 3, 78, 28);
        const sC = window.iso(cx + 3, 78, 104);
        const sD = window.iso(cx - 3, 78, 104);
        // Capital
        const cap1 = window.iso(cx - 4, 76, 104);
        const cap2 = window.iso(cx + 4, 76, 104);
        const cap3 = window.iso(cx + 4, 80, 108);
        const cap4 = window.iso(cx - 4, 80, 108);
        return (
          <g key={cx}>
            <polygon points={`${baseA.x},${baseA.y} ${baseB.x},${baseB.y} ${baseC.x},${baseC.y} ${baseD.x},${baseD.y}`} fill="#c8bea5"/>
            <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="#fffaee" stroke="#857a5a" strokeWidth=".5"/>
            {/* Fluting */}
            <line x1={(sA.x + sB.x) / 2 - 1} y1={(sA.y + sB.y) / 2} x2={(sC.x + sD.x) / 2 - 1} y2={(sC.y + sD.y) / 2} stroke="rgba(0,0,0,.1)" strokeWidth=".5"/>
            <line x1={(sA.x + sB.x) / 2 + 1} y1={(sA.y + sB.y) / 2} x2={(sC.x + sD.x) / 2 + 1} y2={(sC.y + sD.y) / 2} stroke="rgba(0,0,0,.1)" strokeWidth=".5"/>
            <polygon points={`${cap1.x},${cap1.y} ${cap2.x},${cap2.y} ${cap3.x},${cap3.y} ${cap4.x},${cap4.y}`} fill="#fffaee" stroke="#857a5a" strokeWidth=".5"/>
          </g>
        );
      })}
      {/* Porch railing between columns */}
      {[-46, 2, 50].map(cx => {
        const a = window.iso(cx - 20, 80, 52);
        const b = window.iso(cx + 20, 80, 52);
        return (
          <g key={cx}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#fffaee" strokeWidth="2.5"/>
            {Array.from({ length: 5 }).map((_, k) => {
              const px = cx - 16 + k * 8;
              const p1 = window.iso(px, 80, 52);
              const p2 = window.iso(px, 80, 28);
              return <line key={k} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#fffaee" strokeWidth="1.4"/>;
            })}
          </g>
        );
      })}
      {/* Solo cups on railing */}
      {[-62, -50, -34, 22, 38, 56].map((cx, i) => {
        const c = window.iso(cx, 80, 54);
        return <g key={i} transform={`translate(${c.x}, ${c.y})`}>
          <path d="M-3 0 L3 0 L2.4 5 L-2.4 5 Z" fill="#d8362a"/>
          <ellipse cx="0" cy="0" rx="3" ry=".8" fill="#a01a14"/>
        </g>;
      })}
      {/* Steps down from porch */}
      {[0, 1, 2].map(s => {
        const w = 60 + s * 10;
        return <window.IsoBox key={s} x={-w/2} y={80 + s * 4} z={24 - s * 6} w={w} d={4} h={6}
          front="#fffaee" right="#c8bea5" top="#dcd3bf" stroke="#857a5a"/>;
      })}
      {/* Welcome mat */}
      {(() => {
        const a = window.iso(-10, 78, 24);
        const b = window.iso(10, 78, 24);
        const c = window.iso(10, 80, 24);
        const d = window.iso(-10, 80, 24);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#1f3a4a"/>
            <text x={(a.x + c.x) / 2} y={(a.y + c.y) / 2 + 3} textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fontWeight="700" fill="#fffaee">ΔΥ</text>
          </g>
        );
      })()}
      {/* Hanging porch sign */}
      {(() => {
        const a = window.iso(-78, 76, 92);
        return <g transform={`translate(${a.x}, ${a.y})`}>
          <line x1="0" y1="0" x2="0" y2="6" stroke="#2a2520" strokeWidth=".8"/>
          <rect x="-14" y="6" width="28" height="14" fill="#5a3a18" stroke="#1a1410" strokeWidth=".5"/>
          <text x="0" y="16" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10" fontWeight="900" fill="#fffaee">ΔΥ</text>
        </g>;
      })()}
    </g>
  );
}

// Define cobble pattern + path inside any iso scene
function IsoSceneDefs() {
  return (
    <defs>
      <pattern id="cobble" x="0" y="0" width="20" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
        <rect width="20" height="14" fill="#e8d5a8"/>
        <ellipse cx="6" cy="5" rx="5" ry="3" fill="#dbc592"/>
        <ellipse cx="16" cy="10" rx="6" ry="3" fill="#d4ba80"/>
      </pattern>
    </defs>
  );
}

Object.assign(window, {
  SceneSpawnPlaza, SceneUPDTStadium, ScenePetronas, SceneTechTower, SceneDeltaUpsilon,
  IsoSceneDefs,
  AvatarAtWorld, GazeArc, PlazaTile, ScaleAnnotation,
});
