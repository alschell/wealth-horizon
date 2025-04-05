
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsInterface from "@/components/settings/SettingsInterface";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SettingsInterface />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
