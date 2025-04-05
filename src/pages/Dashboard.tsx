
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthSummary from "@/components/dashboard/WealthSummary";
import CreditFacilities from "@/components/dashboard/CreditFacilities";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import MarketData from "@/components/dashboard/MarketData";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        <div className="lg:col-span-2 space-y-6">
          <WealthSummary />
          <CreditFacilities />
          <QuickActions />
        </div>
        <div className="space-y-6">
          <NotificationsFeed />
          <MarketData />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
