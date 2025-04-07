
import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { EmptyState } from './EmptyState';

interface RegulatoryChange {
  id: number;
  title: string;
  date: string;
  impact: string;
  description: string;
}

interface ComplianceChangesProps {
  regulatoryChanges: RegulatoryChange[];
  isLoading?: boolean;
}

export const ComplianceChanges: React.FC<ComplianceChangesProps> = ({ 
  regulatoryChanges,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Changes</CardTitle>
          <CardDescription>Recent regulatory changes that may affect your portfolios</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <AlertTriangle className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-muted-foreground">Loading regulatory changes...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getImpactType = (impact: string): "error" | "warning" | "info" => {
    switch (impact) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'info';
    }
  };

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
                    type={getImpactType(change.impact)} 
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
          <EmptyState
            icon={AlertTriangle}
            title="No Regulatory Changes"
            description="No recent regulatory changes to display."
          />
        )}
      </CardContent>
    </Card>
  );
};
