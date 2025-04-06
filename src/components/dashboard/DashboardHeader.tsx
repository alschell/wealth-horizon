
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, LogOut, Settings } from "lucide-react";
import Logo from "./Logo";
import NotificationsPopover from "./NotificationsPopover";
import HeaderAction from "./HeaderAction";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full md:w-[200px] bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black"
            />
          </div>
          <NotificationsPopover />
          <HeaderAction 
            icon={Settings} 
            label="Settings" 
            to="/settings" 
          />
          <HeaderAction 
            icon={LogOut} 
            label="Log out" 
            to="/logout" 
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
