import { Slot } from './_shared';
import type { PanelProps } from './UPDTPanel';

export function SoothePanel({ width = 760, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.15), transparent 60%), linear-gradient(180deg, #c4b89c 0%, #8a7e62 100%)',
      fontFamily: 'var(--rw-sans)',
    }}>
      {([[60, 90], [120, 180], [80, 320], [220, 60], [180, 240], [60, 460], [200, 500], [120, 620], [240, 700], [80, 740]] as Array<[number, number]>).map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 6, height: 4, borderRadius: '50%', background: i % 2 ? '#f5b6da' : '#e07ec3', opacity: .55, transform: `rotate(${(i * 37) % 360}deg)` }}/>
      ))}

      <div style={{ position: 'absolute', inset: '40px 40px 40px 40px', background: 'linear-gradient(180deg, #a89878 0%, #7a7064 100%)', borderRadius: 6, boxShadow: 'inset 0 0 30px rgba(0,0,0,.3), 0 12px 24px rgba(0,0,0,.4)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(0,0,0,.06) 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,.08) 1px, transparent 2px)', backgroundSize: '20px 20px, 28px 28px' }}/>

        <div style={{ position: 'absolute', left: 32, right: 32, top: 32, bottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: '#f6efd6', boxShadow: '0 12px 24px rgba(0,0,0,.4), inset 0 -10px 24px rgba(120,80,40,.18)', borderRadius: '4px' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 18, transform: 'translateX(-50%)', background: 'linear-gradient(90deg, transparent, rgba(80,50,20,.35), transparent)', pointerEvents: 'none' }}/>

          <div style={{ padding: '34px 30px 30px', position: 'relative' }}>
            <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Soothe · journal</div>
            <h2 style={{ font: 'italic 30px/1.05 var(--rw-serif)', margin: '4px 0 14px', color: '#2a1a0e' }}>What if a journal<br/>could listen back?</h2>
            <div style={{ font: '16px/1.55 "Caveat", cursive', color: '#2a1a0e' }}>
              <p style={{ margin: '0 0 6px' }}>· Cross-platform app — daily prompts, mood scoring, and gentle wellness suggestions.</p>
              <p style={{ margin: '0 0 6px' }}>· GPT-4 powers the prompt + analysis layer; Firebase, GCP App Engine, Firestore hold it together.</p>
              <p style={{ margin: '0 0 6px' }}>· 90%+ test coverage. CI/CD via GitHub Actions.</p>
              <p style={{ margin: '8px 0 4px', font: 'italic 14px var(--rw-serif)', color: '#5a3e20' }}>May — Jul 2025 · React Native · FastAPI · Firebase · GCP · GPT-4</p>
            </div>
            <div style={{ position: 'absolute', right: 14, bottom: 24, width: 36, height: 70, transform: 'rotate(20deg)' }}>
              <svg viewBox="0 0 36 70" width="36" height="70">
                <path d="M18 4 Q34 24 30 60 Q18 64 6 60 Q2 24 18 4 Z" fill="#7a8b4a" opacity=".7"/>
                <path d="M18 6 L18 60" stroke="#3a4e20" strokeWidth="1" opacity=".6"/>
                {[16, 26, 36, 46].map(y => <g key={y}>
                  <path d={`M18 ${y} Q26 ${y + 2} 28 ${y + 6}`} stroke="#3a4e20" strokeWidth=".5" fill="none" opacity=".5"/>
                  <path d={`M18 ${y} Q10 ${y + 2} 8 ${y + 6}`} stroke="#3a4e20" strokeWidth=".5" fill="none" opacity=".5"/>
                </g>)}
              </svg>
            </div>
          </div>

          <div style={{ padding: '34px 30px 30px', position: 'relative' }}>
            <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>· Pages from the app</div>

            <div style={{ position: 'relative', height: 'calc(100% - 24px)', marginTop: 14 }}>
              <div style={{ position: 'absolute', top: 0, left: 4, padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(-5deg)' }}>
                <Slot id="soothe-screen-1" w={120} h={210} placeholder="Soothe · home" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>morning prompt</div>
              </div>
              <div style={{ position: 'absolute', top: 30, right: 12, padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(6deg)' }}>
                <Slot id="soothe-screen-2" w={120} h={210} placeholder="Soothe · mood graph" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>mood arc</div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: '20%', padding: '10px 10px 30px', background: '#fffaee', boxShadow: '0 6px 12px rgba(0,0,0,.3)', transform: 'rotate(-2deg)' }}>
                <Slot id="soothe-screen-3" w={120} h={210} placeholder="Soothe · check-in" shape="rounded" radius={6}/>
                <div style={{ font: '13px "Caveat", cursive', color: '#2a1a0e', textAlign: 'center', marginTop: 4 }}>evening check-in</div>
              </div>
              <div style={{ position: 'absolute', top: 4, left: 30, width: 60, height: 18, background: 'rgba(220,205,160,.7)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(-12deg)' }}/>
              <div style={{ position: 'absolute', top: 24, right: 32, width: 60, height: 18, background: 'rgba(220,205,160,.7)', border: '1px dashed rgba(140,110,40,.5)', transform: 'rotate(10deg)' }}/>
            </div>
          </div>

          <div style={{ position: 'absolute', top: -6, right: 60, width: 24, height: 60, background: 'linear-gradient(180deg, #e07ec3, #b85aa0)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)', boxShadow: '2px 2px 4px rgba(0,0,0,.3)' }}/>
        </div>
      </div>
    </div>
  );
}
