
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
            className="h-9 px-3 flex items-center gap-1"
          >
            <Sliders className="h-4 w-4 mr-1" />
            <span>Preferences</span>
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

        {/* Top Assets and Recent News in separate cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Assets card aligned with the same height as notifications */}
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader className="pb-0">
              <TopAssets />
            </CardHeader>
          </Card>
          
          {/* Recent News card */}
          <Card className="shadow-sm h-full flex flex-col">
            <CardHeader className="pb-0">
              <RecentNewsList newsData={newsData} />
            </CardHeader>
          </Card>

          {/* Notifications container */}
          <NotificationsFeed />
        </div>

        {/* Key summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Market overview card */}
            <MarketSnapshot />
            
            {/* Recent activities card - moved up to align with Market Snapshot */}
            <div className="lg:hidden">
              <RecentActivity />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Recent activities card - only visible on large screens */}
            <div className="hidden lg:block">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
