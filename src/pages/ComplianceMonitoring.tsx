
import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ComplianceHeader,
  ComplianceOverview, 
  ComplianceFilings,
  ComplianceChanges,
  ComplianceCalendar
} from '@/components/compliance';

// Mock data for compliance filings
const upcomingFilings = [
  { id: 1, name: "Quarterly Tax Filing", deadline: "April 15, 2025", status: "pending", priority: "high" },
  { id: 2, name: "Annual Regulatory Report", deadline: "May 30, 2025", status: "pending", priority: "medium" },
  { id: 3, name: "ESG Compliance Report", deadline: "June 12, 2025", status: "pending", priority: "low" }
];

// Mock data for regulatory changes
const regulatoryChanges = [
  { id: 1, title: "New Reporting Requirements", date: "March 15, 2025", impact: "medium", description: "Changes to quarterly reporting structure for institutional investors." },
  { id: 2, title: "ESG Disclosure Updates", date: "February 28, 2025", impact: "high", description: "Additional climate-related risk disclosures required for portfolio companies." }
];

// Mock data for compliance calendar
const calendarEvents = [
  { id: 1, title: "Quarterly Tax Filing", date: "April 15, 2025", type: "filing" },
  { id: 2, title: "Annual Regulatory Report", date: "May 30, 2025", type: "report" },
  { id: 3, title: "ESG Compliance Report", date: "June 12, 2025", type: "report" },
  { id: 4, title: "Regulatory Webinar", date: "March 25, 2025", type: "event" },
  { id: 5, title: "Compliance Committee Meeting", date: "April 2, 2025", type: "meeting" }
];

const ComplianceMonitoring = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <Layout>
        <div className="space-y-6">
          <ComplianceHeader />
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="filings">Filings</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ComplianceOverview 
                upcomingFilings={upcomingFilings} 
                regulatoryChanges={regulatoryChanges} 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>

            <TabsContent value="filings" className="space-y-4">
              <ComplianceFilings upcomingFilings={upcomingFilings} />
            </TabsContent>

            <TabsContent value="changes" className="space-y-4">
              <ComplianceChanges regulatoryChanges={regulatoryChanges} />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <ComplianceCalendar calendarEvents={calendarEvents} />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </DashboardLayout>
  );
};

export default ComplianceMonitoring;
