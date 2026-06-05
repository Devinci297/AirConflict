import type { MapCoordinate } from './maps';

export type OpforAIState = 
  | 'DEFENSIVE' 
  | 'PROBING' 
  | 'OFFENSIVE' 
  | 'SURGE' 
  | 'RECOVERY';

export type EnemyAircraftType = 
  | 'J-20' 
  | 'J-16' 
  | 'J-10C' 
  | 'H-6K' 
  | 'Su-35' 
  | 'MiG-29' 
  | 'Su-57' 
  | 'Drone_Swarm';

export interface EnemyAircraft {
  id: string;
  type: EnemyAircraftType;
  position: MapCoordinate;
  heading: number;
  altitudeFt: number;
  speedKts: number;
  isKnown: boolean; // Has ISR detected them?
}

export type ThreatType = 'SAM' | 'AAA' | 'ARTILLERY' | 'BALLISTIC_MISSILE' | 'CRUISE_MISSILE';

export interface SAMSite {
  id: string;
  type: string; // e.g., 'S-400', 'HQ-9'
  position: MapCoordinate;
  engagementRangeNm: number;
  isMobile: boolean;
  isKnown: boolean;
  status: 'ACTIVE' | 'EMITTING' | 'SILENT' | 'DESTROYED';
}

export interface OpforUnit {
  id: string;
  type: ThreatType;
  position: MapCoordinate;
  isKnown: boolean;
}
