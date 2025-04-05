
import React from "react";
import { Settings, LogOut, Bell, Search, Menu } from "lucide-react";
import Logo from "./Logo";
import PageTitle from "./PageTitle";
import NotificationsPopover from "./NotificationsPopover";
import HeaderAction from "./HeaderAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
          <PageTitle />
        </div>
        
        <div className="hidden md:flex items-center max-w-xs w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-gray-50 border-none focus-visible:ring-1" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
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
