export type ThumbKind =
  | 'updt'
  | 'qard'
  | 'rmaict'
  | 'pong'
  | 'football'
  | 'archive'
  | 'zen'
  | 'heatmap'
  | 'workshop'
  | 'about'
  | 'edu'
  | 'forge'
  | 'lighthouse'
  | 'gba';

interface ThumbProps {
  kind: ThumbKind;
  w?: string | number;
  h?: string | number;
}

function ThumbDefs() {
  return (
    <defs>
      <linearGradient id="dt-cream" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f9efd1" />
        <stop offset="100%" stopColor="#e6d5a8" />
      </linearGradient>
      <linearGradient id="dt-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd9a8" />
        <stop offset="100%" stopColor="#f3c6c0" />
      </linearGradient>
      <linearGradient id="dt-brick" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bc6048" />
        <stop offset="100%" stopColor="#7a3a28" />
      </linearGradient>
      <linearGradient id="dt-silver" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8eef2" />
        <stop offset="100%" stopColor="#6a7480" />
      </linearGradient>
      <linearGradient id="dt-mint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dff4e8" />
        <stop offset="100%" stopColor="#5fa896" />
      </linearGradient>
      <linearGradient id="dt-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7eb86a" />
        <stop offset="100%" stopColor="#4a8a48" />
      </linearGradient>
      <linearGradient id="dt-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a5234" />
        <stop offset="100%" stopColor="#3a2410" />
      </linearGradient>
      <radialGradient id="dt-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff1c8" />
        <stop offset="100%" stopColor="#f5d97a" stopOpacity="0" />
      </radialGradient>
      <pattern id="dt-cobble" width="16" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 4 H16 M8 0 V4 M4 4 V8 M12 4 V8" stroke="#9e8b66" strokeWidth=".45" opacity=".35" />
      </pattern>
    </defs>
  );
}

export function Thumb({ kind, w = 200, h = 140 }: ThumbProps) {
  return (
    <svg viewBox="0 0 200 140" width={w} height={h} className="qv-thumb" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <ThumbDefs />
      <rect x="0" y="0" width="200" height="100" fill="url(#dt-sky)" opacity=".8" />
      <circle cx="170" cy="32" r="16" fill="#fff1c8" opacity=".7" />
      <rect x="0" y="100" width="200" height="40" fill="url(#dt-grass)" />
      <path d="M0 100 Q100 96 200 100 L200 102 Q100 98 0 102 Z" fill="#a8d49f" opacity=".5" />
      <rect x="0" y="120" width="200" height="8" fill="#c8b585" />
      <rect x="0" y="120" width="200" height="8" fill="url(#dt-cobble)" opacity=".9" />
      <g>{thumbBody(kind)}</g>
    </svg>
  );
}

