// Avatar.tsx — Parthiv, the round-head portfolio mascot.
//
// Mascot-first, likeness-second. The brief: a charming stylized character
// in the spirit of Animal Crossing / Tomodachi Life / Nintendo mascots —
// a round head and a simple face (dot eyes + a warm smile), no realism: no
// elongated face, no jawline, no realistic faceting. Identity comes from
// the cues, not the features: a clean dark buzzcut WITH A FADE (dark on
// top stepping to lighter tones down the sides), warm tan skin, Real
// Madrid home kit (white jersey, navy shorts, #7), football socks, casual
// sneakers, and a brown leather laptop satchel cross-body.
//
// Proportions: a friendly biggish head on a real neck and a substantial
// body — not a head balanced on nothing.
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
  hair: '#241c17', // buzzcut crown (darkest)
  hairLit: '#3a2e25',
  fadeMid: '#473726', // fade — first step down from the crown
  fadeLow: '#6e533a', // fade — last step before skin
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
// Round head (~y11–85) on a real neck and a fuller body.
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="233" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* ── LEGS ── */}
      <rect x="47" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      <rect x="62" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      {/* football socks (white + navy band) */}
      <rect x="45" y="204" width="14" height="16" rx="4" fill={CH.sock} />
      <rect x="61" y="204" width="14" height="16" rx="4" fill={CH.sock} />
      <rect x="45" y="207" width="14" height="4" fill={CH.navy} />
      <rect x="61" y="207" width="14" height="4" fill={CH.navy} />
      {/* sneakers */}
      <path d="M40 218 Q40 214 46 214 L58 214 L61 220 L61 223 Q61 226 56 226 L43 226 Q40 226 40 223 Z" fill={CH.shoe} />
      <path d="M40 224 L61 224 L61 226 Q61 227 59 227 L42 227 Q40 227 40 225 Z" fill={CH.shoeSole} />
      <path d="M80 218 Q80 214 74 214 L62 214 L59 220 L59 223 Q59 226 64 226 L77 226 Q80 226 80 223 Z" fill={CH.shoe} />
      <path d="M80 224 L59 224 L59 226 Q59 227 61 227 L78 227 Q80 227 80 225 Z" fill={CH.shoeSole} />

      {/* ── SHORTS (navy) ── */}
      <path d="M37 158 L83 158 L81 188 L64 188 L60 174 L56 188 L39 188 Z" fill={CH.navy} />
      <rect x="40" y="183" width="15" height="4" fill={CH.jersey} opacity=".8" />
      <rect x="65" y="183" width="15" height="4" fill={CH.jersey} opacity=".8" />

      {/* ── NECK (drawn first; the collar overlaps its base) ── */}
      <path d="M52 80 L68 80 L70 101 L50 101 Z" fill={CH.skin} />
      <path d="M52 80 L60 80 L60 101 L50 101 Z" fill={CH.skinShade} opacity=".22" />

      {/* ── JERSEY (white, rounded shoulders) ── */}
      <path d="M36 116 Q36 100 52 99 L68 99 Q84 100 84 116 L88 160 L32 160 Z" fill={CH.jersey} />
      <path d="M60 99 L68 99 Q84 100 84 116 L88 160 L60 160 Z" fill={CH.jerseyLit} opacity=".45" />
      {/* collar V (navy) + crest */}
      <path d="M52 99 L60 110 L68 99 Z" fill={CH.navy} />
      <g transform="translate(74,121)">
        <path d="M0 -5 L4 -3 L4 3 L0 6 L-4 3 L-4 -3 Z" fill={CH.gold} />
        <circle cx="0" cy="0" r="2" fill={CH.navy} />
      </g>
      {/* short sleeves + navy cuffs */}
      <path d="M36 103 Q26 106 25 120 L33 123 Q36 110 41 106 Z" fill={CH.jersey} />
      <path d="M25 117 L33 120 L32 124 L24 122 Z" fill={CH.navy} />
      <path d="M84 103 Q94 106 95 120 L87 123 Q84 110 79 106 Z" fill={CH.jerseyLit} opacity=".9" />
      <path d="M95 117 L87 120 L88 124 L96 122 Z" fill={CH.navy} />

      {/* ── SATCHEL strap (cross-body) ── */}
      <path d="M80 105 L40 152 L44 156 L84 109 Z" fill={CH.strap} />

      {/* ── FOREARMS + MITT HANDS ── */}
      <path d="M26 122 L24 140 Q24 144 28 144 L33 143 L35 124 Z" fill={CH.skin} />
      <path d="M94 122 L96 140 Q96 144 92 144 L87 143 L85 124 Z" fill={CH.skin} />
      <circle cx="28" cy="146" r="6" fill={CH.skin} />
      <circle cx="92" cy="146" r="6" fill={CH.skin} />
      {/* gold wristband (through-line) */}
      <rect x="86" y="140" width="10" height="4" rx="1" fill={CH.gold} />

      {/* ── SATCHEL bag (left hip) ── */}
      <g transform="translate(34,156)">
        <path d="M-12 0 L12 0 L13 20 L-13 20 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="8" width="3" height="5" fill={CH.satchelDk} />
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} />
        <path d="M-12 3 L12 3" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── HEAD (round) ── */}
      <ellipse cx="60" cy="48" rx="36" ry="37" fill={CH.skin} />
      <ellipse cx="60" cy="72" rx="24" ry="10" fill={CH.skinShade} opacity=".14" />
      {/* ears */}
      <ellipse cx="24" cy="55" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="96" cy="55" rx="5" ry="7" fill={CH.skin} />

      {/* ── BUZZCUT WITH FADE ── three stacked caps: a lighter band shows
          below the dark crown at the temples (dark → fadeMid → fadeLow → skin) */}
      <path d="M22 57 Q22 12 60 9 Q98 12 98 57 Q93 43 83 39 Q60 36 37 39 Q27 43 22 57 Z" fill={CH.fadeLow} />
      <path d="M25 52 Q25 12 60 10 Q95 12 95 52 Q91 42 81 38 Q60 36 39 38 Q29 42 25 52 Z" fill={CH.fadeMid} />
      <path d="M28 46 Q28 13 60 10 Q92 13 92 46 Q88 39 80 37 Q60 36 40 37 Q32 39 28 46 Z" fill={CH.hair} />
      <path d="M38 27 Q60 18 82 27 Q60 23 38 27 Z" fill={CH.hairLit} opacity=".3" />

      {/* ── SIMPLE FACE ── */}
      <ellipse cx="49" cy="55" rx="3.2" ry="4.2" fill={CH.ink} />
      <ellipse cx="71" cy="55" rx="3.2" ry="4.2" fill={CH.ink} />
      <circle cx="50.1" cy="53" r="1.1" fill="#fff" opacity=".85" />
      <circle cx="72.1" cy="53" r="1.1" fill="#fff" opacity=".85" />
      <path d="M44 47 Q49 45 54 47" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M66 47 Q71 45 76 47" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="63" rx="2.2" ry="1.7" fill={CH.skinShade} opacity=".5" />
      <path d="M50 70 Q60 79 70 70" stroke={CH.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="66" rx="5.6" ry="3.2" fill={CH.blush} opacity=".33" />
      <ellipse cx="80" cy="66" rx="5.6" ry="3.2" fill={CH.blush} opacity=".33" />
    </PoseSvg>
  );
}

