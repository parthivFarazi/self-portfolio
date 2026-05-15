import { create } from 'zustand';
import type { BuildingId } from '@/constants/buildings';

interface GameState {
  playerPosition: [number, number, number];
  playerFacing: number;
  nearbyBuildingId: BuildingId | null;
  activeBuildingId: BuildingId | null;
  zoneLabel: string;
  setPlayerPosition: (p: [number, number, number]) => void;
  setPlayerFacing: (yaw: number) => void;
  setNearbyBuilding: (id: BuildingId | null) => void;
  openBuilding: (id: BuildingId) => void;
  closeBuilding: () => void;
  setZoneLabel: (label: string) => void;
  isPaused: () => boolean;
}

export const useGame = create<GameState>((set, get) => ({
  playerPosition: [0, 0, 0],
  playerFacing: 0,
  nearbyBuildingId: null,
  activeBuildingId: null,
  zoneLabel: 'Spawn Plaza',
  setPlayerPosition: (p) => set({ playerPosition: p }),
  setPlayerFacing: (yaw) => set({ playerFacing: yaw }),
  setNearbyBuilding: (id) => set({ nearbyBuildingId: id }),
  openBuilding: (id) => set({ activeBuildingId: id }),
  closeBuilding: () => set({ activeBuildingId: null }),
  setZoneLabel: (label) => set({ zoneLabel: label }),
  isPaused: () => get().activeBuildingId !== null,
}));

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  // @ts-expect-error debug bridge for preview MCP
  window.__game = useGame;
}
