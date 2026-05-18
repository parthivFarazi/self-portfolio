import type { ReactNode } from 'react';
import { Slot, P2Header } from './_shared';
import { panelImages } from './panelImages';

export interface PanelProps {
  width?: number;
  height?: number;
}

export function UPDTPanel({ width = 820, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 0%, #14242e 0%, #050a10 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,226,192,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,226,192,.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>

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
        <P2Header
          kicker="UPDT · soccer analytics"
          kickerColor="rgba(205,243,226,.78)"
          titleColor="#fffaee"
          meta="Co-founder & CTO · updt.pro · 2026 — present"
          metaColor="rgba(205,243,226,.78)"
          title={<>From video<br/>to decisions.</>}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginTop: 14 }}>
          <HoloFrame>
            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#6fd5e0', textTransform: 'uppercase' }}>scoutpro · player search</div>
            <Slot id="updt-scoutpro" w={400} h={300} placeholder="ScoutPro dashboard · screenshot" shape="rounded" radius={4} fit="contain" src={panelImages.updt.playerSearch}/>
          </HoloFrame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <HoloFrame magenta>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#e07ec3', textTransform: 'uppercase' }}>CV · player tracking</div>
              <Slot id="updt-cv" w={260} h={140} placeholder="CV tracking · clip frame" shape="rounded" radius={4} src={panelImages.updt.playerTracking}/>
            </HoloFrame>
            <HoloFrame>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: '#6fd5e0', textTransform: 'uppercase' }}>tactical patterns</div>
              <Slot id="updt-tactics" w={260} h={140} placeholder="tactics · screenshot" shape="rounded" radius={4} src={panelImages.updt.tacticalPattern}/>
            </HoloFrame>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          <Feature t="ScoutPro" sub="player search · AI chat · scatterplots · comparisons"/>
          <Feature t="CV Tracking" sub="automated tracking from any broadcast feed"/>
          <Feature t="Patterns" sub="press, build-up, transition detection"/>
          <Feature t="Match Reports" sub="post-match analysis in hours, not days"/>
        </div>
      </div>

      <div style={{ position: 'absolute', right: 28, bottom: 22, font: '9.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.55)', letterSpacing: '.18em' }}>
        xG 0.42  ·  xT 0.18  ·  PPDA 11.4  ·  HSR 88m
      </div>
    </div>
  );
}

function HoloFrame({ children, magenta }: { children: ReactNode; magenta?: boolean }) {
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
      <span style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      {children}
    </div>
  );
}

function Feature({ t, sub }: { t: ReactNode; sub: ReactNode }) {
  return (
    <div style={{ padding: '10px 12px', background: 'rgba(148,226,192,.05)', border: '1px solid rgba(148,226,192,.18)' }}>
      <div style={{ font: '12.5px var(--rw-sans)', fontWeight: 600, color: '#fffaee', marginBottom: 4 }}>{t}</div>
      <div style={{ font: '10.5px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)', lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}
