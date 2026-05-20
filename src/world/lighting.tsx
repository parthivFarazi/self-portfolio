export function Lighting({ liteWorld = false }: { liteWorld?: boolean }) {
  return (
    <>
      {/* Golden-hour key light, ~30° elevation, biased SE so shadows fall toward
          the camera and read clearly. */}
      <directionalLight
        castShadow={!liteWorld}
        position={[35, 40, 22]}
        intensity={1.0}
        color="#ffd9a0"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-camera-near={0.1}
        shadow-camera-far={220}
        shadow-bias={-0.0004}
      />
      {/* Sky bounce — lavender from above, grass green from below. Pulls shadows
          off pure black. */}
      <hemisphereLight args={['#cfa6c4', '#6db862', 0.6]} />
      {/* Cool fill from the opposite quadrant so back-lit edges aren't ink-dark. */}
      <directionalLight position={[-30, 24, -28]} intensity={0.25} color="#b8a8d4" />
    </>
  );
}
