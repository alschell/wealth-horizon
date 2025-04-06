
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LegacyPlanningInterface from "@/components/legacy-planning/LegacyPlanningInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegacyPlanning = () => {
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
          icon={Scroll}
          title="Legacy Planning"
          description="Plan and manage wealth transfer, succession, and estate strategies"
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
        <LegacyPlanningInterface />
      </div>
    </DashboardLayout>
  );
};

export default LegacyPlanning;
