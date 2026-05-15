// project-panels-2.jsx — 6 additional building-matched panels.
// RMAICT · The Forge · The Lighthouse · Athletic Stadium · Whispering Archive · Heatmap Garden
//
// Conventions: each panel matches the canvas scale of the original seven (760×780-ish),
// uses material-driven theming, poetic italic-serif titles, and a stat-callout strip
// at the bottom. Image slots only where real source photos exist.

// ─── Local helpers (scoped to this file to avoid collisions) ────────────

function P2Slot({ id, w, h, placeholder, shape = 'rect', radius, style }) {
  const props = { id, placeholder, style: { width: w, height: h, ...(style || {}) } };
  if (shape) props.shape = shape;
  if (radius != null) props.radius = String(radius);
  return React.createElement('image-slot', props);
}

function P2Header({ kicker, title, meta, kickerColor = 'rgba(0,0,0,.55)', titleColor = 'var(--rw-ink)', metaColor = 'rgba(0,0,0,.55)' }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: kickerColor }}>{kicker}</div>
      <h1 style={{ font: 'italic 38px/1 var(--rw-serif)', margin: '4px 0 4px', color: titleColor }}>{title}</h1>
      <div style={{ font: '11.5px var(--rw-mono)', color: metaColor }}>{meta}</div>
    </div>
  );
}

function P2StatStrip({ items, accent = '#c44a3a', labelColor = '#7a5a30', valueColor = '#2a1a0e', valueFont = '700 22px var(--rw-serif)' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 12 }}>
      {items.map(([n, k], i) => (
        <div key={i} style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 10 }}>
          <div style={{ font: valueFont, color: valueColor, lineHeight: 1 }}>{n}</div>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: labelColor, marginTop: 4 }}>{k}</div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 1. RMAICT TOWER — AI Engineer Intern, Kuala Lumpur
//    Material: futuristic glass terminal framed by Malaysian songket tilework
//    Fully illustrated — no image slots
// ════════════════════════════════════════════════════════════════════════

function RMAICTPanel({ width = 760, height = 780 }) {
  const borderW = 28;
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #1a0e0a 0%, #0a0604 70%, #050302 100%)',
      fontFamily: 'var(--rw-sans)', color: '#f5d97a',
    }}>
      {/* Songket border — top/bottom/left/right, geometric Malay motif */}
      <SongketBorder side="top" w={width} h={borderW}/>
      <SongketBorder side="bottom" w={width} h={borderW}/>
      <SongketBorder side="left" w={borderW} h={height}/>
      <SongketBorder side="right" w={borderW} h={height}/>

      {/* Inner glass terminal */}
      <div style={{ position: 'absolute', inset: borderW + 8,
        background: 'linear-gradient(180deg, rgba(20,30,46,.82), rgba(8,12,20,.92))',
        border: '1px solid rgba(245,217,122,.28)',
        boxShadow: 'inset 0 0 60px rgba(245,217,122,.06), 0 0 24px rgba(245,217,122,.08)',
      }}>
        {/* subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,217,122,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,217,122,.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }}/>
        {/* corner ticks */}
        {['tl','tr','bl','br'].map(p => <GoldCorner key={p} pos={p}/>)}

        <div style={{ position: 'relative', padding: '22px 26px 22px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <P2Header
            kicker="RMAICT Tower · AI Engineer Intern · Kuala Lumpur"
            title={<>The Donut that<br/>learned to read.</>}
            meta="2024 · Donut (Hugging Face) · OCR · transfer learning · PyTorch"
            kickerColor="#c44a3a"
            titleColor="#fffaee"
            metaColor="rgba(245,217,122,.65)"
          />

          {/* 3-step workflow rail */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, alignItems: 'stretch' }}>
            <StepFrame label="01 · INPUT" sub="raw receipt">
              <IllustratedReceipt/>
            </StepFrame>
            <StepFrame label="02 · DONUT" sub="OCR pass">
              <IllustratedScanBeam/>
            </StepFrame>
            <StepFrame label="03 · OUTPUT" sub="structured JSON">
              <IllustratedJSON/>
            </StepFrame>
          </div>

          {/* The model line */}
          <div style={{ marginTop: 18, padding: '12px 14px', border: '1px dashed rgba(245,217,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: '11px "JetBrains Mono", monospace', color: 'rgba(245,217,122,.85)', letterSpacing: '.08em' }}>
            <span>$ donut.infer(receipt.jpg) → schema</span>
            <span style={{ color: '#c44a3a' }}>● live · Petronas line</span>
          </div>

          {/* Notes from the lab */}
          <div style={{ marginTop: 16, font: '13px/1.55 var(--rw-serif)', color: '#fffaee', fontStyle: 'italic', maxWidth: 560 }}>
            "First the model only read receipts. Then we taught it invoices — same architecture, two more weekends of training. The Donut, now reading two languages."
          </div>

          {/* Stat strip — pinned to bottom */}
          <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(245,217,122,.2)' }}>
            <P2StatStrip
              items={[['1,000+', 'receipts processed'], ['3 hrs', 'saved per day'], ['+2 hrs', 'invoice transfer learning']]}
              accent="#c44a3a"
              labelColor="rgba(245,217,122,.55)"
              valueColor="#fffaee"
              valueFont="700 26px var(--rw-serif)"
            />
            <div style={{ marginTop: 12, font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,217,122,.5)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Built with Donut model · Hugging Face</span>
              <span>RMAICT · KL · 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongketBorder({ side, w, h }) {
  // Geometric Malay tilework: warm gold diamonds + red lozenges + small dots.
  // Render as a repeating SVG strip.
  const horizontal = side === 'top' || side === 'bottom';
  const style = { position: 'absolute', width: w, height: h, overflow: 'hidden' };
  if (side === 'top') style.top = 0;
  if (side === 'bottom') style.bottom = 0;
  if (side === 'left') style.left = 0;
  if (side === 'right') style.right = 0;

  // Compute tile count
  const tileSize = h && w ? (horizontal ? h : w) : 28;
  const length = horizontal ? w : h;
  const count = Math.ceil(length / tileSize) + 1;
  return (
    <div style={style}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #2a1a0e, #1a0e08)',
        boxShadow: 'inset 0 0 12px rgba(0,0,0,.6)',
      }}/>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: horizontal ? 'row' : 'column' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ width: tileSize, height: tileSize, flexShrink: 0, position: 'relative' }}>
            <SongketTile size={tileSize} variant={i % 3}/>
          </div>
        ))}
      </div>
      {/* inner gold line */}
      <div style={{ position: 'absolute',
        ...(side === 'top' && { bottom: 0, left: 0, right: 0, height: 1 }),
        ...(side === 'bottom' && { top: 0, left: 0, right: 0, height: 1 }),
        ...(side === 'left' && { right: 0, top: 0, bottom: 0, width: 1 }),
        ...(side === 'right' && { left: 0, top: 0, bottom: 0, width: 1 }),
        background: 'linear-gradient(90deg, transparent, #d4c178, transparent)',
        opacity: .55,
      }}/>
    </div>
  );
}

