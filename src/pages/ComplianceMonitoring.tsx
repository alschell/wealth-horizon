
import React, { useState } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Layout from "@/components/Layout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Shield, Calendar, FileText, AlertTriangle, CheckCircle, Bell, Clock, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusIndicator } from '@/components/ui/status-indicator';
import { ContentGrid } from '@/components/ui/design-system';
import { Button } from '@/components/ui/button';

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
  { id: 2, name: "Annual Regulatory Report", date: "May 30, 2025", type: "report" },
  { id: 3, name: "ESG Compliance Report", date: "June 12, 2025", type: "report" },
  { id: 4, name: "Regulatory Webinar", date: "March 25, 2025", type: "event" },
  { id: 5, name: "Compliance Committee Meeting", date: "April 2, 2025", type: "meeting" }
];

const ComplianceMonitoring = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "neutral";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Normal Priority";
    }
  };

  return (
    <DashboardLayout>
      <Layout>
        <div className="space-y-6">
          <PageHeaderCard
            icon={Shield}
            title="Monitor Compliance"
            description="Track regulatory activities"
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="filings">Filings</TabsTrigger>
              <TabsTrigger value="changes">Changes</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ContentGrid columns="3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      Upcoming Filings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingFilings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingFilings.slice(0, 2).map(filing => (
                          <div key={filing.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{filing.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{filing.deadline}</span>
                              </div>
                            </div>
                            <StatusIndicator 
                              type={getStatusColor(filing.status)} 
                              size="sm" 
                              label={getPriorityLabel(filing.priority)} 
                            />
                          </div>
                        ))}
                        {upcomingFilings.length > 2 && (
                          <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab("filings")}>
                            View all filings
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No upcoming filings due in the next 30 days.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      Regulatory Changes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {regulatoryChanges.length > 0 ? (
                      <div className="space-y-4">
                        {regulatoryChanges.slice(0, 1).map(change => (
                          <div key={change.id}>
                            <p className="font-medium">{change.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{change.description}</p>
                            <div className="flex items-center mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{change.date}</span>
                            </div>
                          </div>
                        ))}
                        {regulatoryChanges.length > 1 && (
                          <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab("changes")}>
                            View all changes
                          </Button>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No new regulatory changes affecting your portfolios.</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Compliance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <StatusIndicator type="success" size="md" />
                        <p>All compliance requirements are up to date.</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="h-2 bg-gray-200 rounded-full w-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Last verified: April 5, 2025</p>
                    </div>
                  </CardContent>
                </Card>
              </ContentGrid>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-purple-500" />
                    Action Items
                  </CardTitle>
                  <CardDescription>Tasks requiring your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <ClipboardCheck className="h-12 w-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-medium">All Clear</h3>
                      <p className="text-muted-foreground text-sm max-w-md">
                        There are no pending compliance tasks requiring immediate attention.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="filings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Filings</CardTitle>
                  <CardDescription>Regulatory filings due in the next 90 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingFilings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingFilings.map(filing => (
                        <div key={filing.id} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                          <div>
                            <p className="font-medium">{filing.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>Due: {filing.deadline}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusIndicator 
                              type={getStatusColor(filing.status)} 
                              size="sm" 
                              label={getPriorityLabel(filing.priority)} 
                            />
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-muted-foreground">No upcoming filings due in the next 90 days.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="changes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Changes</CardTitle>
                  <CardDescription>Recent regulatory changes that may affect your portfolios</CardDescription>
                </CardHeader>
                <CardContent>
                  {regulatoryChanges.length > 0 ? (
                    <div className="space-y-6">
                      {regulatoryChanges.map(change => (
                        <div key={change.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">{change.title}</h3>
                            <StatusIndicator 
                              type={change.impact === 'high' ? 'error' : change.impact === 'medium' ? 'warning' : 'info'} 
                              size="sm" 
                              label={`${change.impact.charAt(0).toUpperCase() + change.impact.slice(1)} Impact`} 
                            />
                          </div>
                          <p className="text-muted-foreground mb-2">{change.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Effective: {change.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-muted-foreground">No recent regulatory changes to display.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Calendar</CardTitle>
                  <CardDescription>Upcoming compliance deadlines and events</CardDescription>
                </CardHeader>
                <CardContent>
                  {calendarEvents.length > 0 ? (
                    <div className="space-y-4">
                      {calendarEvents.map(event => (
                        <div key={event.id} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                          <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-md flex flex-col items-center justify-center mr-4">
                            <span className="text-sm font-medium">{event.date.split(' ')[0]}</span>
                            <span className="text-xs text-muted-foreground">{event.date.split(' ')[1].replace(',', '')}</span>
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center">
                              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Details</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-muted-foreground">No upcoming compliance events scheduled.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </DashboardLayout>
  );
};

export default ComplianceMonitoring;
