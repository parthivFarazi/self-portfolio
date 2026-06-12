import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { BUILDINGS } from '@/data/buildings';
import { useIsNarrowViewport, useIsTouchDevice } from '@/hooks/useTouchInput';

export function InteractPrompt() {
  const nearby = useGame((s) => s.nearbyBuildingId);
  const active = useGame((s) => s.activeBuildingId);
  const openBuilding = useGame((s) => s.openBuilding);
  const isTouch = useIsTouchDevice();
  const narrow = useIsNarrowViewport(768);
  const touchUi = isTouch || narrow;
  const building = nearby ? BUILDINGS.find((b) => b.id === nearby) : null;
  const visible = !!building && !active;

  // Tiny haptic tick when a building first comes into range — audio chime
  // already exists, but phones are usually muted.
  useEffect(() => {
    if (nearby) navigator.vibrate?.(5);
  }, [nearby]);

  return (
    <AnimatePresence>
      {visible && building && (
        <motion.div
          key={building.id}
          initial={{ opacity: 0, x: '-50%', y: 8 }}
          animate={{ opacity: 1, x: '-50%', y: 0 }}
          exit={{ opacity: 0, x: '-50%', y: 8 }}
          transition={{ duration: 0.18 }}
          className="fixed left-1/2 z-20"
          style={{
            // Touch: an informational card up top (Monument Valley chapter-
            // title territory) — name + description, clear of the avatar at
            // screen centre and of the controls below. GO is the action.
            top: touchUi ? 'calc(env(safe-area-inset-top, 0px) + 58px)' : undefined,
            bottom: touchUi ? undefined : '5rem',
            pointerEvents: touchUi ? 'auto' : 'none',
          }}
        >
          {touchUi ? (
            <button
              type="button"
              onClick={() => {
                navigator.vibrate?.(10);
                openBuilding(building.id);
              }}
              className="w-[min(78vw,330px)] rounded-2xl bg-rw-ink/85 px-4 py-2.5 text-center text-rw-cream shadow-[0_8px_30px_rgba(0,0,0,0.3)] ring-1 ring-rw-amber/30 backdrop-blur-sm active:scale-95 transition-transform"
            >
              <span className="block font-serif text-[16px] leading-snug">
                {building.shortLabel}
              </span>
              <span className="mt-0.5 block font-sans text-[11.5px] italic leading-snug text-rw-cream/70">
                {building.subtitle}
              </span>
            </button>
          ) : (
            <div className="rounded-2xl bg-rw-ink/85 px-5 py-3 text-rw-cream shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm ring-1 ring-rw-amber/30">
              <div className="flex items-center gap-3">
                <kbd className="rounded-md border border-rw-amber/60 bg-rw-amber/15 px-2 py-0.5 font-mono text-[12px] tracking-widest text-rw-amber">
                  E
                </kbd>
                <span className="font-serif text-lg">Enter {building.shortLabel}</span>
              </div>
              {/* Plain-language subtitle — gives the gist before the visitor
                  even opens the panel. Same line that appears in the panel
                  header for consistency. */}
              <div className="mt-1 max-w-[44ch] pl-[44px] font-sans text-[13px] italic leading-snug text-rw-cream/75">
                {building.subtitle}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
