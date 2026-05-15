// scenes-rest.jsx — Remaining 9 isometric scenes.
// Forge, Archive, Zen, Qard, Lighthouse, Workshop, RMAICT, Heatmap, Athletic.

const { iso, poly, IsoBox, IsoGabledRoof, IsoHipRoof, IsoTree, IsoBush, IsoLantern, IsoScene, IsoPath, AvatarAtWorld, GazeArc, PlazaTile, ScaleAnnotation } = window;

// ─── SCENE 6: THE FORGE ─────────────────────────────────────────────────

function SceneForge({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="06 · skills" label="The Forge" sub="Languages + GPUs · hammered into shape">
      <window.IsoPath pts={[[80, 200], [80, 50]]} width={42}/>
      <window.IsoTree x={-220} y={-80} variant={1} scale={1.4} tod={tod}/>
      <window.IsoTree x={220} y={170} variant={0} scale={1.1} tod={tod}/>
      <window.IsoBush x={-130} y={150} scale={1}/>
      <window.IsoBush x={170} y={-100} scale={1.1}/>

      <ForgeBuilding tod={tod}/>

      {/* Floating language icons rising above the forge */}
      <FloatingLangIcon x={-30} y={-30} z={310} text="py" color="#6fd5e0"/>
      <FloatingLangIcon x={20} y={-30} z={350} text="JS" color="#e07ec3"/>
      <FloatingLangIcon x={-10} y={10} z={290} text="C++" color="#94e2c0"/>
      <FloatingLangIcon x={40} y={20} z={270} text="ML" color="#d4c178"/>

      <AvatarAtWorld x={80} y={160} facing="north" size={66}/>
      <ScaleAnnotation worldX={200} worldY={130} text="2 fl · half-timber" color="#f5d97a"/>
    </window.IsoScene>
  );
}

function ForgeBuilding({ tod }) {
  const lit = tod === 'night' ? 1 : .85;
  return (
    <g>
      {/* Stone foundation */}
      <window.IsoBox x={-110} y={-90} z={0} w={220} d={140} h={20}
        front="#fffaee" right="#c8bea5" top="#dcd3bf" stroke="#857a5a"/>
      {/* Body — half-timber white wattle */}
      <window.IsoBox x={-100} y={-80} z={20} w={200} d={120} h={130}
        front="#e4dac0" right="#bcb29a" top="#9a907a" stroke="rgba(40,30,10,.6)"/>
      {/* Wood beams on FRONT face (y=40) */}
      {(() => {
        const top = window.iso(-100, 40, 150);
        const topR = window.iso(100, 40, 150);
        const bot = window.iso(-100, 40, 20);
        const botR = window.iso(100, 40, 20);
        const mid = window.iso(-100, 40, 80);
        const midR = window.iso(100, 40, 80);
        const v0 = window.iso(0, 40, 20);
        const v0t = window.iso(0, 40, 150);
        const xL1 = window.iso(-50, 40, 20);
        const xL1t = window.iso(-50, 40, 80);
        const xR1 = window.iso(50, 40, 20);
        const xR1t = window.iso(50, 40, 80);
        // Diagonals
        const dA = window.iso(-100, 40, 80);
        const dB = window.iso(-50, 40, 20);
        const dC = window.iso(-50, 40, 80);
        const dD = window.iso(0, 40, 20);
        const dE = window.iso(50, 40, 80);
        const dF = window.iso(100, 40, 20);
        const dG = window.iso(0, 40, 80);
        const dH = window.iso(50, 40, 20);
        return (
          <g>
            <line x1={top.x} y1={top.y} x2={topR.x} y2={topR.y} stroke="#3a2410" strokeWidth="4"/>
            <line x1={bot.x} y1={bot.y} x2={botR.x} y2={botR.y} stroke="#3a2410" strokeWidth="4"/>
            <line x1={mid.x} y1={mid.y} x2={midR.x} y2={midR.y} stroke="#3a2410" strokeWidth="3"/>
            <line x1={v0.x} y1={v0.y} x2={v0t.x} y2={v0t.y} stroke="#3a2410" strokeWidth="3"/>
            <line x1={xL1.x} y1={xL1.y} x2={xL1t.x} y2={xL1t.y} stroke="#3a2410" strokeWidth="2.5"/>
            <line x1={xR1.x} y1={xR1.y} x2={xR1t.x} y2={xR1t.y} stroke="#3a2410" strokeWidth="2.5"/>
            {/* Diagonal cross braces */}
            <line x1={dA.x} y1={dA.y} x2={dB.x} y2={dB.y} stroke="#3a2410" strokeWidth="3"/>
            <line x1={dC.x} y1={dC.y} x2={dD.x} y2={dD.y} stroke="#3a2410" strokeWidth="3"/>
            <line x1={dE.x} y1={dE.y} x2={dF.x} y2={dF.y} stroke="#3a2410" strokeWidth="3"/>
            <line x1={dG.x} y1={dG.y} x2={dH.x} y2={dH.y} stroke="#3a2410" strokeWidth="3"/>
          </g>
        );
      })()}

      {/* Open glowing front door — large opening */}
      {(() => {
        const a = window.iso(-50, 40, 20);
        const b = window.iso(50, 40, 20);
        const c = window.iso(50, 40, 110);
        const d = window.iso(-50, 40, 110);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#1a1410"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .9}/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#fff1c8" opacity={lit * .35} style={{ mixBlendMode: 'screen' }}/>
            {/* Inside: anvil silhouette */}
            <ellipse cx={(a.x + b.x) / 2} cy={(a.y + b.y) / 2 - 6} rx="22" ry="6" fill="#1a1410" opacity=".7"/>
            <rect x={(a.x + b.x) / 2 - 14} y={(a.y + b.y) / 2 - 14} width="28" height="6" fill="#1a1410" opacity=".7"/>
            {/* GPU rack glimpse — left */}
            <rect x={d.x + 6} y={d.y + 20} width="12" height="36" fill="#0e1820"/>
            {[0, 1, 2, 3, 4].map(i => <rect key={i} x={d.x + 8} y={d.y + 24 + i * 7} width="8" height="1.5" fill="#6fd5e0" opacity={lit}/>)}
            {/* GPU rack glimpse — right */}
            <rect x={c.x - 18} y={c.y + 20} width="12" height="36" fill="#0e1820"/>
            {[0, 1, 2, 3, 4].map(i => <rect key={i} x={c.x - 16} y={c.y + 24 + i * 7} width="8" height="1.5" fill="#94e2c0" opacity={lit}/>)}
          </g>
        );
      })()}

      {/* Side windows on +x face (right) — small with shutters */}
      {[40, 80, 120].map((zwy, i) => {
        const a = window.iso(100, -50 + i * 40, 60);
        const b = window.iso(100, -30 + i * 40, 60);
        const c = window.iso(100, -30 + i * 40, 100);
        const d = window.iso(100, -50 + i * 40, 100);
        return <g key={i}>
          <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820" stroke="#3a2410" strokeWidth="1"/>
          <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .8}/>
          {/* Mullion */}
          <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#3a2410" strokeWidth=".5"/>
        </g>;
      })}

      {/* Pitched shingled roof */}
      <window.IsoGabledRoof x={-100} y={-80} z={150} w={200} d={120} riseH={90} eaveOverhang={8}
        faceLight="#7a5234" faceDark="#3a2410" stroke="#1a1410" sw={.8}/>
      {/* Shingle lines on visible roof face */}
      {Array.from({ length: 10 }).map((_, i) => {
        const t = (i + 1) / 11;
        const a = window.iso(-100 - 8 + (0 + 8) * t, 40 + 8, 150 + 90 * t);
        const b = window.iso(100 + 8 - (0 + 8) * t, 40 + 8, 150 + 90 * t);
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(20,10,4,.3)" strokeWidth=".4"/>;
      })}

      {/* Stone chimney with sparks */}
      <window.IsoBox x={60} y={-40} z={240} w={28} d={28} h={50}
        front="#857a5a" right="#5a5048" top="#3a2a1e" stroke="#1a1410"/>
      <window.IsoBox x={58} y={-42} z={285} w={32} d={32} h={5}
        front="#3a2a1e" right="#262017" top="#1a1410"/>
      {/* Smoke */}
      {(() => {
        const c = window.iso(74, -26, 290);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <ellipse cx="0" cy="-6" rx="10" ry="6" fill="#fffaee" opacity=".55"/>
            <ellipse cx="6" cy="-18" rx="8" ry="6" fill="#fffaee" opacity=".4"/>
            <ellipse cx="-4" cy="-30" rx="6" ry="5" fill="#fffaee" opacity=".3"/>
            {/* Sparks */}
            <circle cx="2" cy="0" r="1.6" fill="#f5d97a"/>
            <circle cx="10" cy="-8" r="1.4" fill="#e07ec3"/>
            <circle cx="-4" cy="-12" r="1.2" fill="#6fd5e0"/>
            <circle cx="8" cy="-22" r="1" fill="#f5d97a"/>
          </g>
        );
      })()}

      {/* Sign over door */}
      {(() => {
        const c = window.iso(0, 40, 120);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <rect x="-40" y="-12" width="80" height="20" fill="#3a2410" stroke="#1a1410" strokeWidth=".8"/>
            <text x="0" y="3" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12" fontWeight="900" fill="#f5d97a" letterSpacing="3">FORGE</text>
          </g>
        );
      })()}
    </g>
  );
}

function FloatingLangIcon({ x, y, z, text, color }) {
  const c = window.iso(x, y, z);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <circle r="16" fill={color} opacity=".25"/>
      <circle r="12" fill={color}/>
      <circle r="12" fill="none" stroke="rgba(255,250,238,.5)" strokeWidth=".6"/>
      <text x="0" y="4" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="900" fill="#0e1820">{text}</text>
      {/* Particle trail rising */}
      <circle cx="-2" cy="22" r="1.5" fill={color} opacity=".5"/>
      <circle cx="3" cy="30" r="1.2" fill={color} opacity=".35"/>
      <circle cx="-1" cy="38" r="1" fill={color} opacity=".2"/>
    </g>
  );
}