function SongketTile({ size = 28, variant = 0 }) {
  const gold = '#d4c178';
  const goldBright = '#f5d97a';
  const red = '#c44a3a';
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} style={{ display: 'block' }}>
      {/* center diamond */}
      <path d="M14 4 L24 14 L14 24 L4 14 Z" fill="none" stroke={gold} strokeWidth=".7" opacity=".75"/>
      {/* inner diamond */}
      <path d="M14 8 L20 14 L14 20 L8 14 Z" fill="none" stroke={goldBright} strokeWidth=".5" opacity=".85"/>
      {/* center jewel */}
      {variant === 0 && <circle cx="14" cy="14" r="1.5" fill={red}/>}
      {variant === 1 && <path d="M14 12 L16 14 L14 16 L12 14 Z" fill={red}/>}
      {variant === 2 && <circle cx="14" cy="14" r="1" fill={goldBright}/>}
      {/* corner dots */}
      <circle cx="14" cy="2" r=".7" fill={gold}/>
      <circle cx="14" cy="26" r=".7" fill={gold}/>
      <circle cx="2" cy="14" r=".7" fill={gold}/>
      <circle cx="26" cy="14" r=".7" fill={gold}/>
      {/* hooks at corners (songket motif) */}
      <path d="M0 0 L4 0 L4 2 M0 0 L0 4 L2 4" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M28 0 L24 0 L24 2 M28 0 L28 4 L26 4" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M0 28 L4 28 L4 26 M0 28 L0 24 L2 24" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M28 28 L24 28 L24 26 M28 28 L28 24 L26 24" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
    </svg>
  );
}

function GoldCorner({ pos }) {
  const css = { position: 'absolute', width: 18, height: 18, pointerEvents: 'none' };
  if (pos === 'tl') Object.assign(css, { top: 6, left: 6, borderTop: '1.5px solid #f5d97a', borderLeft: '1.5px solid #f5d97a' });
  if (pos === 'tr') Object.assign(css, { top: 6, right: 6, borderTop: '1.5px solid #f5d97a', borderRight: '1.5px solid #f5d97a' });
  if (pos === 'bl') Object.assign(css, { bottom: 6, left: 6, borderBottom: '1.5px solid #f5d97a', borderLeft: '1.5px solid #f5d97a' });
  if (pos === 'br') Object.assign(css, { bottom: 6, right: 6, borderBottom: '1.5px solid #f5d97a', borderRight: '1.5px solid #f5d97a' });
  return <div style={css}/>;
}

function StepFrame({ label, sub, children }) {
  return (
    <div style={{
      padding: 12,
      background: 'linear-gradient(180deg, rgba(245,217,122,.04), rgba(245,217,122,.02))',
      border: '1px solid rgba(245,217,122,.28)',
      boxShadow: '0 0 18px rgba(245,217,122,.06)',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#f5d97a' }}>
        <span>{label}</span>
        <span style={{ color: 'rgba(245,217,122,.55)' }}>{sub}</span>
      </div>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', minHeight: 220 }}>
        {children}
      </div>
    </div>
  );
}

function IllustratedReceipt() {
  // Crumpled receipt, line items
  return (
    <svg viewBox="0 0 130 220" width="130" height="220" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.5))' }}>
      {/* paper */}
      <path d="M10 8 L120 6 L122 200 Q116 208 110 204 Q100 210 92 204 Q80 210 70 204 Q60 210 50 204 Q40 210 28 204 Q18 210 12 200 Z" fill="#fffaee"/>
      <path d="M10 8 L120 6 L122 200 Q116 208 110 204 Q100 210 92 204 Q80 210 70 204 Q60 210 50 204 Q40 210 28 204 Q18 210 12 200 Z" fill="none" stroke="#c8b585" strokeWidth=".8"/>
      {/* header */}
      <text x="65" y="24" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#1a1410">KEDAI MAKAN</text>
      <text x="65" y="34" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#7a5a30">no. 14 jln. ampang · KL</text>
      <line x1="18" y1="40" x2="114" y2="40" stroke="#1a1410" strokeWidth=".5" strokeDasharray="2 2"/>
      {/* items */}
      {[['nasi lemak', '8.50'], ['teh tarik', '3.00'], ['roti canai', '2.50'], ['kopi-o', '2.00'], ['kuih lapis', '1.80']].map(([item, price], i) => (
        <g key={i}>
          <text x="18" y={54 + i * 14} fontFamily="JetBrains Mono,monospace" fontSize="7" fill="#1a1410">{item}</text>
          <text x="114" y={54 + i * 14} textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="#1a1410">{price}</text>
        </g>
      ))}
      <line x1="18" y1="128" x2="114" y2="128" stroke="#1a1410" strokeWidth=".5" strokeDasharray="2 2"/>
      <text x="18" y="142" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="700" fill="#1a1410">SUBTOTAL</text>
      <text x="114" y="142" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="700" fill="#1a1410">17.80</text>
      <text x="18" y="154" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="#1a1410">SST 6%</text>
      <text x="114" y="154" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="7" fill="#1a1410">1.07</text>
      <line x1="18" y1="160" x2="114" y2="160" stroke="#1a1410" strokeWidth=".8"/>
      <text x="18" y="174" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#c44a3a">TOTAL</text>
      <text x="114" y="174" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#c44a3a">RM 18.87</text>
      <text x="65" y="192" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fill="#7a5a30">terima kasih · thank you</text>
      {/* barcode-ish */}
      <g transform="translate(40, 196)">
        {[2,1,3,1,2,4,1,2,3,1,2].map((w, i, a) => {
          const x = a.slice(0, i).reduce((s, x) => s + x + 1, 0);
          return <rect key={i} x={x} y="0" width={w} height="4" fill="#1a1410"/>;
        })}
      </g>
    </svg>
  );
}

function IllustratedScanBeam() {
  // Document being scanned; glowing horizontal beam
  return (
    <div style={{ position: 'relative', width: 130, height: 220 }}>
      {/* page */}
      <div style={{ position: 'absolute', inset: '6px 10px', background: '#fffaee', boxShadow: '0 4px 12px rgba(0,0,0,.45)', overflow: 'hidden' }}>
        {/* fake text lines */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 8, right: 8 + (i % 4) * 6, top: 14 + i * 13, height: 3, background: '#c8b585', opacity: .8, borderRadius: 1 }}/>
        ))}
        {/* beam — glow line */}
        <div style={{ position: 'absolute', left: -10, right: -10, top: 110, height: 3, background: 'linear-gradient(90deg, transparent, #f5d97a 30%, #fffaee 50%, #f5d97a 70%, transparent)', boxShadow: '0 0 20px #f5d97a, 0 0 36px rgba(245,217,122,.6)' }}/>
        {/* trailing scan band */}
        <div style={{ position: 'absolute', left: -10, right: -10, top: 0, bottom: 110, background: 'linear-gradient(180deg, transparent, rgba(245,217,122,.08))' }}/>
      </div>
      {/* scanner brackets */}
      <div style={{ position: 'absolute', left: -2, top: 100, width: 18, height: 24, borderLeft: '2px solid #f5d97a', borderTop: '2px solid #f5d97a', borderBottom: '2px solid #f5d97a' }}/>
      <div style={{ position: 'absolute', right: -2, top: 100, width: 18, height: 24, borderRight: '2px solid #f5d97a', borderTop: '2px solid #f5d97a', borderBottom: '2px solid #f5d97a' }}/>
      {/* readout */}
      <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, textAlign: 'center', font: '8.5px "JetBrains Mono", monospace', color: '#f5d97a', letterSpacing: '.16em' }}>
        scanning · 78%
      </div>
    </div>
  );
}

