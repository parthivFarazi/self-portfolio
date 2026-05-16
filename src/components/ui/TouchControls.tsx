// On-screen joystick + interact button for touch devices.
//
// Joystick — bottom-left, 96 px outer / 44 px thumb. Drag direction maps
// to the touchInput vector (1:1 with keyboard input); drag distance maps
// to magnitude in [0, 1] for variable walking speed.
//
// Interact — bottom-right, 64 px round button. Triggers openBuilding for
// the currently-nearby building, same as pressing E.

import { useEffect, useRef, useState } from 'react';
import {
  setTouchVector,
  clearTouchVector,
  useIsTouchDevice,
  useIsNarrowViewport,
} from '@/hooks/useTouchInput';
import { useGame } from '@/state/gameStore';

const STICK_SIZE = 96;
const THUMB_SIZE = 44;
const STICK_HALF = STICK_SIZE / 2;
const MAX_DRAG = STICK_HALF - THUMB_SIZE / 2 - 2; // keep thumb inside ring

export function TouchControls() {
  // Show on real touch hardware (coarse pointer) OR on any narrow viewport
  // (matches the spec's ≤768 px trigger and gives a way to test in resized
  // desktop windows where coarse-pointer media query isn't available).
  const isTouch = useIsTouchDevice();
  const narrow = useIsNarrowViewport(768);
  if (!isTouch && !narrow) return null;
  return (
    <>
      <Joystick />
      <InteractButton />
    </>
  );
}

function Joystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    const updateFromClient = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const mag = Math.hypot(dx, dy);
      if (mag > MAX_DRAG) {
        dx = (dx / mag) * MAX_DRAG;
        dy = (dy / mag) * MAX_DRAG;
      }
      setThumb({ x: dx, y: dy });
      const m = Math.min(1, mag / MAX_DRAG);
      if (m < 0.08) {
        clearTouchVector();
      } else {
        // World: +Z is "south" (player.up = -Z). Stick up = -dy = move forward.
        const ndx = dx / MAX_DRAG;
        const ndz = dy / MAX_DRAG;
        setTouchVector(ndx, ndz, m);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (activePointer.current !== null) return;
      activePointer.current = e.pointerId;
      el.setPointerCapture(e.pointerId);
      e.preventDefault();
      updateFromClient(e.clientX, e.clientY);
    };
    const onMove = (e: PointerEvent) => {
      if (activePointer.current !== e.pointerId) return;
      e.preventDefault();
      updateFromClient(e.clientX, e.clientY);
    };
    const onUp = (e: PointerEvent) => {
      if (activePointer.current !== e.pointerId) return;
      activePointer.current = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* releasePointerCapture throws if already released — harmless */
      }
      setThumb({ x: 0, y: 0 });
      clearTouchVector();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div
      ref={baseRef}
      aria-label="Movement joystick"
      role="application"
      style={{
        position: 'absolute',
        left: 'max(env(safe-area-inset-left, 0px), 20px)',
        bottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        width: STICK_SIZE,
        height: STICK_SIZE,
        borderRadius: '50%',
        background: 'rgba(255, 248, 226, 0.32)',
        border: '1.5px solid rgba(212, 193, 120, 0.7)',
        boxShadow: '0 2px 0 rgba(180, 150, 60, 0.4), 0 12px 24px rgba(40, 20, 8, 0.25)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'auto',
        zIndex: 50,
      }}
    >
      {/* Thumb */}
      <div
        style={{
          position: 'absolute',
          left: STICK_HALF - THUMB_SIZE / 2 + thumb.x,
          top: STICK_HALF - THUMB_SIZE / 2 + thumb.y,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          borderRadius: '50%',
          background: 'rgba(212, 193, 120, 0.85)',
          border: '1.5px solid rgba(255, 248, 226, 0.7)',
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 4px 8px rgba(40, 20, 8, 0.35)',
          transition: activePointer.current === null ? 'left 0.12s ease, top 0.12s ease' : 'none',
        }}
      />
      {/* Compass tick marks — subtle visual cue */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45 }}>
        {[[STICK_HALF, 4], [STICK_HALF, STICK_SIZE - 8], [4, STICK_HALF], [STICK_SIZE - 8, STICK_HALF]].map(
          ([x, y], i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: x - 2,
                top: y - 2,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#7a5a30',
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}

function InteractButton() {
  const openBuilding = useGame((s) => s.openBuilding);
  const closeBuilding = useGame((s) => s.closeBuilding);

  const onTap = () => {
    const state = useGame.getState();
    if (state.activeBuildingId) {
      closeBuilding();
    } else if (state.nearbyBuildingId) {
      openBuilding(state.nearbyBuildingId);
    }
  };

  return (
    <button
      type="button"
      onClick={onTap}
      aria-label="Interact (E)"
      style={{
        position: 'absolute',
        right: 'max(env(safe-area-inset-right, 0px), 20px)',
        bottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'rgba(245, 217, 122, 0.92)',
        color: '#2a1a0e',
        border: '2px solid rgba(180, 150, 60, 0.85)',
        boxShadow: '0 3px 0 rgba(140, 100, 30, 0.55), 0 12px 24px rgba(40, 20, 8, 0.32)',
        font: '700 22px "JetBrains Mono", monospace',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'auto',
        zIndex: 50,
      }}
    >
      E
    </button>
  );
}
