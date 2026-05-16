import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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

export function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      onCreated={({ gl }) => { gl.shadowMap.type = THREE.PCFSoftShadowMap; }}
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

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
