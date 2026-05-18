// character.jsx — Parthiv avatar SVGs (front / side / back / top-down) + character sheet card

const RW_SKIN = '#d9a779';
const RW_SKIN_SHADE = '#b88858';
const RW_HAIR = '#1a1410';
const RW_BEARD = '#241a14';
const RW_SHIRT = '#f6f1e4';
const RW_SHIRT_SHADE = '#dcd3bf';
const RW_PANTS = '#b8a47a';
const RW_PANTS_SHADE = '#8e7e5a';
const RW_BELT = '#1a1410';
const RW_SHOE = '#3a2a1e';
const RW_GOLD = '#d4c178';
const RW_LAPTOP = '#2e2a26';
const RW_INK_FALLBACK = '#1a1410';

// Front view ~ 120w x 220h viewBox
function AvatarFront({ size = 220, label }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 120 220" width={size * (120/220)} height={size} style={{ overflow: 'visible' }}>
        {/* Shadow */}
        <ellipse cx="60" cy="212" rx="32" ry="5" fill="rgba(0,0,0,.18)" />
        {/* Legs / khakis */}
        <path d="M40 132 L40 200 L56 200 L58 142 L62 142 L64 200 L80 200 L80 132 Z" fill={RW_PANTS} />
        <path d="M58 142 L62 142 L62 200 L58 200 Z" fill={RW_PANTS_SHADE} opacity=".5" />
        {/* Shoes */}
        <ellipse cx="48" cy="204" rx="11" ry="5" fill={RW_SHOE} />
        <ellipse cx="72" cy="204" rx="11" ry="5" fill={RW_SHOE} />
        {/* Belt */}
        <rect x="40" y="128" width="40" height="6" fill={RW_BELT} />
        <rect x="58" y="129" width="4" height="4" fill={RW_GOLD} />
        {/* Shirt body */}
        <path d="M34 70 Q30 72 30 78 L30 130 Q30 132 32 132 L88 132 Q90 132 90 130 L90 78 Q90 72 86 70 L74 66 L46 66 Z" fill={RW_SHIRT} />
        {/* Shirt placket */}
        <line x1="60" y1="70" x2="60" y2="130" stroke={RW_SHIRT_SHADE} strokeWidth="1.2" />
        <circle cx="60" cy="84" r="1.1" fill={RW_SHIRT_SHADE} />
        <circle cx="60" cy="98" r="1.1" fill={RW_SHIRT_SHADE} />
        <circle cx="60" cy="112" r="1.1" fill={RW_SHIRT_SHADE} />
        {/* Collar */}
        <path d="M50 66 L60 78 L70 66 L66 64 L60 70 L54 64 Z" fill={RW_SHIRT_SHADE} />
        {/* Sleeves rolled — short */}
        <path d="M30 78 Q22 84 22 100 L20 110 Q22 112 28 110 L32 92 Z" fill={RW_SHIRT} />
        <path d="M90 78 Q98 84 98 100 L100 110 Q98 112 92 110 L88 92 Z" fill={RW_SHIRT} />
        <rect x="20" y="108" width="14" height="3" fill={RW_SHIRT_SHADE} />
        <rect x="86" y="108" width="14" height="3" fill={RW_SHIRT_SHADE} />
        {/* Forearms */}
        <rect x="22" y="111" width="10" height="22" rx="4" fill={RW_SKIN} />
        <rect x="88" y="111" width="10" height="22" rx="4" fill={RW_SKIN} />
        {/* GT-style gold wristband on LEFT wrist (viewer right) */}
        <rect x="87" y="128" width="12" height="5" rx="1.5" fill={RW_GOLD} />
        <rect x="87" y="128" width="12" height="1.5" fill="#fff" opacity=".5" />
        {/* Hands */}
        <circle cx="27" cy="138" r="6" fill={RW_SKIN} />
        <circle cx="93" cy="138" r="6" fill={RW_SKIN} />
        {/* Laptop tucked under right arm (viewer left) */}
        <rect x="14" y="116" width="22" height="16" rx="1.5" fill={RW_LAPTOP} transform="rotate(-8 25 124)" />
        <rect x="16" y="118" width="18" height="11" fill="#3f6f7a" transform="rotate(-8 25 124)" />
        <rect x="17" y="119" width="2" height="9" fill={RW_GOLD} transform="rotate(-8 25 124)" opacity=".9" />
        {/* Neck */}
        <rect x="54" y="58" width="12" height="14" fill={RW_SKIN_SHADE} />
        <rect x="54" y="58" width="12" height="10" fill={RW_SKIN} />
        {/* Head */}
        <ellipse cx="60" cy="42" rx="20" ry="22" fill={RW_SKIN} />
        {/* Hair — short, fuller on top */}
        <path d="M40 38 Q40 22 60 20 Q80 22 80 38 Q80 30 76 28 L74 32 Q66 24 60 26 Q54 24 46 32 L44 28 Q40 30 40 38 Z" fill={RW_HAIR} />
        {/* Sideburns */}
        <path d="M40 38 Q40 46 44 48 L44 42 Z" fill={RW_HAIR} />
        <path d="M80 38 Q80 46 76 48 L76 42 Z" fill={RW_HAIR} />
        {/* Beard — short, well-groomed */}
        <path d="M44 46 Q44 58 50 62 Q60 66 70 62 Q76 58 76 46 Q72 52 60 52 Q48 52 44 46 Z" fill={RW_BEARD} />
        {/* Beard chinstrap connecting to sideburns */}
        <path d="M44 46 Q42 52 44 56 L46 54 Z" fill={RW_BEARD} />
        <path d="M76 46 Q78 52 76 56 L74 54 Z" fill={RW_BEARD} />
        {/* Eyes */}
        <ellipse cx="52" cy="42" rx="1.6" ry="2" fill={RW_INK_FALLBACK} />
        <ellipse cx="68" cy="42" rx="1.6" ry="2" fill={RW_INK_FALLBACK} />
        {/* Brows */}
        <path d="M48 38 Q52 36.5 56 38" stroke={RW_HAIR} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M64 38 Q68 36.5 72 38" stroke={RW_HAIR} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {/* Smile */}
        <path d="M54 54 Q60 57 66 54" stroke={RW_HAIR} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7" />
        {/* Nose */}
        <path d="M59 44 Q58 48 60 49 Q62 48 61 44" stroke={RW_SKIN_SHADE} strokeWidth="1" fill="none" />
      </svg>
      {label ? <figcaption style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</figcaption> : null}
    </figure>
  );
}

