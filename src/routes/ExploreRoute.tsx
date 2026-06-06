import { useEffect, useRef, useState } from 'react';
import { Scene } from '@/world/Scene';
import { HUD } from '@/components/ui/HUD';
import { InteractPrompt } from '@/components/ui/InteractPrompt';
import { BuildingDialog } from '@/components/ui/BuildingDialog';
import { TouchControls } from '@/components/ui/TouchControls';
import { WorldLoadingScreen } from '@/components/ui/WorldLoadingScreen';

export default function ExploreRoute({ onBackHome }: { onBackHome: () => void }) {
  const [worldLoading, setWorldLoading] = useState(true);
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
    <div className="rw-explore-shell relative h-full w-full overflow-hidden bg-[#efeae0]">
      <Scene
        onReady={() => {
          const elapsed = performance.now() - loadStartedAt.current;
          const remaining = Math.max(0, 750 - elapsed);
          if (readyTimer.current !== null) {
            window.clearTimeout(readyTimer.current);
          }
          readyTimer.current = window.setTimeout(() => {
            setWorldLoading(false);
            readyTimer.current = null;
          }, remaining);
        }}
      />
      <HUD />
      <InteractPrompt />
      <BuildingDialog />
      <TouchControls />
      <WorldHomeButton onClick={onBackHome} />
      {worldLoading ? <WorldLoadingScreen /> : null}
    </div>
  );
}

function WorldHomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rw-world-home-button absolute left-4 top-14 z-50 rounded-full border border-[#d4c178] bg-[#fff8e2]/95 px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#2a1a0e] shadow-[0_2px_0_#d4c178,0_10px_24px_rgba(40,20,8,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#b3a369] focus:outline-none focus:ring-2 focus:ring-[#b3a369]/35"
    >
      Home Screen
    </button>
  );
}
