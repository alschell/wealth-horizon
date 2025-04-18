
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Log when the Index component mounts for debugging
    console.log("Index component mounted", { pathname: location.pathname });
  }, [location.pathname]);

  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LandingPage />
    </React.Suspense>
  );
};

export default Index;
