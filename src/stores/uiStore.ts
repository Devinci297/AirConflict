import { create } from 'zustand';

interface UIState {
  // Skeleton UI state
  activeRoom: string | null;
  setActiveRoom: (roomId: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeRoom: null,
  setActiveRoom: (roomId) => set({ activeRoom: roomId }),
}));
