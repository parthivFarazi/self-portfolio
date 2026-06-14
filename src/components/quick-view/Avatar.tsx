// Avatar.tsx — Parthiv, the round-head portfolio mascot.
//
// Mascot-first, likeness-second. The brief: a charming stylized character
// in the spirit of Animal Crossing / Tomodachi Life / Nintendo mascots —
// a simple face (dot eyes + a warm smile), no realism on the features.
// But a cartoon-realistic head-to-body ratio (head ~1/4 of height, on a
// real neck and a full body — not a giant head on a stub). Identity from
// the cues: short, pointy, textured dark hair, warm tan skin, Real Madrid
// home kit (white jersey, navy shorts, #7), football socks, casual
// sneakers, and a brown leather laptop satchel cross-body.
//
// AvatarFront is the only pose used in the app today (Quick View identity
// strip). It renders a bare <svg className="qv-avatar-svg"> so the
// quick-view CSS can crop it to a head-and-shoulders portrait. The other
// poses + the character sheet are shown on the /character preview route.

import type { ReactNode } from 'react';

// ── Palette (flat fills) ──────────────────────────────────────────────
const CH = {
  skin: '#d8a574',
  skinShade: '#bd8657',
  hair: '#241c17',
  hairLit: '#3a2e25', // texture strokes / subtle sheen
  jersey: '#f4f1ea', // Real Madrid home white
  jerseyLit: '#ffffff',
  jerseyShade: '#d9d3c6',
  navy: '#15213f', // shorts / collar / sock band
  navyLit: '#243559',
  sock: '#eceadf',
  shoe: '#f0ede4',
  shoeSole: '#3a332b',
  satchel: '#9a6a3c', // brown leather
  satchelLit: '#b3824f',
  satchelShade: '#6f4a26',
  satchelDk: '#553718',
  strap: '#7d5630',
  gold: '#c8a94a', // collegiate-gold accent + crest
  ink: '#1a1410', // eyes
  mouth: '#5c3a28', // warm smile stroke
  blush: '#e0967a', // soft cheeks
  laptop: '#3a4250',
  laptopScr: '#7fc6c0',
} as const;

interface PoseProps {
  size?: number;
  /** Defaults to the quick-view class so the identity strip crops it. */
  className?: string;
}

