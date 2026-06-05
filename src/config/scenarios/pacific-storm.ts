import type { Theater } from '../../types/maps';
import type { AircraftType } from '../../types/units';

export interface ScenarioConfig {
  id: string;
  name: string;
  theater: Theater;
  totalCycles: number;
  description: string;
  initialTime: string; // Zulu time string
  
  friendlyBases: Array<{
    id: string;
    type: 'MOB' | 'FOS';
    name: string;
    icao: string;
    lat: number;
    lon: number;
    fuelGallons: number;
    munitions: Record<string, number>;
    startingAircraft: Array<{ type: AircraftType; count: number }>;
  }>;
  
  // Minimal config for factory to spawn OPFOR and satellites...
}

export const PACIFIC_STORM: ScenarioConfig = {
  id: 'pacific_storm',
  name: 'Pacific Storm',
  theater: 'PACIFIC',
  totalCycles: 7,
  description: 'Major theater conflict in the South China Sea / Taiwan Strait.',
  initialTime: '2026-08-15T04:00:00Z',
  
  friendlyBases: [
    {
      id: 'kadena',
      type: 'MOB',
      name: 'Kadena AB',
      icao: 'RODN',
      lat: 26.3556,
      lon: 127.7675,
      fuelGallons: 5000000,
      munitions: {
        'AIM-120D': 800,
        'AIM-9X': 400,
        'GBU-31': 200,
        'GBU-38': 600,
        'GBU-39': 1000,
      },
      startingAircraft: [
        { type: 'F-15EX', count: 24 },
        { type: 'F-35A', count: 24 },
        { type: 'F-22A', count: 12 },
        { type: 'KC-135', count: 8 },
        { type: 'E-3', count: 4 },
      ],
    }
    // In a full implementation, you'd add Andersen AFB, Misawa, and FOSs here.
  ],
};
