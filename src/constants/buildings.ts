export type BuildingId = 'updt' | 'rmaict' | 'du';

export interface BuildingDef {
  id: BuildingId;
  name: string;
  shortLabel: string;
  position: [number, number, number];
  footprint: [number, number];
  height: number;
  shape: 'cylinder' | 'box';
  color: string;
  triggerRadius: number;
}

export const BUILDINGS: BuildingDef[] = [
  {
    id: 'updt',
    name: 'UPDT. Soccer Stadium',
    shortLabel: 'UPDT.',
    position: [0, 0, -30],
    footprint: [14, 10],
    height: 6,
    shape: 'cylinder',
    color: '#b3dfd7',
    triggerRadius: 11,
  },
  {
    id: 'rmaict',
    name: 'RMAICT Tower',
    shortLabel: 'RMAICT',
    position: [30, 0, 0],
    footprint: [5, 5],
    height: 14,
    shape: 'box',
    color: '#c97e58',
    triggerRadius: 6.5,
  },
  {
    id: 'du',
    name: 'Delta Upsilon',
    shortLabel: 'Delta Upsilon',
    position: [0, 0, 30],
    footprint: [10, 7],
    height: 4.5,
    shape: 'box',
    color: '#f6f1e4',
    triggerRadius: 8.5,
  },
];

export function getBuilding(id: BuildingId): BuildingDef {
  const b = BUILDINGS.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown building: ${id}`);
  return b;
}
