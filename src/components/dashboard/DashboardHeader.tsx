
import React from "react";
import { Settings, LogOut } from "lucide-react";
import Logo from "./Logo";
import PageTitle from "./PageTitle";
import NotificationsPopover from "./NotificationsPopover";
import HeaderAction from "./HeaderAction";

const DashboardHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-white">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <PageTitle />
        </div>
        
        <div className="flex items-center gap-3">
          <NotificationsPopover />
          <HeaderAction 
            icon={Settings} 
            label="Settings" 
            to="/settings" 
          />
          <HeaderAction 
            icon={LogOut} 
            label="Log Out" 
            to="/" 
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
