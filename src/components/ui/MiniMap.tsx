import { useState } from 'react';
import { useGame } from '@/state/gameStore';
import { BUILDINGS, type BuildingId } from '@/data/buildings';
import { ISLAND_RADIUS } from '@/constants/world';

// Minimap — a bare green disc with one-word labels over each building
// dot. Desktop shows it permanently in the corner; mobile collapses it
// to a small "MAP" dot-button that expands the same disc on tap.

const MAP_SIZE = 220;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS = 94;
const DISC_GREEN = '#5fa844';

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
  const playerPosition = useGame((s) => s.playerPosition);
  const openBuilding = useGame((s) => s.openBuilding);
  const player = mapPoint(playerPosition[0], playerPosition[2]);

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
          Click/tap opens the panel directly. */}
      {BUILDINGS.map((b) => {
        const p = mapPoint(b.position[0], b.position[2]);
        return (
          <g
            key={b.id}
            style={{ cursor: 'pointer' }}
            onClick={() => openBuilding(b.id)}
          >
            {/* Generous transparent hit target */}
            <circle cx={p.x} cy={p.y} r={10} fill="transparent" />
            {/* Visible dot */}
            <circle
              cx={p.x}
              cy={p.y}
              r={3.8}
              fill="#fffaee"
              stroke="#2a1a0e"
              strokeWidth="0.8"
            />
            {/* One-word label above the dot, with a cream outline so it
                reads against the green disc. */}
            <text
              x={p.x}
              y={p.y - 6}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="7"
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

      {/* Player — small contrasting dot, no pulse, no halo. */}
      <circle
        cx={player.x}
        cy={player.y}
        r={4.5}
        fill="#c44a3a"
        stroke="#fffaee"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function MiniMap() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop — disc permanently in the corner */}
      <aside
        className="pointer-events-auto absolute bottom-6 right-6 hidden lg:block"
        aria-label="Map of the island"
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        <MapDisc size={MAP_SIZE} />
      </aside>

      {/* Mobile — collapsed to a dot-button, expands the disc on tap.
          Sits above the touch controls / safe-area inset. */}
      <div
        className="pointer-events-auto absolute right-3 lg:hidden"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 140px)' }}
      >
        {mobileOpen ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute -top-2 -right-2 z-10 grid h-7 w-7 place-items-center rounded-full border border-rw-ink/30 bg-rw-paper font-mono text-[13px] leading-none text-rw-ink shadow"
              aria-label="Close map"
            >
              ×
            </button>
            <MapDisc size={196} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-full bg-rw-paper/90 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rw-ink shadow-[0_2px_10px_rgba(0,0,0,0.3)] backdrop-blur"
            aria-label="Open map"
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                background: DISC_GREEN, boxShadow: `0 0 0 3px ${DISC_GREEN}33`,
              }}
            />
            Map
          </button>
        )}
      </div>
    </>
  );
}
