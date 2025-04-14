
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  // Add debugging
  useEffect(() => {
    console.log("Index component mounted");
    console.log("Current location:", location);
  }, [location]);
  
  return <LandingPage />;
};

export default Index;
