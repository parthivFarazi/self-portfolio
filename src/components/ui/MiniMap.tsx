import { useEffect, useMemo, useState } from 'react';
import { useGame } from '@/state/gameStore';
import { BUILDINGS, type BuildingDef, type BuildingId, type Ring } from '@/data/buildings';
import { ISLAND_RADIUS } from '@/constants/world';

// ─── Onboarding hint ─────────────────────────────────────────────────────
//
// First-time visitors don't realise the dots are hoverable / clickable.
// Show a small parchment tooltip once, then never again (localStorage).
// Dismissed on auto-timeout or first map interaction.

const HINT_KEY = 'rw.minimap.hintSeen.v1';
const HINT_AUTO_DISMISS_MS = 8000;

// Redesigned minimap.
//
// Replaces the old flat-green disc whose 6px labels collided
// (Heatmap / Workshop / GBA overlapped at the bottom). Now:
//
//   • parchment + gold frame to match the panel/landing aesthetic
//   • stylized top-down island disc (warm green + central plaza + paths)
//   • dots only by default — labels appear on hover (desktop) or always
//     for the nearest building (so there's one stable orientation point)
//   • click a dot to open that building's panel directly (fast-travel
//     for recruiters)
//   • pulsing gold player dot at the live position
//   • mobile: collapsed to a small toggle button, expands on tap

// ─── Layout ─────────────────────────────────────────────────────────────
const MAP_SIZE = 228;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS = 96;

// ─── Colors (CORE / STORY / PROJECTS, used by dots AND legend) ──────────
const CATEGORY_COLOR: Record<Ring, string> = {
  inner: '#d4a04a', // CORE — warm gold
  mid:   '#4f8cd6', // STORY — deep blue
  outer: '#2faa92', // PROJECTS — teal
};

const CATEGORY_LABEL: Record<Ring, string> = {
  inner: 'Core',
  mid:   'Story',
  outer: 'Projects',
};

// ─── World → minimap projection ─────────────────────────────────────────
function mapPoint(x: number, z: number): { x: number; y: number } {
  return {
    x: MAP_CENTER + (x / ISLAND_RADIUS) * MAP_RADIUS,
    y: MAP_CENTER + (z / ISLAND_RADIUS) * MAP_RADIUS,
  };
}

function distance2D(a: [number, number, number], b: [number, number, number]) {
  const dx = a[0] - b[0];
  const dz = a[2] - b[2];
  return Math.hypot(dx, dz);
}

