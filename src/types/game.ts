import type { Aircraft } from './units';
import type { Base } from './bases';
import type { Satellite } from './space';
import type { EnemyAircraft, SAMSite, OpforAIState } from './opfor';
import type { GameMessage } from './messages';
import type { FeatureCollection, Polygon } from 'geojson';

export type GamePhase = 'PLANNING' | 'EXECUTION' | 'ASSESSMENT';

export interface TimeState {
  zuluTime: string; // ISO format or formatted string
  tickRate: number; // 1 = 1x, 0 = paused, 4 = 4x
  cycleNumber: number;
}

export interface ATOCycle {
  cycleNumber: number;
  status: 'DRAFT' | 'PUBLISHED' | 'FINALIZED' | 'EXECUTING' | 'COMPLETED';
  missionPackages: MissionPackage[];
}

export interface MissionPackage {
  id: string;
  targetId: string;
  assignedAircraftIds: string[];
  tot: string; // Time on Target
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface GameSession {
  id: string;
  hostId: string;
  scenarioId: string;
  players: Record<string, any>; // maps to GamePlayers
  status: 'LOBBY' | 'IN_PROGRESS' | 'COMPLETED';
}

// The root Game State
export interface GameState {
  // Global
  phase: GamePhase;
  time: TimeState;
  
  territory?: FeatureCollection<Polygon, { owner: 'BLUE' | 'RED' | 'NEUTRAL' }>;

  // Players
  players: Record<string, { role: string; roomId: string; name: string }>;
  
  // Normalized Entities (Flat structures)
  bases: Record<string, Base>;
  aircraft: Record<string, Aircraft>;
  satellites: Record<string, Satellite>;
  messages: GameMessage[];
  
  // OPFOR State
  opfor: {
    aiState: OpforAIState;
    aircraft: Record<string, EnemyAircraft>;
    samSites: Record<string, SAMSite>;
  };
  
  // ATO
  currentAto: ATOCycle;
  atoHistory: ATOCycle[];
  
  // Metrics
  metrics: {
    airSuperiorityIndex: number;
    targetsDestroyedPercent: number;
    forceStrengthPercent: number;
  };
}
