
import React from "react";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  // Reducing the horizontal padding by 66% (from px-8 to approximately px-3)
  // And increasing the max-width to utilize more space
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <DashboardHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="mx-auto py-6 px-3 max-w-[95%] w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