// Side view (walking pose) — leg forward, arm swing
function AvatarSide({ size = 220, label }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 120 220" width={size * (120/220)} height={size} style={{ overflow: 'visible' }}>
        <ellipse cx="60" cy="212" rx="28" ry="5" fill="rgba(0,0,0,.18)" />
        {/* Back leg */}
        <path d="M58 132 L52 200 L66 200 L66 132 Z" fill={RW_PANTS} />
        <ellipse cx="58" cy="204" rx="12" ry="5" fill={RW_SHOE} />
        {/* Front leg */}
        <path d="M60 132 L70 198 L84 198 L74 132 Z" fill={RW_PANTS} />
        <ellipse cx="76" cy="202" rx="12" ry="5" fill={RW_SHOE} />
        {/* Belt */}
        <rect x="50" y="128" width="28" height="6" fill={RW_BELT} />
        <rect x="62" y="129" width="4" height="4" fill={RW_GOLD} />
        {/* Torso (profile) */}
        <path d="M50 70 Q46 72 46 80 L46 130 Q46 132 48 132 L78 132 Q80 132 80 130 L80 80 Q80 72 76 70 L70 66 L56 66 Z" fill={RW_SHIRT} />
        {/* Back arm swing back */}
        <path d="M50 78 Q42 88 40 110 L36 130 Q34 134 38 134 L42 132 Q48 108 52 92 Z" fill={RW_SHIRT} />
        <circle cx="40" cy="132" r="6" fill={RW_SKIN} />
        {/* Front arm swing forward holding laptop */}
        <path d="M76 78 Q86 90 88 108 L92 124 Q92 128 88 128 L84 126 Q80 108 74 92 Z" fill={RW_SHIRT} />
        <rect x="88" y="120" width="10" height="20" rx="4" fill={RW_SKIN} />
        {/* gold wristband */}
        <rect x="87" y="134" width="12" height="5" rx="1.5" fill={RW_GOLD} />
        {/* Laptop under arm */}
        <rect x="78" y="118" width="22" height="14" rx="1.5" fill={RW_LAPTOP} transform="rotate(10 89 125)" />
        {/* Neck */}
        <rect x="56" y="58" width="10" height="12" fill={RW_SKIN_SHADE} />
        {/* Head — side profile */}
        <path d="M48 28 Q44 36 44 46 Q44 60 52 64 L66 64 Q74 60 74 46 Q76 36 70 28 Q60 22 48 28 Z" fill={RW_SKIN} />
        {/* Ear */}
        <ellipse cx="50" cy="46" rx="2.5" ry="4" fill={RW_SKIN_SHADE} />
        {/* Hair */}
        <path d="M44 38 Q42 26 56 22 Q70 22 74 30 Q76 36 76 40 Q72 32 60 30 Q48 30 44 38 Z" fill={RW_HAIR} />
        <path d="M44 38 Q44 48 48 50 L48 42 Z" fill={RW_HAIR} />
        {/* Beard */}
        <path d="M58 50 Q56 58 60 64 L70 62 Q74 56 72 48 Q66 54 58 50 Z" fill={RW_BEARD} />
        {/* Eye */}
        <ellipse cx="64" cy="44" rx="1.4" ry="1.8" fill={RW_INK_FALLBACK} />
        {/* Brow */}
        <path d="M61 40 Q64 38 67 40" stroke={RW_HAIR} strokeWidth="1.3" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <path d="M74 44 Q76 48 74 50 L70 48 Z" fill={RW_SKIN_SHADE} />
      </svg>
      {label ? <figcaption style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</figcaption> : null}
    </figure>
  );
}

