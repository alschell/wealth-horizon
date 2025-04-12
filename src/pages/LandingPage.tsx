
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  const location = useLocation();
  
  // Add debugging to check component rendering
  useEffect(() => {
    console.log("LandingPage component mounted");
    console.log("LandingPage DOM element:", document.body.children);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-full h-full" style={{ display: 'block' }}>
      <LandingLayout />
    </div>
  );
};

export default LandingPage;
