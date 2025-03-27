import { create } from 'zustand';
import { GameState, RoomInfo, User } from '@src/types/game.types';
import { Vector3 } from 'three';

interface GameStore {
  user: User | null;
  setUser: (user: User | null) => void;

  gameState: GameState | null;
  setGameState: (gameState: GameState | null) => void;

  gamesList: RoomInfo[];
  setGamesList: (list: RoomInfo[]) => void;

  rightClickIndicator: Vector3 | null;
  setRightClickIndicator: (indicator: Vector3 | null) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  gameState: null,
  setGameState: (gameState) => set({ gameState }),

  gamesList: [],
  setGamesList: (gamesList) => set({ gamesList }),

  rightClickIndicator: null,
  setRightClickIndicator: (rightClickIndicator) => set({ rightClickIndicator }),
}));
