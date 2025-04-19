
import React, { useCallback, useState } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { useErrorHandler } from '@/utils/errorHandling';
import { ErrorHandlerOptions } from '@/utils/errorHandling/types/core';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';

export function useErrorBoundary(options: ErrorHandlerOptions = {}) {
  const [error, setError] = useState<Error | null>(null);
  const { handleError } = useErrorHandler(options);
  
  const reset = useCallback(() => {
    setError(null);
  }, []);
  
  const ErrorBoundaryWrapper = useCallback(({ children }: { children: React.ReactNode }) => {
    if (error) {
      if (options.fallback) {
        return options.fallback;
      }
      
      return (
        <ErrorFallback 
          error={error}
          resetErrorBoundary={reset}
          title={options.componentName ? `Error in ${options.componentName}` : 'Error'}
          description={options.fallbackMessage || error.message}
          showResetButton={true}
        />
      );
    }
    
    return <ErrorBoundary
      fallback={options.fallback}
      onError={(err) => {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        handleError(err);
      }}
      componentName={options.componentName}
    >
      {children}
    </ErrorBoundary>;
  }, [error, options, handleError, reset]);
  
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

export default useErrorBoundary;
