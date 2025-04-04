
import React from "react";
import { Settings } from "lucide-react";

const SettingsHeader = () => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Settings className="h-6 w-6 text-black" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-black">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
    </div>
  );
};

export default SettingsHeader;
