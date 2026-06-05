import { hexGrid } from '@turf/turf';
import type { GameState } from '../types/game';
import type { ScenarioConfig } from '../config/scenarios/pacific-storm';
import type { Base, MOB, FOS } from '../types/bases';
import type { Aircraft } from '../types/units';
import type { MunitionType } from '../types/supplies';
import type { FeatureCollection, Polygon } from 'geojson';

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

  // 2. Generate Territorial Hex Grid
  const bbox = [100, 0, 150, 50] as [number, number, number, number]; // minLon, minLat, maxLon, maxLat
  const cellSide = 100; // 100km radius
  const rawGrid = hexGrid(bbox, cellSide, { units: 'kilometers' });

  const territory: FeatureCollection<Polygon, { owner: 'BLUE' | 'RED' | 'NEUTRAL' }> = {
    type: 'FeatureCollection',
    features: rawGrid.features.map(f => {
      // Rough center approximation from the first vertex
      const lon = f.geometry.coordinates[0][0][0];
      const lat = f.geometry.coordinates[0][0][1];
      
      let owner: 'BLUE' | 'RED' | 'NEUTRAL' = 'NEUTRAL';
      
      // Rough geopolitical bounding boxes
      if (lon < 123 && lat > 20) {
        owner = 'RED'; // Mainland China / NK
      } else if (lon >= 123 && lon < 145 && lat > 20) {
        owner = 'BLUE'; // Japan / Taiwan / East China Sea
      } else if (lon > 135 && lat <= 20) {
        owner = 'BLUE'; // Guam area
      }
      
      return {
        ...f,
        properties: { owner }
      } as any;
    })
  };

  // Return the complete initial state
  return {
    phase: 'PLANNING',
    time: {
      zuluTime: scenario.initialTime,
      tickRate: 0, // Paused initially
      cycleNumber: 1,
    },
    territory,
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