// Shared SVG shell — all full-body poses share the 120×240 viewBox.
function PoseSvg({
  size,
  className,
  children,
}: {
  size: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 120 240"
      width={size * (120 / 240)}
      height={size}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ── FRONT VIEW ────────────────────────────────────────────────────────
// Head ~y12–68 (≈1/4 of height) on a real neck and a full body.
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* ── LEGS ── */}
      <rect x="48" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      <rect x="62" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      {/* football socks (white + navy band) */}
      <rect x="46" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="61" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="46" y="204" width="13" height="4" fill={CH.navy} />
      <rect x="61" y="204" width="13" height="4" fill={CH.navy} />
      {/* sneakers */}
      <path d="M41 216 Q41 212 47 212 L58 212 L61 218 L61 221 Q61 224 56 224 L44 224 Q41 224 41 221 Z" fill={CH.shoe} />
      <path d="M41 222 L61 222 L61 224 Q61 225 59 225 L43 225 Q41 225 41 223 Z" fill={CH.shoeSole} />
      <path d="M79 216 Q79 212 73 212 L62 212 L59 218 L59 221 Q59 224 64 224 L76 224 Q79 224 79 221 Z" fill={CH.shoe} />
      <path d="M79 222 L59 222 L59 224 Q59 225 61 225 L77 225 Q79 225 79 223 Z" fill={CH.shoeSole} />

      {/* ── SHORTS (navy) ── */}
      <path d="M38 154 L82 154 L80 184 L64 184 L60 170 L56 184 L40 184 Z" fill={CH.navy} />
      <rect x="41" y="179" width="14" height="4" fill={CH.jersey} opacity=".8" />
      <rect x="65" y="179" width="14" height="4" fill={CH.jersey} opacity=".8" />

      {/* ── NECK (collar overlaps its base) ── */}
      <path d="M53 62 L67 62 L69 84 L51 84 Z" fill={CH.skin} />
      <path d="M53 62 L60 62 L60 84 L51 84 Z" fill={CH.skinShade} opacity=".2" />

      {/* ── JERSEY (white, shoulders wider than the head) ── */}
      <path d="M30 100 Q30 84 48 83 L72 83 Q90 84 90 100 L94 156 L26 156 Z" fill={CH.jersey} />
      <path d="M60 83 L72 83 Q90 84 90 100 L94 156 L60 156 Z" fill={CH.jerseyLit} opacity=".45" />
      {/* collar V (navy) + crest */}
      <path d="M52 83 L60 95 L68 83 Z" fill={CH.navy} />
      <g transform="translate(78,106)">
        <path d="M0 -5 L4 -3 L4 3 L0 6 L-4 3 L-4 -3 Z" fill={CH.gold} />
        <circle cx="0" cy="0" r="2" fill={CH.navy} />
      </g>
      {/* short sleeves + navy cuffs */}
      <path d="M30 87 Q20 91 19 107 L27 110 Q30 95 35 90 Z" fill={CH.jersey} />
      <path d="M19 104 L27 107 L26 111 L18 109 Z" fill={CH.navy} />
      <path d="M90 87 Q100 91 101 107 L93 110 Q90 95 85 90 Z" fill={CH.jerseyLit} opacity=".9" />
      <path d="M101 104 L93 107 L94 111 L102 109 Z" fill={CH.navy} />

      {/* ── SATCHEL strap (cross-body) ── */}
      <path d="M86 90 L42 152 L46 156 L90 94 Z" fill={CH.strap} />

      {/* ── FOREARMS + MITT HANDS ── */}
      <path d="M21 107 L19 136 Q19 140 23 140 L28 139 L30 109 Z" fill={CH.skin} />
      <path d="M99 107 L101 136 Q101 140 97 140 L92 139 L90 109 Z" fill={CH.skin} />
      <circle cx="23" cy="142" r="6" fill={CH.skin} />
      <circle cx="97" cy="142" r="6" fill={CH.skin} />
      {/* gold wristband (through-line) */}
      <rect x="91" y="136" width="10" height="4" rx="1" fill={CH.gold} />

      {/* ── SATCHEL bag (left hip) ── */}
      <g transform="translate(36,158)">
        <path d="M-12 0 L12 0 L13 19 L-13 19 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="8" width="3" height="5" fill={CH.satchelDk} />
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} />
        <path d="M-12 3 L12 3" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── HEAD (round) ── */}
      <ellipse cx="60" cy="40" rx="27" ry="28" fill={CH.skin} />
      <ellipse cx="60" cy="58" rx="18" ry="8" fill={CH.skinShade} opacity=".14" />
      {/* ears */}
      <ellipse cx="33" cy="44" rx="4.5" ry="6" fill={CH.skin} />
      <ellipse cx="87" cy="44" rx="4.5" ry="6" fill={CH.skin} />

      {/* ── HAIR — short, textured, with a softly pointy top (no fade).
          A solid cap that hugs the scalp; the top edge has low rounded
          points for a tousled, slightly-spiky read rather than a helmet. */}
      <path
        d="M32 36 Q31 21 37 15 Q41 11 45 15 Q49 10 53 14 Q57 9 61 14 Q65 10 69 14 Q73 11 77 16 Q84 20 88 36 Q74 29 60 28 Q46 29 32 36 Z"
        fill={CH.hair}
      />
      <path d="M45 27 L46 20" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M53 26 L53 19" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M60 27 L60 18" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M67 26 L67 19" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M75 27 L74 21" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />

      {/* ── SIMPLE FACE ── */}
      <ellipse cx="51" cy="45" rx="3" ry="3.8" fill={CH.ink} />
      <ellipse cx="69" cy="45" rx="3" ry="3.8" fill={CH.ink} />
      <circle cx="51.9" cy="43.3" r="1" fill="#fff" opacity=".85" />
      <circle cx="69.9" cy="43.3" r="1" fill="#fff" opacity=".85" />
      <path d="M46 39 Q51 37 55 39" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 39 Q69 37 74 39" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="53" rx="2" ry="1.6" fill={CH.skinShade} opacity=".5" />
      <path d="M53 58 Q60 65 67 58" stroke={CH.mouth} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="45" cy="53" rx="5" ry="3" fill={CH.blush} opacity=".3" />
      <ellipse cx="75" cy="53" rx="5" ry="3" fill={CH.blush} opacity=".3" />
    </PoseSvg>
  );
}

