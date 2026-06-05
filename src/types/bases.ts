import type { MunitionType } from './supplies';

export type BaseType = 'MOB' | 'FOS';

export type FacilityType = 
  | 'hangar' 
  | 'fuel_storage' 
  | 'munitions_storage' 
  | 'maintenance' 
  | 'tower' 
  | 'ops_center' 
  | 'medical' 
  | 'power_plant' 
  | 'water_treatment' 
  | 'comm_facility' 
  | 'radar' 
  | 'fire_station' 
  | 'billeting' 
  | 'dining' 
  | 'supply_warehouse' 
  | 'c_uas' 
  | 'sam_battery' 
  | 'parking_shelter';

export type FacilityStatus = 'operational' | 'damaged' | 'destroyed';

export interface Facility {
  id: string;
  type: FacilityType;
  name: string;
  status: FacilityStatus;
  damagePercent: number; // 0-100
  hardened: boolean;
  repairTeamAssigned: boolean;
}

export type DamageState = 'operational' | 'degraded' | 'cratered' | 'destroyed';

export interface CraterOverlay {
  id: string;
  repairProgress: number; // 0-100
}

export interface Runway {
  id: string;
  designation: string;
  width_m: number;
  length_m: number;
  surface: 'concrete' | 'asphalt' | 'matting';
  status: DamageState;
  craters: CraterOverlay[];
  arrestingGear: boolean;
}

export interface Base {
  id: string;
  type: BaseType;
  name: string;
  icao: string;
  location: { lat: number; lon: number };
  aircraftCapacity: number;
  runways: Runway[];
  facilities: Facility[];
  // References to flat game state arrays
  assignedAircraftIds: string[];
  // Supply stockpiles
  fuelGallons: number;
  munitions: Record<MunitionType, number>;
}

export interface FOS extends Base {
  type: 'FOS';
  parentMobId: string;
}

export interface MOB extends Base {
  type: 'MOB';
  assignedFosIds: string[]; // up to 5
}
