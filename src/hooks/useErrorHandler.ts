
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { 
  parseError, 
  type ErrorHandlerOptions,
  type ErrorResponse
} from '@/utils/errorHandling/errorHandlingCore';

/**
 * Hook for consistent error handling throughout the application
 */
export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  const { toast } = useToast();
  
  /**
   * Handle an error with standardized approach
   */
  const handleErrorWithState = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const errorDetails = parseError(error);
    setLastError(errorDetails);
    return errorDetails;
  }, [defaultOptions]);
  
  /**
   * Wrap an async function with error handling
   */
  const withErrorHandlingState = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleErrorWithState(error, options);
        return undefined;
      }
    };
  }, [handleErrorWithState]);
  
  /**
   * Try-catch wrapper with state management
   */
  const tryCatchWithState = useCallback(async <T>(
    fn: () => Promise<T> | T,
    options: ErrorHandlerOptions = {}
  ): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (error) {
      handleErrorWithState(error, options);
      return undefined;
    }
  }, [handleErrorWithState]);
  
  /**
   * Show an error toast manually
   */
  const showError = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive"
    });
  }, [toast]);
  
  return {
    // State
    lastError,
    clearLastError: () => setLastError(null),
    
    // Error handling functions
    handleError: handleErrorWithState,
    withErrorHandling: withErrorHandlingState,
    tryCatch: tryCatchWithState,
    showError,
    
    // Utility functions re-exported for convenience
    parseError
  };
}
