
import React, { useEffect } from "react";
import LandingPage from "./LandingPage";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ErrorFallback from "@/components/common/ErrorFallback";

const Index = () => {
  useEffect(() => {
    console.log("Index component mounted");
  }, []);
  
  return (
    <ErrorBoundary fallback={<ErrorFallback message="Error loading the landing page" />}>
      <LandingPage />
    </ErrorBoundary>
  );
};

export default Index;