function IllustratedJSON() {
  // Stylized JSON output card
  return (
    <div style={{ position: 'relative', width: 200, height: 220 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #0a141c, #050a10)',
        border: '1px solid rgba(111,213,224,.5)',
        boxShadow: '0 0 24px rgba(111,213,224,.18), inset 0 0 0 1px rgba(255,255,255,.04)',
        padding: '10px 12px',
        font: '9.5px/1.5 "JetBrains Mono", monospace',
        color: '#cdf3e2',
      }}>
        {/* corners */}
        <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: '2px solid #6fd5e0', borderLeft: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: '2px solid #6fd5e0', borderRight: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: '2px solid #6fd5e0', borderLeft: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: '2px solid #6fd5e0', borderRight: '2px solid #6fd5e0' }}/>

        <div style={{ color: '#6fd5e0', letterSpacing: '.12em', marginBottom: 6, fontSize: 8 }}>RECEIPT · JSON</div>
        <span style={{ color: '#e07ec3' }}>{'{'}</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"merchant"</span>: <span style={{ color: '#f5d97a' }}>"Kedai Makan"</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"date"</span>: <span style={{ color: '#f5d97a' }}>"2024-07-13"</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"items"</span>: [</span><br/>
        <span style={{ paddingLeft: 16, fontSize: 8.5 }}>{`{ "n": "nasi lemak", "p": 8.50 },`}</span><br/>
        <span style={{ paddingLeft: 16, fontSize: 8.5 }}>{`{ "n": "teh tarik", "p": 3.00 },`}</span><br/>
        <span style={{ paddingLeft: 16, fontSize: 8.5 }}>{`{ "n": "roti canai", "p": 2.50 },`}</span><br/>
        <span style={{ paddingLeft: 16, color: 'rgba(205,243,226,.45)', fontSize: 8.5 }}>{`/* + 2 more */`}</span><br/>
        <span style={{ paddingLeft: 8 }}>],</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"subtotal"</span>: <span style={{ color: '#e07ec3' }}>17.80</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"tax"</span>: <span style={{ color: '#e07ec3' }}>1.07</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"total"</span>: <span style={{ color: '#e07ec3' }}>18.87</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"currency"</span>: <span style={{ color: '#f5d97a' }}>"MYR"</span></span><br/>
        <span style={{ color: '#e07ec3' }}>{'}'}</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 2. THE FORGE — Skills · glowing engineering blueprint with neon grid
// ════════════════════════════════════════════════════════════════════════

function ForgePanel({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #0e1a3a 0%, #050a1c 70%, #02050e 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      {/* Neon grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(111,213,224,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(111,213,224,.1) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: .8 }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(111,213,224,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,213,224,.06) 1px, transparent 1px)', backgroundSize: '128px 128px', opacity: 1 }}/>
      {/* glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(245,217,122,.16), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(224,126,195,.1), transparent 50%)' }}/>
      {/* ember sparks */}
      {[[80, 60], [220, 140], [560, 80], [640, 280], [120, 380], [480, 460], [320, 600], [680, 520]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 2, height: 2, borderRadius: '50%', background: '#f5d97a', boxShadow: '0 0 8px #f5d97a, 0 0 16px rgba(245,217,122,.6)', opacity: .7 }}/>
      ))}

      <div style={{ position: 'relative', padding: '28px 32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Blueprint header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#f5d97a', textTransform: 'uppercase' }}>
            The Forge · skills · DWG-007
          </div>
          <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: 'rgba(205,243,226,.55)' }}>
            P. FARAZI · SCALE 1:1
          </div>
        </div>
        <h1 style={{ font: 'italic 44px/1 var(--rw-serif)', margin: '8px 0 4px', color: '#fffaee' }}>Every language,<br/>forged.</h1>
        <div style={{ font: '11px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)' }}>
          The tools on the wall — picked up over four years of building.
        </div>

        {/* Anvil/hammer flourish under title */}
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AnvilGlyph/>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #f5d97a, transparent)', opacity: .6 }}/>
        </div>

        {/* Four workbench shelves */}
        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>
          <Shelf label="Languages" accent="#f5d97a" items={[
            { name: 'Python', icon: 'py' },
            { name: 'TypeScript', icon: 'ts' },
            { name: 'JavaScript', icon: 'js' },
            { name: 'C++', icon: 'cpp' },
            { name: 'Java', icon: 'java' },
            { name: 'SQL', icon: 'sql' },
            { name: 'Bash', icon: 'sh' },
          ]}/>
          <Shelf label="Frameworks" accent="#6fd5e0" items={[
            { name: 'React' },
            { name: 'Next.js' },
            { name: 'React Native' },
            { name: 'FastAPI' },
            { name: 'Three.js' },
            { name: 'Framer Motion' },
            { name: 'Expo' },
            { name: 'Tailwind' },
          ]}/>
          <Shelf label="AI / ML" accent="#e07ec3" items={[
            { name: 'PyTorch' },
            { name: 'Hugging Face' },
            { name: 'FAISS' },
            { name: 'Donut' },
            { name: 'Gemma-3' },
            { name: 'OpenCV' },
            { name: 'OpenAI API' },
            { name: 'NumPy' },
          ]}/>
          <Shelf label="DevOps & Data" accent="#94e2c0" items={[
            { name: 'GCP' },
            { name: 'Firebase' },
            { name: 'Supabase' },
            { name: 'PostgreSQL' },
            { name: 'Docker' },
            { name: 'GitHub Actions' },
            { name: 'PACE H100' },
            { name: 'Linux' },
          ]}/>
        </div>

        {/* Footer rule + makers mark */}
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed rgba(245,217,122,.3)', display: 'flex', justifyContent: 'space-between', font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,217,122,.55)' }}>
          <span>Forged · ATL · 2022 — present</span>
          <span>33 tools · 4 disciplines</span>
        </div>
      </div>
    </div>
  );
}

function AnvilGlyph() {
  return (
    <svg viewBox="0 0 32 22" width="32" height="22">
      {/* anvil */}
      <path d="M3 10 L29 10 L26 14 L22 14 L22 18 L10 18 L10 14 L6 14 Z" fill="#f5d97a" opacity=".9"/>
      <rect x="14" y="18" width="4" height="3" fill="#f5d97a" opacity=".9"/>
      {/* hammer */}
      <rect x="11" y="2" width="10" height="5" fill="#94e2c0" opacity=".9"/>
      <rect x="15" y="6" width="2" height="4" fill="#94e2c0" opacity=".9"/>
      {/* spark */}
      <circle cx="26" cy="6" r="1" fill="#f5d97a"/>
      <circle cx="6" cy="4" r="1" fill="#f5d97a" opacity=".7"/>
    </svg>
  );
}

