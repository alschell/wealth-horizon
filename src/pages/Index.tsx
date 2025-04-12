
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  // Add debugging
  useEffect(() => {
    console.log("Index component mounted");
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return <LandingPage />;
};

export default Index;
