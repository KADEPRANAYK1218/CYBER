export type LoginRole = 'government-id' | 'investigator';

export type GovernmentIdType = 
  | 'NIC'
  | 'POLICE'
  | 'IB'
  | 'CBI'
  | 'NIA'
  | 'MHA'
  | 'STATE_CID';

export interface CaseFile {
  id: string;
  code: 'FIR' | 'CDR' | 'FINANCIAL' | 'SURVEILLANCE' | 'INTELLIGENCE';
  title: string;
  count: string;
  status: string;
  classification: string;
}

export interface UserSession {
  role: LoginRole;
  identifier: string;
  name: string;
  department: string;
  clearanceLevel: string;
  station: string;
  token: string;
  timestamp: string;
}

export interface DashboardCase {
  id: string;
  type: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'Investigating' | 'Analysis' | 'Pending' | 'Review';
}

export interface NetworkCommunity {
  id: string;
  name: string;
  membersCount: string;
  strength: 'High' | 'Medium' | 'Low';
  keyNode: string;
  color: string;
}

export interface KeyPlayer {
  rank: number;
  name: string;
  connections: number;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AlertItem {
  id: string;
  title: string;
  caseId: string;
  timeAgo?: string;
  time?: string;
  severity: 'high' | 'warning' | 'medium';
}

export interface AIInsightItem {
  id?: string;
  title: string;
  description?: string;
  type?: string;
  details?: string;
  recommendation?: string;
  confidence?: string;
  syndicate?: string;
}
