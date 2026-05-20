import { useGame } from '@/state/gameStore';
import { useAudio } from '@/audio/useAudio';
import { useIsNarrowViewport, useIsTouchDevice } from '@/hooks/useTouchInput';
import { MiniMap } from './MiniMap';

export function HUD() {
  const zone = useGame((s) => s.zoneLabel);
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
      <MiniMap />
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

