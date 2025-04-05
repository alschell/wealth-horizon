
import React from "react";
import { useLocation } from "react-router-dom";

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
    if (path === "/integrations") return "Integrations";
    if (path === "/settings") return "Settings";
    if (path === "/reporting") return "Generate reports";
    if (path === "/dashboard/users") return "Manage users & permissions";
    
    return "Wealth Pro";
  };

  return <span className="text-lg font-medium">{getPageTitle()}</span>;
};

export default PageTitle;
