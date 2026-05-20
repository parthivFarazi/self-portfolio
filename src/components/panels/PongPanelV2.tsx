import type { ReactNode } from 'react';
import { Slot, PanelHeader } from './_shared';
import type { PanelProps } from './UPDTPanel';
import { panelImages } from './panelImages';

export function PongPanelV2({ width = 760, height = 880 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.04) 38px 39px), linear-gradient(180deg, #6a4a2c 0%, #4a2e1c 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      <div style={{ position: 'absolute', inset: '36px 36px 36px 36px', background: 'linear-gradient(180deg, #c8985e, #8a6532)', boxShadow: 'inset 0 0 48px rgba(0,0,0,.45)' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', borderTop: '2px dashed rgba(255,255,255,.45)' }}/>
        <PongCupTriangle side="top" />
        <PongCupTriangle side="bottom" />

        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          width: width - 200, minHeight: height - 160,
          background: '#fbf6e6',
          boxShadow: '0 18px 36px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.25)',
          padding: '28px 36px 28px 60px',
          backgroundImage: `linear-gradient(to bottom, transparent 0 31px, rgba(80,40,40,.18) 31px 32px)`,
          backgroundSize: '100% 32px',
        }}>
          <div style={{ position: 'absolute', left: 50, top: 0, bottom: 0, width: 1, background: '#c44a3a', opacity: .55 }}/>
          <div style={{ position: 'absolute', left: 18, top: 24, bottom: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 12 }}>
            {Array.from({ length: 18 }).map((_, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #fff, #c8b585 70%, #6a5a30)' }}/>)}
          </div>
          <div style={{ position: 'absolute', top: -14, left: 40, width: 100, height: 26, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(-6deg)' }}/>
          <div style={{ position: 'absolute', top: -14, right: 24, width: 100, height: 26, background: 'rgba(220,205,160,.55)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(5deg)' }}/>

          <PanelHeader
            kicker="Pong · baseball logging app"
            title={<>From the porch:<br/>a cleaner scorebook.</>}
            meta="Nov 2025 — Jan 2026 · React Native · Expo · Supabase · PostgreSQL"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 10, marginBottom: 18 }}>
            <PhoneFrame caption="game log">
              <Slot id="pong-screen-1" w={140} h={290} placeholder="app screenshot · game log" shape="rounded" radius={22} src={panelImages.pong.gameLog}/>
            </PhoneFrame>
            <PhoneFrame caption="lineup card">
              <Slot id="pong-screen-2" w={140} h={290} placeholder="app screenshot · lineup" shape="rounded" radius={22} src={panelImages.pong.lineupCard}/>
            </PhoneFrame>
            <PhoneFrame caption="live score">
              <Slot id="pong-screen-3" w={140} h={290} placeholder="app screenshot · live" shape="rounded" radius={22} src={panelImages.pong.liveScore}/>
            </PhoneFrame>
          </div>

          <div style={{ font: '20px/1.5 "Caveat", cursive', color: '#1a1410', paddingBottom: 78 }}>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Cross-platform mobile app. <em>70+ users</em>, multiple locations.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Supabase backend — secure auth, real-time, persistent storage.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Replaced paper logging — saved <strong style={{ background: '#f5d97a' }}>2+ hrs</strong> of post-game entry.</p>
          </div>

          <AppStoreSticker/>

          <div style={{ position: 'absolute', right: 22, bottom: 16, font: '22px "Caveat", cursive', color: '#c44a3a', transform: 'rotate(-4deg)' }}>we won.</div>
        </div>
      </div>
    </div>
  );
}

function AppStoreSticker() {
  return (
    <a
      href="https://apps.apple.com/us/app/mlbbl/id6759076576"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        // Sticker affixed to the notebook — slight 3° rotation + a torn
        // white border to read as "stuck on after the fact". Pinned to the
        // bottom-left corner clear of the handwritten bullets above and the
        // "we won." scribble in the bottom-right.
        position: 'absolute',
        left: 70,
        bottom: 14,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px 9px 12px',
        minHeight: 46,
        background: '#000',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: 8,
        // Outer white "sticker peel" border
        boxShadow:
          '0 0 0 3px #fff, 0 0 0 4px rgba(0,0,0,.18), 0 10px 18px rgba(0,0,0,.45), 0 2px 0 rgba(0,0,0,.5)',
        transform: 'rotate(3deg)',
        transformOrigin: 'bottom left',
        transition: 'transform .14s ease, box-shadow .18s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(3deg) translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 0 0 3px #fff, 0 0 0 5px rgba(0,0,0,.22), 0 16px 28px rgba(0,0,0,.55), 0 3px 0 rgba(0,0,0,.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotate(3deg)';
        e.currentTarget.style.boxShadow = '0 0 0 3px #fff, 0 0 0 4px rgba(0,0,0,.18), 0 10px 18px rgba(0,0,0,.45), 0 2px 0 rgba(0,0,0,.5)';
      }}
    >
      {/* Apple logo */}
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path fill="#fff" d="M16.36 1.43c.05 1.36-.47 2.69-1.31 3.66-.83.97-2.21 1.72-3.56 1.62-.06-1.33.5-2.7 1.36-3.62.86-.93 2.32-1.62 3.51-1.66Zm4.04 16.6c-.64 1.41-.94 2.04-1.76 3.29-1.15 1.74-2.77 3.9-4.78 3.92-1.79.02-2.25-1.16-4.68-1.14-2.43.01-2.94 1.17-4.73 1.15-2.01-.02-3.55-1.99-4.7-3.72C-3.7 17.4-3.96 11.2.34 8.36c1.69-1.12 3.84-1.32 5.4-.78 1.5.52 2.59 1.18 4.18 1.18 1.54 0 2.5-.66 4.25-1.27 1.46-.51 2.94-.55 4.32-.07 1.91.67 3.06 2.16 3.51 4.06-3.34 1.86-2.79 6.71 2.4 6.55Z"/>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ font: '8.5px "JetBrains Mono", monospace', letterSpacing: '.06em', color: '#cfd2d8', textTransform: 'uppercase' }}>Download on the</span>
        <span style={{ font: '700 18px var(--rw-sans)', letterSpacing: '-.01em', marginTop: 3, color: '#fff' }}>App Store</span>
      </div>
    </a>
  );
}

function PhoneFrame({ children, caption }: { children: ReactNode; caption: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ padding: 6, background: '#1a1410', borderRadius: 26, boxShadow: '0 6px 14px rgba(0,0,0,.45), inset 0 0 0 1px #3a2a1e', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 38, height: 10, background: '#0a0805', borderRadius: 6, zIndex: 1 }}/>
        {children}
      </div>
      <div style={{ font: '14px "Caveat", cursive', color: '#5a4a3e' }}>{caption}</div>
    </div>
  );
}

function PongCupTriangle({ side }: { side: 'top' | 'bottom' }) {
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
