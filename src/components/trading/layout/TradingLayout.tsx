
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface TradingLayoutProps {
  children: React.ReactNode;
}

const TradingLayout: React.FC<TradingLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default TradingLayout;
