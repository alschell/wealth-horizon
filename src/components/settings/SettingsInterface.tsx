
import React from "react";
import SettingsHeader from "./components/SettingsHeader";
import ProfileSettings from "./sections/ProfileSettings";
import SecuritySettings from "./sections/SecuritySettings";
import NotificationSettings from "./sections/NotificationSettings";
import AppearanceSettings from "./sections/AppearanceSettings";
import SettingsLayout from "./layout/SettingsLayout";
import SettingsTabs from "./components/SettingsTabs";
import SettingsTabContent from "./components/SettingsTabContent";

const SettingsInterface = () => {
  return (
    <SettingsLayout>
      <SettingsHeader />
      
      <div className="mt-6">
        <SettingsTabs defaultValue="profile">
          <SettingsTabContent value="profile">
            <ProfileSettings />
          </SettingsTabContent>
          
          <SettingsTabContent value="security">
            <SecuritySettings />
          </SettingsTabContent>
          
          <SettingsTabContent value="notifications">
            <NotificationSettings />
          </SettingsTabContent>
          
          <SettingsTabContent value="appearance">
            <AppearanceSettings />
          </SettingsTabContent>
        </SettingsTabs>
      </div>
    </SettingsLayout>
  );
};

export default SettingsInterface;
