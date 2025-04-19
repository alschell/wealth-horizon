
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { useErrorHandler } from '@/utils/errorHandling';
import { ErrorHandlerOptions } from '@/utils/errorHandling/types';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for use in components to show error boundary functionality
 * without using class components
 * 
 * @param options Configuration options for the error boundary hook
 * @returns Error boundary utilities and wrapper component
 */
export function useErrorBoundary(options: ErrorHandlerOptions = {}) {
  const {
    fallbackMessage = "Something went wrong",
    showToast = true,
    componentName
  } = options;
  
  const [error, setError] = useState<Error | null>(null);
  const { handleError } = useErrorHandler({
    componentName,
    showToast,
    fallbackMessage
  });
  
  const reset = useCallback(() => {
    setError(null);
  }, []);
  
  // Add ErrorBoundaryWrapper component
  const ErrorBoundaryWrapper = useCallback(({ children }: { children: React.ReactNode }) => {
    if (error) {
      return (
        <div className="p-4 border border-red-300 rounded bg-red-50">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
          <p className="mt-1 text-red-700">{error.message || fallbackMessage}</p>
          {reset && (
            <button 
              onClick={reset}
              className="mt-3 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Try Again
            </button>
          )}
        </div>
      );
    }
    
    return <>{children}</>;
  }, [error, fallbackMessage, reset]);
  
  return {
    error,
    handleError: (caught: unknown) => {
      const err = caught instanceof Error ? caught : new Error(String(caught));
      setError(err);
      handleError(err);
      return err;
    },
    reset,
    isError: error !== null,
    ErrorBoundaryWrapper
  };
}

/**
 * HOC to wrap a component with error boundary using the hook
 * 
 * @param Component Component to wrap with error handling
 * @param options Configuration options
 * @returns Wrapped component with error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorHandlerOptions = {}
): React.FC<P> {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent: React.FC<P> = (props) => {
    const { ErrorBoundaryWrapper } = useErrorBoundary({
      ...options,
      componentName: options.componentName || displayName
    });
    
    return (
      <ErrorBoundaryWrapper>
        <Component {...props} />
      </ErrorBoundaryWrapper>
    );
  };
  
  WrappedComponent.displayName = `withErrorHandling(${displayName})`;
  
  return WrappedComponent;
}

export default useErrorBoundary;
