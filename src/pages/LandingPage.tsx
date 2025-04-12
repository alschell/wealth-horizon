
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  const location = useLocation();
  
  // Add debugging to check component rendering
  useEffect(() => {
    console.log("LandingPage component mounted");
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <LandingLayout />;
};

export default LandingPage;
