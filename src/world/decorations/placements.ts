// Hand-tuned placements for Phase 4 atmosphere. Coordinates are island-local
// (x, z); y is derived inside each component. Seeds are stable per entry so
// instanced animations stay deterministic across reloads.

export interface TreePlacement {
  pos: [number, number];
  scale: number;
  seed: number;
  kind?: 'oak' | 'pine' | 'cherry-leaf'; // visual variant
}

export interface LanternPlacement {
  pos: [number, number];
  rot?: number; // y-rotation for sign-style facing, optional
}

export interface FlowerPatchPlacement {
  pos: [number, number];
  radius: number;
  count: number;
  palette: string[]; // 2-4 colors mixed within the patch
  seed: number;
}

export interface RockPlacement {
  pos: [number, number];
  scale: number;
  seed: number;
}

export interface BushPlacement {
  pos: [number, number];
  scale: number;
  seed: number;
}

// ── Trees ──────────────────────────────────────────────────────────────────
// 7 groves + 2 feature trees. ~24 trees total.
export const TREE_PLACEMENTS: TreePlacement[] = [
  // NW — Tech Tower frame (3)
  { pos: [-35, -24], scale: 1.0, seed: 0.13, kind: 'oak' },
  { pos: [-38, -21], scale: 0.9, seed: 0.31, kind: 'oak' },
  { pos: [-33, -18], scale: 1.1, seed: 0.47, kind: 'oak' },

  // N — UPDT pine stand (3) — small pines
  { pos: [-7, -47], scale: 1.05, seed: 0.59, kind: 'pine' },
  { pos: [0, -50], scale: 1.2, seed: 0.71, kind: 'pine' },
  { pos: [7, -47], scale: 1.0, seed: 0.83, kind: 'pine' },

  // NE — Petronas backdrop (3)
  { pos: [50, -44], scale: 1.0, seed: 0.91, kind: 'oak' },
  { pos: [53, -39], scale: 0.95, seed: 1.07, kind: 'oak' },
  { pos: [55, -47], scale: 1.1, seed: 1.19, kind: 'oak' },

  // W — Archive/Qard fringe (4)
  { pos: [-62, -8], scale: 1.05, seed: 1.31, kind: 'oak' },
  { pos: [-65, 0], scale: 0.95, seed: 1.43, kind: 'oak' },
  { pos: [-62, 8], scale: 1.0, seed: 1.57, kind: 'oak' },
  { pos: [-58, 11], scale: 0.9, seed: 1.69, kind: 'oak' },

  // E — Lighthouse cove (3)
  { pos: [52, 38], scale: 1.0, seed: 1.83, kind: 'oak' },
  { pos: [55, 42], scale: 1.15, seed: 1.97, kind: 'oak' },
  { pos: [58, 35], scale: 0.95, seed: 2.11, kind: 'oak' },

  // SW — Zen Garden surround (3)
  { pos: [-50, 55], scale: 1.05, seed: 2.23, kind: 'oak' },
  { pos: [-45, 60], scale: 1.1, seed: 2.37, kind: 'oak' },
  { pos: [-55, 52], scale: 0.95, seed: 2.51, kind: 'oak' },

  // S — Heatmap/Workshop fringe (3)
  { pos: [25, 62], scale: 1.0, seed: 2.63, kind: 'oak' },
  { pos: [18, 65], scale: 1.1, seed: 2.77, kind: 'oak' },
  { pos: [30, 65], scale: 0.95, seed: 2.91, kind: 'oak' },

  // Feature trees — single, larger
  { pos: [-22, -28], scale: 1.45, seed: 3.07, kind: 'oak' }, // big oak near Tech Tower
  { pos: [-32, 20], scale: 1.25, seed: 3.19, kind: 'pine' },  // lone pine W of Forge
];

// ── Lanterns ───────────────────────────────────────────────────────────────
// Pairs flanking the 4 cardinal paths, plus entrance pairs at key buildings.
export const LANTERN_PLACEMENTS: LanternPlacement[] = [
  // North path
  { pos: [-1.5, -10] }, { pos: [1.5, -10] },
  { pos: [-1.5, -16] }, { pos: [1.5, -16] },
  // South path
  { pos: [-1.5, 10] }, { pos: [1.5, 10] },
  { pos: [-1.5, 16] }, { pos: [1.5, 16] },
  // East path
  { pos: [10, -1.5] }, { pos: [10, 1.5] },
  { pos: [16, -1.5] }, { pos: [16, 1.5] },
  // West path
  { pos: [-10, -1.5] }, { pos: [-10, 1.5] },
  { pos: [-16, -1.5] }, { pos: [-16, 1.5] },
  // UPDT south entrance (path meets stadium plaza at ~z=-19.6)
  { pos: [-3, -19.5] }, { pos: [3, -19.5] },
  // Lighthouse entrance
  { pos: [43, 27] }, { pos: [47, 27] },
  // Archive entrance
  { pos: [-53, 9] }, { pos: [-57, 9] },
];

// ── Flower patches ─────────────────────────────────────────────────────────
const PAL_WARM = ['#f5a64f', '#f57228', '#ffd97a', '#e07ec3'];
const PAL_RED = ['#d8483a', '#f57228', '#f5a64f'];
const PAL_PASTEL = ['#fffaee', '#fbe6cc', '#f5b6da', '#e8d5a8'];
const PAL_MIX = ['#f5b6da', '#ffd97a', '#9ad6e0', '#f57228'];
const PAL_YELLOW = ['#ffd97a', '#f5d97a', '#f5a64f'];

export const FLOWER_PATCH_PLACEMENTS: FlowerPatchPlacement[] = [
  { pos: [-27, -27], radius: 1.4, count: 12, palette: PAL_WARM, seed: 0.21 },
  { pos: [-20, 22],  radius: 1.2, count: 10, palette: PAL_RED, seed: 0.43 },
  { pos: [4, 27],    radius: 1.5, count: 14, palette: PAL_PASTEL, seed: 0.67 },
  { pos: [-3, 17],   radius: 1.0, count: 8,  palette: PAL_MIX, seed: 0.89 },
  { pos: [44, 28],   radius: 1.2, count: 10, palette: PAL_YELLOW, seed: 1.13 },
];

// ── Rocks ──────────────────────────────────────────────────────────────────
// 7 angular stones, sparingly placed as transitional elements.
export const ROCK_PLACEMENTS: RockPlacement[] = [
  { pos: [-42, -42], scale: 0.7, seed: 0.11 },
  { pos: [57, -26], scale: 0.55, seed: 0.29 },
  { pos: [-58, -15], scale: 0.65, seed: 0.41 },
  { pos: [-45, 15], scale: 0.5, seed: 0.59 },
  { pos: [47, 55], scale: 0.6, seed: 0.73 },
  { pos: [-28, 52], scale: 0.55, seed: 0.87 },
  { pos: [35, 55], scale: 0.7, seed: 1.01 },
];

// ── Bushes ─────────────────────────────────────────────────────────────────
// 6 small shrubs at grass-path transitions and edges.
export const BUSH_PLACEMENTS: BushPlacement[] = [
  { pos: [5, 19], scale: 0.9, seed: 0.17 },
  { pos: [-5, 19], scale: 0.85, seed: 0.33 },
  { pos: [34, -4], scale: 0.9, seed: 0.51 },
  { pos: [-22, 30], scale: 0.95, seed: 0.69 },
  { pos: [52, -10], scale: 0.85, seed: 0.81 },
  { pos: [42, -30], scale: 0.9, seed: 0.97 },
];
