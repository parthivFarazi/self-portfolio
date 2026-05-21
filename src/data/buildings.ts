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
  | 'workshop'
  | 'gba';

export type BuildingShape =
  | { kind: 'cylinder'; radius: number; height: number }
  | { kind: 'oval'; radiusX: number; radiusZ: number; height: number }
  | { kind: 'box'; width: number; depth: number; height: number }
  | { kind: 'twin'; width: number; depth: number; height: number; spacing: number }
  | { kind: 'dome'; radius: number; baseHeight: number }
  | { kind: 'disc'; radius: number };

export type Ring = 'inner' | 'mid' | 'outer';

export interface BuildingDef {
  id: BuildingId;
  name: string;
  shortLabel: string;
  /** One-line plain-language description shown beneath every poetic title.
   *  10–15 words, no jargon — the line that tells a non-technical visitor
   *  what this building actually is. Surfaced in: each panel header, and
   *  the in-world Interact prompt. */
  subtitle: string;
  ring: Ring;
  position: [number, number, number];
  shape: BuildingShape;
  color: string;
  triggerRadius: number;
  panelSize: { w: number; h: number };
}

export const BUILDINGS: BuildingDef[] = [
  // ─── INNER RING ──────────────────────────────────────────────────────────
  {
    id: 'updt',
    name: 'UPDT. Soccer Stadium',
    shortLabel: 'UPDT.',
    subtitle: 'An AI platform that turns soccer broadcast footage into scouting data.',
    ring: 'inner',
    position: [0, 0, -30],
    shape: { kind: 'cylinder', radius: 13, height: 8 },
    color: '#b3dfd7',
    triggerRadius: 18,
    panelSize: { w: 820, h: 1020 },
  },
  {
    id: 'rmaict',
    name: 'RMAICT Tower',
    shortLabel: 'RMAICT',
    subtitle: 'An AI internship building document-reading models for receipts and invoices.',
    ring: 'inner',
    position: [30, 0, 0],
    shape: { kind: 'box', width: 5, depth: 5, height: 14 },
    color: '#c97e58',
    triggerRadius: 6.5,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'du',
    name: 'Delta Upsilon',
    shortLabel: 'Delta Upsilon',
    subtitle: 'A baseball stat-tracking app, live on the App Store, used by 70+ people.',
    ring: 'inner',
    position: [0, 0, 30],
    shape: { kind: 'box', width: 10, depth: 7, height: 4.5 },
    color: '#f6f1e4',
    triggerRadius: 8.5,
    panelSize: { w: 760, h: 880 },
  },

  // ─── MID RING ────────────────────────────────────────────────────────────
  {
    id: 'tech',
    name: 'The Tech Tower',
    shortLabel: 'Tech Tower',
    subtitle: 'B.S. Computer Science at Georgia Tech, graduating December 2026.',
    ring: 'mid',
    position: [-30, 0, -30],
    shape: { kind: 'box', width: 4.4, depth: 4.4, height: 14 },
    color: '#a8553c',
    triggerRadius: 7,
    panelSize: { w: 720, h: 760 },
  },
  {
    id: 'petronas',
    name: 'Petronas Twin Towers',
    shortLabel: 'Twin Towers',
    subtitle: "Who I am, where I'm from, and what I build.",
    ring: 'mid',
    // Phase 4: nudged ~15u further NW so its base plaza no longer reads as
    // attached to Athletic's banners (Athletic sits at [55, 0, -20]).
    position: [35, 0, -55],
    shape: { kind: 'twin', width: 5, depth: 5, height: 28, spacing: 8 },
    color: '#c5cdd2',
    triggerRadius: 12,
    panelSize: { w: 900, h: 820 },
  },
  {
    id: 'forge',
    name: 'The Forge',
    shortLabel: 'The Forge',
    subtitle: 'The languages, frameworks, and tools I work with.',
    ring: 'mid',
    position: [-25, 0, 25],
    shape: { kind: 'box', width: 8, depth: 6, height: 4 },
    color: '#b8b3a3',
    triggerRadius: 8,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'lighthouse',
    name: 'The Lighthouse',
    shortLabel: 'Lighthouse',
    subtitle: 'How to reach me — email, GitHub, LinkedIn, and resume.',
    ring: 'mid',
    position: [45, 0, 30],
    shape: { kind: 'cylinder', radius: 2, height: 14 },
    color: '#f6f1e4',
    triggerRadius: 5.5,
    panelSize: { w: 760, h: 780 },
  },

  // ─── OUTER RING ──────────────────────────────────────────────────────────
  {
    id: 'qard',
    name: 'The Qard Greenhouse',
    shortLabel: 'Qard',
    subtitle: 'A fintech startup landing page with an interactive 3D card interface.',
    ring: 'outer',
    position: [-50, 0, -10],
    shape: { kind: 'dome', radius: 4, baseHeight: 1.2 },
    color: '#94e2c0',
    triggerRadius: 8,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'athletic',
    name: 'The Athletic Stadium',
    shortLabel: 'Athletic',
    subtitle: 'A valuation model for 60+ college football programs, featured in The Athletic.',
    ring: 'outer',
    position: [55, 0, -20],
    shape: { kind: 'oval', radiusX: 12, radiusZ: 8, height: 6 },
    color: '#bcb6a0',
    triggerRadius: 14,
    panelSize: { w: 880, h: 900 },
  },
  {
    id: 'archive',
    name: 'The Whispering Archive',
    shortLabel: 'Archive',
    subtitle: 'A semantic search engine over 490k+ quotes using AI embeddings.',
    ring: 'outer',
    position: [-55, 0, 5],
    shape: { kind: 'box', width: 7, depth: 7, height: 4 },
    color: '#d6c5a0',
    triggerRadius: 8,
    panelSize: { w: 900, h: 780 },
  },
  {
    id: 'zen',
    name: 'The Zen Garden',
    shortLabel: 'Zen Garden',
    subtitle: 'An AI mental-health journaling app with mood analysis and prompts.',
    ring: 'outer',
    position: [-40, 0, 45],
    shape: { kind: 'disc', radius: 5 },
    color: '#d4c8a0',
    triggerRadius: 7,
    panelSize: { w: 760, h: 780 },
  },
  {
    id: 'heatmap',
    name: 'The Heatmap Garden',
    shortLabel: 'Heatmap Garden',
    subtitle: 'A pipeline that scores the runs soccer players make without the ball.',
    ring: 'outer',
    position: [10, 0, 50],
    shape: { kind: 'disc', radius: 5 },
    color: '#e3a572',
    triggerRadius: 7,
    panelSize: { w: 820, h: 880 },
  },
  {
    id: 'workshop',
    name: "The Robot's Workshop",
    shortLabel: 'Workshop',
    subtitle: 'A solar-powered robot that cleared litter from soccer fields.',
    ring: 'outer',
    position: [45, 0, 50],
    shape: { kind: 'box', width: 4, depth: 4, height: 3 },
    color: '#8b5a3c',
    triggerRadius: 5.5,
    panelSize: { w: 940, h: 780 },
  },
  {
    // The Cartridge — oversized GBA lying on the grass. Outer ring, south
    // side, in the open gap between Zen Garden (−40,45) and Heatmap (10,50).
    id: 'gba',
    name: 'The Cartridge',
    shortLabel: 'Cartridge',
    subtitle: 'A Game Boy Advance game built from scratch on the hardware, in C.',
    ring: 'outer',
    position: [-15, 0, 60],
    shape: { kind: 'box', width: 4, depth: 2.5, height: 0.6 },
    color: '#7E6CBC',
    triggerRadius: 4.5,
    panelSize: { w: 820, h: 920 },
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
    case 'cylinder':
    case 'oval': return s.height + 1.5;
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
    case 'oval': return { halfX: s.radiusX, halfZ: s.radiusZ };
    case 'box': return { halfX: s.width / 2, halfZ: s.depth / 2 };
    case 'twin': {
      const total = s.spacing + s.width;
      return { halfX: total / 2, halfZ: s.depth / 2 };
    }
    case 'dome': return { halfX: s.radius, halfZ: s.radius };
    case 'disc': return null;
  }
}