function thumbBody(kind: ThumbKind) {
  switch (kind) {
    case 'updt':
      return (
        <>
          <ellipse cx="100" cy="98" rx="64" ry="14" fill="#3a4652" />
          <ellipse cx="100" cy="92" rx="60" ry="12" fill="url(#dt-mint)" opacity=".85" />
          <ellipse cx="100" cy="92" rx="60" ry="12" fill="none" stroke="#2a2520" strokeWidth=".6" />
          <ellipse cx="100" cy="88" rx="48" ry="8" fill="#5a9558" />
          <line x1="100" y1="80" x2="100" y2="96" stroke="#fffaee" strokeWidth=".7" />
          <ellipse cx="100" cy="88" rx="6" ry="2" fill="none" stroke="#fffaee" strokeWidth=".7" />
          <circle cx="86" cy="89" r="1.5" fill="#e07ec3" />
          <circle cx="98" cy="87" r="1.5" fill="#6fd5e0" />
          <circle cx="112" cy="89" r="1.5" fill="#6fd5e0" />
          <line x1="44" y1="80" x2="44" y2="60" stroke="#1a1410" strokeWidth="1" />
          <rect x="40" y="56" width="8" height="5" fill="#fff1c8" />
          <line x1="156" y1="80" x2="156" y2="60" stroke="#1a1410" strokeWidth="1" />
          <rect x="152" y="56" width="8" height="5" fill="#fff1c8" />
          <rect x="80" y="74" width="40" height="10" rx="2" fill="#0e1820" />
          <text x="100" y="82" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="7" fontWeight="900" fill="#94e2c0" letterSpacing="2">UPDT.</text>
        </>
      );
    case 'qard':
      return (
        <>
          <path d="M40 100 Q40 60 100 50 Q160 60 160 100 Z" fill="url(#dt-mint)" opacity=".85" />
          <path d="M40 100 Q40 60 100 50 Q160 60 160 100 Z" fill="none" stroke="#3a6a5a" strokeWidth=".7" />
          <line x1="40" y1="100" x2="100" y2="50" stroke="#fffaee" strokeWidth=".5" />
          <line x1="160" y1="100" x2="100" y2="50" stroke="#fffaee" strokeWidth=".5" />
          <line x1="60" y1="76" x2="140" y2="76" stroke="#fffaee" strokeWidth=".5" />
          <line x1="70" y1="90" x2="130" y2="90" stroke="#fffaee" strokeWidth=".5" />
          <line x1="100" y1="100" x2="100" y2="78" stroke="#3e6a3c" strokeWidth="1" />
          <rect x="90" y="68" width="20" height="12" rx="1.5" fill="#e07ec3" stroke="#0e1820" strokeWidth=".3" />
          <rect x="91" y="70" width="18" height="2" fill="#0e1820" opacity=".4" />
          <line x1="78" y1="100" x2="78" y2="86" stroke="#3e6a3c" strokeWidth=".8" />
          <rect x="72" y="78" width="12" height="8" rx="1" fill="#6fd5e0" stroke="#0e1820" strokeWidth=".3" />
          <line x1="122" y1="100" x2="122" y2="86" stroke="#3e6a3c" strokeWidth=".8" />
          <rect x="116" y="78" width="12" height="8" rx="1" fill="#f5d97a" stroke="#0e1820" strokeWidth=".3" />
        </>
      );
    case 'rmaict':
      return (
        <>
          <rect x="84" y="40" width="32" height="60" fill="url(#dt-silver)" />
          <rect x="84" y="40" width="32" height="60" fill="none" stroke="#1a3a44" strokeWidth=".6" />
          <rect x="80" y="92" width="40" height="14" fill="#a8553c" />
          <rect x="80" y="92" width="40" height="3" fill="#f5d97a" />
          <rect x="80" y="100" width="40" height="2" fill="#f5d97a" opacity=".7" />
          {[86, 94, 102, 110].map((x) => <path key={x} d={`M${x} 97 L${x + 3} 95 L${x + 6} 97 L${x + 3} 99 Z`} fill="#f5d97a" opacity=".8" />)}
          {[44, 54, 64, 74, 84].map((y) => (
            <g key={y}>
              <rect x="86" y={y} width="12" height="3" fill="#f5d97a" opacity=".75" />
              <rect x="102" y={y} width="12" height="3" fill="#f5d97a" opacity=".75" />
            </g>
          ))}
          <rect x="84" y="64" width="32" height="1.5" fill="#94e2c0" />
          <line x1="100" y1="40" x2="100" y2="28" stroke="#1a1410" strokeWidth="1" />
          <circle cx="100" cy="28" r="2" fill="#e07ec3" />
          <circle cx="100" cy="28" r="4" fill="#e07ec3" opacity=".4" />
        </>
      );
    case 'pong':
      return (
        <>
          <rect x="44" y="86" width="112" height="20" fill="#7a3a28" />
          <rect x="44" y="80" width="112" height="6" fill="url(#dt-cream)" />
          <rect x="38" y="60" width="124" height="22" fill="url(#dt-brick)" />
          <path d="M38 60 L100 38 L162 60 Z" fill="#5a6672" />
          <path d="M70 50 L100 38 L130 50 L120 50 L100 42 L80 50 Z" fill="url(#dt-cream)" />
          <text x="100" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="900" fill="#1f3a6e">DU</text>
          {[58, 78, 122, 142].map((x) => <rect key={x} x={x} y="82" width="4" height="22" fill="url(#dt-cream)" />)}
          <rect x="56" y="80" width="92" height="2" fill="#fffaee" />
          <rect x="92" y="86" width="16" height="20" fill="#1f3a4a" />
          <rect x="93" y="87" width="14" height="18" fill="#f5d97a" opacity=".6" />
          {[60, 70, 130, 140].map((x) => <path key={x} d={`M${x} 80 L${x + 4} 80 L${x + 3.5} 82 L${x + 0.5} 82 Z`} fill="#d8362a" />)}
        </>
      );
    case 'football':
      return (
        <>
          <ellipse cx="100" cy="98" rx="60" ry="13" fill="#7a3a28" />
          <ellipse cx="100" cy="96" rx="58" ry="12" fill="url(#dt-brick)" />
          <ellipse cx="100" cy="92" rx="44" ry="8" fill="#5a9558" />
          {[80, 90, 100, 110, 120].map((x) => <line key={x} x1={x} y1="86" x2={x} y2="98" stroke="#fffaee" strokeWidth=".5" />)}
          <line x1="58" y1="92" x2="58" y2="84" stroke="#f5d97a" strokeWidth="1" />
          <line x1="54" y1="86" x2="62" y2="86" stroke="#f5d97a" strokeWidth="1" />
          <line x1="142" y1="92" x2="142" y2="84" stroke="#f5d97a" strokeWidth="1" />
          <line x1="138" y1="86" x2="146" y2="86" stroke="#f5d97a" strokeWidth="1" />
          <g transform="translate(100, 64) rotate(-3)">
            <rect x="-16" y="-10" width="32" height="20" fill="#fffaee" stroke="#1a1410" strokeWidth=".4" />
            <rect x="-16" y="-10" width="32" height="5" fill="#1a1410" />
            <text x="0" y="-6" textAnchor="middle" fontFamily="Georgia,serif" fontSize="3.5" fontWeight="900" fill="#fffaee" letterSpacing="1">VALUE</text>
            <rect x="-14" y="-3" width="14" height="11" fill="#5a9558" />
            {[2, 0, -2, 4, 6].map((y, i) => <rect key={i} x="2" y={y} width={i === 4 ? 8 : 12} height="1" fill={i === 0 ? '#1a1410' : '#5a5048'} />)}
          </g>
          <text x="44" y="62" fontFamily="Georgia,serif" fontSize="14" fontWeight="900" fill="#b3a369" opacity=".7">$</text>
          <text x="148" y="58" fontFamily="Georgia,serif" fontSize="10" fontWeight="900" fill="#b3a369" opacity=".6">$</text>
        </>
      );
    case 'archive':
      return (
        <>
          <rect x="58" y="64" width="84" height="42" fill="#a89878" />
          <rect x="58" y="64" width="84" height="3" fill="#fffaee" />
          {[74, 84, 94].map((y) => <line key={y} x1="58" y1={y} x2="142" y2={y} stroke="#5a4a3e" strokeWidth=".4" opacity=".5" />)}
          <path d="M70 64 Q100 36 130 64 Z" fill="#a89878" />
          <path d="M70 64 Q100 36 130 64" stroke="#5a4a3e" strokeWidth=".5" fill="none" />
          <circle cx="100" cy="48" r="3" fill="#f5d97a" />
          <circle cx="100" cy="48" r="6" fill="url(#dt-glow)" />
          <path d="M92 106 L92 88 Q92 80 100 80 Q108 80 108 88 L108 106 Z" fill="#3a2410" />
          <path d="M93 105 L93 88 Q93 82 100 82 Q107 82 107 88 L107 105 Z" fill="#f5d97a" opacity=".7" />
          <path d="M66 96 L66 80 Q66 74 70 74 Q74 74 74 80 L74 96 Z" fill="#94e2c0" opacity=".7" />
          <path d="M126 96 L126 80 Q126 74 130 74 Q134 74 134 80 L134 96 Z" fill="#94e2c0" opacity=".7" />
          <circle cx="38" cy="56" r="2" fill="#f5d97a" />
          <circle cx="38" cy="56" r="5" fill="#f5d97a" opacity=".35" />
          <circle cx="162" cy="50" r="2" fill="#e07ec3" />
          <circle cx="162" cy="50" r="5" fill="#e07ec3" opacity=".35" />
        </>
      );
    case 'zen':
      return (
        <>
          <ellipse cx="100" cy="100" rx="78" ry="14" fill="#e8d5a8" />
          {[64, 42, 22].map((rx) => <ellipse key={rx} cx="100" cy="100" rx={rx} ry={rx === 64 ? 11 : rx === 42 ? 7 : 3} fill="none" stroke="#c8b585" strokeWidth=".4" />)}
          <g transform="translate(48, 64)">
            <rect x="-1.5" y="0" width="3" height="32" fill="#3a2410" />
            <ellipse cx="0" cy="-10" rx="18" ry="16" fill="#e07ec3" />
            <ellipse cx="-6" cy="-14" rx="9" ry="8" fill="#f0a5d3" />
            <ellipse cx="7" cy="-12" rx="8" ry="8" fill="#f5b6da" />
          </g>
          <ellipse cx="140" cy="92" rx="22" ry="8" fill="#6db9c4" />
          <ellipse cx="140" cy="92" rx="22" ry="8" fill="none" stroke="#fffaee" strokeWidth=".4" />
          <path d="M132 92 Q140 88 148 92 L150 94 Q140 96 130 94 Z" fill="#e07ec3" />
          <rect x="80" y="92" width="24" height="3" fill="#857a5a" />
          <rect x="82" y="95" width="2" height="6" fill="#5a5048" />
          <rect x="100" y="95" width="2" height="6" fill="#5a5048" />
          <rect x="86" y="86" width="12" height="6" fill="#fffaee" stroke="#1a1410" strokeWidth=".3" />
          <ellipse cx="92" cy="89" rx="14" ry="6" fill="#f5d97a" opacity=".45" />
        </>
      );
    case 'heatmap':
      return (
        <>
          <rect x="20" y="78" width="160" height="32" fill="#5a4a30" />
          <rect x="20" y="78" width="160" height="3" fill="#5a9558" />
          {Array.from({ length: 42 }).map((_, i) => {
            const row = Math.floor(i / 14);
            const col = i % 14;
            const x = 26 + col * 11;
            const y = 86 + row * 8;
            const d = Math.hypot(x - 100, y - 96);
            const hot = Math.max(0, 1 - d / 50);
            const hue = 220 - hot * 220;
            const sat = 60 + hot * 30;
            return <circle key={i} cx={x} cy={y} r={1 + hot * 1.6} fill={`hsl(${hue}, ${sat}%, 55%)`} />;
          })}
          <ellipse cx="100" cy="98" rx="4" ry="1.5" fill="rgba(0,0,0,.35)" />
          <circle cx="100" cy="94" r="4" fill="#fffaee" stroke="#1a1410" strokeWidth=".4" />
          <path d="M97 92 L100 93 L103 92 L102 95 L98 95 Z" fill="#1a1410" />
          <g transform="translate(100, 50)">
            <rect x="-22" y="-10" width="44" height="20" fill="rgba(15,30,40,.85)" stroke="#6fd5e0" strokeWidth=".5" />
            <text x="0" y="-3" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="5" fontWeight="600" fill="#6fd5e0">ORIS 0.84</text>
            <text x="0" y="5" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fill="#94e2c0">off-ball impact</text>
          </g>
        </>
      );
    case 'workshop':
      return (
        <>
          <rect x="58" y="92" width="84" height="14" fill="#5a4a30" />
          <rect x="62" y="60" width="76" height="34" fill="url(#dt-wood)" />
          {[68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 128, 134].map((x) => <line key={x} x1={x} y1="60" x2={x} y2="94" stroke="#1a1410" strokeWidth=".3" opacity=".7" />)}
          <path d="M58 60 L78 42 L122 42 L142 60 Z" fill="#3a2410" />
          <rect x="93" y="74" width="14" height="22" fill="#1a1410" />
          <rect x="94" y="75" width="12" height="20" fill="#f5d97a" opacity=".8" />
          <rect x="68" y="68" width="12" height="10" fill="#1a1410" />
          <rect x="69" y="69" width="10" height="8" fill="#f5d97a" opacity=".75" />
          <rect x="92" y="48" width="20" height="6" fill="#0e1820" transform="skewX(-15)" />
          <rect x="94" y="50" width="16" height="3" fill="#3a5a78" transform="skewX(-15)" />
          <g transform="translate(36, 100)">
            <rect x="-5" y="-4" width="10" height="6" fill="#c8bb95" stroke="#1a1410" strokeWidth=".4" />
            <rect x="-4" y="-7" width="8" height="3" fill="#0e1820" />
            <line x1="0" y1="-7" x2="0" y2="-10" stroke="#1a1410" strokeWidth=".4" />
            <circle cx="0" cy="-11" r="1" fill="#e07ec3" />
            <circle cx="-3" cy="3" r="1.6" fill="#1a1410" />
            <circle cx="3" cy="3" r="1.6" fill="#1a1410" />
          </g>
        </>
      );
    case 'about':
      return (
        <>
          <path d="M62 100 L62 50 L66 32 L70 22 L74 32 L78 50 L78 100 Z" fill="url(#dt-silver)" stroke="#3a4652" strokeWidth=".4" />
          <path d="M122 100 L122 50 L126 32 L130 22 L134 32 L138 50 L138 100 Z" fill="url(#dt-silver)" stroke="#3a4652" strokeWidth=".4" />
          <line x1="70" y1="22" x2="70" y2="14" stroke="#3a4652" strokeWidth="1" />
          <line x1="130" y1="22" x2="130" y2="14" stroke="#3a4652" strokeWidth="1" />
          <rect x="78" y="58" width="44" height="5" fill="#3a4652" />
          <rect x="78" y="56" width="44" height="2" fill="#fff1c8" opacity=".9" />
          <rect x="78" y="63" width="44" height="3" fill="#4a5662" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x="64" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8" />
              <rect x="71" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8" />
              <rect x="124" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8" />
              <rect x="131" y={48 + i * 6} width="5" height="2" fill="#f5d97a" opacity=".8" />
            </g>
          ))}
        </>
      );
    case 'edu':
      return (
        <>
          <rect x="76" y="34" width="48" height="68" fill="url(#dt-brick)" />
          <rect x="74" y="34" width="52" height="3" fill="#fffaee" />
          <rect x="74" y="74" width="52" height="2" fill="#fffaee" />
          <rect x="70" y="22" width="60" height="14" fill="url(#dt-brick)" />
          <rect x="70" y="22" width="60" height="3" fill="#fffaee" />
          <rect x="70" y="33" width="60" height="2" fill="#fffaee" />
          <text x="100" y="32" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fontWeight="900" fill="#d4b94a" letterSpacing="2">TECH</text>
          <path d="M70 22 L100 6 L130 22 Z" fill="#3a4652" />
          <line x1="100" y1="6" x2="100" y2="0" stroke="#1a1410" strokeWidth="1" />
          <circle cx="100" cy="0" r="1.5" fill="#b3a369" />
          <circle cx="100" cy="58" r="7" fill="#fffaee" stroke="#1a1410" strokeWidth=".5" />
          <line x1="100" y1="58" x2="100" y2="54" stroke="#1a1410" strokeWidth=".8" />
          <line x1="100" y1="58" x2="103" y2="59" stroke="#1a1410" strokeWidth=".8" />
          {[44, 86].map((y) => (
            <g key={y}>
              <path d={`M82 ${y + 12} L82 ${y + 4} Q82 ${y} 86 ${y} Q90 ${y} 90 ${y + 4} L90 ${y + 12} Z`} fill="#f5d97a" opacity=".85" stroke="#1a1410" strokeWidth=".3" />
              <path d={`M110 ${y + 12} L110 ${y + 4} Q110 ${y} 114 ${y} Q118 ${y} 118 ${y + 4} L118 ${y + 12} Z`} fill="#f5d97a" opacity=".85" stroke="#1a1410" strokeWidth=".3" />
            </g>
          ))}
          <path d="M93 102 L93 88 Q93 82 100 82 Q107 82 107 88 L107 102 Z" fill="#3a2410" />
        </>
      );
    case 'forge':
      return (
        <>
          <rect x="44" y="92" width="112" height="14" fill="#a89878" />
          <rect x="50" y="68" width="100" height="26" fill="#d8cfb8" />
          <rect x="50" y="68" width="100" height="3" fill="#3a2410" />
          <rect x="50" y="91" width="100" height="3" fill="#3a2410" />
          <rect x="50" y="68" width="3" height="26" fill="#3a2410" />
          <rect x="147" y="68" width="3" height="26" fill="#3a2410" />
          <rect x="98" y="68" width="3" height="26" fill="#3a2410" />
          <path d="M50 68 L100 81 L150 68" stroke="#3a2410" strokeWidth="2" fill="none" />
          <path d="M44 68 L70 48 L130 48 L156 68 Z" fill="#5a3a18" />
          <rect x="74" y="74" width="50" height="20" fill="#f5d97a" opacity=".85" />
          <rect x="74" y="74" width="50" height="20" fill="url(#dt-glow)" />
          <rect x="92" y="86" width="16" height="3" fill="#1a1410" opacity=".7" />
          <circle cx="80" cy="56" r="5" fill="#6fd5e0" opacity=".7" />
          <text x="80" y="58" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#0e1820">py</text>
          <circle cx="100" cy="48" r="5" fill="#e07ec3" opacity=".7" />
          <text x="100" y="50" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="4" fontWeight="700" fill="#fffaee">JS</text>
          <circle cx="120" cy="56" r="5" fill="#94e2c0" opacity=".7" />
          <text x="120" y="58" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="3.5" fontWeight="700" fill="#0e1820">C++</text>
          <rect x="130" y="38" width="10" height="14" fill="#a8553c" />
          <circle cx="134" cy="32" r="2" fill="#fffaee" opacity=".6" />
          <circle cx="138" cy="28" r="1" fill="#f5d97a" />
          <circle cx="132" cy="26" r=".8" fill="#e07ec3" />
        </>
      );
    case 'lighthouse':
      return (
        <>
          <ellipse cx="100" cy="100" rx="40" ry="8" fill="#7a7064" />
          <path d="M86 100 L88 64 L92 38 L108 38 L112 64 L114 100 Z" fill="url(#dt-cream)" stroke="#5a4a3e" strokeWidth=".5" />
          <path d="M88 78 L112 78 L113 82 L87 82 Z" fill="#a8553c" />
          <path d="M89 56 L111 56 L112 60 L88 60 Z" fill="#a8553c" />
          <rect x="86" y="32" width="28" height="6" fill="#5a4a3e" />
          <rect x="88" y="22" width="24" height="10" fill="#1a1410" />
          <rect x="89" y="23" width="22" height="8" fill="#f5d97a" />
          <path d="M86 22 Q100 12 114 22 Z" fill="#5a4a3e" />
          <line x1="100" y1="12" x2="100" y2="4" stroke="#1a1410" strokeWidth="1" />
          <circle cx="100" cy="4" r="1.5" fill="#a8553c" />
          <path d="M100 26 L160 14 L160 32 Z" fill="#f5d97a" opacity=".5" />
          <path d="M100 26 L40 14 L40 32 Z" fill="#f5d97a" opacity=".3" />
        </>
      );
    case 'gba':
      return (
        <>
          {/* Soft grass shadow under the cartridge */}
          <ellipse cx="100" cy="118" rx="56" ry="6" fill="rgba(0,0,0,0.18)" />
          {/* GBA body — purple plastic case, slight tilt */}
          <g transform="rotate(-8 100 96)">
            <rect x="40" y="68" width="120" height="56" rx="10" fill="#7E6CBC" />
            <rect x="40" y="68" width="120" height="6" rx="10" fill="#A18EE5" opacity=".75" />
            <rect x="40" y="118" width="120" height="6" rx="10" fill="#5A4A8E" opacity=".55" />
            {/* Screen bezel */}
            <rect x="62" y="76" width="76" height="40" rx="3" fill="#1a1a2e" />
            {/* CRT screen — dark indigo with pixel goal + player */}
            <rect x="66" y="80" width="68" height="32" fill="#0e1a2e" />
            {/* Title bar */}
            <rect x="66" y="80" width="68" height="6" fill="#1f3a6c" />
            <text x="69" y="85" fontFamily="Press Start 2P, monospace" fontSize="4" fill="#94e2c0">LV 1</text>
            {/* Hearts */}
            <rect x="124" y="82" width="3" height="2" fill="#f5b6da" />
            <rect x="129" y="82" width="3" height="2" fill="#f5b6da" />
            {/* Goal */}
            <rect x="125" y="94" width="6" height="6" fill="#7de7a8" />
            {/* Obstacles */}
            <rect x="86" y="92" width="3" height="3" fill="#c44a3a" />
            <rect x="102" y="100" width="3" height="3" fill="#c44a3a" />
            {/* Player */}
            <rect x="80" y="96" width="4" height="4" fill="#f5b6da" />
            <rect x="81" y="97" width="1" height="1" fill="#fffaee" />
            {/* D-pad */}
            <rect x="48" y="92" width="8" height="3" fill="#1a1a2e" />
            <rect x="50" y="90" width="3" height="8" fill="#1a1a2e" />
            {/* A / B buttons */}
            <circle cx="148" cy="96" r="3" fill="#a01818" />
            <circle cx="154" cy="92" r="3" fill="#a01818" />
            {/* Start / Select pills */}
            <rect x="88" y="118" width="9" height="2" rx="1" fill="#3a3450" transform="rotate(-8 90 119)" />
            <rect x="100" y="118" width="9" height="2" rx="1" fill="#3a3450" transform="rotate(-8 102 119)" />
            {/* Speaker grill */}
            <g fill="#3a3450">
              <rect x="142" y="112" width="14" height="1" />
              <rect x="142" y="114" width="14" height="1" />
              <rect x="142" y="116" width="14" height="1" />
            </g>
          </g>
          {/* Soft glow above screen */}
          <ellipse cx="100" cy="84" rx="32" ry="6" fill="rgba(148,226,192,0.18)" />
        </>
      );
    default:
      return null;
  }
}
