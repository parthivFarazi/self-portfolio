import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { CONTENT } from '@/data/content';

export function BuildingDialog() {
  const active = useGame((s) => s.activeBuildingId);
  const close = useGame((s) => s.closeBuilding);
  const entry = active ? CONTENT[active] : null;

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-rw-ink/40 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(560px,92vw)] max-h-[82vh] overflow-y-auto rounded-3xl bg-rw-paper p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-rw-ink/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-rw-ink-soft hover:bg-rw-ink/5 transition"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <div className="font-mono text-[11px] tracking-[0.22em] text-rw-gold uppercase">
              Building
            </div>
            <h2 className="mt-1 font-serif text-4xl leading-tight text-rw-ink">{entry.title}</h2>
            <div className="mt-3 font-mono text-[12px] tracking-wide text-rw-ink-soft">
              {entry.kicker}
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-rw-ink/85">
              {entry.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 border-t border-rw-ink/10 pt-4 text-right font-mono text-[11px] tracking-widest text-rw-ink-soft/60">
              ESC or click outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
