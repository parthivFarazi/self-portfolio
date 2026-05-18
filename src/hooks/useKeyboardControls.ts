import { useEffect, useRef } from 'react';
import { useGame } from '@/state/gameStore';
import { Audio } from '@/audio/AudioManager';

type KeyMap = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
};

const initial = (): KeyMap => ({
  up: false,
  down: false,
  left: false,
  right: false,
  interact: false,
});

const KEYS: Record<string, keyof KeyMap> = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  KeyE: 'interact',
  Enter: 'interact',
  Space: 'interact',
};

export function useKeyboardControls() {
  const keys = useRef<KeyMap>(initial());
  const openBuilding = useGame((s) => s.openBuilding);
  const closeBuilding = useGame((s) => s.closeBuilding);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const action = KEYS[e.code];
      if (!action) return;
      Audio.ensureStart();
      e.preventDefault();
      if (keys.current[action]) return;
      keys.current[action] = true;

      if (action === 'interact') {
        const state = useGame.getState();
        if (state.activeBuildingId) return;
        if (state.nearbyBuildingId) openBuilding(state.nearbyBuildingId);
      }
    };
    const onUp = (e: KeyboardEvent) => {
      const action = KEYS[e.code];
      if (!action) return;
      keys.current[action] = false;
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeBuilding();
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('keydown', onEsc);
    };
  }, [openBuilding, closeBuilding]);

  return keys;
}
