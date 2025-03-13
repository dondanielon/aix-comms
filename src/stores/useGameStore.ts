import { create } from 'zustand';
import { WebSocketGameState, WebSocketRoom } from '@src/interfaces';

interface GameState {
  userId: string | null;
  setUserId: (id: string) => void;

  isInLobby: boolean;
  setIsInLobby: (value: boolean) => void;

  lobbyId: string | null;
  setLobbyId: (id: string) => void;

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
  lobbyId: null,
  setLobbyId: (id) => set({ lobbyId: id }),
  gameState: null,
  setGameState: (gameState) => set({ gameState }),
  gamesList: [],
  setGamesList: (list) => set({ gamesList: list }),
}));
