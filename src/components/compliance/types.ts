
import { ReactNode } from 'react';
import { ComplianceStatus, PriorityLevel } from './StatusUtils';

export type ComplianceTab = 'overview' | 'filings' | 'changes' | 'calendar';

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
  impact: string;
  description: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: string;
}

export interface ComplianceHeaderProps {
  isLoading?: boolean;
  title?: string;
  description?: string;
}

export interface ComplianceOverviewProps {
  upcomingFilings: FilingItem[];
  regulatoryChanges: RegulatoryChange[];
  setActiveTab: (tab: ComplianceTab) => void;
  isLoading?: boolean;
}

export interface ComplianceFilingsProps {
  upcomingFilings: FilingItem[];
  isLoading?: boolean;
}

export interface ComplianceChangesProps {
  regulatoryChanges: RegulatoryChange[];
  isLoading?: boolean;
}

export interface ComplianceCalendarProps {
  calendarEvents: CalendarEvent[];
  isLoading?: boolean;
}
