import { BUILDINGS, type BuildingId } from '@/data/buildings';

// Reused result object — this runs every frame from Player's useFrame, and
// a fresh {id,dist} 60x/s is pure GC churn. Callers must not retain it.
const RESULT: { id: BuildingId; dist: number } = { id: BUILDINGS[0].id, dist: 0 };

export function nearestBuilding(x: number, z: number): { id: BuildingId; dist: number } | null {
  let bestId: BuildingId | null = null;
  let bestDist = Infinity;
  for (const b of BUILDINGS) {
    const dx = x - b.position[0];
    const dz = z - b.position[2];
    const d = Math.hypot(dx, dz);
    if (d <= b.triggerRadius && d < bestDist) {
      bestId = b.id;
      bestDist = d;
    }
  }
  if (bestId === null) return null;
  RESULT.id = bestId;
  RESULT.dist = bestDist;
  return RESULT;
}
