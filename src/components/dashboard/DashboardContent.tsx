
import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import { QuickAccessGrid } from "@/components/dashboard/quick-access";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import KeyMetricsGrid from "@/components/dashboard/performance/KeyMetricsGrid";
import TopAssets from "@/components/dashboard/performance/TopAssets";
import RecentNewsList from "@/components/dashboard/performance/RecentNewsList";
import { newsData } from "@/components/dashboard/performance/PerformanceData";

interface DashboardContentProps {
  orderedVisibleSections: string[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ orderedVisibleSections }) => {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <WelcomeHeader />
      
      {/* Render sections in the correct order */}
      {orderedVisibleSections.includes("keyMetrics") && <KeyMetricsGrid />}
      {orderedVisibleSections.includes("performanceOverview") && <PerformanceOverview />}
      {orderedVisibleSections.includes("quickAccess") && <QuickAccessGrid />}

      {/* Top Assets, Recent News, and Notifications in separate cards with same height */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Assets card */}
        {orderedVisibleSections.includes("topAssets") && (
          <TopAssets />
        )}
        
        {/* Recent News card */}
        {orderedVisibleSections.includes("recentNews") && (
          <RecentNewsList newsData={newsData} />
        )}

        {/* Notifications container */}
        {orderedVisibleSections.includes("notifications") && <NotificationsFeed />}
      </div>

      {/* Key summary cards - Market Snapshot and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {orderedVisibleSections.includes("marketSnapshot") && (
          <div className="lg:col-span-2">
            <MarketSnapshot />
          </div>
        )}
        
        {orderedVisibleSections.includes("recentActivity") && (
          <div>
            <RecentActivity />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
