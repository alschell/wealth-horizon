
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TaxOptimizationDashboard from "@/components/tax/TaxOptimizationDashboard";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaxOptimization = () => {
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
          icon={Calculator}
          title="Tax Optimization"
          description="Tools and insights for efficient tax planning and reporting"
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />
        <TaxOptimizationDashboard />
      </div>
    </DashboardLayout>
  );
};

export default TaxOptimization;
