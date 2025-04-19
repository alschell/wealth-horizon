
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { useErrorHandler } from '@/utils/errorHandling';
import { ErrorHandlerOptions } from '@/utils/errorHandling/types';
import { toast } from '@/hooks/use-toast';

export function useErrorBoundary(options: ErrorHandlerOptions = {}) {
  const {
    fallbackMessage = "Something went wrong",
    showToast = true,
    componentName,
    fallback
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
  
  const ErrorBoundaryWrapper = useCallback(({ children }: { children: React.ReactNode }) => {
    if (error) {
      if (fallback) {
        return fallback;
      }
      
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
  }, [error, fallbackMessage, reset, fallback]);
  
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
