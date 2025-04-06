
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, LogOut } from "lucide-react";
import Logo from "./Logo";
import NotificationsPopover from "./NotificationsPopover";
import PageTitle from "./PageTitle";
import HeaderAction from "./HeaderAction";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <Logo />
          <span className="hidden lg:inline-block font-bold">Wealth Pro</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full md:w-[200px] bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <NotificationsPopover />
        <HeaderAction 
          icon={LogOut} 
          label="Log out" 
          to="/logout" 
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
