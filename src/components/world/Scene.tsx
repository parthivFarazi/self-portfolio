import { Canvas } from '@react-three/fiber';
import { Sky } from './Sky';
import { Island } from './Island';
import { Plaza } from './Plaza';
import { Buildings } from './Buildings';
import { Player } from './Player';
import { IsometricCamera } from './IsometricCamera';

export function Scene() {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
      <IsometricCamera />

      <ambientLight intensity={0.45} color="#fff1d6" />
      <directionalLight
        castShadow
        position={[40, 60, 25]}
        intensity={1.6}
        color="#ffd9a8"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-bias={-0.0005}
      />
      {/* Cool rim from opposite side */}
      <directionalLight position={[-30, 20, -30]} intensity={0.35} color="#c8a8d8" />

      <fog attach="fog" args={['#e3c5e1', 90, 240]} />

      <Sky />
      <Island />
      <Plaza />
      <Buildings />
      <Player />
    </Canvas>
  );
}