// ─── Component ──────────────────────────────────────────────────────────
export function MiniMap() {
  const playerPosition = useGame((s) => s.playerPosition);
  const openBuilding = useGame((s) => s.openBuilding);
  const [hoveredId, setHoveredId] = useState<BuildingId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Onboarding hint visibility — show on first visit, dismiss on first
  // map interaction or after a timeout. localStorage persists the choice.
  const [hintVisible, setHintVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return !window.localStorage.getItem(HINT_KEY); } catch { return false; }
  });
  function dismissHint() {
    setHintVisible(false);
    try { window.localStorage.setItem(HINT_KEY, '1'); } catch {}
  }
  useEffect(() => {
    if (!hintVisible) return;
    // 2.2s grace after mount before the auto-dismiss timer starts — the
    // loading screen blocks the minimap for the first second or two on
    // a cold cache, and we don't want the hint to expire before the
    // visitor can see it. Total visible window = grace + dismiss = ~10s.
    const GRACE = 2200;
    const t = window.setTimeout(dismissHint, GRACE + HINT_AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [hintVisible]);

  const player = mapPoint(playerPosition[0], playerPosition[2]);

  // Nearest building — used for the always-visible orientation label.
  const nearest = useMemo<BuildingDef>(() => {
    return BUILDINGS.reduce((closest, b) => {
      return distance2D(playerPosition, b.position) <
        distance2D(playerPosition, closest.position)
        ? b
        : closest;
    }, BUILDINGS[0]);
  }, [playerPosition]);

  // The label that shows on the disc. Hover wins; otherwise the nearest
  // building gets its label visible so the disc is never label-less.
  const labeledId: BuildingId = hoveredId ?? nearest.id;

  // Wrapped handlers so any interaction also dismisses the hint.
  const onHoverDot = (id: BuildingId | null) => {
    setHoveredId(id);
    if (hintVisible) dismissHint();
  };
  const onClickDot = (id: BuildingId) => {
    openBuilding(id);
    if (hintVisible) dismissHint();
  };

  return (
    <>
      {/* Desktop minimap — always visible (lg ≥ 1024px) */}
      <aside
        className="pointer-events-auto absolute bottom-6 right-4 hidden lg:block"
        aria-label="Map of the island"
      >
        <MiniMapCard
          player={player}
          labeledId={labeledId}
          hoveredId={hoveredId}
          setHoveredId={onHoverDot}
          openBuilding={onClickDot}
          nearestName={nearest.name}
        />
        {hintVisible && <MinimapHint onDismiss={dismissHint} />}
      </aside>

      {/* Mobile minimap — toggle button + expanding panel */}
      <div
        className="pointer-events-auto absolute right-3 lg:hidden"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 140px)' }}
      >
        {mobileOpen ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute -top-2 -right-2 z-10 grid h-6 w-6 place-items-center rounded-full border border-[#c8b585] bg-[#fff8e2] font-mono text-[11px] leading-none text-[#5a3e20] shadow"
              aria-label="Close map"
            >
              ×
            </button>
            <MiniMapCard
              compact
              player={player}
              labeledId={labeledId}
              hoveredId={hoveredId}
              setHoveredId={onHoverDot}
              openBuilding={onClickDot}
              nearestName={nearest.shortLabel}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-[#c8b585] bg-[#fff8e2]/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5a3e20] shadow-[0_2px_0_#c8b585,0_8px_18px_rgba(40,20,8,0.2)] backdrop-blur"
            aria-label="Open map"
          >
            <span aria-hidden style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
              background: CATEGORY_COLOR.inner, boxShadow: `0 0 0 2px rgba(212,160,74,.25)`,
            }} />
            Map
          </button>
        )}
      </div>
    </>
  );
}

// ─── Card (frame + header + disc + nearest + legend) ────────────────────
interface MiniMapCardProps {
  compact?: boolean;
  player: { x: number; y: number };
  labeledId: BuildingId;
  hoveredId: BuildingId | null;
  setHoveredId: (id: BuildingId | null) => void;
  openBuilding: (id: BuildingId) => void;
  nearestName: string;
}

function MiniMapCard({
  compact = false,
  player,
  labeledId,
  hoveredId,
  setHoveredId,
  openBuilding,
  nearestName,
}: MiniMapCardProps) {
  const cardWidth = compact ? 200 : 256;
  const discSize = compact ? 168 : 220;

  return (
    <div
      className="relative rounded-[8px] border border-[#d4a04a] bg-[#fff8e2]/95 text-[#3a2a1e] backdrop-blur-sm"
      style={{
        width: cardWidth,
        padding: compact ? 10 : 14,
        boxShadow:
          '0 2px 0 #c8a050, 0 14px 32px rgba(60,30,8,0.22), inset 0 0 0 1px rgba(255,255,255,0.55)',
        fontFamily: 'var(--rw-sans, system-ui)',
      }}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span
          className="font-mono uppercase"
          style={{ fontSize: 10.5, letterSpacing: '0.24em', color: '#7a5a30' }}
        >
          Map
        </span>
        <span
          className="font-mono uppercase inline-flex items-center gap-1.5"
          style={{ fontSize: 9, letterSpacing: '0.2em', color: '#7a5a30' }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#c64a3a',
              animation: 'rwLivePulse 1.5s ease-in-out infinite',
            }}
          />
          Live
        </span>
      </div>

      {/* Disc */}
      <div className="relative mx-auto" style={{ width: discSize, height: discSize }}>
        <DiscSvg
          size={discSize}
          player={player}
          labeledId={labeledId}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
          openBuilding={openBuilding}
        />
      </div>

      {/* Nearest readout */}
      <div
        className="mt-2 font-mono uppercase"
        style={{
          fontSize: 9,
          letterSpacing: '0.18em',
          color: '#7a5a30',
          textAlign: 'center',
        }}
      >
        <span style={{ opacity: 0.7 }}>Nearest · </span>
        <span style={{ color: '#3a2a1e', fontWeight: 600 }}>{nearestName}</span>
      </div>

      {/* Legend */}
      <div
        className="mt-2 flex items-center justify-between font-mono uppercase"
        style={{ fontSize: 9, letterSpacing: '0.14em', color: '#7a5a30' }}
      >
        <LegendItem color={CATEGORY_COLOR.inner} label={CATEGORY_LABEL.inner} />
        <LegendItem color={CATEGORY_COLOR.mid}   label={CATEGORY_LABEL.mid} />
        <LegendItem color={CATEGORY_COLOR.outer} label={CATEGORY_LABEL.outer} />
      </div>

      {/* Local keyframes — kept inline so the minimap is self-contained. */}
      <style>{`
        @keyframes rwLivePulse {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.45; transform: scale(1.25); }
        }
        @keyframes rwPlayerPing {
          0%   { r: 7;  opacity: 0.65; }
          80%  { r: 18; opacity: 0; }
          100% { r: 18; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 0 1.5px rgba(255, 248, 226, 0.9)`,
        }}
      />
      <span>{label}</span>
    </span>
  );
}