// ── SIDE VIEW (walking) ───────────────────────────────────────────────
export function AvatarSide({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="28" ry="5" fill="rgba(0,0,0,.15)" />

      {/* back leg (stepping) */}
      <rect x="50" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      <rect x="49" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="49" y="204" width="13" height="4" fill={CH.navy} />
      <path d="M44 216 Q44 212 50 212 L60 212 L62 218 L62 221 Q62 224 57 224 L47 224 Q44 224 44 221 Z" fill={CH.shoe} opacity=".92" />
      <path d="M44 222 L62 222 L62 224 Q62 225 60 225 L46 225 Q44 225 44 223 Z" fill={CH.shoeSole} />

      {/* front leg (forward) */}
      <rect x="62" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      <rect x="62" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="62" y="204" width="13" height="4" fill={CH.navy} />
      <path d="M61 216 Q61 212 67 212 L79 212 L82 218 L82 221 Q82 224 77 224 L64 224 Q61 224 61 221 Z" fill={CH.shoe} />
      <path d="M61 222 L82 222 L82 224 Q82 225 80 225 L63 225 Q61 225 61 223 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M48 154 L80 154 L78 182 L64 184 L62 172 L60 184 L50 182 Z" fill={CH.navy} />

      {/* neck */}
      <path d="M54 62 L66 62 L66 84 L52 84 Z" fill={CH.skin} />
      <path d="M54 62 L59 62 L59 84 L52 84 Z" fill={CH.skinShade} opacity=".2" />

      {/* jersey torso (profile) */}
      <path d="M44 100 Q44 84 60 83 L74 84 Q80 85 80 100 L80 156 L46 156 Z" fill={CH.jersey} />
      <path d="M62 84 Q72 84 78 88 L80 156 L62 156 Z" fill={CH.jerseyLit} opacity=".4" />

      {/* back arm swung back */}
      <path d="M50 89 L41 103 L39 132 L46 134 L54 100 Z" fill={CH.jerseyShade} />
      <path d="M39 131 L37 138 Q37 141 41 140 L45 138 L46 134 Z" fill={CH.skinShade} />
      <circle cx="41" cy="140" r="5.4" fill={CH.skinShade} />
      {/* front arm forward */}
      <path d="M72 89 L82 100 L84 129 L77 132 L70 100 Z" fill={CH.jersey} />
      <path d="M84 128 L86 135 Q86 138 82 137 L78 135 L77 131 Z" fill={CH.skin} />
      <circle cx="84" cy="138" r="5.4" fill={CH.skin} />
      <rect x="79" y="132" width="9" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap + bag on the back hip */}
      <path d="M72 88 L46 150 L50 153 L76 92 Z" fill={CH.strap} />
      <g transform="translate(46,156)">
        <path d="M-11 0 L11 0 L12 18 L-12 18 Z" fill={CH.satchel} />
        <path d="M-12 -2 L12 -2 L11 8 L-11 8 Z" fill={CH.satchelLit} />
        <rect x="-3" y="4" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-8" y="-5" width="16" height="4" rx="1" fill={CH.laptop} />
      </g>

      {/* ── HEAD (round profile, facing right) ── */}
      <ellipse cx="56" cy="40" rx="26" ry="28" fill={CH.skin} />
      <ellipse cx="58" cy="58" rx="15" ry="7" fill={CH.skinShade} opacity=".13" />
      {/* ear (toward back) */}
      <ellipse cx="42" cy="46" rx="4.5" ry="6" fill={CH.skin} />
      <ellipse cx="42" cy="46" rx="2.2" ry="3.4" fill={CH.skinShade} opacity=".4" />
      {/* nose bump (front) */}
      <path d="M81 44 Q86 50 81 55 Q82 50 81 44 Z" fill={CH.skin} />

      {/* hair — solid cap, softly pointy top, textured (no fade) */}
      <path
        d="M30 38 Q29 20 35 14 Q40 10 44 14 Q49 9 53 13 Q58 10 63 14 Q69 11 75 16 Q81 20 82 29 Q79 25 74 26 Q60 20 47 25 Q35 29 30 38 Z"
        fill={CH.hair}
      />
      <path d="M43 26 L44 19" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M51 24 L51 18" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M60 24 L60 17" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />
      <path d="M69 25 L68 19" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".45" />

      {/* simple face (facing right) */}
      <ellipse cx="70" cy="45" rx="3" ry="3.8" fill={CH.ink} />
      <circle cx="70.9" cy="43.3" r="1" fill="#fff" opacity=".85" />
      <path d="M64 39 Q69 37 74 40" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M72 57 Q77 61 82 56" stroke={CH.mouth} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="70" cy="53" rx="4.5" ry="2.8" fill={CH.blush} opacity=".28" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* legs / socks / shoes */}
      <rect x="48" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      <rect x="62" y="184" width="10" height="20" rx="4" fill={CH.skin} />
      <rect x="46" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="61" y="201" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="46" y="204" width="13" height="4" fill={CH.navy} />
      <rect x="61" y="204" width="13" height="4" fill={CH.navy} />
      <path d="M41 216 Q41 212 47 212 L58 212 L61 218 L61 221 Q61 224 56 224 L44 224 Q41 224 41 221 Z" fill={CH.shoe} />
      <path d="M41 222 L61 222 L61 224 Q61 225 59 225 L43 225 Q41 225 41 223 Z" fill={CH.shoeSole} />
      <path d="M79 216 Q79 212 73 212 L62 212 L59 218 L59 221 Q59 224 64 224 L76 224 Q79 224 79 221 Z" fill={CH.shoe} />
      <path d="M79 222 L59 222 L59 224 Q59 225 61 225 L77 225 Q79 225 79 223 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M38 154 L82 154 L80 184 L64 184 L60 170 L56 184 L40 184 Z" fill={CH.navy} />

      {/* neck */}
      <path d="M53 62 L67 62 L69 84 L51 84 Z" fill={CH.skin} />

      {/* jersey back */}
      <path d="M30 100 Q30 84 48 83 L72 83 Q90 84 90 100 L94 156 L26 156 Z" fill={CH.jersey} />
      <path d="M60 83 L72 83 Q90 84 90 100 L94 156 L60 156 Z" fill={CH.jerseyLit} opacity=".45" />
      <path d="M52 83 L60 88 L68 83 Z" fill={CH.navy} />
      {/* name + number */}
      <rect x="48" y="104" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="109" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="134" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="18" fontWeight="700" fill={CH.navy}>
        7
      </text>

      {/* sleeves + arms */}
      <path d="M30 87 Q20 91 19 107 L27 110 Q30 95 35 90 Z" fill={CH.jerseyShade} />
      <path d="M19 104 L27 107 L26 111 L18 109 Z" fill={CH.navy} />
      <path d="M90 87 Q100 91 101 107 L93 110 Q90 95 85 90 Z" fill={CH.jersey} />
      <path d="M101 104 L93 107 L94 111 L102 109 Z" fill={CH.navy} />
      <path d="M21 107 L19 136 Q19 140 23 140 L28 139 L30 109 Z" fill={CH.skin} />
      <path d="M99 107 L101 136 Q101 140 97 140 L92 139 L90 109 Z" fill={CH.skin} />
      <circle cx="23" cy="142" r="6" fill={CH.skin} />
      <circle cx="97" cy="142" r="6" fill={CH.skin} />
      <rect x="19" y="136" width="10" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap diagonal + bag */}
      <path d="M34 90 L78 152 L82 148 L38 86 Z" fill={CH.strap} />
      <g transform="translate(82,158)">
        <path d="M-12 0 L12 0 L13 19 L-13 19 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
      </g>

      {/* ── HEAD (round, from behind) ── */}
      <ellipse cx="60" cy="40" rx="27" ry="28" fill={CH.skin} />
      <ellipse cx="33" cy="44" rx="4.5" ry="6" fill={CH.skin} />
      <ellipse cx="87" cy="44" rx="4.5" ry="6" fill={CH.skin} />
      {/* hair from behind — solid cap, softly pointy top, down to the nape */}
      <path
        d="M31 44 Q30 20 37 14 Q42 10 46 14 Q50 9 54 13 Q58 9 62 13 Q66 9 70 13 Q75 11 80 16 Q88 21 89 44 Q89 60 75 65 Q60 69 45 65 Q31 60 31 44 Z"
        fill={CH.hair}
      />
      <path d="M40 52 L41 60" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
      <path d="M50 55 L50 62" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
      <path d="M60 56 L60 63" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
      <path d="M70 55 L70 62" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
      <path d="M80 52 L79 60" stroke={CH.hairLit} strokeWidth="1.2" strokeLinecap="round" opacity=".4" />
    </PoseSvg>
  );
}