// ─── SCENE 7: WHISPERING ARCHIVE ────────────────────────────────────────

function SceneArchive({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="07 · project" label="The Whispering Archive" sub="FAISS · Gemma-3 · 490k+ quotes">
      <window.IsoPath pts={[[80, 220], [80, 60]]} width={42}/>
      <window.IsoTree x={-220} y={-50} variant={1} scale={1.4} tod={tod}/>
      <window.IsoTree x={220} y={140} variant={0} scale={1.3} tod={tod}/>
      <window.IsoBush x={-160} y={130} scale={1}/>
      <window.IsoBush x={140} y={-90} scale={.9}/>
      <window.IsoLantern x={-150} y={180} lit={tod === 'night' ? 1 : .55}/>
      <window.IsoLantern x={150} y={-130} lit={tod === 'night' ? 1 : .55}/>

      <ArchiveBuilding tod={tod}/>

      {/* Firefly quote-tags drifting around */}
      <Firefly x={-160} y={-160} z={150} color="#f5d97a"/>
      <Firefly x={140} y={-180} z={200} color="#e07ec3"/>
      <Firefly x={-180} y={120} z={170} color="#6fd5e0"/>
      <Firefly x={160} y={100} z={140} color="#94e2c0"/>
      <Firefly x={-40} y={-200} z={280} color="#f5d97a"/>
      <Firefly x={40} y={-220} z={240} color="#e07ec3"/>

      <AvatarAtWorld x={80} y={170} facing="north" size={64}/>
      <ScaleAnnotation worldX={-180} worldY={-130} text="490 k embeddings" color="#94e2c0"/>
    </window.IsoScene>
  );
}

