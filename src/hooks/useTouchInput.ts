// Touch-input bridge.
//
// Shared singleton vector that the Joystick writes to and Player.tsx reads
// from inside its useFrame loop. Magnitude is unit-clamped [0,1] so the
// player module can blend it identically with keyboard input (1 = full
// speed, fractional = partial speed for shorter joystick drags).

import { useEffect, useState } from 'react';

export interface TouchVector {
  dx: number;
  dz: number;
  magnitude: number;
}

// Mutable singleton — read directly from useFrame; no React subscription.
export const touchInput: TouchVector = { dx: 0, dz: 0, magnitude: 0 };

export function setTouchVector(dx: number, dz: number, magnitude: number) {
  touchInput.dx = dx;
  touchInput.dz = dz;
  touchInput.magnitude = magnitude;
}

export function clearTouchVector() {
  touchInput.dx = 0;
  touchInput.dz = 0;
  touchInput.magnitude = 0;
}

// ── Touch device detection ────────────────────────────────────────────
// Two-pronged: coarse pointer (CSS) + ontouchstart (JS). True on phones
// and most tablets; false on desktop mice and Apple trackpads. Reactive
// via matchMedia.change.

export function useIsTouchDevice(): boolean {
  const [touch, setTouch] = useState(() => detectTouch());
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(pointer: coarse)');
    const update = () => setTouch(detectTouch());
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, []);
  return touch;
}

function detectTouch(): boolean {
  if (typeof window === 'undefined') return false;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return coarse || hasTouch;
}

// ── Narrow viewport detection (mobile layout breakpoint) ──────────────

export function useIsNarrowViewport(maxWidth = 768): boolean {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < maxWidth,
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width: ${maxWidth - 1}px)`);
    const update = () => setNarrow(mql.matches);
    update();
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, [maxWidth]);
  return narrow;
}
