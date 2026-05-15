import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { BUILDINGS } from '@/constants/buildings';

export function InteractPrompt() {
  const nearby = useGame((s) => s.nearbyBuildingId);
  const active = useGame((s) => s.activeBuildingId);
  const building = nearby ? BUILDINGS.find((b) => b.id === nearby) : null;
  const visible = !!building && !active;

  return (
    <AnimatePresence>
      {visible && building && (
        <motion.div
          key={building.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="rounded-2xl bg-rw-ink/85 px-5 py-3 text-rw-cream shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm ring-1 ring-rw-amber/30">
            <div className="flex items-center gap-3">
              <kbd className="rounded-md border border-rw-amber/60 bg-rw-amber/15 px-2 py-0.5 font-mono text-[12px] tracking-widest text-rw-amber">
                E
              </kbd>
              <span className="font-serif text-lg">Enter {building.shortLabel}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
