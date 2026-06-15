// Avatar.tsx — Parthiv, the round-head portfolio mascot.
//
// Mascot-first, likeness-second, modelled on a reference photo: a friendly
// cartoon character with a big warm open smile, short textured dark hair
// (natural hairline, no beard), warm tan skin, in a white Real Madrid home
// jersey (adidas shoulder stripes, gold piping, club crest on the chest,
// #7 on the back), blue jeans, white sneakers, and a brown leather laptop
// satchel cross-body. The satchel strap is routed so the chest crest stays
// visible. No wristband. Cartoon-realistic head-to-body ratio on a neck.
//
// AvatarFront is the only pose used in the app today (Quick View identity
// strip). It renders a bare <svg className="qv-avatar-svg"> so the
// quick-view CSS can crop it to a head-and-shoulders portrait. The other
// poses + the character sheet are shown on the /character preview route.

import type { ReactNode } from 'react';

// ── Palette (flat fills) ──────────────────────────────────────────────
const CH = {
  skin: '#d49c6a',
  skinShade: '#b88052',
  hair: '#241c17',
  hairLit: '#3a2e25', // texture strokes
  jersey: '#f4f1ea', // Real Madrid home white
  jerseyLit: '#ffffff',
  jerseyShade: '#d9d3c6',
  piping: '#e6a23c', // gold/orange jersey piping
  navy: '#15213f', // collar
  denim: '#4a6a96', // jeans
  denimDark: '#3a5478',
  stitch: '#caa66a', // jeans contrast stitching
  shoe: '#f0ede4',
  shoeSole: '#3a332b',
  satchel: '#9a6a3c', // brown leather
  satchelLit: '#b3824f',
  satchelDk: '#553718',
  strap: '#7d5630',
  gold: '#c8a94a', // satchel buckle accent
  crestGold: '#d4af37', // club crest
  crestBlue: '#16407a',
  ink: '#1a1410', // eyes
  mouth: '#5c3a28', // smile
  blush: '#e0967a',
  laptop: '#3a4250',
  laptopScr: '#7fc6c0',
} as const;

interface PoseProps {
  size?: number;
  /** Defaults to the quick-view class so the identity strip crops it. */
  className?: string;
}

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

// Simplified Real Madrid crest — gold ring, white field, blue sash, a tiny
// crown. Reads as the club badge at avatar scale without the fine detail.
function Crest({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle r="5.4" fill={CH.crestGold} />
      <circle cy="0.4" r="4.2" fill={CH.jersey} />
      <path d="M-3.6 2.2 L3.6 -2.4" stroke={CH.crestBlue} strokeWidth="1.7" />
      <path d="M-3.2 -3.3 L-2 -5 L-1 -3.5 L0 -5.4 L1 -3.5 L2 -5 L3.2 -3.3 Z" fill={CH.crestGold} />
    </g>
  );
}

// adidas three-stripe shoulder mark.
function ShoulderStripes({ mirror = false }: { mirror?: boolean }) {
  const d = mirror
    ? ['M87 88 L81 85', 'M85 91 L79 88', 'M83 94 L77 91']
    : ['M33 88 L39 85', 'M35 91 L41 88', 'M37 94 L43 91'];
  return (
    <g stroke={CH.ink} strokeWidth="1.6" strokeLinecap="round">
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </g>
  );
}

