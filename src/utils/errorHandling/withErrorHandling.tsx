
import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { logError } from './errorUtils';

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
 * Higher-order component to wrap a component with an error boundary
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>, 
  options: ErrorBoundaryConfig = {}
): React.FC<P> {
  const {
    fallback,
    onError,
    showReset = true,
    message = "Something went wrong",
    componentName = Component.displayName || Component.name || 'Component',
    logError: shouldLogError = true,
    notifyUser = true
  } = options;

  const WithErrorHandlingWrapper: React.FC<P> = (props) => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      if (shouldLogError) {
        logError(error, componentName);
        console.error('Component stack:', errorInfo.componentStack);
      }
      
      if (onError) {
        onError(error, errorInfo);
      }
    };

    return (
      <ErrorBoundary
        fallback={
          fallback || (
            <ErrorFallback 
              error={new Error(message)} 
              resetErrorBoundary={() => {}}
              title="Error Occurred" 
              description={message}
              showResetButton={showReset}
            />
          )
        }
        onError={handleError}
        componentName={componentName}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorHandlingWrapper.displayName = `WithErrorHandling(${componentName})`;
  return WithErrorHandlingWrapper;
}

/**
 * Creates a component wrapped with error boundary and custom fallback component
 */
export const withCustomErrorFallback = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<{ error?: Error }>
): React.FC<P> => {
  return withErrorHandling(Component, {
    fallback: <FallbackComponent error={new Error()} />
  });
};
