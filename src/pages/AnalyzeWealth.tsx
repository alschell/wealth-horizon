
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthAnalysisInterface from "@/components/wealth-analysis/WealthAnalysisInterface";

const AnalyzeWealth = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WealthAnalysisInterface />
      </div>
    </DashboardLayout>
  );
};

export default AnalyzeWealth;
