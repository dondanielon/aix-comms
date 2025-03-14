import { create } from 'zustand';
import { WebSocketGameState, WebSocketRoom } from '@src/interfaces';

interface User {
  id: string;
  email: string;
  metadata: {
    modelId: string;
  };
}

interface GameState {
  user: User | null;
  setUser: (user: User) => void;

  lobbyId: string | null;
  setLobbyId: (id: string) => void;

  state: WebSocketGameState | null;
  setState: (gameState: WebSocketGameState) => void;

  gamesList: WebSocketRoom[];
  setGamesList: (list: WebSocketRoom[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  lobbyId: null,
  setLobbyId: (lobbyId) => set({ lobbyId }),
  state: null,
  setState: (state) => set({ state }),
  gamesList: [],
  setGamesList: (gamesList) => set({ gamesList }),
}));
