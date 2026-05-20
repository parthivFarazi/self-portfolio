import { P2StatStrip } from './_shared';
import type { PanelProps } from './UPDTPanel';

export function ArchivePanel({ width = 820, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #2a2218 0%, #0e0a06 70%, #050302 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      {([[60, 90], [120, 180], [240, 60], [340, 240], [560, 110], [680, 360], [120, 580], [400, 640], [700, 520]] as Array<[number, number]>).map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 2, height: 2, borderRadius: '50%', background: '#f5d97a', boxShadow: '0 0 6px #f5d97a, 0 0 12px rgba(245,217,122,.5)', opacity: .6 }}/>
      ))}

      <div style={{
        position: 'absolute', left: 30, top: 36, right: 30, bottom: 36,
        background: 'linear-gradient(180deg, #f4e7c4 0%, #e6d3a4 100%)',
        boxShadow: '0 18px 36px rgba(0,0,0,.6), inset 0 0 60px rgba(120,80,30,.18)',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderRadius: '4px',
      }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 26, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(80,40,10,.4), transparent)', pointerEvents: 'none', zIndex: 2 }}/>

        <div style={{ padding: '30px 26px 24px 32px', position: 'relative' }}>
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
            <div style={{ position: 'absolute', left: 12, bottom: 6, font: '8px var(--rw-mono)', color: '#7a5a30' }}>dim · 1</div>
            <div style={{ position: 'absolute', right: 6, top: '50%', font: '8px var(--rw-mono)', color: '#7a5a30', transform: 'rotate(90deg) translateY(-50%)' }}>dim · 2</div>
          </div>

          <div style={{ marginTop: 14, font: 'italic 14px/1.5 var(--rw-serif)', color: '#5a3e20', maxWidth: 320 }}>
            "Each whisper takes a coordinate. Speakers of similar mind find themselves seated, as if by chance, at the same table."
          </div>

          <div style={{ position: 'absolute', bottom: 14, left: 32, font: '10px var(--rw-mono)', color: '#7a5a30' }}>p. 1</div>
        </div>

        <div style={{ padding: '30px 32px 24px 26px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.18), transparent 35%), radial-gradient(ellipse at 100% 100%, rgba(120,70,20,.15), transparent 35%)' }}/>

          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.24em', textTransform: 'uppercase', color: '#7a5a30', textAlign: 'right' }}>
            The Scroll of Sources
          </div>
          <h2 style={{ font: 'italic 26px/1.1 var(--rw-serif)', margin: '8px 0 12px', color: '#2a1a0e', textAlign: 'right' }}>
            A library, in vectors.
          </h2>

          <div style={{
            position: 'relative',
            padding: 18,
            background: 'linear-gradient(180deg, #fffaee 0%, #f1e6c0 100%)',
            border: '1px solid #b89860',
            boxShadow: '0 0 24px rgba(245,217,122,.45), 0 6px 18px rgba(0,0,0,.18), inset 0 0 0 1px rgba(245,217,122,.5)',
          }}>
            <div style={{ position: 'absolute', inset: -1, border: '1px solid rgba(245,217,122,.45)', pointerEvents: 'none' }}/>
            {['◆','◆','◆','◆'].map((g, i) => (
              <div key={i} style={{
                position: 'absolute', font: '10px var(--rw-serif)', color: '#c44a3a',
                ...(i === 0 && { top: 4, left: 6 }),
                ...(i === 1 && { top: 4, right: 6 }),
                ...(i === 2 && { bottom: 4, left: 6 }),
                ...(i === 3 && { bottom: 4, right: 6 }),
              }}>{g}</div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <BookGitGlyph/>
              <div>
                <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.16em', color: '#7a5a30', textTransform: 'uppercase' }}>parthivFarazi /</div>
                <div style={{ font: 'italic 22px var(--rw-serif)', color: '#2a1a0e', lineHeight: 1 }}>embeddingSearchLLM</div>
              </div>
            </div>

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

            <div style={{ font: '12px/1.55 var(--rw-serif)', color: '#2a1a0e', marginBottom: 12 }}>
              <div style={{ font: '9.5px var(--rw-mono)', letterSpacing: '.16em', color: '#7a5a30', marginBottom: 4, textTransform: 'uppercase' }}>readme · excerpt</div>
              A semantic search engine over 490k quotations. Encodes each quote with Gemma-3 embeddings, indexes them in FAISS, and serves nearest-neighbor retrieval in single-digit milliseconds. Trained on the PACE H100 cluster at Georgia Tech.
            </div>

            <div style={{ font: '10px/1.6 "JetBrains Mono", monospace', color: '#5a3e20', background: 'rgba(120,90,40,.08)', border: '1px solid rgba(120,90,40,.2)', padding: '8px 10px', marginBottom: 12 }}>
              <div>├─ <span style={{ color: '#1a1410' }}>encode.py</span></div>
              <div>├─ <span style={{ color: '#1a1410' }}>build_index.sh</span></div>
              <div>├─ <span style={{ color: '#1a1410' }}>serve.py</span></div>
              <div>└─ <span style={{ color: '#7a5a30' }}>data/</span></div>
            </div>

            <a
              href="https://github.com/parthivFarazi/embeddingSearchLLM"
              target="_blank"
              rel="noopener noreferrer"
              style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 14px',
              background: 'linear-gradient(180deg, #2a1a0e, #1a1006)',
              color: '#f5d97a',
              font: '11px "JetBrains Mono", monospace',
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              boxShadow: '0 0 18px rgba(245,217,122,.45), inset 0 0 0 1px rgba(245,217,122,.4)',
              textDecoration: 'none',
            }}
            >
              ◈ View on GitHub
              <span style={{ font: '11px var(--rw-mono)', color: 'rgba(245,217,122,.65)', letterSpacing: '.06em', textTransform: 'none' }}>
                github.com/parthivFarazi/embeddingSearchLLM
              </span>
            </a>
          </div>

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

        <div style={{ position: 'absolute', top: -6, left: 80, width: 20, height: 80, background: 'linear-gradient(180deg, #c44a3a, #8a1a14)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)', boxShadow: '2px 2px 4px rgba(0,0,0,.3)', zIndex: 6 }}/>
      </div>
    </div>
  );
}

