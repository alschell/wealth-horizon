
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthAnalysisInterface from "@/components/wealth-analysis/WealthAnalysisInterface";
import { BarChart } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const AnalyzeWealth = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<BarChart className="h-6 w-6" />}
          title="Wealth Analysis"
          description="Analyze your wealth and investment performance"
        />
        <WealthAnalysisInterface />
      </div>
    </DashboardLayout>
  );
};

export default AnalyzeWealth;
