
import React from 'react';
import { useErrorBoundary } from './useErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';

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
    logError = true,
    notifyUser = true
  } = options;

  function WithErrorHandling(props: P) {
    const { ErrorBoundaryWrapper } = useErrorBoundary({
      componentName,
      message: fallbackMessage,
      showReset,
      onError,
      logError,
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