function EmbeddingViz() {
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
      <line x1="20" y1="260" x2="340" y2="260" stroke="#b89860" strokeWidth=".5" strokeDasharray="2 3"/>
      <line x1="20" y1="20" x2="20" y2="260" stroke="#b89860" strokeWidth=".5" strokeDasharray="2 3"/>
      {clusters.map((c, ci) => {
        const dots = Array.from({ length: c.n }, (_, i) => {
          const a = (i * 2.4 + ci * 1.3) % (Math.PI * 2);
          const r = 14 + ((i * 7) % 22);
          return { x: c.cx + Math.cos(a) * r * 0.9, y: c.cy + Math.sin(a) * r * 0.7 };
        });
        return (
          <g key={ci}>
            <circle cx={c.cx} cy={c.cy} r="32" fill="url(#dotGlow)"/>
            {dots.slice(0, 6).map((d, i) => (
              <line key={i} x1={c.cx} y1={c.cy} x2={d.x} y2={d.y} stroke={c.color} strokeWidth=".4" opacity=".35"/>
            ))}
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={1.6 + ((i * 3) % 3) * .4} fill={c.color} opacity=".85"/>
            ))}
            <circle cx={c.cx} cy={c.cy} r="2.4" fill={c.color}/>
            <text x={c.cx} y={c.cy + 44} textAnchor="middle" fontFamily="Instrument Serif,serif" fontSize="10" fontStyle="italic" fill="#2a1a0e">
              "{c.label}"
            </text>
          </g>
        );
      })}
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
