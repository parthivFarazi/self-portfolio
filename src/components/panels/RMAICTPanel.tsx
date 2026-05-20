import { P2Header, P2StatStrip } from './_shared';
import type { PanelProps } from './UPDTPanel';

export function RMAICTPanel({ width = 760, height = 780 }: PanelProps) {
  const borderW = 28;
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #1a0e0a 0%, #0a0604 70%, #050302 100%)',
      fontFamily: 'var(--rw-sans)', color: '#f5d97a',
    }}>
      <SongketBorder side="top" w={width} h={borderW}/>
      <SongketBorder side="bottom" w={width} h={borderW}/>
      <SongketBorder side="left" w={borderW} h={height}/>
      <SongketBorder side="right" w={borderW} h={height}/>

      <div style={{ position: 'absolute', inset: borderW + 8,
        background: 'linear-gradient(180deg, rgba(20,30,46,.82), rgba(8,12,20,.92))',
        border: '1px solid rgba(245,217,122,.28)',
        boxShadow: 'inset 0 0 60px rgba(245,217,122,.06), 0 0 24px rgba(245,217,122,.08)',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,217,122,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,217,122,.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }}/>
        {(['tl','tr','bl','br'] as const).map(p => <GoldCorner key={p} pos={p}/>)}

        <div style={{ position: 'relative', padding: '22px 26px 22px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <P2Header
            kicker="RMAICT Tower · AI Engineer Intern · Kuala Lumpur"
            title={<>The Donut that<br/>learned to read.</>}
            subtitle="An AI internship building document-reading models for receipts and invoices."
            subtitleColor="rgba(255,250,238,0.78)"
            meta="2024 · Donut (Hugging Face) · OCR · transfer learning · PyTorch"
            kickerColor="#c44a3a"
            titleColor="#fffaee"
            metaColor="rgba(245,217,122,.65)"
          />

          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, alignItems: 'stretch' }}>
            <StepFrame label="01 · INPUT" sub="raw receipt"><IllustratedReceipt/></StepFrame>
            <StepFrame label="02 · DONUT" sub="OCR pass"><IllustratedScanBeam/></StepFrame>
            <StepFrame label="03 · OUTPUT" sub="structured JSON"><IllustratedJSON/></StepFrame>
          </div>

          <div style={{ marginTop: 18, padding: '12px 14px', border: '1px dashed rgba(245,217,122,.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: '11px "JetBrains Mono", monospace', color: 'rgba(245,217,122,.85)', letterSpacing: '.08em' }}>
            <span>$ donut.infer(receipt.jpg) → schema</span>
            <span style={{ color: '#c44a3a' }}>● live · Petronas line</span>
          </div>

          <div style={{ marginTop: 16, font: '13px/1.55 var(--rw-serif)', color: '#fffaee', fontStyle: 'italic', maxWidth: 560 }}>
            "First the model only read receipts. Then we taught it invoices — same architecture, two more weekends of training. The Donut, now reading two languages."
          </div>

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

function SongketBorder({ side, w, h }: { side: 'top' | 'bottom' | 'left' | 'right'; w: number; h: number }) {
  const horizontal = side === 'top' || side === 'bottom';
  const style: React.CSSProperties = { position: 'absolute', width: w, height: h, overflow: 'hidden' };
  if (side === 'top') style.top = 0;
  if (side === 'bottom') style.bottom = 0;
  if (side === 'left') style.left = 0;
  if (side === 'right') style.right = 0;

  const tileSize = h && w ? (horizontal ? h : w) : 28;
  const length = horizontal ? w : h;
  const count = Math.ceil(length / tileSize) + 1;
  return (
    <div style={style}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #2a1a0e, #1a0e08)', boxShadow: 'inset 0 0 12px rgba(0,0,0,.6)' }}/>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: horizontal ? 'row' : 'column' }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ width: tileSize, height: tileSize, flexShrink: 0, position: 'relative' }}>
            <SongketTile size={tileSize} variant={i % 3}/>
          </div>
        ))}
      </div>
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

function SongketTile({ size = 28, variant = 0 }: { size?: number; variant?: number }) {
  const gold = '#d4c178';
  const goldBright = '#f5d97a';
  const red = '#c44a3a';
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} style={{ display: 'block' }}>
      <path d="M14 4 L24 14 L14 24 L4 14 Z" fill="none" stroke={gold} strokeWidth=".7" opacity=".75"/>
      <path d="M14 8 L20 14 L14 20 L8 14 Z" fill="none" stroke={goldBright} strokeWidth=".5" opacity=".85"/>
      {variant === 0 && <circle cx="14" cy="14" r="1.5" fill={red}/>}
      {variant === 1 && <path d="M14 12 L16 14 L14 16 L12 14 Z" fill={red}/>}
      {variant === 2 && <circle cx="14" cy="14" r="1" fill={goldBright}/>}
      <circle cx="14" cy="2" r=".7" fill={gold}/>
      <circle cx="14" cy="26" r=".7" fill={gold}/>
      <circle cx="2" cy="14" r=".7" fill={gold}/>
      <circle cx="26" cy="14" r=".7" fill={gold}/>
      <path d="M0 0 L4 0 L4 2 M0 0 L0 4 L2 4" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M28 0 L24 0 L24 2 M28 0 L28 4 L26 4" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M0 28 L4 28 L4 26 M0 28 L0 24 L2 24" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
      <path d="M28 28 L24 28 L24 26 M28 28 L28 24 L26 24" stroke={gold} strokeWidth=".5" fill="none" opacity=".6"/>
    </svg>
  );
}

function GoldCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const css: React.CSSProperties = { position: 'absolute', width: 18, height: 18, pointerEvents: 'none' };
  if (pos === 'tl') Object.assign(css, { top: 6, left: 6, borderTop: '1.5px solid #f5d97a', borderLeft: '1.5px solid #f5d97a' });
  if (pos === 'tr') Object.assign(css, { top: 6, right: 6, borderTop: '1.5px solid #f5d97a', borderRight: '1.5px solid #f5d97a' });
  if (pos === 'bl') Object.assign(css, { bottom: 6, left: 6, borderBottom: '1.5px solid #f5d97a', borderLeft: '1.5px solid #f5d97a' });
  if (pos === 'br') Object.assign(css, { bottom: 6, right: 6, borderBottom: '1.5px solid #f5d97a', borderRight: '1.5px solid #f5d97a' });
  return <div style={css}/>;
}

function StepFrame({ label, sub, children }: { label: React.ReactNode; sub: React.ReactNode; children: React.ReactNode }) {
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
  return (
    <svg viewBox="0 0 130 220" width="130" height="220" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.5))' }}>
      <path d="M10 8 L120 6 L122 200 Q116 208 110 204 Q100 210 92 204 Q80 210 70 204 Q60 210 50 204 Q40 210 28 204 Q18 210 12 200 Z" fill="#fffaee"/>
      <path d="M10 8 L120 6 L122 200 Q116 208 110 204 Q100 210 92 204 Q80 210 70 204 Q60 210 50 204 Q40 210 28 204 Q18 210 12 200 Z" fill="none" stroke="#c8b585" strokeWidth=".8"/>
      <text x="65" y="24" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#1a1410">KEDAI MAKAN</text>
      <text x="65" y="34" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#7a5a30">no. 14 jln. ampang · KL</text>
      <line x1="18" y1="40" x2="114" y2="40" stroke="#1a1410" strokeWidth=".5" strokeDasharray="2 2"/>
      {([['nasi lemak', '8.50'], ['teh tarik', '3.00'], ['roti canai', '2.50'], ['kopi-o', '2.00'], ['kuih lapis', '1.80']] as Array<[string, string]>).map(([item, price], i) => (
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
  return (
    <div style={{ position: 'relative', width: 130, height: 220 }}>
      <div style={{ position: 'absolute', inset: '6px 10px', background: '#fffaee', boxShadow: '0 4px 12px rgba(0,0,0,.45)', overflow: 'hidden' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: 8, right: 8 + (i % 4) * 6, top: 14 + i * 13, height: 3, background: '#c8b585', opacity: .8, borderRadius: 1 }}/>
        ))}
        <div style={{ position: 'absolute', left: -10, right: -10, top: 110, height: 3, background: 'linear-gradient(90deg, transparent, #f5d97a 30%, #fffaee 50%, #f5d97a 70%, transparent)', boxShadow: '0 0 20px #f5d97a, 0 0 36px rgba(245,217,122,.6)' }}/>
        <div style={{ position: 'absolute', left: -10, right: -10, top: 0, bottom: 110, background: 'linear-gradient(180deg, transparent, rgba(245,217,122,.08))' }}/>
      </div>
      <div style={{ position: 'absolute', left: -2, top: 100, width: 18, height: 24, borderLeft: '2px solid #f5d97a', borderTop: '2px solid #f5d97a', borderBottom: '2px solid #f5d97a' }}/>
      <div style={{ position: 'absolute', right: -2, top: 100, width: 18, height: 24, borderRight: '2px solid #f5d97a', borderTop: '2px solid #f5d97a', borderBottom: '2px solid #f5d97a' }}/>
      <div style={{ position: 'absolute', bottom: -4, left: 0, right: 0, textAlign: 'center', font: '8.5px "JetBrains Mono", monospace', color: '#f5d97a', letterSpacing: '.16em' }}>
        scanning · 78%
      </div>
    </div>
  );
}

function IllustratedJSON() {
  return (
    <div style={{ position: 'relative', width: 200, height: 220 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #0a141c, #050a10)',
        border: '1px solid rgba(111,213,224,.5)',
        boxShadow: '0 0 24px rgba(111,213,224,.18), inset 0 0 0 1px rgba(255,255,255,.04)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '8px 10px',
        font: '8.2px/1.34 "JetBrains Mono", monospace',
        color: '#cdf3e2',
      }}>
        <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: '2px solid #6fd5e0', borderLeft: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: '2px solid #6fd5e0', borderRight: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: '2px solid #6fd5e0', borderLeft: '2px solid #6fd5e0' }}/>
        <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: '2px solid #6fd5e0', borderRight: '2px solid #6fd5e0' }}/>

        <div style={{ color: '#6fd5e0', letterSpacing: '.12em', marginBottom: 5, fontSize: 7.6 }}>RECEIPT · JSON</div>
        <span style={{ color: '#e07ec3' }}>{'{'}</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"merchant"</span>: <span style={{ color: '#f5d97a' }}>"Kedai Makan"</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"date"</span>: <span style={{ color: '#f5d97a' }}>"2024-07-13"</span>,</span><br/>
        <span style={{ paddingLeft: 8 }}><span style={{ color: '#94e2c0' }}>"items"</span>: [</span><br/>
        <span style={{ paddingLeft: 16, fontSize: 7.8 }}>{`{"n":"nasi lemak","p":8.50},`}</span><br/>
        <span style={{ paddingLeft: 16, fontSize: 7.8 }}>{`{"n":"teh tarik","p":3.00},`}</span><br/>
        <span style={{ paddingLeft: 16, color: 'rgba(205,243,226,.48)', fontSize: 7.8 }}>{`"... 3 more rows"`}</span><br/>
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
