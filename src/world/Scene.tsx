import { Canvas } from '@react-three/fiber';
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

export function Scene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      shadows
      dpr={1}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
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
      <Lighting />
      {/* Warm horizon fog — softens the island edge into the peach sky. */}
      <fog attach="fog" args={['#f4b87a', 110, 280]} />

      <Sky />
      <Atmosphere />
      <Island />
      <Plaza />
      <Buildings />
      <Decorations />
      <Player />
    </Canvas>
  );
}
