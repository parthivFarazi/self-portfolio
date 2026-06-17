// Avatar.tsx — Parthiv, the portfolio mascot.
//
// Mascot-first, likeness-second, modelled on a reference photo but drawn
// as a sharp, grown-up cartoon (not a baby-faced chibi): a defined
// jawline, full short dark hair (no thin spot), broad shoulders + traps on
// a V-taper torso, stronger brows and almond eyes, a confident smile, no
// beard, no blush. Warm tan skin. White Real Madrid home jersey (adidas
// shoulder stripes, gold piping, club crest on the chest, #7 on the back),
// blue jeans, white sneakers, brown leather laptop satchel cross-body with
// the strap routed so the chest crest stays visible. No wristband.
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
  neck: '#c08c5a', // a touch darker than the face — reads as the neck without a hard shadow
  hair: '#241c17',
  hairLit: '#3a2e25',
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
  gold: '#c8a94a', // satchel buckle
  crestGold: '#d4af37', // club crest
  crestBlue: '#16407a',
  ink: '#1a1410', // eyes
  mouth: '#5c3a28',
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

// Simplified Real Madrid crest — gold ring, white field, blue sash, crown.
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

// adidas three-stripe shoulder mark (positioned for the broad shoulders).
function ShoulderStripes({ mirror = false }: { mirror?: boolean }) {
  const d = mirror
    ? ['M92 93 L85 89', 'M90 96 L83 92', 'M88 99 L81 95']
    : ['M28 93 L35 89', 'M30 96 L37 92', 'M32 99 L39 95'];
  return (
    <g stroke={CH.ink} strokeWidth="1.6" strokeLinecap="round">
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </g>
  );
}

// ── QUICK-VIEW PORTRAIT ───────────────────────────────────────────────
// Flat-vector head-and-shoulders portrait (the polished "2D picture"),
// distinct from the mascot poses above. This is what the Quick View
// identity strip renders. Cel/flat shading, warm-tan skin ramp, hair as
// tonal masses, white Real Madrid home jersey. Composed to fill its own
// 400×400 frame, so the crop CSS only needs a light zoom — see
// `.qv-identity-avatar .qv-avatar-svg`.
const PR = {
  bg: '#fff8e2', // matches the identity frame so the portrait sits seamlessly
  vignette: '#fff8e2', // flat — no halo behind the head
  skin: '#C99670',
  skinShade: '#A87850',
  faceShade: '#8a5630', // deeper than skinShade — face planes need to hold at 72px
  hair: '#2E2823',
  hairFade: '#564C42', // lighter two-tone fade band at the sideburn
  hairLite: '#494037', // crown top-light
  eyeWhite: '#E8E4DC',
  iris: '#2A2622',
  lid: '#5e4334',
  jersey: '#F4F1EA', // Real Madrid home white
  jerseyShade: '#E7E6E0',
  navy: '#15213F',
  piping: '#E6A23C',
  crestGold: '#D4AF37',
  crestBlue: '#16407A',
  lipDark: '#8B5246',
  lip: '#A86E5C',
  teeth: '#ECE6DD',
} as const;