function ArchiveBuilding({ tod }) {
  const lit = tod === 'night' ? 1 : .85;
  return (
    <g>
      {/* Stone block walls */}
      <window.IsoBox x={-100} y={-90} z={0} w={200} d={140} h={120}
        front="#c8bea5" right="#9a907a" top="#7a7064" stroke="rgba(50,40,20,.7)"/>
      {/* Stone block courses */}
      {Array.from({ length: 6 }).map((_, k) => {
        const z = 16 + k * 18;
        const a = window.iso(-100, 50, z), b = window.iso(100, 50, z);
        return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(50,40,20,.4)" strokeWidth=".5"/>;
      })}
      {Array.from({ length: 7 }).map((_, k) => {
        const x = -100 + k * 32;
        const a = window.iso(x, 50, 0), b = window.iso(x, 50, 120);
        return <line key={`v${k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(50,40,20,.3)" strokeWidth=".4"/>;
      })}
      {/* Ivy climbing left edge */}
      {(() => {
        const a = window.iso(-100, 50, 0);
        return (
          <g transform={`translate(${a.x}, ${a.y})`}>
            <path d="M0 0 Q4 -30 -2 -60 Q4 -90 -2 -120" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
            <circle cx="2" cy="-20" r="4" fill="#5a9558"/>
            <circle cx="-2" cy="-40" r="4" fill="#3e6a3c"/>
            <circle cx="4" cy="-60" r="4" fill="#7eb86a"/>
            <circle cx="-4" cy="-80" r="4" fill="#3e6a3c"/>
            <circle cx="2" cy="-100" r="4" fill="#5a9558"/>
          </g>
        );
      })()}

      {/* GLOWING DOME on top */}
      <ArchiveDome tod={tod}/>

      {/* Arched window — LEFT side on front face */}
      <ArchiveArchedWindow worldX={-50} y={50} baseZ={28} h={64} w={28} lit={lit}/>
      <ArchiveArchedWindow worldX={50} y={50} baseZ={28} h={64} w={28} lit={lit}/>
      {/* Inside: glimpse of H100 GPU rack */}
      {(() => {
        const a = window.iso(36, 50, 36);
        return (
          <g transform={`translate(${a.x}, ${a.y})`}>
            <rect x="0" y="0" width="24" height="40" fill="#0e1820"/>
            {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="2" y={2 + i * 6} width="20" height="2" fill={i % 2 ? "#6fd5e0" : "#94e2c0"} opacity={lit}/>)}
            <rect x="14" y="2" width="3" height="36" fill="rgba(0,0,0,.3)"/>
            <text x="12" y="-2" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3" fill="#fffaee" opacity=".6">H100</text>
          </g>
        );
      })()}

      {/* Grand arched entrance */}
      {(() => {
        const a = window.iso(-22, 50, 16);
        const b = window.iso(22, 50, 16);
        const top = window.iso(0, 50, 96);
        return (
          <g>
            {/* Stone surround */}
            <path d={`M${a.x - 6} ${a.y + 4} L${a.x - 6} ${a.y - 80} Q${a.x - 6} ${top.y - 4} ${top.x} ${top.y - 6} Q${b.x + 6} ${top.y - 4} ${b.x + 6} ${b.y - 80} L${b.x + 6} ${b.y + 4} Z`} fill="#857a5a"/>
            <path d={`M${a.x} ${a.y} L${a.x} ${a.y - 60} Q${a.x} ${top.y} ${top.x} ${top.y} Q${b.x} ${top.y} ${b.x} ${b.y - 60} L${b.x} ${b.y} Z`} fill="#3a2410"/>
            <path d={`M${a.x + 1} ${a.y - 1} L${a.x + 1} ${a.y - 58} Q${a.x + 1} ${top.y + 2} ${top.x} ${top.y + 2} Q${b.x - 1} ${top.y + 2} ${b.x - 1} ${b.y - 58} L${b.x - 1} ${b.y - 1} Z`} fill="#f5d97a" opacity={lit * .8}/>
            {/* Keystone */}
            <circle cx={top.x} cy={top.y - 4} r="4" fill="#d4c178" stroke="#1a1410" strokeWidth=".5"/>
            {/* Steps */}
            <window.IsoBox x={-26} y={50} z={0} w={52} d={6} h={6}
              front="#9a907a" right="#7a7064" top="#857a5a" stroke="#5a4a3e"/>
            <window.IsoBox x={-30} y={56} z={-6} w={60} d={6} h={6}
              front="#9a907a" right="#7a7064" top="#857a5a" stroke="#5a4a3e"/>
          </g>
        );
      })()}

      {/* Brass plaques */}
      {(() => {
        const c1 = window.iso(-80, 50, 30);
        const c2 = window.iso(80, 50, 30);
        return (
          <g>
            <rect x={c1.x - 9} y={c1.y - 5} width="18" height="10" fill="#d4c178" stroke="#1a1410" strokeWidth=".4"/>
            <text x={c1.x} y={c1.y + 1} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4.5" fontWeight="700" fill="#1a1410">FAISS</text>
            <rect x={c2.x - 9} y={c2.y - 5} width="18" height="10" fill="#d4c178" stroke="#1a1410" strokeWidth=".4"/>
            <text x={c2.x} y={c2.y + 1} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4.5" fontWeight="700" fill="#1a1410">PACE</text>
          </g>
        );
      })()}
    </g>
  );
}

function ArchiveDome({ tod }) {
  const lit = tod === 'night' ? 1 : .85;
  const c = window.iso(0, -20, 120);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="0" rx="100" ry="30" fill="#7a7064"/>
      <path d="M-100 0 Q0 -90 100 0 Z" fill="#9a907a"/>
      <path d="M-100 0 Q0 -90 100 0" fill="none" stroke="#5a4a3e" strokeWidth="1"/>
      {/* Ribs */}
      {[-60, -30, 30, 60].map(rx => <path key={rx} d={`M${rx} 0 Q${rx * .5} -86 0 -84`} stroke="#5a4a3e" strokeWidth=".6" fill="none"/>)}
      {/* Top lantern */}
      <rect x="-12" y="-100" width="24" height="14" fill="#7a7064" stroke="#3a2410" strokeWidth=".5"/>
      <rect x="-10" y="-98" width="20" height="10" fill="#f5d97a" opacity={lit}/>
      <path d="M-14 -100 Q0 -114 14 -100 Z" fill="#5a4a3e"/>
      <line x1="0" y1="-114" x2="0" y2="-126" stroke="#1a1410" strokeWidth="1.4"/>
      <circle cx="0" cy="-126" r="3" fill="#d4c178"/>
      {/* Glow */}
      <ellipse cx="0" cy="-92" rx="50" ry="14" fill="#f5d97a" opacity={lit * .35}/>
    </g>
  );
}

function ArchiveArchedWindow({ worldX, y, baseZ, h, w, lit }) {
  const a = window.iso(worldX - w / 2, y, baseZ);
  const b = window.iso(worldX + w / 2, y, baseZ);
  const top = window.iso(worldX, y, baseZ + h);
  return (
    <g>
      <path d={`M${a.x - 2} ${a.y + 2} L${a.x - 2} ${a.y - h * .8} Q${a.x - 2} ${top.y - 4} ${top.x} ${top.y - 6} Q${b.x + 2} ${top.y - 4} ${b.x + 2} ${b.y - h * .8} L${b.x + 2} ${b.y + 2} Z`} fill="#9a907a"/>
      <path d={`M${a.x} ${a.y} L${a.x} ${a.y - h * .75} Q${a.x} ${top.y} ${top.x} ${top.y} Q${b.x} ${top.y} ${b.x} ${b.y - h * .75} L${b.x} ${b.y} Z`} fill="#0e1820"/>
      <path d={`M${a.x + 1} ${a.y - 1} L${a.x + 1} ${a.y - h * .75 + 1} Q${a.x + 1} ${top.y + 2} ${top.x} ${top.y + 2} Q${b.x - 1} ${top.y + 2} ${b.x - 1} ${b.y - h * .75 + 1} L${b.x - 1} ${b.y - 1} Z`} fill="#94e2c0" opacity={lit * .55}/>
      {/* Latticework */}
      <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={top.x} y2={top.y + 6} stroke="#1a1410" strokeWidth=".5"/>
    </g>
  );
}

function Firefly({ x, y, z, color }) {
  const c = window.iso(x, y, z);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <circle r="14" fill={color} opacity=".2"/>
      <circle r="3" fill={color}/>
      {/* Quote tag tail */}
      <path d={`M3 0 L18 -2 L20 4 L3 6 Z`} fill="rgba(15,15,12,.85)" stroke={color} strokeWidth=".5"/>
      <text x="11" y="3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3" fill="#fffaee">"…"</text>
    </g>
  );
}

// ─── SCENE 8: ZEN GARDEN ────────────────────────────────────────────────

function SceneZen({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="08 · project" label="Zen Garden" sub="Soothe · AI mental health">
      <window.IsoPath pts={[[180, 200], [60, 100]]} width={36}/>
      <window.IsoTree x={-240} y={-60} variant={2} scale={1.2} tod={tod}/>
      <window.IsoTree x={230} y={170} variant={0} scale={1.1} tod={tod}/>
      {/* Sand bed — pale rhombus */}
      {(() => {
        const pts = [
          [-160, -100, 0], [160, -100, 0], [160, 100, 0], [-160, 100, 0],
        ];
        return (
          <g>
            <polygon points={window.poly(pts)} fill="#f4e7c4"/>
            {/* Raked rings */}
            {[140, 110, 80, 50].map((r, i) => {
              const ptsRing = [];
              for (let a = 0; a < 360; a += 30) {
                const rad = a * Math.PI / 180;
                ptsRing.push([Math.cos(rad) * r, Math.sin(rad) * r * .65, 0]);
              }
              return <polygon key={i} points={window.poly(ptsRing)} fill="none" stroke="#c8b585" strokeWidth=".8"/>;
            })}
          </g>
        );
      })()}
      {/* Cherry tree — dominant focal */}
      <CherryTree worldX={-90} worldY={-40} tod={tod}/>
      {/* Koi pond */}
      <KoiPond worldX={70} worldY={-30}/>
      {/* Stone bench with journal */}
      <ZenBenchJournal worldX={-30} worldY={70} tod={tod}/>
      {/* Stone lantern */}
      <StoneLantern worldX={120} worldY={70} lit={tod === 'night' ? 1 : .55}/>
      {/* Big focal stones */}
      <FocalStone worldX={40} worldY={70}/>
      <FocalStone worldX={-130} worldY={50} scale={1.2}/>
      {/* Avatar quietly observing the journal */}
      <AvatarAtWorld x={20} y={130} facing="north" size={56}/>
      {/* Falling petals */}
      {[[-40, 60, 80], [20, 40, 60], [-100, 100, 40], [-60, 120, 30], [80, 80, 70]].map(([px, py, pz], i) => {
        const p = window.iso(px, py, pz);
        return <circle key={i} cx={p.x} cy={p.y} r={1.4} fill="#f5b6da" opacity=".9"/>;
      })}
      <ScaleAnnotation worldX={180} worldY={-80} text="koi · cherry · journal" color="#f5b6da"/>
    </window.IsoScene>
  );
}

function CherryTree({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="6" cy="6" rx="38" ry="9" fill="rgba(0,0,0,.35)"/>
      <rect x="-6" y="-90" width="12" height="96" fill="#3a2410"/>
      {/* Trunk shading */}
      <rect x="0" y="-90" width="6" height="96" fill="rgba(0,0,0,.3)"/>
      {/* Branches */}
      <path d="M0 -60 Q-30 -80 -50 -100" stroke="#3a2410" strokeWidth="5" fill="none"/>
      <path d="M0 -60 Q30 -88 50 -110" stroke="#3a2410" strokeWidth="5" fill="none"/>
      <path d="M0 -78 Q-20 -100 -22 -120" stroke="#3a2410" strokeWidth="4" fill="none"/>
      {/* Canopy — fluffy pink */}
      <ellipse cx="-30" cy="-104" rx="32" ry="28" fill="#e07ec3"/>
      <ellipse cx="30" cy="-114" rx="36" ry="32" fill="#f0a5d3"/>
      <ellipse cx="0" cy="-128" rx="32" ry="28" fill="#f5b6da"/>
      <ellipse cx="20" cy="-94" rx="22" ry="18" fill="#fffaee" opacity=".55"/>
      <ellipse cx="-14" cy="-122" rx="16" ry="14" fill="#fffaee" opacity=".45"/>
    </g>
  );
}

function KoiPond({ worldX, worldY }) {
  // Pond depicted as a flat ellipse on the ground.
  const pts = [];
  for (let a = 0; a < 360; a += 20) {
    const rad = a * Math.PI / 180;
    pts.push([worldX + Math.cos(rad) * 60, worldY + Math.sin(rad) * 38, 0]);
  }
  const inner = pts.map(p => [worldX + (p[0] - worldX) * .9, worldY + (p[1] - worldY) * .9, 0]);
  return (
    <g>
      <polygon points={window.poly(pts)} fill="#857a5a"/>
      <polygon points={window.poly(inner)} fill="#3a6470"/>
      <polygon points={window.poly(inner.map(p => [p[0], p[1], 0]))} fill="#6db9c4" opacity=".9"/>
      {/* Koi shapes */}
      {(() => {
        const c1 = window.iso(worldX - 20, worldY - 10, 0);
        const c2 = window.iso(worldX + 20, worldY + 10, 0);
        return (
          <g>
            <g transform={`translate(${c1.x}, ${c1.y})`}>
              <path d="M-14 0 Q-6 -6 4 -2 Q8 2 4 5 Q-6 8 -14 4 Z" fill="#e07ec3"/>
              <path d="M-14 0 L-22 -4 L-20 4 Z" fill="#e07ec3"/>
              <circle cx="-2" cy="-1" r="1" fill="#1a1410"/>
            </g>
            <g transform={`translate(${c2.x}, ${c2.y})`}>
              <path d="M-12 0 Q-4 -6 6 -2 Q10 2 6 5 Q-4 8 -12 4 Z" fill="#f5d97a"/>
              <path d="M-12 0 L-20 -4 L-18 4 Z" fill="#f5d97a"/>
              <circle cx="0" cy="-1" r="1" fill="#1a1410"/>
            </g>
            {/* Ripples */}
            <ellipse cx={c1.x + 6} cy={c1.y - 3} rx="14" ry="3" fill="none" stroke="#fffaee" strokeWidth=".4" opacity=".55"/>
            <ellipse cx={c2.x - 6} cy={c2.y - 3} rx="14" ry="3" fill="none" stroke="#fffaee" strokeWidth=".4" opacity=".55"/>
          </g>
        );
      })()}
      {/* Lily pad */}
      {(() => {
        const p = window.iso(worldX - 30, worldY + 18, 0);
        return (
          <g transform={`translate(${p.x}, ${p.y})`}>
            <ellipse cx="0" cy="0" rx="8" ry="4" fill="#3e6a3c"/>
            <ellipse cx="0" cy="0" rx="8" ry="4" fill="#5a9558" opacity=".7"/>
            <ellipse cx="-2" cy="-1" rx="6" ry="3" fill="#7eb86a" opacity=".5"/>
          </g>
        );
      })()}
    </g>
  );
}

function ZenBenchJournal({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="6" rx="34" ry="5" fill="rgba(0,0,0,.3)"/>
      <window.IsoBox x={worldX - 24 - worldX} y={worldY - 6 - worldY} z={0} w={48} d={12} h={10}
        front="#857a5a" right="#5a5048" top="#9a907a" stroke="#3a2a1e"/>
      {/* Journal on top */}
      {(() => {
        const ja = window.iso(-8, -2, 12);
        const jb = window.iso(8, -2, 12);
        const jc = window.iso(8, 2, 12);
        const jd = window.iso(-8, 2, 12);
        return (
          <g>
            <polygon points={`${ja.x},${ja.y} ${jb.x},${jb.y} ${jc.x},${jc.y} ${jd.x},${jd.y}`} fill="#f6f1e4" stroke="#1a1410" strokeWidth=".4"/>
            <line x1={(ja.x + jb.x) / 2} y1={(ja.y + jb.y) / 2} x2={(jc.x + jd.x) / 2} y2={(jc.y + jd.y) / 2} stroke="#5a4a3e" strokeWidth=".4"/>
            {/* Hand-written lines */}
            <line x1={ja.x + 2} y1={ja.y + 1} x2={(ja.x + jb.x) / 2 - 1} y2={(ja.y + jb.y) / 2} stroke="#1a1410" strokeWidth=".3"/>
            <line x1={(ja.x + jb.x) / 2 + 1} y1={(ja.y + jb.y) / 2} x2={jb.x - 1} y2={jb.y - 1} stroke="#1a1410" strokeWidth=".3"/>
            {/* Glow */}
            <ellipse cx={(ja.x + jc.x) / 2} cy={(ja.y + jc.y) / 2} rx="22" ry="12" fill="#f5d97a" opacity=".55"/>
            <ellipse cx={(ja.x + jc.x) / 2} cy={(ja.y + jc.y) / 2} rx="14" ry="6" fill="#fff1c8" opacity=".5"/>
          </g>
        );
      })()}
    </g>
  );
}

function StoneLantern({ worldX, worldY, lit }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="4" rx="10" ry="3" fill="rgba(0,0,0,.3)"/>
      <rect x="-4" y="-12" width="8" height="14" fill="#857a5a"/>
      <rect x="-6" y="-16" width="12" height="4" fill="#7a7064"/>
      <rect x="-8" y="-26" width="16" height="10" fill="#857a5a"/>
      <rect x="-6" y="-24" width="12" height="6" fill="#f5d97a" opacity={lit}/>
      <path d="M-10 -26 L10 -26 L8 -32 L-8 -32 Z" fill="#5a5048"/>
      <path d="M-4 -32 L0 -38 L4 -32 Z" fill="#5a5048"/>
      <circle cx="0" cy="-22" r="18" fill="#f5d97a" opacity={lit * .22}/>
    </g>
  );
}

function FocalStone({ worldX, worldY, scale = 1 }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y}) scale(${scale})`}>
      <ellipse cx="0" cy="2" rx="22" ry="6" fill="rgba(0,0,0,.35)"/>
      <ellipse cx="0" cy="-4" rx="20" ry="10" fill="#5a5048"/>
      <ellipse cx="-3" cy="-7" rx="18" ry="9" fill="#7a7064"/>
      <ellipse cx="-5" cy="-10" rx="14" ry="7" fill="#857a5a"/>
      <ellipse cx="-3" cy="-12" rx="8" ry="3" fill="#a89878" opacity=".7"/>
    </g>
  );
}

// ─── SCENE 9: QARD GREENHOUSE ───────────────────────────────────────────

function SceneQard({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="09 · project" label="The Qard Greenhouse" sub="Fintech frontend · Three.js · 200+ users">
      <window.IsoPath pts={[[80, 220], [80, 50]]} width={42}/>
      <window.IsoTree x={-240} y={-80} variant={0} scale={1.2} tod={tod}/>
      <window.IsoTree x={230} y={150} variant={2} scale={1.2} tod={tod}/>

      <QardDome tod={tod}/>

      <AvatarAtWorld x={80} y={170} facing="north" size={64}/>
      <ScaleAnnotation worldX={-200} worldY={120} text="geodesic · 18 m clear" color="#94e2c0"/>
    </window.IsoScene>
  );
}

function QardDome({ tod }) {
  const lit = tod === 'night' ? 1 : .8;
  return (
    <g>
      {/* Concrete base ring */}
      <window.IsoBox x={-120} y={-100} z={0} w={240} d={160} h={14}
        front="#dcd3bf" right="#bcb29a" top="#fffaee" stroke="#857a5a"/>
      {/* Dome — front-half of a sphere, faceted */}
      <g>
        <ellipse cx={window.iso(0, -20, 0).x} cy={window.iso(0, -20, 0).y - 10} rx="220" ry="40" fill="rgba(60,90,80,.4)"/>
        <path d={(() => {
          const pts = [];
          for (let a = 0; a <= 180; a += 10) {
            const rad = (a) * Math.PI / 180;
            const wx = Math.cos(rad) * 120, wz = Math.sin(rad) * 1; // ring at top
            // bottom edge ellipse
            const bx = Math.cos(rad) * 120, by = Math.sin(rad) * 80;
            const p = window.iso(bx, by - 20, 14);
            pts.push(`${p.x},${p.y}`);
          }
          return `M${pts[0]} ` + pts.slice(1).map(p => `L${p}`).join(' ') + ' Z';
        })()} fill="#9ed6dd"/>
        {/* Top apex */}
        {(() => {
          const apex = window.iso(0, -20, 180);
          return (
            <g>
              <path d={(() => {
                const pts = [];
                for (let a = 0; a <= 180; a += 10) {
                  const rad = (a) * Math.PI / 180;
                  const bx = Math.cos(rad) * 120, by = Math.sin(rad) * 80;
                  const p = window.iso(bx, by - 20, 14);
                  pts.push(`L${p.x} ${p.y}`);
                }
                return `M${apex.x} ${apex.y} ` + pts.join(' ') + ' Z';
              })()} fill="url(#elev-glass-mint)" opacity=".75"/>
              {/* Triangulation ribs */}
              {(() => {
                const ribs = [];
                for (let a = 0; a <= 180; a += 20) {
                  const rad = (a) * Math.PI / 180;
                  const bx = Math.cos(rad) * 120, by = Math.sin(rad) * 80;
                  const p = window.iso(bx, by - 20, 14);
                  ribs.push(<line key={a} x1={apex.x} y1={apex.y} x2={p.x} y2={p.y} stroke="#fffaee" strokeWidth=".7" opacity=".85"/>);
                }
                return ribs;
              })()}
              {/* Latitude rings */}
              {[45, 90, 135].map(altA => {
                const rad = altA * Math.PI / 180;
                const r = Math.sin(rad);
                const z = 14 + Math.cos(rad) * 0 + (180 - 14) * Math.cos(0); // approximate
                // simpler: draw a flat ellipse at proportional Z
                const zAlt = 14 + (180 - 14) * (1 - r);
                const pts = [];
                for (let a = 0; a <= 180; a += 10) {
                  const radA = a * Math.PI / 180;
                  const bx = Math.cos(radA) * 120 * r, by = Math.sin(radA) * 80 * r;
                  const p = window.iso(bx, by - 20, zAlt);
                  pts.push(`${p.x},${p.y}`);
                }
                return <path key={altA} d={'M' + pts.join(' L')} stroke="#fffaee" strokeWidth=".7" fill="none" opacity=".7"/>;
              })}
            </g>
          );
        })()}
      </g>

      {/* Inside: floating card-flowers */}
      <CardFlowerIso x={-50} y={-20} z={80} color="#e07ec3"/>
      <CardFlowerIso x={20} y={-20} z={130} color="#6fd5e0"/>
      <CardFlowerIso x={60} y={-50} z={70} color="#f5d97a"/>
      <CardFlowerIso x={-30} y={0} z={60} color="#94e2c0"/>
      <CardFlowerIso x={40} y={10} z={100} color="#e07ec3"/>

      {/* Door at front center */}
      {(() => {
        const a = window.iso(-16, 60, 14);
        const b = window.iso(16, 60, 14);
        const c = window.iso(16, 60, 60);
        const d = window.iso(-16, 60, 60);
        return (
          <g>
            <polygon points={`${a.x - 4},${a.y + 2} ${b.x + 4},${b.y + 2} ${c.x + 4},${c.y} ${d.x - 4},${d.y}`} fill="#9ed6dd"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .55}/>
            <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#fffaee" strokeWidth=".5"/>
          </g>
        );
      })()}

      {/* qard.dev neon sign */}
      {(() => {
        const c = window.iso(-90, 60, 24);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <rect x="-30" y="-12" width="60" height="22" rx="3" fill="#0e1820" stroke="#94e2c0" strokeWidth="1"/>
            <text x="0" y="3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fontWeight="900" fill="#94e2c0">qard.dev</text>
            {tod !== 'golden' ? <rect x="-30" y="-12" width="60" height="22" rx="3" fill="#94e2c0" opacity=".15"/> : null}
          </g>
        );
      })()}
    </g>
  );
}

function CardFlowerIso({ x, y, z, color }) {
  const stemBase = window.iso(x, y, 0);
  const head = window.iso(x, y, z);
  return (
    <g>
      <path d={`M${stemBase.x} ${stemBase.y} Q${stemBase.x + 4} ${(stemBase.y + head.y) / 2} ${head.x} ${head.y}`} stroke="#3e6a3c" strokeWidth="1.5" fill="none"/>
      {/* leaf */}
      <ellipse cx={(stemBase.x + head.x) / 2} cy={(stemBase.y + head.y) / 2} rx="4" ry="1.5" fill="#5a9558" transform={`rotate(20 ${(stemBase.x + head.x) / 2} ${(stemBase.y + head.y) / 2})`}/>
      {/* Card head */}
      <g transform={`translate(${head.x}, ${head.y})`}>
        <rect x="-18" y="-12" width="36" height="24" rx="2.5" fill="#1a1410"/>
        <rect x="-17" y="-11" width="34" height="22" rx="2" fill={color}/>
        <rect x="-15" y="-8" width="30" height="4" fill="#1a1410" opacity=".35"/>
        <rect x="-15" y="0" width="14" height="2" fill="#fffaee" opacity=".75"/>
        <rect x="-15" y="4" width="20" height="1.5" fill="#fffaee" opacity=".55"/>
        <circle cx="12" cy="6" r="3" fill="#fffaee" opacity=".7"/>
        <text x="-15" y="-3" fontFamily="JetBrains Mono,monospace" fontSize="3" fontWeight="700" fill="#fffaee">•• •• 1234</text>
      </g>
    </g>
  );
}

// ─── SCENE 10: LIGHTHOUSE ───────────────────────────────────────────────

function SceneLighthouse({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="10 · contact" label="The Lighthouse" sub="find me here · beam sweeps the clouds below">
      {/* Special clouds below the cliff */}
      {(() => {
        return (
          <g>
            <ellipse cx="-200" cy="160" rx="200" ry="22" fill="#fffaee" opacity=".7"/>
            <ellipse cx="120" cy="180" rx="240" ry="26" fill="#fffaee" opacity=".75"/>
            <ellipse cx="-380" cy="190" rx="160" ry="18" fill="#fffaee" opacity=".65"/>
            <ellipse cx="380" cy="150" rx="160" ry="16" fill="#fffaee" opacity=".6"/>
          </g>
        );
      })()}
      {/* Rocky cliff */}
      <RockyCliff/>

      <window.IsoTree x={-180} y={150} variant={0} scale={1} tod={tod}/>
      <window.IsoBush x={-130} y={130} scale={1.2}/>

      <LighthouseBuilding tod={tod}/>

      {/* Mailbox + terminal at base */}
      <Mailbox worldX={-90} worldY={50}/>
      <TerminalKiosk worldX={90} worldY={50} tod={tod}/>

      <AvatarAtWorld x={-30} y={110} facing="north" size={62}/>
      <ScaleAnnotation worldX={140} worldY={130} text="32 m · cliff's edge" color="#f5d97a"/>
    </window.IsoScene>
  );
}

function RockyCliff() {
  return (
    <g>
      {/* Rough rocky ground around base */}
      <ellipse cx="0" cy={window.iso(0, 0, 0).y + 18} rx="240" ry="50" fill="#7a7064"/>
      <ellipse cx="-40" cy={window.iso(0, 0, 0).y + 14} rx="100" ry="32" fill="#5a5048"/>
      <ellipse cx="80" cy={window.iso(0, 0, 0).y + 18} rx="80" ry="24" fill="#857a5a"/>
      {/* Smaller rock clusters */}
      <ellipse cx="-180" cy="80" rx="22" ry="10" fill="#5a5048"/>
      <ellipse cx="-180" cy="78" rx="22" ry="10" fill="#7a7064"/>
      <ellipse cx="180" cy="100" rx="18" ry="8" fill="#5a5048"/>
      <ellipse cx="180" cy="98" rx="18" ry="8" fill="#7a7064"/>
    </g>
  );
}

function LighthouseBuilding({ tod }) {
  const lit = tod === 'night' ? 1 : .9;
  const beam = tod === 'night' ? .65 : tod === 'dusk' ? .45 : .25;
  return (
    <g>
      {/* Tower — tapered cylinder approximated by stepped boxes (white) */}
      {[
        { z0: 0, hw: 28, h: 60 },
        { z0: 60, hw: 26, h: 80 },
        { z0: 140, hw: 24, h: 80 },
        { z0: 220, hw: 22, h: 60 },
      ].map((t, i) => (
        <window.IsoBox key={i} x={-t.hw} y={-t.hw} z={t.z0} w={t.hw * 2} d={t.hw * 2} h={t.h}
          front="#fffaee" right="#c8bea5" top="#dcd3bf" stroke="#5a4a3e" sw=".5"/>
      ))}
      {/* Red stripes */}
      {[40, 110, 180, 240].map(z => {
        const a = window.iso(-30, 28, z), b = window.iso(28, 28, z);
        return <line key={z} x1={a.x} y1={a.y - 5} x2={b.x} y2={b.y - 5} stroke="#a8553c" strokeWidth="10"/>;
      })}
      {/* Porthole windows */}
      {[60, 130, 200].map(z => {
        const p = window.iso(0, 28, z);
        return <g key={z}>
          <circle cx={p.x} cy={p.y - 5} r="6" fill="#0e1820" stroke="#1a1410" strokeWidth="1"/>
          <circle cx={p.x} cy={p.y - 5} r="5" fill="#f5d97a" opacity={lit * .85}/>
        </g>;
      })}

      {/* Platform on top */}
      <window.IsoBox x={-26} y={-26} z={280} w={52} d={52} h={8}
        front="#5a4a3e" right="#3a2a1e" top="#1a1410"/>
      <window.IsoBox x={-22} y={-22} z={288} w={44} d={44} h={6}
        front="#3a2410" right="#262017" top="#1a1410"/>
      {/* Railing */}
      {[-22, 22].map(x => {
        const a = window.iso(x, -22, 288), b = window.iso(x, 22, 288);
        const c = window.iso(x, -22, 296), d = window.iso(x, 22, 296);
        return <g key={x}>
          <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="#3a2410" strokeWidth=".6"/>
        </g>;
      })}

      {/* Light room (glass box) */}
      <window.IsoBox x={-18} y={-18} z={296} w={36} d={36} h={32}
        front="rgba(255,241,200,.92)" right="rgba(212,193,120,.85)" top="rgba(255,250,238,.95)" stroke="#1a1410"/>
      <window.IsoBox x={-18} y={-18} z={296} w={36} d={36} h={32}
        front="#fff1c8" right="rgba(212,193,120,.7)" top="rgba(255,250,238,.4)" stroke="rgba(255,250,238,.2)" sw="0"/>
      {/* Glow halo */}
      {(() => {
        const c = window.iso(0, 0, 312);
        return <ellipse cx={c.x} cy={c.y} rx="100" ry="30" fill="#fff1c8" opacity={lit * .6} style={{ mixBlendMode: 'screen' }}/>;
      })()}
      {/* Dome cap */}
      {(() => {
        const aLeft = window.iso(-20, 18, 328);
        const aRight = window.iso(20, -18, 328);
        const apex = window.iso(0, 0, 352);
        const aR2 = window.iso(20, 18, 328);
        const aL2 = window.iso(-20, -18, 328);
        return (
          <g>
            <polygon points={`${aLeft.x},${aLeft.y} ${aR2.x},${aR2.y} ${apex.x},${apex.y}`} fill="#5a4a3e"/>
            <polygon points={`${aR2.x},${aR2.y} ${aRight.x},${aRight.y} ${apex.x},${apex.y}`} fill="#3a2a1e"/>
            <polygon points={`${aRight.x},${aRight.y} ${aL2.x},${aL2.y} ${apex.x},${apex.y}`} fill="#5a4a3e"/>
            <polygon points={`${aL2.x},${aL2.y} ${aLeft.x},${aLeft.y} ${apex.x},${apex.y}`} fill="#3a2a1e"/>
            <line x1={apex.x} y1={apex.y} x2={apex.x} y2={apex.y - 14} stroke="#1a1410" strokeWidth="2"/>
            <path d={`M${apex.x - 5} ${apex.y - 12} L${apex.x} ${apex.y - 18} L${apex.x + 5} ${apex.y - 12} L${apex.x + 2} ${apex.y - 12} L${apex.x + 2} ${apex.y - 8} L${apex.x - 2} ${apex.y - 8} L${apex.x - 2} ${apex.y - 12} Z`} fill="#a8553c"/>
          </g>
        );
      })()}

      {/* The BEAM — projected toward right */}
      {(() => {
        const src = window.iso(0, 0, 312);
        return (
          <g>
            <path d={`M${src.x} ${src.y} L${src.x + 380} ${src.y - 40} L${src.x + 380} ${src.y + 40} Z`} fill="#f5d97a" opacity={beam}/>
            <path d={`M${src.x} ${src.y} L${src.x + 260} ${src.y - 22} L${src.x + 260} ${src.y + 22} Z`} fill="#fff1c8" opacity={beam * .85}/>
            {/* Also slight backward beam */}
            <path d={`M${src.x} ${src.y} L${src.x - 260} ${src.y - 14} L${src.x - 260} ${src.y + 14} Z`} fill="#f5d97a" opacity={beam * .45}/>
          </g>
        );
      })()}
    </g>
  );
}

function Mailbox({ worldX, worldY }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="2" rx="8" ry="3" fill="rgba(0,0,0,.3)"/>
      <rect x="-1.5" y="-26" width="3" height="28" fill="#3a2410"/>
      <rect x="-12" y="-38" width="24" height="14" fill="#a8553c" stroke="#1a1410" strokeWidth=".6"/>
      <path d="M-12 -38 L12 -38 L12 -36 L-12 -36 Z" fill="#d8362a"/>
      <circle cx="9" cy="-31" r="1.5" fill="#fffaee"/>
      <rect x="-11" y="-34" width="22" height="2" fill="#fffaee" opacity=".55"/>
      <text x="0" y="-29" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5" fontWeight="700" fill="#fffaee">MAIL</text>
      {/* Flag */}
      <rect x="11" y="-44" width="6" height="6" fill="#d4c178"/>
      <line x1="11" y1="-44" x2="11" y2="-32" stroke="#1a1410" strokeWidth=".8"/>
    </g>
  );
}

