// On-screen joystick + interact button for touch devices.
//
// Joystick — FLOATING: any touch in the lower-left region of the screen
// spawns the stick base right under the finger (the standard mobile-game
// pattern). The first touch always starts at zero magnitude — no lurch —
// and the thumb never has to find a small fixed ring blind. A resting
// hint ring marks the home position while idle.
//
// Drag distance maps to magnitude in [0, 1] for variable walking speed;
// visuals update through refs (no React re-render per pointermove).
//
// Interact — bottom-right "GO" button. Dimmed when nothing is in range,
// gently pulsing when a building can be entered. Hidden (with the stick)
// while a content panel is open so nothing floats over reading material.

import { useEffect, useRef, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  setTouchVector,
  clearTouchVector,
  useIsTouchDevice,
  useIsNarrowViewport,
} from '@/hooks/useTouchInput';
import { useGame } from '@/state/gameStore';
import { Audio } from '@/audio/AudioManager';

const STICK_SIZE = 112;
const THUMB_SIZE = 48;
const STICK_HALF = STICK_SIZE / 2;
// Input travel for full speed. Decoupled from the ring radius: the rendered
// thumb clamps to the ring, but the vector keeps tracking the finger.
const MAX_DRAG = 48;
// Fraction of MAX_DRAG treated as neutral — finger jitter lands inside it.
const DEAD_ZONE = 0.12;

export function TouchControls() {
  // Show on real touch hardware (coarse pointer) OR on any narrow viewport
  // (gives a way to test in resized desktop windows). Hidden entirely while
  // a panel is open — reading mode should have zero floating game chrome.
  const isTouch = useIsTouchDevice();
  const narrow = useIsNarrowViewport(768);
  const activeBuilding = useGame((s) => s.activeBuildingId);
  if ((!isTouch && !narrow) || activeBuilding) return null;
  return (
    <>
      <FloatingJoystick />
      <InteractButton />
    </>
  );
}

