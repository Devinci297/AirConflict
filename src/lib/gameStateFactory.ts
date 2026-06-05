import type { GameState } from '../types/game';
import type { ScenarioConfig } from '../config/scenarios/pacific-storm';
import type { Base, MOB, FOS } from '../types/bases';
import type { Aircraft } from '../types/units';
import type { MunitionType } from '../types/supplies';

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createGameState(scenario: ScenarioConfig): GameState {
  const bases: Record<string, Base> = {};
  const aircraft: Record<string, Aircraft> = {};
  
  // 1. Populate Bases & Aircraft from Scenario Config
  scenario.friendlyBases.forEach(baseConfig => {
    const baseAircraftIds: string[] = [];
    
    // Spawn aircraft for this base
    baseConfig.startingAircraft.forEach(acGroup => {
      for (let i = 0; i < acGroup.count; i++) {
        const id = generateId(`AC_${acGroup.type}`);
        baseAircraftIds.push(id);
        
        aircraft[id] = {
          id,
          baseId: baseConfig.id,
          type: acGroup.type,
          status: 'MC',
          fuelPercent: 100,
          loadout: {
            'AIM-120D': 0,
            'AIM-9X': 0,
            'GBU-31': 0,
            'GBU-38': 0,
            'GBU-39': 0,
            'AGM-158': 0,
            'AGM-88': 0,
            'MK-82': 0,
            'MK-84': 0,
            'CBU-105': 0,
          }
        };
      }
    });
    
    // Create the base record
    const baseRecord: Base = {
      id: baseConfig.id,
      type: baseConfig.type,
      name: baseConfig.name,
      icao: baseConfig.icao,
      location: { lat: baseConfig.lat, lon: baseConfig.lon },
      aircraftCapacity: 72, // Default max, could be config driven
      runways: [], // Simplified for now
      facilities: [],
      assignedAircraftIds: baseAircraftIds,
      fuelGallons: baseConfig.fuelGallons,
      munitions: baseConfig.munitions as Record<MunitionType, number>,
    };
    
    // Type specific additions
    if (baseConfig.type === 'MOB') {
      (baseRecord as MOB).assignedFosIds = [];
    } else {
      (baseRecord as FOS).parentMobId = 'kadena'; // placeholder
    }
    
    bases[baseRecord.id] = baseRecord;
  });

  // Return the complete initial state
  return {
    phase: 'PLANNING',
    time: {
      zuluTime: scenario.initialTime,
      tickRate: 0, // Paused initially
      cycleNumber: 1,
    },
    players: {},
    bases,
    aircraft,
    satellites: {},
    messages: [],
    opfor: {
      aiState: 'DEFENSIVE',
      aircraft: {},
      samSites: {},
    },
    currentAto: {
      cycleNumber: 1,
      status: 'DRAFT',
      missionPackages: [],
    },
    atoHistory: [],
    metrics: {
      airSuperiorityIndex: 50,
      targetsDestroyedPercent: 0,
      forceStrengthPercent: 100,
    }
  };
}