function TerminalKiosk({ worldX, worldY, tod }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="2" rx="10" ry="3" fill="rgba(0,0,0,.35)"/>
      <rect x="-2" y="-28" width="4" height="30" fill="#1a1410"/>
      <rect x="-16" y="-50" width="32" height="22" fill="#0e1820" stroke="#1a1410" strokeWidth=".5"/>
      <rect x="-14" y="-48" width="28" height="18" fill="#6fd5e0" opacity={tod === 'night' ? 1 : .9}/>
      <text x="0" y="-42" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fill="#0e1820">parthivFarazi</text>
      <text x="0" y="-37" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fill="#0e1820">$ contact --me</text>
      <text x="0" y="-32" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3" fill="#0e1820">→ updt.pro</text>
    </g>
  );
}

// ─── SCENE 11: ROBOT'S WORKSHOP ─────────────────────────────────────────

function SceneWorkshop({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="11 · project" label="The Robot's Workshop" sub="Litter robot · where it started · 2021">
      <window.IsoPath pts={[[80, 220], [60, 80]]} width={36}/>
      <window.IsoTree x={-220} y={-50} variant={1} scale={1.2} tod={tod}/>
      <window.IsoTree x={230} y={170} variant={0} scale={1.1} tod={tod}/>
      <window.IsoBush x={-150} y={130} scale={.9}/>

      <WorkshopShed tod={tod}/>

      {/* The litter robot on the lawn */}
      <LitterRobot worldX={-70} worldY={120}/>
      {/* Trail of "leaves" picked up */}
      <FallenLeaf x={-110} y={140}/>
      <FallenLeaf x={-130} y={150} color="#d4b94a"/>
      <FallenLeaf x={-90} y={150} color="#a8553c"/>

      <AvatarAtWorld x={70} y={170} facing="north" size={64}/>
      <ScaleAnnotation worldX={-180} worldY={-80} text="solar-powered · KL · 2021" color="#d4c178"/>
    </window.IsoScene>
  );
}