// ── FRONT VIEW ────────────────────────────────────────────────────────
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* ── JEANS ── */}
      <path d="M40 148 L80 148 L78 210 L64 210 L60 166 L56 210 L42 210 Z" fill={CH.denim} />
      <path d="M40 148 L60 148 L56 210 L42 210 Z" fill={CH.denimDark} opacity=".35" />
      <path d="M50 152 L50 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <path d="M70 152 L70 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <rect x="42" y="204" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <rect x="64" y="204" width="14" height="5" fill={CH.denimDark} opacity=".4" />

      {/* sneakers */}
      <path d="M41 210 Q41 206 47 206 L58 206 L61 212 L61 215 Q61 218 56 218 L44 218 Q41 218 41 215 Z" fill={CH.shoe} />
      <path d="M41 216 L61 216 L61 218 Q61 219 59 219 L43 219 Q41 219 41 217 Z" fill={CH.shoeSole} />
      <path d="M79 210 Q79 206 73 206 L62 206 L59 212 L59 215 Q59 218 64 218 L76 218 Q79 218 79 215 Z" fill={CH.shoe} />
      <path d="M79 216 L59 216 L59 218 Q59 219 61 219 L77 219 Q79 219 79 217 Z" fill={CH.shoeSole} />

      {/* ── NECK ── */}
      <path d="M53 62 L67 62 L69 86 L51 86 Z" fill={CH.skin} />
      <path d="M53 62 L60 62 L60 86 L51 86 Z" fill={CH.skinShade} opacity=".2" />

      {/* ── JERSEY (Real Madrid home white) ── */}
      <path d="M30 100 Q30 84 48 83 L72 83 Q90 84 90 100 L92 152 L28 152 Z" fill={CH.jersey} />
      <path d="M60 83 L72 83 Q90 84 90 100 L92 152 L60 152 Z" fill={CH.jerseyLit} opacity=".4" />
      {/* gold side piping */}
      <path d="M34 92 Q31 120 33 150" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M86 92 Q89 120 87 150" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      {/* navy V collar */}
      <path d="M52 83 L60 92 L68 83 Z" fill={CH.navy} />
      <path d="M54 83 L60 89 L66 83 Z" fill={CH.skin} />
      {/* adidas shoulder stripes */}
      <ShoulderStripes />
      <ShoulderStripes mirror />
      {/* short sleeves */}
      <path d="M30 87 Q20 91 19 107 L27 110 Q30 95 35 90 Z" fill={CH.jersey} />
      <path d="M90 87 Q100 91 101 107 L93 110 Q90 95 85 90 Z" fill={CH.jerseyLit} opacity=".9" />

      {/* ── CLUB CREST (viewer-left chest, kept clear of the strap) ── */}
      <Crest x={44} y={103} />

      {/* ── SATCHEL strap (right shoulder → left hip, crosses below the crest) ── */}
      <path d="M86 90 L36 150 L40 154 L90 94 Z" fill={CH.strap} />

      {/* ── FOREARMS + MITT HANDS (no wristband) ── */}
      <path d="M21 107 L19 136 Q19 140 23 140 L28 139 L30 109 Z" fill={CH.skin} />
      <path d="M99 107 L101 136 Q101 140 97 140 L92 139 L90 109 Z" fill={CH.skin} />
      <circle cx="23" cy="142" r="6" fill={CH.skin} />
      <circle cx="97" cy="142" r="6" fill={CH.skin} />

      {/* ── SATCHEL bag (left hip) ── */}
      <g transform="translate(36,156)">
        <path d="M-12 0 L12 0 L13 19 L-13 19 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="8" width="3" height="5" fill={CH.satchelDk} />
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} />
        <path d="M-12 3 L12 3" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── HEAD ── */}
      <ellipse cx="60" cy="40" rx="27" ry="28" fill={CH.skin} />
      <ellipse cx="60" cy="58" rx="18" ry="8" fill={CH.skinShade} opacity=".14" />
      <ellipse cx="33" cy="44" rx="4.5" ry="6" fill={CH.skin} />
      <ellipse cx="87" cy="44" rx="4.5" ry="6" fill={CH.skin} />

      {/* ── HAIR (short, textured, natural hairline — no beard, no fade) ── */}
      <path d="M32 37 Q30 18 60 13 Q90 18 88 37 Q84 27 77 26 Q70 30 64 28 Q60 26 56 28 Q50 30 43 26 Q36 27 32 37 Z" fill={CH.hair} />
      <path d="M46 24 L47 18" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M54 22 L54 16" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M61 22 L61 16" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M68 23 L68 17" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />

      {/* ── FACE (big warm open smile) ── */}
      <ellipse cx="51" cy="46" rx="3" ry="3.8" fill={CH.ink} />
      <ellipse cx="69" cy="46" rx="3" ry="3.8" fill={CH.ink} />
      <circle cx="51.9" cy="44.3" r="1" fill="#fff" opacity=".85" />
      <circle cx="69.9" cy="44.3" r="1" fill="#fff" opacity=".85" />
      <path d="M46 40 Q51 38 55 40" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M65 40 Q69 38 74 40" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="53" rx="2" ry="1.6" fill={CH.skinShade} opacity=".5" />
      <path d="M49 55 Q60 60 71 55 Q66 67 60 67 Q54 67 49 55 Z" fill={CH.mouth} />
      <path d="M50.5 55.5 Q60 58.5 69.5 55.5 Q60 60 50.5 55.5 Z" fill="#fff" />
      <ellipse cx="44" cy="54" rx="5" ry="3" fill={CH.blush} opacity=".3" />
      <ellipse cx="76" cy="54" rx="5" ry="3" fill={CH.blush} opacity=".3" />
    </PoseSvg>
  );
}

