
import React from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();
  
  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") return "Dashboard";
    if (path === "/analyze-wealth") return "Wealth Analysis";
    if (path === "/advice") return "Advisory";
    if (path === "/trading") return "Trading";
    if (path === "/market-data") return "Market Data & News";
    if (path === "/dashboard/credit") return "Credit Facilities";
    if (path === "/cashflow") return "Cashflow & Liquidity";
    if (path === "/integrations") return "Integrations";
    if (path === "/settings") return "Settings";
    if (path === "/reporting") return "Reporting";
    if (path === "/dashboard/users") return "User Management";
    
    return "Wealth Pro";
  };

  return <span className="text-lg font-medium">{getPageTitle()}</span>;
};

export default PageTitle;
