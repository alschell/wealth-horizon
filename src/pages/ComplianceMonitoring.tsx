
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ComplianceMonitoringDashboard from "@/components/compliance/ComplianceMonitoringDashboard";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComplianceMonitoring = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={Shield}
          title="Compliance Monitoring"
          description="Track, manage, and report on regulatory compliance activities"
          iconColor="text-gray-600"
          iconBgColor="bg-gray-100"
        />
        <ComplianceMonitoringDashboard />
      </div>
    </DashboardLayout>
  );
};

export default ComplianceMonitoring;
