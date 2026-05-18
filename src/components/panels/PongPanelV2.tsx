import type { ReactNode } from 'react';
import { Slot, PanelHeader } from './_shared';
import type { PanelProps } from './UPDTPanel';
import { panelImages } from './panelImages';

export function PongPanelV2({ width = 760, height = 780 }: PanelProps) {
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

          <div style={{ font: '20px/1.5 "Caveat", cursive', color: '#1a1410' }}>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Cross-platform mobile app. <em>70+ users</em>, multiple locations.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Supabase backend — secure auth, real-time, persistent storage.</p>
            <p style={{ margin: '0 0 6px' }}><span style={{ color: '#c44a3a' }}>★</span> Replaced paper logging — saved <strong style={{ background: '#f5d97a' }}>2+ hrs</strong> of post-game entry.</p>
          </div>

          <div style={{ position: 'absolute', right: 22, bottom: 16, font: '22px "Caveat", cursive', color: '#c44a3a', transform: 'rotate(-4deg)' }}>we won.</div>
        </div>
      </div>
    </div>
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
