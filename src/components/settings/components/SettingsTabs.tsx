
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabProps {
  children: React.ReactNode;
  defaultValue: string;
}

const SettingsTabs = ({ children, defaultValue }: SettingsTabProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid grid-cols-4 max-w-md mb-6">
        <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
        <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
        <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
        <TabsTrigger value="appearance" className="text-sm">Appearance</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default SettingsTabs;
