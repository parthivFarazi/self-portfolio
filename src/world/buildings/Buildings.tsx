import { startTransition, useEffect, useRef, useState, type ComponentType } from 'react';
import { useFrame } from '@react-three/fiber';
import { BUILDINGS, type BuildingDef } from '@/data/buildings';
import { Placeholder } from './Placeholder';
import { useGame } from '@/state/gameStore';

const LOD_NEAR = 78;
// Effectively "mount once": every building is within ~65u of spawn, so the
// old FAR=86 only ever fired on far-rim walks — unmounting and remounting
// entire building subtrees (texture re-bakes, shader recompiles) for zero
// steady-state savings. 999 keeps a loaded building loaded.
const LOD_FAR = 999;

type BuildingComponent = ComponentType<{ def: BuildingDef; liteWorld?: boolean }>;
type BuildingLoader = () => Promise<BuildingComponent>;

const REGISTRY: Partial<Record<BuildingDef['id'], BuildingLoader>> = {
  tech: () => import('./TechTower').then((m) => m.TechTower),
  petronas: () => import('./PetronasTowers').then((m) => m.PetronasTowers),
  updt: () => import('./UPDT').then((m) => m.UPDT),
  rmaict: () => import('./RMAICT').then((m) => m.RMAICT),
  du: () => import('./DeltaUpsilon').then((m) => m.DeltaUpsilon),
  forge: () => import('./Forge').then((m) => m.Forge),
  lighthouse: () => import('./Lighthouse').then((m) => m.Lighthouse),
  qard: () => import('./Qard').then((m) => m.Qard),
  athletic: () => import('./Athletic').then((m) => m.Athletic),
  archive: () => import('./Archive').then((m) => m.Archive),
  zen: () => import('./ZenGarden').then((m) => m.ZenGarden),
  heatmap: () => import('./HeatmapGarden').then((m) => m.HeatmapGarden),
  workshop: () => import('./RobotWorkshop').then((m) => m.RobotWorkshop),
  gba: () => import('./Cartridge').then((m) => m.Cartridge),
};

const componentCache = new Map<BuildingDef['id'], BuildingComponent>();

/** Import every building component up front — called behind the loading
 *  screen so chunk fetch + parse + first-render shader compiles never land
 *  mid-walk. */
export function preloadAllBuildings(): Promise<void> {
  return Promise.all(
    (Object.keys(REGISTRY) as BuildingDef['id'][]).map((id) =>
      REGISTRY[id]!().then((component) => {
        componentCache.set(id, component);
      }),
    ),
  ).then(() => undefined);
}

export function Buildings({ liteWorld = false }: { liteWorld?: boolean }) {
  return (
    <>
      {BUILDINGS.map((b) => {
        const loadComponent = REGISTRY[b.id];
        return <LodBuilding key={b.id} def={b} loadComponent={loadComponent} liteWorld={liteWorld} />;
      })}
    </>
  );
}

function LodBuilding({
  def,
  loadComponent,
  liteWorld = false,
}: {
  def: BuildingDef;
  loadComponent?: BuildingLoader;
  liteWorld?: boolean;
}) {
  const [useProxy, setUseProxy] = useState(true);
  const [Custom, setCustom] = useState<BuildingComponent | null>(() => componentCache.get(def.id) ?? null);
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

  useEffect(() => {
    if (useProxy || Custom || !loadComponent) return;

    let cancelled = false;
    void loadComponent().then((component) => {
      componentCache.set(def.id, component);
      if (cancelled) return;
      startTransition(() => {
        setCustom(() => component);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [Custom, def.id, loadComponent, useProxy]);

  if (useProxy || !Custom) return <Placeholder def={def} />;
  return <Custom def={def} liteWorld={liteWorld} />;
}