// ─── Disc SVG (background + dots + player) ──────────────────────────────
interface DiscSvgProps {
  size: number;
  player: { x: number; y: number };
  labeledId: BuildingId;
  hoveredId: BuildingId | null;
  setHoveredId: (id: BuildingId | null) => void;
  openBuilding: (id: BuildingId) => void;
}

function DiscSvg({
  size,
  player,
  labeledId,
  hoveredId,
  setHoveredId,
  openBuilding,
}: DiscSvgProps) {
  const labeledBuilding = BUILDINGS.find((b) => b.id === labeledId);
  const labeledPos = labeledBuilding
    ? mapPoint(labeledBuilding.position[0], labeledBuilding.position[2])
    : null;

  return (
    <svg
      viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
      width={size}
      height={size}
      role="img"
      aria-label="Minimap of the island"
    >
      <defs>
        {/* Warmed top-down island gradient — golden-hour wash on the
            north side, deeper green to the south. */}
        <radialGradient id="rwDiscFill" cx="50%" cy="35%" r="72%">
          <stop offset="0%"   stopColor="#a8b558" />
          <stop offset="35%"  stopColor="#7d9442" />
          <stop offset="75%"  stopColor="#56792e" />
          <stop offset="100%" stopColor="#3d5a22" />
        </radialGradient>
        {/* Inner shadow (rim) */}
        <radialGradient id="rwDiscRim" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(60,30,8,0.45)" />
        </radialGradient>
      </defs>

      {/* Disc base */}
      <circle
        cx={MAP_CENTER}
        cy={MAP_CENTER}
        r={MAP_RADIUS}
        fill="#7d9442"
        stroke="#d4a04a"
        strokeWidth="2"
      />
      {/* Golden-hour wash — biased to the north (lighter top) */}
      <circle
        cx={MAP_CENTER}
        cy={MAP_CENTER}
        r={MAP_RADIUS}
        fill="url(#rwDiscFill)"
        opacity="0.85"
        pointerEvents="none"
      />

      {/* 4 radiating paths (N/S/E/W) — mirrors the in-world plaza cross */}
      <g stroke="#d6b074" strokeWidth="6" strokeLinecap="round" opacity="0.55">
        <line x1={MAP_CENTER} y1={MAP_CENTER - MAP_RADIUS + 6} x2={MAP_CENTER} y2={MAP_CENTER + MAP_RADIUS - 6} />
        <line x1={MAP_CENTER - MAP_RADIUS + 6} y1={MAP_CENTER} x2={MAP_CENTER + MAP_RADIUS - 6} y2={MAP_CENTER} />
      </g>

      {/* Central plaza disc — warm sandy */}
      <circle cx={MAP_CENTER} cy={MAP_CENTER} r="10" fill="#e2c281" stroke="#a87a3c" strokeWidth="1" />

      {/* Rim shadow */}
      <circle cx={MAP_CENTER} cy={MAP_CENTER} r={MAP_RADIUS} fill="url(#rwDiscRim)" pointerEvents="none" />

      {/* Building dots — render hovered/active last so they stack on top */}
      {BUILDINGS.map((b) => {
        const p = mapPoint(b.position[0], b.position[2]);
        const isHovered = hoveredId === b.id;
        const baseR = 4.2;
        const r = isHovered ? 6 : baseR;
        return (
          <g
            key={b.id}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredId(b.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => openBuilding(b.id)}
          >
            {/* Generous transparent hit target — easier to hover/tap */}
            <circle cx={p.x} cy={p.y} r={11} fill="transparent" />
            {/* Glow on hover */}
            {isHovered && (
              <circle
                cx={p.x}
                cy={p.y}
                r={10}
                fill={CATEGORY_COLOR[b.ring]}
                opacity={0.25}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={r}
              fill={CATEGORY_COLOR[b.ring]}
              stroke="#3a2a1e"
              strokeWidth={isHovered ? 0.9 : 0.7}
            />
          </g>
        );
      })}

      {/* Label for the labeled building (hovered or nearest) */}
      {labeledPos && labeledBuilding && (
        <LabelTag
          x={labeledPos.x}
          y={labeledPos.y}
          text={labeledBuilding.shortLabel}
        />
      )}

      {/* Player — pulsing radar ping + solid gold dot */}
      <g pointerEvents="none">
        <circle
          cx={player.x}
          cy={player.y}
          r={7}
          fill="none"
          stroke="#e8a838"
          strokeWidth="1.4"
          style={{ animation: 'rwPlayerPing 1.6s ease-out infinite', transformOrigin: 'center' }}
        />
        <circle cx={player.x} cy={player.y} r="5.4" fill="#f5c878" stroke="#fff8e2" strokeWidth="1.6" />
        <circle cx={player.x} cy={player.y} r="2"   fill="#7a4f1e" />
      </g>
    </svg>
  );
}

// ─── Label tag (positioned, with auto anchor + parchment chip) ──────────
function LabelTag({ x, y, text }: { x: number; y: number; text: string }) {
  // Anchor the label so it never falls off the disc — pick the side with
  // more room, then push above/below depending on the building's quadrant.
  const right = x < MAP_CENTER;       // building on left → label goes right
  const below = y < MAP_CENTER;       // building above center → label goes below
  const dx = right ? 8 : -8;
  const dy = below ? 14 : -8;
  const anchor: 'start' | 'end' = right ? 'start' : 'end';

  // Chip box: estimate width from text length so the parchment background
  // fits snugly. Each char ≈ 4.4px at 7px font size.
  const padX = 4;
  const padY = 2.5;
  const w = Math.max(28, text.length * 4.6 + padX * 2);
  const h = 11;
  const chipX = right ? x + dx - padX : x + dx + padX - w;
  const chipY = y + dy - h + padY;

  return (
    <g pointerEvents="none">
      <rect
        x={chipX}
        y={chipY}
        width={w}
        height={h}
        rx={2.5}
        fill="#fff8e2"
        stroke="#d4a04a"
        strokeWidth="0.6"
        opacity="0.96"
      />
      <text
        x={x + dx}
        y={y + dy}
        textAnchor={anchor}
        fontFamily="JetBrains Mono, monospace"
        fontSize="6.8"
        fontWeight="700"
        fill="#3a2a1e"
      >
        {text}
      </text>
    </g>
  );
}

// ─── Onboarding hint UI ──────────────────────────────────────────────────
function MinimapHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onDismiss}
      style={{
        position: 'absolute',
        right: 272, // sits just to the left of the 256px card (+ small gap)
        bottom: 32,
        maxWidth: 220,
        padding: '10px 14px 10px 12px',
        background: '#fff8e2',
        border: '1px solid #d4a04a',
        borderRadius: 6,
        color: '#3a2a1e',
        font: '12.5px/1.45 var(--rw-sans, system-ui)',
        boxShadow: '0 2px 0 #c8a050, 0 10px 22px rgba(60,30,8,.22)',
        cursor: 'pointer',
        animation: 'rwHintIn .35s ease-out',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          font: '9.5px var(--rw-mono, monospace)',
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: '#7a5a30',
          marginBottom: 4,
        }}
      >
        Tip
      </div>
      <div>
        Hover a dot to see what's there ·{' '}
        <span style={{ fontWeight: 700 }}>click to travel</span>.
      </div>
      {/* Right-pointing arrow notch — sits at the right edge pointing at
          the minimap. Drawn with two stacked divs so it has a clean
          border outline matching the card. */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: '8px solid #d4a04a',
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: -7,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderLeft: '7px solid #fff8e2',
        }}
      />
      <style>{`
        @keyframes rwHintIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
