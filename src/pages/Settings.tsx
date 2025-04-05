
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsInterface from "@/components/settings/SettingsInterface";
import { Settings as SettingsIcon } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<SettingsIcon className="h-6 w-6" />}
          title="Settings"
          description="Manage your account and application settings"
        />
        <SettingsInterface />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
