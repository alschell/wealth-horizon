
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import QuickAccessGrid from "@/components/dashboard/quick-access";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import KeyMetricsGrid from "@/components/dashboard/performance/KeyMetricsGrid";
import { LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsData } from "@/components/dashboard/performance/PerformanceData";
import TopAssets from "@/components/dashboard/performance/TopAssets";
import RecentNewsList from "@/components/dashboard/performance/RecentNewsList";
import SectionHeader from "./SectionHeader";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard header */}
        <PageHeaderCard
          icon={LayoutDashboard}
          title="Dashboard"
          description="Your complete financial overview at a glance"
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

        {/* Top Assets and Recent News in separate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <SectionHeader title="Top Assets" />
            </CardHeader>
            <CardContent>
              <TopAssets />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <SectionHeader title="Recent News" />
            </CardHeader>
            <CardContent>
              <RecentNewsList newsData={newsData} />
            </CardContent>
          </Card>
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
            {/* Notifications container */}
            <NotificationsFeed />
            
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