export function AvatarPortrait({ size = 118, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <clipPath id="qvPortraitFaceClip">
          <path d="M200 50 C244 50 280 83 283 127 C284 149 283 169 279 189 C275 210 267 227 254 242 C244 254 231 266 215 272 C210 274 205 275 200 275 C195 275 190 274 185 272 C169 266 156 254 146 242 C133 227 125 210 121 189 C117 169 116 149 117 127 C120 83 156 50 200 50 Z" />
        </clipPath>
      </defs>

      {/* background: darker oval so the white jersey + skin read against it */}
      <rect x="0" y="0" width="400" height="400" fill={PR.bg} />
      <ellipse cx="200" cy="188" rx="178" ry="200" fill={PR.vignette} />

      {/* NECK (same skin as the face; short, flares into the traps) */}
      <path d="M172 250 C173 268 171 285 174 300 C176 314 165 322 156 332 L244 332 C235 322 224 314 226 300 C229 285 227 268 228 250 C220 260 210 264 200 264 C190 264 180 260 172 250 Z" fill={PR.skin} />

      {/* BODY: white jersey, continuous shoulder slope filling the frame */}
      <path d="M38 400 L42 354 C44 336 62 330 88 329 C118 325 148 317 170 305 C180 316 190 321 200 321 C210 321 220 316 230 305 C252 317 282 325 312 329 C338 330 356 336 358 354 L362 400 Z" fill={PR.jersey} />
      <path d="M236 308 C262 320 290 327 314 330 C338 331 356 337 358 354 L362 400 L320 400 C320 364 290 326 236 308 Z" fill={PR.jerseyShade} />
      {/* adidas shoulder stripes on the trapezius slope */}
      <g stroke={PR.navy} strokeWidth="3.6" strokeLinecap="round">
        <path d="M156 314 L114 332" />
        <path d="M160 322 L118 340" />
        <path d="M164 330 L122 348" />
      </g>
      <g stroke={PR.navy} strokeWidth="3.6" strokeLinecap="round">
        <path d="M244 314 L286 332" />
        <path d="M240 322 L282 340" />
        <path d="M236 330 L278 348" />
      </g>
      {/* collar: clean shallow V */}
      <path d="M168 304 C179 314 190 318 200 318 C210 318 221 314 232 304 C227 312 221 316 213 321 C208 326 204 328 200 328 C196 328 192 326 187 321 C179 316 173 312 168 304 Z" fill={PR.navy} />
      <path d="M175 306 C184 313 192 316 200 316 C208 316 216 313 225 306 C220 312 215 315 208 319 C204 323 202 325 200 325 C198 325 196 323 192 319 C185 315 180 312 175 306 Z" fill={PR.jersey} />
      <path d="M178 308 C186 314 193 317 200 317 C207 317 214 314 222 308" fill="none" stroke={PR.piping} strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
      {/* club crest on the chest (viewer-left) */}
      <g transform="translate(170,358) scale(1.35)">
        <circle r="5.4" fill={PR.crestGold} />
        <circle cy="0.4" r="4.2" fill={PR.jersey} />
        <path d="M-3.6 2.2 L3.6 -2.4" stroke={PR.crestBlue} strokeWidth="1.7" />
        <path d="M-3.2 -3.3 L-2 -5 L-1 -3.5 L0 -5.4 L1 -3.5 L2 -5 L3.2 -3.3 Z" fill={PR.crestGold} />
      </g>

      {/* ears */}
      <ellipse cx="121" cy="186" rx="12" ry="24" fill={PR.skin} />
      <ellipse cx="279" cy="186" rx="12" ry="24" fill={PR.skin} />
      <path d="M117 180 C114 188 115 196 119 202 C117 194 117 186 120 180 Z" fill={PR.skinShade} opacity=".3" />
      <path d="M283 180 C286 188 285 196 281 202 C283 194 283 186 280 180 Z" fill={PR.skinShade} opacity=".3" />

      {/* face base */}
      <path d="M200 50 C244 50 280 83 283 127 C284 149 283 169 279 189 C275 210 267 227 254 242 C244 254 231 266 215 272 C210 274 205 275 200 275 C195 275 190 274 185 272 C169 266 156 254 146 242 C133 227 125 210 121 189 C117 169 116 149 117 127 C120 83 156 50 200 50 Z" fill={PR.skin} />

      {/* face shading — high contrast so the planes hold at 72px (no cheek shadow) */}
      <g clipPath="url(#qvPortraitFaceClip)">
        {/* form shadow down the right side of the face */}
        <path d="M258 124 C273 146 278 175 274 204 C270 227 261 242 250 251 C258 228 262 199 260 172 C258 150 258 136 258 124 Z" fill={PR.faceShade} opacity=".42" />
        {/* nose: right flank + tip */}
        <path d="M203 165 C210 178 212 197 210 213 C206 213 201 213 200 213 C200 197 201 180 203 165 Z" fill={PR.faceShade} opacity=".56" />
        <path d="M188 213 C195 218 205 218 212 213 C210 220 206 224 200 224 C194 224 190 220 188 213 Z" fill={PR.faceShade} opacity=".68" />
        {/* under the lower lip */}
        <path d="M186 249 C193 253 207 253 214 249 C211 255 206 257 200 257 C194 257 189 255 186 249 Z" fill={PR.faceShade} opacity=".44" />
      </g>

      {/* tight cast shadow JUST under the jaw (separates face from neck) */}
      <path d="M176 270 C185 278 192 282 200 282 C208 282 215 278 224 270 C222 278 216 285 208 288 C204 290 196 290 192 288 C184 285 178 278 176 270 Z" fill={PR.faceShade} opacity=".58" />

      {/* brows */}
      <path d="M147 151 C159 145 176 146 187 151 C176 149 159 149 148 154 Z" fill={PR.hair} />
      <path d="M213 151 C224 146 241 145 253 151 C242 149 224 149 213 154 Z" fill={PR.hair} />
      {/* eyes */}
      <path d="M150 161 C156 154 174 154 181 161 C174 167 156 167 150 161 Z" fill={PR.eyeWhite} />
      <path d="M219 161 C226 154 244 154 250 161 C244 167 226 167 219 161 Z" fill={PR.eyeWhite} />
      <circle cx="166" cy="161" r="5" fill={PR.iris} />
      <circle cx="234" cy="161" r="5" fill={PR.iris} />
      <circle cx="167.3" cy="159.6" r="1.3" fill="#fff" opacity=".75" />
      <circle cx="235.3" cy="159.6" r="1.3" fill="#fff" opacity=".75" />
      <path d="M151 159 C158 154 174 154 180 159" fill="none" stroke={PR.lid} strokeWidth="1.5" strokeLinecap="round" opacity=".45" />
      <path d="M220 159 C226 154 242 154 249 159" fill="none" stroke={PR.lid} strokeWidth="1.5" strokeLinecap="round" opacity=".45" />

      {/* mouth: warm smile */}
      <path d="M170 234 Q200 246 230 234 Q216 252 200 252 Q184 252 170 234 Z" fill={PR.lipDark} />
      <path d="M176 235 Q200 243 224 235 Q200 246 176 235 Z" fill={PR.teeth} />
      <path d="M170 234 Q200 239 230 234 Q200 237 170 234 Z" fill={PR.lip} />
      <path d="M182 250 Q200 255 218 250 Q200 258 182 250 Z" fill={PR.lip} opacity=".85" />

      {/* HAIR — rounder circular cap (crown y44) + lighter two-tone fade bands */}
      <path d="M120 158 C114 104 126 46 200 44 C274 46 286 104 280 158 C278 142 272 128 262 123 C251 117 241 119 233 125 C222 117 213 116 200 116 C187 116 177 117 167 125 C159 119 149 117 138 123 C128 128 122 142 120 158 Z" fill={PR.hair} />
      <path d="M120 158 C122 144 127 131 135 124 C134 135 132 147 131 157 C127 159 123 159 120 158 Z" fill={PR.hairFade} />
      <path d="M280 158 C278 144 273 131 265 124 C266 135 268 147 269 157 C273 159 277 159 280 158 Z" fill={PR.hairFade} />
      <path d="M150 78 C170 62 200 58 228 66 C246 72 256 86 258 100 C244 86 222 78 200 78 C178 78 162 84 152 96 C150 90 150 84 150 78 Z" fill={PR.hairLite} opacity=".5" />
    </svg>
  );
}

