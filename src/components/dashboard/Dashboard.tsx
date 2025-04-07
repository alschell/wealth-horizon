
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const Dashboard = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [dashboardSections, setDashboardSections] = useState({
    keyMetrics: true,
    performanceOverview: true,
    quickAccess: true,
    topAssets: true,
    recentNews: true,
    notifications: true,
    marketSnapshot: true,
    recentActivity: true,
  });

  const toggleSection = (section) => {
    setDashboardSections({
      ...dashboardSections,
      [section]: !dashboardSections[section],
    });
  };

  const handleCustomizeSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem("dashboardSections", JSON.stringify(dashboardSections));
    setIsCustomizing(false);
  };

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
            variant="outline" 
            size="sm"
            onClick={() => setIsCustomizing(true)}
            className="h-9 px-3 flex items-center gap-1"
          >
            <Sliders className="h-4 w-4 mr-1" />
            Customize
          </Button>
        </div>

        {/* Welcome header */}
        <WelcomeHeader />
        
        {/* Key metrics grid - at the top */}
        {dashboardSections.keyMetrics && <KeyMetricsGrid />}
        
        {/* Performance Overview with enhanced visuals */}
        {dashboardSections.performanceOverview && <PerformanceOverview />}
        
        {/* Quick Access section - moved below performance overview */}
        {dashboardSections.quickAccess && <QuickAccessGrid />}

        {/* Top Assets, Recent News, and Notifications in separate cards with same height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Assets card with fixed height */}
          {dashboardSections.topAssets && (
            <Card className="shadow-sm h-[350px] flex flex-col">
              <CardHeader className="pb-0">
                <TopAssets />
              </CardHeader>
            </Card>
          )}
          
          {/* Recent News card with fixed height */}
          {dashboardSections.recentNews && (
            <Card className="shadow-sm h-[350px] flex flex-col">
              <CardHeader className="pb-0">
                <RecentNewsList newsData={newsData} />
              </CardHeader>
            </Card>
          )}

          {/* Notifications container with fixed height */}
          {dashboardSections.notifications && <NotificationsFeed />}
        </div>

        {/* Key summary cards - Market Snapshot and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dashboardSections.marketSnapshot && (
            <div className="lg:col-span-2">
              {/* Market overview card - fixed height */}
              <Card className="shadow-sm h-[350px] flex flex-col">
                <MarketSnapshot />
              </Card>
            </div>
          )}
          
          {dashboardSections.recentActivity && (
            <div>
              {/* Recent activities card - fixed height */}
              <Card className="shadow-sm h-[350px] flex flex-col">
                <RecentActivity />
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Customization Dialog */}
      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Dashboard</DialogTitle>
            <DialogDescription>
              Select which sections to display on your dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-keyMetrics"
                  checked={dashboardSections.keyMetrics}
                  onCheckedChange={() => toggleSection('keyMetrics')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-keyMetrics"
                    className="text-sm font-medium leading-none"
                  >
                    Key Metrics
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Important financial metrics and indicators
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-performanceOverview"
                  checked={dashboardSections.performanceOverview}
                  onCheckedChange={() => toggleSection('performanceOverview')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-performanceOverview"
                    className="text-sm font-medium leading-none"
                  >
                    Performance Overview
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Charts and graphs showing your portfolio performance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-quickAccess"
                  checked={dashboardSections.quickAccess}
                  onCheckedChange={() => toggleSection('quickAccess')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-quickAccess"
                    className="text-sm font-medium leading-none"
                  >
                    Quick Access
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Shortcuts to frequently used features
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-topAssets"
                  checked={dashboardSections.topAssets}
                  onCheckedChange={() => toggleSection('topAssets')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-topAssets"
                    className="text-sm font-medium leading-none"
                  >
                    Top Assets
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Your highest value assets and their performance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-recentNews"
                  checked={dashboardSections.recentNews}
                  onCheckedChange={() => toggleSection('recentNews')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-recentNews"
                    className="text-sm font-medium leading-none"
                  >
                    Recent News
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Latest financial news and updates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-notifications"
                  checked={dashboardSections.notifications}
                  onCheckedChange={() => toggleSection('notifications')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-notifications"
                    className="text-sm font-medium leading-none"
                  >
                    Notifications
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Important alerts and notifications
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-marketSnapshot"
                  checked={dashboardSections.marketSnapshot}
                  onCheckedChange={() => toggleSection('marketSnapshot')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-marketSnapshot"
                    className="text-sm font-medium leading-none"
                  >
                    Market Snapshot
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Current market conditions and trends
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="section-recentActivity"
                  checked={dashboardSections.recentActivity}
                  onCheckedChange={() => toggleSection('recentActivity')}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="section-recentActivity"
                    className="text-sm font-medium leading-none"
                  >
                    Recent Activity
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Recent transactions and account activity
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizing(false)}>Cancel</Button>
            <Button onClick={handleCustomizeSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
