
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MarketDataInterface from "@/components/market/MarketDataInterface";

const MarketData = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <MarketDataInterface />
      </div>
    </DashboardLayout>
  );
};

export default MarketData;
