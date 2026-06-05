import type { AircraftType } from '../types/units';

export interface AircraftConfig {
  type: AircraftType;
  role: 'Air Superiority' | 'Multi-Role' | 'Deep Strike' | 'CAS' | 'Electronic Attack' | 'Strategic Strike' | 'ISR' | 'AWACS' | 'Tanker' | 'Airlift';
  rangeNm: number;
  maxPayloadLbs: number;
  stealthLevel: 'None' | 'Low' | 'High' | 'Very High';
}

export const AIRCRAFT_CATALOG: Record<AircraftType, AircraftConfig> = {
  'F-22A': { type: 'F-22A', role: 'Air Superiority', rangeNm: 1600, maxPayloadLbs: 2000, stealthLevel: 'High' },
  'F-35A': { type: 'F-35A', role: 'Multi-Role', rangeNm: 1200, maxPayloadLbs: 18000, stealthLevel: 'High' },
  'F-15E': { type: 'F-15E', role: 'Deep Strike', rangeNm: 2100, maxPayloadLbs: 23000, stealthLevel: 'None' },
  'F-15EX': { type: 'F-15EX', role: 'Multi-Role', rangeNm: 2100, maxPayloadLbs: 29500, stealthLevel: 'None' },
  'F-16C': { type: 'F-16C', role: 'Multi-Role', rangeNm: 1200, maxPayloadLbs: 17000, stealthLevel: 'None' },
  'A-10C': { type: 'A-10C', role: 'CAS', rangeNm: 800, maxPayloadLbs: 16000, stealthLevel: 'None' },
  'F/A-18E': { type: 'F/A-18E', role: 'Multi-Role', rangeNm: 1275, maxPayloadLbs: 17750, stealthLevel: 'Low' },
  'EA-18G': { type: 'EA-18G', role: 'Electronic Attack', rangeNm: 1275, maxPayloadLbs: 17750, stealthLevel: 'Low' },
  'B-2A': { type: 'B-2A', role: 'Strategic Strike', rangeNm: 6000, maxPayloadLbs: 40000, stealthLevel: 'Very High' },
  'B-1B': { type: 'B-1B', role: 'Deep Strike', rangeNm: 5100, maxPayloadLbs: 75000, stealthLevel: 'Low' },
  'B-52H': { type: 'B-52H', role: 'Strategic Strike', rangeNm: 7650, maxPayloadLbs: 70000, stealthLevel: 'None' },
  'RQ-4': { type: 'RQ-4', role: 'ISR', rangeNm: 12300, maxPayloadLbs: 3000, stealthLevel: 'None' },
  'MQ-9': { type: 'MQ-9', role: 'ISR', rangeNm: 1000, maxPayloadLbs: 3800, stealthLevel: 'None' },
  'U-2S': { type: 'U-2S', role: 'ISR', rangeNm: 6000, maxPayloadLbs: 0, stealthLevel: 'None' },
  'E-3': { type: 'E-3', role: 'AWACS', rangeNm: 4000, maxPayloadLbs: 0, stealthLevel: 'None' },
  'E-8': { type: 'E-8', role: 'ISR', rangeNm: 4000, maxPayloadLbs: 0, stealthLevel: 'None' },
  'RC-135': { type: 'RC-135', role: 'ISR', rangeNm: 3000, maxPayloadLbs: 0, stealthLevel: 'None' },
  'KC-135': { type: 'KC-135', role: 'Tanker', rangeNm: 1500, maxPayloadLbs: 200000, stealthLevel: 'None' },
  'KC-46': { type: 'KC-46', role: 'Tanker', rangeNm: 6500, maxPayloadLbs: 212000, stealthLevel: 'None' },
  'C-17': { type: 'C-17', role: 'Airlift', rangeNm: 2400, maxPayloadLbs: 170900, stealthLevel: 'None' },
  'C-130J': { type: 'C-130J', role: 'Airlift', rangeNm: 1800, maxPayloadLbs: 42000, stealthLevel: 'None' },
  'C-5M': { type: 'C-5M', role: 'Airlift', rangeNm: 4800, maxPayloadLbs: 281000, stealthLevel: 'None' },
};