// ── TOP-DOWN TOKEN (world map / minimap) ──────────────────────────────
type Facing = 'south' | 'north' | 'east' | 'west';
export function AvatarToken({ size = 30, facing = 'south' }: { size?: number; facing?: Facing }) {
  const rot = ({ south: 0, north: 180, east: -90, west: 90 } as const)[facing] ?? 0;
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      aria-hidden="true"
      style={{
        overflow: 'visible',
        transform: `rotate(${rot}deg)`,
        transformOrigin: 'center',
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))',
      }}
    >
      {/* shoulders / white jersey */}
      <ellipse cx="22" cy="28" rx="13" ry="9" fill={CH.jersey} />
      <ellipse cx="22" cy="28" rx="13" ry="9" fill="none" stroke="rgba(0,0,0,.12)" />
      {/* navy collar + crest */}
      <path d="M17 22 L22 27 L27 22 Z" fill={CH.navy} />
      <circle cx="29" cy="25" r="1.8" fill={CH.gold} />
      {/* satchel strap */}
      <path d="M15 21 L30 32" stroke={CH.strap} strokeWidth="3" strokeLinecap="round" />
      {/* mitt forearms */}
      <circle cx="11" cy="26" r="3.2" fill={CH.skin} />
      <circle cx="33" cy="26" r="3.2" fill={CH.skin} />
      <circle cx="33" cy="26" r="3.6" fill="none" stroke={CH.gold} strokeWidth="1.3" />
      {/* round head from above — short pointy hair + a peek of face */}
      <circle cx="22" cy="16" r="8.6" fill={CH.hair} />
      <circle cx="22" cy="16" r="8.6" fill={CH.hairLit} opacity=".18" />
      <path d="M14 19 Q22 24 30 19 Q22 15 14 19 Z" fill={CH.skin} />
    </svg>
  );
}

