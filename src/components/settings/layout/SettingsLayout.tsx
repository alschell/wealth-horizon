
import React from "react";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="w-full">
      {children}
    </div>
  );
};

export default SettingsLayout;
