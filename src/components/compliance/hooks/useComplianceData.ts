
import { useState, useEffect } from 'react';

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

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: string;
}

interface ComplianceData {
  filings: FilingItem[];
  changes: RegulatoryChange[];
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useComplianceData = (initialFetch = true): ComplianceData => {
  const [filings, setFilings] = useState<FilingItem[]>([]);
  const [changes, setChanges] = useState<RegulatoryChange[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would typically be API calls. For now, we're using mock data
      // In a real application, these would be separate API endpoints
      
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration purposes
      const mockFilings: FilingItem[] = [
        {
          id: 1,
          name: "Quarterly Tax Filing",
          deadline: "April 15, 2025",
          status: "pending",
          priority: "high"
        },
        {
          id: 2,
          name: "Annual Regulatory Report",
          deadline: "May 30, 2025",
          status: "pending",
          priority: "medium"
        }
      ];
      
      const mockChanges: RegulatoryChange[] = [
        {
          id: 1,
          title: "New ESG Reporting Requirements",
          date: "June 1, 2025",
          impact: "medium",
          description: "Companies must include additional environmental impact metrics in quarterly reports."
        }
      ];
      
      const mockEvents: CalendarEvent[] = [
        {
          id: 1,
          title: "Quarterly Filing Deadline",
          date: "Apr 15, 2025",
          type: "deadline"
        },
        {
          id: 2,
          title: "Annual Report Due",
          date: "May 30, 2025",
          type: "deadline"
        },
        {
          id: 3,
          title: "New Regulations Effective",
          date: "Jun 1, 2025",
          type: "regulatory"
        }
      ];
      
      setFilings(mockFilings);
      setChanges(mockChanges);
      setEvents(mockEvents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      console.error('Error fetching compliance data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
  }, [initialFetch]);

  return {
    filings,
    changes,
    events,
    isLoading,
    error,
    refetch: fetchData
  };
};
