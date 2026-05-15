import * as THREE from 'three';

// Shared material singletons. One instance per material across the whole world
// — Three.js batches draws by material, so reusing these is the perf win.
// Buildings that need a one-off tint should call `tinted(base, color)`.

// ── Stone / brick ────────────────────────────────────────────────────────
export const brickRed = new THREE.MeshStandardMaterial({ color: '#a8553c', roughness: 0.88 });
export const brickRedDark = new THREE.MeshStandardMaterial({ color: '#7a3a26', roughness: 0.92 });
export const stoneWarm = new THREE.MeshStandardMaterial({ color: '#d6c5a0', roughness: 0.82 });
export const stoneCool = new THREE.MeshStandardMaterial({ color: '#b8b3a3', roughness: 0.88 });
export const stoneFoundation = new THREE.MeshStandardMaterial({ color: '#7a6a4f', roughness: 1 });

// ── Glass ────────────────────────────────────────────────────────────────
export const glassFuturistic = new THREE.MeshStandardMaterial({
  color: '#9ad6e0',
  roughness: 0.18,
  metalness: 0.25,
  transparent: true,
  opacity: 0.55,
  emissive: '#1a3a40',
  emissiveIntensity: 0.35,
  side: THREE.DoubleSide,
});

// ── Metals ───────────────────────────────────────────────────────────────
// metalness held below 0.6 so the base color reads without an envMap. Phase 5
// can swap in a real HDRI for proper reflections.
export const metalSilver = new THREE.MeshStandardMaterial({ color: '#d4dce0', roughness: 0.45, metalness: 0.55 });
export const metalSilverDark = new THREE.MeshStandardMaterial({ color: '#8a9098', roughness: 0.5, metalness: 0.55 });
export const metalDark = new THREE.MeshStandardMaterial({ color: '#2a2520', roughness: 0.55, metalness: 0.6 });

// ── Wood ─────────────────────────────────────────────────────────────────
export const woodDark = new THREE.MeshStandardMaterial({ color: '#5a3a22', roughness: 0.85 });
export const woodLight = new THREE.MeshStandardMaterial({ color: '#f4ecd9', roughness: 0.7 });
export const woodMid = new THREE.MeshStandardMaterial({ color: '#8b5a3c', roughness: 0.8 });

// ── Specialty ────────────────────────────────────────────────────────────
export const chalkboardGreen = new THREE.MeshStandardMaterial({ color: '#1c2820', roughness: 0.95 });
export const pitchGreen = new THREE.MeshStandardMaterial({ color: '#3e8a3e', roughness: 0.95 });
export const sand = new THREE.MeshStandardMaterial({ color: '#e8d5a8', roughness: 0.95 });
export const water = new THREE.MeshStandardMaterial({
  color: '#3a5e7a',
  roughness: 0.25,
  metalness: 0.1,
  emissive: '#1a3a4a',
  emissiveIntensity: 0.2,
});

// ── Emissive / accent ────────────────────────────────────────────────────
export const goldEmissive = new THREE.MeshStandardMaterial({
  color: '#d4b86a',
  roughness: 0.35,
  metalness: 0.7,
  emissive: '#f5c878',
  emissiveIntensity: 0.85,
});
export const neonCyan = new THREE.MeshStandardMaterial({
  color: '#6fd5e0',
  emissive: '#6fd5e0',
  emissiveIntensity: 1.4,
  roughness: 0.5,
});
export const neonMagenta = new THREE.MeshStandardMaterial({
  color: '#e07ec3',
  emissive: '#e07ec3',
  emissiveIntensity: 1.4,
  roughness: 0.5,
});
export const lampAmber = new THREE.MeshStandardMaterial({
  color: '#f5d97a',
  emissive: '#f5d97a',
  emissiveIntensity: 1.2,
  roughness: 0.6,
});

// One-off tints — clone the base, swap color.
export function tinted(base: THREE.MeshStandardMaterial, color: string): THREE.MeshStandardMaterial {
  const m = base.clone();
  m.color = new THREE.Color(color);
  return m;
}
