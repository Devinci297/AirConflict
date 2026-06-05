import { create } from 'zustand';
import type { GameState } from '../types/game';

// We initialize with a partial/empty state, which gets hydrated by the scenario factory
export const useGameStore = create<GameState>(() => ({
  phase: 'PLANNING',
  time: { zuluTime: '', tickRate: 0, cycleNumber: 1 },
  players: {},
  bases: {},
  aircraft: {},
  satellites: {},
  messages: [],
  opfor: { aiState: 'DEFENSIVE', aircraft: {}, samSites: {} },
  currentAto: { cycleNumber: 1, status: 'DRAFT', missionPackages: [] },
  atoHistory: [],
  metrics: { airSuperiorityIndex: 50, targetsDestroyedPercent: 0, forceStrengthPercent: 100 }
}));