function Shelf({ label, accent, items }) {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(20,30,46,.55), rgba(10,20,32,.65))',
      border: `1px solid ${accent}44`,
      boxShadow: `0 0 18px ${accent}1a, inset 0 0 0 1px rgba(255,255,255,.03)`,
      padding: '12px 14px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* corner ticks */}
      <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, background: accent, boxShadow: `0 0 8px ${accent}` }}/>
        <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: accent, textTransform: 'uppercase' }}>{label}</div>
      </div>

      {/* peg-row */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}88, transparent)`, opacity: .7 }}/>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((it, i) => <SkillEmblem key={i} name={it.name} accent={accent}/>)}
      </div>
    </div>
  );
}

function SkillEmblem({ name, accent }) {
  return (
    <div style={{
      position: 'relative',
      padding: '4px 9px 4px 22px',
      font: '10.5px "JetBrains Mono", monospace',
      letterSpacing: '.04em',
      color: '#fffaee',
      background: 'linear-gradient(180deg, rgba(245,217,122,.06), rgba(245,217,122,.02))',
      border: `1px solid ${accent}66`,
      boxShadow: `inset 0 0 8px ${accent}1a, 0 0 6px ${accent}22`,
      clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
    }}>
      {/* hammer dot */}
      <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, background: accent, boxShadow: `0 0 6px ${accent}`, borderRadius: 1 }}/>
      {name}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 3. THE LIGHTHOUSE — Contact · letter on wooden desk + terminal screen
// ════════════════════════════════════════════════════════════════════════

function LighthousePanel({ width = 760, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: `
        repeating-linear-gradient(8deg, #5a3a22 0 22px, #4a2e1c 22px 24px, #6a4628 24px 46px),
        #4a2e1c
      `,
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* warm lamp glow from upper-left */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 0%, rgba(245,217,122,.32), transparent 50%)' }}/>
      {/* faint lighthouse beam from upper-right corner */}
      <div style={{ position: 'absolute', top: -120, right: -200, width: 600, height: 700, background: 'linear-gradient(225deg, rgba(245,217,122,.18), transparent 60%)', transform: 'rotate(8deg)', pointerEvents: 'none' }}/>

      {/* the LETTER — center-left, tilted */}
      <div style={{
        position: 'absolute', left: 32, top: 36, width: 430, minHeight: height - 130,
        background: 'linear-gradient(180deg, #fbf3da, #f1e6c0)',
        boxShadow: '0 14px 28px rgba(0,0,0,.55), inset 0 0 40px rgba(120,80,40,.08)',
        transform: 'rotate(-2deg)',
        padding: '74px 36px 40px 38px',
      }}>
        {/* wax seal centered at top */}
        <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%) rotate(4deg)' }}>
          <LighthouseSeal/>
        </div>
        {/* corner mark */}
        <div style={{ position: 'absolute', top: 14, left: 18, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7a5a30' }}>
          The Lighthouse · contact
        </div>
        <div style={{ position: 'absolute', top: 14, right: 18, font: '9.5px "JetBrains Mono", monospace', color: '#7a5a30' }}>
          ATL · est. 2002
        </div>

        <h1 style={{ font: 'italic 36px/1.05 var(--rw-serif)', margin: '0 0 6px', color: '#2a1a0e' }}>
          If you're reading this,<br/>let's talk.
        </h1>
        <div style={{ font: '13px "Caveat", cursive', color: '#5a3e20', marginBottom: 16 }}>
          Letters welcome at any hour. The light stays on.
        </div>

        <div style={{ font: '16px/1.65 "Caveat", cursive', color: '#2a1a0e' }}>
          <p style={{ margin: '0 0 12px' }}>
            I'm always glad to hear from people building at the seams of <em>sports, AI, and product</em>.
            If you've got a question, an idea, or a problem you're stuck on — send a note.
          </p>
          <p style={{ margin: '0 0 12px' }}>
            Slower replies after midnight. Faster ones over coffee.
          </p>
        </div>

        {/* signature */}
        <div style={{ marginTop: 18, font: '32px/1 "Caveat", cursive', color: '#2a1a0e' }}>— Parthiv</div>
        <div style={{ marginTop: 6, font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30' }}>
          parthiv farazi · cto · updt.pro
        </div>

        {/* the human-voice contact list */}
        <div style={{ marginTop: 18, padding: '14px 16px', background: 'rgba(255,255,255,.45)', border: '1px dashed #c8b585', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ContactLine icon="✉" label="Write to" value="parthiv@updt.pro"/>
          <ContactLine icon="☎" label="Call" value="(+1) 470 · 555 · 0142"/>
          <ContactLine icon="◐" label="Find on the web" value="updt.pro"/>
          <ContactLine icon="✦" label="GitHub" value="github.com/parthivFarazi"/>
          <ContactLine icon="❖" label="LinkedIn" value="linkedin.com/in/parthiv-farazi"/>
        </div>

        {/* paper texture lines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.1), transparent 30%), radial-gradient(ellipse at 0% 100%, rgba(120,70,20,.1), transparent 30%)' }}/>
      </div>

      {/* the TERMINAL — right side, glowing CRT */}
      <div style={{
        position: 'absolute', right: 32, top: 220, width: 250, height: 380,
        background: '#1a1410',
        borderRadius: 10,
        boxShadow: '0 14px 28px rgba(0,0,0,.55), inset 0 0 0 4px #2a2018, inset 0 0 24px rgba(0,0,0,.6)',
        transform: 'rotate(3deg)',
        padding: 12,
      }}>
        {/* screen */}
        <div style={{
          position: 'absolute', inset: 12,
          background: 'radial-gradient(ellipse at 50% 40%, #0a1a14 0%, #050a08 100%)',
          borderRadius: 4,
          boxShadow: 'inset 0 0 32px rgba(124,209,122,.18)',
          overflow: 'hidden',
          font: '11px/1.5 "JetBrains Mono", monospace',
          color: '#7cd17a',
          padding: '12px 14px',
        }}>
          {/* scanlines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.18) 2px 3px)', pointerEvents: 'none' }}/>
          {/* prompt */}
          <div style={{ color: '#94e2c0' }}>$ contact --who parthiv</div>
          <div style={{ color: 'rgba(124,209,122,.65)', marginTop: 6 }}>{'>'} resolving handles…</div>
          <div style={{ marginTop: 8 }}><span style={{ color: '#f5d97a' }}>email</span>  parthiv@updt.pro</div>
          <div><span style={{ color: '#f5d97a' }}>phone</span>  +1 470 555 0142</div>
          <div><span style={{ color: '#f5d97a' }}>web  </span>  updt.pro</div>
          <div><span style={{ color: '#f5d97a' }}>gh   </span>  parthivFarazi</div>
          <div><span style={{ color: '#f5d97a' }}>in   </span>  parthiv-farazi</div>
          <div style={{ marginTop: 10, color: 'rgba(124,209,122,.65)' }}>{'>'} status: <span style={{ color: '#7cd17a' }}>online</span></div>
          <div style={{ color: 'rgba(124,209,122,.65)' }}>{'>'} latency: warm</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center' }}>
            <span>$ </span>
            <span style={{ marginLeft: 2, width: 7, height: 14, background: '#7cd17a', boxShadow: '0 0 6px #7cd17a', display: 'inline-block', animation: 'blink 1s steps(2) infinite' }}/>
          </div>
        </div>
        {/* terminal label */}
        <div style={{ position: 'absolute', bottom: -4, left: 24, font: '8px "JetBrains Mono", monospace', letterSpacing: '.2em', color: '#f5d97a' }}>
          ◉ LIGHTHOUSE-01
        </div>
      </div>

      {/* desk clutter — pen */}
      <svg viewBox="0 0 120 16" width="120" height="16" style={{ position: 'absolute', right: 60, top: 620, transform: 'rotate(-12deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.5))' }}>
        <rect x="0" y="6" width="80" height="4" fill="#2a1a0e"/>
        <rect x="80" y="6" width="20" height="4" fill="#b3a369"/>
        <path d="M100 6 L100 10 L116 8 Z" fill="#1a1410"/>
        <rect x="6" y="4" width="6" height="8" fill="#c44a3a"/>
      </svg>

      {/* postage stamp lower-left */}
      <div style={{ position: 'absolute', left: 32, bottom: 36, width: 90, height: 56, padding: 4, background: '#fbf3da', boxShadow: '0 4px 8px rgba(0,0,0,.4)', transform: 'rotate(-6deg)',
        backgroundImage: 'radial-gradient(circle at 0 0, transparent 4px, #fbf3da 4px), radial-gradient(circle at 100% 0, transparent 4px, #fbf3da 4px)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(180deg, #ffd4a3 0%, #b3dfd7 100%)',
          position: 'relative',
          display: 'grid', placeItems: 'center',
        }}>
          <MiniLighthouse/>
          <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center', font: '8px "JetBrains Mono", monospace', color: '#2a1a0e', letterSpacing: '.18em' }}>USD · 0.68</div>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,49% {opacity:1} 50%,100% {opacity:0} }`}</style>
    </div>
  );
}

function ContactLine({ icon, label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '20px 110px 1fr', alignItems: 'baseline', gap: 6 }}>
      <span style={{ font: '14px var(--rw-serif)', color: '#c44a3a' }}>{icon}</span>
      <span style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30' }}>{label}</span>
      <span style={{ font: '18px "Caveat", cursive', color: '#2a1a0e' }}>{value}</span>
    </div>
  );
}

