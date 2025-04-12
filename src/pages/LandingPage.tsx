
import React, { useEffect } from "react";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  // Add debugging to check component rendering
  useEffect(() => {
    console.log("LandingPage component mounted");
    console.log("LandingPage DOM element:", document.body.children);
  }, []);

  return (
    <div className="w-full h-full" style={{ display: 'block' }}>
      <LandingLayout />
    </div>
  );
};

export default LandingPage;
