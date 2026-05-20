import { useEffect, useRef, useState } from 'react';
import { Scene } from './world/Scene';
import { HUD } from './components/ui/HUD';
import { InteractPrompt } from './components/ui/InteractPrompt';
import { BuildingDialog } from './components/ui/BuildingDialog';
import { TouchControls } from './components/ui/TouchControls';
import { LandingPage, QuickViewDashboard } from './components/quick-view/QuickView';
import { useGame } from './state/gameStore';
import { Audio } from './audio/AudioManager';
import { WorldLoadingScreen } from './components/ui/WorldLoadingScreen';

type AppMode = 'landing' | 'quick-view' | 'world';

function modeFromHash(hash: string): AppMode {
  if (hash === '#quick-view') return 'quick-view';
  if (hash === '#explore') return 'world';
  return 'landing';
}

export default function App() {
  const [mode, setMode] = useState<AppMode>(() => modeFromHash(window.location.hash));
  const [worldLoading, setWorldLoading] = useState(() => mode === 'world');
  const closeBuilding = useGame((s) => s.closeBuilding);
  const worldLoadStartedAt = useRef(0);
  const worldReadyTimer = useRef<number | null>(null);

  useEffect(() => {
    const syncMode = () => setMode(modeFromHash(window.location.hash));
    window.addEventListener('hashchange', syncMode);
    window.addEventListener('popstate', syncMode);
    return () => {
      window.removeEventListener('hashchange', syncMode);
      window.removeEventListener('popstate', syncMode);
    };
  }, []);

  useEffect(() => {
    if (mode !== 'world') Audio.enterZone(null);
  }, [mode]);

  useEffect(() => {
    if (mode === 'world') {
      worldLoadStartedAt.current = performance.now();
      setWorldLoading(true);
      return;
    }
    setWorldLoading(false);
    if (worldReadyTimer.current !== null) {
      window.clearTimeout(worldReadyTimer.current);
      worldReadyTimer.current = null;
    }
  }, [mode]);

  useEffect(() => {
    return () => {
      if (worldReadyTimer.current !== null) {
        window.clearTimeout(worldReadyTimer.current);
      }
    };
  }, []);

  const showMode = (next: AppMode) => {
    closeBuilding();
    if (next !== 'world') Audio.enterZone(null);
    setMode(next);
    const nextHash = next === 'landing' ? window.location.pathname + window.location.search : `#${next === 'quick-view' ? 'quick-view' : 'explore'}`;
    window.history.pushState(null, '', nextHash);
  };

  if (mode === 'quick-view') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#efeae0]">
        <QuickViewDashboard onOpenWorld={() => showMode('world')} onBackHome={() => showMode('landing')} />
      </div>
    );
  }

  if (mode === 'world') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#efeae0]">
        <Scene
          onReady={() => {
            const elapsed = performance.now() - worldLoadStartedAt.current;
            const remaining = Math.max(0, 750 - elapsed);
            if (worldReadyTimer.current !== null) {
              window.clearTimeout(worldReadyTimer.current);
            }
            worldReadyTimer.current = window.setTimeout(() => {
              setWorldLoading(false);
              worldReadyTimer.current = null;
            }, remaining);
          }}
        />
        <HUD />
        <InteractPrompt />
        <BuildingDialog />
        <TouchControls />
        <WorldHomeButton onClick={() => showMode('landing')} />
        {worldLoading ? <WorldLoadingScreen /> : null}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#efeae0]">
      <LandingPage onOpenQuick={() => showMode('quick-view')} onOpenWorld={() => showMode('world')} />
    </div>
  );
}

function WorldHomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-4 top-14 z-50 rounded-full border border-[#d4c178] bg-[#fff8e2]/95 px-4 py-2 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#2a1a0e] shadow-[0_2px_0_#d4c178,0_10px_24px_rgba(40,20,8,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#b3a369] focus:outline-none focus:ring-2 focus:ring-[#b3a369]/35"
    >
      Home Screen
    </button>
  );
}