function WorkshopShed({ tod }) {
  const lit = tod === 'night' ? 1 : .75;
  return (
    <g>
      {/* Foundation */}
      <window.IsoBox x={-70} y={-70} z={0} w={140} d={120} h={10}
        front="#5a4a30" right="#3a2a1e" top="#857a5a" stroke="#1a1410"/>
      {/* Wood plank body */}
      <window.IsoBox x={-66} y={-66} z={10} w={132} d={112} h={70}
        front="#7a5234" right="#3a2410" top="#5a3a18" stroke="#1a1410"/>
      {/* Plank lines on front */}
      {Array.from({ length: 10 }).map((_, k) => {
        const x = -66 + k * 13;
        const a = window.iso(x, 46, 10), b = window.iso(x, 46, 80);
        return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1a1410" strokeWidth=".5" opacity=".75"/>;
      })}
      {/* Pitched corrugated metal roof */}
      <window.IsoGabledRoof x={-66} y={-66} z={80} w={132} d={112} riseH={50} eaveOverhang={6}
        faceLight="#3a4652" faceDark="#1a1410" stroke="#0e1418" sw=".5"/>
      {/* Solar panel on roof — angled */}
      {(() => {
        const a = window.iso(-30, 30, 102);
        const b = window.iso(30, 30, 102);
        const c = window.iso(30, -30, 130);
        const d = window.iso(-30, -30, 130);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820" stroke="#1a1410" strokeWidth=".5"/>
            <polygon points={`${a.x + 2},${a.y - 1} ${b.x - 2},${b.y - 1} ${c.x - 2},${c.y + 1} ${d.x + 2},${d.y + 1}`} fill="#3a5a78"/>
            {/* Cell grid */}
            {Array.from({ length: 5 }).map((_, k) => {
              const t = (k + 1) / 6;
              const aA = window.iso(-30 + 60 * t, 30, 102);
              const aB = window.iso(-30 + 60 * t, -30, 130);
              return <line key={k} x1={aA.x} y1={aA.y} x2={aB.x} y2={aB.y} stroke="#0e1820" strokeWidth=".4"/>;
            })}
          </g>
        );
      })()}

      {/* Open door on front face, glowing */}
      {(() => {
        const a = window.iso(-16, 46, 14);
        const b = window.iso(16, 46, 14);
        const c = window.iso(16, 46, 70);
        const d = window.iso(-16, 46, 70);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .85}/>
            {/* Inside: workbench glimpse */}
            <rect x={(a.x + b.x) / 2 - 14} y={(a.y + b.y) / 2 - 4} width="28" height="3" fill="#5a3a18"/>
            {/* CAD sketch pinned */}
            <rect x={d.x + 4} y={d.y + 6} width="10" height="14" fill="#fffaee"/>
            <line x1={d.x + 6} y1={d.y + 10} x2={d.x + 12} y2={d.y + 10} stroke="#0e1820" strokeWidth=".4"/>
            <line x1={d.x + 6} y1={d.y + 14} x2={d.x + 12} y2={d.y + 14} stroke="#0e1820" strokeWidth=".4"/>
            <circle cx={d.x + 9} cy={d.y + 12} r="2" fill="none" stroke="#0e1820" strokeWidth=".4"/>
          </g>
        );
      })()}

      {/* Window left of door */}
      {(() => {
        const a = window.iso(-50, 46, 32);
        const b = window.iso(-26, 46, 32);
        const c = window.iso(-26, 46, 60);
        const d = window.iso(-50, 46, 60);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#fffaee" stroke="#3a2410" strokeWidth=".7"/>
            <polygon points={`${a.x + 1},${a.y} ${b.x - 1},${b.y} ${c.x - 1},${c.y} ${d.x + 1},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x + 1},${a.y} ${b.x - 1},${b.y} ${c.x - 1},${c.y} ${d.x + 1},${d.y}`} fill="#f5d97a" opacity={lit * .85}/>
            <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#3a2410" strokeWidth=".4"/>
          </g>
        );
      })()}
      {/* Window right of door */}
      {(() => {
        const a = window.iso(26, 46, 32);
        const b = window.iso(50, 46, 32);
        const c = window.iso(50, 46, 60);
        const d = window.iso(26, 46, 60);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#fffaee" stroke="#3a2410" strokeWidth=".7"/>
            <polygon points={`${a.x + 1},${a.y} ${b.x - 1},${b.y} ${c.x - 1},${c.y} ${d.x + 1},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x + 1},${a.y} ${b.x - 1},${b.y} ${c.x - 1},${c.y} ${d.x + 1},${d.y}`} fill="#f5d97a" opacity={lit * .85}/>
          </g>
        );
      })()}
      {/* Hand-painted sign over door */}
      {(() => {
        const c = window.iso(0, 46, 78);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <rect x="-40" y="-8" width="80" height="14" fill="#3a2410" stroke="#1a1410" strokeWidth=".7"/>
            <text x="0" y="2" textAnchor="middle" fontFamily="Caveat,cursive" fontSize="13" fontWeight="700" fill="#f5d97a">where it started</text>
          </g>
        );
      })()}
    </g>
  );
}

