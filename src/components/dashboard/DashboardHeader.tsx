
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
          <Logo className="h-8 w-8 mr-2" />
          <span className="hidden lg:inline-block font-bold">Wealth Pro</span>
        </Link>
        <div className="hidden lg:block ml-6">
          <nav className="flex items-center space-x-4">
            <Link to="/analyze-wealth" className="text-sm font-medium transition-colors hover:text-primary">
              Wealth Analysis
            </Link>
            <Link to="/advice" className="text-sm font-medium transition-colors hover:text-primary">
              Advice
            </Link>
            <Link to="/trading" className="text-sm font-medium transition-colors hover:text-primary">
              Trading
            </Link>
            <Link to="/market-data" className="text-sm font-medium transition-colors hover:text-primary">
              Markets
            </Link>
            <Link to="/cashflow" className="text-sm font-medium transition-colors hover:text-primary">
              Cashflow
            </Link>
            <Link to="/tax-optimization" className="text-sm font-medium transition-colors hover:text-primary">
              Tax
            </Link>
            <Link to="/client-portal" className="text-sm font-medium transition-colors hover:text-primary">
              Clients
            </Link>
            <Link to="/esg" className="text-sm font-medium transition-colors hover:text-primary">
              ESG
            </Link>
          </nav>
        </div>
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
