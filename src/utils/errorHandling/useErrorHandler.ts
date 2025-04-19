
import { useCallback } from 'react';
import { ErrorHandlerOptions, ErrorResponse } from './types/core';
import { handleError } from './core';

export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const handleErrorWithOptions = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  }, [defaultOptions]);

  return {
    handleError: handleErrorWithOptions,
    withTry: <T>(fn: () => Promise<T> | T, options: ErrorHandlerOptions = {}) => {
      return async (): Promise<T | undefined> => {
        try {
          return await fn();
        } catch (error) {
          handleErrorWithOptions(error, options);
          return undefined;
        }
      };
    }
  };
}