// Back view
function AvatarBack({ size = 220, label }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 120 220" width={size * (120/220)} height={size} style={{ overflow: 'visible' }}>
        <ellipse cx="60" cy="212" rx="32" ry="5" fill="rgba(0,0,0,.18)" />
        {/* Legs */}
        <path d="M40 132 L40 200 L56 200 L58 142 L62 142 L64 200 L80 200 L80 132 Z" fill={RW_PANTS} />
        <ellipse cx="48" cy="204" rx="11" ry="5" fill={RW_SHOE} />
        <ellipse cx="72" cy="204" rx="11" ry="5" fill={RW_SHOE} />
        {/* Belt */}
        <rect x="40" y="128" width="40" height="6" fill={RW_BELT} />
        {/* Shirt back (no placket) */}
        <path d="M34 70 Q30 72 30 78 L30 130 Q30 132 32 132 L88 132 Q90 132 90 130 L90 78 Q90 72 86 70 L74 66 L46 66 Z" fill={RW_SHIRT} />
        <path d="M50 66 L60 76 L70 66 Z" fill={RW_SHIRT_SHADE} />
        {/* Sleeves */}
        <path d="M30 78 Q22 84 22 100 L20 110 Q22 112 28 110 L32 92 Z" fill={RW_SHIRT} />
        <path d="M90 78 Q98 84 98 100 L100 110 Q98 112 92 110 L88 92 Z" fill={RW_SHIRT} />
        <rect x="22" y="111" width="10" height="22" rx="4" fill={RW_SKIN} />
        <rect x="88" y="111" width="10" height="22" rx="4" fill={RW_SKIN} />
        {/* GT gold wristband on LEFT wrist — from behind, left wrist is viewer-LEFT */}
        <rect x="21" y="128" width="12" height="5" rx="1.5" fill={RW_GOLD} />
        {/* Hands */}
        <circle cx="27" cy="138" r="6" fill={RW_SKIN} />
        <circle cx="93" cy="138" r="6" fill={RW_SKIN} />
        {/* Neck */}
        <rect x="54" y="58" width="12" height="12" fill={RW_SKIN_SHADE} />
        {/* Head — back */}
        <ellipse cx="60" cy="40" rx="20" ry="22" fill={RW_HAIR} />
        {/* Hair lower — fade */}
        <path d="M44 50 Q44 60 60 62 Q76 60 76 50 Q60 56 44 50 Z" fill={RW_HAIR} />
        {/* Hairline detail */}
        <path d="M44 50 Q60 56 76 50" stroke="#000" strokeWidth=".5" fill="none" opacity=".4" />
        {/* Ears */}
        <ellipse cx="40" cy="42" rx="2.5" ry="4" fill={RW_SKIN_SHADE} />
        <ellipse cx="80" cy="42" rx="2.5" ry="4" fill={RW_SKIN_SHADE} />
      </svg>
      {label ? <figcaption style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</figcaption> : null}
    </figure>
  );
}

// Tiny top-down avatar token for the island prototype
function AvatarToken({ size = 28, facing = 'south' }) {
  // Top-down: head circle from above (mostly hair), body offset shoulders
  const rot = { south: 0, north: 180, east: -90, west: 90 }[facing] || 0;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} style={{ overflow: 'visible', transform: `rotate(${rot}deg)`, transformOrigin: 'center', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))' }}>
      {/* Shoulders / shirt */}
      <ellipse cx="20" cy="24" rx="11" ry="9" fill={RW_SHIRT} />
      <ellipse cx="20" cy="24" rx="11" ry="9" fill="none" stroke="rgba(0,0,0,.15)" />
      {/* Forearms */}
      <circle cx="11" cy="22" r="3" fill={RW_SKIN} />
      <circle cx="29" cy="22" r="3" fill={RW_SKIN} />
      {/* Gold wristband on left wrist (top-down: left side = west) */}
      <circle cx="11" cy="22" r="3.2" fill="none" stroke={RW_GOLD} strokeWidth="1.4" />
      {/* Head — mostly hair from above */}
      <circle cx="20" cy="16" r="7" fill={RW_HAIR} />
      <path d="M14 17 Q20 21 26 17 Q20 14 14 17 Z" fill={RW_SKIN} />
    </svg>
  );
}

// ─── CHARACTER SHEET CARD ────────────────────────────────────────────────

