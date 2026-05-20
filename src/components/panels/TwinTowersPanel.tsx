import type { ReactNode } from 'react';
import type { PanelProps } from './UPDTPanel';

export function TwinTowersPanel({ width = 760, height = 760 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'repeating-linear-gradient(12deg, #5a3a22 0 26px, #4a2e1c 26px 28px, #6a4628 28px 54px), #4a2e1c',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(245,217,122,.3), transparent 60%)' }}/>
      <Globe x={width - 150} y={height - 170} />
      <div style={{ position: 'absolute', left: 40, bottom: 40, width: 160, height: 64, background: 'linear-gradient(180deg, #6db862 0%, #4a8a48 100%)', border: '4px solid #2e2520', display: 'grid', placeItems: 'center', font: 'italic 36px var(--rw-serif)', color: '#fffaee', letterSpacing: '.12em', boxShadow: '0 6px 12px rgba(0,0,0,.5)', transform: 'rotate(-3deg)' }}>
        — Parthiv —
      </div>

      <div style={{ position: 'absolute', left: 32, top: 32, background: '#f6f1e4', padding: '10px 18px', font: 'italic 22px var(--rw-serif)', color: '#2a1a0e', boxShadow: '0 4px 12px rgba(0,0,0,.4)', transform: 'rotate(-2deg)' }}>
        <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Twin Towers · About</div>
        About me, in five photos
      </div>

      <Polaroid x={120} y={88} rotate={6} caption="KL · Petronas · home base"><SilhouetteTwinTowers/></Polaroid>
      <Polaroid x={300} y={120} rotate={-4} caption="Tech Square · Atlanta"><SilhouetteCollegiate/></Polaroid>
      <Polaroid x={480} y={92} rotate={3} caption="UPDT · ScoutPro dashboard"><SilhouetteDashboard/></Polaroid>
      <Polaroid x={170} y={340} rotate={-7} caption="On the pitch · data → decisions"><SilhouetteField/></Polaroid>
      <Polaroid x={400} y={360} rotate={2} caption="Hello — I'm Parthiv"><PortraitMini/></Polaroid>

      <div style={{
        position: 'absolute', right: 24, top: 200, width: 260, padding: '20px 22px 24px',
        background: 'linear-gradient(180deg, #fbf3da, #f1e6c0)',
        boxShadow: '0 6px 14px rgba(0,0,0,.45)',
        transform: 'rotate(4deg)',
        font: '15px/1.55 "Caveat", var(--rw-serif)',
        color: '#2a1a0e',
      }}>
        Hey, I'm Parthiv. CS @ Georgia Tech (Dec '26), CTO of UPDT.<br/>
        Grew up between Kuala Lumpur and Atlanta. I build things at the seam of <em>sports, AI, and product</em>.<br/><br/>
        Most of my work comes from the same instinct: data should turn into decisions.<br/>
        <span style={{ display: 'inline-block', marginTop: 6, font: 'italic 18px var(--rw-serif)' }}>— Parthiv Farazi</span>
      </div>
    </div>
  );
}

function Polaroid({ x, y, rotate = 0, caption, children }: { x: number; y: number; rotate?: number; caption: ReactNode; children: ReactNode }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: 180, padding: '10px 10px 36px',
      background: '#f6f1e4', boxShadow: '0 8px 18px rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.3)',
      transform: `rotate(${rotate}deg)`, transformOrigin: 'center',
    }}>
      <div style={{ width: 160, height: 160, background: '#1a1410', overflow: 'hidden' }}>{children}</div>
      <div style={{ font: '15px "Caveat", var(--rw-serif)', color: '#2a1a0e', textAlign: 'center', marginTop: 8 }}>{caption}</div>
    </div>
  );
}

