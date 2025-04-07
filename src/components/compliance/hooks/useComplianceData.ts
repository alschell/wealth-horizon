
import { useState, useEffect } from 'react';
import { FilingItem, RegulatoryChange, CalendarEvent, ComplianceTab } from '../types';

interface UseComplianceDataProps {
  initialTab?: ComplianceTab;
}

export const useComplianceData = ({ initialTab = 'overview' }: UseComplianceDataProps = {}) => {
  const [activeTab, setActiveTab] = useState<ComplianceTab>(initialTab);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [upcomingFilings, setUpcomingFilings] = useState<FilingItem[]>([]);
  const [regulatoryChanges, setRegulatoryChanges] = useState<RegulatoryChange[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchComplianceData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real application, this would be an API call
        // For now, we'll simulate with mock data
        
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const filingsData: FilingItem[] = [
          { 
            id: 1, 
            name: "Quarterly Tax Filing", 
            deadline: "May 15, 2025", 
            status: "pending", 
            priority: "high" 
          },
          { 
            id: 2, 
            name: "Annual Regulatory Report", 
            deadline: "June 30, 2025", 
            status: "in_progress", 
            priority: "medium" 
          },
          { 
            id: 3, 
            name: "ESG Disclosure", 
            deadline: "July 15, 2025", 
            status: "not_started", 
            priority: "low" 
          }
        ];
        
        const changesData: RegulatoryChange[] = [
          {
            id: 1,
            title: "Updated ESG Reporting Requirements",
            date: "June 1, 2025",
            impact: "medium",
            description: "New environmental reporting standards affecting all public companies with more than $500M in annual revenue."
          },
          {
            id: 2,
            title: "Cross-border Payment Regulation Changes",
            date: "July 15, 2025",
            impact: "high",
            description: "Significant changes to international payment processing requirements affecting all financial institutions."
          }
        ];
        
        const eventsData: CalendarEvent[] = [
          {
            id: 1,
            title: "Quarterly Compliance Review",
            date: "May 12, 2025",
            type: "meeting"
          },
          {
            id: 2,
            title: "Tax Filing Deadline",
            date: "May 15, 2025",
            type: "deadline"
          },
          {
            id: 3,
            title: "Regulatory Update Webinar",
            date: "May 20, 2025",
            type: "training"
          }
        ];
        
        setUpcomingFilings(filingsData);
        setRegulatoryChanges(changesData);
        setCalendarEvents(eventsData);
      } catch (err) {
        console.error('Error fetching compliance data:', err);
        setError('Failed to load compliance data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComplianceData();
  }, []);
  
  return {
    activeTab,
    setActiveTab,
    isLoading,
    error,
    upcomingFilings,
    regulatoryChanges,
    calendarEvents
  };
};
