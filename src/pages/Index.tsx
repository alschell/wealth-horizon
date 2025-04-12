
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  // Add debugging
  useEffect(() => {
    console.log("Index component mounted");
    console.log("Index DOM element:", document.getElementById('root')?.children);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="w-full h-full" style={{ display: 'block' }}>
      <LandingPage />
    </div>
  );
};

export default Index;
