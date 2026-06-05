export type MunitionType = 
  | 'AIM-120D'
  | 'AIM-9X'
  | 'GBU-31'
  | 'GBU-38'
  | 'GBU-39'
  | 'AGM-158'
  | 'AGM-88'
  | 'MK-82'
  | 'MK-84'
  | 'CBU-105';

export interface MunitionStock {
  type: MunitionType;
  quantity: number;
}

export interface FuelReserve {
  gallons: number;
  maxCapacityGallons: number;
}

export type ResourceType = 'munitions' | 'fuel' | 'spare_parts' | 'construction_materials' | 'medical_supplies';
