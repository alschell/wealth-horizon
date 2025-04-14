
import React from 'react';
import { useErrorBoundary } from './useErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';
import { logError } from './errorUtils';

interface WithErrorHandlingOptions {
  componentName?: string;
  fallbackMessage?: string;
  showReset?: boolean;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  logError?: boolean;
  notifyUser?: boolean;
}

/**
 * Higher-order component to wrap a component with an error boundary
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorHandlingOptions = {}
) {
  const {
    componentName = Component.displayName || Component.name || 'Component',
    fallbackMessage = "Something went wrong",
    showReset = true,
    onError,
    logError: shouldLogError = true,
    notifyUser = true
  } = options;

  function WithErrorHandling(props: P) {
    // Custom error handler that logs errors and calls the provided onError
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      if (shouldLogError) {
        logError(error, componentName);
        console.error('Component stack:', errorInfo.componentStack);
      }
      
      if (onError) {
        onError(error, errorInfo);
      }
    };

    // Use the error boundary hook
    const { ErrorBoundaryWrapper } = useErrorBoundary({
      componentName,
      message: fallbackMessage,
      showReset,
      onError: handleError,
      logError: shouldLogError,
      notifyUser,
      fallback: <ErrorFallback message={fallbackMessage} showReset={showReset} />
    });

    return (
      <ErrorBoundaryWrapper>
        <Component {...props} />
      </ErrorBoundaryWrapper>
    );
  }

  WithErrorHandling.displayName = `WithErrorHandling(${componentName})`;
  return WithErrorHandling;
}
