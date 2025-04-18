
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import { withErrorBoundary } from "@/utils/withErrorBoundary";
import EnhancedLoadingSpinner from "@/components/common/EnhancedLoadingSpinner";

const Index = () => {
  const location = useLocation();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <EnhancedLoadingSpinner 
          size="md" 
          color="text-indigo-500" 
          centered={true}
          showDelay={0}
          text="Loading..."
          textPosition="bottom"
        />
      </div>
    }>
      <LandingPage />
    </Suspense>
  );
};

// Add error boundary to catch and display any errors
export default withErrorBoundary(Index, {
  fallback: (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">We're having trouble loading the page. Please refresh and try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Refresh Page
      </button>
    </div>
  )
});
