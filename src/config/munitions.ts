import type { MunitionType } from '../types/supplies';

export interface MunitionConfig {
  type: MunitionType;
  category: 'A2A' | 'A2G PGM' | 'A2G Unguided' | 'Stand-off' | 'Anti-Radiation' | 'Cluster';
  guidance: 'Active Radar' | 'IR' | 'GPS/INS' | 'GPS/INS + IR' | 'Radar-homing' | 'None';
  weightLbs: number;
}

export const MUNITIONS_CATALOG: Record<MunitionType, MunitionConfig> = {
  'AIM-120D': { type: 'AIM-120D', category: 'A2A', guidance: 'Active Radar', weightLbs: 335 },
  'AIM-9X': { type: 'AIM-9X', category: 'A2A', guidance: 'IR', weightLbs: 188 },
  'GBU-31': { type: 'GBU-31', category: 'A2G PGM', guidance: 'GPS/INS', weightLbs: 2000 },
  'GBU-38': { type: 'GBU-38', category: 'A2G PGM', guidance: 'GPS/INS', weightLbs: 500 },
  'GBU-39': { type: 'GBU-39', category: 'A2G PGM', guidance: 'GPS/INS', weightLbs: 250 },
  'AGM-158': { type: 'AGM-158', category: 'Stand-off', guidance: 'GPS/INS + IR', weightLbs: 2250 },
  'AGM-88': { type: 'AGM-88', category: 'Anti-Radiation', guidance: 'Radar-homing', weightLbs: 800 },
  'MK-82': { type: 'MK-82', category: 'A2G Unguided', guidance: 'None', weightLbs: 500 },
  'MK-84': { type: 'MK-84', category: 'A2G Unguided', guidance: 'None', weightLbs: 2000 },
  'CBU-105': { type: 'CBU-105', category: 'Cluster', guidance: 'GPS/INS + IR', weightLbs: 927 },
};
