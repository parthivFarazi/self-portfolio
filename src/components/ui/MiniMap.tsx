import { useGame } from '@/state/gameStore';
import { BUILDINGS, type BuildingId } from '@/data/buildings';
import { ISLAND_RADIUS } from '@/constants/world';

// Bare-bones minimap.
//
// Per latest feedback: drop the parchment card, header, legend, nearest
// readout, hint tooltip, mobile-collapsible — just a green disc with one
// always-visible one-word label over each building dot. Click a dot to
// fast-travel into that building's panel.

const MAP_SIZE = 220;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS = 94;

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

export function MiniMap() {
  const playerPosition = useGame((s) => s.playerPosition);
  const openBuilding = useGame((s) => s.openBuilding);
  const player = mapPoint(playerPosition[0], playerPosition[2]);

  return (
    <aside
      className="pointer-events-auto absolute bottom-6 right-6 hidden lg:block"
      aria-label="Map of the island"
      style={{ width: MAP_SIZE, height: MAP_SIZE }}
    >
      <svg
        viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
        width={MAP_SIZE}
        height={MAP_SIZE}
        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,.35))' }}
      >
        {/* Green disc */}
        <circle
          cx={MAP_CENTER}
          cy={MAP_CENTER}
          r={MAP_RADIUS}
          fill="#5fa844"
          stroke="rgba(0,0,0,.35)"
          strokeWidth="2"
        />

        {/* Building dots — each gets a one-word label rendered above it.
            Click opens the panel directly. */}
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
              {/* One-word label above the dot, with a white outline so it
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
    </aside>
  );
}
