
import { useCallback, useState } from 'react';
import { ErrorHandlerOptions, ErrorResponse } from './types/core';
import { handleError } from './core';

export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);

  const handleErrorWithOptions = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const errorResponse = handleError(error, { ...defaultOptions, ...options });
    setLastError(errorResponse);
    return errorResponse;
  }, [defaultOptions]);

  const clearLastError = useCallback(() => {
    setLastError(null);
  }, []);

  const withTry = useCallback(<T>(fn: () => Promise<T> | T, options: ErrorHandlerOptions = {}) => {
    return async (): Promise<T | undefined> => {
      try {
        return await fn();
      } catch (error) {
        handleErrorWithOptions(error, options);
        return undefined;
      }
    };
  }, [handleErrorWithOptions]);

  // Alias for withTry for backward compatibility
  const tryCatch = withTry;

  // Alternative name for withTry used in some parts of the codebase
  const withErrorHandling = withTry;

  return {
    handleError: handleErrorWithOptions,
    withTry,
    tryCatch,
    withErrorHandling,
    lastError,
    clearLastError
  };
}
