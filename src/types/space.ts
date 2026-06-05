export type SatelliteType = 
  | 'GPS_III'
  | 'SBIRS_GEO'
  | 'SBIRS_HEO'
  | 'WGS'
  | 'AEHF'
  | 'IMAGERY'
  | 'WEATHER'
  | 'SSA_SENSOR'; // Ground-based

export type SatelliteStatus = 'NOMINAL' | 'DEGRADED' | 'OFFLINE' | 'DESTROYED';

export interface Satellite {
  id: string;
  type: SatelliteType;
  name: string;
  status: SatelliteStatus;
  // Position simplified for gameplay (e.g., longitude slot for GEO)
  orbitalSlot?: string; 
}

export type GPSAccuracy = 'HIGH' | 'DEGRADED' | 'DENIED';

export interface SBIRSStatus {
  onlineSensors: number;
  totalSensors: number;
  warningTimeSeconds: number;
}

export interface SATCOMAllocation {
  room: string;
  allocatedMbps: number;
  demandedMbps: number;
}

export type OrbitalThreatType = 'ASAT_MISSILE' | 'CO_ORBITAL_KILLER' | 'DEBRIS' | 'JAMMER';

export interface OrbitalThreat {
  id: string;
  type: OrbitalThreatType;
  targetSatelliteId?: string;
  timeToImpactSeconds?: number;
}

export interface SpaceTaskingOrder {
  cycle: number;
  maneuvers: { satelliteId: string; newSlot: string }[];
  satcomAllocations: SATCOMAllocation[];
  offensiveOps: { targetEnemySatId: string; type: 'JAM' | 'SPOOF' }[];
}
