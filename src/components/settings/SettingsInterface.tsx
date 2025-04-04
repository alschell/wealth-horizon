
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsHeader from "./components/SettingsHeader";
import ProfileSettings from "./sections/ProfileSettings";
import SecuritySettings from "./sections/SecuritySettings";
import NotificationSettings from "./sections/NotificationSettings";
import AppearanceSettings from "./sections/AppearanceSettings";

const SettingsInterface = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <SettingsHeader />
      
      <div className="mt-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 max-w-md mb-8">
            <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
            <TabsTrigger value="security" className="text-sm">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="text-sm">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-6">
                <ProfileSettings />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-6">
                <SecuritySettings />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-6">
                <NotificationSettings />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-6">
                <AppearanceSettings />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsInterface;
