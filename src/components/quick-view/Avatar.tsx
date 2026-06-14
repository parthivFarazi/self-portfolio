// Avatar.tsx — Parthiv, the low-poly portfolio mascot.
// Cozy indie-game aesthetic (Animal Crossing / A Short Hike / Haven Park).
// Big-head proportions (~45% head, 55% body), clean dark buzzcut,
// Real Madrid home kit (white jersey, navy shorts, socks, sneakers),
// brown leather laptop satchel worn cross-body.
// Faceted two-tone shading, light from upper-right.
//
// AvatarFront is the only pose used in the app today (Quick View identity
// strip). It renders a bare <svg className="qv-avatar-svg"> so the
// quick-view CSS can crop it to a head-and-shoulders portrait. The other
// poses + the character sheet are shown on the /character preview route.

import type { ReactNode } from 'react';

// ── Palette ───────────────────────────────────────────────────────────
const CH = {
  skin: '#d8a574',
  skinLit: '#e6b988',
  skinShade: '#bd8657',
  hair: '#241c17',
  hairLit: '#3a2e25',
  beard: '#2c211a',
  jersey: '#f4f1ea', // Real Madrid home white
  jerseyLit: '#ffffff',
  jerseyShade: '#d9d3c6',
  navy: '#15213f', // dark shorts
  navyLit: '#243559',
  navyShade: '#0d1528',
  sock: '#eceadf',
  sockShade: '#cdc8b8',
  sockBand: '#15213f',
  shoe: '#f0ede4',
  shoeShade: '#cfcabb',
  shoeSole: '#3a332b',
  satchel: '#9a6a3c', // brown leather
  satchelLit: '#b3824f',
  satchelShade: '#6f4a26',
  satchelDk: '#553718',
  strap: '#7d5630',
  gold: '#c8a94a', // collegiate-gold accent + crest
  ink: '#1a1410',
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
// Head ≈ y6–y112 (~45%). Body ≈ y112–y232 (~55%).
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      {/* ground shadow */}
      <ellipse cx="60" cy="232" rx="34" ry="6" fill="rgba(0,0,0,.16)" />

      {/* ── LEGS ── */}
      {/* socks */}
      <path d="M44 196 L44 214 L57 214 L58 196 Z" fill={CH.sock} />
      <path d="M62 196 L63 214 L76 214 L76 196 Z" fill={CH.sock} />
      <path d="M44 196 L51 196 L51 214 L44 214 Z" fill={CH.sockShade} opacity=".5" />
      <path d="M69 196 L76 196 L76 214 L69 214 Z" fill={CH.sockShade} opacity=".5" />
      {/* sock bands */}
      <rect x="44" y="198" width="14" height="3" fill={CH.sockBand} />
      <rect x="62" y="198" width="14" height="3" fill={CH.sockBand} />
      {/* shins (skin) */}
      <path d="M45 176 L44 196 L58 196 L58 176 Z" fill={CH.skin} />
      <path d="M62 176 L62 196 L76 196 L75 176 Z" fill={CH.skin} />
      <path d="M52 176 L58 176 L58 196 L52 196 Z" fill={CH.skinShade} opacity=".4" />
      <path d="M69 176 L75 176 L76 196 L69 196 Z" fill={CH.skinShade} opacity=".4" />

      {/* ── SHOES (casual sneakers) ── */}
      <path d="M40 214 L58 214 L59 222 L57 226 L40 226 L38 220 Z" fill={CH.shoe} />
      <path d="M62 214 L80 214 L82 220 L80 226 L63 226 L61 222 Z" fill={CH.shoe} />
      <path d="M50 214 L58 214 L59 222 L52 224 Z" fill={CH.shoeShade} opacity=".5" />
      <path d="M72 214 L80 214 L82 220 L74 224 Z" fill={CH.shoeShade} opacity=".5" />
      {/* soles */}
      <path d="M38 224 L57 224 L57 227 L38 227 Z" fill={CH.shoeSole} />
      <path d="M61 224 L82 224 L82 227 L61 227 Z" fill={CH.shoeSole} />
      {/* laces hint */}
      <path d="M47 216 L50 218 M46 219 L49 221" stroke={CH.shoeShade} strokeWidth="1" strokeLinecap="round" />
      <path d="M70 216 L73 218 M69 219 L72 221" stroke={CH.shoeShade} strokeWidth="1" strokeLinecap="round" />

      {/* ── SHORTS (navy) ── */}
      <path d="M40 150 L80 150 L78 178 L63 178 L60 162 L57 178 L42 178 Z" fill={CH.navy} />
      {/* shorts shading right-lit: left side darker */}
      <path d="M40 150 L60 150 L57 178 L42 178 Z" fill={CH.navyShade} opacity=".45" />
      {/* shorts hem trim (white) */}
      <path d="M42 174 L57 174 L57 178 L42 178 Z" fill={CH.jersey} opacity=".8" />
      <path d="M63 174 L78 174 L78 178 L63 178 Z" fill={CH.jersey} opacity=".8" />

      {/* ── JERSEY (white, short sleeves) ── */}
      {/* torso */}
      <path d="M37 108 L83 108 L86 150 L34 150 Z" fill={CH.jersey} />
      {/* right-lit highlight on right half */}
      <path d="M60 108 L83 108 L86 150 L60 150 Z" fill={CH.jerseyLit} opacity=".55" />
      {/* left shadow */}
      <path d="M37 108 L46 108 L44 150 L34 150 Z" fill={CH.jerseyShade} opacity=".6" />
      {/* collar V (navy + gold) */}
      <path d="M52 108 L60 120 L68 108 Z" fill={CH.navy} />
      <path d="M54 108 L60 116 L66 108 Z" fill={CH.skin} />
      {/* club crest */}
      <g transform="translate(74,124)">
        <path d="M0 -5 L4 -3 L4 3 L0 6 L-4 3 L-4 -3 Z" fill={CH.gold} />
        <circle cx="0" cy="0" r="2" fill={CH.navy} />
      </g>
      {/* sleeves */}
      <path d="M37 108 L28 116 L26 134 L34 136 L40 118 Z" fill={CH.jersey} />
      <path d="M83 108 L92 116 L94 134 L86 136 L80 118 Z" fill={CH.jerseyLit} />
      {/* sleeve navy cuffs */}
      <path d="M26 130 L34 132 L33 137 L25 135 Z" fill={CH.navy} />
      <path d="M86 132 L94 130 L95 135 L87 137 Z" fill={CH.navy} />

      {/* ── SATCHEL strap (cross-body, over right shoulder to left hip) ── */}
      <path d="M80 112 L40 150 L44 154 L84 116 Z" fill={CH.strap} />
      <path d="M80 112 L40 150 L42 152 L82 114 Z" fill={CH.satchelShade} opacity=".5" />

      {/* ── FOREARMS + HANDS ── */}
      <path d="M26 134 L24 152 L31 154 L33 136 Z" fill={CH.skin} />
      <path d="M94 134 L96 152 L89 154 L87 136 Z" fill={CH.skin} />
      <circle cx="27" cy="156" r="5" fill={CH.skin} />
      <circle cx="93" cy="156" r="5" fill={CH.skinLit} />
      {/* GT-gold wristband (through-line) on left wrist (viewer right) */}
      <rect x="88" y="150" width="10" height="4" rx="1" fill={CH.gold} />

      {/* ── SATCHEL bag (on left hip, viewer-left) ── */}
      <g transform="translate(34,150)">
        <path d="M-12 0 L12 0 L14 22 L-14 22 Z" fill={CH.satchel} />
        <path d="M2 0 L12 0 L14 22 L2 22 Z" fill={CH.satchelLit} opacity=".5" />
        <path d="M-12 0 L-6 0 L-8 22 L-14 22 Z" fill={CH.satchelShade} opacity=".55" />
        {/* flap */}
        <path d="M-14 -2 L14 -2 L13 10 L-13 10 Z" fill={CH.satchelLit} />
        <path d="M-14 -2 L14 -2 L13 1 L-14 1 Z" fill={CH.satchel} opacity=".4" />
        {/* buckle */}
        <rect x="-3" y="6" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="9" width="3" height="5" fill={CH.satchelDk} />
        {/* laptop peeking from top */}
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} opacity=".8" />
        {/* stitch line */}
        <path d="M-13 4 L13 4" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── NECK ── */}
      <path d="M53 100 L67 100 L66 110 L54 110 Z" fill={CH.skinShade} />
      <path d="M53 100 L60 100 L60 109 L54 109 Z" fill={CH.skin} />

      {/* ── HEAD (big, faceted) ── */}
      {/* face base */}
      <path d="M38 44 L42 26 L60 18 L78 26 L82 44 L80 78 L70 96 L50 96 L40 78 Z" fill={CH.skin} />
      {/* right-lit highlight */}
      <path d="M60 18 L78 26 L82 44 L80 78 L70 96 L60 96 Z" fill={CH.skinLit} opacity=".45" />
      {/* left cheek shadow */}
      <path d="M38 44 L42 26 L48 24 L46 78 L40 78 Z" fill={CH.skinShade} opacity=".5" />

      {/* ── BUZZCUT (tight cap, clean hairline) ── */}
      <path d="M37 46 L40 24 L60 14 L80 24 L83 46 L80 40 L78 30 Q60 20 42 30 L40 40 Z" fill={CH.hair} />
      {/* skull cap top */}
      <path d="M40 40 Q60 22 80 40 L80 30 Q60 16 40 30 Z" fill={CH.hairLit} opacity=".5" />
      {/* buzzcut sides */}
      <path d="M37 46 L40 40 L41 58 L38 58 Z" fill={CH.hair} />
      <path d="M83 46 L80 40 L79 58 L82 58 Z" fill={CH.hair} />
      {/* faded sideburns */}
      <path d="M40 56 L43 56 L43 64 L41 62 Z" fill={CH.hair} opacity=".7" />
      <path d="M80 56 L77 56 L77 64 L79 62 Z" fill={CH.hair} opacity=".7" />
      {/* hairline stipple (buzz texture) */}
      <path d="M44 30 Q60 22 76 30" stroke={CH.hairLit} strokeWidth="1" fill="none" opacity=".5" />

      {/* ── BEARD (short, groomed) ── */}
      <path d="M42 70 L46 86 L60 94 L74 86 L78 70 Q70 80 60 80 Q50 80 42 70 Z" fill={CH.beard} />
      <path d="M42 70 L41 60 L44 60 L45 72 Z" fill={CH.beard} opacity=".8" />
      <path d="M78 70 L79 60 L76 60 L75 72 Z" fill={CH.beard} opacity=".8" />

      {/* ── FACE FEATURES ── */}
      {/* brows */}
      <path d="M46 50 L55 49" stroke={CH.hair} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M65 49 L74 50" stroke={CH.hair} strokeWidth="2.4" strokeLinecap="round" />
      {/* eyes */}
      <ellipse cx="50" cy="56" rx="2.4" ry="2.8" fill={CH.ink} />
      <ellipse cx="70" cy="56" rx="2.4" ry="2.8" fill={CH.ink} />
      <circle cx="51" cy="55" r=".8" fill="#fff" opacity=".8" />
      <circle cx="71" cy="55" r=".8" fill="#fff" opacity=".8" />
      {/* nose */}
      <path d="M59 58 L58 66 L62 66 L61 58 Z" fill={CH.skinShade} opacity=".55" />
      {/* warm smile */}
      <path d="M52 72 Q60 78 68 72" stroke={CH.beard} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </PoseSvg>
  );
}

