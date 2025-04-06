
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import PerformanceOverview from "@/components/performance/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard header */}
        <PageHeaderCard
          icon={LayoutDashboard}
          title="Dashboard"
          description="View your wealth overview, market data, and quick access to key features"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />

        {/* Welcome header */}
        <WelcomeHeader />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main dashboard content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview with enhanced visuals */}
            <PerformanceOverview />
          </div>
          
          <div className="space-y-6">
            <NotificationsFeed />
            
            {/* Market overview card */}
            <MarketSnapshot />

            {/* Recent activities card */}
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
