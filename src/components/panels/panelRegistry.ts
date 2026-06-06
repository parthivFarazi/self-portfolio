import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { BuildingId } from '@/data/buildings';
import type { PanelProps } from './UPDTPanel';

type PanelComponent = ComponentType<PanelProps>;

const panelLoaders: Record<BuildingId, () => Promise<{ default: PanelComponent }>> = {
  updt: () => import('./UPDTPanel').then((m) => ({ default: m.UPDTPanel })),
  rmaict: () => import('./RMAICTPanel').then((m) => ({ default: m.RMAICTPanel })),
  du: () => import('./PongPanelV2').then((m) => ({ default: m.PongPanelV2 })),
  tech: () => import('./CollegiateTowerPanel').then((m) => ({ default: m.CollegiateTowerPanel })),
  petronas: () => import('./PetronasTowersPanel').then((m) => ({ default: m.PetronasTowersPanel })),
  forge: () => import('./ForgePanel').then((m) => ({ default: m.ForgePanel })),
  lighthouse: () => import('./LighthousePanel').then((m) => ({ default: m.LighthousePanel })),
  qard: () => import('./QardPanel').then((m) => ({ default: m.QardPanel })),
  athletic: () => import('./AthleticPanel').then((m) => ({ default: m.AthleticPanel })),
  archive: () => import('./ArchivePanel').then((m) => ({ default: m.ArchivePanel })),
  zen: () => import('./SoothePanel').then((m) => ({ default: m.SoothePanel })),
  heatmap: () => import('./HeatmapPanel').then((m) => ({ default: m.HeatmapPanel })),
  workshop: () => import('./WorkshopPanel').then((m) => ({ default: m.WorkshopPanel })),
  gba: () => import('./CartridgePanel').then((m) => ({ default: m.CartridgePanel })),
};

const lazyPanels = new Map<BuildingId, LazyExoticComponent<PanelComponent>>();

export function getLazyPanel(id: BuildingId): LazyExoticComponent<PanelComponent> {
  const cached = lazyPanels.get(id);
  if (cached) return cached;
  const next = lazy(panelLoaders[id]);
  lazyPanels.set(id, next);
  return next;
}

export function preloadPanel(id: BuildingId) {
  void panelLoaders[id]();
}