// ── SIDE VIEW (walking) ───────────────────────────────────────────────
export function AvatarSide({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="232" rx="30" ry="6" fill="rgba(0,0,0,.16)" />

      {/* back leg (stepping) */}
      <path d="M58 150 L52 196 L60 196 L64 152 Z" fill={CH.navy} />
      <path d="M52 196 L52 214 L60 214 L60 196 Z" fill={CH.sock} />
      <rect x="52" y="198" width="8" height="3" fill={CH.sockBand} />
      <path d="M48 214 L60 214 L62 222 L60 226 L46 226 L44 220 Z" fill={CH.shoeShade} />
      <path d="M44 224 L60 224 L60 227 L44 227 Z" fill={CH.shoeSole} />

      {/* front leg (forward) */}
      <path d="M60 150 L66 150 L74 194 L66 196 L60 156 Z" fill={CH.navyLit} />
      <path d="M66 196 L74 194 L77 212 L69 214 Z" fill={CH.sock} />
      <rect x="67" y="198" width="9" height="3" fill={CH.sockBand} transform="rotate(6 71 199)" />
      <path d="M68 213 L78 211 L84 216 L84 221 L70 224 L67 219 Z" fill={CH.shoe} />
      <path d="M67 222 L84 219 L85 222 L68 225 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M50 132 L74 132 L76 156 L58 158 L54 156 Z" fill={CH.navy} />
      <path d="M50 132 L60 132 L58 158 L52 156 Z" fill={CH.navyShade} opacity=".4" />
      <path d="M52 152 L74 150 L75 154 L53 156 Z" fill={CH.jersey} opacity=".7" />

      {/* jersey torso (profile) */}
      <path d="M48 92 L74 90 L78 132 L48 134 Z" fill={CH.jersey} />
      <path d="M62 90 L74 90 L78 132 L62 132 Z" fill={CH.jerseyLit} opacity=".4" />
      {/* back arm swung back */}
      <path d="M50 96 L40 112 L36 130 L44 132 L52 110 Z" fill={CH.jerseyShade} />
      <path d="M36 130 L44 132 L42 148 L34 146 Z" fill={CH.skinShade} />
      <circle cx="38" cy="150" r="5" fill={CH.skinShade} />
      {/* front arm forward */}
      <path d="M72 96 L82 110 L86 128 L78 130 L70 112 Z" fill={CH.jersey} />
      <path d="M86 128 L78 130 L80 146 L88 144 Z" fill={CH.skin} />
      <circle cx="86" cy="148" r="5" fill={CH.skinLit} />
      <rect x="82" y="142" width="9" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap across back-to-front */}
      <path d="M70 94 L44 132 L48 135 L74 97 Z" fill={CH.strap} />
      {/* satchel bag on the back hip */}
      <g transform="translate(44,134)">
        <path d="M-10 0 L10 0 L12 20 L-12 20 Z" fill={CH.satchel} />
        <path d="M-12 -2 L12 -2 L11 9 L-11 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-8" y="-5" width="16" height="4" rx="1" fill={CH.laptop} />
      </g>

      {/* neck */}
      <path d="M56 84 L66 84 L65 94 L57 94 Z" fill={CH.skinShade} />

      {/* head profile (big) */}
      <path d="M46 30 L52 18 L70 18 L80 30 L82 52 L78 74 L66 88 L52 86 L46 70 Z" fill={CH.skin} />
      <path d="M64 18 L70 18 L80 30 L82 52 L78 74 L66 88 L62 86 L64 30 Z" fill={CH.skinLit} opacity=".4" />
      {/* ear */}
      <ellipse cx="60" cy="54" rx="4" ry="6" fill={CH.skinShade} />
      <ellipse cx="60" cy="54" rx="2" ry="3.5" fill={CH.skin} />
      {/* buzzcut */}
      <path d="M45 50 L48 24 L70 14 L82 28 L83 50 L80 38 Q62 22 48 36 Z" fill={CH.hair} />
      <path d="M48 36 Q62 22 80 38 L82 30 Q64 16 48 28 Z" fill={CH.hairLit} opacity=".5" />
      <path d="M45 50 L48 36 L48 60 L45 60 Z" fill={CH.hair} />
      {/* beard profile */}
      <path d="M50 64 L52 80 L66 86 L76 72 Q68 78 58 76 Q52 74 50 64 Z" fill={CH.beard} />
      {/* features (facing right) */}
      <path d="M70 48 L78 49" stroke={CH.hair} strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="74" cy="55" rx="2.2" ry="2.6" fill={CH.ink} />
      <circle cx="75" cy="54" r=".7" fill="#fff" opacity=".8" />
      <path d="M80 58 L82 64 L78 65 Z" fill={CH.skinShade} opacity=".6" />
      <path d="M72 74 Q78 76 81 72" stroke={CH.beard} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="232" rx="34" ry="6" fill="rgba(0,0,0,.16)" />

      {/* legs / socks / shoes */}
      <path d="M45 176 L44 196 L58 196 L58 176 Z" fill={CH.skin} />
      <path d="M62 176 L62 196 L76 196 L75 176 Z" fill={CH.skin} />
      <path d="M44 196 L44 214 L57 214 L58 196 Z" fill={CH.sock} />
      <path d="M62 196 L63 214 L76 214 L76 196 Z" fill={CH.sock} />
      <rect x="44" y="198" width="14" height="3" fill={CH.sockBand} />
      <rect x="62" y="198" width="14" height="3" fill={CH.sockBand} />
      <path d="M40 214 L58 214 L59 222 L57 226 L40 226 L38 220 Z" fill={CH.shoe} />
      <path d="M62 214 L80 214 L82 220 L80 226 L63 226 L61 222 Z" fill={CH.shoe} />
      <path d="M38 224 L57 224 L57 227 L38 227 Z" fill={CH.shoeSole} />
      <path d="M61 224 L82 224 L82 227 L61 227 Z" fill={CH.shoeSole} />

      {/* shorts */}
      <path d="M40 150 L80 150 L78 178 L63 178 L60 162 L57 178 L42 178 Z" fill={CH.navy} />
      <path d="M40 150 L60 150 L57 178 L42 178 Z" fill={CH.navyShade} opacity=".4" />

      {/* jersey back */}
      <path d="M37 108 L83 108 L86 150 L34 150 Z" fill={CH.jersey} />
      <path d="M60 108 L83 108 L86 150 L60 150 Z" fill={CH.jerseyLit} opacity=".5" />
      <path d="M37 108 L46 108 L44 150 L34 150 Z" fill={CH.jerseyShade} opacity=".6" />
      {/* collar */}
      <path d="M52 108 L60 114 L68 108 Z" fill={CH.navy} />
      {/* jersey number + name bar */}
      <rect x="48" y="116" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="121" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="142" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="18" fontWeight="700" fill={CH.navy}>
        10
      </text>

      {/* sleeves */}
      <path d="M37 108 L28 116 L26 134 L34 136 L40 118 Z" fill={CH.jerseyShade} />
      <path d="M83 108 L92 116 L94 134 L86 136 L80 118 Z" fill={CH.jersey} />
      <path d="M26 130 L34 132 L33 137 L25 135 Z" fill={CH.navy} />
      <path d="M86 132 L94 130 L95 135 L87 137 Z" fill={CH.navy} />
      <path d="M26 134 L24 152 L31 154 L33 136 Z" fill={CH.skin} />
      <path d="M94 134 L96 152 L89 154 L87 136 Z" fill={CH.skin} />
      <circle cx="27" cy="156" r="5" fill={CH.skin} />
      <circle cx="93" cy="156" r="5" fill={CH.skinLit} />
      <rect x="22" y="150" width="10" height="4" rx="1" fill={CH.gold} />

      {/* satchel strap diagonal across back */}
      <path d="M40 112 L80 150 L84 146 L44 108 Z" fill={CH.strap} />
      <path d="M40 112 L80 150 L82 148 L42 110 Z" fill={CH.satchelShade} opacity=".5" />
      {/* satchel on hip (viewer-left from behind = right hip) */}
      <g transform="translate(84,150)">
        <path d="M-12 0 L12 0 L14 22 L-14 22 Z" fill={CH.satchel} />
        <path d="M-12 -2 L14 -2 L13 10 L-13 10 Z" fill={CH.satchelLit} />
        <rect x="-3" y="6" width="6" height="6" rx="1" fill={CH.gold} />
        <path d="M-13 4 L13 4" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* neck */}
      <path d="M53 100 L67 100 L66 110 L54 110 Z" fill={CH.skinShade} />

      {/* head back (buzzcut) */}
      <path d="M38 44 L42 26 L60 18 L78 26 L82 44 L80 74 L60 84 L40 74 Z" fill={CH.hair} />
      <path d="M40 30 Q60 20 80 30 L80 44 Q60 36 40 44 Z" fill={CH.hairLit} opacity=".4" />
      {/* nape fade */}
      <path d="M44 70 Q60 78 76 70 L76 74 Q60 82 44 74 Z" fill={CH.beard} opacity=".7" />
      {/* buzz crown lines */}
      <path d="M46 32 Q60 24 74 32" stroke={CH.hairLit} strokeWidth=".8" fill="none" opacity=".5" />
      <path d="M44 44 Q60 36 76 44" stroke={CH.hairLit} strokeWidth=".8" fill="none" opacity=".4" />
      {/* ears */}
      <ellipse cx="40" cy="50" rx="3" ry="5" fill={CH.skinShade} />
      <ellipse cx="80" cy="50" rx="3" ry="5" fill={CH.skin} />
    </PoseSvg>
  );
}

