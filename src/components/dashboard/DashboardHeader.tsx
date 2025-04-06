
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import NotificationsPopover from "./NotificationsPopover";
import PageTitle from "./PageTitle";
import HeaderAction from "./HeaderAction";
import PersonalizedSettings from "./PersonalizedSettings";
import { Settings } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <Logo />
          <span className="hidden lg:inline-block font-bold">Wealth Pro</span>
        </Link>
      </div>
      <div className="hidden lg:block">
        <PageTitle />
      </div>
      <div className="flex items-center gap-2">
        <PersonalizedSettings />
        <HeaderAction 
          icon={Settings} 
          label="Settings" 
          to="/settings" 
        />
        <NotificationsPopover />
      </div>
    </header>
  );
};

export default DashboardHeader;
