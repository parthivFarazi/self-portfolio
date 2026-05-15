import { BUILDINGS, type BuildingId } from '@/data/buildings';

export function nearestBuilding(x: number, z: number): { id: BuildingId; dist: number } | null {
  let best: { id: BuildingId; dist: number } | null = null;
  for (const b of BUILDINGS) {
    const dx = x - b.position[0];
    const dz = z - b.position[2];
    const d = Math.hypot(dx, dz);
    if (d <= b.triggerRadius && (!best || d < best.dist)) {
      best = { id: b.id, dist: d };
    }
  }
  return best;
}
