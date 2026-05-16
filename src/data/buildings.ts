import type { ComponentType } from 'react';
import { UPDTPanel, type PanelProps } from '@/components/panels/UPDTPanel';
import { RMAICTPanel } from '@/components/panels/RMAICTPanel';
import { PongPanelV2 } from '@/components/panels/PongPanelV2';
import { CollegiateTowerPanel } from '@/components/panels/CollegiateTowerPanel';
import { TwinTowersPanel } from '@/components/panels/TwinTowersPanel';
import { ForgePanel } from '@/components/panels/ForgePanel';
import { LighthousePanel } from '@/components/panels/LighthousePanel';
import { QardPanel } from '@/components/panels/QardPanel';
import { AthleticPanel } from '@/components/panels/AthleticPanel';
import { ArchivePanel } from '@/components/panels/ArchivePanel';
import { SoothePanel } from '@/components/panels/SoothePanel';
import { HeatmapPanel } from '@/components/panels/HeatmapPanel';
import { WorkshopPanel } from '@/components/panels/WorkshopPanel';

export type BuildingId =
  | 'updt'
  | 'rmaict'
  | 'du'
  | 'tech'
  | 'petronas'
  | 'forge'
  | 'lighthouse'
  | 'qard'
  | 'athletic'
  | 'archive'
  | 'zen'
  | 'heatmap'
  | 'workshop';

export type BuildingShape =
  | { kind: 'cylinder'; radius: number; height: number }
  | { kind: 'box'; width: number; depth: number; height: number }
  | { kind: 'twin'; width: number; depth: number; height: number; spacing: number }
  | { kind: 'dome'; radius: number; baseHeight: number }
  | { kind: 'disc'; radius: number };

export type Ring = 'inner' | 'mid' | 'outer';

export interface BuildingDef {
  id: BuildingId;
  name: string;
  shortLabel: string;
  ring: Ring;
  position: [number, number, number];
  shape: BuildingShape;
  color: string;
  triggerRadius: number;
  panel: ComponentType<PanelProps>;
  panelSize: { w: number; h: number };
}

