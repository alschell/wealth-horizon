
import React from "react";
import ProfileSettings from "./sections/ProfileSettings";
import SecuritySettings from "./sections/SecuritySettings";
import NotificationSettings from "./sections/NotificationSettings";
import AppearanceSettings from "./sections/AppearanceSettings";
import SettingsTabs from "./components/SettingsTabs";
import SettingsTabContent from "./components/SettingsTabContent";

const SettingsInterface = () => {
  return (
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
  );
};

export default SettingsInterface;
