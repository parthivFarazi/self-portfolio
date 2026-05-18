import type { ReactNode } from 'react';
import { Slot } from './_shared';
import type { PanelProps } from './UPDTPanel';
import { panelImages } from './panelImages';

export function WorkshopPanel({ width = 760, height = 780 }: PanelProps) {
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
      <div style={{ position: 'absolute', inset: 12, border: '14px solid #5a3a18', borderRadius: 4, boxShadow: 'inset 0 0 24px rgba(0,0,0,.35)' }}/>

      <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%) rotate(-1deg)', padding: '8px 18px', background: '#3a2410', color: '#f5d97a', font: '20px "Caveat", cursive', boxShadow: '0 4px 8px rgba(0,0,0,.4)' }}>
        <Pin x="left"/><Pin x="right"/>
        where it all started · 2021
      </div>

      <div style={{ position: 'absolute', left: 60, top: 110, width: width - 360, height: height - 180, background: '#1f3a5c', boxShadow: '0 12px 24px rgba(0,0,0,.45)', padding: 18, transform: 'rotate(-1deg)' }}>
        <Pin x="left"/><Pin x="right"/>
        <div style={{ position: 'absolute', inset: 14, backgroundImage: 'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>

        <div style={{ position: 'relative', color: '#cfe4ff', font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
          <span>P. Farazi · model 01 · litter unit</span>
          <span>KL · 2021 · DWG—001</span>
        </div>
        <h2 style={{ position: 'relative', font: 'italic 36px/1 var(--rw-serif)', margin: '8px 0 2px', color: '#fffaee' }}>The robot,<br/>in three views.</h2>
        <div style={{ position: 'relative', font: '11px "JetBrains Mono", monospace', color: 'rgba(207,228,255,.65)' }}>C++ · Arduino IDE · TinkerCAD · Fusion 360</div>

        <div style={{ position: 'relative', marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <BluprintView label="Front" callouts={[['solar panel', '↑'], ['sensor', '→']]}>
            <Slot id="robot-view-front" w={120} h={140} placeholder="robot · front photo" shape="rect" fit="contain" src={panelImages.robot.frontView}/>
          </BluprintView>
          <BluprintView label="Side" callouts={[['drive wheel', '↓'], ['arm', '→']]}>
            <Slot id="robot-view-side" w={120} h={140} placeholder="robot · side photo" shape="rect" fit="contain" src={panelImages.robot.sideView}/>
          </BluprintView>
          <BluprintView label="Circuit" callouts={[['frame · Al', '↑'], ['MCU', '→']]}>
            <Slot id="robot-view-top" w={120} h={140} placeholder="robot · top photo" shape="rect" fit="contain" src={panelImages.robot.circuitDiagram}/>
          </BluprintView>
        </div>

        <div style={{ position: 'relative', marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid rgba(255,255,255,.3)', color: '#cfe4ff', font: '10.5px "JetBrains Mono", monospace' }}>
          <SpecCell label="POWER" v="SOLAR · 6V"/>
          <SpecCell label="DRIVE" v="2 × DC GEAR"/>
          <SpecCell label="MCU" v="ARDUINO UNO"/>
          <SpecCell label="LOAD" v="≈ 2 LB / DAY"/>
        </div>
      </div>

      <div style={{ position: 'absolute', right: 36, top: 110, width: 240, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: '10px 10px 32px', background: '#fffaee', boxShadow: '0 8px 16px rgba(0,0,0,.4)', transform: 'rotate(3deg)', position: 'relative' }}>
          <Pin x="center"/>
          <Slot id="robot-action" w={220} h={220} placeholder="robot on the field · photo" shape="rect" fit="contain" src={panelImages.robot.action}/>
          <div style={{ font: '15px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>demo  · weekend 01</div>
        </div>

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

function Pin({ x = 'center' }: { x?: 'left' | 'right' | 'center' }) {
  const left = x === 'left' ? 10 : x === 'right' ? 'calc(100% - 18px)' : '50%';
  const tr = x === 'center' ? 'translateX(-50%)' : 'none';
  return (
    <div style={{ position: 'absolute', top: -6, left, transform: tr, width: 10, height: 10, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #ff5a3a, #8a1a14)', boxShadow: '0 1px 2px rgba(0,0,0,.5), inset 0 -2px 2px rgba(0,0,0,.5)', zIndex: 5 }}/>
  );
}

function BluprintView({ label, callouts = [], children }: { label: ReactNode; callouts?: Array<[string, string]>; children: ReactNode }) {
  return (
    <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.35)', padding: 8, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', font: '9.5px "JetBrains Mono", monospace', color: '#cfe4ff', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>
        <span>view · {label}</span>
        <span>1:8</span>
      </div>
      <div style={{ position: 'relative' }}>{children}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
        {callouts.map(([t, a], i) => (
          <span key={i} style={{ font: '9px "JetBrains Mono", monospace', letterSpacing: '.06em', color: '#cfe4ff', padding: '2px 6px', border: '1px solid rgba(255,255,255,.4)', borderRadius: 999 }}>{a} {t}</span>
        ))}
      </div>
    </div>
  );
}

function SpecCell({ label, v }: { label: ReactNode; v: ReactNode }) {
  return (
    <div style={{ padding: '8px 10px', borderRight: '1px solid rgba(255,255,255,.3)' }}>
      <div style={{ font: '9px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(207,228,255,.55)' }}>{label}</div>
      <div style={{ font: '12px "JetBrains Mono", monospace', color: '#fffaee', marginTop: 2 }}>{v}</div>
    </div>
  );
}
