
import React from "react";
import { Settings, LogOut } from "lucide-react";
import Logo from "./Logo";
import PageTitle from "./PageTitle";
import NotificationsPopover from "./NotificationsPopover";
import HeaderAction from "./HeaderAction";

const DashboardHeader = () => {
  return (
    <header className="h-16 px-4 flex items-center justify-between border-b border-border bg-white">
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <Logo />
        <PageTitle />
      </div>
      
      <div className="flex items-center gap-3 mr-3">
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
    </header>
  );
};

export default DashboardHeader;
