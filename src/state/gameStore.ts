import { create } from 'zustand';
import type { BuildingId } from '@/data/buildings';

const VISITED_KEY = 'rw-visited';

function loadVisited(): Set<BuildingId> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(VISITED_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function persistVisited(visited: Set<BuildingId>) {
  try {
    window.localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
  } catch {
    /* private mode / quota — progress just won't persist */
  }
}

interface GameState {
  playerPosition: [number, number, number];
  playerFacing: number;
  nearbyBuildingId: BuildingId | null;
  activeBuildingId: BuildingId | null;
  zoneLabel: string;
  /** Buildings whose panel has been opened at least once (persisted). */
  visited: Set<BuildingId>;
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
  visited: loadVisited(),
  setPlayerPosition: (p) => set({ playerPosition: p }),
  setPlayerFacing: (yaw) => set({ playerFacing: yaw }),
  setNearbyBuilding: (id) => set({ nearbyBuildingId: id }),
  openBuilding: (id) => {
    const visited = new Set(get().visited);
    visited.add(id);
    persistVisited(visited);
    set({ activeBuildingId: id, visited });
  },
  closeBuilding: () => set({ activeBuildingId: null }),
  setZoneLabel: (label) => set({ zoneLabel: label }),
  isPaused: () => get().activeBuildingId !== null,
}));

if (typeof window !== 'undefined' && import.meta.env.DEV) {
  // @ts-expect-error debug bridge for preview MCP
  window.__game = useGame;
}
