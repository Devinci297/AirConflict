export type MessageChannel = 
  | 'COMMAND_NET' 
  | 'ATO_NET' 
  | 'LOGISTICS_NET' 
  | 'MED_NET' 
  | 'CE_NET' 
  | 'INTEL_NET' 
  | 'SPACE_NET' 
  | 'GUARD';

export interface GameMessage {
  id: string;
  timestamp: string; // Zulu time string
  senderId: string;
  senderRole: string;
  channel: MessageChannel;
  content: string;
  isRead: boolean;
}

export interface StructuredMessage extends GameMessage {
  messageType: 'RESUPPLY_REQUEST' | 'DAMAGE_REPORT' | 'CSAR_ALERT' | 'ATO_DRAFT' | 'SATCOM_REQUEST';
  payload: any; // Type-specific payload
}

export interface ResupplyRequest {
  mobId: string;
  resourceType: string;
  quantityRequested: number;
  priority: 'ROUTINE' | 'PRIORITY' | 'URGENT';
}

export interface DamageReport {
  baseId: string;
  facilityId: string;
  damagePercent: number;
  estimatedRepairTimeHours: number;
}
