// Temporary panel for buildings whose designed panel hasn't been ported yet.
// Will be deleted once all 13 designs are wired in.
import type { PanelProps } from './UPDTPanel';

export function StubPanel({
  title,
  blurb,
  width = 720,
  height = 540,
}: PanelProps & { title: string; blurb: string }) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'var(--rw-paper)',
      fontFamily: 'var(--rw-sans)', color: 'var(--rw-ink)',
      padding: '40px 44px',
    }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--rw-gold)' }}>
        Panel coming soon
      </div>
      <h1 style={{ font: 'italic 44px/1 var(--rw-serif)', margin: '6px 0 18px' }}>{title}</h1>
      <p style={{ font: '15px/1.55 var(--rw-sans)', color: 'var(--rw-ink-soft)', maxWidth: 540 }}>{blurb}</p>
      <div style={{ marginTop: 32, padding: 18, background: 'rgba(0,0,0,0.04)', border: '1px dashed rgba(0,0,0,.18)', font: '11.5px var(--rw-mono)', letterSpacing: '.12em', color: 'rgba(0,0,0,.45)' }}>
        Designed panel from <code>./design/prototype/</code> will be rendered here.
      </div>
    </div>
  );
}
