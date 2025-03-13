import { create } from 'zustand';

interface UIState {
  showRoomsWindow: boolean;
  setShowRoomsWindow: (value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showRoomsWindow: false,
  setShowRoomsWindow: (value) => set({ showRoomsWindow: value }),
}));
