import type { ComponentType } from 'react';
import { BUILDINGS, type BuildingDef } from '@/data/buildings';
import { Placeholder } from './Placeholder';
import { TechTower } from './TechTower';
import { PetronasTowers } from './PetronasTowers';

const REGISTRY: Partial<Record<BuildingDef['id'], ComponentType<{ def: BuildingDef }>>> = {
  tech: TechTower,
  petronas: PetronasTowers,
};

export function Buildings() {
  return (
    <>
      {BUILDINGS.map((b) => {
        const Custom = REGISTRY[b.id];
        return Custom ? <Custom key={b.id} def={b} /> : <Placeholder key={b.id} def={b} />;
      })}
    </>
  );
}
