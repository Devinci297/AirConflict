import { create } from 'zustand';

interface SettingsState {
  // Skeleton settings state
  volume: number;
  setVolume: (volume: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  volume: 1,
  setVolume: (volume) => set({ volume }),
}));
