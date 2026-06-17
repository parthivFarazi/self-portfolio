import type { ReactNode } from 'react';
import type { PanelProps } from './UPDTPanel';

export function PetronasTowersPanel({ width = 900, height = 820 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'repeating-linear-gradient(12deg, #5a3a22 0 26px, #4a2e1c 26px 28px, #6a4628 28px 54px), #4a2e1c',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(245,217,122,.3), transparent 60%)' }}/>

      {/* Title card — top-left, kept clear of every photo */}
      <div style={{ position: 'absolute', left: 32, top: 32, width: 300, background: '#f6f1e4', padding: '12px 20px 14px', font: 'italic 24px var(--rw-serif)', color: '#2a1a0e', boxShadow: '0 4px 12px rgba(0,0,0,.4)', transform: 'rotate(-2deg)', zIndex: 4 }}>
        <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.18em', textTransform: 'uppercase', color: '#7a5a30' }}>Petronas Towers · About</div>
        About me, in six snapshots
        <div style={{ font: '16px/1.45 var(--rw-sans, system-ui)', color: 'rgba(42,26,14,.74)', fontStyle: 'normal', marginTop: 6 }}>
          Who I am, where I'm from, and what I build.
        </div>
      </div>

      {/* Bio note — top-right */}
      <div style={{
        position: 'absolute', right: 32, top: 30, width: 280, padding: '20px 22px 24px',
        background: 'linear-gradient(180deg, #fbf3da, #f1e6c0)',
        boxShadow: '0 6px 14px rgba(0,0,0,.45)',
        transform: 'rotate(3deg)',
        font: '16px/1.55 "Caveat", var(--rw-serif)',
        color: '#2a1a0e',
        zIndex: 4,
      }}>
        Hey, I'm Parthiv. CS @ Georgia Tech (Dec '26), CTO of UPDT.<br/>
        Born in Jashore, Khulna, Bangladesh,<br/>
        raised in Kuala Lumpur, Malaysia,<br/>
        I now build from Atlanta at the seam of <em>sports, AI, and product</em>.<br/><br/>
        Most of my work comes from the same instinct: data should turn into decisions.<br/>
        <span style={{ display: 'inline-block', marginTop: 6, font: 'italic 19px var(--rw-serif)' }}>— Parthiv Farazi</span>
      </div>

      {/* Six scattered snapshots — loose rows, every caption left clear */}
      <Polaroid x={40} y={200} rotate={-5} caption="KL · Petronas · home base"><SilhouettePetronasTowers/></Polaroid>
      <Polaroid x={250} y={172} rotate={4} caption="Tech Square · Atlanta"><SilhouetteCollegiate/></Polaroid>
      <Polaroid x={455} y={196} rotate={-3} caption="UPDT · ScoutPro dashboard"><SilhouetteDashboard/></Polaroid>
      <Polaroid x={655} y={378} rotate={4} caption="Jashore, Khulna"><RoyalBengalTiger/></Polaroid>
      <Polaroid x={120} y={470} rotate={-7} caption="On the pitch · data → decisions"><SilhouetteField/></Polaroid>
      <Polaroid x={360} y={452} rotate={3} caption="Hello — I'm Parthiv"><PortraitMini/></Polaroid>

      {/* — Parthiv — wooden tag, bottom-left */}
      <div style={{ position: 'absolute', left: 44, bottom: 44, width: 180, height: 70, background: 'linear-gradient(180deg, #6db862 0%, #4a8a48 100%)', border: '4px solid #2e2520', display: 'grid', placeItems: 'center', font: 'italic 26px/1 var(--rw-serif)', color: '#fffaee', letterSpacing: '.04em', boxShadow: '0 6px 12px rgba(0,0,0,.5)', transform: 'rotate(-3deg)', padding: '0 10px', textAlign: 'center', zIndex: 4 }}>
        — Parthiv —
      </div>

      <Globe x={width - 210} y={height - 230} />
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
      <div style={{ font: '17px "Caveat", var(--rw-serif)', color: '#2a1a0e', textAlign: 'center', marginTop: 8 }}>{caption}</div>
    </div>
  );
}

