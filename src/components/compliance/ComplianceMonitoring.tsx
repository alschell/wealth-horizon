
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceHeader } from './ComplianceHeader';
import { ComplianceOverview } from './ComplianceOverview';
import { ComplianceFilings } from './ComplianceFilings';
import { ComplianceChanges } from './ComplianceChanges';
import { ComplianceCalendar } from './ComplianceCalendar';
import { LoadingState } from './LoadingState';
import { useComplianceData } from './hooks/useComplianceData';
import { ComplianceTab } from './types';

const ComplianceMonitoring: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    error,
    upcomingFilings,
    regulatoryChanges,
    calendarEvents
  } = useComplianceData();

  const handleTabChange = (value: string) => {
    setActiveTab(value as ComplianceTab);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ComplianceHeader />
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 mt-6">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ComplianceHeader loading={isLoading} />
      
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="filings">Filings</TabsTrigger>
          <TabsTrigger value="changes">Changes</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <ComplianceOverview 
            upcomingFilings={upcomingFilings} 
            regulatoryChanges={regulatoryChanges} 
            setActiveTab={setActiveTab}
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="filings" className="mt-6">
          <ComplianceFilings 
            upcomingFilings={upcomingFilings} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="changes" className="mt-6">
          <ComplianceChanges 
            regulatoryChanges={regulatoryChanges} 
            isLoading={isLoading} 
          />
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-6">
          <ComplianceCalendar 
            calendarEvents={calendarEvents} 
            isLoading={isLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceMonitoring;
