import { Trees } from './Trees';
import { Lanterns } from './Lanterns';
import { FlowerPatches } from './FlowerPatches';
import { Rocks } from './Rocks';
import { Bushes } from './Bushes';
import {
  TREE_PLACEMENTS,
  LANTERN_PLACEMENTS,
  FLOWER_PATCH_PLACEMENTS,
  ROCK_PLACEMENTS,
  BUSH_PLACEMENTS,
} from './placements';

// Single mount point for all static decorations. Placement data lives in
// placements.ts so it's easy to tune without diving into the renderers.
export function Decorations() {
  return (
    <group>
      <Trees trees={TREE_PLACEMENTS} />
      <Lanterns lanterns={LANTERN_PLACEMENTS} />
      <FlowerPatches patches={FLOWER_PATCH_PLACEMENTS} />
      <Rocks rocks={ROCK_PLACEMENTS} />
      <Bushes bushes={BUSH_PLACEMENTS} />
    </group>
  );
}