// ── SIDE VIEW (walking) ───────────────────────────────────────────────
export function AvatarSide({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="233" rx="28" ry="5" fill="rgba(0,0,0,.15)" />

      {/* back leg (stepping) */}
      <rect x="50" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      <rect x="49" y="204" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="49" y="207" width="13" height="4" fill={CH.navy} />
      <path d="M44 218 Q44 214 50 214 L60 214 L62 220 L62 223 Q62 226 57 226 L47 226 Q44 226 44 223 Z" fill={CH.shoe} opacity=".92" />
      <path d="M44 224 L62 224 L62 226 Q62 227 60 227 L46 227 Q44 227 44 225 Z" fill={CH.shoeSole} />

      {/* front leg (forward) */}
      <rect x="62" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      <rect x="62" y="204" width="13" height="16" rx="4" fill={CH.sock} />
      <rect x="62" y="207" width="13" height="4" fill={CH.navy} />
      <path d="M61 218 Q61 214 67 214 L79 214 L82 220 L82 223 Q82 226 77 226 L64 226 Q61 226 61 223 Z" fill={CH.shoe} />
      <path d="M61 224 L82 224 L82 226 Q82 227 80 227 L63 227 Q61 227 61 225 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M48 158 L80 158 L78 184 L64 186 L62 176 L60 186 L50 184 Z" fill={CH.navy} />

      {/* neck */}
      <path d="M54 80 L66 80 L66 101 L52 101 Z" fill={CH.skin} />
      <path d="M54 80 L59 80 L59 101 L52 101 Z" fill={CH.skinShade} opacity=".22" />

      {/* jersey torso (profile) */}
      <path d="M44 116 Q44 100 60 99 L74 100 Q80 101 80 116 L80 160 L46 160 Z" fill={CH.jersey} />
      <path d="M62 100 Q72 100 78 104 L80 160 L62 160 Z" fill={CH.jerseyLit} opacity=".4" />

      {/* back arm swung back */}
      <path d="M50 105 L41 119 L39 138 L46 140 L54 116 Z" fill={CH.jerseyShade} />
      <path d="M39 137 L37 144 Q37 147 41 146 L45 144 L46 140 Z" fill={CH.skinShade} />
      <circle cx="41" cy="146" r="5.4" fill={CH.skinShade} />
      {/* front arm forward */}
      <path d="M72 105 L82 116 L84 135 L77 138 L70 116 Z" fill={CH.jersey} />
      <path d="M84 134 L86 141 Q86 144 82 143 L78 141 L77 137 Z" fill={CH.skin} />
      <circle cx="84" cy="144" r="5.4" fill={CH.skin} />
      <rect x="79" y="138" width="9" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap + bag on the back hip */}
      <path d="M70 104 L46 150 L50 153 L74 108 Z" fill={CH.strap} />
      <g transform="translate(46,155)">
        <path d="M-11 0 L11 0 L12 19 L-12 19 Z" fill={CH.satchel} />
        <path d="M-12 -2 L12 -2 L11 8 L-11 8 Z" fill={CH.satchelLit} />
        <rect x="-3" y="4" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-8" y="-5" width="16" height="4" rx="1" fill={CH.laptop} />
      </g>

      {/* ── HEAD (round profile, facing right) ── */}
      <ellipse cx="56" cy="48" rx="35" ry="37" fill={CH.skin} />
      <ellipse cx="58" cy="72" rx="20" ry="9" fill={CH.skinShade} opacity=".13" />
      {/* ear (toward back) */}
      <ellipse cx="40" cy="54" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="40" cy="54" rx="2.4" ry="3.8" fill={CH.skinShade} opacity=".4" />
      {/* nose bump (front) */}
      <path d="M90 52 Q95 58 90 63 Q91 58 90 52 Z" fill={CH.skin} />

      {/* buzzcut with fade (profile): dark crown + back, faded lower edge */}
      <path d="M19 60 Q15 12 56 9 Q92 12 91 54 Q89 46 84 44 Q66 34 47 39 Q28 46 22 60 Q19 62 19 60 Z" fill={CH.fadeLow} />
      <path d="M21 56 Q17 12 56 10 Q90 13 89 51 Q87 45 82 43 Q65 34 47 39 Q29 46 24 56 Q21 58 21 56 Z" fill={CH.fadeMid} />
      <path d="M23 50 Q20 13 56 10 Q88 14 87 47 Q85 42 80 41 Q64 33 47 38 Q31 45 26 50 Q23 52 23 50 Z" fill={CH.hair} />
      <path d="M34 28 Q58 19 82 30 Q58 25 34 28 Z" fill={CH.hairLit} opacity=".3" />

      {/* simple face (facing right) */}
      <ellipse cx="72" cy="55" rx="3.2" ry="4.2" fill={CH.ink} />
      <circle cx="73" cy="53" r="1" fill="#fff" opacity=".85" />
      <path d="M66 47 Q71 45 77 48" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M81 69 Q86 73 91 68" stroke={CH.mouth} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="65" rx="5" ry="3" fill={CH.blush} opacity=".3" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="233" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* legs / socks / shoes */}
      <rect x="47" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      <rect x="62" y="186" width="11" height="21" rx="4" fill={CH.skin} />
      <rect x="45" y="204" width="14" height="16" rx="4" fill={CH.sock} />
      <rect x="61" y="204" width="14" height="16" rx="4" fill={CH.sock} />
      <rect x="45" y="207" width="14" height="4" fill={CH.navy} />
      <rect x="61" y="207" width="14" height="4" fill={CH.navy} />
      <path d="M40 218 Q40 214 46 214 L58 214 L61 220 L61 223 Q61 226 56 226 L43 226 Q40 226 40 223 Z" fill={CH.shoe} />
      <path d="M40 224 L61 224 L61 226 Q61 227 59 227 L42 227 Q40 227 40 225 Z" fill={CH.shoeSole} />
      <path d="M80 218 Q80 214 74 214 L62 214 L59 220 L59 223 Q59 226 64 226 L77 226 Q80 226 80 223 Z" fill={CH.shoe} />
      <path d="M80 224 L59 224 L59 226 Q59 227 61 227 L78 227 Q80 227 80 225 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M37 158 L83 158 L81 188 L64 188 L60 174 L56 188 L39 188 Z" fill={CH.navy} />

      {/* neck */}
      <path d="M52 80 L68 80 L70 101 L50 101 Z" fill={CH.skin} />

      {/* jersey back */}
      <path d="M36 116 Q36 100 52 99 L68 99 Q84 100 84 116 L88 160 L32 160 Z" fill={CH.jersey} />
      <path d="M60 99 L68 99 Q84 100 84 116 L88 160 L60 160 Z" fill={CH.jerseyLit} opacity=".45" />
      <path d="M52 99 L60 104 L68 99 Z" fill={CH.navy} />
      {/* name + number */}
      <rect x="48" y="120" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="125" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="147" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="17" fontWeight="700" fill={CH.navy}>
        7
      </text>

      {/* sleeves + arms */}
      <path d="M36 103 Q26 106 25 120 L33 123 Q36 110 41 106 Z" fill={CH.jerseyShade} />
      <path d="M25 117 L33 120 L32 124 L24 122 Z" fill={CH.navy} />
      <path d="M84 103 Q94 106 95 120 L87 123 Q84 110 79 106 Z" fill={CH.jersey} />
      <path d="M95 117 L87 120 L88 124 L96 122 Z" fill={CH.navy} />
      <path d="M26 122 L24 140 Q24 144 28 144 L33 143 L35 124 Z" fill={CH.skin} />
      <path d="M94 122 L96 140 Q96 144 92 144 L87 143 L85 124 Z" fill={CH.skin} />
      <circle cx="28" cy="146" r="6" fill={CH.skin} />
      <circle cx="92" cy="146" r="6" fill={CH.skin} />
      <rect x="24" y="140" width="10" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap diagonal + bag */}
      <path d="M40 105 L80 152 L84 148 L44 101 Z" fill={CH.strap} />
      <g transform="translate(84,156)">
        <path d="M-12 0 L12 0 L13 20 L-13 20 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
      </g>

      {/* ── HEAD (round, from behind) ── */}
      <ellipse cx="60" cy="48" rx="36" ry="37" fill={CH.skin} />
      <ellipse cx="24" cy="55" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="96" cy="55" rx="5" ry="7" fill={CH.skin} />
      {/* buzzcut from behind — the fade is most visible here: dark crown
          steps down to skin at the nape */}
      <path d="M22 58 Q22 12 60 9 Q98 12 98 58 Q98 80 84 86 Q60 92 36 86 Q22 80 22 58 Z" fill={CH.fadeLow} />
      <path d="M24 54 Q24 12 60 10 Q96 12 96 54 Q96 74 82 80 Q60 86 38 80 Q24 74 24 54 Z" fill={CH.fadeMid} />
      <path d="M27 50 Q27 13 60 10 Q93 13 93 50 Q93 67 80 73 Q60 79 40 73 Q27 67 27 50 Z" fill={CH.hair} />
      <path d="M38 27 Q60 18 82 27 Q60 23 38 27 Z" fill={CH.hairLit} opacity=".3" />
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
      {/* round head from above — buzzcut crown with a faded rim + face peek */}
      <circle cx="22" cy="16" r="9.4" fill={CH.fadeLow} />
      <circle cx="22" cy="16" r="8.4" fill={CH.hair} />
      <circle cx="22" cy="16" r="8.4" fill={CH.hairLit} opacity=".2" />
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
          A round-head mascot in the spirit of Animal Crossing &amp; Tomodachi Life — a round head and a simple, friendly face,
          never realistic. Identity comes from the cues, not the features: a clean dark buzzcut with faded sides, warm tan, Real
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
            <AvatarFront size={260} className="" />
          </Labeled>
          <Labeled label="Side · Walk">
            <AvatarSide size={260} />
          </Labeled>
          <Labeled label="Back · #7">
            <AvatarBack size={260} />
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
        <SpecRow label="Style" v="Round-head mascot · cozy indie (Animal Crossing · Tomodachi Life · Nintendo)" />
        <SpecRow label="Proportion" v="Round head · neck · balanced body · strong silhouette" highlight />
        <SpecRow label="Face" v="Simple mascot · dot eyes · warm smile · no realism" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Dark buzzcut · <Sw c={CH.fadeLow} /> faded sides</>} highlight />
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
          v0.4 · round-head mascot
          <br />
          neck + faded buzzcut
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