function LitterRobot({ worldX, worldY }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="2" rx="20" ry="5" fill="rgba(0,0,0,.45)"/>
      {/* Body */}
      <rect x="-16" y="-18" width="32" height="20" fill="#c8bb95" stroke="#1a1410" strokeWidth=".7"/>
      <rect x="-16" y="-18" width="32" height="4" fill="#a89878"/>
      {/* Solar panel */}
      <rect x="-14" y="-26" width="28" height="8" fill="#0e1820"/>
      <rect x="-12" y="-24" width="24" height="4" fill="#3a5a78"/>
      {/* Antenna */}
      <line x1="0" y1="-26" x2="0" y2="-36" stroke="#1a1410" strokeWidth="1"/>
      <circle cx="0" cy="-38" r="2.2" fill="#e07ec3"/>
      <circle cx="0" cy="-38" r="4" fill="#e07ec3" opacity=".4"/>
      {/* Eyes / sensors */}
      <rect x="-13" y="-12" width="8" height="5" fill="#6fd5e0" stroke="#0e1820" strokeWidth=".4"/>
      <rect x="5" y="-12" width="8" height="5" fill="#6fd5e0" stroke="#0e1820" strokeWidth=".4"/>
      {/* Mouth */}
      <rect x="-8" y="-4" width="16" height="2" fill="#1a1410"/>
      {/* Wheels */}
      <circle cx="-10" cy="2" r="5" fill="#1a1410"/>
      <circle cx="-10" cy="2" r="2" fill="#3a2a1e"/>
      <circle cx="10" cy="2" r="5" fill="#1a1410"/>
      <circle cx="10" cy="2" r="2" fill="#3a2a1e"/>
      {/* Arm with leaf */}
      <line x1="16" y1="-6" x2="28" y2="-10" stroke="#1a1410" strokeWidth="1.4"/>
      <path d="M28 -10 Q32 -16 36 -10 Q34 -6 28 -10 Z" fill="#5a9558" stroke="#3e6a3c" strokeWidth=".4"/>
      {/* Bin on top */}
      <rect x="-4" y="-12" width="8" height="6" fill="#3a2a1e"/>
      <path d="M-4 -12 L4 -12 L3 -10 L-3 -10 Z" fill="#5a4a3e"/>
    </g>
  );
}

function FallenLeaf({ x, y, color = '#a8553c' }) {
  const c = window.iso(x, y, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <path d="M-3 0 Q-1 -3 0 -4 Q1 -3 3 0 Q1 1 0 2 Q-1 1 -3 0 Z" fill={color} opacity=".9"/>
    </g>
  );
}

// ─── SCENE 12: RMAICT TOWER ─────────────────────────────────────────────

function SceneRMAICT({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="12 · work" label="RMAICT Tower" sub="AI Engineer Intern · Kuala Lumpur · 2024">
      <window.IsoPath pts={[[80, 220], [80, 50]]} width={42}/>
      <PalmTree2 worldX={-200} worldY={130}/>
      <PalmTree2 worldX={200} worldY={150}/>

      <RMAICTTower tod={tod}/>

      {/* Donut neural diagram floating above */}
      <NeuralHalo worldX={0} worldY={0} worldZ={520} tod={tod}/>

      <AvatarAtWorld x={70} y={170} facing="north" size={56}/>
      <ScaleAnnotation worldX={-180} worldY={-80} text="OCR · 1000+ receipts · Donut" color="#94e2c0"/>
    </window.IsoScene>
  );
}

function PalmTree2({ worldX, worldY }) {
  const c = window.iso(worldX, worldY, 0);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <ellipse cx="0" cy="4" rx="16" ry="4" fill="rgba(0,0,0,.4)"/>
      <path d="M-2 0 L-3 -100 L-1 -120 L1 -120 L3 -100 L2 0 Z" fill="#6e4a2a"/>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = 20 + i * 35; const rad = a * Math.PI / 180;
        const tipX = Math.cos(rad) * 40;
        const tipY = Math.sin(rad) * 14 - 120;
        return <g key={i}>
          <path d={`M0 -120 Q${tipX/2} ${tipY - 16} ${tipX} ${tipY}`} stroke={i % 2 ? '#3e6a3c' : '#5a9558'} strokeWidth="7" fill="none" strokeLinecap="round"/>
          <path d={`M0 -120 Q${tipX/2} ${tipY - 16} ${tipX} ${tipY}`} stroke="#7eb86a" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        </g>;
      })}
      <circle cx="0" cy="-120" r="5" fill="#3a2410"/>
    </g>
  );
}

