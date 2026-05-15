// project-panels.jsx — Project UI panels with drag-and-drop image slots.
// Each panel themed per the brief; <image-slot> placeholders let the user
// drag in real screenshots/photos.
//
// Image slots persist via the host bridge (image_slot.js). Each must have
// a unique id so the dropped image survives reload.

// Small helper — slot wrapped in a "frame" appropriate to the panel theme.
function Slot({ id, w, h, placeholder, shape = 'rect', radius, style }) {
  const props = { id, placeholder, style: { width: w, height: h, ...(style || {}) } };
  if (shape) props.shape = shape;
  if (radius != null) props.radius = String(radius);
  return React.createElement('image-slot', props);
}

// Header bar shared between project panels (matches building-frame style).
function PanelHeader({ kicker, title, meta }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(0,0,0,.55)' }}>{kicker}</div>
      <h1 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 4px', color: 'var(--rw-ink)' }}>{title}</h1>
      <div style={{ font: '11.5px var(--rw-mono)', color: 'rgba(0,0,0,.55)' }}>{meta}</div>
    </div>
  );
}

// ─── PONG — Baseball app · notebook taped to a pong table ───────────────
function PongPanelV2({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #6a4a2c 0%, #4a2e1c 100%)',
      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.04) 38px 39px), linear-gradient(180deg, #6a4a2c 0%, #4a2e1c 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Pong table top */}
      <div style={{ position: 'absolute', inset: '36px 36px 36px 36px', background: 'linear-gradient(180deg, #c8985e, #8a6532)', boxShadow: 'inset 0 0 48px rgba(0,0,0,.45)' }}>
        {/* Center dashed line */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '2px dashed rgba(255,255,255,.45)' }}></div>
        {/* Cups arranged top/bottom */}
        <PongCupTriangle side="top" />
        <PongCupTriangle side="bottom" />

        {/* The notebook — slightly rotated */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          width: width - 200, minHeight: height - 160,
          background: '#fbf6e6',
          boxShadow: '0 18px 36px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)',
          padding: '28px 36px 28px 60px',
          backgroundImage: `linear-gradient(to bottom, transparent 0 31px, rgba(80,40,40,.18) 31px 32px)`,
          backgroundSize: '100% 32px',
        }}>
          {/* Red margin line */}
          <div style={{ position: 'absolute', left: 50, top: 0, bottom: 0, width: 1, background: '#c44a3a', opacity: .55 }}></div>
          {/* Spiral binding */}
          <div style={{ position: 'absolute', left: 18, top: 24, bottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 12 }}>
            {Array.from({ length: 18 }).map((_, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff, #c8b585 70%, #6a5a30)' }}/>)}
          </div>
          {/* Tape */}
          <div style={{ position: 'absolute', top: -14, left: 40, width: 100, height: 26, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(-6deg)' }}/>
          <div style={{ position: 'absolute', top: -14, right: 24, width: 100, height: 26, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(5deg)' }}/>

          <PanelHeader
            kicker="Pong · baseball logging app"
            title={<>From the porch:<br/>a cleaner scorebook.</>}
            meta="Nov 2025 — Jan 2026 · React Native · Expo · Supabase · PostgreSQL"
          />

          {/* Two phone-shaped image slots */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 10, marginBottom: 18 }}>
            <PhoneFrame caption="game log">
              <Slot id="pong-screen-1" w={140} h={290} placeholder="app screenshot · game log" shape="rounded" radius={22}/>
            </PhoneFrame>
            <PhoneFrame caption="lineup card">
              <Slot id="pong-screen-2" w={140} h={290} placeholder="app screenshot · lineup" shape="rounded" radius={22}/>
            </PhoneFrame>
            <PhoneFrame caption="live score">
              <Slot id="pong-screen-3" w={140} h={290} placeholder="app screenshot · live" shape="rounded" radius={22}/>
            </PhoneFrame>
          </div>

          {/* Handwritten bullets */}
          <div style={{ font: '20px/1.5 "Caveat", cursive', color: '#1a1410' }}>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Cross-platform mobile app. <em>70+ users</em>, multiple locations.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Supabase backend — secure auth, real-time, persistent storage.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Replaced paper logging — saved <strong style={{ background: '#f5d97a' }}>2+ hrs</strong> of post-game entry.</p>
          </div>

          {/* Score scribble */}
          <div style={{ position: 'absolute', right: 22, bottom: 16, font: '22px "Caveat", cursive', color: '#c44a3a', transform: 'rotate(-4deg)' }}>we won.</div>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, caption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ padding: 6, background: '#1a1410', borderRadius: 26, boxShadow: '0 6px 14px rgba(0,0,0,.45), inset 0 0 0 1px #3a2a1e', position: 'relative' }}>
        {/* notch */}
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 38, height: 10, background: '#0a0805', borderRadius: 6, zIndex: 1 }}/>
        {children}
      </div>
      <div style={{ font: '14px "Caveat", cursive', color: '#5a4a3e' }}>{caption}</div>
    </div>
  );
}

