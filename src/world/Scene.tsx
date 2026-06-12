import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sky } from './Sky';
import { Island } from './Island';
import { Plaza } from './Plaza';
import { Buildings, preloadAllBuildings } from './buildings/Buildings';
import { Decorations } from './decorations/Decorations';
import { Atmosphere } from './atmosphere/Atmosphere';
import { Player } from './Player';
import { IsometricCamera } from './IsometricCamera';
import { Lighting } from './lighting';
import { useGame } from '@/state/gameStore';

// Lazy — keeps the postprocessing stack out of the main explore chunk so
// the world renders its first frame before the composer code arrives.
const PostFX = lazy(() => import('./PostFX'));

export function Scene({ onReady }: { onReady?: () => void }) {
  const liteWorld = useMemo(() => {
    // ?lite=1 / ?lite=0 lets you force lite-world on/off for testing
    // the post-processing path at small viewports. Otherwise auto-detect.
    const qs = new URLSearchParams(window.location.search);
    if (qs.get('lite') === '1') return true;
    if (qs.get('lite') === '0') return false;
    return window.matchMedia('(pointer: coarse), (max-width: 767px)').matches;
  }, []);
  // min(devicePixelRatio, 2) — the shipped standard (r3f's own default) and
  // the perceptual knee: at DPR 2 a 1px detail gets two integer samples on a
  // 3x screen (true-retina density); the old 1.5 cap meant fractional
  // sampling + a 2x bilinear upscale = visibly jagged details and soft text.
  // If a device can't hold frame rate, the PerformanceMonitor ratchets down.
  const [adaptiveCap, setAdaptiveCap] = useState(2);
  const dpr = useClampedDevicePixelRatio(adaptiveCap);

  return (
    <Canvas
      shadows
      dpr={dpr}
      gl={{
        // All rendering goes through the EffectComposer's offscreen target
        // (desktop AND mobile), so the canvas's own MSAA buffer is never
        // seen — the composer's multisampling does the AA.
        antialias: false,
        powerPreference: 'high-performance',
        // The composer's <ToneMapping> owns ACES on every tier — keep the
        // renderer linear so we don't double-tone-map.
        toneMapping: THREE.NoToneMapping,
        // Bumped to 1.2 — the composer's ToneMapping effect reads the
        // renderer's exposure value via the standard three.js shader chunk,
        // so this still warms/lifts the pass.
        toneMappingExposure: 1.2,
      }}
      onCreated={({ gl, scene, camera }) => {
        gl.setPixelRatio(dpr);
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        if (import.meta.env.DEV) {
          (window as any).__r3f = { gl, scene, camera };
        }
        if (onReady) {
          // Hold the loading screen until every building chunk has loaded
          // AND its shaders have compiled (KHR_parallel_shader_compile —
          // ~99% iOS support). Otherwise the chunks land during the first
          // seconds of play and each first-draw compile drops frames.
          const ready = () => requestAnimationFrame(() => requestAnimationFrame(() => onReady()));
          preloadAllBuildings()
            .then(
              () =>
                new Promise<void>((resolve) => {
                  // Two frames so the loaded components actually mount.
                  requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
                }),
            )
            .then(() => gl.compileAsync(scene, camera))
            .then(ready, ready);
        }
      }}
    >
      <RendererQuality dpr={dpr} />
      <FrameloopGovernor />
      {/* One-way ratchet: if the frame rate sags for a sustained stretch,
          shave render resolution rather than changing the art. */}
      {/* Default bounds only fire below 40fps — a phone stuck at 45 feels
          laggy yet never declines. 52 catches the 60->40Hz cadence collapse
          early; finite flipflops + a hard floor keep Low Power Mode (30fps
          rAF cap, undetectable) from cascading quality away. */}
      <PerformanceMonitor
        bounds={() => [52, 58]}
        ms={200}
        iterations={7}
        flipflops={3}
        onDecline={() => setAdaptiveCap((cap) => Math.max(1.25, cap - 0.25))}
        onIncline={() => setAdaptiveCap((cap) => Math.min(2, cap + 0.25))}
        onFallback={() => setAdaptiveCap(1.25)}
      />
      <IsometricCamera />
      <Lighting liteWorld={liteWorld} />
      {/* Warm horizon fog — softens the island edge into the peach sky. */}
      <fog attach="fog" args={['#f4b87a', 110, 280]} />

      <Sky />
      {/* Clouds, petals, fireflies, birds, distant islands — ~50 instanced
          meshes. Cheap everywhere, and most of the world's life; phones get
          it too. */}
      <Atmosphere />
      <Island liteWorld={liteWorld} />
      <Plaza />
      <Buildings liteWorld={liteWorld} />
      <Decorations />
      <Player />
      {/* Hero-match post-processing — bloom + saturation + vignette + ACES.
          This is most of the "vibrant" look, so phones run it too, in a
          trimmed pass (smaller bloom kernel, 2x MSAA) at capped DPR. */}
      <Suspense fallback={null}>
        <PostFX lite={liteWorld} />
      </Suspense>
    </Canvas>
  );
}

function getClampedDevicePixelRatio(max: number) {
  if (typeof window === 'undefined') return 1;
  return Math.min(Math.max(window.devicePixelRatio || 1, 1), max);
}

function useClampedDevicePixelRatio(max: number) {
  const [dpr, setDpr] = useState(() => getClampedDevicePixelRatio(max));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setDpr(getClampedDevicePixelRatio(max));
    const viewport = window.visualViewport;

    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    viewport?.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      viewport?.removeEventListener('resize', update);
    };
  }, [max]);

  return dpr;
}

// Frames still to render once a panel opens — lets the world settle behind
// the overlay (and guarantees a deep-linked panel still gets its first
// rendered frame on initial load) before the loop parks.
const PANEL_SETTLE_FRAMES = 2;

/**
 * Halts the render loop while a full-screen building panel covers the world
 * and resumes it on close — no point burning GPU frames nobody can see.
 */
function FrameloopGovernor() {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const invalidate = useThree((s) => s.invalidate);
  const clock = useThree((s) => s.clock);
  const settleFrames = useRef(PANEL_SETTLE_FRAMES);

  useEffect(
    () =>
      useGame.subscribe((state, prev) => {
        if ((state.activeBuildingId === null) === (prev.activeBuildingId === null)) return;
        if (state.activeBuildingId === null) {
          // Panel closed — resume. setFrameloop resets the shared clock, so
          // carry elapsedTime across to keep ambient animation phases steady.
          const elapsed = clock.elapsedTime;
          setFrameloop('always');
          clock.elapsedTime = elapsed;
          invalidate();
        } else {
          // Panel opened — arm the countdown; the useFrame below parks us.
          settleFrames.current = PANEL_SETTLE_FRAMES;
        }
      }),
    [clock, invalidate, setFrameloop],
  );

  useFrame(() => {
    if (useGame.getState().activeBuildingId === null) return;
    settleFrames.current -= 1;
    if (settleFrames.current > 0) return;
    // This frame still completes its render before the loop stops.
    const elapsed = clock.elapsedTime;
    setFrameloop('never');
    clock.elapsedTime = elapsed;
  });

  return null;
}

function RendererQuality({ dpr }: { dpr: number }) {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(dpr);
    gl.setSize(size.width, size.height, false);
  }, [dpr, gl, size.height, size.width]);

  return null;
}
