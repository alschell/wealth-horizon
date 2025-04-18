
import React from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Log when the Index component mounts for debugging
    console.log("Index component mounted", { pathname: location.pathname });
    
    // Ensure we scroll to top on initial page load
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <LandingPage />;
};

export default Index;
