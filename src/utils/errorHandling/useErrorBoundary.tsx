
import React, { useState, useCallback } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';
import { useNotifications } from '@/hooks/use-notifications';
import { ErrorHandlerOptions } from './types/core';

/**
 * Configuration options for the error boundary hook
 */
interface ErrorBoundaryConfig extends ErrorHandlerOptions {
  /** Whether to show the reset button in the error fallback */
  showReset?: boolean;
  /** Custom error message to display */
  message?: string;
  /** Whether to show a notification to the user */
  notifyUser?: boolean;
}

/**
 * Hook for consistent error boundary usage throughout the application
 * 
 * @param config Configuration options for the error boundary
 * @returns Object containing ErrorBoundaryWrapper component and reset function
 */
export function useErrorBoundary(config: ErrorBoundaryConfig = {}) {
  const {
    fallback,
    onError,
    showReset = true,
    message = "Something went wrong",
    componentName,
    logToConsole = true,
    notifyUser = true
  } = config;
  
  const { showError } = useNotifications();
  const [key, setKey] = useState<number>(0);
  
  // Handle errors caught by the error boundary
  const handleError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    if (logToConsole) {
      console.error(`Error in ${componentName || 'component'}:`, error);
      console.error('Component stack:', errorInfo.componentStack);
    }
    
    if (notifyUser) {
      showError(message, "The application encountered an error");
    }
    
    if (onError) {
      onError(error, errorInfo);
    }
  }, [componentName, logToConsole, message, notifyUser, onError, showError]);
  
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
              title="Error Occurred" 
              description={message}
              showResetButton={showReset}
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