export const BUILDINGS: BuildingDef[] = [
  // ─── INNER RING ──────────────────────────────────────────────────────────
  {
    id: 'updt',
    name: 'UPDT. Soccer Stadium',
    shortLabel: 'UPDT.',
    ring: 'inner',
    position: [0, 0, -30],
    shape: { kind: 'cylinder', radius: 13, height: 8 },
    color: '#b3dfd7',
    triggerRadius: 18,
    panel: UPDTPanel,
    panelSize: { w: 820, h: 780 },
  },
  {
    id: 'rmaict',
    name: 'RMAICT Tower',
    shortLabel: 'RMAICT',
    ring: 'inner',
    position: [30, 0, 0],
    shape: { kind: 'box', width: 5, depth: 5, height: 14 },
    color: '#c97e58',
    triggerRadius: 6.5,
    panel: RMAICTPanel,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'du',
    name: 'Delta Upsilon',
    shortLabel: 'Delta Upsilon',
    ring: 'inner',
    position: [0, 0, 30],
    shape: { kind: 'box', width: 10, depth: 7, height: 4.5 },
    color: '#f6f1e4',
    triggerRadius: 8.5,
    panel: PongPanelV2,
    panelSize: { w: 760, h: 780 },
  },

  // ─── MID RING ────────────────────────────────────────────────────────────
  {
    id: 'tech',
    name: 'The Tech Tower',
    shortLabel: 'Tech Tower',
    ring: 'mid',
    position: [-30, 0, -30],
    shape: { kind: 'box', width: 4.4, depth: 4.4, height: 22 },
    color: '#a8553c',
    triggerRadius: 7,
    panel: CollegiateTowerPanel,
    panelSize: { w: 720, h: 760 },
  },
  {
    id: 'petronas',
    name: 'Petronas Twin Towers',
    shortLabel: 'Twin Towers',
    ring: 'mid',
    position: [40, 0, -40],
    shape: { kind: 'twin', width: 5, depth: 5, height: 28, spacing: 8 },
    color: '#c5cdd2',
    triggerRadius: 12,
    panel: TwinTowersPanel,
    panelSize: { w: 760, h: 760 },
  },
  {
    id: 'forge',
    name: 'The Forge',
    shortLabel: 'The Forge',
    ring: 'mid',
    position: [-25, 0, 25],
    shape: { kind: 'box', width: 8, depth: 6, height: 4 },
    color: '#b8b3a3',
    triggerRadius: 8,
    panel: ForgePanel,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'lighthouse',
    name: 'The Lighthouse',
    shortLabel: 'Lighthouse',
    ring: 'mid',
    position: [45, 0, 30],
    shape: { kind: 'cylinder', radius: 2, height: 14 },
    color: '#f6f1e4',
    triggerRadius: 5.5,
    panel: LighthousePanel,
    panelSize: { w: 760, h: 780 },
  },

  // ─── OUTER RING ──────────────────────────────────────────────────────────
  {
    id: 'qard',
    name: 'The Qard Greenhouse',
    shortLabel: 'Qard',
    ring: 'outer',
    position: [-50, 0, -10],
    shape: { kind: 'dome', radius: 4, baseHeight: 1.2 },
    color: '#94e2c0',
    triggerRadius: 8,
    panel: QardPanel,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'athletic',
    name: 'The Athletic Stadium',
    shortLabel: 'Athletic',
    ring: 'outer',
    position: [55, 0, -20],
    shape: { kind: 'cylinder', radius: 11, height: 6 },
    color: '#bcb6a0',
    triggerRadius: 14,
    panel: AthleticPanel,
    panelSize: { w: 880, h: 780 },
  },
  {
    id: 'archive',
    name: 'The Whispering Archive',
    shortLabel: 'Archive',
    ring: 'outer',
    position: [-55, 0, 5],
    shape: { kind: 'box', width: 7, depth: 7, height: 4 },
    color: '#d6c5a0',
    triggerRadius: 8,
    panel: ArchivePanel,
    panelSize: { w: 820, h: 780 },
  },
  {
    id: 'zen',
    name: 'The Zen Garden',
    shortLabel: 'Zen Garden',
    ring: 'outer',
    position: [-40, 0, 45],
    shape: { kind: 'disc', radius: 5 },
    color: '#d4c8a0',
    triggerRadius: 7,
    panel: SoothePanel,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'heatmap',
    name: 'The Heatmap Garden',
    shortLabel: 'Heatmap',
    ring: 'outer',
    position: [10, 0, 50],
    shape: { kind: 'disc', radius: 5 },
    color: '#e3a572',
    triggerRadius: 7,
    panel: HeatmapPanel,
    panelSize: { w: 820, h: 780 },
  },
  {
    id: 'workshop',
    name: "The Robot's Workshop",
    shortLabel: 'Workshop',
    ring: 'outer',
    position: [50, 0, 50],
    shape: { kind: 'box', width: 4, depth: 4, height: 3 },
    color: '#8b5a3c',
    triggerRadius: 5.5,
    panel: WorkshopPanel,
    panelSize: { w: 760, h: 780 },
  },
];

export function getBuilding(id: BuildingId): BuildingDef {
  const b = BUILDINGS.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown building: ${id}`);
  return b;
}

// Approximate top-of-mesh height in world units. Used by the camera to bias
// look-at Y so tall structures (Petronas, Tech Tower) stay in frame when the
// player walks up to them.
export function getVisualTopY(def: BuildingDef): number {
  const s = def.shape;
  switch (s.kind) {
    case 'cylinder': return s.height + 1.5;
    case 'box': return s.height + 8;            // covers parapet + roof + finial
    case 'twin': return s.height + 10;          // covers spires + tip light
    case 'dome': return s.baseHeight + s.radius + 1;
    case 'disc': return 1;
  }
}

export function footprintHalfExtents(def: BuildingDef): { halfX: number; halfZ: number } | null {
  const s = def.shape;
  switch (s.kind) {
    case 'cylinder': return { halfX: s.radius, halfZ: s.radius };
    case 'box': return { halfX: s.width / 2, halfZ: s.depth / 2 };
    case 'twin': {
      const total = s.spacing + s.width;
      return { halfX: total / 2, halfZ: s.depth / 2 };
    }
    case 'dome': return { halfX: s.radius, halfZ: s.radius };
    case 'disc': return null;
  }
}
