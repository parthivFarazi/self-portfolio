import { useGame } from '@/state/gameStore';
import { BUILDINGS } from '@/data/buildings';
import { useAudio } from '@/audio/useAudio';
import { useIsNarrowViewport, useIsTouchDevice } from '@/hooks/useTouchInput';
import { MiniMap } from './MiniMap';

export function HUD({ onOpenQuick }: { onOpenQuick?: () => void }) {
  const zone = useGame((s) => s.zoneLabel);
  const nearby = useGame((s) => s.nearbyBuildingId);
  const active = useGame((s) => s.activeBuildingId);
  const visitedCount = useGame((s) => s.visited.size);
  // Call both hooks unconditionally before combining — short-circuiting
  // `useA() || useB()` changes the hook count when capability flips.
  const isTouch = useIsTouchDevice();
  const narrow = useIsNarrowViewport(768);
  const mobileHud = isTouch || narrow;
  // Desktop keeps a persistent controls hint; on touch the loading screen,
  // the one-time welcome note, and the labeled GO button carry the teaching.
  const showHint = !mobileHud && !nearby && !active;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      {/* Phones get a near-empty frame — a stroll, not a dashboard. The
          title, zone label, and explored counter are desktop chrome. */}
      {!mobileHud && (
        <>
          <div className="rw-hud-title rw-pill absolute left-4 top-4 px-3.5 py-1.5">
            <span className="rw-pill-dot" aria-hidden="true" />
            <span style={{ font: '400 14px/1 var(--rw-pixel)', letterSpacing: '0.03em', color: '#4a3a26' }}>
              Parthiv&apos;s World
            </span>
          </div>
          <div className="rw-hud-status absolute right-4 top-4 flex items-center gap-2">
            <div className="rw-pill px-3 py-1.5" title="Buildings you have opened">
              <span className="rw-pill-dot rw-pill-dot--gold" aria-hidden="true" />
              <span className="font-mono text-[10.5px] tracking-[0.1em]">
                {visitedCount}/{BUILDINGS.length} explored
              </span>
            </div>
            <div className="rw-hud-zone rw-pill px-3.5 py-1.5">
              <span className="font-serif text-[13.5px] italic leading-none" style={{ color: '#4a3a26' }}>
                {zone}
              </span>
            </div>
            <MuteButton />
          </div>
        </>
      )}
      {mobileHud && (
        <div
          className="absolute flex items-center"
          style={{
            right: 'calc(env(safe-area-inset-right, 0px) + 10px)',
            top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
          }}
        >
          <MuteButton quiet />
        </div>
      )}
      {showHint && (
        <div className="rw-pill absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 font-sans text-[11.5px]">
          <kbd className="rw-kbd">WASD</kbd>
          <span>walk</span>
          <span className="opacity-40">·</span>
          <kbd className="rw-kbd">E</kbd>
          <span>step inside</span>
          <span className="opacity-40">·</span>
          <kbd className="rw-kbd">ESC</kbd>
          <span>close</span>
        </div>
      )}
      <MiniMap onOpenQuick={onOpenQuick} />
    </div>
  );
}

function MuteButton({ quiet = false }: { quiet?: boolean }) {
  const { muted, toggleMute } = useAudio();
  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute audio' : 'Mute audio'}
      title={muted ? 'Unmute' : 'Mute'}
      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full text-[13px] font-mono leading-none text-rw-ink transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
    >
      {/* 44px hit area, smaller visual circle; the quiet variant melts into
          the scenery until needed. */}
      <span
        aria-hidden="true"
        className={`grid place-items-center rounded-full shadow-sm backdrop-blur transition hover:bg-rw-paper ${
          quiet ? 'h-9 w-9 border border-[#d4c178]/70 bg-rw-paper/80 text-[14px]' : 'h-7 w-7 bg-rw-paper/85'
        }`}
      >
        {muted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}
