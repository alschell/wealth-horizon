
import React, { useState, useCallback } from 'react';
import { ErrorBoundary, ErrorFallback } from '@/components/error-boundary';
import { useNotifications } from '@/hooks/use-notifications';

interface ErrorBoundaryConfig {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showReset?: boolean;
  message?: string;
  componentName?: string;
  logError?: boolean;
  notifyUser?: boolean;
}

/**
 * Hook for consistent error boundary usage throughout the application
 */
export function useErrorBoundary(config: ErrorBoundaryConfig = {}) {
  const {
    fallback,
    onError,
    showReset = true,
    message = "Something went wrong",
    componentName,
    logError = true,
    notifyUser = true
  } = config;
  
  const { showError } = useNotifications();
  const [key, setKey] = useState<number>(0);
  
  // Handle errors caught by the error boundary
  const handleError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    if (logError) {
      console.error(`Error in ${componentName || 'component'}:`, error);
      console.error('Component stack:', errorInfo.componentStack);
    }
    
    if (notifyUser) {
      showError(message, "The application encountered an error");
    }
    
    if (onError) {
      onError(error, errorInfo);
    }
  }, [componentName, logError, message, notifyUser, onError, showError]);
  
  // Reset the error boundary
  const resetErrorBoundary = useCallback(() => {
    setKey(prevKey => prevKey + 1);
  }, []);
  
  // Wrapper component with error boundary
  const ErrorBoundaryWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <ErrorBoundary
        key={key}
        fallback={
          fallback || (
            <ErrorFallback 
              error={new Error(message)} 
              resetErrorBoundary={resetErrorBoundary}
              showReset={showReset}
              title="Error Occurred" 
              message={message}
            />
          )
        }
        onError={handleError}
        componentName={componentName}
        resetErrorBoundary={resetErrorBoundary}
      >
        {children}
      </ErrorBoundary>
    ),
    [key, fallback, message, resetErrorBoundary, showReset, handleError, componentName]
  );
  
  return {
    ErrorBoundaryWrapper,
    resetErrorBoundary
  };
}