// ── Labeled pose (used on the character sheet) ────────────────────────
function Labeled({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {children}
      {label ? (
        <figcaption
          style={{
            font: '11px var(--rw-mono)',
            color: 'var(--rw-ink-soft)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

// ── CHARACTER SHEET CARD ──────────────────────────────────────────────
export function CharacterSheetCard() {
  return (
    <div
      style={{
        width: 1040,
        height: 660,
        background: 'var(--rw-cream)',
        backgroundImage:
          'linear-gradient(rgba(160,140,100,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(160,140,100,.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        border: '1px solid #e6dec8',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        fontFamily: 'var(--rw-sans)',
      }}
    >
      {/* Left: avatar trio on a turntable */}
      <div
        style={{
          padding: 36,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          borderRight: '1px dashed #c8bb95',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>
            Character · 01
          </div>
          <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }} />
          <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>round-head mascot</div>
        </div>
        <h2 style={{ font: '500 46px/.95 "Pixelify Sans", var(--rw-serif)', margin: 0, color: 'var(--rw-ink)' }}>
          Parthiv,
          <br />
          the explorer.
        </h2>
        <p style={{ font: '13px/1.5 var(--rw-sans)', color: 'var(--rw-ink-soft)', margin: 0, maxWidth: 380 }}>
          A friendly cartoon mascot in the spirit of Animal Crossing &amp; Tomodachi Life — a simple face, but a cartoon-realistic
          head-to-body ratio on a real neck. Identity comes from the cues: short, pointy, textured dark hair, warm tan, Real
          Madrid home whites, football socks, casual sneakers, and a brown leather laptop satchel slung cross-body.
        </p>
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'end',
            justifyItems: 'center',
            gap: 10,
            paddingTop: 4,
          }}
        >
          <Labeled label="Front · Idle">
            <AvatarFront size={280} className="" />
          </Labeled>
          <Labeled label="Side · Walk">
            <AvatarSide size={280} />
          </Labeled>
          <Labeled label="Back · #7">
            <AvatarBack size={280} />
          </Labeled>
        </div>
        <div style={{ position: 'absolute', left: 36, right: 0, bottom: 32, borderTop: '1px solid #c8bb95' }} />
      </div>

      {/* Right: spec sheet */}
      <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>
            Spec sheet
          </div>
          <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }} />
        </div>
        <SpecRow label="Style" v="Cartoon mascot · cozy indie (Animal Crossing · Tomodachi Life · Nintendo)" />
        <SpecRow label="Proportion" v="Cartoon-realistic ratio · head ≈ 1/4 · real neck" highlight />
        <SpecRow label="Face" v="Simple mascot · dot eyes · warm smile · no realism" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Short · pointy · textured</>} highlight />
        <SpecRow label="Skin" v={<><Sw c={CH.skin} /> Warm tan · flat fill</>} />
        <SpecRow label="Kit" v={<><Sw c={CH.jersey} /> White jersey · <Sw c={CH.navy} /> navy shorts · #7</>} />
        <SpecRow label="Socks" v={<><Sw c={CH.sock} /> Football socks · <Sw c={CH.navy} /> band</>} />
        <SpecRow label="Shoes" v={<><Sw c={CH.shoe} /> Casual sneakers</>} />
        <SpecRow label="Satchel" v={<><Sw c={CH.satchel} /> Brown leather · cross-body · laptop inside</>} />
        <SpecRow label="Accent" v={<><Sw c={CH.gold} /> Collegiate gold · crest + wristband</>} />
        <div
          style={{
            marginTop: 4,
            padding: '12px 16px',
            background: 'rgba(200,169,74,.16)',
            border: '1px dashed #c8bb95',
            borderRadius: 4,
          }}
        >
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)', marginBottom: 6 }}>
            Reads as
          </div>
          <div style={{ font: '14px/1.5 var(--rw-sans)', color: 'var(--rw-ink)' }}>
            ⚽ soccer · 💻 technology · ✦ creativity — &ldquo;that&rsquo;s Parthiv&rsquo;s avatar,&rdquo; the charming mascot &amp;
            explorer of the world, not a literal face.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: 22,
            font: '10.5px var(--rw-mono)',
            color: 'var(--rw-ink-soft)',
            textAlign: 'right',
            lineHeight: 1.5,
          }}
        >
          v0.5 · cartoon mascot
          <br />
          pointy textured hair
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, v, highlight }: { label: string; v: ReactNode; highlight?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 14, alignItems: 'center', padding: highlight ? '5px 0' : 0 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>
        {label}
      </div>
      <div
        style={{
          font: '13.5px/1.4 var(--rw-sans)',
          color: 'var(--rw-ink)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {v}
      </div>
    </div>
  );
}

function Sw({ c }: { c: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        background: c,
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: 3,
        verticalAlign: 'middle',
      }}
    />
  );
}
