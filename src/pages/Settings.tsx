
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsInterface from "@/components/settings/SettingsInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={Settings}
          title="Settings"
          description="Configure your account preferences, notifications, and security options"
          iconColor="text-slate-700"
          iconBgColor="bg-slate-100"
        />
        <SettingsInterface />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
