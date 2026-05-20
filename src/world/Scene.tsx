import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { Sky } from './Sky';
import { Island } from './Island';
import { Plaza } from './Plaza';
import { Buildings } from './buildings/Buildings';
import { Decorations } from './decorations/Decorations';
import { Atmosphere } from './atmosphere/Atmosphere';
import { Player } from './Player';
import { IsometricCamera } from './IsometricCamera';
import { Lighting } from './lighting';
import { PostFX } from './PostFX';

export function Scene({ onReady }: { onReady?: () => void }) {
  const liteWorld = useMemo(() => {
    // ?lite=1 / ?lite=0 lets you force lite-world on/off for testing
    // the post-processing path at small viewports. Otherwise auto-detect.
    const qs = new URLSearchParams(window.location.search);
    if (qs.get('lite') === '1') return true;
    if (qs.get('lite') === '0') return false;
    return window.matchMedia('(pointer: coarse), (max-width: 767px)').matches;
  }, []);

  return (
    <Canvas
      shadows={!liteWorld}
      dpr={liteWorld ? 0.85 : [1, 2]}
      gl={{
        antialias: !liteWorld,
        powerPreference: 'high-performance',
        // On desktop, the EffectComposer's <ToneMapping> owns ACES so we keep
        // the renderer linear (no double tone-map). On liteWorld we skip the
        // composer entirely, so the renderer must tone-map itself.
        // On desktop, the EffectComposer's <ToneMapping> owns ACES so we keep
        // the renderer linear (no double tone-map). On liteWorld we skip the
        // composer entirely, so the renderer must tone-map itself.
        toneMapping: liteWorld ? THREE.ACESFilmicToneMapping : THREE.NoToneMapping,
        // Bumped to 1.2 — even with NoToneMapping the composer's ToneMapping
        // effect reads the renderer's exposure value via the standard
        // three.js shader chunk, so this still warms/lifts the desktop pass.
        toneMappingExposure: 1.2,
      }}
      onCreated={({ gl, scene, camera }) => {
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        if (import.meta.env.DEV) {
          (window as any).__r3f = { gl, scene, camera };
        }
        if (onReady) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => onReady());
          });
        }
      }}
    >
      <IsometricCamera />
      <Lighting liteWorld={liteWorld} />
      {/* Warm horizon fog — softens the island edge into the peach sky. */}
      <fog attach="fog" args={['#f4b87a', 110, 280]} />

      <Sky />
      {liteWorld ? null : <Atmosphere />}
      <Island liteWorld={liteWorld} />
      <Plaza />
      <Buildings />
      <Decorations />
      <Player />
      {/* Hero-match post-processing — bloom + vignette + ACES. Skipped on
          liteWorld (mobile/low-end) where the warmed lighting alone carries
          most of the look. */}
      {liteWorld ? null : <PostFX />}
    </Canvas>
  );
}
