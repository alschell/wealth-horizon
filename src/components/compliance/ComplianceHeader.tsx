
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeaderCard from '@/components/dashboard/PageHeaderCard';
import { ComplianceHeaderProps } from './types';

export const ComplianceHeader: React.FC<ComplianceHeaderProps> = ({ 
  loading = false,
  title = "Monitor Compliance",
  description = "Track regulatory activities and manage compliance tasks" 
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild className="mb-2">
          <Link to="/dashboard" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      {loading ? (
        <div className="w-full p-6 rounded-lg border bg-card animate-pulse mb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-72 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <PageHeaderCard
          icon={Shield}
          title={title}
          description={description}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
      )}
    </>
  );
};
