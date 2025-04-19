
import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorHandlerOptions } from '@/utils/errorHandling/types';

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 * 
 * @param Component - Component to wrap
 * @param options - Error boundary options
 * @returns Component wrapped with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorHandlerOptions = {}
): React.FC<P> {
  const { fallback, onError, componentName } = options;
  
  const WithErrorBoundary: React.FC<P> = (props) => {
    return (
      <ErrorBoundary 
        fallback={fallback} 
        onError={onError}
        componentName={componentName || Component.displayName || Component.name}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  
  // Set display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
}

/**
 * Creates a component wrapped with error boundary and custom fallback
 * 
 * @param Component - Component to wrap
 * @param FallbackComponent - Custom fallback component
 * @returns Component wrapped with error boundary and custom fallback
 */
export function withCustomErrorFallback<P extends object, FallbackProps extends {error?: Error}>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<FallbackProps>
): React.ComponentType<P> {
  return withErrorBoundary(Component, {
    fallback: <FallbackComponent error={new Error()} {...{} as any} />
  });
}
