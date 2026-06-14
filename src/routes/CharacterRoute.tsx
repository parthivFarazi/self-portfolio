import { useEffect, useState } from 'react';
import { CharacterSheetCard, AvatarToken } from '@/components/quick-view/Avatar';

// Design-reference route at /character — not linked from anywhere in the
// app, reachable by URL only. Shows the mascot's full turntable (the
// CharacterSheetCard) plus the four top-down token facings, so the
// character art can be reviewed in one place after each redesign.

const SHEET_W = 1040;
const FACINGS = ['south', 'north', 'east', 'west'] as const;

export default function CharacterRoute({ onBackHome }: { onBackHome: () => void }) {
  // The sheet is authored at a fixed 1040px width; scale it down to fit
  // narrow viewports rather than forcing a horizontal scroll.
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 48) / SHEET_W));
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('orientationchange', fit);
    return () => {
      window.removeEventListener('resize', fit);
      window.removeEventListener('orientationchange', fit);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100%',
        width: '100%',
        overflow: 'auto',
        background: 'var(--rw-cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
        padding: '24px 0 48px',
        boxSizing: 'border-box',
      }}
    >
      <button
        type="button"
        onClick={onBackHome}
        className="rw-pill"
        style={{
          alignSelf: 'flex-start',
          marginLeft: 24,
          padding: '8px 16px',
          font: '10.5px var(--rw-mono)',
          letterSpacing: '.16em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        ← Home
      </button>

      {/* Turntable + spec sheet, scaled to fit width. */}
      <div style={{ width: SHEET_W * scale, height: 660 * scale }}>
        <div style={{ width: SHEET_W, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <CharacterSheetCard />
        </div>
      </div>

      {/* Top-down tokens — the four walking facings used by the world map. */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 36,
          padding: '20px 28px',
          border: '1px dashed #c8bb95',
          borderRadius: 6,
          background: 'rgba(255,255,255,.4)',
        }}
      >
        {FACINGS.map((facing) => (
          <figure key={facing} style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <AvatarToken size={56} facing={facing} />
            <figcaption
              style={{
                font: '10.5px var(--rw-mono)',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--rw-ink-soft)',
              }}
            >
              {facing}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
