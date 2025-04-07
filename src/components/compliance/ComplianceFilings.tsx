
import React from 'react';
import { Clock, FileText } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RenderStatusIndicator } from './StatusUtils';
import { EmptyState } from './EmptyState';

interface FilingItem {
  id: number;
  name: string;
  deadline: string;
  status: string;
  priority: string;
}

interface ComplianceFilingsProps {
  upcomingFilings: FilingItem[];
  isLoading?: boolean;
}

export const ComplianceFilings: React.FC<ComplianceFilingsProps> = ({ 
  upcomingFilings,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Filings</CardTitle>
          <CardDescription>Regulatory filings due in the next 90 days</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <FileText className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-muted-foreground">Loading filings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
                  <RenderStatusIndicator status={filing.status} priority={filing.priority} />
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No Upcoming Filings"
            description="No upcoming filings due in the next 90 days."
          />
        )}
      </CardContent>
    </Card>
  );
};
