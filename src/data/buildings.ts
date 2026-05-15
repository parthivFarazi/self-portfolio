import type { ComponentType } from 'react';
import { UPDTPanel, type PanelProps } from '@/components/panels/UPDTPanel';
import { StubPanel } from '@/components/panels/StubPanel';

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
  name: string;             // full name for HUD + dialog title
  shortLabel: string;       // floating world label
  ring: Ring;
  position: [number, number, number];
  shape: BuildingShape;
  color: string;
  triggerRadius: number;
  panel: ComponentType<PanelProps>;
  panelSize: { w: number; h: number };
}

const stub = (title: string, blurb: string) => {
  const C: ComponentType<PanelProps> = (props) => StubPanel({ ...props, title, blurb });
  C.displayName = `Stub(${title})`;
  return C;
};

export const BUILDINGS: BuildingDef[] = [
  // ─── INNER RING ──────────────────────────────────────────────────────────
  {
    id: 'updt',
    name: 'UPDT. Soccer Stadium',
    shortLabel: 'UPDT.',
    ring: 'inner',
    position: [0, 0, -30],
    shape: { kind: 'cylinder', radius: 7, height: 6 },
    color: '#b3dfd7',
    triggerRadius: 11,
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
    panel: stub('RMAICT Tower', 'AI Engineer Intern · Kuala Lumpur · May–Aug 2024.'),
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
    panel: stub('Delta Upsilon — Pong', 'Pong Baseball Automation App · Nov 2025 – Jan 2026.'),
    panelSize: { w: 760, h: 780 },
  },

  // ─── MID RING ────────────────────────────────────────────────────────────
  {
    id: 'tech',
    name: 'The Tech Tower',
    shortLabel: 'Tech Tower',
    ring: 'mid',
    position: [-30, 0, -30],
    shape: { kind: 'box', width: 5, depth: 5, height: 16 },
    color: '#a8553c',
    triggerRadius: 6.5,
    panel: stub('The Tech Tower — Education', 'Georgia Institute of Technology · B.S. Computer Science · Expected Dec 2026.'),
    panelSize: { w: 680, h: 760 },
  },
  {
    id: 'petronas',
    name: 'Petronas Twin Towers',
    shortLabel: 'Twin Towers',
    ring: 'mid',
    position: [40, 0, -40],
    shape: { kind: 'twin', width: 4, depth: 4, height: 22, spacing: 8 },
    color: '#c8d4e0',
    triggerRadius: 11,
    panel: stub('Petronas Twin Towers — About Me', 'CS @ Georgia Tech · Co-founder & CTO of UPDT · grew up between KL and Atlanta.'),
    panelSize: { w: 720, h: 760 },
  },
  {
    id: 'forge',
    name: 'The Forge',
    shortLabel: 'The Forge',
    ring: 'mid',
    position: [-25, 0, 25],
    shape: { kind: 'box', width: 8, depth: 6, height: 4 },
    color: '#7a6b5a',
    triggerRadius: 7,
    panel: stub('The Forge — Skills', 'Languages, frameworks, AI/ML, DevOps — the full toolbelt.'),
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
    panel: stub('The Lighthouse — Contact', 'parthivfarazi@icloud.com · +1 (404) 203-5379 · GitHub / LinkedIn / updt.pro.'),
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
    triggerRadius: 7,
    panel: stub('The Qard Greenhouse — Fintech Frontend', 'Founding Frontend Developer · Qard · Jun–Aug 2025.'),
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'athletic',
    name: 'The Athletic Stadium',
    shortLabel: 'Athletic',
    ring: 'outer',
    position: [55, 0, -20],
    shape: { kind: 'cylinder', radius: 6, height: 3 },
    color: '#8e6f48',
    triggerRadius: 9,
    panel: stub('The Athletic Stadium — College Football Valuation', 'Python · Pandas · valuation models for 60+ NCAA programs.'),
    panelSize: { w: 880, h: 780 },
  },
  {
    id: 'archive',
    name: 'The Whispering Archive',
    shortLabel: 'Archive',
    ring: 'outer',
    position: [-55, 0, 5],
    shape: { kind: 'dome', radius: 3.5, baseHeight: 2.5 },
    color: '#a89878',
    triggerRadius: 6.5,
    panel: stub('The Whispering Archive — Quote Retrieval', 'FAISS + Gemma-3 embeddings · 490k+ quotes · GT PACE H100 cluster.'),
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
    panel: stub('The Zen Garden — Soothe', 'AI Mental Health App · React Native · FastAPI · GPT-4 · May–Jul 2025.'),
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
    panel: stub('The Heatmap Garden — xGenius', 'Off-Ball Run Impact Score (ORIS) pipeline · 1000+ player movements/game.'),
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
    panel: stub("The Robot's Workshop", 'Litter-Picking Robot · C++ · Arduino · KL · Jan–Apr 2021. Where it all started.'),
    panelSize: { w: 760, h: 780 },
  },
];

export function getBuilding(id: BuildingId): BuildingDef {
  const b = BUILDINGS.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown building: ${id}`);
  return b;
}

// AABB footprint of a building for collision. Returns null for shapes the
// player should be able to walk onto (flat discs).
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
