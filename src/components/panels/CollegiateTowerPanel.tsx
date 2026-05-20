import { useMemo } from 'react';
import type { PanelProps } from './UPDTPanel';

export function CollegiateTowerPanel({ width = 720, height = 760 }: PanelProps) {
  const courses = [
    'Data Structures', 'Algorithms', 'Discrete Math', 'Object-Oriented Programming', 'Operating Systems',
    'Algorithm Design', 'Software Engineering', 'Linear Algebra',
    'Machine Learning', 'Artificial Intelligence', 'Combinatorics',
    'Systems & Networks', 'Cognitive Science',
  ];
  return (
    <div style={{ width, height, position: 'relative', background: 'radial-gradient(ellipse at 50% 40%, rgba(20,15,8,.45), rgba(0,0,0,.7))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <Motes count={14} />
      <div style={{ position: 'relative', width: width - 80, height: height - 80 }}>
        <Dowel y={0} />
        <Dowel y={height - 80 - 22} />

        <div style={{
          position: 'absolute', left: 28, right: 28, top: 18, bottom: 18,
          background: 'radial-gradient(ellipse at 50% 50%, #f4e7c4 0%, #ecd9a8 70%, #d8c285 100%)',
          boxShadow: '0 18px 48px rgba(0,0,0,.5), inset 0 0 60px rgba(140,100,40,.25)',
          padding: '48px 60px 60px',
          fontFamily: 'var(--rw-serif)',
          color: '#3a2818',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.18), transparent 40%), radial-gradient(ellipse at 0% 100%, rgba(120,70,20,.16), transparent 40%)' }}/>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}><Flourish/></div>
          <div style={{ textAlign: 'center', font: '11px var(--rw-mono)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30' }}>
            Collegiate Tower · Education
          </div>
          <h1 style={{ font: 'italic 56px/1 var(--rw-serif)', margin: '14px 0 6px', textAlign: 'center', color: '#2a1a0e' }}>
            Georgia Institute<br/>of Technology
          </h1>
          <div style={{ textAlign: 'center', font: '14px var(--rw-mono)', color: '#7a5a30', marginBottom: 18 }}>
            BSc in Computer Science
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}><Flourish narrow/></div>

          <div style={{ font: '20px/1.5 var(--rw-serif)', textAlign: 'center', color: '#2a1a0e', margin: '0 auto 18px', maxWidth: 460 }}>
            Threads<br/>
            <em style={{ font: '17px var(--rw-serif)', color: '#5a3e20' }}>Intelligence · Modelling and Simulation</em><br/>
            <span style={{ font: '14px var(--rw-mono)', color: '#7a5a30' }}>Expected · December 2026</span>
          </div>

          <div style={{ borderTop: '1px solid #b89860', borderBottom: '1px solid #b89860', padding: '14px 0', margin: '8px 0 20px' }}>
            <div style={{ textAlign: 'center', font: '10px var(--rw-mono)', letterSpacing: '.32em', textTransform: 'uppercase', color: '#7a5a30', marginBottom: 8 }}>
              · Coursework ·
            </div>
            <div style={{ columnCount: 2, columnGap: 32, font: '14.5px/1.7 var(--rw-serif)', color: '#3a2818' }}>
              {courses.map((c, i) => (
                <div key={c} style={{ breakInside: 'avoid', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>{c}</span>
                  <span style={{ font: '11px var(--rw-mono)', color: '#a07a40' }}>{String(i + 1).padStart(2,'0')}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12 }}>
            <div>
              <div style={{ font: '32px/1 "Caveat", var(--rw-serif)', color: '#2a1a0e' }}>Parthiv Farazi</div>
              <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30', marginTop: 4 }}>
                Candidate · cs · atl
              </div>
            </div>
            <WaxSeal/>
          </div>
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, top: 24, height: 16, background: 'linear-gradient(to bottom, rgba(0,0,0,.25), transparent)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 26, height: 16, background: 'linear-gradient(to top, rgba(0,0,0,.25), transparent)', pointerEvents: 'none' }}/>
      </div>
    </div>
  );
}

function Dowel({ y }: { y: number }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: y, height: 22, display: 'flex' }}>
      <div style={{ width: 30, height: 22, background: 'radial-gradient(ellipse at 30% 40%, #c89860, #5a3a18 70%)', borderRadius: '50%' }}/>
      <div style={{ flex: 1, height: 22, background: 'linear-gradient(180deg, #8a5a28, #5a3a18 50%, #3a2410)', borderTop: '1px solid #c89860', borderBottom: '1px solid #2a1808', boxShadow: 'inset 0 -4px 8px rgba(0,0,0,.5)' }}/>
      <div style={{ width: 30, height: 22, background: 'radial-gradient(ellipse at 70% 40%, #c89860, #5a3a18 70%)', borderRadius: '50%' }}/>
    </div>
  );
}

function Flourish({ narrow }: { narrow?: boolean }) {
  return (
    <svg viewBox="0 0 240 24" width={narrow ? 160 : 240} height="24" style={{ display: 'block', color: '#7a5a30' }}>
      <path d="M2 12 L80 12" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M158 12 L238 12" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M80 12 Q90 4 100 12 Q110 20 120 12 Q130 4 140 12 Q150 20 160 12" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="120" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

function WaxSeal() {
  return (
    <div style={{ width: 96, height: 96, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,20,.4), transparent 65%)', filter: 'blur(4px)' }}/>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #d35a4a 0%, #9a2a1a 60%, #5a1208 100%)',
        boxShadow: 'inset 0 -8px 12px rgba(0,0,0,.5), inset 0 4px 8px rgba(255,180,160,.45), 0 4px 10px rgba(0,0,0,.4)',
        display: 'grid', placeItems: 'center',
      }}>
        <div style={{ font: 'italic 30px var(--rw-serif)', color: '#3a0a04', letterSpacing: '-.02em', textShadow: '0 1px 0 rgba(255,200,180,.4)' }}>PF</div>
      </div>
      <div style={{ position: 'absolute', left: 36, bottom: -8, width: 22, height: 18, background: 'radial-gradient(ellipse at top, #9a2a1a 30%, #5a1208 100%)', borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%' }}/>
    </div>
  );
}

function Motes({ count = 12 }: { count?: number }) {
  const motes = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      left: (Math.sin(i * 4.21) * 0.5 + 0.5) * 100,
      top: (Math.cos(i * 3.13) * 0.5 + 0.5) * 100,
      size: 1 + (i % 4),
      delay: i * 0.5,
    }))
  ), [count]);
  return (
    <>
      <style>{`
        @keyframes mote-drift { 0%,100% { transform: translate(0,0); opacity: .3 } 50% { transform: translate(8px, -14px); opacity: .8 } }
      `}</style>
      {motes.map((m, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${m.left}%`, top: `${m.top}%`,
          width: m.size, height: m.size, borderRadius: '50%',
          background: '#f5d97a', opacity: .5, pointerEvents: 'none',
          animation: `mote-drift ${5 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${m.delay}s`,
        }}/>
      ))}
    </>
  );
}
