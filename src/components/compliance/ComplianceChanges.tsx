
import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusIndicator } from '@/components/ui/status-indicator';

interface ComplianceChangesProps {
  regulatoryChanges: Array<{
    id: number;
    title: string;
    date: string;
    impact: string;
    description: string;
  }>;
}

export const ComplianceChanges: React.FC<ComplianceChangesProps> = ({ regulatoryChanges }) => {
  return (
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
  );
};