function PongCupTriangle({ side }) {
  const rows = [4,3,2,1];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, ...(side === 'top' ? { top: 14 } : { bottom: 14 }), display: 'flex', flexDirection: side === 'top' ? 'column' : 'column-reverse', alignItems: 'center', gap: 4, pointerEvents: 'none' }}>
      {rows.map((n, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: n }).map((_, ci) => <PongCup key={ci}/>)}
        </div>
      ))}
    </div>
  );
}

function PongCup() {
  return (
    <div style={{ position: 'relative', width: 24, height: 26 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #d8362a, #a01a14)', clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,.4)' }}/>
      <div style={{ position: 'absolute', left: '12%', right: '12%', top: -1, height: 2, background: '#fff', opacity: .5 }}/>
    </div>
  );
}

// ─── QARD GREENHOUSE — Fintech frontend · rotating 3D card frame ────────
function QardPanel({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #1a2e2a 0%, #0a1614 70%, #050a09 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      {/* Subtle grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,226,192,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,226,192,.06) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: .8 }}/>
      {/* Neon trim corners */}
      <NeonCorner pos="tl" /><NeonCorner pos="tr" /><NeonCorner pos="bl" /><NeonCorner pos="br" />

      <div style={{ position: 'relative', padding: '32px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#6fd5e0', textTransform: 'uppercase' }}>qard.dev · founding frontend</div>
        <h1 style={{ font: 'italic 44px/1 var(--rw-serif)', margin: '6px 0 4px', color: '#fffaee' }}>The card system,<br/>in bloom.</h1>
        <div style={{ font: '11.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)' }}>Jun — Aug 2025 · Three.js · Framer Motion · Next.js</div>

        {/* Hero card frame — large rotating-card mount */}
        <div style={{ marginTop: 22, alignSelf: 'center', position: 'relative' }}>
          <div style={{ width: 320, height: 200, padding: 8, background: 'linear-gradient(135deg, rgba(148,226,192,.18), rgba(111,213,224,.18))', border: '1px solid rgba(148,226,192,.4)', borderRadius: 18, boxShadow: '0 0 32px rgba(148,226,192,.25), inset 0 0 0 1px rgba(255,255,255,.05)', transform: 'rotateY(-6deg)' }}>
            <Slot id="qard-hero" w={304} h={184} placeholder="Three.js card · hero shot" shape="rounded" radius={12}/>
          </div>
          {/* Floating stem */}
          <div style={{ position: 'absolute', left: '50%', top: '100%', width: 2, height: 32, background: '#3e6a3c', transform: 'translateX(-50%)' }}/>
          <div style={{ position: 'absolute', left: '50%', top: '100%', width: 12, height: 6, background: '#5a9558', borderRadius: 6, transform: 'translate(-50%, 14px) rotate(20deg)' }}/>
        </div>

        {/* Two smaller card-blooms */}
        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <CardBloom>
            <Slot id="qard-detail-1" w={300} h={170} placeholder="landing page · screenshot" shape="rounded" radius={8}/>
          </CardBloom>
          <CardBloom hueShift>
            <Slot id="qard-detail-2" w={300} h={170} placeholder="card interaction · screenshot" shape="rounded" radius={8}/>
          </CardBloom>
        </div>

        {/* Metric ticker */}
        <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', gap: 14 }}>
          <Metric n="200+" k="users · 30 days"/>
          <Metric n="+40%" k="session duration"/>
          <Metric n="-35%" k="initial page load"/>
        </div>
      </div>
    </div>
  );
}

function NeonCorner({ pos }) {
  const css = { position: 'absolute', width: 60, height: 60, pointerEvents: 'none' };
  if (pos === 'tl') Object.assign(css, { top: 12, left: 12, borderTop: '1.5px solid #94e2c0', borderLeft: '1.5px solid #94e2c0' });
  if (pos === 'tr') Object.assign(css, { top: 12, right: 12, borderTop: '1.5px solid #94e2c0', borderRight: '1.5px solid #94e2c0' });
  if (pos === 'bl') Object.assign(css, { bottom: 12, left: 12, borderBottom: '1.5px solid #94e2c0', borderLeft: '1.5px solid #94e2c0' });
  if (pos === 'br') Object.assign(css, { bottom: 12, right: 12, borderBottom: '1.5px solid #94e2c0', borderRight: '1.5px solid #94e2c0' });
  return <div style={css}/>;
}

function CardBloom({ children, hueShift }) {
  return (
    <div style={{ padding: 8, background: hueShift ? 'linear-gradient(135deg, rgba(224,126,195,.16), rgba(148,226,192,.16))' : 'linear-gradient(135deg, rgba(111,213,224,.16), rgba(148,226,192,.16))', border: `1px solid ${hueShift ? 'rgba(224,126,195,.4)' : 'rgba(111,213,224,.4)'}`, borderRadius: 10, boxShadow: `0 0 20px ${hueShift ? 'rgba(224,126,195,.18)' : 'rgba(111,213,224,.18)'}` }}>
      {children}
    </div>
  );
}

function Metric({ n, k }) {
  return (
    <div style={{ flex: 1, paddingLeft: 12, borderLeft: '2px solid #94e2c0' }}>
      <div style={{ font: '700 26px var(--rw-serif)', color: '#fffaee', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.14em', color: '#6fd5e0', textTransform: 'uppercase', marginTop: 4 }}>{k}</div>
    </div>
  );
}

// ─── SOOTHE — Mental health app · journal page on stone ─────────────────
function SoothePanel({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #c4b89c 0%, #8a7e62 100%)',
      backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.15), transparent 60%), linear-gradient(180deg, #c4b89c 0%, #8a7e62 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Soft cherry petal flecks */}
      {[[60, 90], [120, 180], [80, 320], [220, 60], [180, 240], [60, 460], [200, 500], [120, 620], [240, 700], [80, 740]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 6, height: 4, borderRadius: '50%', background: i % 2 ? '#f5b6da' : '#e07ec3', opacity: .55, transform: `rotate(${(i * 37) % 360}deg)` }}/>
      ))}

      {/* Stone slab the journal sits on */}
      <div style={{ position: 'absolute', inset: '40px 40px 40px 40px', background: 'linear-gradient(180deg, #a89878 0%, #7a7064 100%)', borderRadius: 6, boxShadow: 'inset 0 0 30px rgba(0,0,0,.3), 0 12px 24px rgba(0,0,0,.4)' }}>
        {/* Stone speckle */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(0,0,0,.06) 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.08) 1px, transparent 2px)', backgroundSize: '20px 20px, 28px 28px' }}/>

        {/* The journal — open, with both pages */}
        <div style={{ position: 'absolute', left: 32, right: 32, top: 32, bottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: '#f6efd6', boxShadow: '0 12px 24px rgba(0,0,0,.4), inset 0 -10px 24px rgba(120,80,40,.18)', borderRadius: '4px' }}>
          {/* Center binding shadow */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 18, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(80,50,20,.35), transparent)', pointerEvents: 'none' }}/>

          {/* LEFT page — handwritten reflection */}
          <div style={{ padding: '34px 30px 30px', position: 'relative' }}>
            <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Soothe · journal</div>
            <h2 style={{ font: 'italic 30px/1.05 var(--rw-serif)', margin: '4px 0 14px', color: '#2a1a0e' }}>What if a journal<br/>could listen back?</h2>
            <div style={{ font: '16px/1.55 "Caveat", cursive', color: '#2a1a0e' }}>
              <p style={{ margin: '0 0 6px' }}>· Cross-platform app — daily prompts, mood scoring, and gentle wellness suggestions.</p>
              <p style={{ margin: '0 0 6px' }}>· GPT-4 powers the prompt + analysis layer; Firebase, GCP App Engine, Firestore hold it together.</p>
              <p style={{ margin: '0 0 6px' }}>· 90%+ test coverage. CI/CD via GitHub Actions.</p>
              <p style={{ margin: '8px 0 4px', font: 'italic 14px var(--rw-serif)', color: '#5a3e20' }}>May — Jul 2025 · React Native · FastAPI · Firebase · GCP · GPT-4</p>
            </div>
            {/* Dried pressed leaf */}
            <div style={{ position: 'absolute', right: 14, bottom: 24, width: 36, height: 70, transform: 'rotate(20deg)' }}>
              <svg viewBox="0 0 36 70" width="36" height="70">
                <path d="M18 4 Q34 24 30 60 Q18 64 6 60 Q2 24 18 4 Z" fill="#7a8b4a" opacity=".7"/>
                <path d="M18 6 L18 60" stroke="#3a4e20" strokeWidth="1" opacity=".6"/>
                {[16, 26, 36, 46].map(y => <g key={y}>
                  <path d={`M18 ${y} Q26 ${y + 2} 28 ${y + 6}`} stroke="#3a4e20" strokeWidth=".5" fill="none" opacity=".5"/>
                  <path d={`M18 ${y} Q10 ${y + 2} 8 ${y + 6}`} stroke="#3a4e20" strokeWidth=".5" fill="none" opacity=".5"/>
                </g>)}
              </svg>
            </div>
          </div>

          {/* RIGHT page — taped polaroid screenshots */}
          <div style={{ padding: '34px 30px 30px', position: 'relative' }}>
            <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>· Pages from the app</div>

            <div style={{ position: 'relative', height: 'calc(100% - 24px)', marginTop: 14 }}>
              {/* Polaroid 1 */}
              <div style={{ position: 'absolute', top: 0, left: 4, padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(-5deg)' }}>
                <Slot id="soothe-screen-1" w={120} h={210} placeholder="Soothe · home" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>morning prompt</div>
              </div>
              {/* Polaroid 2 */}
              <div style={{ position: 'absolute', top: 30, right: 12, padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(6deg)' }}>
                <Slot id="soothe-screen-2" w={120} h={210} placeholder="Soothe · mood graph" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>mood arc</div>
              </div>
              {/* Polaroid 3 */}
              <div style={{ position: 'absolute', bottom: 0, left: '20%', padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(-2deg)' }}>
                <Slot id="soothe-screen-3" w={120} h={210} placeholder="Soothe · check-in" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>evening check-in</div>
              </div>
              {/* Tape strips */}
              <div style={{ position: 'absolute', top: 4, left: 30, width: 60, height: 18, background: 'rgba(220,205,160,.7)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(-12deg)' }}/>
              <div style={{ position: 'absolute', top: 24, right: 32, width: 60, height: 18, background: 'rgba(220,205,160,.7)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(10deg)' }}/>
            </div>
          </div>

          {/* Bookmark ribbon */}
          <div style={{ position: 'absolute', top: -6, right: 60, width: 24, height: 60, background: 'linear-gradient(180deg, #e07ec3, #b85aa0)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', boxShadow: '2px 2px 4px rgba(0,0,0,.3)' }}/>
        </div>
      </div>
    </div>
  );
}

// ─── ROBOT WORKSHOP — Litter-picking robot · CAD blueprint on corkboard ─
function WorkshopPanel({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#a87856',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(0,0,0,.18) 1px, transparent 2px),
        radial-gradient(circle at 70% 60%, rgba(255,255,255,.08) 1px, transparent 2px),
        radial-gradient(circle at 40% 80%, rgba(0,0,0,.12) 2px, transparent 3px),
        repeating-linear-gradient(0deg, #b08259 0 3px, #a87856 3px 6px)
      `,
      backgroundSize: '24px 24px, 28px 28px, 32px 32px, 100% 6px',
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Corkboard frame */}
      <div style={{ position: 'absolute', inset: 12, border: '14px solid #5a3a18', borderRadius: 4, boxShadow: 'inset 0 0 24px rgba(0,0,0,.35)' }}/>

      {/* Hand-written sign tacked to top */}
      <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%) rotate(-1deg)', padding: '8px 18px', background: '#3a2410', color: '#f5d97a', font: '20px "Caveat", cursive', boxShadow: '0 4px 8px rgba(0,0,0,.4)' }}>
        <Pin x="left"/><Pin x="right"/>
        where it all started · 2021
      </div>

      {/* Big blueprint sheet — center */}
      <div style={{ position: 'absolute', left: 60, top: 110, width: width - 360, height: height - 180, background: '#1f3a5c', boxShadow: '0 12px 24px rgba(0,0,0,.45)', padding: 18, transform: 'rotate(-1deg)' }}>
        <Pin x="left"/><Pin x="right"/>
        {/* Blueprint grid */}
        <div style={{ position: 'absolute', inset: 14, backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>

        {/* Header */}
        <div style={{ position: 'relative', color: '#cfe4ff', font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
          <span>P. Farazi · model 01 · litter unit</span>
          <span>KL · 2021 · DWG—001</span>
        </div>
        <h2 style={{ position: 'relative', font: 'italic 36px/1 var(--rw-serif)', margin: '8px 0 2px', color: '#fffaee' }}>The robot,<br/>in three views.</h2>
        <div style={{ position: 'relative', font: '11px "JetBrains Mono", monospace', color: 'rgba(207,228,255,.65)' }}>C++ · Arduino IDE · TinkerCAD · Fusion 360</div>

        {/* Three orthographic views — image slots */}
        <div style={{ position: 'relative', marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <BluprintView label="Front" callouts={[['solar panel', '↑'], ['sensor', '→']]}>
            <Slot id="robot-view-front" w={120} h={140} placeholder="robot · front photo" shape="rect"/>
          </BluprintView>
          <BluprintView label="Side" callouts={[['drive wheel', '↓'], ['arm', '→']]}>
            <Slot id="robot-view-side" w={120} h={140} placeholder="robot · side photo" shape="rect"/>
          </BluprintView>
          <BluprintView label="Top" callouts={[['frame · Al', '↑'], ['MCU', '→']]}>
            <Slot id="robot-view-top" w={120} h={140} placeholder="robot · top photo" shape="rect"/>
          </BluprintView>
        </div>

        {/* Spec table */}
        <div style={{ position: 'relative', marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid rgba(255,255,255,.3)', color: '#cfe4ff', font: '10.5px "JetBrains Mono", monospace' }}>
          <SpecCell label="POWER" v="SOLAR · 6V"/>
          <SpecCell label="DRIVE" v="2 × DC GEAR"/>
          <SpecCell label="MCU" v="ARDUINO UNO"/>
          <SpecCell label="LOAD" v="≈ 2 LB / DAY"/>
        </div>
      </div>

      {/* Right column — robot in action photo + tags */}
      <div style={{ position: 'absolute', right: 36, top: 110, width: 240, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Polaroid: robot on the field */}
        <div style={{ padding: '10px 10px 32px', background: '#fffaee', boxShadow: '0 8px 16px rgba(0,0,0,.4)', transform: 'rotate(3deg)', position: 'relative' }}>
          <Pin x="center"/>
          <Slot id="robot-action" w={220} h={220} placeholder="robot on the field · photo" shape="rect"/>
          <div style={{ font: '15px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>field tests · weekend 03</div>
        </div>

        {/* Receipt: project results */}
        <div style={{ padding: '16px 14px', background: '#fbf6e6', boxShadow: '0 8px 16px rgba(0,0,0,.35)', transform: 'rotate(-2deg)', font: '12px/1.4 "JetBrains Mono", monospace', color: '#2a1a0e', position: 'relative' }}>
          <Pin x="center"/>
          <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 6 }}>Project · receipts</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>litter / session</span><b>2.0 lb</b></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>labor saved</span><b>3 hrs</b></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>power</span><b>solar</b></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>prototypes</span><b>3</b></div>
          <div style={{ borderTop: '1px dashed #c8b585', marginTop: 8, paddingTop: 6, font: 'italic 15px var(--rw-serif)', color: '#5a3e20' }}>my first useful thing.</div>
        </div>
      </div>
    </div>
  );
}

function Pin({ x = 'center' }) {
  const left = x === 'left' ? 10 : x === 'right' ? 'calc(100% - 18px)' : '50%';
  const tr = x === 'center' ? 'translateX(-50%)' : 'none';
  return (
    <div style={{ position: 'absolute', top: -6, left, transform: tr, width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #ff5a3a, #8a1a14)', boxShadow: '0 1px 2px rgba(0,0,0,.5), inset 0 -2px 2px rgba(0,0,0,.5)', zIndex: 5 }}/>
  );
}

function BluprintView({ label, callouts = [], children }) {
  return (
    <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.35)', padding: 8, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '9.5px "JetBrains Mono", monospace', color: '#cfe4ff', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>
        <span>view · {label}</span>
        <span>1:8</span>
      </div>
      <div style={{ position: 'relative' }}>{children}</div>
      {/* Callout pills */}
      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
        {callouts.map(([t, a], i) => (
          <span key={i} style={{ font: '9px "JetBrains Mono", monospace', letterSpacing: '.06em', color: '#cfe4ff', padding: '2px 6px', border: '1px solid rgba(255,255,255,.4)', borderRadius: 999 }}>{a} {t}</span>
        ))}
      </div>
    </div>
  );
}

function SpecCell({ label, v }) {
  return (
    <div style={{ padding: '8px 10px', borderRight: '1px solid rgba(255,255,255,.3)' }}>
      <div style={{ font: '9px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(207,228,255,.55)' }}>{label}</div>
      <div style={{ font: '12px "JetBrains Mono", monospace', color: '#fffaee', marginTop: 2 }}>{v}</div>
    </div>
  );
}

// ─── UPDT STADIUM — ScoutPro holographic dashboard ──────────────────────
function UPDTPanel({ width = 820, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 0%, #14242e 0%, #050a10 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,226,192,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,226,192,.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>

      {/* Top bar */}
      <div style={{ position: 'relative', padding: '20px 28px 16px', borderBottom: '1px solid rgba(111,213,224,.22)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ font: '900 28px "JetBrains Mono", monospace', letterSpacing: '4px', color: '#94e2c0' }}>UPDT.</span>
          <span style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#6fd5e0', textTransform: 'uppercase' }}>ScoutPro · build 2.4</span>
        </div>
        <div style={{ display: 'flex', gap: 18, font: '10.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7cd17a', display: 'inline-block', marginRight: 6 }}></span>Live · CV tracking</span>
          <span>cto · p.farazi</span>
        </div>
      </div>

      <div style={{ position: 'relative', padding: '16px 28px 28px' }}>
        <PanelHeader
          kicker="UPDT. · soccer analytics"
          title={<span style={{ color: '#fffaee' }}>From video<br/>to decisions.</span>}
          meta="Co-founder & CTO · updt.pro · 2026 — present"
        />

        {/* Layout: hero ScoutPro shot + 2x2 detail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 14 }}>
          {/* Hero ScoutPro dashboard */}
          <HoloFrame>
            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#6fd5e0', textTransform: 'uppercase' }}>scoutpro · player search</div>
            <Slot id="updt-scoutpro" w={400} h={300} placeholder="ScoutPro dashboard · screenshot" shape="rounded" radius={4}/>
          </HoloFrame>
          {/* Right column: 2 stacked frames */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <HoloFrame magenta>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#e07ec3', textTransform: 'uppercase' }}>CV · player tracking</div>
              <Slot id="updt-cv" w={260} h={140} placeholder="CV tracking · clip frame" shape="rounded" radius={4}/>
            </HoloFrame>
            <HoloFrame>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#6fd5e0', textTransform: 'uppercase' }}>tactical patterns</div>
              <Slot id="updt-tactics" w={260} h={140} placeholder="tactics · screenshot" shape="rounded" radius={4}/>
            </HoloFrame>
          </div>
        </div>

        {/* Feature row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          <Feature t="ScoutPro" sub="player search · AI chat · scatterplots · comparisons"/>
          <Feature t="CV Tracking" sub="automated tracking from any broadcast feed"/>
          <Feature t="Patterns" sub="press, build-up, transition detection"/>
          <Feature t="Match Reports" sub="post-match analysis in hours, not days"/>
        </div>
      </div>

      {/* Floating data ticker top-right */}
      <div style={{ position: 'absolute', right: 28, bottom: 22, font: '9.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.55)', letterSpacing: '.18em' }}>
        xG 0.42  ·  xT 0.18  ·  PPDA 11.4  ·  HSR 88m
      </div>
    </div>
  );
}

function HoloFrame({ children, magenta }) {
  const c = magenta ? '#e07ec3' : '#6fd5e0';
  return (
    <div style={{
      padding: 10,
      background: `linear-gradient(135deg, rgba(${magenta ? '224,126,195' : '111,213,224'},.06), transparent 70%)`,
      border: `1px solid ${c}66`,
      boxShadow: `0 0 20px ${c}22, inset 0 0 0 1px rgba(255,255,255,.04)`,
      display: 'flex', flexDirection: 'column', gap: 6,
      position: 'relative',
    }}>
      {/* Corner ticks */}
      <span style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      {children}
    </div>
  );
}

function Feature({ t, sub }) {
  return (
    <div style={{ padding: '10px 12px', background: 'rgba(148,226,192,.05)', border: '1px solid rgba(148,226,192,.18)' }}>
      <div style={{ font: '12.5px var(--rw-sans)', fontWeight: 600, color: '#fffaee', marginBottom: 4 }}>{t}</div>
      <div style={{ font: '10.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

Object.assign(window, { PongPanelV2, QardPanel, SoothePanel, WorkshopPanel, UPDTPanel });
