import { useGame } from '@/state/gameStore';
import { BUILDINGS, type BuildingId } from '@/data/buildings';
import { ISLAND_RADIUS } from '@/constants/world';
import { useAudio } from '@/audio/useAudio';
import { useIsNarrowViewport, useIsTouchDevice } from '@/hooks/useTouchInput';

const MAP_SIZE = 180;
const MAP_CENTER = MAP_SIZE / 2;
const MAP_RADIUS = 74;

const MINI_LABELS: Record<BuildingId, string> = {
  updt: 'UPDT',
  rmaict: 'RMAICT',
  du: 'DU',
  tech: 'Tech',
  petronas: 'Twin',
  forge: 'Forge',
  lighthouse: 'Light',
  qard: 'Qard',
  athletic: 'Athletic',
  archive: 'Archive',
  zen: 'Zen',
  heatmap: 'Heatmap',
  workshop: 'Workshop',
  gba: 'GBA',
};

const GROUP_COLORS: Record<string, string> = {
  inner: '#d4c178',
  mid: '#6fd5e0',
  outer: '#94e2c0',
};

function mapPoint(x: number, z: number): { x: number; y: number } {
  return {
    x: MAP_CENTER + (x / ISLAND_RADIUS) * MAP_RADIUS,
    y: MAP_CENTER + (z / ISLAND_RADIUS) * MAP_RADIUS,
  };
}

export function HUD() {
  const zone = useGame((s) => s.zoneLabel);
  const playerPosition = useGame((s) => s.playerPosition);
  const mobileHud = useIsTouchDevice() || useIsNarrowViewport(768);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      <div className="absolute left-4 top-4 rounded-full bg-rw-paper/85 px-3 py-1 text-[11px] font-mono tracking-[0.22em] text-rw-ink shadow-sm backdrop-blur">
        PARTHIV&apos;S WORLD
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <div className="rounded-full bg-rw-paper/85 px-3 py-1 text-[11px] font-mono tracking-[0.18em] text-rw-ink-soft shadow-sm backdrop-blur">
          {zone}
        </div>
        <MuteButton />
      </div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 font-mono tracking-[0.18em] ${
          mobileHud
            ? 'rounded-full bg-rw-paper/82 px-3 py-1 text-[10px] text-rw-ink-soft shadow-sm backdrop-blur'
            : 'bottom-3 text-[11px] text-rw-ink-soft/70'
        }`}
        style={mobileHud ? { bottom: 'calc(env(safe-area-inset-bottom, 0px) + 108px)' } : undefined}
      >
        {mobileHud ? 'Drag to move · Tap E to interact' : 'WASD to move · E to interact · ESC to close'}
      </div>
      <MiniMap playerPosition={playerPosition} />
    </div>
  );
}

function MuteButton() {
  const { muted, toggleMute } = useAudio();
  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
      title={muted ? 'Unmute' : 'Mute'}
      className="pointer-events-auto grid h-7 w-7 place-items-center rounded-full bg-rw-paper/85 text-[12px] font-mono leading-none text-rw-ink shadow-sm backdrop-blur transition hover:bg-rw-paper hover:text-rw-ink"
    >
      <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
    </button>
  );
}

function MiniMap({ playerPosition }: { playerPosition: [number, number, number] }) {
  const player = mapPoint(playerPosition[0], playerPosition[2]);

  return (
    <aside className="absolute bottom-8 right-4 hidden w-[236px] rounded-md border border-[#d4c178] bg-[#fff8e2]/90 p-3 text-[#2a1a0e] shadow-[0_2px_0_#d4c178,0_16px_36px_rgba(40,20,8,0.18)] backdrop-blur-sm lg:block">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a5a30]">Map</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7a5a30]/70">Live</span>
      </div>
      <svg viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} className="h-[180px] w-full" aria-hidden="true">
        <circle cx={MAP_CENTER} cy={MAP_CENTER} r={MAP_RADIUS} fill="#7eb86a" stroke="#d4c178" strokeWidth="2" />
        <circle cx={MAP_CENTER} cy={MAP_CENTER} r="7" fill="#c8b585" stroke="#8b6a45" strokeWidth="1" />
        <line x1={MAP_CENTER} y1={MAP_CENTER - 42} x2={MAP_CENTER} y2={MAP_CENTER + 42} stroke="#c8b585" strokeWidth="4" strokeLinecap="round" />
        <line x1={MAP_CENTER - 42} y1={MAP_CENTER} x2={MAP_CENTER + 42} y2={MAP_CENTER} stroke="#c8b585" strokeWidth="4" strokeLinecap="round" />
        {BUILDINGS.map((b) => {
          const p = mapPoint(b.position[0], b.position[2]);
          const dx = p.x >= MAP_CENTER ? 5 : -5;
          const dy = p.y >= MAP_CENTER ? 9 : -5;
          return (
            <g key={b.id}>
              <circle cx={p.x} cy={p.y} r="3.2" fill={GROUP_COLORS[b.ring]} stroke="#2a1a0e" strokeWidth=".7" />
              <text
                x={p.x + dx}
                y={p.y + dy}
                textAnchor={dx > 0 ? 'start' : 'end'}
                fontFamily="JetBrains Mono, monospace"
                fontSize="6.2"
                fontWeight="700"
                fill="#2a1a0e"
                paintOrder="stroke"
                stroke="#fff8e2"
                strokeWidth="2"
              >
                {MINI_LABELS[b.id]}
              </text>
            </g>
          );
        })}
        <g>
          <circle cx={player.x} cy={player.y} r="5" fill="#e07ec3" stroke="#fffaee" strokeWidth="2" />
          <circle cx={player.x} cy={player.y} r="8" fill="none" stroke="#e07ec3" strokeWidth="1" opacity=".45" />
        </g>
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#7a5a30]">
        <span><span className="inline-block h-2 w-2 rounded-full bg-[#d4c178]" /> Core</span>
        <span><span className="inline-block h-2 w-2 rounded-full bg-[#6fd5e0]" /> Story</span>
        <span><span className="inline-block h-2 w-2 rounded-full bg-[#94e2c0]" /> Projects</span>
      </div>
    </aside>
  );
}
