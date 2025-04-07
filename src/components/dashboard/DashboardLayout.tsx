
import React from "react";
import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import PageTransition from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";
import { useDashboardCustomize } from "@/components/dashboard/customize";

interface DashboardLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  paddingY?: string;
  paddingX?: string;
}

const DashboardLayout = ({ 
  children, 
  fullWidth = false,
  paddingY = "pt-12",
  paddingX = "p-4 md:p-6"
}: DashboardLayoutProps) => {
  const location = useLocation();
  const { setIsCustomizing } = useDashboardCustomize();
  
  // Scroll to top when location changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <DashboardHeader onCustomizeClick={() => setIsCustomizing(true)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div 
            className={cn(
              fullWidth ? "w-full" : "max-w-7xl mx-auto w-full",
              paddingX,
              paddingY
            )}
          >
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
