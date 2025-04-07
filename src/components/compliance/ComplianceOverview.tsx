
import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Bell, Clock, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentGrid } from '@/components/ui/design-system';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { getStatusColor, getPriorityLabel, getImpactType } from './StatusUtils';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { ComplianceOverviewProps } from './types';

export const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({
  upcomingFilings,
  regulatoryChanges,
  setActiveTab,
  isLoading = false
}) => {
  if (isLoading) {
    return <LoadingState message="Loading compliance overview..." fullPage />;
  }
  
  return (
    <div className="space-y-6">
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
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{change.title}</p>
                      <StatusIndicator 
                        type={getImpactType(change.impact)} 
                        size="sm" 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{change.description}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
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
              <p className="text-xs text-muted-foreground mt-2">Last verified: April 7, 2025</p>
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
          <EmptyState
            icon={ClipboardCheck}
            title="All Clear"
            description="There are no pending compliance tasks requiring immediate attention."
            action={{
              label: "Create Task",
              onClick: () => console.log("Create task clicked")
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
