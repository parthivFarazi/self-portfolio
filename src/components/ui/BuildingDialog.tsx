import { Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/state/gameStore';
import { getBuilding } from '@/data/buildings';
import { Audio } from '@/audio/AudioManager';
import { ResponsivePanel, usePanelScale } from './ResponsivePanel';
import { PanelZoom } from './PanelZoom';
import { getLazyPanel } from '@/components/panels/panelRegistry';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import { useOverlayScrollHint } from '@/hooks/useOverlayScrollHint';

export function BuildingDialog() {
  const active = useGame((s) => s.activeBuildingId);
  const close = useGame((s) => s.closeBuilding);
  const def = active ? getBuilding(active) : null;
  const Panel = active ? getLazyPanel(active) : null;
  const dialogRef = useDialogFocus<HTMLDivElement>(!!active);
  const fit = usePanelScale(def?.panelSize.w ?? 800, def?.panelSize.h ?? 800);
  // Desktop-only: phones fit the whole panel, nothing scrolls.
  const showScrollHint = useOverlayScrollHint(dialogRef, !!active && !fit.isMobile);

  // Fire page-turn on open, soft click on close. Sentinel tracks last known
  // active id so we only ping on edge transitions, not re-renders.
  const lastActive = useRef<string | null>(null);
  useEffect(() => {
    const current = active ?? null;
    if (current && current !== lastActive.current) {
      Audio.panelOpen();
      navigator.vibrate?.(10);
    } else if (!current && lastActive.current) {
      Audio.panelClose();
    }
    lastActive.current = current;
  }, [active]);

  // Deliberately NOT wrapped in AnimatePresence: closing must be a plain
  // React unmount. Exit animations leave removal at framer's mercy and can
  // strand the overlay at opacity 0 as an invisible wall over the world.
  return (
    <>
      {def && Panel && (
        <motion.div
          key={def.id}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={def.name}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 z-30 overflow-auto"
          style={{ overscrollBehavior: 'contain' }}
          onClick={close}
        >
          {/* Dim+blur on a non-scrolling child — iOS WebKit freezes touch
              scrolling on elements that carry a backdrop-filter. */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm" />
          {fit.isMobile ? (
            /* Phones: the postcard view — whole panel visible, pinch /
               double-tap / magnifier to read. The area sits between the
               close button and the action bar. */
            <div
              className="absolute inset-x-0"
              style={{
                top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
                bottom: 'calc(env(safe-area-inset-bottom, 0px) + 10px)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={`${def.id}-panel`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <PanelZoom fitScale={fit.scale}>
                  <Suspense fallback={<PanelLoadingState width={def.panelSize.w} height={def.panelSize.h} />}>
                    <div className="shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                      <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
                        <Panel width={def.panelSize.w} height={def.panelSize.h} />
                      </ResponsivePanel>
                    </div>
                  </Suspense>
                </PanelZoom>
              </motion.div>
            </div>
          ) : (
            /* Desktop: block scroller with a full-size flex track — keeps
               both edges reachable when a tall panel scrolls. */
            <div className="flex min-h-full w-full min-w-fit p-3 sm:p-4">
              <motion.div
                key={`${def.id}-panel`}
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative m-auto shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                onClick={(e) => e.stopPropagation()}
              >
                <Suspense fallback={<PanelLoadingState width={def.panelSize.w} height={def.panelSize.h} />}>
                  <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
                    <Panel width={def.panelSize.w} height={def.panelSize.h} />
                  </ResponsivePanel>
                </Suspense>
              </motion.div>
            </div>
          )}

          {/* Close button — fixed so it can't scroll out of reach; respects
              notch safe-areas. 44px min tap target. */}
          <button
            type="button"
            aria-label="Close"
            data-autofocus
            onClick={close}
            className="fixed z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rw-amber"
            style={{
              top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
              right: 'calc(env(safe-area-inset-right, 0px) + 12px)',
            }}
          >
            <span className="text-xl leading-none">×</span>
          </button>

          {/* Cue that the panel continues below the fold — only when it
              actually overflows, gone after the first scroll. */}
          {showScrollHint && (
            <div
              className="pointer-events-none fixed left-1/2 z-10 -translate-x-1/2 rounded-full bg-rw-paper/90 px-4 py-1.5 font-mono text-[11px] tracking-[0.16em] text-rw-ink shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              style={{ bottom: '18px' }}
              aria-hidden="true"
            >
              Scroll for more ↓
            </div>
          )}

        </motion.div>
      )}
    </>
  );
}

function PanelLoadingState({ width, height }: { width: number; height: number }) {
  return (
    <ResponsivePanel width={width} height={height}>
      <div
        style={{
          width,
          height,
          display: 'grid',
          placeItems: 'center',
          background:
            'radial-gradient(circle at 50% 24%, rgba(255,255,255,0.16), transparent 28%), linear-gradient(180deg, #efe6cf 0%, #d8c9a6 100%)',
          color: '#2a1a0e',
          fontFamily: 'var(--rw-sans)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: '11px "JetBrains Mono", monospace', letterSpacing: '.24em', textTransform: 'uppercase', color: '#7a5a30' }}>
            Loading panel
          </div>
          <div style={{ marginTop: 10, font: 'italic 30px var(--rw-serif)' }}>Opening the notebook...</div>
        </div>
      </div>
    </ResponsivePanel>
  );
}
