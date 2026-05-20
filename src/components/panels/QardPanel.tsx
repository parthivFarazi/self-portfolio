import type { ReactNode } from 'react';
import { Slot } from './_shared';
import type { PanelProps } from './UPDTPanel';
import { panelImages } from './panelImages';

export function QardPanel({ width = 760, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #1a2e2a 0%, #0a1614 70%, #050a09 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,226,192,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,226,192,.06) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: .8 }}/>
      <NeonCorner pos="tl"/><NeonCorner pos="tr"/><NeonCorner pos="bl"/><NeonCorner pos="br"/>

      <div style={{ position: 'relative', padding: '32px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#6fd5e0', textTransform: 'uppercase' }}>qard.dev · founding frontend</div>
        <h1 style={{ font: 'italic 44px/1 var(--rw-serif)', margin: '6px 0 4px', color: '#fffaee' }}>The card system,<br/>in bloom.</h1>
        <div style={{ font: '15px/1.45 var(--rw-sans, system-ui)', color: 'rgba(255,250,238,.78)', maxWidth: '60ch', margin: '4px 0 6px' }}>
          A fintech startup landing page with an interactive 3D card interface.
        </div>
        <div style={{ font: '11.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)' }}>Jun — Aug 2025 · Three.js · Framer Motion · Next.js</div>

        <div style={{ marginTop: 22, alignSelf: 'center', position: 'relative' }}>
          <div style={{ width: 320, height: 200, padding: 8, background: 'linear-gradient(135deg, rgba(148,226,192,.18), rgba(111,213,224,.18))', border: '1px solid rgba(148,226,192,.4)', borderRadius: 18, boxShadow: '0 0 32px rgba(148,226,192,.25), inset 0 0 0 1px rgba(255,255,255,.05)', transform: 'rotateY(-6deg)' }}>
            <Slot id="qard-hero" w={304} h={184} placeholder="Three.js card · hero shot" shape="rounded" radius={12} src={panelImages.qard.hero}/>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '100%', width: 2, height: 32, background: '#3e6a3c', transform: 'translateX(-50%)' }}/>
          <div style={{ position: 'absolute', left: '50%', top: '100%', width: 12, height: 6, background: '#5a9558', borderRadius: 6, transform: 'translate(-50%, 14px) rotate(20deg)' }}/>
        </div>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <CardBloom>
            <Slot id="qard-detail-1" w={300} h={170} placeholder="landing page · screenshot" shape="rounded" radius={8} src={panelImages.qard.detailLandingPage}/>
          </CardBloom>
          <CardBloom hueShift>
            <Slot id="qard-detail-2" w={300} h={170} placeholder="card interaction · screenshot" shape="rounded" radius={8} src={panelImages.qard.detailInteraction}/>
          </CardBloom>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 18, display: 'flex', alignItems: 'stretch', gap: 14 }}>
          <Metric n="200+" k="users · 30 days"/>
          <Metric n="+40%" k="session duration"/>
          <Metric n="-35%" k="initial page load"/>
          <QardCardCTA/>
        </div>
      </div>
    </div>
  );
}

function QardCardCTA() {
  return (
    <a
      href="https://qard.dev"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        // Styled like one of the floating Qard "cards" — small rectangular
        // bloom with neon cyan trim that picks up the panel's existing
        // card-bloom motif.
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 52, padding: '10px 14px',
        background: 'linear-gradient(135deg, rgba(111,213,224,.18), rgba(148,226,192,.22))',
        border: '1px solid rgba(111,213,224,.65)',
        borderRadius: 10,
        boxShadow: '0 0 22px rgba(111,213,224,.32), inset 0 0 0 1px rgba(255,255,255,.06)',
        color: '#fffaee',
        textDecoration: 'none',
        transition: 'transform .14s ease, box-shadow .18s ease, border-color .18s ease',
        position: 'relative',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) rotateZ(-1deg)';
        e.currentTarget.style.boxShadow = '0 0 32px rgba(111,213,224,.55), inset 0 0 0 1px rgba(255,255,255,.1)';
        e.currentTarget.style.borderColor = 'rgba(148,226,192,.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) rotateZ(0deg)';
        e.currentTarget.style.boxShadow = '0 0 22px rgba(111,213,224,.32), inset 0 0 0 1px rgba(255,255,255,.06)';
        e.currentTarget.style.borderColor = 'rgba(111,213,224,.65)';
      }}
    >
      <span style={{ font: '9px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#6fd5e0', textTransform: 'uppercase' }}>Live</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '700 14px var(--rw-sans)', color: '#fffaee', marginTop: 2 }}>
        Visit qard.dev
        <span style={{ font: '13px var(--rw-serif)', color: '#94e2c0' }}>↗</span>
      </span>
    </a>
  );
}

function NeonCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const css: React.CSSProperties = { position: 'absolute', width: 60, height: 60, pointerEvents: 'none' };
  if (pos === 'tl') Object.assign(css, { top: 12, left: 12, borderTop: '1.5px solid #94e2c0', borderLeft: '1.5px solid #94e2c0' });
  if (pos === 'tr') Object.assign(css, { top: 12, right: 12, borderTop: '1.5px solid #94e2c0', borderRight: '1.5px solid #94e2c0' });
  if (pos === 'bl') Object.assign(css, { bottom: 12, left: 12, borderBottom: '1.5px solid #94e2c0', borderLeft: '1.5px solid #94e2c0' });
  if (pos === 'br') Object.assign(css, { bottom: 12, right: 12, borderBottom: '1.5px solid #94e2c0', borderRight: '1.5px solid #94e2c0' });
  return <div style={css}/>;
}

function CardBloom({ children, hueShift }: { children: ReactNode; hueShift?: boolean }) {
  return (
    <div style={{ padding: 8, background: hueShift ? 'linear-gradient(135deg, rgba(224,126,195,.16), rgba(148,226,192,.16))' : 'linear-gradient(135deg, rgba(111,213,224,.16), rgba(148,226,192,.16))', border: `1px solid ${hueShift ? 'rgba(224,126,195,.4)' : 'rgba(111,213,224,.4)'}`, borderRadius: 10, boxShadow: `0 0 20px ${hueShift ? 'rgba(224,126,195,.18)' : 'rgba(111,213,224,.18)'}` }}>
      {children}
    </div>
  );
}

function Metric({ n, k }: { n: ReactNode; k: ReactNode }) {
  return (
    <div style={{ flex: 1, paddingLeft: 12, borderLeft: '2px solid #94e2c0' }}>
      <div style={{ font: '700 26px var(--rw-serif)', color: '#fffaee', lineHeight: 1 }}>{n}</div>
      <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.14em', color: '#6fd5e0', textTransform: 'uppercase', marginTop: 4 }}>{k}</div>
    </div>
  );
}