function LighthouseSeal() {
  return (
    <div style={{ width: 56, height: 56, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,20,.45), transparent 60%)', filter: 'blur(3px)' }}/>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #d35a4a 0%, #9a2a1a 60%, #5a1208 100%)',
        boxShadow: 'inset 0 -6px 8px rgba(0,0,0,.5), inset 0 3px 6px rgba(255,180,160,.35), 0 3px 6px rgba(0,0,0,.4)',
        display: 'grid', placeItems: 'center',
      }}>
        <svg viewBox="0 0 24 24" width="22" height="22" style={{ color: '#3a0a04' }}>
          {/* tiny lighthouse */}
          <rect x="10" y="6" width="4" height="14" fill="currentColor"/>
          <path d="M8 6 L16 6 L14 4 L10 4 Z" fill="currentColor"/>
          <rect x="11" y="2" width="2" height="2" fill="currentColor"/>
          <path d="M8 8 L16 8 M8 12 L16 12" stroke="#fff" strokeWidth=".4" opacity=".4"/>
          <circle cx="12" cy="5" r=".8" fill="#f5d97a"/>
        </svg>
      </div>
    </div>
  );
}

function MiniLighthouse() {
  return (
    <svg viewBox="0 0 50 56" width="50" height="44">
      <rect x="20" y="20" width="10" height="32" fill="#fffaee"/>
      <rect x="20" y="26" width="10" height="3" fill="#c44a3a"/>
      <rect x="20" y="32" width="10" height="3" fill="#c44a3a"/>
      <path d="M18 20 L32 20 L30 16 L20 16 Z" fill="#2a1a0e"/>
      <rect x="22" y="10" width="6" height="6" fill="#f5d97a"/>
      <path d="M22 10 L28 10 L26 6 L24 6 Z" fill="#2a1a0e"/>
      {/* beam */}
      <path d="M28 13 L46 4 L46 22 Z" fill="#f5d97a" opacity=".35"/>
      {/* ground */}
      <rect x="0" y="52" width="50" height="4" fill="#3a4a3e"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 4. THE ATHLETIC STADIUM — College Football Valuation · editorial spread
//    Original editorial layout (not branded UI of a specific publication).
// ════════════════════════════════════════════════════════════════════════

function AthleticPanel({ width = 880, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#2a2520',
      padding: 20,
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* The magazine spread — two facing pages on a dark surface */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, boxShadow: '0 18px 36px rgba(0,0,0,.6)' }}>
        {/* binding shadow */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 30, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(0,0,0,.35), transparent)', zIndex: 5, pointerEvents: 'none' }}/>

        {/* LEFT PAGE — masthead + headline + opening paragraph */}
        <div style={{ background: '#fbf6e6', padding: '28px 32px 24px', position: 'relative', borderRight: '1px solid #d8c8a0' }}>
          {/* page edge */}
          <div style={{ position: 'absolute', left: 12, top: 24, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Issue 14 · Long Read
          </div>

          {/* masthead — original editorial wordmark, not branded UI */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingLeft: 12, borderBottom: '2px solid #1a1410', paddingBottom: 10 }}>
            <div style={{ font: 'italic 700 28px var(--rw-serif)', color: '#1a1410', letterSpacing: '-.01em' }}>The Stadium Files</div>
            <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Sports · Business · Analytics</div>
          </div>

          <div style={{ marginTop: 14, paddingLeft: 12 }}>
            <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: '#c44a3a', marginBottom: 10 }}>The valuation issue · feature</div>
            <h1 style={{ font: 'italic 700 46px/1.05 var(--rw-serif)', margin: '0 0 12px', color: '#1a1410' }}>
              What is a college football program <em>actually</em> worth?
            </h1>
            <div style={{ font: '11.5px "JetBrains Mono", monospace', letterSpacing: '.1em', color: '#7a5a30', marginBottom: 14 }}>
              by Parthiv Farazi · with Georgia Tech Athletics · 2024 — 2025
            </div>

            {/* Drop-cap opening */}
            <div style={{ font: '14.5px/1.5 var(--rw-serif)', color: '#1a1410', columnCount: 1 }}>
              <p style={{ margin: 0 }}>
                <span style={{ float: 'left', font: 'italic 700 64px/0.85 var(--rw-serif)', margin: '4px 6px 0 0', color: '#c44a3a' }}>F</span>
                or all the noise about realignment and TV deals, almost no one publishes a clean answer to the question every athletic director quietly asks. So we built one — a valuation pipeline across <strong>60+ programs</strong> and <strong>four conferences</strong>, with data partnerships at Georgia Tech, and ran it against the public record.
              </p>
              <p style={{ marginTop: 10 }}>
                What follows is the unglamorous part: the spreadsheets, the assumptions, and the moments the numbers refused to behave.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div style={{ marginTop: 18, padding: '14px 16px 14px 22px', borderLeft: '4px solid #c44a3a', background: 'rgba(196,74,58,.06)' }}>
            <div style={{ font: 'italic 22px/1.25 var(--rw-serif)', color: '#1a1410' }}>
              "Program value is <em>almost</em> revenue. The 'almost' is where every interesting story lives."
            </div>
            <div style={{ marginTop: 8, font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30' }}>
              — pull, p. 14
            </div>
          </div>

          {/* Chart slot */}
          <div style={{ marginTop: 16, paddingLeft: 12 }}>
            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 6 }}>
              Fig. 1 — program valuations, ranked
            </div>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <P2Slot id="athletic-chart" w="100%" h={120} placeholder="bar chart · program valuations" shape="rect"/>
            </div>
            <div style={{ font: '10px var(--rw-serif)', fontStyle: 'italic', color: '#5a3e20', marginTop: 6 }}>
              60 programs, four power conferences, normalized to FY '24.
            </div>
          </div>

          {/* page number */}
          <div style={{ position: 'absolute', bottom: 12, left: 22, font: '10px "JetBrains Mono", monospace', color: '#7a5a30' }}>14</div>
        </div>

        {/* RIGHT PAGE — stadium photo + pipeline screenshot + sidebar */}
        <div style={{ background: '#fbf6e6', padding: '28px 32px 24px', position: 'relative' }}>
          {/* page corner */}
          <div style={{ position: 'absolute', right: 12, top: 24, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', writingMode: 'vertical-rl' }}>
            cont. from p. 14
          </div>

          {/* Hero photo */}
          <div style={{ paddingRight: 12, marginBottom: 14 }}>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <P2Slot id="athletic-stadium" w="100%" h={210} placeholder="stadium · photograph" shape="rect"/>
            </div>
            <div style={{ font: '10px var(--rw-serif)', fontStyle: 'italic', color: '#5a3e20', marginTop: 6, paddingRight: 4 }}>
              Bobby Dodd Stadium on a quiet Tuesday. The math doesn't care what day it is.
            </div>
          </div>

          {/* Two-column running body */}
          <div style={{ font: '12.5px/1.55 var(--rw-serif)', color: '#1a1410', columnCount: 2, columnGap: 16, paddingRight: 12, marginBottom: 12 }}>
            <p style={{ margin: 0 }}>
              The pipeline begins where most analyses stop: with the messy numbers. Donations, media rights allocations, ticketing, NIL collectives. We standardize each line into a comparable schema, then run them through a Python valuation model that adjusts for conference strength, recruit pipeline, and stadium fill.
            </p>
            <p style={{ marginTop: 8 }}>
              The output, surprisingly, is not a single number. It's a <em>distribution</em> — the band of values where the program is plausibly worth something, given the inputs you trust.
            </p>
          </div>

          {/* Pipeline screenshot slot */}
          <div style={{ paddingRight: 12 }}>
            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 6 }}>
              Fig. 2 — the Excel/Python pipeline
            </div>
            <div style={{ border: '1px solid #1a1410', padding: 4, background: '#fffaee' }}>
              <P2Slot id="athletic-pipeline" w="100%" h={130} placeholder="Excel + Python pipeline · screenshot" shape="rect"/>
            </div>
          </div>

          {/* Stat strip — pinned to bottom */}
          <div style={{ position: 'absolute', left: 32, right: 24, bottom: 30 }}>
            <div style={{ borderTop: '2px solid #1a1410', borderBottom: '1px solid #1a1410', padding: '10px 0 8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
              <AthleticStat n="60+" k="schools modeled" first/>
              <AthleticStat n="4" k="conferences"/>
              <AthleticStat n="14pp" k="featured in The Athletic"/>
              <AthleticStat n="GT" k="partner · athletics"/>
            </div>
          </div>

          {/* page number */}
          <div style={{ position: 'absolute', bottom: 12, right: 22, font: '10px "JetBrains Mono", monospace', color: '#7a5a30' }}>15</div>
        </div>
      </div>
    </div>
  );
}

function AthleticStat({ n, k, first }) {
  return (
    <div style={{ padding: '0 14px', borderLeft: first ? 'none' : '1px solid #c8b585' }}>
      <div style={{ font: 'italic 700 26px var(--rw-serif)', color: '#c44a3a', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7a5a30', marginTop: 4 }}>{k}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 5. THE WHISPERING ARCHIVE — Embedding-Based Quote Retrieval
//    Material: ancient book; left = embedding viz, right = stylized GitHub
// ════════════════════════════════════════════════════════════════════════

function ArchivePanel({ width = 820, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #2a2218 0%, #0e0a06 70%, #050302 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* drifting motes */}
      {[[60, 90], [120, 180], [240, 60], [340, 240], [560, 110], [680, 360], [120, 580], [400, 640], [700, 520]].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 2, height: 2, borderRadius: '50%', background: '#f5d97a', boxShadow: '0 0 6px #f5d97a, 0 0 12px rgba(245,217,122,.5)', opacity: .6 }}/>
      ))}

      {/* the open book */}
      <div style={{
        position: 'absolute', left: 30, top: 36, right: 30, bottom: 36,
        background: 'linear-gradient(180deg, #f4e7c4 0%, #e6d3a4 100%)',
        boxShadow: '0 18px 36px rgba(0,0,0,.6), inset 0 0 60px rgba(120,80,30,.18)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative',
        borderRadius: '4px',
      }}>
        {/* center binding */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 26, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(80,40,10,.4), transparent)', pointerEvents: 'none', zIndex: 2 }}/>

        {/* LEFT PAGE — vector embedding visualization */}
        <div style={{ padding: '30px 26px 24px 32px', position: 'relative' }}>
          {/* tea-stain edges */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 0% 0%, rgba(120,70,20,.18), transparent 35%), radial-gradient(ellipse at 0% 100%, rgba(120,70,20,.15), transparent 35%)' }}/>

          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#7a5a30' }}>
            The Whispering Archive · Vol. III
          </div>
          <h1 style={{ font: 'italic 38px/1.05 var(--rw-serif)', margin: '8px 0 4px', color: '#2a1a0e' }}>
            490,000 whispers,<br/>indexed.
          </h1>
          <div style={{ font: '11.5px var(--rw-mono)', color: '#7a5a30', marginBottom: 14 }}>
            2024 · FAISS · Gemma-3 · PACE H100 cluster
          </div>

          {/* embedding viz */}
          <div style={{
            position: 'relative',
            height: 360,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(245,217,122,.12) 0%, transparent 60%), rgba(60,40,18,.06)',
            border: '1px dashed #b89860',
            padding: 12,
          }}>
            <div style={{ font: '9px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 4 }}>
              Plate I — latent space, 2D projection
            </div>
            <EmbeddingViz/>
            {/* axis labels */}
            <div style={{ position: 'absolute', left: 12, bottom: 6, font: '8px var(--rw-mono)', color: '#7a5a30' }}>dim · 1</div>
            <div style={{ position: 'absolute', right: 6, top: '50%', font: '8px var(--rw-mono)', color: '#7a5a30', transform: 'rotate(90deg) translateY(-50%)' }}>dim · 2</div>
          </div>

          <div style={{ marginTop: 14, font: 'italic 14px/1.5 var(--rw-serif)', color: '#5a3e20', maxWidth: 320 }}>
            "Each whisper takes a coordinate. Speakers of similar mind find themselves seated, as if by chance, at the same table."
          </div>

          <div style={{ position: 'absolute', bottom: 14, left: 32, font: '10px var(--rw-mono)', color: '#7a5a30' }}>p. 1</div>
        </div>

        {/* RIGHT PAGE — stylized GitHub repo card */}
        <div style={{ padding: '30px 32px 24px 26px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.18), transparent 35%), radial-gradient(ellipse at 100% 100%, rgba(120,70,20,.15), transparent 35%)' }}/>

          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#7a5a30', textAlign: 'right' }}>
            The Scroll of Sources
          </div>
          <h2 style={{ font: 'italic 26px/1.1 var(--rw-serif)', margin: '8px 0 12px', color: '#2a1a0e', textAlign: 'right' }}>
            A library, in vectors.
          </h2>

          {/* The repo card — parchment + glow */}
          <div style={{
            position: 'relative',
            padding: 18,
            background: 'linear-gradient(180deg, #fffaee 0%, #f1e6c0 100%)',
            border: '1px solid #b89860',
            boxShadow: '0 0 24px rgba(245,217,122,.45), 0 6px 18px rgba(0,0,0,.18), inset 0 0 0 1px rgba(245,217,122,.5)',
          }}>
            {/* glowing rune frame */}
            <div style={{ position: 'absolute', inset: -1, border: '1px solid rgba(245,217,122,.45)', pointerEvents: 'none' }}/>
            {/* corner runes */}
            {['◆','◆','◆','◆'].map((g, i) => (
              <div key={i} style={{
                position: 'absolute', font: '10px var(--rw-serif)', color: '#c44a3a',
                ...(i === 0 && { top: 4, left: 6 }),
                ...(i === 1 && { top: 4, right: 6 }),
                ...(i === 2 && { bottom: 4, left: 6 }),
                ...(i === 3 && { bottom: 4, right: 6 }),
              }}>{g}</div>
            ))}

            {/* repo header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <BookGitGlyph/>
              <div>
                <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.16em', color: '#7a5a30', textTransform: 'uppercase' }}>parthivFarazi /</div>
                <div style={{ font: 'italic 22px var(--rw-serif)', color: '#2a1a0e', lineHeight: 1 }}>Embedding-Quote-Retrieval</div>
              </div>
            </div>

            {/* META row */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', font: '10.5px var(--rw-mono)', color: '#5a3e20', borderTop: '1px dashed #b89860', borderBottom: '1px dashed #b89860', padding: '8px 0', margin: '6px 0 10px' }}>
              <span><span style={{ color: '#f5d97a', textShadow: '0 0 4px #f5d97a' }}>★</span> 142</span>
              <span style={{ color: '#7a5a30' }}>⑂ 18</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3a6ec8', display: 'inline-block' }}/>Python
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7a5a30', display: 'inline-block' }}/>Shell
              </span>
            </div>

            {/* README excerpt — looks like a faintly handwritten verse */}
            <div style={{ font: '12px/1.55 var(--rw-serif)', color: '#2a1a0e', marginBottom: 12 }}>
              <div style={{ font: '9.5px var(--rw-mono)', letterSpacing: '.16em', color: '#7a5a30', marginBottom: 4, textTransform: 'uppercase' }}>readme · excerpt</div>
              A semantic search engine over 490k quotations. Encodes each quote with Gemma-3 embeddings, indexes them in FAISS, and serves nearest-neighbor retrieval in single-digit milliseconds. Trained on the PACE H100 cluster at Georgia Tech.
            </div>

            {/* file tree teaser */}
            <div style={{ font: '10px/1.6 "JetBrains Mono", monospace', color: '#5a3e20', background: 'rgba(120,90,40,.08)', border: '1px solid rgba(120,90,40,.2)', padding: '8px 10px', marginBottom: 12 }}>
              <div>├─ <span style={{ color: '#1a1410' }}>encode.py</span></div>
              <div>├─ <span style={{ color: '#1a1410' }}>build_index.sh</span></div>
              <div>├─ <span style={{ color: '#1a1410' }}>serve.py</span></div>
              <div>└─ <span style={{ color: '#7a5a30' }}>data/</span></div>
            </div>

            {/* CTA — glowing rune link */}
            <a style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 14px',
              background: 'linear-gradient(180deg, #2a1a0e, #1a1006)',
              color: '#f5d97a',
              font: '11px "JetBrains Mono", monospace',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              boxShadow: '0 0 18px rgba(245,217,122,.45), inset 0 0 0 1px rgba(245,217,122,.4)',
              textDecoration: 'none',
            }}>
              ◈ View on GitHub
              <span style={{ font: '11px var(--rw-mono)', color: 'rgba(245,217,122,.65)', letterSpacing: '.06em', textTransform: 'none' }}>
                github.com/parthivFarazi/Embedding-Quote-Retrieval
              </span>
            </a>
          </div>

          {/* Stat strip — bottom right page */}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #b89860' }}>
            <P2StatStrip
              items={[['490k+', 'quotes'], ['<5ms', 'retrieval'], ['H100', 'PACE cluster'], ['Gemma-3', 'FAISS']]}
              accent="#c44a3a"
              labelColor="#7a5a30"
              valueColor="#2a1a0e"
              valueFont="italic 700 22px var(--rw-serif)"
            />
          </div>

          <div style={{ position: 'absolute', bottom: 14, right: 32, font: '10px var(--rw-mono)', color: '#7a5a30' }}>p. 2</div>
        </div>

        {/* Ribbon bookmark */}
        <div style={{ position: 'absolute', top: -6, left: 80, width: 20, height: 80, background: 'linear-gradient(180deg, #c44a3a, #8a1a14)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)', boxShadow: '2px 2px 4px rgba(0,0,0,.3)', zIndex: 6 }}/>
      </div>
    </div>
  );
}

function EmbeddingViz() {
  // Cluster of dots in latent space with glowing connecting lines.
  // Pseudo-random but deterministic clusters.
  const clusters = [
    { cx: 60, cy: 90, color: '#c44a3a', n: 18, label: 'love' },
    { cx: 180, cy: 60, color: '#3a6ec8', n: 16, label: 'war' },
    { cx: 240, cy: 200, color: '#7a5a30', n: 22, label: 'time' },
    { cx: 110, cy: 220, color: '#5a8a3a', n: 14, label: 'nature' },
    { cx: 300, cy: 110, color: '#a0307a', n: 12, label: 'self' },
  ];
  return (
    <svg viewBox="0 0 360 280" width="100%" height="280" style={{ display: 'block' }}>
      <defs>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5d97a" stopOpacity=".4"/>
          <stop offset="100%" stopColor="#f5d97a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* faint axis lines */}
      <line x1="20" y1="260" x2="340" y2="260" stroke="#b89860" strokeWidth=".5" strokeDasharray="2 3"/>
      <line x1="20" y1="20" x2="20" y2="260" stroke="#b89860" strokeWidth=".5" strokeDasharray="2 3"/>
      {/* draw clusters */}
      {clusters.map((c, ci) => {
        const dots = Array.from({ length: c.n }, (_, i) => {
          const a = (i * 2.4 + ci * 1.3) % (Math.PI * 2);
          const r = 14 + ((i * 7) % 22);
          return { x: c.cx + Math.cos(a) * r * 0.9, y: c.cy + Math.sin(a) * r * 0.7 };
        });
        return (
          <g key={ci}>
            {/* halo */}
            <circle cx={c.cx} cy={c.cy} r="32" fill="url(#dotGlow)"/>
            {/* connecting whispers */}
            {dots.slice(0, 6).map((d, i) => (
              <line key={i} x1={c.cx} y1={c.cy} x2={d.x} y2={d.y} stroke={c.color} strokeWidth=".4" opacity=".35"/>
            ))}
            {/* dots */}
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.6 + ((i * 3) % 3) * .4} fill={c.color} opacity=".85"/>
            ))}
            {/* center */}
            <circle cx={c.cx} cy={c.cy} r="2.4" fill={c.color}/>
            {/* label */}
            <text x={c.cx} y={c.cy + 44} textAnchor="middle" fontFamily="Instrument Serif,serif" fontSize="10" fontStyle="italic" fill="#2a1a0e">
              "{c.label}"
            </text>
          </g>
        );
      })}
      {/* query crosshair */}
      <g transform="translate(150, 150)">
        <circle r="6" fill="none" stroke="#c44a3a" strokeWidth="1" strokeDasharray="2 2"/>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#c44a3a" strokeWidth=".5"/>
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#c44a3a" strokeWidth=".5"/>
        <text x="10" y="-8" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#c44a3a">query</text>
      </g>
    </svg>
  );
}

