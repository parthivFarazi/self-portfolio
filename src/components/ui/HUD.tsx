import { useGame } from '@/state/gameStore';

export function HUD() {
  const zone = useGame((s) => s.zoneLabel);
  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      <div className="absolute left-4 top-4 rounded-full bg-rw-paper/85 px-3 py-1 text-[11px] font-mono tracking-[0.22em] text-rw-ink shadow-sm backdrop-blur">
        RESUME WORLD
      </div>
      <div className="absolute right-4 top-4 rounded-full bg-rw-paper/85 px-3 py-1 text-[11px] font-mono tracking-[0.18em] text-rw-ink-soft shadow-sm backdrop-blur">
        {zone}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-mono tracking-[0.18em] text-rw-ink-soft/70">
        WASD to move &nbsp;·&nbsp; E to interact &nbsp;·&nbsp; ESC to close
      </div>
    </div>
  );
}
