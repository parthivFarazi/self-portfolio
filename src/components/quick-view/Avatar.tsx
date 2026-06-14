// Avatar.tsx — Parthiv, the round-head portfolio mascot.
//
// Mascot-first, likeness-second. The brief: a charming stylized character
// in the spirit of Animal Crossing / Tomodachi Life / Nintendo mascots —
// a big CIRCULAR head, a simple face (dot eyes + a warm smile), and NO
// realism: no elongated face, no jawline, no beard, no faceted shading.
// Identity comes from the cues, not the features: clean dark buzzcut, warm
// tan skin, Real Madrid home kit (white jersey, navy shorts, #10), football
// socks, casual sneakers, and a brown leather laptop satchel cross-body.
//
// AvatarFront is the only pose used in the app today (Quick View identity
// strip). It renders a bare <svg className="qv-avatar-svg"> so the
// quick-view CSS can crop it to a head-and-shoulders portrait. The other
// poses + the character sheet are shown on the /character preview route.

import type { ReactNode } from 'react';

// ── Palette (flat fills — no semi-realistic facets) ───────────────────
const CH = {
  skin: '#d8a574',
  skinShade: '#bd8657',
  hair: '#241c17',
  hairLit: '#3a2e25',
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
// Big round head (~y12–100) on a stubby kit body. Chibi proportions.
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="230" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* ── LEGS ── */}
      <rect x="47" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      <rect x="62" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      {/* football socks (white + navy band) */}
      <rect x="45" y="196" width="14" height="17" rx="4" fill={CH.sock} />
      <rect x="61" y="196" width="14" height="17" rx="4" fill={CH.sock} />
      <rect x="45" y="199" width="14" height="4" fill={CH.navy} />
      <rect x="61" y="199" width="14" height="4" fill={CH.navy} />
      {/* sneakers */}
      <path d="M40 211 Q40 207 46 207 L58 207 L61 213 L61 216 Q61 219 56 219 L43 219 Q40 219 40 216 Z" fill={CH.shoe} />
      <path d="M40 217 L61 217 L61 219 Q61 220 59 220 L42 220 Q40 220 40 218 Z" fill={CH.shoeSole} />
      <path d="M80 211 Q80 207 74 207 L62 207 L59 213 L59 216 Q59 219 64 219 L77 219 Q80 219 80 216 Z" fill={CH.shoe} />
      <path d="M80 217 L59 217 L59 219 Q59 220 61 220 L78 220 Q80 220 80 218 Z" fill={CH.shoeSole} />

      {/* ── SHORTS (navy) ── */}
      <path d="M37 150 L83 150 L81 178 L64 178 L60 165 L56 178 L39 178 Z" fill={CH.navy} />
      <rect x="40" y="173" width="15" height="4" fill={CH.jersey} opacity=".8" />
      <rect x="65" y="173" width="15" height="4" fill={CH.jersey} opacity=".8" />

      {/* ── JERSEY (white, rounded shoulders) ── */}
      <path d="M38 124 Q38 110 52 109 L68 109 Q82 110 82 124 L86 152 L34 152 Z" fill={CH.jersey} />
      <path d="M60 109 L68 109 Q82 110 82 124 L86 152 L60 152 Z" fill={CH.jerseyLit} opacity=".5" />
      {/* collar V (navy) + crest */}
      <path d="M53 109 L60 119 L67 109 Z" fill={CH.navy} />
      <g transform="translate(72,129)">
        <path d="M0 -5 L4 -3 L4 3 L0 6 L-4 3 L-4 -3 Z" fill={CH.gold} />
        <circle cx="0" cy="0" r="2" fill={CH.navy} />
      </g>
      {/* short sleeves + navy cuffs */}
      <path d="M40 113 Q30 116 29 128 L37 131 Q40 120 45 116 Z" fill={CH.jersey} />
      <path d="M29 125 L37 128 L36 132 L28 130 Z" fill={CH.navy} />
      <path d="M80 113 Q90 116 91 128 L83 131 Q80 120 75 116 Z" fill={CH.jerseyLit} opacity=".9" />
      <path d="M91 125 L83 128 L84 132 L92 130 Z" fill={CH.navy} />

      {/* ── SATCHEL strap (cross-body) ── */}
      <path d="M78 114 L40 150 L44 154 L82 118 Z" fill={CH.strap} />

      {/* ── FOREARMS + MITT HANDS ── */}
      <path d="M28 130 L26 146 Q26 150 30 150 L35 149 L37 131 Z" fill={CH.skin} />
      <path d="M92 130 L94 146 Q94 150 90 150 L85 149 L83 131 Z" fill={CH.skin} />
      <circle cx="30" cy="152" r="6" fill={CH.skin} />
      <circle cx="90" cy="152" r="6" fill={CH.skin} />
      {/* gold wristband (through-line) */}
      <rect x="84" y="146" width="10" height="4" rx="1" fill={CH.gold} />

      {/* ── SATCHEL bag (left hip) ── */}
      <g transform="translate(34,150)">
        <path d="M-12 0 L12 0 L13 20 L-13 20 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="8" width="3" height="5" fill={CH.satchelDk} />
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} />
        <path d="M-12 3 L12 3" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── HEAD (big & round) ── */}
      <ellipse cx="60" cy="56" rx="43" ry="44" fill={CH.skin} />
      {/* soft chin roundness — very subtle, not a facet */}
      <ellipse cx="60" cy="83" rx="29" ry="13" fill={CH.skinShade} opacity=".16" />
      {/* ears */}
      <ellipse cx="18" cy="64" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="102" cy="64" rx="5" ry="7" fill={CH.skin} />

      {/* ── BUZZCUT (clean cap + hairline) ── */}
      <path d="M17 58 Q17 16 60 13 Q103 16 103 58 Q100 47 92 43 Q60 30 28 43 Q20 47 17 58 Z" fill={CH.hair} />
      <path d="M28 31 Q60 19 92 31 Q60 25 28 31 Z" fill={CH.hairLit} opacity=".4" />

      {/* ── SIMPLE FACE ── */}
      <ellipse cx="47" cy="63" rx="3.4" ry="4.4" fill={CH.ink} />
      <ellipse cx="73" cy="63" rx="3.4" ry="4.4" fill={CH.ink} />
      <circle cx="48.2" cy="61" r="1.1" fill="#fff" opacity=".85" />
      <circle cx="74.2" cy="61" r="1.1" fill="#fff" opacity=".85" />
      <path d="M42 54 Q47 52 52 54" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M68 54 Q73 52 78 54" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="60" cy="71" rx="2.2" ry="1.8" fill={CH.skinShade} opacity=".5" />
      <path d="M50 79 Q60 88 70 79" stroke={CH.mouth} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="74" rx="6" ry="3.4" fill={CH.blush} opacity=".35" />
      <ellipse cx="82" cy="74" rx="6" ry="3.4" fill={CH.blush} opacity=".35" />
    </PoseSvg>
  );
}

