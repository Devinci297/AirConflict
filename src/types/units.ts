import type { MunitionType } from './supplies';

export type AircraftType = 
  | 'F-22A' 
  | 'F-35A' 
  | 'F-15E' 
  | 'F-15EX' 
  | 'F-16C' 
  | 'A-10C' 
  | 'F/A-18E' 
  | 'EA-18G' 
  | 'B-2A' 
  | 'B-1B' 
  | 'B-52H'
  | 'RQ-4'
  | 'MQ-9'
  | 'U-2S'
  | 'E-3'
  | 'E-8'
  | 'RC-135'
  | 'KC-135'
  | 'KC-46'
  | 'C-17'
  | 'C-130J'
  | 'C-5M';

export type AircraftStatus = 
  | 'MC'       // Mission Capable
  | 'NMC'      // Non-Mission Capable (Maintenance)
  | 'IN_FLIGHT'
  | 'DESTROYED';

export interface Aircraft {
  id: string;            // Unique tail number
  baseId: string;        // ID of assigned MOB or FOS
  type: AircraftType;
  status: AircraftStatus;
  fuelPercent: number;
  loadout: Record<MunitionType, number>;
  currentSortieId?: string;
}

export type CrewStatus = 'AVAILABLE' | 'FLYING' | 'RESTING' | 'INJURED' | 'KIA' | 'MIA';

export interface Pilot {
  id: string;
  name: string;
  qualificationLevel: 'WINGMAN' | 'FLIGHT_LEAD' | 'INSTRUCTOR';
  status: CrewStatus;
  dutyHoursToday: number;
}
