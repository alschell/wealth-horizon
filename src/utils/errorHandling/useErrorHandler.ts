
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ErrorHandlerOptions, ErrorResponse } from './types';
import { parseError } from './errorUtils';
import { handleError, withErrorCatch, tryCatch } from './errorHandlingUtils';

/**
 * Hook providing consistent error handling utilities
 * Centralizes error handling logic and provides a simple API
 * 
 * @param defaultOptions Default options for all error handling in this hook instance
 * @returns Error handling utilities
 */
export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  const { toast } = useToast();
  
  /**
   * Handles an error with configurable options
   * @param error - The error to handle
   * @param options - Error handling options to override defaults
   * @returns The parsed error
   */
  const handleErrorWithOptions = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const parsedError = parseError(error);
    setLastError(parsedError);
    
    // Use the centralized error handler
    handleError(error, mergedOptions);
    
    return parsedError;
  }, [defaultOptions]);
  
  /**
   * Wraps an async function with error handling
   * @param fn - The function to wrap
   * @param options - Error handling options
   * @returns A wrapped function that handles errors
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleErrorWithOptions(error, options);
        return undefined;
      }
    };
  }, [handleErrorWithOptions]);
  
  /**
   * Safely executes a function with error handling
   * @param fn - The function to execute
   * @param options - Error handling options
   * @returns The result of the function or undefined
   */
  const tryCatchFn = useCallback(async <T>(
    fn: () => Promise<T> | T,
    options: ErrorHandlerOptions = {}
  ): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (error) {
      handleErrorWithOptions(error, options);
      return undefined;
    }
  }, [handleErrorWithOptions]);
  
  return {
    handleError: handleErrorWithOptions,
    withErrorHandling,
    tryCatch: tryCatchFn,
    lastError,
    clearLastError: () => setLastError(null)
  };
}
