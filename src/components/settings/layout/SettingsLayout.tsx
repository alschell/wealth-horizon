
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <DashboardLayout>
      <div className="p-6">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default SettingsLayout;
