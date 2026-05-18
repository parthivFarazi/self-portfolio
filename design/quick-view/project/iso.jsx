// iso.jsx — isometric concept-art primitives.
// Coordinate system: world (x, y, z) where
//   +x goes screen-bottom-right (depth into scene)
//   +y goes screen-bottom-left  (width across scene)
//   +z goes screen-up           (height)
// Each scene renders inside a 1280×720 SVG with viewBox centered at (0,0).

const ISO_COS = Math.cos(Math.PI / 6); // 0.866
const ISO_SIN = Math.sin(Math.PI / 6); // 0.5

// Project a world point to screen coords.
function iso(x, y, z) {
  return {
    x: (x - y) * ISO_COS,
    y: (x + y) * ISO_SIN - z,
  };
}

// Format a list of [x,y,z] world points into a polygon "points" attribute.
function poly(pts) {
  return pts.map(p => {
    const s = iso(p[0], p[1], p[2]);
    return `${s.x.toFixed(1)},${s.y.toFixed(1)}`;
  }).join(' ');
}

// Path "M ... L ..." through a list of world points (closed)
function path(pts, close = true) {
  const parts = pts.map((p, i) => {
    const s = iso(p[0], p[1], p[2]);
    return `${i === 0 ? 'M' : 'L'}${s.x.toFixed(1)} ${s.y.toFixed(1)}`;
  });
  return parts.join(' ') + (close ? ' Z' : '');
}

// ─── ISO BOX ─────────────────────────────────────────────────────────────
// Draws an axis-aligned 3D box. Anchor (x,y,0) at the back-bottom corner.
// Visible faces: front (-x), right (+y), top (+z). +x face is hidden in back.
// Light from above-right: roof lightest, right face mid, front face darkest.

function IsoBox({ x = 0, y = 0, z = 0, w, d, h, front, right, top, stroke = 'rgba(20,15,10,.45)', sw = 0.6, frontOverlay, rightOverlay, topOverlay }) {
  // Corners
  const A = [x, y, z];           // back-left-bottom (hidden corner up-left)
  const B = [x + w, y, z];       // back-right-bottom (down-right at +x)
  const C = [x + w, y + d, z];   // front-right-bottom (closest to camera-bottom)
  const D = [x, y + d, z];       // front-left-bottom
  const E = [x, y, z + h];       // back-left-top
  const F = [x + w, y, z + h];
  const G = [x + w, y + d, z + h];
  const H = [x, y + d, z + h];
  // With +x = bottom-right, +y = bottom-left, +z = up:
  // The "left" face (visible from camera) is the +y face — points D, C, G, H.
  // The "right" face hidden? Let me reconsider.
  // iso(x=10, y=0, z=0) = (10*.866, 10*.5) = (8.66, 5) — bottom-right ✓
  // iso(x=0, y=10, z=0) = (-8.66, 5) — bottom-LEFT ✓
  // iso(x=10, y=10, z=0) = (0, 10) — directly below origin ✓
  // So the corner CLOSEST to camera-bottom is (w,d,0) = C.
  // Visible vertical faces are: x=w (the +x face, on the screen-right side)
  //                            and y=d (the +y face, on the screen-left side)
  // Wait — face x=w has corners (w,0,0)(w,d,0)(w,d,h)(w,0,h) = B,C,G,F. Project: B=(8.66,5), C=(0,10), G=(0,10-h), F=(8.66,5-h). That's a vertical strip on the screen-right.
  // Face y=d has corners (0,d,0)(w,d,0)(w,d,h)(0,d,h) = D,C,G,H. Project D=(-8.66,5),C=(0,10),G=(0,10-h),H=(-8.66,5-h). Screen-LEFT.
  // Top z=h: E,F,G,H.
  return (
    <g>
      {/* Left face (y=d, screen-left) — call it "front" in user-friendly terms (most visible / facing camera) */}
      <polygon points={poly([D, C, G, H])} fill={front} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      {frontOverlay ? <g style={{ clipPath: `polygon(${poly([D, C, G, H]).split(' ').join(', ')})` }}>{frontOverlay}</g> : null}
      {/* Right face (x=w, screen-right) */}
      <polygon points={poly([B, C, G, F])} fill={right} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      {rightOverlay ? <g style={{ clipPath: `polygon(${poly([B, C, G, F]).split(' ').join(', ')})` }}>{rightOverlay}</g> : null}
      {/* Top */}
      <polygon points={poly([E, F, G, H])} fill={top} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      {topOverlay ? <g style={{ clipPath: `polygon(${poly([E, F, G, H]).split(' ').join(', ')})` }}>{topOverlay}</g> : null}
    </g>
  );
}

