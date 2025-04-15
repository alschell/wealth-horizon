
import React from "react";
import { useLocation } from "react-router-dom";
import { TranslatedText } from "@/components/ui/translated-text";

const PageTitle = () => {
  const location = useLocation();
  
  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") return "Dashboard";
    if (path === "/analyze-wealth") return "Analyze wealth";
    if (path === "/advice") return "Get advice";
    if (path === "/trading") return "Trade";
    if (path === "/market-data") return "Access market data & news";
    if (path === "/dashboard/credit") return "Credit Facilities";
    if (path === "/cashflow") return "Manage cashflow & liquidity";
    if (path === "/integrations") return "Manage integrations";
    if (path === "/settings") return "Settings";
    if (path === "/reporting") return "Generate reports";
    if (path === "/dashboard/users") return "Manage users & permissions";
    if (path === "/notifications") return "Notifications, tasks & events";
    if (path === "/activity") return "Activity History";
    
    return "Wealth Pro";
  };

  return <TranslatedText className="text-lg font-medium">{getPageTitle()}</TranslatedText>;
};

export default PageTitle;
