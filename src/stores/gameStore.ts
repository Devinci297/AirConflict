import { create } from 'zustand';

interface GameState {
  // Skeleton state
  phase: 'PLANNING' | 'EXECUTION' | 'ASSESSMENT';
  tickRate: number;
  // TODO: Add more game state properties from GDD
}

export const useGameStore = create<GameState>((set) => ({
  phase: 'PLANNING',
  tickRate: 1,
}));
