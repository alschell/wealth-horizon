
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { RenderStatusIndicator } from './StatusUtils';

interface ComplianceFilingsProps {
  upcomingFilings: Array<{
    id: number;
    name: string;
    deadline: string;
    status: string;
    priority: string;
  }>;
}

export const ComplianceFilings: React.FC<ComplianceFilingsProps> = ({ upcomingFilings }) => {
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
          <div className="text-center py-12">
            <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-muted-foreground">No upcoming filings due in the next 90 days.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
