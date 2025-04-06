
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ESGDashboard from "@/components/esg/ESGDashboard";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const ESG = () => {
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
          icon={Leaf}
          title="Assess ESG Investments"
          description="Track environmental, social, and governance metrics for your portfolio"
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
        <ESGDashboard />
      </div>
    </DashboardLayout>
  );
};

export default ESG;
