
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientPortalInterface from "@/components/client-portal/ClientPortalInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClientPortal = () => {
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
          icon={Users}
          title="Access Client Portal"
          description="Manage client access to reports and financial information"
          iconColor="text-sky-600"
          iconBgColor="bg-sky-100"
        />
        <ClientPortalInterface />
      </div>
    </DashboardLayout>
  );
};

export default ClientPortal;
