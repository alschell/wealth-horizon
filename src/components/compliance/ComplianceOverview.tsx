
import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Bell, Clock, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContentGrid } from '@/components/ui/design-system';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { getStatusColor, getPriorityLabel, ComplianceStatus, PriorityLevel } from './StatusUtils';
import { EmptyState } from './EmptyState';

interface FilingItem {
  id: number;
  name: string;
  deadline: string;
  status: ComplianceStatus;
  priority: PriorityLevel;
}

interface RegulatoryChange {
  id: number;
  title: string;
  date: string;
  impact: string;
  description: string;
}

interface ComplianceOverviewProps {
  upcomingFilings: FilingItem[];
  regulatoryChanges: RegulatoryChange[];
  setActiveTab: (tab: string) => void;
  isLoading?: boolean;
}

export const ComplianceOverview: React.FC<ComplianceOverviewProps> = ({
  upcomingFilings,
  regulatoryChanges,
  setActiveTab,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <ContentGrid columns="3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ContentGrid>
        
        <Card>
          <CardHeader>
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-60 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent className="min-h-[150px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-60 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
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
                    <p className="font-medium">{change.title}</p>
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
          <EmptyState
            icon={ClipboardCheck}
            title="All Clear"
            description="There are no pending compliance tasks requiring immediate attention."
          />
        </CardContent>
      </Card>
    </div>
  );
};
