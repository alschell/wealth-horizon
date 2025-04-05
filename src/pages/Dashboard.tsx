
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthSummary from "@/components/dashboard/WealthSummary";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import QuickAccessGrid from "@/components/dashboard/QuickAccessGrid";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { LayoutDashboard } from "lucide-react";
import QuickActions from "@/components/dashboard/QuickActions";
import AIAssistant from "@/components/ai-assistant/AIAssistant";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

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

        {/* Performance Overview with enhanced visuals */}
        <PerformanceOverview />

        {/* Key summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">            
            {/* Modules card grid */}
            <QuickAccessGrid />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <AIAssistant minified={true} />
            </Card>
            
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
