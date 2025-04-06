
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import PageTransition from "@/components/ui/page-transition";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <DashboardHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full p-4 md:p-6 pt-12">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
