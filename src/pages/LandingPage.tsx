
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <LandingLayout />;
};

export default LandingPage;
