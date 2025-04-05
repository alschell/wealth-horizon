
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TradingDashboard from "@/components/trading/TradingDashboard";

const Trading = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <TradingDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Trading;
