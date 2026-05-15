import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { getBuilding } from '@/data/buildings';

export function BuildingDialog() {
  const active = useGame((s) => s.activeBuildingId);
  const close = useGame((s) => s.closeBuilding);
  const def = active ? getBuilding(active) : null;
  const Panel = def?.panel;

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
            <Panel width={def.panelSize.w} height={def.panelSize.h} />
          </motion.div>

          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur hover:bg-white/20 transition"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
