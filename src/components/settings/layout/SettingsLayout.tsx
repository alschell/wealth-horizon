
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default SettingsLayout;
