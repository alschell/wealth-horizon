
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MarketDataInterface from "@/components/market/MarketDataInterface";
import { LineChart } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const MarketData = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<LineChart className="h-6 w-6" />}
          title="Market Data & News"
          description="Stay updated with the latest market information"
        />
        <MarketDataInterface />
      </div>
    </DashboardLayout>
  );
};

export default MarketData;
