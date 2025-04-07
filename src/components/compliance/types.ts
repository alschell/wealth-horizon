
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: string;
}

export interface FilingItem {
  id: number;
  name: string;
  deadline: string;
  status: string;
  priority: string;
}

export interface RegulatoryChange {
  id: number;
  title: string;
  date: string;
  impact: string;
  description: string;
}

export type ComplianceTab = 'overview' | 'filings' | 'changes' | 'calendar';