function FloatingJoystick() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const restRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);
  const origin = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const zone = zoneRef.current;
    const base = baseRef.current;
    const thumb = thumbRef.current;
    const rest = restRef.current;
    if (!zone || !base || !thumb || !rest) return;

    const setThumb = (dx: number, dy: number) => {
      thumb.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const updateFromClient = (clientX: number, clientY: number) => {
      let dx = clientX - origin.current.x;
      let dy = clientY - origin.current.y;
      const mag = Math.hypot(dx, dy);
      const m = Math.min(1, mag / MAX_DRAG);
      // Rendered thumb stays inside the ring even when the finger overshoots.
      const visual = Math.min(mag, STICK_HALF - THUMB_SIZE / 2 - 2);
      if (mag > 0.001) {
        setThumb((dx / mag) * visual, (dy / mag) * visual);
      } else {
        setThumb(0, 0);
      }
      if (m < DEAD_ZONE) {
        clearTouchVector();
      } else {
        // World: +Z is "south" (player.up = -Z). Stick up = -dy = move forward.
        setTouchVector(dx / (mag || 1), dy / (mag || 1), m);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (activePointer.current !== null) return;
      Audio.ensureStart();
      activePointer.current = e.pointerId;
      try {
        zone.setPointerCapture(e.pointerId);
      } catch {
        /* capture is an optimization (keeps drags outside the zone alive);
           losing it must not abort the gesture */
      }
      e.preventDefault();
      // Spawn the base under the finger, clamped so the ring stays on-screen.
      const x = Math.min(Math.max(e.clientX, STICK_HALF + 8), window.innerWidth * 0.6);
      const y = Math.min(Math.max(e.clientY, STICK_HALF + 8), window.innerHeight - STICK_HALF - 8);
      origin.current = { x, y };
      base.style.left = `${x - STICK_HALF}px`;
      base.style.top = `${y - STICK_HALF}px`;
      base.style.opacity = '1';
      rest.style.opacity = '0';
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
        zone.releasePointerCapture(e.pointerId);
      } catch {
        /* releasePointerCapture throws if already released — harmless */
      }
      base.style.opacity = '0';
      rest.style.opacity = '0.55';
      setThumb(0, 0);
      clearTouchVector();
    };

    zone.addEventListener('pointerdown', onDown);
    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerup', onUp);
    zone.addEventListener('pointercancel', onUp);
    return () => {
      zone.removeEventListener('pointerdown', onDown);
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerup', onUp);
      zone.removeEventListener('pointercancel', onUp);
      clearTouchVector();
    };
  }, []);

  const ringStyle: CSSProperties = {
    width: STICK_SIZE,
    height: STICK_SIZE,
    borderRadius: '50%',
    background: 'rgba(255, 248, 226, 0.32)',
    border: '1.5px solid rgba(212, 193, 120, 0.7)',
    boxShadow: '0 2px 0 rgba(180, 150, 60, 0.4), 0 12px 24px rgba(40, 20, 8, 0.25)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  };

  return (
    <>
      {/* Capture zone — generous lower-left region. Sits under the interact
          prompt and HUD buttons (z-order) so taps on real UI still win. */}
      <div
        ref={zoneRef}
        aria-label="Movement joystick"
        role="application"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '58%',
          height: '42%',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          pointerEvents: 'auto',
          zIndex: 15,
        }}
      />

      {/* Resting hint ring — home position while idle */}
      <div
        ref={restRef}
        aria-hidden="true"
        style={{
          ...ringStyle,
          position: 'absolute',
          left: 'calc(env(safe-area-inset-left, 0px) + 20px)',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
          opacity: 0.55,
          transition: 'opacity 0.18s ease',
          pointerEvents: 'none',
          zIndex: 16,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: STICK_HALF - THUMB_SIZE / 2,
            top: STICK_HALF - THUMB_SIZE / 2,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: '50%',
            background: 'rgba(212, 193, 120, 0.55)',
            border: '1.5px solid rgba(255, 248, 226, 0.7)',
          }}
        />
        {[[STICK_HALF, 5], [STICK_HALF, STICK_SIZE - 9], [5, STICK_HALF], [STICK_SIZE - 9, STICK_HALF]].map(
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
                opacity: 0.5,
              }}
            />
          ),
        )}
      </div>

      {/* Active floating base — positioned under the finger on touch */}
      <div
        ref={baseRef}
        aria-hidden="true"
        style={{
          ...ringStyle,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 16,
        }}
      >
        <div
          ref={thumbRef}
          style={{
            position: 'absolute',
            left: STICK_HALF - THUMB_SIZE / 2,
            top: STICK_HALF - THUMB_SIZE / 2,
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: '50%',
            background: 'rgba(212, 193, 120, 0.85)',
            border: '1.5px solid rgba(255, 248, 226, 0.7)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 4px 8px rgba(40, 20, 8, 0.35)',
          }}
        />
      </div>
    </>
  );
}

function InteractButton() {
  const nearby = useGame((s) => s.nearbyBuildingId);
  const openBuilding = useGame((s) => s.openBuilding);

  // A stroll, not a cockpit: the button only exists when there is something
  // to enter. The welcome note and loading screen teach what GO means.
  if (!nearby) return null;

  const onTap = () => {
    Audio.ensureStart();
    const state = useGame.getState();
    if (state.nearbyBuildingId) {
      navigator.vibrate?.(10);
      openBuilding(state.nearbyBuildingId);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={onTap}
      aria-label="Enter the nearby building"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: [1, 1.07, 1] }}
      transition={{ opacity: { duration: 0.25 }, scale: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'absolute',
        right: 'calc(env(safe-area-inset-right, 0px) + 20px)',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'rgba(245, 217, 122, 0.95)',
        color: '#2a1a0e',
        border: '2px solid rgba(180, 150, 60, 0.85)',
        boxShadow:
          '0 3px 0 rgba(140, 100, 30, 0.55), 0 0 22px rgba(245, 217, 122, 0.55), 0 12px 24px rgba(40, 20, 8, 0.32)',
        font: '700 15px "JetBrains Mono", monospace',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: 'auto',
        zIndex: 50,
      }}
    >
      GO
    </motion.button>
  );
}
