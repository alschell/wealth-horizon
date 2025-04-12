
import React, { useEffect } from "react";
import LandingPage from "./LandingPage";

const Index = () => {
  // Add debugging
  useEffect(() => {
    console.log("Index component mounted");
    console.log("Index DOM element:", document.getElementById('root')?.children);
  }, []);
  
  return (
    <div className="w-full h-full" style={{ display: 'block' }}>
      <LandingPage />
    </div>
  );
};

export default Index;
