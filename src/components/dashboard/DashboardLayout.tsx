
import React from "react";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <DashboardHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto w-full p-4 pt-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
