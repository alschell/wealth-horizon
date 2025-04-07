
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'meeting' | 'deadline' | 'training' | 'regulatory' | string;
}

export interface FilingItem {
  id: number;
  name: string;
  deadline: string;
  status: ComplianceStatus;
  priority: PriorityLevel;
}

export interface RegulatoryChange {
  id: number;
  title: string;
  date: string;
  impact: 'low' | 'medium' | 'high' | string;
  description: string;
}

export type ComplianceTab = 'overview' | 'filings' | 'changes' | 'calendar';

// Status and priority types - moved from StatusUtils for centralization
export type ComplianceStatus = 'completed' | 'in_progress' | 'pending' | 'overdue' | 'not_started';
export type PriorityLevel = 'low' | 'medium' | 'high';

// Common props for compliance components
export interface ComplianceComponentProps {
  isLoading?: boolean;
}

// Specific component props
export interface ComplianceHeaderProps extends ComplianceComponentProps {
  title?: string;
  description?: string;
}

export interface ComplianceOverviewProps extends ComplianceComponentProps {
  upcomingFilings: FilingItem[];
  regulatoryChanges: RegulatoryChange[];
  setActiveTab: (tab: ComplianceTab) => void;
}

export interface ComplianceFilingsProps extends ComplianceComponentProps {
  upcomingFilings: FilingItem[];
}

export interface ComplianceChangesProps extends ComplianceComponentProps {
  regulatoryChanges: RegulatoryChange[];
}

export interface ComplianceCalendarProps extends ComplianceComponentProps {
  calendarEvents: CalendarEvent[];
}
