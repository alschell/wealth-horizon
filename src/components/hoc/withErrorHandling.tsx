
import React from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface WithErrorHandlingOptions {
  fallback?: React.ReactNode;
  message?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Higher-order component for wrapping components with error boundaries
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorHandlingOptions = {}
): React.FC<P> {
  const { fallback, message, onError } = options;
  
  // Get a display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  
  // Create the wrapped component
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary 
      fallback={fallback}
      message={message || `There was a problem loading ${displayName}`}
      onError={onError}
      componentName={displayName}
    >
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Set a display name for the HOC
  WrappedComponent.displayName = `withErrorHandling(${displayName})`;
  
  return WrappedComponent;
}

export default withErrorHandling;
