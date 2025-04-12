
import React, { useEffect } from "react";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  // Add debugging to check component rendering
  useEffect(() => {
    console.log("LandingPage component mounted");
  }, []);

  return <LandingLayout />;
};

export default LandingPage;