// ── SIDE VIEW (walking) ───────────────────────────────────────────────
export function AvatarSide({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="230" rx="28" ry="5" fill="rgba(0,0,0,.15)" />

      {/* back leg (stepping) */}
      <rect x="50" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      <rect x="49" y="196" width="13" height="17" rx="4" fill={CH.sock} />
      <rect x="49" y="199" width="13" height="4" fill={CH.navy} />
      <path d="M44 211 Q44 207 50 207 L60 207 L62 213 L62 216 Q62 219 57 219 L47 219 Q44 219 44 216 Z" fill={CH.shoe} opacity=".92" />
      <path d="M44 217 L62 217 L62 219 Q62 220 60 220 L46 220 Q44 220 44 218 Z" fill={CH.shoeSole} />

      {/* front leg (forward) */}
      <rect x="62" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      <rect x="62" y="196" width="13" height="17" rx="4" fill={CH.sock} />
      <rect x="62" y="199" width="13" height="4" fill={CH.navy} />
      <path d="M61 211 Q61 207 67 207 L79 207 L82 213 L82 216 Q82 219 77 219 L64 219 Q61 219 61 216 Z" fill={CH.shoe} />
      <path d="M61 217 L82 217 L82 219 Q82 220 80 220 L63 220 Q61 220 61 218 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M48 150 L80 150 L78 176 L64 178 L62 168 L60 178 L50 176 Z" fill={CH.navy} />

      {/* jersey torso (profile) */}
      <path d="M44 110 Q44 108 60 108 L74 109 Q80 110 80 124 L79 152 L46 152 Z" fill={CH.jersey} />
      <path d="M62 109 Q72 109 78 112 L79 152 L62 152 Z" fill={CH.jerseyLit} opacity=".4" />

      {/* back arm swung back */}
      <path d="M50 114 L41 127 L39 145 L46 147 L54 124 Z" fill={CH.jerseyShade} />
      <path d="M39 144 L37 150 Q37 153 41 152 L45 150 L46 146 Z" fill={CH.skinShade} />
      <circle cx="41" cy="152" r="5.4" fill={CH.skinShade} />
      {/* front arm forward */}
      <path d="M72 114 L82 124 L84 142 L77 145 L70 124 Z" fill={CH.jersey} />
      <path d="M84 141 L86 148 Q86 151 82 150 L78 148 L77 144 Z" fill={CH.skin} />
      <circle cx="84" cy="151" r="5.4" fill={CH.skin} />
      <rect x="79" y="145" width="9" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap + bag on the back hip */}
      <path d="M70 112 L46 150 L50 153 L74 116 Z" fill={CH.strap} />
      <g transform="translate(46,150)">
        <path d="M-11 0 L11 0 L12 19 L-12 19 Z" fill={CH.satchel} />
        <path d="M-12 -2 L12 -2 L11 8 L-11 8 Z" fill={CH.satchelLit} />
        <rect x="-3" y="4" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-8" y="-5" width="16" height="4" rx="1" fill={CH.laptop} />
      </g>

      {/* ── HEAD (round profile, facing right) ── */}
      <ellipse cx="56" cy="56" rx="42" ry="44" fill={CH.skin} />
      <ellipse cx="58" cy="83" rx="24" ry="12" fill={CH.skinShade} opacity=".15" />
      {/* ear (toward back) */}
      <ellipse cx="40" cy="62" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="40" cy="62" rx="2.4" ry="3.8" fill={CH.skinShade} opacity=".4" />
      {/* nose bump (front) */}
      <path d="M97 60 Q102 66 97 71 Q98 66 97 60 Z" fill={CH.skin} />

      {/* buzzcut (covers crown + back, clean front hairline) */}
      <path d="M15 62 Q13 16 56 12 Q97 15 96 52 Q93 45 87 43 Q66 33 46 39 Q26 46 18 60 Z" fill={CH.hair} />
      <path d="M26 32 Q56 20 86 32 Q56 26 26 32 Z" fill={CH.hairLit} opacity=".4" />

      {/* simple face (facing right) */}
      <ellipse cx="74" cy="62" rx="3.3" ry="4.3" fill={CH.ink} />
      <circle cx="75" cy="60" r="1" fill="#fff" opacity=".85" />
      <path d="M68 54 Q73 52 79 55" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M84 76 Q89 81 94 75" stroke={CH.mouth} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="72" rx="5" ry="3" fill={CH.blush} opacity=".3" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="230" rx="30" ry="5" fill="rgba(0,0,0,.15)" />

      {/* legs / socks / shoes */}
      <rect x="47" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      <rect x="62" y="176" width="11" height="22" rx="4" fill={CH.skin} />
      <rect x="45" y="196" width="14" height="17" rx="4" fill={CH.sock} />
      <rect x="61" y="196" width="14" height="17" rx="4" fill={CH.sock} />
      <rect x="45" y="199" width="14" height="4" fill={CH.navy} />
      <rect x="61" y="199" width="14" height="4" fill={CH.navy} />
      <path d="M40 211 Q40 207 46 207 L58 207 L61 213 L61 216 Q61 219 56 219 L43 219 Q40 219 40 216 Z" fill={CH.shoe} />
      <path d="M40 217 L61 217 L61 219 Q61 220 59 220 L42 220 Q40 220 40 218 Z" fill={CH.shoeSole} />
      <path d="M80 211 Q80 207 74 207 L62 207 L59 213 L59 216 Q59 219 64 219 L77 219 Q80 219 80 216 Z" fill={CH.shoe} />
      <path d="M80 217 L59 217 L59 219 Q59 220 61 220 L78 220 Q80 220 80 218 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M37 150 L83 150 L81 178 L64 178 L60 165 L56 178 L39 178 Z" fill={CH.navy} />

      {/* jersey back */}
      <path d="M38 124 Q38 110 52 109 L68 109 Q82 110 82 124 L86 152 L34 152 Z" fill={CH.jersey} />
      <path d="M60 109 L68 109 Q82 110 82 124 L86 152 L60 152 Z" fill={CH.jerseyLit} opacity=".5" />
      <path d="M53 109 L60 114 L67 109 Z" fill={CH.navy} />
      {/* name + number */}
      <rect x="48" y="117" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="122" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="143" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="17" fontWeight="700" fill={CH.navy}>
        10
      </text>

      {/* sleeves + arms */}
      <path d="M40 113 Q30 116 29 128 L37 131 Q40 120 45 116 Z" fill={CH.jerseyShade} />
      <path d="M29 125 L37 128 L36 132 L28 130 Z" fill={CH.navy} />
      <path d="M80 113 Q90 116 91 128 L83 131 Q80 120 75 116 Z" fill={CH.jersey} />
      <path d="M91 125 L83 128 L84 132 L92 130 Z" fill={CH.navy} />
      <path d="M28 130 L26 146 Q26 150 30 150 L35 149 L37 131 Z" fill={CH.skin} />
      <path d="M92 130 L94 146 Q94 150 90 150 L85 149 L83 131 Z" fill={CH.skin} />
      <circle cx="30" cy="152" r="6" fill={CH.skin} />
      <circle cx="90" cy="152" r="6" fill={CH.skin} />
      <rect x="26" y="146" width="10" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap diagonal + bag */}
      <path d="M40 114 L80 150 L84 146 L44 110 Z" fill={CH.strap} />
      <g transform="translate(84,150)">
        <path d="M-12 0 L12 0 L13 20 L-13 20 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
      </g>

      {/* ── HEAD (round, from behind) ── */}
      <ellipse cx="60" cy="56" rx="43" ry="44" fill={CH.skin} />
      <ellipse cx="18" cy="64" rx="5" ry="7" fill={CH.skin} />
      <ellipse cx="102" cy="64" rx="5" ry="7" fill={CH.skin} />
      {/* buzzcut covers the whole scalp from behind, down to the nape */}
      <path d="M17 58 Q17 14 60 12 Q103 14 103 58 Q103 82 86 91 Q60 99 34 91 Q17 82 17 58 Z" fill={CH.hair} />
      <path d="M28 30 Q60 18 92 30 Q60 24 28 30 Z" fill={CH.hairLit} opacity=".35" />
      {/* nape fade lines */}
      <path d="M40 80 Q60 88 80 80" stroke={CH.hairLit} strokeWidth=".8" fill="none" opacity=".4" />
      <path d="M46 88 Q60 94 74 88" stroke={CH.hairLit} strokeWidth=".8" fill="none" opacity=".3" />
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
      {/* round head from above — buzzcut crown + a peek of face */}
      <circle cx="22" cy="16" r="9" fill={CH.hair} />
      <circle cx="22" cy="16" r="9" fill={CH.hairLit} opacity=".2" />
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
          A round-head mascot in the spirit of Animal Crossing &amp; Tomodachi Life — a big circular head and a simple, friendly
          face, never realistic. Identity comes from the cues, not the features: clean dark buzzcut, warm tan, Real Madrid home
          whites, football socks, casual sneakers, and a brown leather laptop satchel slung cross-body.
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
          <Labeled label="Back · #10">
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
        <SpecRow label="Proportion" v="Big circular head · chibi · strong silhouette" highlight />
        <SpecRow label="Face" v="Simple mascot · dot eyes · warm smile · no realism" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Clean dark buzzcut</>} />
        <SpecRow label="Skin" v={<><Sw c={CH.skin} /> Warm tan · flat fill</>} />
        <SpecRow label="Kit" v={<><Sw c={CH.jersey} /> White jersey · <Sw c={CH.navy} /> navy shorts · #10</>} />
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
          v0.3 · round-head mascot
          <br />
          stylized, mascot-first
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
