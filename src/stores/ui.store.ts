import { create } from 'zustand';

interface State {
  showRoomsWindow: boolean;
  setShowRoomsWindow: (value: boolean) => void;
}

export const useUIStore = create<State>((set) => ({
  showRoomsWindow: false,
  setShowRoomsWindow: (value) => set({ showRoomsWindow: value }),
}));
