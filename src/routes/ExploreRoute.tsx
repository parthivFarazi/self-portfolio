import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Scene } from '@/world/Scene';
import { useGame } from '@/state/gameStore';
import { useIsNarrowViewport, useIsTouchDevice } from '@/hooks/useTouchInput';
import { HUD } from '@/components/ui/HUD';
import { InteractPrompt } from '@/components/ui/InteractPrompt';
import { BuildingDialog } from '@/components/ui/BuildingDialog';
import { TouchControls } from '@/components/ui/TouchControls';
import { WorldLoadingScreen } from '@/components/ui/WorldLoadingScreen';
import { FpsProbe } from '@/components/ui/FpsProbe';

const INTRO_SEEN_KEY = 'rw-intro-seen-v2';

export default function ExploreRoute({
  onBackHome,
  onOpenQuick,
}: {
  onBackHome: () => void;
  onOpenQuick: () => void;
}) {
  const [worldLoading, setWorldLoading] = useState(true);
  // Hide the nav while a panel is open — the dialog has its own Close and a
  // second visible exit row floating over the content reads as noise.
  const activeBuilding = useGame((s) => s.activeBuildingId);
  const isTouch = useIsTouchDevice();
  const narrow = useIsNarrowViewport(768);
  const calmHud = isTouch || narrow;
  const loadStartedAt = useRef(performance.now());
  const readyTimer = useRef<number | null>(null);

  useEffect(() => {
    loadStartedAt.current = performance.now();
    setWorldLoading(true);
    return () => {
      if (readyTimer.current !== null) {
        window.clearTimeout(readyTimer.current);
      }
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="rw-explore-shell relative h-full w-full overflow-hidden bg-[#efeae0]">
        <Scene
          onReady={() => {
            const elapsed = performance.now() - loadStartedAt.current;
            // Just enough floor to avoid a flash-of-loading-screen; the old
            // 750ms minimum was pure added wait.
            const remaining = Math.max(0, 300 - elapsed);
            if (readyTimer.current !== null) {
              window.clearTimeout(readyTimer.current);
            }
            readyTimer.current = window.setTimeout(() => {
              setWorldLoading(false);
              readyTimer.current = null;
            }, remaining);
          }}
        />
        <HUD onOpenQuick={onOpenQuick} />
        <InteractPrompt />
        <BuildingDialog />
        <TouchControls />
        {!activeBuilding &&
          (calmHud ? (
            // Phones: one quiet way out. Quick View lives inside the map
            // card, where wayfinding already happens.
            <button
              type="button"
              onClick={onBackHome}
              aria-label="Back to home screen"
              className="absolute z-50 grid h-11 w-11 place-items-center rounded-full text-[#2a1a0e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b3a369]"
              style={{
                left: 'calc(env(safe-area-inset-left, 0px) + 10px)',
                top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
              }}
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#d4c178]/70 bg-[#fff8e2]/80 text-[15px] shadow-sm backdrop-blur"
              >
                ⌂
              </span>
            </button>
          ) : (
            <div className="absolute left-4 top-14 z-50 flex flex-col items-start gap-2">
              <WorldNavButton onClick={onBackHome} label="Home Screen" />
              <WorldNavButton onClick={onOpenQuick} label="Quick View" />
            </div>
          ))}
        {!worldLoading && <IntroToast />}
        <FpsProbe />
        {worldLoading ? <WorldLoadingScreen /> : null}
      </div>
    </MotionConfig>
  );
}

function WorldNavButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rw-world-home-button rw-pill px-4 py-2 text-[10.5px] font-mono uppercase tracking-[0.16em] transition hover:-translate-y-0.5 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b3a369]"
    >
      {label}
    </button>
  );
}

// One-time welcome card on first spawn — a quiet, postcard-like note that
// states the idea and the controls, then leaves the moment the visitor
// starts walking (or taps it, or opens a building).
function IntroToast() {
  const [visible, setVisible] = useState(() => {
    try {
      return !window.localStorage.getItem(INTRO_SEEN_KEY);
    } catch {
      return true;
    }
  });
  const opened = useGame((s) => s.activeBuildingId);

  useEffect(() => {
    if (visible && opened) dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, opened]);

  // The lesson is learned the moment they walk — fade out after the player
  // has moved a few steps from spawn.
  useEffect(() => {
    if (!visible) return;
    return useGame.subscribe((state) => {
      const [x, , z] = state.playerPosition;
      if (x * x + z * z > 36) dismiss();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* fine — they'll see it once more next visit */
    }
  };

  if (!visible) return null;
  const touch = window.matchMedia?.('(pointer: coarse)').matches;
  return (
    <button
      type="button"
      onClick={dismiss}
      style={{ animation: 'rw-toast-in 0.9s ease-out both' }}
      className="pointer-events-auto absolute left-1/2 top-[22%] z-20 w-[min(78vw,300px)] -translate-x-1/2 cursor-pointer rounded-[20px] border border-[#e8d8a8] bg-[#fffaf0]/95 px-6 py-5 text-center shadow-[0_18px_50px_rgba(40,20,8,0.18)] backdrop-blur-md"
      aria-label="Welcome note — tap to dismiss"
    >
      <span className="block font-serif text-[19px] italic leading-snug text-[#2a1a0e]">
        Welcome to the island
      </span>
      <span className="mt-2 block text-[12.5px] leading-relaxed text-[#5a4a36]">
        Every building holds a piece of my story.
      </span>
      <span className="mx-auto mt-3 block w-fit rounded-full bg-[#2a1a0e]/[0.06] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#7a5a30]">
        {touch ? 'drag to walk · tap GO to enter' : 'WASD to walk · E to enter'}
      </span>
    </button>
  );
}
