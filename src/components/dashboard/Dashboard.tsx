
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/common/Grid";
import MarketSnapshot from "@/components/dashboard/market-snapshot/MarketSnapshot";
import NotificationsFeed from "./NotificationsFeed";
import RecentActivity from "./RecentActivity";
import PersonalizedSettings from "./PersonalizedSettings";
import DashboardHeader from "./DashboardHeader";

/**
 * Main dashboard component displaying user's financial overview
 */
const Dashboard = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the navigation
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initialize scroll state
    handleScroll();

    // Apply shadow class based on scroll state
    const header = document.getElementById('dashboard-header');
    if (header) {
      if (scrolled) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    }

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleCustomizeClick = () => {
    // Placeholder for customize dashboard functionality
    console.log("Customize dashboard clicked");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader onCustomizeClick={handleCustomizeClick} />
        <PersonalizedSettings />
      </div>
      
      <Grid>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm h-60">
            {/* Net Worth Chart */}
          </Card>
          <Card className="shadow-sm h-60">
            {/* Performance Chart */}
          </Card>
        </div>
        
        <MarketSnapshot />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NotificationsFeed />
          <RecentActivity />
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