// ─── GABLED ROOF ────────────────────────────────────────────────────────
// Anchored on top of a box at (x, y, z) extending +w x +d.
// Ridge runs along +y at x = x + w/2.
function IsoGabledRoof({ x, y, z, w, d, riseH, eaveOverhang = 0, faceLight, faceDark, stroke = 'rgba(20,15,10,.45)', sw = 0.6 }) {
  const o = eaveOverhang;
  // Ridge endpoints
  const R1 = [x + w / 2, y - o, z + riseH];
  const R2 = [x + w / 2, y + d + o, z + riseH];
  // Eave corners
  const eaveBLF = [x - o, y - o, z];     // back-left-front
  const eaveBRF = [x + w + o, y - o, z]; // back-right
  const eaveFLF = [x - o, y + d + o, z]; // front-left
  const eaveFRF = [x + w + o, y + d + o, z];
  return (
    <g>
      {/* Left-facing roof slope (the one we mostly see from camera-front-left) */}
      <polygon points={poly([eaveFLF, eaveBLF, R1, R2])} fill={faceLight} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      {/* Right-facing roof slope */}
      <polygon points={poly([eaveBRF, eaveFRF, R2, R1])} fill={faceDark} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      {/* Triangular gables at the ends */}
      <polygon points={poly([eaveBLF, eaveBRF, R1])} fill={faceDark} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <polygon points={poly([eaveFLF, eaveFRF, R2])} fill={faceLight} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
    </g>
  );
}

// Hipped (pyramidal) roof — converges to a point or short ridge at center top.
function IsoHipRoof({ x, y, z, w, d, riseH, faceLight, faceDark, stroke = 'rgba(20,15,10,.45)', sw = 0.6 }) {
  const apex = [x + w / 2, y + d / 2, z + riseH];
  const c1 = [x, y, z], c2 = [x + w, y, z], c3 = [x + w, y + d, z], c4 = [x, y + d, z];
  return (
    <g>
      <polygon points={poly([c4, c1, apex])} fill={faceLight} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <polygon points={poly([c1, c2, apex])} fill={faceDark} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <polygon points={poly([c2, c3, apex])} fill={faceDark} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <polygon points={poly([c3, c4, apex])} fill={faceLight} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
    </g>
  );
}

// ─── ISO GROUND TILE ────────────────────────────────────────────────────
// Draws a flat rhombus of grass/path centered on (cx, cy) world coords.
function IsoTile({ cx = 0, cy = 0, w, d, fill, stroke }) {
  const pts = [
    [cx - w/2, cy - d/2, 0],
    [cx + w/2, cy - d/2, 0],
    [cx + w/2, cy + d/2, 0],
    [cx - w/2, cy + d/2, 0],
  ];
  return <polygon points={poly(pts)} fill={fill} stroke={stroke} strokeWidth=".6" strokeLinejoin="round"/>;
}

// ─── SKY + GROUND BACKGROUND ────────────────────────────────────────────

