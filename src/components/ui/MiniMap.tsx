import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/state/gameStore';
import { BUILDINGS, type BuildingId } from '@/data/buildings';
import { ISLAND_RADIUS } from '@/constants/world';
import { useIsNarrowViewport } from '@/hooks/useTouchInput';

// Minimap — a bare green disc with one-word labels over each building
// dot. Desktop shows it permanently in the corner; mobile collapses it
// to a small "MAP" pill that expands a larger disc on tap.
//
// Dots are real buttons: tappable (44px-equivalent hit areas), keyboard
// focusable, and gold once visited — the map doubles as a progress and
// fast-travel surface.

const MAP_SIZE = 220;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS = 94;
const DISC_GREEN = '#5fa844';
const VISITED_GOLD = '#f5c542';
// 16 viewBox units ≈ 44px once the mobile disc renders at ~300px.
const HIT_RADIUS = 16;

// One-word labels — kept short so they don't pile up at the bottom edge
// of the disc the way longer names did originally.
const ONE_WORD: Record<BuildingId, string> = {
  updt:       'UPDT',
  rmaict:     'RMAICT',
  du:         'DU',
  tech:       'Tech',
  petronas:   'Towers',
  forge:      'Forge',
  lighthouse: 'Light',
  qard:       'Qard',
  athletic:   'Athletic',
  archive:    'Archive',
  zen:        'Zen',
  heatmap:    'Heatmap',
  workshop:   'Workshop',
  gba:        'GBA',
};

function mapPoint(x: number, z: number): { x: number; y: number } {
  return {
    x: MAP_CENTER + (x / ISLAND_RADIUS) * MAP_RADIUS,
    y: MAP_CENTER + (z / ISLAND_RADIUS) * MAP_RADIUS,
  };
}

// The disc itself — shared by the desktop corner map and the mobile
// expanded map. Tapping a dot opens that building's panel.
function MapDisc({ size }: { size: number }) {
  const openBuilding = useGame((s) => s.openBuilding);
  const visited = useGame((s) => s.visited);
  const [focusedId, setFocusedId] = useState<BuildingId | null>(null);
  const playerRef = useRef<SVGCircleElement>(null);

  // The player dot follows a transient subscription writing straight to the
  // SVG attribute — the player position updates every frame and re-rendering
  // 14 labelled groups at 60fps is wasted work on phones.
  useEffect(() => {
    const apply = (pos: [number, number, number]) => {
      const p = mapPoint(pos[0], pos[2]);
      const el = playerRef.current;
      if (el) {
        el.setAttribute('cx', String(p.x));
        el.setAttribute('cy', String(p.y));
      }
    };
    apply(useGame.getState().playerPosition);
    return useGame.subscribe((state) => apply(state.playerPosition));
  }, []);

  return (
    <svg
      viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
      width={size}
      height={size}
      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,.35))', display: 'block' }}
    >
      {/* Green disc */}
      <circle
        cx={MAP_CENTER}
        cy={MAP_CENTER}
        r={MAP_RADIUS}
        fill={DISC_GREEN}
        stroke="rgba(0,0,0,.35)"
        strokeWidth="2"
      />

      {/* Building dots — each gets a one-word label rendered above it.
          Click/tap/Enter opens the panel directly. */}
      {BUILDINGS.map((b) => {
        const p = mapPoint(b.position[0], b.position[2]);
        const isVisited = visited.has(b.id);
        return (
          <g
            key={b.id}
            role="button"
            tabIndex={0}
            aria-label={`Open ${b.name}${isVisited ? ' (visited)' : ''}`}
            style={{ cursor: 'pointer', outline: 'none' }}
            onClick={() => openBuilding(b.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBuilding(b.id);
              }
            }}
            onFocus={() => setFocusedId(b.id)}
            onBlur={() => setFocusedId((cur) => (cur === b.id ? null : cur))}
          >
            {/* Generous transparent hit target */}
            <circle cx={p.x} cy={p.y} r={HIT_RADIUS} fill="transparent" />
            {focusedId === b.id && (
              <circle cx={p.x} cy={p.y} r={9} fill="none" stroke="#f5d97a" strokeWidth="2" />
            )}
            {/* Visible dot — gold once its panel has been opened */}
            <circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill={isVisited ? VISITED_GOLD : '#fffaee'}
              stroke="#2a1a0e"
              strokeWidth="0.8"
            />
            {/* One-word label above the dot, with a cream outline so it
                reads against the green disc. */}
            <text
              x={p.x}
              y={p.y - 7}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="8"
              fontWeight="700"
              fill="#2a1a0e"
              paintOrder="stroke"
              stroke="rgba(255,250,238,.95)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            >
              {ONE_WORD[b.id]}
            </text>
          </g>
        );
      })}

      {/* Player — small contrasting dot, position driven via subscription. */}
      <circle
        ref={playerRef}
        cx={MAP_CENTER}
        cy={MAP_CENTER}
        r={4.5}
        fill="#c44a3a"
        stroke="#fffaee"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MiniMap({ onOpenQuick }: { onOpenQuick?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const compact = useIsNarrowViewport(1024);
  const visitedCount = useGame((s) => s.visited.size);

  if (!compact) {
    // Desktop — disc permanently in the corner.
    return (
      <aside
        className="pointer-events-auto absolute bottom-6 right-6"
        aria-label="Map of the island"
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        <MapDisc size={MAP_SIZE} />
      </aside>
    );
  }

  // Mobile — collapsed to a pill, expands a larger disc on tap.
  // Sits above the touch controls / safe-area inset.
  const expandedSize = Math.min(Math.floor(window.innerWidth * 0.62), 240);
  return (
    <div
      className="pointer-events-auto absolute right-3"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 100px)' }}
    >
      {mobileOpen ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute -top-3 -right-1 z-10 grid h-11 w-11 place-items-center rounded-full text-rw-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
            aria-label="Close map"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-full border border-rw-ink/30 bg-rw-paper font-mono text-[15px] leading-none shadow"
            >
              ×
            </span>
          </button>
          <MapDisc size={expandedSize} />
          <div className="mt-1 text-center font-mono text-[9.5px] tracking-[0.12em] text-rw-paper/95 [text-shadow:0_1px_3px_rgba(0,0,0,.5)]">
            tap a building to open it
          </div>
          {onOpenQuick && (
            <button
              type="button"
              onClick={onOpenQuick}
              className="mx-auto mt-1 block rounded-full bg-rw-paper/75 px-3 py-1 text-center font-mono text-[9.5px] tracking-[0.12em] text-rw-ink-soft shadow-sm backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
            >
              quick view →
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex min-h-[44px] items-center gap-2 rounded-full border border-[#d4c178]/60 bg-rw-paper/80 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-rw-ink-soft shadow-sm backdrop-blur focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
          aria-label={`Open map — ${visitedCount} of ${BUILDINGS.length} buildings explored`}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
              background: DISC_GREEN, boxShadow: `0 0 0 3px ${DISC_GREEN}33`,
            }}
          />
          Map · {visitedCount}/{BUILDINGS.length}
        </button>
      )}
    </div>
  );
}
