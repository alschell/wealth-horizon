
import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';
import { logError } from './errorUtils';
import { ErrorHandlerOptions } from './types';

/**
 * Higher-order component that wraps a component with an error boundary
 * 
 * @param Component - Component to wrap
 * @param options - Error boundary options
 * @returns Wrapped component with error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>, 
  options: ErrorHandlerOptions = {}
): React.FC<P> {
  const {
    onError,
    showToast = true,
    fallbackMessage = "Something went wrong",
    componentName = Component.displayName || Component.name || 'Component',
    logToConsole = true,
  } = options;

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    if (logToConsole) {
      logError(error, componentName);
      console.error('Component stack:', errorInfo.componentStack);
    }
    
    if (onError) {
      onError(error);
    }
  };

  const WithErrorHandlingWrapper: React.FC<P> = (props) => {
    return (
      <ErrorBoundary
        fallback={
          options.fallback || (
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
 * HOC that wraps a component with a custom error fallback component
 * 
 * @param Component - Component to wrap
 * @param FallbackComponent - Custom fallback component to show on error
 * @returns Wrapped component with custom error handling
 */
export function withCustomErrorFallback<P extends object, FallbackProps extends {error?: Error}>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<FallbackProps>
): React.FC<P> {
  return withErrorHandling(Component, {
    fallback: <FallbackComponent error={new Error()} {...{} as any} />
  });
}