function CharacterSheetCard() {
  return (
    <div style={{
      width: 980, height: 640, background: 'var(--rw-cream)',
      backgroundImage: 'linear-gradient(rgba(160,140,100,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(160,140,100,.07) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      border: '1px solid #e6dec8', display: 'grid', gridTemplateColumns: '1.15fr 1fr',
      fontFamily: 'var(--rw-sans)',
    }}>
      {/* Left: avatar trio */}
      <div style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 18, borderRight: '1px dashed #c8bb95', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Character · 01</div>
          <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }}></div>
          <div style={{ font: '11px var(--rw-mono)', color: 'var(--rw-ink-soft)' }}>PF / Resume World</div>
        </div>
        <h2 style={{ font: 'italic 56px/.95 var(--rw-serif)', margin: 0, color: 'var(--rw-ink)' }}>Parthiv,<br/>three views</h2>
        <p style={{ font: '13px/1.5 var(--rw-sans)', color: 'var(--rw-ink-soft)', margin: 0, maxWidth: 360 }}>
          Early-twenties CS student. Warm tan, short black hair, neatly groomed beard. White button-down, sleeves rolled. Khakis, black belt, brown loafers. Signature gold wristband on the left. A small laptop tucked under one arm.
        </p>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'end', justifyItems: 'center', gap: 12, paddingTop: 8 }}>
          <AvatarFront size={240} label="Front · Idle" />
          <AvatarSide size={240} label="Side · Walk" />
          <AvatarBack size={240} label="Back · Walk-away" />
        </div>
        {/* Floor line */}
        <div style={{ position: 'absolute', left: 36, right: 0, bottom: 36, borderTop: '1px solid #c8bb95' }}></div>
      </div>
      {/* Right: spec sheet */}
      <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 18, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ font: '11px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>Spec sheet</div>
          <div style={{ flex: 1, borderBottom: '1px solid #c8bb95' }}></div>
        </div>
        <SpecRow label="Build" v="Semi-realistic Sims-proportions · avg height · upright" />
        <SpecRow label="Skin" v={<><Swatch c="#d9a779" /> Warm tan · South Asian</>} />
        <SpecRow label="Hair" v={<><Swatch c="#1a1410" /> Short, neat sides · fuller on top</>} />
        <SpecRow label="Beard" v={<><Swatch c="#241a14" /> Short · clean jawline</>} />
        <SpecRow label="Shirt" v={<><Swatch c="#f6f1e4" /> White button-down · sleeves rolled to forearm</>} />
        <SpecRow label="Pants" v={<><Swatch c="#b8a47a" /> Tan chinos · <Swatch c="#1a1410" /> black belt</>} />
        <SpecRow label="Shoes" v={<><Swatch c="#3a2a1e" /> Brown loafers <span style={{ opacity: .6 }}>· or white sneakers</span></>} />
        <SpecRow label="Wristband" v={<><Swatch c="#d4c178" /> Collegiate gold · LEFT wrist · the through-line</>} highlight />
        <SpecRow label="Carrying" v="Small laptop tucked under one arm" />
        <div style={{ marginTop: 8, padding: '14px 16px', background: 'rgba(212,193,120,.18)', border: '1px dashed #c8bb95', borderRadius: 4 }}>
          <div style={{ font: '10px var(--rw-mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)', marginBottom: 6 }}>Animation set</div>
          <ul style={{ margin: 0, padding: '0 0 0 16px', font: '12.5px/1.7 var(--rw-sans)', color: 'var(--rw-ink)' }}>
            <li>Walk cycle · 4 directions (N · S · E · W)</li>
            <li>Idle · stretch, glance at phone, arms-crossed</li>
            <li>Enter-building pose · subtle nod toward door</li>
          </ul>
        </div>
        <div style={{ position: 'absolute', right: 24, bottom: 24, font: '10.5px var(--rw-mono)', color: 'var(--rw-ink-soft)', textAlign: 'right', lineHeight: 1.5 }}>
          v0.1 · placeholder fidelity<br/>final art: commissioned 3D
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, v, highlight }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 14, alignItems: 'center', padding: highlight ? '6px 0' : 0 }}>
      <div style={{ font: '10.5px var(--rw-mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--rw-ink-soft)' }}>{label}</div>
      <div style={{ font: `13.5px/1.4 var(--rw-sans)`, color: 'var(--rw-ink)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: highlight ? 600 : 400 }}>{v}</div>
    </div>
  );
}

function Swatch({ c }) {
  return <span style={{ display: 'inline-block', width: 14, height: 14, background: c, border: '1px solid rgba(0,0,0,.15)', borderRadius: 3, verticalAlign: 'middle', marginRight: 4 }} />;
}

Object.assign(window, { AvatarFront, AvatarSide, AvatarBack, AvatarToken, CharacterSheetCard });
