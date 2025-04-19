
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { parseError, type ErrorResponse } from './errorUtils';
import { handleError } from './errorHandlingUtils';

/**
 * Options for the error handler hook
 */
export interface ErrorHandlerHookOptions {
  silent?: boolean;
  logToConsole?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  fallbackMessage?: string;
  componentName?: string;
  onError?: (error: unknown) => void;
}

/**
 * Hook providing consistent error handling utilities
 * 
 * @param defaultOptions Default options for all error handling in this hook instance
 */
export function useErrorHandler(defaultOptions: ErrorHandlerHookOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  const { toast } = useToast();
  
  /**
   * Handles an error with configurable options
   */
  const handleErrorWithOptions = useCallback((error: unknown, options: ErrorHandlerHookOptions = {}) => {
    const {
      silent = defaultOptions.silent ?? false,
      logToConsole = defaultOptions.logToConsole ?? true,
      showToast = defaultOptions.showToast ?? true,
      toastTitle = defaultOptions.toastTitle ?? 'Error',
      fallbackMessage = defaultOptions.fallbackMessage ?? 'An unexpected error occurred',
      componentName = defaultOptions.componentName,
      onError = defaultOptions.onError
    } = options;
    
    // Parse error to standardized format
    const parsedError = parseError(error);
    setLastError(parsedError);
    
    // Use the centralized error handler
    handleError(error, {
      fallbackMessage,
      logToConsole,
      showToast,
      silent,
      onError
    });
    
    // Log component context if provided
    if (componentName && logToConsole && !silent) {
      console.info(`Error occurred in component: ${componentName}`);
    }
    
    return parsedError;
  }, [defaultOptions, toast]);
  
  /**
   * Wraps an async function with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerHookOptions = {}
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
   */
  const tryCatch = useCallback(async <T>(
    fn: () => Promise<T> | T,
    options: ErrorHandlerHookOptions = {}
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
    tryCatch,
    lastError,
    clearLastError: () => setLastError(null)
  };
}