function SilhouetteTwinTowers() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="tts-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd4a3"/>
          <stop offset="60%" stopColor="#e3c5e1"/>
          <stop offset="100%" stopColor="#b3dfd7"/>
        </linearGradient>
        <linearGradient id="tts-spire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfd8dc"/>
          <stop offset="100%" stopColor="#475158"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="url(#tts-sky)" />
      <circle cx="40" cy="38" r="12" fill="#fff1c8" opacity=".7"/>
      <path d="M48 158 L50 60 L52 50 L56 42 L60 50 L62 60 L62 158 Z" fill="url(#tts-spire)" />
      <path d="M56 36 L56 8" stroke="#cfd8dc" strokeWidth="2"/>
      <path d="M98 158 L100 60 L102 50 L106 42 L110 50 L112 60 L112 158 Z" fill="url(#tts-spire)" />
      <path d="M106 36 L106 8" stroke="#cfd8dc" strokeWidth="2"/>
      <rect x="60" y="92" width="42" height="6" fill="#2e3338" />
      <rect x="60" y="89" width="42" height="3" fill="#cfd8dc" />
      {Array.from({ length: 12 }).map((_, i) => <rect key={`l${i}`} x="50" y={68 + i * 7} width="12" height="3" fill="#f5d97a" opacity=".85"/>)}
      {Array.from({ length: 12 }).map((_, i) => <rect key={`r${i}`} x="100" y={68 + i * 7} width="12" height="3" fill="#f5d97a" opacity=".85"/>)}
      <rect x="0" y="148" width="160" height="12" fill="#3a4a3e"/>
    </svg>
  );
}

function SilhouetteCollegiate() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#5a8a98"/>
      <circle cx="125" cy="35" r="14" fill="#fff1c8" opacity=".7"/>
      <rect x="64" y="40" width="32" height="118" fill="#a8553c"/>
      <rect x="60" y="60" width="40" height="4" fill="#f6f1e4"/>
      <rect x="60" y="118" width="40" height="4" fill="#f6f1e4"/>
      <rect x="58" y="30" width="44" height="14" fill="#6e4a2a"/>
      <rect x="62" y="24" width="36" height="8" fill="#b3a369"/>
      <text x="80" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fontWeight="700" fill="#2a1a0e" letterSpacing="2">PF</text>
      <path d="M76 24 L80 6 L84 24 Z" fill="#1a1410"/>
      <circle cx="80" cy="78" r="9" fill="#f6f1e4" stroke="#1a1410" strokeWidth="1"/>
      <line x1="80" y1="78" x2="80" y2="72" stroke="#1a1410" strokeWidth="1"/>
      <line x1="80" y1="78" x2="85" y2="80" stroke="#1a1410" strokeWidth="1"/>
      {[100,118,138].map((y, i) => <rect key={i} x="72" y={y} width="16" height="6" fill="#f5d97a"/>)}
      <rect x="0" y="148" width="160" height="12" fill="#6db862"/>
    </svg>
  );
}

function SilhouetteDashboard() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#0e1820"/>
      <rect x="8" y="8" width="144" height="20" fill="#162536" stroke="#6fd5e0" strokeWidth=".5"/>
      <text x="14" y="22" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#6fd5e0">SCOUTPRO · U23 ATTACK · /search</text>
      <rect x="8" y="34" width="86" height="84" fill="#0a141c" stroke="#6fd5e0" strokeWidth=".5"/>
      {Array.from({ length: 18 }).map((_, i) => (
        <circle key={i} cx={14 + (i * 11) % 76} cy={42 + ((i * 17) % 64)} r="2" fill={i % 5 === 0 ? '#e07ec3' : '#6fd5e0'} opacity={.6 + (i % 3) * .15}/>
      ))}
      <rect x="100" y="34" width="52" height="84" fill="#162536" stroke="#6fd5e0" strokeWidth=".5"/>
      <rect x="106" y="40" width="40" height="22" fill="#1f3344"/>
      <text x="106" y="74" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#94e2c0">PLAYER · 2K7</text>
      <text x="106" y="84" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#f6f1e4">xG 0.42 · xA 0.18</text>
      <text x="106" y="94" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#f6f1e4">Press 88 · Dist 11.2</text>
      <rect x="106" y="100" width="40" height="3" fill="#6fd5e0"/>
      <rect x="106" y="106" width="28" height="3" fill="#e07ec3"/>
      <rect x="8" y="124" width="144" height="28" fill="#0a141c" stroke="#6fd5e0" strokeWidth=".5"/>
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={10 + i * 4.6} y={128} width="3.4" height="20" fill={`hsl(${30 + (Math.sin(i) * .5 + .5) * 180}, 80%, 55%)`} opacity=".8"/>
      ))}
    </svg>
  );
}

