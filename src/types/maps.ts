export type Theater = 'PACIFIC' | 'KOREA' | 'EUROPE' | 'MIDDLE_EAST';

export interface MapCoordinate {
  lat: number;
  lon: number;
}

export interface TheaterConfig {
  id: Theater;
  name: string;
  boundingBox: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
  center: MapCoordinate;
  description: string;
}

export interface MapRegion {
  id: string;
  name: string;
  polygon: MapCoordinate[];
  owner: 'FRIENDLY' | 'OPFOR' | 'CONTESTED' | 'NEUTRAL';
}

export type AirspaceZoneType = 'TRANSIT_CORRIDOR' | 'RESTRICTED' | 'ROZ' | 'KILL_BOX';

export interface AirspaceZone {
  id: string;
  type: AirspaceZoneType;
  name: string;
  polygon: MapCoordinate[];
  minAltitudeFt: number;
  maxAltitudeFt: number;
  active: boolean;
}

export interface KillBox extends AirspaceZone {
  type: 'KILL_BOX';
  status: 'OPEN' | 'CLOSED';
}
