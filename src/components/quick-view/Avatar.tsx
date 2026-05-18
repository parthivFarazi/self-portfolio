interface AvatarFrontProps {
  size?: number;
}

const SKIN = '#d9a779';
const SKIN_SHADE = '#b88858';
const HAIR = '#1a1410';
const BEARD = '#241a14';
const SHIRT = '#f6f1e4';
const SHIRT_SHADE = '#dcd3bf';
const PANTS = '#b8a47a';
const PANTS_SHADE = '#8e7e5a';
const BELT = '#1a1410';
const SHOE = '#3a2a1e';
const GOLD = '#d4c178';
const LAPTOP = '#2e2a26';

export function AvatarFront({ size = 220 }: AvatarFrontProps) {
  return (
    <svg viewBox="0 0 120 220" width={size * (120 / 220)} height={size} className="qv-avatar-svg" aria-hidden="true">
      <ellipse cx="60" cy="212" rx="32" ry="5" fill="rgba(0,0,0,.18)" />
      <path d="M40 132 L40 200 L56 200 L58 142 L62 142 L64 200 L80 200 L80 132 Z" fill={PANTS} />
      <path d="M58 142 L62 142 L62 200 L58 200 Z" fill={PANTS_SHADE} opacity=".5" />
      <ellipse cx="48" cy="204" rx="11" ry="5" fill={SHOE} />
      <ellipse cx="72" cy="204" rx="11" ry="5" fill={SHOE} />
      <rect x="40" y="128" width="40" height="6" fill={BELT} />
      <rect x="58" y="129" width="4" height="4" fill={GOLD} />
      <path d="M34 70 Q30 72 30 78 L30 130 Q30 132 32 132 L88 132 Q90 132 90 130 L90 78 Q90 72 86 70 L74 66 L46 66 Z" fill={SHIRT} />
      <line x1="60" y1="70" x2="60" y2="130" stroke={SHIRT_SHADE} strokeWidth="1.2" />
      <circle cx="60" cy="84" r="1.1" fill={SHIRT_SHADE} />
      <circle cx="60" cy="98" r="1.1" fill={SHIRT_SHADE} />
      <circle cx="60" cy="112" r="1.1" fill={SHIRT_SHADE} />
      <path d="M50 66 L60 78 L70 66 L66 64 L60 70 L54 64 Z" fill={SHIRT_SHADE} />
      <path d="M30 78 Q22 84 22 100 L20 110 Q22 112 28 110 L32 92 Z" fill={SHIRT} />
      <path d="M90 78 Q98 84 98 100 L100 110 Q98 112 92 110 L88 92 Z" fill={SHIRT} />
      <rect x="20" y="108" width="14" height="3" fill={SHIRT_SHADE} />
      <rect x="86" y="108" width="14" height="3" fill={SHIRT_SHADE} />
      <rect x="22" y="111" width="10" height="22" rx="4" fill={SKIN} />
      <rect x="88" y="111" width="10" height="22" rx="4" fill={SKIN} />
      <rect x="87" y="128" width="12" height="5" rx="1.5" fill={GOLD} />
      <rect x="87" y="128" width="12" height="1.5" fill="#fff" opacity=".5" />
      <circle cx="27" cy="138" r="6" fill={SKIN} />
      <circle cx="93" cy="138" r="6" fill={SKIN} />
      <rect x="14" y="116" width="22" height="16" rx="1.5" fill={LAPTOP} transform="rotate(-8 25 124)" />
      <rect x="16" y="118" width="18" height="11" fill="#3f6f7a" transform="rotate(-8 25 124)" />
      <rect x="17" y="119" width="2" height="9" fill={GOLD} transform="rotate(-8 25 124)" opacity=".9" />
      <rect x="54" y="58" width="12" height="14" fill={SKIN_SHADE} />
      <rect x="54" y="58" width="12" height="10" fill={SKIN} />
      <ellipse cx="60" cy="42" rx="20" ry="22" fill={SKIN} />
      <path d="M40 38 Q40 22 60 20 Q80 22 80 38 Q80 30 76 28 L74 32 Q66 24 60 26 Q54 24 46 32 L44 28 Q40 30 40 38 Z" fill={HAIR} />
      <path d="M40 38 Q40 46 44 48 L44 42 Z" fill={HAIR} />
      <path d="M80 38 Q80 46 76 48 L76 42 Z" fill={HAIR} />
      <path d="M44 46 Q44 58 50 62 Q60 66 70 62 Q76 58 76 46 Q72 52 60 52 Q48 52 44 46 Z" fill={BEARD} />
      <path d="M44 46 Q42 52 44 56 L46 54 Z" fill={BEARD} />
      <path d="M76 46 Q78 52 76 56 L74 54 Z" fill={BEARD} />
      <ellipse cx="52" cy="42" rx="1.6" ry="2" fill={HAIR} />
      <ellipse cx="68" cy="42" rx="1.6" ry="2" fill={HAIR} />
      <path d="M48 38 Q52 36.5 56 38" stroke={HAIR} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M64 38 Q68 36.5 72 38" stroke={HAIR} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M54 54 Q60 57 66 54" stroke={HAIR} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M59 44 Q58 48 60 49 Q62 48 61 44" stroke={SKIN_SHADE} strokeWidth="1" fill="none" />
    </svg>
  );
}
