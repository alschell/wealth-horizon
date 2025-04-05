
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Layers } from "lucide-react";

const PortfolioScenarios = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <PageHeaderCard
          icon={Layers}
          title="Portfolio Scenarios"
          description="Run what-if analysis and stress tests on your portfolios"
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />

        {/* Main content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium mb-4">Scenario Analysis</h2>
          <p>Portfolio scenario analysis tools will be available here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioScenarios;
