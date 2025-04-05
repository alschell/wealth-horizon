
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthAnalysisInterface from "@/components/wealth-analysis/WealthAnalysisInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { TrendingUp } from "lucide-react";

const AnalyzeWealth = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={TrendingUp}
          title="Wealth Analysis"
          description="Analyze your wealth composition, performance trends, and risk exposures"
          iconColor="text-green-700"
          iconBgColor="bg-green-100"
        />
        <WealthAnalysisInterface />
      </div>
    </DashboardLayout>
  );
};

export default AnalyzeWealth;