function RMAICTTower({ tod }) {
  const lit = tod === 'night' ? .95 : .65;
  return (
    <g>
      {/* Plaza */}
      <window.IsoBox x={-60} y={-60} z={0} w={120} d={120} h={10}
        front="#dcd3bf" right="#bcb29a" top="#fffaee" stroke="#857a5a"/>
      {/* Songket terracotta base — 2 floors */}
      <window.IsoBox x={-50} y={-50} z={10} w={100} d={100} h={70}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.7)"/>
      {/* Songket pattern on front face */}
      {[24, 44, 64].map((z, i) => {
        return <g key={i}>
          {(() => {
            const a = window.iso(-50, 50, z), b = window.iso(50, 50, z);
            return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#f5d97a" strokeWidth="1.4" opacity=".85"/>;
          })()}
          {[-40, -20, 0, 20, 40].map(x => {
            const p1 = window.iso(x, 50, z + 4);
            const p2 = window.iso(x + 8, 50, z + 8);
            const p3 = window.iso(x + 16, 50, z + 4);
            const p4 = window.iso(x + 8, 50, z);
            return <polygon key={x} points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`} fill="#f5d97a" opacity=".75"/>;
          })}
        </g>;
      })}
      {/* Tropical greenery climbing */}
      {(() => {
        const a = window.iso(-50, 50, 10);
        return (
          <g transform={`translate(${a.x}, ${a.y})`}>
            <path d="M0 0 Q3 -20 -2 -40 Q3 -60 -2 -70" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
            <circle cx="-2" cy="-20" r="6" fill="#5a9558"/>
            <circle cx="3" cy="-40" r="5" fill="#3e6a3c"/>
            <circle cx="-3" cy="-60" r="6" fill="#5a9558"/>
            <ellipse cx="5" cy="-30" rx="6" ry="3" fill="#7eb86a"/>
            <ellipse cx="-5" cy="-50" rx="5" ry="2.5" fill="#7eb86a"/>
          </g>
        );
      })()}
      {(() => {
        const b = window.iso(50, 50, 10);
        return (
          <g transform={`translate(${b.x}, ${b.y})`}>
            <path d="M0 0 Q-3 -20 2 -40 Q-3 -60 2 -70" stroke="#3e6a3c" strokeWidth="3" fill="none"/>
            <circle cx="2" cy="-20" r="6" fill="#5a9558"/>
            <circle cx="-3" cy="-40" r="5" fill="#3e6a3c"/>
            <circle cx="3" cy="-60" r="6" fill="#5a9558"/>
          </g>
        );
      })()}
      {/* Amber lanterns at entry */}
      <ElevLantern2 worldX={-22} worldY={50} z={10} lit={lit + .3}/>
      <ElevLantern2 worldX={22} worldY={50} z={10} lit={lit + .3}/>
      {/* Grand glass entrance */}
      {(() => {
        const a = window.iso(-14, 50, 10);
        const b = window.iso(14, 50, 10);
        const c = window.iso(14, 50, 56);
        const d = window.iso(-14, 50, 56);
        return (
          <g>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#6fd5e0" opacity={lit * .6}/>
            <line x1={(a.x + b.x) / 2} y1={(a.y + b.y) / 2} x2={(c.x + d.x) / 2} y2={(c.y + d.y) / 2} stroke="#1a3a44" strokeWidth=".5"/>
          </g>
        );
      })()}

      {/* GLASS TOWER SHAFT — much taller */}
      <window.IsoBox x={-40} y={-40} z={80} w={80} d={80} h={400}
        front="rgba(155,200,210,.85)" right="rgba(100,150,170,.85)" top="rgba(220,240,245,.95)" stroke="#1a3a44"/>
      {/* Vertical mullions */}
      {[-30, -20, -10, 0, 10, 20, 30].map(x => {
        const a = window.iso(x, 40, 80), b = window.iso(x, 40, 480);
        return <line key={x} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(15,30,45,.35)" strokeWidth=".5"/>;
      })}
      {/* Floor windows */}
      {Array.from({ length: 9 }).map((_, k) => {
        const z = 100 + k * 42;
        const a = window.iso(-36, 40, z), b = window.iso(36, 40, z);
        const c = window.iso(36, 40, z + 28), d = window.iso(-36, 40, z + 28);
        return (
          <g key={k}>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#0e1820"/>
            <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`} fill="#f5d97a" opacity={lit * .8}/>
            {/* mullions */}
            {[-18, 0, 18].map(mx => {
              const mA = window.iso(mx, 40, z);
              const mB = window.iso(mx, 40, z + 28);
              return <line key={mx} x1={mA.x} y1={mA.y} x2={mB.x} y2={mB.y} stroke="#1a3a44" strokeWidth=".4"/>;
            })}
          </g>
        );
      })}
      {/* OCR scan beam — visible band on the tower */}
      {(() => {
        const a = window.iso(-40, 40, 280);
        const b = window.iso(40, 40, 280);
        return (
          <g>
            <line x1={a.x} y1={a.y - 4} x2={b.x} y2={b.y - 4} stroke="#94e2c0" strokeWidth="3" opacity=".95"/>
            <line x1={a.x} y1={a.y - 1} x2={b.x} y2={b.y - 1} stroke="#94e2c0" strokeWidth="1" opacity=".55"/>
            <text x={(a.x + b.x) / 2} y={a.y - 7} textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#cdf3e2" opacity=".95">SCAN · OCR · DONUT</text>
          </g>
        );
      })()}

      {/* Antenna */}
      <window.IsoBox x={-44} y={-44} z={480} w={88} d={88} h={12}
        front="#1a3a44" right="#0e2128" top="#3a6a78"/>
      {(() => {
        const a = window.iso(0, 0, 492), b = window.iso(0, 0, 560);
        return <g>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1a1410" strokeWidth="3"/>
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#cfd8dc" strokeWidth="1"/>
          <circle cx={b.x} cy={b.y} r="4" fill="#e07ec3"/>
          <circle cx={b.x} cy={b.y} r="8" fill="#e07ec3" opacity=".4"/>
        </g>;
      })()}
      {/* Tower nameplate */}
      {(() => {
        const c = window.iso(0, 40, 90);
        return <g transform={`translate(${c.x}, ${c.y})`}>
          <rect x="-30" y="-9" width="60" height="14" fill="#fffaee" stroke="#1a1410" strokeWidth=".6"/>
          <text x="0" y="0" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="700" fill="#1a1410" letterSpacing="2">RMAICT</text>
        </g>;
      })()}
    </g>
  );
}

function ElevLantern2({ worldX, worldY, z, lit }) {
  const c = window.iso(worldX, worldY, z);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <line x1="0" y1="0" x2="0" y2="-26" stroke="#1a1410" strokeWidth="1.4"/>
      <rect x="-5" y="-26" width="10" height="3" fill="#1a1410"/>
      <path d="M-7 -26 L7 -26 L6 -22 L-6 -22 Z" fill="#3a2410"/>
      <rect x="-6" y="-22" width="12" height="10" fill="#f5d97a" opacity={lit}/>
      <rect x="-7" y="-12" width="14" height="2" fill="#1a1410"/>
      <circle cx="0" cy="-18" r="14" fill="#f5d97a" opacity={lit * .25}/>
    </g>
  );
}

function NeuralHalo({ worldX, worldY, worldZ, tod }) {
  const c = window.iso(worldX, worldY, worldZ);
  return (
    <g transform={`translate(${c.x}, ${c.y})`} opacity={tod === 'night' ? .9 : .6}>
      {/* Three nodes */}
      {[
        [-40, 0, '#6fd5e0'], [0, -10, '#94e2c0'], [40, 0, '#e07ec3'],
        [-20, 14, '#94e2c0'], [20, 14, '#6fd5e0'],
      ].map(([nx, ny, c], i) => (
        <g key={i}>
          <circle cx={nx} cy={ny} r="3" fill={c}/>
          <circle cx={nx} cy={ny} r="6" fill={c} opacity=".35"/>
        </g>
      ))}
      {/* Connections */}
      <line x1="-40" y1="0" x2="0" y2="-10" stroke="#6fd5e0" strokeWidth=".6" opacity=".7"/>
      <line x1="0" y1="-10" x2="40" y2="0" stroke="#6fd5e0" strokeWidth=".6" opacity=".7"/>
      <line x1="-40" y1="0" x2="-20" y2="14" stroke="#94e2c0" strokeWidth=".6" opacity=".7"/>
      <line x1="-20" y1="14" x2="20" y2="14" stroke="#94e2c0" strokeWidth=".6" opacity=".7"/>
      <line x1="20" y1="14" x2="40" y2="0" stroke="#e07ec3" strokeWidth=".6" opacity=".7"/>
      <text x="0" y="32" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fill="#cdf3e2" opacity=".7">DONUT</text>
    </g>
  );
}

// ─── SCENE 13: HEATMAP GARDEN ───────────────────────────────────────────

function SceneHeatmap({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="13 · project" label="The Heatmap Garden" sub="xGenius · ORIS · U.S. Soccer">
      <window.IsoPath pts={[[120, 220], [60, 100]]} width={40}/>
      <window.IsoTree x={-240} y={-50} variant={1} scale={1.2} tod={tod}/>
      <window.IsoTree x={230} y={170} variant={0} scale={1.1} tod={tod}/>

      <HeatmapGardenIso/>

      {/* Floating ORIS placard */}
      <ORISPlacard worldX={0} worldY={-20} worldZ={220} tod={tod}/>

      <AvatarAtWorld x={90} y={170} facing="north" size={60}/>
      <ScaleAnnotation worldX={-180} worldY={-100} text="ORIS · 0.84" color="#94e2c0"/>
    </window.IsoScene>
  );
}

function HeatmapGardenIso() {
  // Soil bed rhombus
  const pts = [[-160, -80, 0], [160, -80, 0], [160, 80, 0], [-160, 80, 0]];
  return (
    <g>
      {/* Hedge border */}
      {[-150, -100, -50, 0, 50, 100, 150].map(x => (
        <g key={x}>
          {/* Back hedge */}
          <g transform={`translate(${window.iso(x, -80, 0).x}, ${window.iso(x, -80, 0).y})`}>
            <ellipse cx="0" cy="2" rx="14" ry="4" fill="rgba(0,0,0,.3)"/>
            <ellipse cx="0" cy="-10" rx="16" ry="14" fill="#3e6a3c"/>
            <ellipse cx="2" cy="-14" rx="12" ry="10" fill="#5a9558"/>
            <ellipse cx="-4" cy="-12" rx="6" ry="6" fill="#7eb86a" opacity=".7"/>
          </g>
          {/* Front hedge */}
          <g transform={`translate(${window.iso(x, 80, 0).x}, ${window.iso(x, 80, 0).y})`}>
            <ellipse cx="0" cy="2" rx="14" ry="4" fill="rgba(0,0,0,.3)"/>
            <ellipse cx="0" cy="-10" rx="16" ry="14" fill="#3e6a3c"/>
            <ellipse cx="2" cy="-14" rx="12" ry="10" fill="#5a9558"/>
            <ellipse cx="-4" cy="-12" rx="6" ry="6" fill="#7eb86a" opacity=".7"/>
          </g>
        </g>
      ))}

      {/* Soil */}
      <polygon points={window.poly(pts)} fill="#5a4a30"/>
      <polygon points={window.poly(pts)} fill="#3a2a1e" opacity=".4"/>

      {/* Heatmap flowers — formation */}
      {(() => {
        const flowers = [];
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < 15; c++) {
            const wx = -140 + c * 20;
            const wy = -64 + r * 22;
            const cx0 = 0, cy0 = 10;
            const d = Math.hypot(wx - cx0, wy - cy0);
            const hot = Math.max(0, 1 - d / 80);
            const hue = 220 - hot * 220;
            const sat = 65 + hot * 30;
            const lite = 55 - hot * 8;
            const size = 4 + hot * 5;
            const p = window.iso(wx, wy, 0);
            flowers.push(
              <g key={`${r}-${c}`} transform={`translate(${p.x}, ${p.y})`}>
                <line x1="0" y1="-2" x2="0" y2="-8" stroke="#3e6a3c" strokeWidth=".6"/>
                {[0, 72, 144, 216, 288].map(a => {
                  const rad = a * Math.PI / 180;
                  const ax = Math.cos(rad) * size * .55;
                  const ay = -8 + Math.sin(rad) * size * .55;
                  return <circle key={a} cx={ax} cy={ay} r={size * .55} fill={`hsl(${hue}, ${sat}%, ${lite + 5}%)`}/>;
                })}
                <circle cx="0" cy="-8" r={size * .35} fill={`hsl(${hue}, ${sat + 10}%, ${lite + 15}%)`}/>
                <circle cx="0" cy="-8" r={size * .15} fill="#f5d97a"/>
              </g>
            );
          }
        }
        return flowers;
      })()}

      {/* Soccer ball on pedestal at center */}
      {(() => {
        const c = window.iso(0, 10, 0);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <window.IsoBox x={-12} y={-2} z={0} w={24} d={12} h={6}
              front="#857a5a" right="#5a5048" top="#a89878" stroke="#3a2a1e"/>
            <circle cx="0" cy="-22" r="14" fill="#fffaee" stroke="#1a1410" strokeWidth="1"/>
            <path d="M-8 -28 L0 -24 L8 -28 L6 -18 L-6 -18 Z" fill="#1a1410"/>
            <line x1="-8" y1="-28" x2="-12" y2="-18" stroke="#1a1410" strokeWidth=".6"/>
            <line x1="8" y1="-28" x2="12" y2="-18" stroke="#1a1410" strokeWidth=".6"/>
          </g>
        );
      })()}
    </g>
  );
}

