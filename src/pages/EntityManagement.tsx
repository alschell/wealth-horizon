
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EntityManagementDashboard from "@/components/entity-management/EntityManagementDashboard";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EntityManagement = () => {
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
          icon={Building2}
          title="Multi-Entity Management"
          description="Manage and monitor your complex legal entity structure"
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <EntityManagementDashboard />
      </div>
    </DashboardLayout>
  );
};

export default EntityManagement;