function BookGitGlyph() {
  return (
    <svg viewBox="0 0 36 36" width="36" height="36">
      <rect x="4" y="6" width="28" height="24" fill="#2a1a0e" rx="2"/>
      <rect x="6" y="8" width="24" height="20" fill="#f5d97a"/>
      <path d="M18 8 L18 28" stroke="#2a1a0e" strokeWidth="1"/>
      <circle cx="12" cy="14" r="2" fill="#c44a3a"/>
      <circle cx="12" cy="22" r="2" fill="#c44a3a"/>
      <circle cx="24" cy="18" r="2" fill="#c44a3a"/>
      <path d="M12 16 L12 20 M14 14 Q24 14 24 16 M14 22 Q24 22 24 20" stroke="#2a1a0e" strokeWidth="1" fill="none"/>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════
// 6. THE HEATMAP GARDEN — xGenius · tactical chalkboard with pitch + heatmap
// ════════════════════════════════════════════════════════════════════════

function HeatmapPanel({ width = 820, height = 780 }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#3a2410',
      padding: 20,
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* wooden frame */}
      <div style={{
        position: 'absolute', inset: 12,
        border: '12px solid #5a3a18',
        borderRadius: 4,
        boxShadow: 'inset 0 0 24px rgba(0,0,0,.55), 0 12px 24px rgba(0,0,0,.5)',
      }}/>
      {/* chalkboard surface */}
      <div style={{
        position: 'absolute', inset: 24,
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(255,255,255,.04), transparent 60%),
          radial-gradient(ellipse at 70% 80%, rgba(255,255,255,.03), transparent 60%),
          linear-gradient(180deg, #1c2820 0%, #0e1812 100%)
        `,
        boxShadow: 'inset 0 0 50px rgba(0,0,0,.5)',
      }}>
        {/* dust smudges */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 14% 18%, rgba(255,255,255,.025) 6px, transparent 18px), radial-gradient(circle at 78% 64%, rgba(255,255,255,.02) 8px, transparent 22px), radial-gradient(circle at 36% 84%, rgba(255,255,255,.02) 5px, transparent 16px)' }}/>

        <div style={{ position: 'relative', height: '100%', padding: '20px 24px', color: '#f4ecd6' }}>
          {/* header — written in chalk */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(244,236,214,.55)' }}>
                The Heatmap Garden · xGenius
              </div>
              <h1 style={{ font: '34px/1 "Caveat", cursive', margin: '6px 0 2px', color: '#fffaee', letterSpacing: '.01em' }}>
                Off-ball runs, in color.
              </h1>
              <div style={{ font: '11px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.55)' }}>
                2024 — 2025 · US Soccer Federation data · 4 datasets · Python + d3
              </div>
            </div>
            {/* tactical board legend — top right */}
            <div style={{ display: 'flex', gap: 10, font: '9.5px "JetBrains Mono", monospace', color: 'rgba(244,236,214,.7)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 14, height: 2, background: '#fffaee', display: 'inline-block' }}/>run
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, background: 'radial-gradient(circle, #e07ec3, rgba(224,126,195,0))', borderRadius: '50%', display: 'inline-block' }}/>heat
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, background: '#f5d97a', display: 'inline-block', boxShadow: '0 0 6px #f5d97a' }}/>impact
              </span>
            </div>
          </div>

          {/* the big chalk pitch — center */}
          <div style={{ marginTop: 14, position: 'relative', height: 380, border: '1px dashed rgba(244,236,214,.25)', padding: 10 }}>
            <ChalkPitch/>
            {/* drag-and-drop heatmap overlay slot */}
            <div style={{ position: 'absolute', left: 14, top: 14, right: 14, bottom: 14, pointerEvents: 'none', display: 'grid', placeItems: 'center' }}>
              <div style={{ pointerEvents: 'auto', width: '94%', height: '88%', mixBlendMode: 'screen', opacity: .92 }}>
                <P2Slot id="heatmap-overlay" w="100%" h="100%" placeholder="heatmap overlay · drop image" shape="rect"/>
              </div>
            </div>
            {/* run annotation */}
            <div style={{ position: 'absolute', top: 28, right: 38, font: '22px "Caveat", cursive', color: '#fffaee', transform: 'rotate(-4deg)' }}>
              decoy run →
            </div>
            <div style={{ position: 'absolute', bottom: 36, left: 60, font: '20px "Caveat", cursive', color: '#f5d97a', transform: 'rotate(2deg)' }}>
              third-man.
            </div>
          </div>

          {/* two side analyses — scatter + run-impact */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ChalkCard label="Plate II · scatter">
              <P2Slot id="heatmap-scatter" w="100%" h={120} placeholder="scatter plot · screenshot" shape="rect"/>
            </ChalkCard>
            <ChalkCard label="Plate III · run impact">
              <P2Slot id="heatmap-impact" w="100%" h={120} placeholder="run-impact chart · screenshot" shape="rect"/>
            </ChalkCard>
          </div>

          {/* stat strip — chalk style */}
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(244,236,214,.3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <ChalkStat n="4" k="datasets"/>
              <ChalkStat n="1,000+" k="player movements / game"/>
              <ChalkStat n="USSF" k="data partner"/>
              <ChalkStat n="x" k="genius" italic/>
            </div>
          </div>

          {/* margin scribble */}
          <div style={{ position: 'absolute', right: 26, bottom: 22, font: '18px "Caveat", cursive', color: '#f5d97a', transform: 'rotate(-3deg)' }}>
            ...the players you don't see.
          </div>
        </div>

        {/* chalk tray at the bottom */}
        <div style={{ position: 'absolute', bottom: -10, left: 30, right: 30, height: 14, background: 'linear-gradient(180deg, #6e4a2a, #3a2410)', borderRadius: '0 0 4px 4px', boxShadow: '0 4px 6px rgba(0,0,0,.4)' }}>
          {/* chalk sticks */}
          <div style={{ position: 'absolute', top: -6, left: 30, width: 60, height: 6, background: '#fffaee', borderRadius: 2, transform: 'rotate(-2deg)' }}/>
          <div style={{ position: 'absolute', top: -5, left: 110, width: 40, height: 5, background: '#f5d97a', borderRadius: 2 }}/>
          <div style={{ position: 'absolute', top: -6, left: 170, width: 48, height: 5, background: '#e07ec3', opacity: .85, borderRadius: 2, transform: 'rotate(3deg)' }}/>
          {/* eraser */}
          <div style={{ position: 'absolute', top: -10, right: 40, width: 56, height: 12, background: 'linear-gradient(180deg, #c44a3a, #8a1a14)', border: '1px solid #5a1208', boxShadow: '0 2px 3px rgba(0,0,0,.4)' }}/>
        </div>
      </div>
    </div>
  );
}

function ChalkPitch() {
  // Hand-drawn football pitch in chalk
  return (
    <svg viewBox="0 0 720 360" width="100%" height="100%" preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <filter id="rough">
          <feTurbulence baseFrequency="2" numOctaves="2" seed="3"/>
          <feDisplacementMap in="SourceGraphic" scale="0.6"/>
        </filter>
      </defs>
      <g stroke="#fffaee" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".88" filter="url(#rough)">
        {/* outer */}
        <rect x="14" y="14" width="692" height="332"/>
        {/* halfway */}
        <line x1="360" y1="14" x2="360" y2="346"/>
        {/* center circle */}
        <circle cx="360" cy="180" r="54"/>
        <circle cx="360" cy="180" r="2" fill="#fffaee"/>
        {/* penalty boxes */}
        <rect x="14" y="80" width="100" height="200"/>
        <rect x="14" y="130" width="40" height="100"/>
        <rect x="606" y="80" width="100" height="200"/>
        <rect x="666" y="130" width="40" height="100"/>
        {/* goals */}
        <rect x="6" y="155" width="8" height="50"/>
        <rect x="706" y="155" width="8" height="50"/>
        {/* corner arcs */}
        <path d="M14 24 Q24 14 30 14"/>
        <path d="M706 24 Q696 14 690 14"/>
        <path d="M14 336 Q24 346 30 346"/>
        <path d="M706 336 Q696 346 690 346"/>
      </g>
      {/* hand-drawn off-ball runs in chalk */}
      <g stroke="#fffaee" strokeWidth="1.5" fill="none" strokeDasharray="6 4" opacity=".82">
        <path d="M180 200 Q240 140 320 130 Q400 130 500 90"/>
        <path d="M520 240 Q580 220 600 170"/>
        <path d="M140 280 Q200 280 260 220"/>
      </g>
      {/* arrow tips */}
      <g fill="#fffaee" opacity=".9">
        <path d="M498 88 L506 84 L502 96 Z"/>
        <path d="M600 168 L606 162 L606 176 Z"/>
        <path d="M260 220 L268 214 L268 228 Z"/>
      </g>
      {/* player dots — defenders white, attackers pink */}
      <g>
        {[[120, 180], [200, 100], [200, 260], [280, 180], [360, 130], [360, 230]].map(([x, y], i) => (
          <circle key={`d${i}`} cx={x} cy={y} r="5" fill="#cfe4ff" stroke="#1a1410" strokeWidth=".5"/>
        ))}
        {[[440, 110], [520, 170], [580, 220], [640, 160]].map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="5" fill="#e07ec3" stroke="#1a1410" strokeWidth=".5"/>
        ))}
        {/* ball */}
        <circle cx="300" cy="180" r="3" fill="#f5d97a"/>
      </g>
      {/* faint chalk noise */}
      <g opacity=".25" fill="#fffaee">
        {Array.from({ length: 60 }).map((_, i) => (
          <circle key={i} cx={(Math.sin(i * 12.3) * 0.5 + 0.5) * 720} cy={(Math.cos(i * 7.1) * 0.5 + 0.5) * 360} r=".4"/>
        ))}
      </g>
    </svg>
  );
}

function ChalkCard({ label, children }) {
  return (
    <div style={{
      padding: 8,
      border: '1px dashed rgba(244,236,214,.4)',
      background: 'rgba(255,255,255,.02)',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(244,236,214,.6)' }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function ChalkStat({ n, k, italic }) {
  return (
    <div style={{ borderLeft: '2px solid rgba(244,236,214,.5)', paddingLeft: 10 }}>
      <div style={{ font: italic ? 'italic 28px var(--rw-serif)' : '32px "Caveat", cursive', color: '#fffaee', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(244,236,214,.6)', marginTop: 4 }}>{k}</div>
    </div>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────
Object.assign(window, { RMAICTPanel, ForgePanel, LighthousePanel, AthleticPanel, ArchivePanel, HeatmapPanel });