// ── FRONT VIEW ────────────────────────────────────────────────────────
export function AvatarFront({ size = 240, className = 'qv-avatar-svg' }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="31" ry="5" fill="rgba(0,0,0,.15)" />

      {/* ── JEANS ── */}
      <path d="M40 150 L80 150 L78 210 L64 210 L60 168 L56 210 L42 210 Z" fill={CH.denim} />
      <path d="M40 150 L60 150 L56 210 L42 210 Z" fill={CH.denimDark} opacity=".35" />
      <path d="M50 154 L50 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <path d="M70 154 L70 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <rect x="42" y="205" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <rect x="64" y="205" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      {/* sneakers */}
      <path d="M40 210 Q40 206 46 206 L58 206 L61 212 L61 215 Q61 218 56 218 L43 218 Q40 218 40 215 Z" fill={CH.shoe} />
      <path d="M40 216 L61 216 L61 218 Q61 219 59 219 L42 219 Q40 219 40 217 Z" fill={CH.shoeSole} />
      <path d="M80 210 Q80 206 74 206 L62 206 L59 212 L59 215 Q59 218 64 218 L77 218 Q80 218 80 215 Z" fill={CH.shoe} />
      <path d="M80 216 L59 216 L59 218 Q59 219 61 219 L78 219 Q80 219 80 217 Z" fill={CH.shoeSole} />

      {/* ── NECK (a shade darker than the face → reads as separate) ── */}
      <path d="M50 66 L70 66 L72 88 L48 88 Z" fill={CH.neck} />

      {/* ── JERSEY — broad shoulders + traps, V-taper torso ── */}
      <path d="M23 108 Q22 91 35 86 Q45 82 53 84 Q60 82 67 84 Q75 82 85 86 Q98 91 97 108 L86 156 L34 156 Z" fill={CH.jersey} />
      <path d="M60 84 Q67 84 75 86 Q85 86 97 108 L86 156 L60 156 Z" fill={CH.jerseyLit} opacity=".35" />
      {/* trap contours */}
      <path d="M53 87 Q44 90 36 96" stroke={CH.jerseyShade} strokeWidth="1.4" fill="none" opacity=".55" />
      <path d="M67 87 Q76 90 84 96" stroke={CH.jerseyShade} strokeWidth="1.4" fill="none" opacity=".55" />
      {/* gold side piping */}
      <path d="M34 92 Q31 122 35 154" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M86 92 Q89 122 85 154" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      {/* navy V collar */}
      <path d="M52 84 L60 93 L68 84 Z" fill={CH.navy} />
      <path d="M54 84 L60 90 L66 84 Z" fill={CH.skin} />
      <ShoulderStripes />
      <ShoulderStripes mirror />
      {/* broad short sleeves */}
      <path d="M23 90 Q13 95 12 113 L21 116 Q24 98 30 92 Z" fill={CH.jersey} />
      <path d="M97 90 Q107 95 108 113 L99 116 Q96 98 90 92 Z" fill={CH.jerseyLit} opacity=".9" />

      {/* ── CLUB CREST (viewer-left chest, kept clear of the strap) ── */}
      <Crest x={44} y={106} />

      {/* ── SATCHEL strap (right shoulder → left hip, crosses below the crest) ── */}
      <path d="M88 92 L36 152 L40 156 L92 96 Z" fill={CH.strap} />

      {/* ── FOREARMS + MITT HANDS (no wristband) ── */}
      <path d="M16 113 L14 143 Q14 147 18 147 L24 146 L26 115 Z" fill={CH.skin} />
      <path d="M104 113 L106 143 Q106 147 102 147 L96 146 L94 115 Z" fill={CH.skin} />
      <circle cx="20" cy="149" r="6.2" fill={CH.skin} />
      <circle cx="100" cy="149" r="6.2" fill={CH.skin} />

      {/* ── SATCHEL bag (left hip) ── */}
      <g transform="translate(34,160)">
        <path d="M-12 0 L12 0 L13 19 L-13 19 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-1.5" y="8" width="3" height="5" fill={CH.satchelDk} />
        <rect x="-9" y="-6" width="18" height="5" rx="1" fill={CH.laptop} />
        <rect x="-7" y="-5" width="14" height="2" fill={CH.laptopScr} />
        <path d="M-12 3 L12 3" stroke={CH.satchelDk} strokeWidth=".6" strokeDasharray="1.5 1.5" opacity=".6" />
      </g>

      {/* ── HEAD (defined jaw) ── */}
      <path d="M32 42 Q31 12 60 10 Q89 12 88 42 L86 54 Q82 65 71 70 Q60 74 49 70 Q38 65 34 54 L32 42 Z" fill={CH.skin} />
      {/* subtle jaw shadow for structure */}
      <path d="M37 58 Q60 73 83 58 Q80 66 71 70 Q60 74 49 70 Q40 66 37 58 Z" fill={CH.skinShade} opacity=".12" />

      {/* ── HAIR — short hair (not a cap): sideburns, a sheen, soft edge ── */}
      {/* sideburns tapering down in front of the ears */}
      <path d="M36 41 L37 53 Q39.5 53 40 47 L39 41 Z" fill={CH.hair} />
      <path d="M84 41 L83 53 Q80.5 53 80 47 L81 41 Z" fill={CH.hair} />
      {/* main hair mass — natural hairline, sides taper rather than wrap */}
      <path d="M34 45 Q31 11 60 9 Q89 11 86 45 Q84 35 78 31 Q70 27 60 28 Q50 27 42 31 Q36 35 34 45 Z" fill={CH.hair} />
      {/* a few strands across the hairline so the edge isn't a smooth band */}
      <path d="M47 29 Q49 26 52 29" stroke={CH.hair} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M58 28 Q60 25 63 28" stroke={CH.hair} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M68 29 Q71 26 73 29" stroke={CH.hair} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* soft sheen for volume */}
      <path d="M41 16 Q57 11 73 15 Q57 16 41 19 Z" fill={CH.hairLit} opacity=".35" />

      {/* ears (drawn over the hair so they read clearly) */}
      <ellipse cx="32" cy="47" rx="4.2" ry="6" fill={CH.skin} />
      <ellipse cx="88" cy="47" rx="4.2" ry="6" fill={CH.skin} />

      {/* ── FACE (sharp brows, almond eyes, confident smile — no blush) ── */}
      <path d="M44 41 Q50 38.5 55 41" stroke={CH.hair} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M65 41 Q70 38.5 76 41" stroke={CH.hair} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="47" rx="3.3" ry="2.7" fill={CH.ink} />
      <ellipse cx="70" cy="47" rx="3.3" ry="2.7" fill={CH.ink} />
      <path d="M46.5 44.6 Q50 43.4 53.5 44.6" stroke={CH.ink} strokeWidth="1" fill="none" opacity=".7" strokeLinecap="round" />
      <path d="M66.5 44.6 Q70 43.4 73.5 44.6" stroke={CH.ink} strokeWidth="1" fill="none" opacity=".7" strokeLinecap="round" />
      <circle cx="51.1" cy="46.2" r="1" fill="#fff" opacity=".85" />
      <circle cx="71.1" cy="46.2" r="1" fill="#fff" opacity=".85" />
      <path d="M58 51 Q57 56 60 57 Q63 56 62 51" stroke={CH.skinShade} strokeWidth="1" fill="none" opacity=".5" strokeLinecap="round" />
      <ellipse cx="60" cy="58" rx="2.2" ry="1.6" fill={CH.skinShade} opacity=".45" />
      <path d="M51 61 Q60 66 69 61 Q65 70 60 70 Q55 70 51 61 Z" fill={CH.mouth} />
      <path d="M52.5 61.5 Q60 64.5 67.5 61.5 Q60 66 52.5 61.5 Z" fill="#fff" />
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
      <path d="M44 210 Q44 206 50 206 L60 206 L62 212 L62 215 Q62 218 57 218 L47 218 Q44 218 44 215 Z" fill={CH.shoe} opacity=".92" />
      <path d="M44 216 L62 216 L62 218 Q62 219 60 219 L46 219 Q44 219 44 217 Z" fill={CH.shoeSole} />
      <path d="M61 210 Q61 206 67 206 L79 206 L82 212 L82 215 Q82 218 77 218 L64 218 Q61 218 61 215 Z" fill={CH.shoe} />
      <path d="M61 216 L82 216 L82 218 Q82 219 80 219 L63 219 Q61 219 61 217 Z" fill={CH.shoeSole} />

      {/* neck — a shade darker than the face */}
      <path d="M52 66 L68 66 L68 88 L50 88 Z" fill={CH.neck} />

      {/* jersey torso (profile) — broad shoulder + trap */}
      <path d="M42 108 Q42 88 52 84 Q60 82 66 84 Q76 84 82 92 Q86 100 84 108 L82 156 L46 156 Z" fill={CH.jersey} />
      <path d="M64 84 Q76 84 82 92 Q86 100 84 108 L82 156 L64 156 Z" fill={CH.jerseyLit} opacity=".4" />
      <path d="M66 86 Q76 89 82 96" stroke={CH.jerseyShade} strokeWidth="1.4" fill="none" opacity=".5" />
      <path d="M80 94 Q83 122 80 154" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".7" />
      <g stroke={CH.ink} strokeWidth="1.6" strokeLinecap="round">
        <path d="M54 90 L62 88" />
        <path d="M55 93 L63 91" />
        <path d="M56 96 L64 94" />
      </g>
      <Crest x={72} y={106} s={0.9} />

      {/* back arm swung back */}
      <path d="M50 90 L40 104 L38 134 L45 136 L54 102 Z" fill={CH.jerseyShade} />
      <path d="M38 133 L36 140 Q36 143 40 142 L44 140 L45 136 Z" fill={CH.skinShade} />
      <circle cx="40" cy="142" r="5.6" fill={CH.skinShade} />
      {/* front arm forward (no wristband) */}
      <path d="M74 90 L84 102 L86 132 L79 134 L72 102 Z" fill={CH.jersey} />
      <path d="M86 131 L88 138 Q88 141 84 140 L80 138 L79 134 Z" fill={CH.skin} />
      <circle cx="86" cy="141" r="5.6" fill={CH.skin} />

      {/* satchel strap + bag on the back hip */}
      <path d="M74 90 L46 152 L50 155 L78 94 Z" fill={CH.strap} />
      <g transform="translate(46,160)">
        <path d="M-11 0 L11 0 L12 18 L-12 18 Z" fill={CH.satchel} />
        <path d="M-12 -2 L12 -2 L11 8 L-11 8 Z" fill={CH.satchelLit} />
        <rect x="-3" y="4" width="6" height="6" rx="1" fill={CH.gold} />
        <rect x="-8" y="-5" width="16" height="4" rx="1" fill={CH.laptop} />
      </g>

      {/* ── HEAD (profile, defined jaw, facing right) ── */}
      <path d="M30 42 Q27 12 56 9 Q83 12 83 41 Q82 53 78 59 Q73 67 64 70 L57 70 Q49 68 44 61 Q34 53 30 42 Z" fill={CH.skin} />
      <path d="M40 60 Q54 71 70 65 Q66 70 60 70 Q52 70 44 61 Q41 60 40 60 Z" fill={CH.skinShade} opacity=".12" />

      {/* hair — short hair: sideburn, sheen, soft edge (profile) */}
      <path d="M46 40 L47 51 Q49 51 49.5 46 L48.5 40 Z" fill={CH.hair} />
      <path d="M28 45 Q25 11 56 8 Q86 11 84 41 Q82 33 75 30 Q58 24 46 29 Q35 32 30 43 Q28 45 28 45 Z" fill={CH.hair} />
      <path d="M50 30 Q52 27 55 30" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M62 28 Q65 25 68 29" stroke={CH.hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M40 16 Q57 11 74 17 Q57 16 40 18 Z" fill={CH.hairLit} opacity=".32" />

      {/* ear + nose (drawn over the hair) */}
      <ellipse cx="42" cy="47" rx="4.2" ry="6" fill={CH.skin} />
      <ellipse cx="42" cy="47" rx="2.1" ry="3.4" fill={CH.skinShade} opacity=".4" />
      <path d="M82 46 Q87 52 82 57 Q83 52 82 46 Z" fill={CH.skin} />

      {/* face (facing right) */}
      <path d="M64 41 Q70 38.5 76 41" stroke={CH.hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="71" cy="47" rx="3.2" ry="2.7" fill={CH.ink} />
      <path d="M67.5 44.6 Q71 43.4 74.5 44.6" stroke={CH.ink} strokeWidth="1" fill="none" opacity=".7" strokeLinecap="round" />
      <circle cx="72" cy="46.2" r="1" fill="#fff" opacity=".85" />
      <ellipse cx="80" cy="56" rx="1.8" ry="1.5" fill={CH.skinShade} opacity=".4" />
      <path d="M71 61 Q78 65 84 60 Q80 68 75 68 Q70 67 71 61 Z" fill={CH.mouth} />
      <path d="M72 61.5 Q78 63.5 83 60.5 Q78 65 72 61.5 Z" fill="#fff" />
    </PoseSvg>
  );
}

