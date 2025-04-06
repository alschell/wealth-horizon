
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import QuickAccessGrid from "@/components/dashboard/QuickAccessGrid";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import KeyMetricsGrid from "@/components/dashboard/performance/KeyMetricsGrid";
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
        
        {/* Key metrics grid - at the top */}
        <KeyMetricsGrid />
        
        {/* Performance Overview with enhanced visuals */}
        <PerformanceOverview />
        
        {/* Quick Access section - moved below performance overview */}
        <QuickAccessGrid />

        {/* Key summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Market overview card */}
            <MarketSnapshot />
          </div>
          
          <div className="space-y-6">
            <NotificationsFeed />
            
            {/* Recent activities card */}
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
