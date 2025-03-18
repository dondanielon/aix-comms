import { create } from 'zustand';
import { GameState, RoomInfo, User } from '@src/types/game.types';

interface GameStore {
  user: User | null;
  setUser: (user: User) => void;

  gameState: GameState | null;
  setGameState: (gameState: GameState) => void;

  gamesList: RoomInfo[];
  setGamesList: (list: RoomInfo[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  gameState: null,
  setGameState: (gameState) => set({ gameState }),

  gamesList: [],
  setGamesList: (gamesList) => set({ gamesList }),
}));
