export function Lighting({ liteWorld = false }: { liteWorld?: boolean }) {
  return (
    <>
      {/* Golden-hour key light — low sun (~28° elevation), warm amber. Long
          warm-tinted shadows fall toward camera. Higher intensity than before
          because we lowered ambient/hemi to restore contrast. */}
      <directionalLight
        castShadow={!liteWorld}
        position={[32, 22, 20]}
        intensity={1.75}
        color="#ffa55a"
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
      {/* Sky bounce — warm peach overhead, sage grass below. Lower intensity
          than before so shadowed areas stay dark and contrasty (depth!). */}
      <hemisphereLight args={['#ffd9b0', '#6b8050', 0.4]} />
      {/* Cool fill from the opposite quadrant so back-lit edges aren't
          ink-dark. Pulled down slightly so it doesn't wash out the warmth. */}
      <directionalLight position={[-30, 24, -28]} intensity={0.18} color="#b8a8d4" />
    </>
  );
}
