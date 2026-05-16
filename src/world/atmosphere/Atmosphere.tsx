import { Clouds } from './Clouds';
import { DistantIsland } from './DistantIsland';
import { Particles } from './Particles';
import { Birds } from './Birds';

// All sky-level and ambient effects in one mount point.
export function Atmosphere() {
  return (
    <group>
      <Clouds />
      {/* Two distant floating islands — pure visual easter eggs */}
      <DistantIsland kind="tech" position={[-160, 32, -160]} seed={0.13} />
      <DistantIsland kind="petronas" position={[160, 35, -160]} seed={0.71} />
      <Particles />
      <Birds />
    </group>
  );
}
