
import React, { useEffect } from "react";
import LandingPage from "./LandingPage";

const Index = () => {
  // Add debugging
  useEffect(() => {
    console.log("Index component mounted");
  }, []);
  
  return <LandingPage />;
};

export default Index;
