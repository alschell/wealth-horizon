
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthSummary from "@/components/dashboard/WealthSummary";
import CreditFacilities from "@/components/dashboard/CreditFacilities";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import MarketData from "@/components/dashboard/MarketData";
import { LayoutDashboard } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<LayoutDashboard className="h-6 w-6" />}
          title="Dashboard"
          description="Your financial overview"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
