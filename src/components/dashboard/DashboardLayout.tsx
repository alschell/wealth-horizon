
import React from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  paddingY?: string;
  paddingX?: string;
}

const DashboardLayout = ({ 
  children, 
  fullWidth = false,
  paddingY = "pt-6",
  paddingX = "p-4 md:p-6"
}: DashboardLayoutProps) => {
  const location = useLocation();
  
  // Scroll to top when location changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full bg-background pt-16"> {/* pt-16 for fixed header */}
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
              <div className="text-left"> {/* Add text-left to ensure all content is left-aligned */}
                {children}
              </div>
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
