export type RoomType = 
  | 'CAOC' 
  | 'MOB' 
  | 'LOGISTICS' 
  | 'MEDCOM' 
  | 'CE' 
  | 'ISR' 
  | 'CSPOC';

export type PlayerRole = 
  | 'AIR_BOSS' 
  | 'WING_COMMANDER' 
  | 'LOGISTICS_CHIEF' 
  | 'SURGEON_GENERAL' 
  | 'BASE_COMMANDER' 
  | 'ISR_COMMANDER' 
  | 'SPACE_COMMANDER';

export interface RoomAssignment {
  playerId: string;
  roomType: RoomType;
  role: PlayerRole;
  isAIControlled: boolean;
}
