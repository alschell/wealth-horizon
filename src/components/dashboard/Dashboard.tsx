
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import { QuickAccessGrid } from "@/components/dashboard/quick-access";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import KeyMetricsGrid from "@/components/dashboard/performance/KeyMetricsGrid";
import { LayoutDashboard, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { newsData } from "@/components/dashboard/performance/PerformanceData";
import TopAssets from "@/components/dashboard/performance/TopAssets";
import RecentNewsList from "@/components/dashboard/performance/RecentNewsList";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard header */}
        <div className="flex justify-between items-center">
          <PageHeaderCard
            icon={LayoutDashboard}
            title="Dashboard"
            description="Your complete financial overview at a glance"
            iconColor="text-gray-700"
            iconBgColor="bg-gray-100"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 flex items-center"
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>

        {/* Welcome header */}
        <WelcomeHeader />
        
        {/* Key metrics grid - at the top */}
        <KeyMetricsGrid />
        
        {/* Performance Overview with enhanced visuals */}
        <PerformanceOverview />
        
        {/* Quick Access section - moved below performance overview */}
        <QuickAccessGrid />

        {/* Top Assets, Recent News, and Notifications in separate cards with same height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Assets card with fixed height */}
          <Card className="shadow-sm h-[350px] flex flex-col">
            <CardHeader className="pb-0">
              <TopAssets />
            </CardHeader>
          </Card>
          
          {/* Recent News card with fixed height */}
          <Card className="shadow-sm h-[350px] flex flex-col">
            <CardHeader className="pb-0">
              <RecentNewsList newsData={newsData} />
            </CardHeader>
          </Card>

          {/* Notifications container with fixed height */}
          <NotificationsFeed />
        </div>

        {/* Key summary cards - Market Snapshot and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Market overview card - fixed height */}
            <Card className="shadow-sm h-[350px] flex flex-col">
              <MarketSnapshot />
            </Card>
          </div>
          
          <div>
            {/* Recent activities card - fixed height */}
            <Card className="shadow-sm h-[350px] flex flex-col">
              <RecentActivity />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
