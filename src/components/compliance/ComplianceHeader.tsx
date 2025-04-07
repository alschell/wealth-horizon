
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeaderCard from '@/components/dashboard/PageHeaderCard';

export const ComplianceHeader: React.FC = () => {
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
      
      <PageHeaderCard
        icon={Shield}
        title="Monitor Compliance"
        description="Track regulatory activities"
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
    </>
  );
};
