
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthAnalysisInterface from "@/components/wealth-analysis/WealthAnalysisInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyzeWealth = () => {
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
          icon={TrendingUp}
          title="Wealth Analysis"
          description="Analyze your wealth composition, performance trends, and risk exposures"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        <WealthAnalysisInterface />
      </div>
    </DashboardLayout>
  );
};

export default AnalyzeWealth;
