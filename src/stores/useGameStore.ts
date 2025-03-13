import { create } from 'zustand';
import { WebSocketGameState, WebSocketRoom } from '@src/interfaces';

interface GameState {
  userId: string | null;
  setUserId: (id: string) => void;

  isInLobby: boolean;
  setIsInLobby: (value: boolean) => void;

  gameState: WebSocketGameState | null;
  setGameState: (gameState: WebSocketGameState) => void;

  gamesList: WebSocketRoom[];
  setGamesList: (list: WebSocketRoom[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  isInLobby: true,
  setIsInLobby: (value) => set({ isInLobby: value }),
  gameState: null,
  setGameState: (gameState) => set({ gameState }),
  gamesList: [],
  setGamesList: (list) => set({ gamesList: list }),
}));
