
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse h-8 w-8 rounded-full bg-indigo-600"></div>
      </div>
    }>
      <LandingPage />
    </Suspense>
  );
};

export default Index;
