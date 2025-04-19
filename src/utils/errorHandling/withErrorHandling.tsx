
import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';
import { logError } from './errorUtils';
import { ErrorHandlerOptions } from './types';

/**
 * Higher-order component to wrap a component with an error boundary
 * Provides consistent error handling across the application
 * 
 * @param Component - The component to wrap
 * @param options - Configuration options for the error boundary
 * @returns A wrapped component with error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>, 
  options: ErrorHandlerOptions = {}
): React.FC<P> {
  const {
    fallback,
    onError,
    showToast = true,
    fallbackMessage = "Something went wrong",
    componentName = Component.displayName || Component.name || 'Component',
    logToConsole = true,
  } = options;

  const WithErrorHandlingWrapper: React.FC<P> = (props) => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      if (logToConsole) {
        logError(error, componentName);
        console.error('Component stack:', errorInfo.componentStack);
      }
      
      if (onError) {
        onError(error);
      }
    };

    return (
      <ErrorBoundary
        fallback={
          fallback || (
            <ErrorFallback 
              error={new Error(fallbackMessage)} 
              resetErrorBoundary={() => {}}
              title={`Error in ${componentName}`}
              description={fallbackMessage}
              showResetButton={true}
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
 * 
 * @param Component - The component to wrap
 * @param FallbackComponent - Custom fallback component to display on error
 * @returns A wrapped component with custom error fallback
 */
export function withCustomErrorFallback<P extends object, FallbackProps extends {error?: Error}>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<FallbackProps>
): React.FC<P> {
  return withErrorHandling(Component, {
    fallback: <FallbackComponent error={new Error()} {...{} as any} />
  });
}