function ORISPlacard({ worldX, worldY, worldZ, tod }) {
  const c = window.iso(worldX, worldY, worldZ);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <rect x="-72" y="-30" width="144" height="52" rx="3" fill="rgba(15,30,40,.92)" stroke="#6fd5e0" strokeWidth="1"/>
      <text x="0" y="-16" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="600" fill="#6fd5e0" letterSpacing="2">OFF-BALL RUN IMPACT</text>
      <text x="0" y="6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="26" fontWeight="900" fill="#94e2c0">ORIS · 0.84</text>
      <text x="0" y="18" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5.5" fill="#cdf3e2">1,000+ movements analyzed</text>
      {/* tether */}
      <line x1="0" y1="22" x2="0" y2="36" stroke="#6fd5e0" strokeWidth=".6" strokeDasharray="2 3"/>
    </g>
  );
}

// ─── SCENE 14: ATHLETIC STADIUM ─────────────────────────────────────────

function SceneAthletic({ tod = 'golden' }) {
  return (
    <window.IsoScene tod={tod} location="14 · project" label="The Athletic Stadium" sub="CFB Valuation · Big Ten / SEC / ACC / B12">
      <window.IsoPath pts={[[120, 220], [80, 80]]} width={42}/>
      <window.IsoTree x={-240} y={170} variant={0} scale={1.3} tod={tod}/>
      <window.IsoTree x={220} y={-70} variant={1} scale={1.1} tod={tod}/>

      <AthleticStadiumIso tod={tod}/>

      {/* Floating sports-magazine page */}
      <FloatingMagazine worldX={0} worldY={0} worldZ={300} tod={tod}/>
      {/* Floating $ signs */}
      {[[-140, -40, 240, 28], [100, -40, 260, 22], [80, 80, 320, 16], [-80, 60, 280, 20]].map(([x, y, z, s], i) => {
        const p = window.iso(x, y, z);
        return <text key={i} x={p.x} y={p.y} textAnchor="middle" fontFamily="Georgia,serif" fontSize={s} fontWeight="900" fill="#d4b94a" opacity=".75">$</text>;
      })}
      {/* Conference banners hanging from rim */}
      {['BIG TEN', 'SEC', 'ACC', 'BIG 12'].map((c, i) => (
        <ConferenceBanner key={c} worldX={-90 + i * 60} worldY={-100} worldZ={170} text={c}/>
      ))}

      <AvatarAtWorld x={90} y={180} facing="north" size={62}/>
      <ScaleAnnotation worldX={-200} worldY={130} text="60 schools · 4 conferences" color="#a8553c"/>
    </window.IsoScene>
  );
}

function AthleticStadiumIso({ tod }) {
  const lit = tod === 'night' ? 1 : .7;
  return (
    <g>
      {/* Plaza */}
      <window.IsoBox x={-180} y={-130} z={0} w={360} d={260} h={10}
        front="#dcd3bf" right="#bcb29a" top="#fffaee" stroke="#857a5a"/>
      {/* Stadium bowl — oval brick exterior approximated */}
      <window.IsoBox x={-160} y={-110} z={10} w={320} d={220} h={140}
        front="#bc6048" right="#7a3a28" top="#5a2a1c" stroke="rgba(40,15,8,.7)"/>
      {/* Brick courses */}
      {Array.from({ length: 16 }).map((_, k) => {
        const z = 14 + k * 8;
        const a = window.iso(-160, 110, z), b = window.iso(160, 110, z);
        return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(40,15,8,.4)" strokeWidth=".4"/>;
      })}
      {/* Stone rim cap */}
      {(() => {
        const a = window.iso(-160, 110, 150), b = window.iso(160, 110, 150);
        const c = window.iso(160, -110, 150);
        return (
          <g>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="url(#elev-stone)" strokeWidth="6"/>
            <line x1={b.x} y1={b.y} x2={c.x} y2={c.y} stroke="#d8cfb8" strokeWidth="6"/>
          </g>
        );
      })()}
      {/* Field through ARCHED entrances */}
      {[-120, -40, 40, 120].map(ax => {
        const a = window.iso(ax - 18, 110, 10);
        const b = window.iso(ax + 18, 110, 10);
        const c = window.iso(ax, 110, 84);
        return (
          <g key={ax}>
            <path d={`M${a.x} ${a.y} L${a.x} ${a.y - 50} Q${a.x} ${c.y} ${c.x} ${c.y} Q${b.x} ${c.y} ${b.x} ${b.y - 50} L${b.x} ${b.y} Z`} fill="#0e1820"/>
            <path d={`M${a.x + 2} ${a.y - 1} L${a.x + 2} ${a.y - 48} Q${a.x + 2} ${c.y + 2} ${c.x} ${c.y + 2} Q${b.x - 2} ${c.y + 2} ${b.x - 2} ${b.y - 48} L${b.x - 2} ${b.y - 1} Z`} fill="#5a9558" opacity={lit * .8}/>
            {/* yard lines glimpse */}
            <line x1={(a.x + b.x) / 2 - 2} y1={(a.y + b.y) / 2 - 8} x2={(a.x + b.x) / 2 - 2} y2={(a.y + b.y) / 2 - 28} stroke="#fffaee" strokeWidth=".5" opacity=".8"/>
            <line x1={(a.x + b.x) / 2 + 2} y1={(a.y + b.y) / 2 - 8} x2={(a.x + b.x) / 2 + 2} y2={(a.y + b.y) / 2 - 28} stroke="#fffaee" strokeWidth=".5" opacity=".8"/>
          </g>
        );
      })}
      {/* Stadium nameplate */}
      {(() => {
        const c = window.iso(0, 110, 130);
        return (
          <g transform={`translate(${c.x}, ${c.y})`}>
            <rect x="-80" y="-12" width="160" height="20" fill="#0e1820"/>
            <text x="0" y="3" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="14" fontWeight="900" fill="#d4b94a" letterSpacing="3">VALUATION FIELD</text>
          </g>
        );
      })()}
      {/* Floodlight masts at corners */}
      {[[-150, -100], [150, -100], [150, 100], [-150, 100]].map(([fx, fy], i) => {
        const p0 = window.iso(fx, fy, 150);
        const p1 = window.iso(fx, fy, 240);
        return (
          <g key={i}>
            <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#2a2520" strokeWidth="2"/>
            <rect x={p1.x - 8} y={p1.y - 6} width="16" height="6" fill="#2a2520"/>
            <rect x={p1.x - 6} y={p1.y - 4} width="12" height="3" fill="#fff1c8"/>
            <path d={`M${p1.x} ${p1.y - 1} L${p1.x - 40} ${p1.y + 70} L${p1.x + 40} ${p1.y + 70} Z`} fill="#fff1c8" opacity={lit * .15}/>
          </g>
        );
      })}
    </g>
  );
}

function FloatingMagazine({ worldX, worldY, worldZ, tod }) {
  const c = window.iso(worldX, worldY, worldZ);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <rect x="-50" y="-66" width="100" height="120" fill="#fffaee" stroke="#1a1410" strokeWidth=".8" transform="rotate(-6)"/>
      <g transform="rotate(-6)">
        <rect x="-50" y="-66" width="100" height="22" fill="#1a1410"/>
        <text x="0" y="-50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="11" fontWeight="900" fill="#fffaee" letterSpacing="2">VALUATIONS</text>
        <text x="0" y="-38" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6" fontStyle="italic" fill="#1a1410">CFB · MARCH 2026</text>
        <rect x="-44" y="-30" width="40" height="56" fill="#5a9558"/>
        <text x="-24" y="0" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="22" fontWeight="900" fill="#fffaee" opacity=".6">50</text>
        {[0, 4, 8, 12, 16, 20, 24].map(y => <rect key={y} x="0" y={-30 + y * 2} width="40" height="1.5" fill="#5a5048"/>)}
      </g>
      {/* Floating tether */}
      <line x1="0" y1="60" x2="0" y2="78" stroke="#d4c178" strokeWidth=".5" strokeDasharray="2 3"/>
    </g>
  );
}

function ConferenceBanner({ worldX, worldY, worldZ, text }) {
  const c = window.iso(worldX, worldY, worldZ);
  return (
    <g transform={`translate(${c.x}, ${c.y})`}>
      <rect x="-12" y="0" width="24" height="40" fill="#fffaee" stroke="#1a1410" strokeWidth=".4"/>
      <rect x="-12" y="0" width="24" height="4" fill="#a8553c"/>
      <rect x="-12" y="36" width="24" height="4" fill="#a8553c"/>
      <text x="0" y="22" textAnchor="middle" fontFamily="Impact,sans-serif" fontSize="6" fontWeight="900" fill="#1a1410" letterSpacing=".5">{text}</text>
      {/* Pole */}
      <line x1="0" y1="-4" x2="0" y2="0" stroke="#2a2520" strokeWidth=".8"/>
    </g>
  );
}

Object.assign(window, {
  SceneForge, SceneArchive, SceneZen, SceneQard, SceneLighthouse,
  SceneWorkshop, SceneRMAICT, SceneHeatmap, SceneAthletic,
});
