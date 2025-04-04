
import React from "react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      {children}
    </div>
  );
};

export default SettingsLayout;