// ── BACK VIEW ─────────────────────────────────────────────────────────
export function AvatarBack({ size = 240, className }: PoseProps) {
  return (
    <PoseSvg size={size} className={className}>
      <ellipse cx="60" cy="231" rx="31" ry="5" fill="rgba(0,0,0,.15)" />

      {/* jeans */}
      <path d="M40 150 L80 150 L78 210 L64 210 L60 168 L56 210 L42 210 Z" fill={CH.denim} />
      <path d="M40 150 L60 150 L56 210 L42 210 Z" fill={CH.denimDark} opacity=".35" />
      <path d="M50 154 L50 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <path d="M70 154 L70 206" stroke={CH.stitch} strokeWidth=".7" opacity=".5" strokeDasharray="2 2" />
      <rect x="42" y="205" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <rect x="64" y="205" width="14" height="5" fill={CH.denimDark} opacity=".4" />
      <path d="M40 210 Q40 206 46 206 L58 206 L61 212 L61 215 Q61 218 56 218 L43 218 Q40 218 40 215 Z" fill={CH.shoe} />
      <path d="M40 216 L61 216 L61 218 Q61 219 59 219 L42 219 Q40 219 40 217 Z" fill={CH.shoeSole} />
      <path d="M80 210 Q80 206 74 206 L62 206 L59 212 L59 215 Q59 218 64 218 L77 218 Q80 218 80 215 Z" fill={CH.shoe} />
      <path d="M80 216 L59 216 L59 218 Q59 219 61 219 L78 219 Q80 219 80 217 Z" fill={CH.shoeSole} />

      {/* neck — a shade darker than the face */}
      <path d="M50 66 L70 66 L72 88 L48 88 Z" fill={CH.neck} />

      {/* jersey back — broad shoulders + traps */}
      <path d="M23 108 Q22 91 35 86 Q45 82 53 84 Q60 82 67 84 Q75 82 85 86 Q98 91 97 108 L86 156 L34 156 Z" fill={CH.jersey} />
      <path d="M60 84 Q67 84 75 86 Q85 86 97 108 L86 156 L60 156 Z" fill={CH.jerseyLit} opacity=".35" />
      {/* trap + back muscle contours */}
      <path d="M53 87 Q44 91 36 98" stroke={CH.jerseyShade} strokeWidth="1.4" fill="none" opacity=".55" />
      <path d="M67 87 Q76 91 84 98" stroke={CH.jerseyShade} strokeWidth="1.4" fill="none" opacity=".55" />
      <path d="M34 92 Q31 122 35 154" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M86 92 Q89 122 85 154" stroke={CH.piping} strokeWidth="1.1" fill="none" opacity=".8" />
      <path d="M52 84 L60 89 L68 84 Z" fill={CH.navy} />
      <ShoulderStripes />
      <ShoulderStripes mirror />
      {/* name + number */}
      <rect x="48" y="106" width="24" height="6" rx="1" fill={CH.navy} opacity=".85" />
      <text x="60" y="111" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="5" fontWeight="700" fill={CH.jerseyLit}>
        FARAZI
      </text>
      <text x="60" y="136" textAnchor="middle" fontFamily="'Pixelify Sans', monospace" fontSize="18" fontWeight="700" fill={CH.navy}>
        7
      </text>

      {/* broad sleeves + arms (no wristband) */}
      <path d="M23 90 Q13 95 12 113 L21 116 Q24 98 30 92 Z" fill={CH.jerseyShade} />
      <path d="M97 90 Q107 95 108 113 L99 116 Q96 98 90 92 Z" fill={CH.jersey} />
      <path d="M16 113 L14 143 Q14 147 18 147 L24 146 L26 115 Z" fill={CH.skin} />
      <path d="M104 113 L106 143 Q106 147 102 147 L96 146 L94 115 Z" fill={CH.skin} />
      <circle cx="20" cy="149" r="6.2" fill={CH.skin} />
      <circle cx="100" cy="149" r="6.2" fill={CH.skin} />

      {/* satchel strap diagonal + bag */}
      <path d="M34 92 L86 152 L90 148 L38 88 Z" fill={CH.strap} />
      <g transform="translate(86,160)">
        <path d="M-12 0 L12 0 L13 19 L-13 19 Z" fill={CH.satchel} />
        <path d="M-13 -2 L13 -2 L12 9 L-12 9 Z" fill={CH.satchelLit} />
        <rect x="-3" y="5" width="6" height="6" rx="1" fill={CH.gold} />
      </g>

      {/* ── HEAD (round, from behind, full hair) ── */}
      <path d="M32 42 Q31 12 60 10 Q89 12 88 42 L86 54 Q82 63 74 67 Q60 71 46 67 Q38 63 34 54 L32 42 Z" fill={CH.skin} />
      <ellipse cx="32" cy="45" rx="4.2" ry="6" fill={CH.skin} />
      <ellipse cx="88" cy="45" rx="4.2" ry="6" fill={CH.skin} />
      <path d="M30 46 Q28 11 60 8 Q92 11 90 46 Q90 58 78 63 Q60 68 42 63 Q30 58 30 46 Z" fill={CH.hair} />
      <path d="M40 18 Q60 13 80 18 Q60 16 40 18 Z" fill={CH.hairLit} opacity=".22" />
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
      {/* broad shoulders / white jersey */}
      <ellipse cx="22" cy="28" rx="15" ry="9.5" fill={CH.jersey} />
      <ellipse cx="22" cy="28" rx="15" ry="9.5" fill="none" stroke="rgba(0,0,0,.12)" />
      {/* navy collar + crest dot */}
      <path d="M17 22 L22 27 L27 22 Z" fill={CH.navy} />
      <circle cx="30" cy="25" r="2" fill={CH.crestGold} />
      {/* satchel strap */}
      <path d="M14 21 L31 32" stroke={CH.strap} strokeWidth="3" strokeLinecap="round" />
      {/* mitt forearms */}
      <circle cx="9" cy="26" r="3.3" fill={CH.skin} />
      <circle cx="35" cy="26" r="3.3" fill={CH.skin} />
      {/* round head from above — full short hair + a peek of face */}
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
          <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>sharp mascot</div>
        </div>
        <h2 style={{ font: '500 46px/.95 "Pixelify Sans", var(--rw-serif)', margin: 0, color: 'var(--rw-ink)' }}>
          Parthiv,
          <br />
          the explorer.
        </h2>
        <p style={{ font: '13px/1.5 var(--rw-sans)', color: 'var(--rw-ink-soft)', margin: 0, maxWidth: 380 }}>
          A sharp, grown-up cartoon drawn from life — defined jaw, full short hair, broad shoulders and traps, confident smile.
          He wears a white Real Madrid home jersey (adidas stripes, gold piping, club crest, #7 on the back), blue jeans, and a
          brown leather laptop satchel slung cross-body, with the crest left visible.
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
        <SpecRow label="Style" v="Sharp cartoon mascot · cozy indie (Animal Crossing · Tomodachi Life)" />
        <SpecRow label="Build" v="Broad shoulders · traps · V-taper" highlight />
        <SpecRow label="Face" v="Defined jaw · strong brows · almond eyes · confident smile" highlight />
        <SpecRow label="Hair" v={<><Sw c={CH.hair} /> Full short cut · clean hairline</>} />
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
          v0.7 · sharp &amp; athletic
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