// ── TOP-DOWN TOKEN (for the island prototype) ─────────────────────────
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
      <ellipse cx="22" cy="27" rx="13" ry="10" fill={CH.jersey} />
      <ellipse cx="22" cy="27" rx="13" ry="10" fill="none" stroke="rgba(0,0,0,.12)" />
      {/* navy collar + crest */}
      <path d="M16 20 L22 26 L28 20 Z" fill={CH.navy} />
      <circle cx="30" cy="24" r="2" fill={CH.gold} />
      {/* satchel strap */}
      <path d="M14 20 L30 32" stroke={CH.strap} strokeWidth="3" strokeLinecap="round" />
      {/* forearms */}
      <circle cx="11" cy="25" r="3.4" fill={CH.skin} />
      <circle cx="33" cy="25" r="3.4" fill={CH.skin} />
      <circle cx="11" cy="25" r="3.8" fill="none" stroke={CH.gold} strokeWidth="1.4" />
      {/* head — buzzcut from above */}
      <circle cx="22" cy="16" r="8" fill={CH.hair} />
      <circle cx="22" cy="16" r="8" fill={CH.hairLit} opacity=".25" />
      <path d="M15 18 Q22 23 29 18 Q22 14 15 18 Z" fill={CH.skin} />
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
          <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>low-poly · the mascot</div>
        </div>
        <h2 style={{ font: '500 46px/.95 "Pixelify Sans", var(--rw-serif)', margin: 0, color: 'var(--rw-ink)' }}>
          Parthiv,
          <br />
          the explorer.
        </h2>
        <p style={{ font: '13px/1.5 var(--rw-sans)', color: 'var(--rw-ink-soft)', margin: 0, maxWidth: 380 }}>
          Big-head indie proportions (~45% head). Clean dark buzzcut, short beard, warm tan. Real Madrid home kit — white
          jersey, navy shorts, banded socks, casual sneakers — with a brown leather laptop satchel slung cross-body. Soccer +
          tech, instantly.
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
        <SpecRow label="Style" v="Soft low-poly · cozy indie (Animal Crossing · A Short Hike · Haven Park)" />
        <SpecRow label="Proportion" v="≈ 45% head / 55% body · strong silhouette" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Clean dark buzzcut · faded sides</>} />
        <SpecRow label="Beard" v={<><Sw c={CH.beard} /> Short · groomed jawline</>} />
        <SpecRow label="Skin" v={<><Sw c={CH.skin} /> Warm tan · two-tone facets</>} />
        <SpecRow label="Kit" v={<><Sw c={CH.jersey} /> White jersey · <Sw c={CH.navy} /> navy shorts · #10</>} />
        <SpecRow label="Socks" v={<><Sw c={CH.sock} /> Football socks · <Sw c={CH.navy} /> band</>} />
        <SpecRow label="Shoes" v={<><Sw c={CH.shoe} /> Casual sneakers</>} />
        <SpecRow label="Satchel" v={<><Sw c={CH.satchel} /> Brown leather · cross-body · laptop inside</>} highlight />
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
            ⚽ soccer · 💻 technology · ✦ creativity — the mascot &amp; main explorer of the portfolio world, not a generic NPC.
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
          v0.2 · low-poly redesign
          <br />
          optimized for Three.js
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
