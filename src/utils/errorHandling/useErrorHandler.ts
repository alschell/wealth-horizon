
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { parseError, type ErrorResponse } from './errorHandlingUtils';

interface ErrorHandlerOptions {
  silent?: boolean;
  logToConsole?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  fallbackMessage?: string;
  onError?: (error: unknown) => void;
}

/**
 * Hook providing consistent error handling utilities
 */
export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  const { toast } = useToast();
  
  const handleError = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const {
      silent = defaultOptions.silent ?? false,
      logToConsole = defaultOptions.logToConsole ?? true,
      showToast = defaultOptions.showToast ?? true,
      toastTitle = defaultOptions.toastTitle ?? 'Error',
      fallbackMessage = defaultOptions.fallbackMessage ?? 'An unexpected error occurred',
      onError = defaultOptions.onError
    } = options;
    
    // Parse error to standardized format
    const parsedError = parseError(error);
    setLastError(parsedError);
    
    // Log to console if enabled
    if (logToConsole && !silent) {
      console.error('[Error Handler]:', parsedError);
    }
    
    // Show toast notification if enabled
    if (showToast && !silent) {
      toast({
        title: toastTitle,
        description: parsedError.message || fallbackMessage,
        variant: "destructive"
      });
    }
    
    // Call custom error handler if provided
    if (onError) {
      onError(error);
    }
    
    return parsedError;
  }, [defaultOptions, toast]);
  
  /**
   * Wraps an async function with error handling
   */
  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error, options);
        return undefined;
      }
    };
  }, [handleError]);
  
  /**
   * Safely executes a function with error handling
   */
  const tryCatch = useCallback(async <T>(
    fn: () => Promise<T> | T,
    options: ErrorHandlerOptions = {}
  ): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  }, [handleError]);
  
  return {
    handleError,
    withErrorHandling,
    tryCatch,
    lastError,
    clearLastError: () => setLastError(null)
  };
}