function SilhouetteField() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <rect width="160" height="160" fill="#5a9558"/>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={i * 18} y="0" width="9" height="160" fill={i % 2 ? '#4f8b4f' : '#5a9558'}/>
      ))}
      <circle cx="80" cy="80" r="22" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      <circle cx="80" cy="80" r="2" fill="#f6f1e4"/>
      <rect x="78.5" y="0" width="3" height="160" fill="#f6f1e4" opacity=".7"/>
      <rect x="0" y="40" width="40" height="80" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      <rect x="120" y="40" width="40" height="80" fill="none" stroke="#f6f1e4" strokeWidth="1.5"/>
      <circle cx="50" cy="70" r="14" fill="#e07ec3" opacity=".4"/>
      <circle cx="100" cy="90" r="10" fill="#f5d97a" opacity=".5"/>
      <circle cx="120" cy="60" r="8" fill="#6fd5e0" opacity=".5"/>
    </svg>
  );
}

function PortraitMini() {
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <defs>
        <linearGradient id="pm-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd4a3"/>
          <stop offset="100%" stopColor="#e3c5e1"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="url(#pm-bg)"/>
      <ellipse cx="80" cy="160" rx="62" ry="34" fill="#f6f1e4"/>
      <rect x="50" y="120" width="60" height="40" fill="#f6f1e4"/>
      <rect x="78" y="120" width="4" height="40" fill="#dcd3bf"/>
      <ellipse cx="80" cy="86" rx="28" ry="32" fill="#d9a779"/>
      <path d="M52 76 Q52 50 80 46 Q108 50 108 76 Q108 64 102 60 Q90 50 80 52 Q70 50 58 60 Q52 64 52 76 Z" fill="#1a1410"/>
      <path d="M58 88 Q58 110 70 116 Q80 122 90 116 Q102 110 102 88 Q92 96 80 96 Q68 96 58 88 Z" fill="#241a14"/>
      <ellipse cx="70" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      <ellipse cx="90" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      <path d="M70 104 Q80 108 90 104" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <rect x="110" y="138" width="14" height="5" fill="#d4c178"/>
    </svg>
  );
}

function Globe({ x, y }: { x: number; y: number }) {
  return (
    <svg viewBox="0 0 120 130" width="120" height="130" style={{ position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,.5))' }}>
      <rect x="44" y="106" width="32" height="6" fill="#3a2410"/>
      <rect x="52" y="112" width="16" height="14" fill="#3a2410"/>
      <ellipse cx="60" cy="60" rx="48" ry="48" fill="none" stroke="#b3a369" strokeWidth="2"/>
      <circle cx="60" cy="60" r="40" fill="#5a9598" />
      <path d="M30 40 Q40 32 52 36 Q66 32 78 42 Q88 52 84 64 Q92 72 86 84 Q70 90 56 84 Q44 88 32 78 Q24 64 28 52 Z" fill="#6db862"/>
      <path d="M40 56 Q52 50 62 56 Q72 62 68 70 Q60 74 48 70 Q40 66 40 56 Z" fill="#4a8a48"/>
      <circle cx="78" cy="60" r="4" fill="#e07ec3" stroke="#fff" strokeWidth="1"/>
      <text x="82" y="62" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#fff">KL</text>
      <circle cx="42" cy="48" r="4" fill="#6fd5e0" stroke="#fff" strokeWidth="1"/>
      <text x="22" y="50" fontFamily="JetBrains Mono,monospace" fontSize="6" fill="#fff">ATL</text>
      <path d="M42 48 Q58 22 78 60" stroke="#f5d97a" strokeWidth="1.4" fill="none" strokeDasharray="2 3"/>
    </svg>
  );
}
