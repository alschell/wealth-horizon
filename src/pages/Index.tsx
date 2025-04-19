
import React from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import { ErrorBoundary } from "@/components/error-boundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

const Index = () => {
  const location = useLocation();
  
  return (
    <ErrorBoundary
      fallback={<ErrorFallback 
        error={new Error("Failed to load landing page")}
        resetErrorBoundary={() => window.location.reload()}
        title="Error Loading Page"
      />}
    >
      <LandingPage />
    </ErrorBoundary>
  );
};

export default Index;
