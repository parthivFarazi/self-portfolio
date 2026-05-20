import { useRef, useState, type ComponentType } from 'react';
import { useFrame } from '@react-three/fiber';
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
import { Cartridge } from './Cartridge';
import { useGame } from '@/state/gameStore';

const LOD_NEAR = 78;
const LOD_FAR = 86;

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
  gba: Cartridge,
};

export function Buildings() {
  return (
    <>
      {BUILDINGS.map((b) => {
        const Custom = REGISTRY[b.id];
        return <LodBuilding key={b.id} def={b} Custom={Custom} />;
      })}
    </>
  );
}

function LodBuilding({
  def,
  Custom,
}: {
  def: BuildingDef;
  Custom?: ComponentType<{ def: BuildingDef }>;
}) {
  const [useProxy, setUseProxy] = useState(true);
  const useProxyRef = useRef(true);

  useFrame(() => {
    const [px, , pz] = useGame.getState().playerPosition;
    const dist = Math.hypot(def.position[0] - px, def.position[2] - pz);

    if (useProxyRef.current && dist < LOD_NEAR) {
      useProxyRef.current = false;
      setUseProxy(false);
    } else if (!useProxyRef.current && dist > LOD_FAR) {
      useProxyRef.current = true;
      setUseProxy(true);
    }
  });

  if (useProxy || !Custom) return <Placeholder def={def} />;
  return <Custom def={def} />;
}