// ── SIDE VIEW (walking) ───────────────────────────────────────────────
export function AvatarSide({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="28" ry="5" fill="rgba(0,0,0,.15)" />

      {/* jeans — back leg + front leg (walking) */}
      <path d="M50 150 L48 210 L60 210 L61 150 Z" fill={CH.denimDark} />
      <path d="M61 150 L62 210 L75 210 L74 150 Z" fill={CH.denim} />
      <path d="M68 154 L68 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      {/* back sneaker */}
      <path d="M44 210 Q44 206 50 206 L60 206 L62 212 L62 215 Q62 218 57 218 L47 218 Q44 218 44 215 Z" fill={CH.shoe} opacity=".92" />
      <path d="M44 216 L62 216 L62 218 Q62 219 60 219 L46 219 Q44 219 44 217 Z" fill={CH.shoeSole} />
      {/* front sneaker */}
      <path d="M61 210 Q61 206 67 206 L79 206 L82 212 L82 215 Q82 218 77 218 L64 218 Q61 218 61 215 Z" fill={CH.shoe} />
      <path d="M61 216 L82 216 L82 218 Q82 219 80 219 L63 219 Q61 219 61 217 Z" fill={CH.shoeSole} />

      {/* neck */}
      <path d="M54 62 L66 62 L66 86 L52 86 Z" fill={CH.skin} />
      <path d="M54 62 L59 62 L59 86 L52 86 Z" fill={CH.skinShade} opacity=".2" />

      {/* jersey torso (profile) */}
      <path d="M44 100 Q44 84 60 83 L74 84 Q80 85 80 100 L80 152 L46 152 Z" fill={CH.jersey} />
      <path d="M62 84 Q72 84 78 88 L80 152 L62 152 Z" fill={CH.jerseyLit} opacity=".4" />
      <path d="M76 92 Q79 120 77 150" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".7" />
      {/* shoulder stripes (near shoulder) */}
      <g stroke={CH.ink} strokeWidth="1.6" strokeLinecap="round">
        <path d="M52 88 L60 86" />
        <path d="M53 91 L61 89" />
        <path d="M54 94 L62 92" />
      </g>
      {/* crest on the chest (faces right) */}
      <Crest x={70} y={104} s={0.92} />

      {/* back arm swung back */}
      <path d="M50 89 L41 103 L39 132 L46 134 L54 100 Z" fill={CH.jerseyShade} />
      <path d="M39 131 L37 138 Q37 141 41 140 L45 138 L46 134 Z" fill={CH.skinShade} />
      <circle cx="41" cy="140" r="5.4" fill={CH.skinShade} />
      {/* front arm forward (no wristband) */}
      <path d="M72 89 L82 100 L84 129 L77 132 L70 100 Z" fill={CH.jersey} />
      <path d="M84 128 L86 135 Q86 138 82 137 L78 135 L77 131 Z" fill={CH.skin} />
      <circle cx="84" cy="138" r="5.4" fill={CH.skin} />

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
      <ellipse cx="42" cy="46" rx="4.5" ry="6" fill={CH.skin} />
      <ellipse cx="42" cy="46" rx="2.2" ry="3.4" fill={CH.skinShade} opacity=".4" />
      <path d="M81 44 Q86 50 81 55 Q82 50 81 44 Z" fill={CH.skin} />

      {/* hair — short, textured (profile) */}
      <path d="M30 38 Q28 18 56 13 Q84 17 82 36 Q79 27 73 27 Q60 22 48 26 Q36 29 31 38 Z" fill={CH.hair} />
      <path d="M44 24 L45 18" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M52 22 L52 16" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M60 22 L60 16" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />
      <path d="M68 24 L67 18" stroke={CH.hairLit} strokeWidth="1.1" opacity=".45" strokeLinecap="round" />

      {/* face (facing right, open smile) */}
      <ellipse cx="70" cy="46" rx="3" ry="3.8" fill={CH.ink} />
      <circle cx="70.9" cy="44.3" r="1" fill="#fff" opacity=".85" />
      <path d="M64 40 Q69 38 74 41" stroke={CH.hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M71 55 Q78 59 84 54 Q80 64 75 64 Q70 63 71 55 Z" fill={CH.mouth} />
      <path d="M72 55.5 Q78 57.5 83 54.5 Q78 59 72 55.5 Z" fill="#fff" />
      <ellipse cx="70" cy="53" rx="4.5" ry="2.8" fill={CH.blush} opacity=".28" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* jeans */}
      <path d="M40 148 L80 148 L78 210 L64 210 L60 166 L56 210 L42 210 Z" fill={CH.denim} />
      <path d="M40 148 L60 148 L56 210 L42 210 Z" fill={CH.denimDark} opacity=".35" />
      <path d="M50 152 L50 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <path d="M70 152 L70 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <rect x="42" y="204" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <rect x="64" y="204" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <path d="M41 210 Q41 206 47 206 L58 206 L61 212 L61 215 Q61 218 56 218 L44 218 Q41 218 41 215 Z" fill={CH.shoe} />
      <path d="M41 216 L61 216 L61 218 Q61 219 59 219 L43 219 Q41 219 41 217 Z" fill={CH.shoeSole} />
      <path d="M79 210 Q79 206 73 206 L62 206 L59 212 L59 215 Q59 218 64 218 L76 218 Q79 218 79 215 Z" fill={CH.shoe} />
      <path d="M79 216 L59 216 L59 218 Q59 219 61 219 L77 219 Q79 219 79 217 Z" fill={CH.shoeSole} />

      {/* neck */}
      <path d="M53 62 L67 62 L69 86 L51 86 Z" fill={CH.skin} />

      {/* jersey back */}
      <path d="M30 100 Q30 84 48 83 L72 83 Q90 84 90 100 L92 152 L28 152 Z" fill={CH.jersey} />
      <path d="M60 83 L72 83 Q90 84 90 100 L92 152 L60 152 Z" fill={CH.jerseyLit} opacity=".4" />
      <path d="M34 92 Q31 120 33 150" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M86 92 Q89 120 87 150" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M52 83 L60 88 L68 83 Z" fill={CH.navy} />
      <ShoulderStripes />
      <ShoulderStripes mirror />
      {/* name + number */}
      <rect x="48" y="104" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="109" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="134" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="18" fontWeight="700" fill={CH.navy}>
        7
      </text>

      {/* sleeves + arms (no wristband) */}
      <path d="M30 87 Q20 91 19 107 L27 110 Q30 95 35 90 Z" fill={CH.jerseyShade} />
      <path d="M90 87 Q100 91 101 107 L93 110 Q90 95 85 90 Z" fill={CH.jersey} />
      <path d="M21 107 L19 136 Q19 140 23 140 L28 139 L30 109 Z" fill={CH.skin} />
      <path d="M99 107 L101 136 Q101 140 97 140 L92 139 L90 109 Z" fill={CH.skin} />
      <circle cx="23" cy="142" r="6" fill={CH.skin} />
      <circle cx="97" cy="142" r="6" fill={CH.skin} />

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
      <path d="M31 44 Q30 18 60 13 Q90 18 89 44 Q89 60 75 65 Q60 69 45 65 Q31 60 31 44 Z" fill={CH.hair} />
      <path d="M40 52 L41 60" stroke={CH.hairLit} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
      <path d="M50 55 L50 62" stroke={CH.hairLit} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
      <path d="M60 56 L60 63" stroke={CH.hairLit} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
      <path d="M70 55 L70 62" stroke={CH.hairLit} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
      <path d="M80 52 L79 60" stroke={CH.hairLit} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
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
      {/* navy collar + crest dot */}
      <path d="M17 22 L22 27 L27 22 Z" fill={CH.navy} />
      <circle cx="29" cy="25" r="2" fill={CH.crestGold} />
      {/* satchel strap */}
      <path d="M15 21 L30 32" stroke={CH.strap} strokeWidth="3" strokeLinecap="round" />
      {/* mitt forearms */}
      <circle cx="11" cy="26" r="3.2" fill={CH.skin} />
      <circle cx="33" cy="26" r="3.2" fill={CH.skin} />
      {/* round head from above — short hair + a peek of face */}
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
          A friendly cartoon mascot drawn from life — big warm smile, short textured dark hair, warm tan. He wears a white Real
          Madrid home jersey (adidas stripes, gold piping, club crest, #7 on the back), blue jeans, and a brown leather laptop
          satchel slung cross-body, with the crest left visible.
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
        <SpecRow label="Face" v="Simple mascot · dot eyes · big warm smile · no beard" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Short · textured · natural hairline</>} />
        <SpecRow label="Skin" v={<><Sw c={CH.skin} /> Warm tan · flat fill</>} />
        <SpecRow label="Jersey" v={<><Sw c={CH.jersey} /> Real Madrid home · <Sw c={CH.crestGold} /> crest · #7</>} highlight />
        <SpecRow label="Jeans" v={<><Sw c={CH.denim} /> Blue denim · contrast stitch</>} />
        <SpecRow label="Shoes" v={<><Sw c={CH.shoe} /> Casual sneakers</>} />
        <SpecRow label="Satchel" v={<><Sw c={CH.satchel} /> Brown leather · cross-body · crest left visible</>} />
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
            explorer of the world.
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
          v0.6 · drawn from life
          <br />
          RM jersey · jeans
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
