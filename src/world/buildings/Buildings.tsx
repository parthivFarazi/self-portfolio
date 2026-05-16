import type { ComponentType } from 'react';
import { BUILDINGS, type BuildingDef } from '@/data/buildings';
import { Placeholder } from './Placeholder';
import { TechTower } from './TechTower';
import { PetronasTowers } from './PetronasTowers';
import { UPDT } from './UPDT';
import { RMAICT } from './RMAICT';
import { DeltaUpsilon } from './DeltaUpsilon';
import { Forge } from './Forge';
import { Lighthouse } from './Lighthouse';
import { Qard } from './Qard';
import { Athletic } from './Athletic';
import { Archive } from './Archive';
import { ZenGarden } from './ZenGarden';
import { HeatmapGarden } from './HeatmapGarden';
import { RobotWorkshop } from './RobotWorkshop';

const REGISTRY: Partial<Record<BuildingDef['id'], ComponentType<{ def: BuildingDef }>>> = {
  tech: TechTower,
  petronas: PetronasTowers,
  updt: UPDT,
  rmaict: RMAICT,
  du: DeltaUpsilon,
  forge: Forge,
  lighthouse: Lighthouse,
  qard: Qard,
  athletic: Athletic,
  archive: Archive,
  zen: ZenGarden,
  heatmap: HeatmapGarden,
  workshop: RobotWorkshop,
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
