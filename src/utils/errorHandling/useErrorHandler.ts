
import { useCallback, useState } from 'react';
import { handleError } from './core';
import { ErrorHandlerOptions, ErrorResponse } from './types/core';

/**
 * Hook for consistent error handling throughout the application
 * 
 * @param defaultOptions Default options for all error handling
 * @returns Error handling utilities
 */
export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  
  /**
   * Handle an error with consistent behavior
   */
  const handleErrorWithOptions = useCallback(
    (error: unknown, options: ErrorHandlerOptions = {}) => {
      const mergedOptions = { ...defaultOptions, ...options };
      const errorResponse = handleError(error, mergedOptions);
      setLastError(errorResponse);
      return errorResponse;
    },
    [defaultOptions]
  );
  
  /**
   * Clear the last error
   */
  const clearLastError = useCallback(() => {
    setLastError(null);
  }, []);
  
  /**
   * Wrap a function with error handling
   */
  const withErrorHandling = useCallback(
    <T>(fn: () => Promise<T> | T, options: ErrorHandlerOptions = {}) => {
      return async (): Promise<T | undefined> => {
        try {
          return await fn();
        } catch (error) {
          handleErrorWithOptions(error, options);
          return undefined;
        }
      };
    },
    [handleErrorWithOptions]
  );
  
  /**
   * Aliases for backward compatibility
   */
  const withTry = withErrorHandling;
  const tryCatch = withErrorHandling;
  
  return {
    handleError: handleErrorWithOptions,
    withTry,
    tryCatch,
    withErrorHandling,
    lastError,
    clearLastError
  };
}