function SilhouettePetronasTowers() {
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

function RoyalBengalTiger({ size = 160 }: { size?: number }) {
  return (
    <svg viewBox="0 0 160 160" width={size} height={size}>
      <defs>
        <linearGradient id="rbt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f5138"/>
          <stop offset="62%" stopColor="#4f8b4f"/>
          <stop offset="100%" stopColor="#8a7a3c"/>
        </linearGradient>
        <linearGradient id="rbt-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5a33a"/>
          <stop offset="100%" stopColor="#b85a22"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="url(#rbt-bg)"/>
      <circle cx="122" cy="34" r="20" fill="#d8242f" opacity=".9"/>
      <path d="M0 126 Q34 116 64 128 Q98 142 160 122 L160 160 L0 160 Z" fill="#325f42" opacity=".9"/>
      <path d="M0 138 Q38 130 78 139 Q118 149 160 133 L160 160 L0 160 Z" fill="#6fae73" opacity=".65"/>
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M${6 + i * 18} 132 Q${10 + i * 18} 116 ${14 + i * 18} 132`}
          stroke="#1f4a31"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity=".65"
        />
      ))}
      <g transform="translate(80 82)">
        <path d="M-41 -18 Q-48 -43 -28 -47 Q-16 -40 -18 -26 Z" fill="url(#rbt-fur)"/>
        <path d="M41 -18 Q48 -43 28 -47 Q16 -40 18 -26 Z" fill="url(#rbt-fur)"/>
        <path d="M-33 -22 Q-37 -36 -28 -38 Q-21 -34 -23 -25 Z" fill="#2a1a0e"/>
        <path d="M33 -22 Q37 -36 28 -38 Q21 -34 23 -25 Z" fill="#2a1a0e"/>
        <ellipse cx="0" cy="-2" rx="42" ry="46" fill="url(#rbt-fur)"/>
        <path d="M-33 -10 Q-20 -20 -8 -17 Q-15 -4 -33 -10 Z" fill="#ffcf87"/>
        <path d="M33 -10 Q20 -20 8 -17 Q15 -4 33 -10 Z" fill="#ffcf87"/>
        <path d="M-20 11 Q-9 5 0 13 Q9 5 20 11 Q20 32 0 35 Q-20 32 -20 11 Z" fill="#fff0c9"/>
        <path d="M-3 10 L3 10 L0 16 Z" fill="#1a1410"/>
        <path d="M-28 -12 Q-22 -18 -16 -14" stroke="#1a1410" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M28 -12 Q22 -18 16 -14" stroke="#1a1410" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <ellipse cx="-17" cy="-8" rx="2.4" ry="3" fill="#1a1410"/>
        <ellipse cx="17" cy="-8" rx="2.4" ry="3" fill="#1a1410"/>
        <path d="M-4 16 Q0 19 4 16" stroke="#1a1410" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M-14 24 Q0 31 14 24" stroke="#1a1410" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".65"/>
        <path d="M-7 -44 L0 -24 L7 -44" stroke="#1a1410" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M-32 -26 L-18 -22" stroke="#1a1410" strokeWidth="4" strokeLinecap="round"/>
        <path d="M32 -26 L18 -22" stroke="#1a1410" strokeWidth="4" strokeLinecap="round"/>
        <path d="M-39 -3 L-23 1" stroke="#1a1410" strokeWidth="4" strokeLinecap="round"/>
        <path d="M39 -3 L23 1" stroke="#1a1410" strokeWidth="4" strokeLinecap="round"/>
        <path d="M-35 18 L-20 15" stroke="#1a1410" strokeWidth="3.4" strokeLinecap="round"/>
        <path d="M35 18 L20 15" stroke="#1a1410" strokeWidth="3.4" strokeLinecap="round"/>
        <path d="M-19 13 L-45 8 M-19 17 L-45 18 M19 13 L45 8 M19 17 L45 18" stroke="#fff6d9" strokeWidth="1.1" strokeLinecap="round"/>
      </g>
      <rect x="11" y="11" width="76" height="17" rx="3" fill="rgba(255,250,238,.88)"/>
      <text x="49" y="23" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill="#0f5138" letterSpacing="1.5">BANGLADESH</text>
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
      <path d="M52 76 Q54 52 80 48 Q106 52 108 76 Q100 62 80 60 Q60 62 52 76 Z" fill="#1a1410"/>
      <ellipse cx="70" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      <ellipse cx="90" cy="88" rx="2" ry="2.6" fill="#1a1410"/>
      <path d="M66 101 Q80 118 94 101" stroke="#1a1410" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
      <rect x="110" y="138" width="14" height="5" fill="#d4c178"/>
    </svg>
  );
}

function Globe({ x, y }: { x: number; y: number }) {
  return (
    <svg viewBox="0 0 120 138" width="210" height="242" style={{ position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 6px 8px rgba(0,0,0,.5))' }}>
      <rect x="44" y="106" width="32" height="6" fill="#3a2410"/>
      <rect x="52" y="112" width="16" height="14" fill="#3a2410"/>
      <ellipse cx="60" cy="60" rx="48" ry="48" fill="none" stroke="#b3a369" strokeWidth="2"/>
      <circle cx="60" cy="60" r="40" fill="#5a9598" />
      <path d="M30 40 Q40 32 52 36 Q66 32 78 42 Q88 52 84 64 Q92 72 86 84 Q70 90 56 84 Q44 88 32 78 Q24 64 28 52 Z" fill="#6db862"/>
      <path d="M40 56 Q52 50 62 56 Q72 62 68 70 Q60 74 48 70 Q40 66 40 56 Z" fill="#4a8a48"/>
      <path d="M42 48 Q58 22 78 60" stroke="#f5d97a" strokeWidth="1.6" fill="none" strokeDasharray="3 3"/>
      {/* BD origin pin + label */}
      <circle cx="68" cy="45" r="4.5" fill="#d8242f" stroke="#fff" strokeWidth="1.3"/>
      <text x="70" y="38" fontFamily="JetBrains Mono,monospace" fontSize="8" fontWeight="700" fill="#fff" paintOrder="stroke" stroke="#2a1a0e" strokeWidth="0.7">BD</text>
      {/* KL pin + label */}
      <circle cx="78" cy="60" r="5" fill="#e07ec3" stroke="#fff" strokeWidth="1.4"/>
      <text x="80" y="74" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#fff" paintOrder="stroke" stroke="#2a1a0e" strokeWidth="0.7">KL</text>
      {/* ATL pin + label */}
      <circle cx="42" cy="48" r="5" fill="#6fd5e0" stroke="#fff" strokeWidth="1.4"/>
      <text x="14" y="42" fontFamily="JetBrains Mono,monospace" fontSize="9" fontWeight="700" fill="#fff" paintOrder="stroke" stroke="#2a1a0e" strokeWidth="0.7">ATL</text>
    </svg>
  );
}