function IsoSky({ tod = 'golden' }) {
  const presets = {
    golden: ['#ffd9a8', '#f5b69a', '#e3c5e1', '#b3dfd7'],
    dusk:   ['#d97a72', '#ad5b7e', '#6e4f8a', '#3a3b6a'],
    night:  ['#15183a', '#1f1f4a', '#2e2856', '#1a1f3a'],
  };
  const stops = presets[tod] || presets.golden;
  return (
    <>
      <defs>
        <linearGradient id={`sky-${tod}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stops[0]}/>
          <stop offset="38%" stopColor={stops[1]}/>
          <stop offset="72%" stopColor={stops[2]}/>
          <stop offset="100%" stopColor={stops[3]}/>
        </linearGradient>
        <radialGradient id={`sun-${tod}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={tod === 'night' ? '#fffaee' : '#fff1c8'}/>
          <stop offset="60%" stopColor={tod === 'night' ? '#fffaee' : '#ffc88a'} stopOpacity={tod === 'night' ? '.7' : '.5'}/>
          <stop offset="100%" stopColor={tod === 'night' ? '#fffaee' : '#ffc88a'} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect x="-640" y="-540" width="1280" height="720" fill={`url(#sky-${tod})`}/>
      {/* Sun / moon */}
      <circle cx={tod === 'night' ? '-280' : '320'} cy="-380" r="120" fill={`url(#sun-${tod})`}/>
      <circle cx={tod === 'night' ? '-280' : '320'} cy="-380" r={tod === 'night' ? 36 : 32} fill={tod === 'night' ? '#fffaee' : '#fff1c8'} opacity="0.95"/>
      {tod === 'night' ? (
        <>
          {Array.from({ length: 60 }).map((_, i) => (
            <circle key={i} cx={(((i * 137) % 1280) - 640).toFixed(0)} cy={((-540 + ((i * 91) % 300))).toFixed(0)} r={0.4 + (i % 4) * 0.3} fill="#fffaee" opacity={0.4 + ((i % 5) * 0.12)}/>
          ))}
          {/* Crescent shadow */}
          <circle cx="-260" cy="-388" r="34" fill={stops[1]} opacity=".85"/>
        </>
      ) : (
        <>
          {/* Painterly clouds */}
          <IsoCloud x={-380} y={-300}/>
          <IsoCloud x={140} y={-320} scale={0.8}/>
          <IsoCloud x={420} y={-260} scale={1.2}/>
          <IsoCloud x={-100} y={-380} scale={0.6}/>
        </>
      )}
    </>
  );
}

function IsoCloud({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity=".7">
      <ellipse cx="0" cy="0" rx="80" ry="14" fill="#fffaee"/>
      <ellipse cx="-50" cy="-8" rx="36" ry="14" fill="#fffaee"/>
      <ellipse cx="50" cy="-6" rx="44" ry="14" fill="#fffaee"/>
      <ellipse cx="-12" cy="-14" rx="26" ry="12" fill="#fffaee"/>
      <ellipse cx="20" cy="-18" rx="22" ry="11" fill="#fffaee"/>
    </g>
  );
}

// Distant mountains / floating islands silhouette.
function IsoHorizon({ tod = 'golden' }) {
  const back = tod === 'night' ? '#1a2030' : tod === 'dusk' ? '#3a3650' : '#6a8a78';
  const fore = tod === 'night' ? '#0e1422' : tod === 'dusk' ? '#231f38' : '#4a6a58';
  return (
    <g opacity=".88">
      {/* Far floating islands */}
      <g transform="translate(-440, -180)" opacity="0.7">
        <path d="M0 0 Q40 -20 100 -22 Q160 -20 200 -6 Q220 6 200 14 Q140 18 60 14 Q10 8 0 0 Z" fill={back}/>
        <path d="M20 8 Q60 30 100 36 Q150 36 180 18 Q160 26 100 22 Q60 18 20 8 Z" fill={fore}/>
        <ellipse cx="60" cy="-20" rx="10" ry="14" fill="#3e5a3c"/>
        <ellipse cx="110" cy="-26" rx="14" ry="18" fill="#3e5a3c"/>
        <ellipse cx="160" cy="-22" rx="10" ry="14" fill="#3e5a3c"/>
      </g>
      <g transform="translate(360, -220)" opacity="0.55">
        <path d="M0 0 Q40 -14 80 -16 Q120 -14 140 -4 Q150 4 130 10 Q90 14 40 10 Q10 6 0 0 Z" fill={back}/>
        <ellipse cx="50" cy="-14" rx="8" ry="10" fill="#3e5a3c"/>
        <ellipse cx="100" cy="-16" rx="10" ry="12" fill="#3e5a3c"/>
      </g>
      {/* Far hill range */}
      <path d={`M-640 -40 L-540 -110 L-440 -70 L-300 -130 L-180 -90 L-40 -140 L80 -100 L240 -150 L380 -90 L520 -120 L640 -60 L640 60 L-640 60 Z`} fill={back} opacity=".7"/>
      <path d={`M-640 20 L-520 -50 L-360 -10 L-220 -60 L-40 -20 L120 -50 L300 -20 L460 -60 L640 -10 L640 80 L-640 80 Z`} fill={fore} opacity=".85"/>
    </g>
  );
}

// ─── ISO GROUND ─────────────────────────────────────────────────────────
// Draws the visible island floor. Camera viewport implies x+y ≤ some range.
function IsoGroundPlane({ tod = 'golden' }) {
  // Just fill the lower half with grass tones. We'll layer trees/paths on top.
  const grass = tod === 'night' ? '#2a4a3a' : tod === 'dusk' ? '#3a6a4a' : '#5a9558';
  const grassDark = tod === 'night' ? '#1a2a22' : tod === 'dusk' ? '#22442a' : '#3e6a3c';
  return (
    <g>
      <defs>
        <linearGradient id={`ground-${tod}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={grass}/>
          <stop offset="100%" stopColor={grassDark}/>
        </linearGradient>
        <pattern id={`grass-stipple-${tod}`} x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="6" r="1" fill="#a8d49f" opacity=".7"/>
          <circle cx="18" cy="11" r=".9" fill="#7eb86a"/>
          <circle cx="26" cy="3" r=".8" fill="#a8d49f" opacity=".6"/>
          <circle cx="11" cy="17" r=".7" fill="#3e6a3c"/>
        </pattern>
        <pattern id={`flowers-${tod}`} x="0" y="0" width="80" height="60" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="14" r="1.6" fill="#f5d97a"/>
          <circle cx="48" cy="36" r="1.4" fill="#e07ec3"/>
          <circle cx="62" cy="10" r="1.2" fill="#fffaee"/>
          <circle cx="24" cy="48" r="1.4" fill="#f5d97a"/>
        </pattern>
      </defs>
      <rect x="-640" y="-30" width="1280" height="210" fill={`url(#ground-${tod})`}/>
      <rect x="-640" y="-30" width="1280" height="210" fill={`url(#grass-stipple-${tod})`} opacity=".65"/>
      <rect x="-640" y="-30" width="1280" height="210" fill={`url(#flowers-${tod})`} opacity=".9"/>
      {/* Cliff edge below the island */}
      <rect x="-640" y="150" width="1280" height="40" fill={tod === 'night' ? '#0e1822' : '#3a2410'}/>
      <rect x="-640" y="158" width="1280" height="32" fill={tod === 'night' ? '#15202e' : '#5a3a18'} opacity=".7"/>
      {/* Water beneath */}
      <rect x="-640" y="180" width="1280" height="40" fill={tod === 'night' ? '#0e1822' : '#3a6470'}/>
    </g>
  );
}

// Iso path tile — for cobblestone paths radiating from a center.
function IsoPath({ pts, width = 50, fill = '#e8d5a8', stroke = '#c8b585' }) {
  // pts is array of world [x,y] waypoints; we draw it as a strip.
  // Simple: connect consecutive points with a stroked path projected.
  const screenPts = pts.map(p => iso(p[0], p[1], 0));
  const d = screenPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  return (
    <g>
      <path d={d} stroke="#857a5a" strokeWidth={width + 4} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={d} stroke={fill} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d={d} stroke={stroke} strokeWidth={width} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 8" opacity=".4"/>
    </g>
  );
}

// ─── ISOMETRIC AVATAR ───────────────────────────────────────────────────
// 3/4 front view, ~60-70px tall by default. Tiny figure at base of building.
function IsoAvatar({ size = 80, facing = 'south' }) {
  // facing: south = camera-facing; east = right; west = left; north = back
  const flip = facing === 'west' || facing === 'north';
  return (
    <g transform={`scale(${size / 110}) ${flip ? 'scale(-1, 1)' : ''}`} style={{ pointerEvents: 'none' }}>
      {/* Shadow */}
      <ellipse cx="0" cy="0" rx="22" ry="6" fill="rgba(0,0,0,.4)"/>
      {/* Legs / khakis */}
      <path d="M-12 -1 L-10 -50 L-2 -50 L-1 -1 Z" fill="#b8a47a"/>
      <path d="M2 -1 L1 -50 L10 -50 L12 -1 Z" fill="#a89878"/>
      {/* Shoes */}
      <ellipse cx="-7" cy="-1" rx="6" ry="2" fill="#3a2410"/>
      <ellipse cx="7" cy="-1" rx="6" ry="2" fill="#3a2410"/>
      {/* Belt */}
      <rect x="-12" y="-54" width="24" height="4" fill="#1a1410"/>
      <rect x="-1" y="-53" width="3" height="3" fill="#d4c178"/>
      {/* Shirt body */}
      <path d="M-14 -54 L-14 -86 Q-14 -90 -10 -90 L10 -90 Q14 -90 14 -86 L14 -54 Z" fill="#f6f1e4"/>
      {/* Right side shading */}
      <path d="M14 -86 L14 -54 L8 -54 L8 -86 Z" fill="#dcd3bf"/>
      {/* Placket */}
      <line x1="0" y1="-54" x2="0" y2="-88" stroke="#dcd3bf" strokeWidth=".8"/>
      {/* Arms */}
      <rect x="-18" y="-86" width="6" height="22" fill="#f6f1e4"/>
      <rect x="12" y="-86" width="6" height="22" fill="#dcd3bf"/>
      {/* Sleeve roll line */}
      <rect x="-18" y="-66" width="6" height="2" fill="#dcd3bf"/>
      <rect x="12" y="-66" width="6" height="2" fill="#c8bea5"/>
      {/* Hands */}
      <circle cx="-15" cy="-58" r="3.4" fill="#d9a779"/>
      <circle cx="15" cy="-58" r="3.4" fill="#c89060"/>
      {/* Gold wristband — left wrist (viewer-right for south-facing) */}
      <rect x="-18" y="-62" width="6" height="2.6" fill="#d4c178"/>
      {/* Laptop under right arm */}
      <rect x="11" y="-72" width="14" height="10" rx="1" fill="#2e2a26" transform="rotate(8 18 -67)"/>
      <rect x="12" y="-70" width="12" height="7" fill="#3f6f7a" transform="rotate(8 18 -67)"/>
      {/* Neck */}
      <rect x="-4" y="-92" width="8" height="6" fill="#c89060"/>
      <rect x="-4" y="-92" width="8" height="4" fill="#d9a779"/>
      {/* Head */}
      <ellipse cx="0" cy="-100" rx="11" ry="12" fill="#d9a779"/>
      {/* Right side shading on head */}
      <path d="M0 -111 Q9 -110 11 -98 Q11 -90 0 -88 Z" fill="#c89060"/>
      {/* Hair */}
      <path d="M-10 -104 Q-10 -114 0 -115 Q10 -114 10 -104 Q9 -109 6 -110 Q0 -106 -6 -110 Q-9 -109 -10 -104 Z" fill="#1a1410"/>
      <path d="M-10 -104 Q-10 -100 -8 -98 L-8 -102 Z" fill="#1a1410"/>
      <path d="M10 -104 Q10 -100 8 -98 L8 -102 Z" fill="#1a1410"/>
      {/* Beard */}
      <path d="M-8 -98 Q-8 -91 -4 -89 Q0 -87 4 -89 Q8 -91 8 -98 Q4 -94 0 -94 Q-4 -94 -8 -98 Z" fill="#241a14"/>
      {/* Eyes */}
      <ellipse cx="-4" cy="-101" rx=".9" ry="1.2" fill="#0e1018"/>
      <ellipse cx="4" cy="-101" rx=".9" ry="1.2" fill="#0e1018"/>
      {/* Brows */}
      <path d="M-7 -104 Q-4 -105 -1 -104" stroke="#1a1410" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M1 -104 Q4 -105 7 -104" stroke="#1a1410" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </g>
  );
}

// ─── ISO TREE / PLANT ATOMS ─────────────────────────────────────────────

function IsoTree({ x, y, scale = 1, variant = 0, tod = 'golden' }) {
  const sun = tod === 'night' ? .35 : tod === 'dusk' ? .7 : 1;
  const c = iso(x, y, 0);
  const trunkColors = ['#3a2410', '#2a1c10', '#1a1410'];
  const canopies = [
    ['#5a9558', '#7eb86a', '#3e6a3c'],   // round oak
    ['#4a8a48', '#6db862', '#2e5a3a'],   // dense
    ['#7eb86a', '#a8d49f', '#3e6a3c'],   // pale
  ];
  const cs = canopies[variant % canopies.length];
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${scale})`}>
      <ellipse cx="2" cy="6" rx="22" ry="6" fill="rgba(0,0,0,.35)"/>
      <rect x="-4" y="-24" width="8" height="30" fill={trunkColors[variant % trunkColors.length]}/>
      <rect x="0" y="-24" width="4" height="30" fill="rgba(0,0,0,.25)"/>
      {/* Canopy — layered with simulated light direction */}
      <ellipse cx="-16" cy="-36" rx="22" ry="26" fill={cs[2]} opacity={.85 * sun}/>
      <ellipse cx="14" cy="-42" rx="26" ry="30" fill={cs[0]} opacity={sun}/>
      <ellipse cx="-2" cy="-56" rx="20" ry="22" fill={cs[1]} opacity={sun}/>
      <ellipse cx="10" cy="-50" rx="12" ry="14" fill="#a8d49f" opacity={.65 * sun}/>
      {/* Highlight */}
      <ellipse cx="20" cy="-58" rx="8" ry="6" fill="#fffaee" opacity={.18 * sun}/>
    </g>
  );
}

function IsoBush({ x, y, scale = 1, color = '#5a9558' }) {
  const c = iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="14" ry="4" fill="rgba(0,0,0,.3)"/>
      <ellipse cx="-6" cy="-4" rx="10" ry="9" fill={color}/>
      <ellipse cx="6" cy="-6" rx="11" ry="10" fill={color}/>
      <ellipse cx="0" cy="-12" rx="8" ry="8" fill={color}/>
      <ellipse cx="6" cy="-10" rx="4" ry="3.5" fill="#a8d49f" opacity=".7"/>
    </g>
  );
}

function IsoLantern({ x, y, lit = 1, scale = 1 }) {
  const c = iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="6" ry="2" fill="rgba(0,0,0,.3)"/>
      <rect x="-1.4" y="-44" width="3" height="46" fill="#2a1c10"/>
      <rect x="-7" y="-44" width="14" height="4" fill="#3a2410"/>
      <path d="M-9 -44 L9 -44 L7 -38 L-7 -38 Z" fill="#5a3a18"/>
      <rect x="-7" y="-38" width="14" height="14" fill="#f5d97a" opacity={lit}/>
      <rect x="-7" y="-38" width="14" height="3" fill="rgba(255,250,238,.5)" opacity={lit}/>
      <path d="M-9 -24 L9 -24 L7 -20 L-7 -20 Z" fill="#3a2410"/>
      <circle cx="0" cy="-30" r="22" fill="#f5d97a" opacity={lit * .22}/>
    </g>
  );
}

// ─── ATMOSPHERE LAYERS ──────────────────────────────────────────────────

function GoldenHourGlow({ tod = 'golden' }) {
  if (tod === 'night') return null;
  return (
    <radialGradient id={`atmos-${tod}`} cx="50%" cy="100%" r="80%">
      <stop offset="0%" stopColor="#fff1c8" stopOpacity={tod === 'dusk' ? '.4' : '.55'}/>
      <stop offset="60%" stopColor="#fff1c8" stopOpacity="0"/>
    </radialGradient>
  );
}

// ─── SCENE FRAME ────────────────────────────────────────────────────────

function IsoScene({ tod = 'golden', children, label, sub, location }) {
  return (
    <div style={{
      width: 1280, height: 720, position: 'relative',
      background: '#0e1418', overflow: 'hidden',
      fontFamily: 'var(--rw-sans)',
    }}>
      <svg viewBox="-640 -540 1280 720" width="1280" height="720" style={{ display: 'block', position: 'absolute', inset: 0 }}>
        <defs>
          <GoldenHourGlow tod={tod}/>
          <pattern id="cobble" x="0" y="0" width="20" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <rect width="20" height="14" fill="#e8d5a8"/>
            <ellipse cx="6" cy="5" rx="5" ry="3" fill="#dbc592"/>
            <ellipse cx="16" cy="10" rx="6" ry="3" fill="#d4ba80"/>
          </pattern>
          <pattern id="brick-iso" x="0" y="0" width="14" height="8" patternUnits="userSpaceOnUse">
            <rect width="14" height="8" fill="transparent"/>
            <line x1="0" y1="4" x2="14" y2="4" stroke="rgba(40,15,8,.5)" strokeWidth=".4"/>
            <line x1="7" y1="0" x2="7" y2="4" stroke="rgba(40,15,8,.4)" strokeWidth=".4"/>
            <line x1="0" y1="4" x2="0" y2="8" stroke="rgba(40,15,8,.4)" strokeWidth=".4"/>
          </pattern>
        </defs>
        <IsoSky tod={tod}/>
        <IsoHorizon tod={tod}/>
        <IsoGroundPlane tod={tod}/>
        {children}
        {/* Atmospheric warm glow overlay */}
        {tod !== 'night' ? <rect x="-640" y="-540" width="1280" height="720" fill={`url(#atmos-${tod})`} style={{ mixBlendMode: 'screen' }}/> : null}
        {/* Subtle vignette */}
        <radialGradient id="iso-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,.4)"/>
        </radialGradient>
        <rect x="-640" y="-540" width="1280" height="720" fill="url(#iso-vignette)" style={{ pointerEvents: 'none' }}/>
      </svg>
      {/* Sims-style location chip */}
      <div style={{
        position: 'absolute', left: 28, top: 24, display: 'flex', flexDirection: 'column', gap: 4,
        background: 'rgba(15,15,12,.78)', backdropFilter: 'blur(8px)',
        padding: '10px 16px', borderRadius: 999,
        boxShadow: '0 6px 18px rgba(0,0,0,.32)',
      }}>
        <span style={{ font: '10px var(--rw-mono)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(212,193,120,.95)' }}>Location · {location}</span>
        <span style={{ font: 'italic 22px/1 var(--rw-serif)', color: '#fffaee' }}>{label}</span>
        {sub ? <span style={{ font: '11px var(--rw-mono)', color: 'rgba(255,250,238,.6)' }}>{sub}</span> : null}
      </div>
      {/* Frame counter */}
      <div style={{
        position: 'absolute', right: 28, top: 24,
        font: '10px var(--rw-mono)', letterSpacing: '.18em', color: 'rgba(255,250,238,.6)',
        background: 'rgba(15,15,12,.65)', padding: '8px 14px', borderRadius: 999,
      }}>RESUME WORLD · CONCEPT</div>
    </div>
  );
}

Object.assign(window, {
  iso, poly, path,
  IsoBox, IsoGabledRoof, IsoHipRoof, IsoTile, IsoPath,
  IsoSky, IsoHorizon, IsoGroundPlane, IsoCloud,
  IsoAvatar, IsoTree, IsoBush, IsoLantern,
  IsoScene,
});
