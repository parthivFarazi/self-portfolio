import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { getBuilding } from '@/data/buildings';
import { Audio } from '@/audio/AudioManager';
import { ResponsivePanel } from './ResponsivePanel';

export function BuildingDialog() {
  const active = useGame((s) => s.activeBuildingId);
  const close = useGame((s) => s.closeBuilding);
  const def = active ? getBuilding(active) : null;
  const Panel = def?.panel;

  // Fire page-turn on open, soft click on close. Sentinel tracks last known
  // active id so we only ping on edge transitions, not re-renders.
  const lastActive = useRef<string | null>(null);
  useEffect(() => {
    const current = active ?? null;
    if (current && current !== lastActive.current) {
      Audio.panelOpen();
    } else if (!current && lastActive.current) {
      Audio.panelClose();
    }
    lastActive.current = current;
  }, [active]);

  return (
    <AnimatePresence mode="wait">
      {def && Panel && (
        <motion.div
          key={def.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-auto p-6"
          onClick={close}
        >
          <motion.div
            key={`${def.id}-panel`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
              <Panel width={def.panelSize.w} height={def.panelSize.h} />
            </ResponsivePanel>
          </motion.div>

          {/* Close button — 44px min for mobile tap target */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur hover:bg-white/20 transition"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
