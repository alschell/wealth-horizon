
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface TradingLayoutProps {
  children: React.ReactNode;
}

const TradingLayout: React.FC<TradingLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <div className="p-6">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default TradingLayout;
