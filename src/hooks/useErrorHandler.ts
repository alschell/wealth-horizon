
import { useState, useCallback } from 'react';
import { useToast } from './use-toast';
import { 
  parseError,
  handleError,
  tryCatch as coreTryCatch,
  withErrorHandling as coreWithErrorHandling,
  isError,
  isErrorResponse,
  type ErrorHandlerOptions,
  type ErrorResponse
} from '@/utils/errorHandling/errorHandlingCore';

/**
 * Enhanced error handler hook with improved type safety and error state management
 */
export function useErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const [lastError, setLastError] = useState<ErrorResponse | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const { toast } = useToast();
  
  /**
   * Handle an error with standardized approach and state updates
   */
  const handleErrorWithState = useCallback((error: unknown, options: ErrorHandlerOptions = {}) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const errorDetails = handleError(error, mergedOptions);
    
    setLastError(errorDetails);
    setErrorCount(prev => prev + 1);
    
    return errorDetails;
  }, [defaultOptions]);
  
  /**
   * Reset error state
   */
  const clearErrors = useCallback(() => {
    setLastError(null);
    setErrorCount(0);
  }, []);
  
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
    
    setLastError({
      message,
      code: 'MANUAL_ERROR',
      timestamp: new Date().toISOString(),
      source: 'manual'
    });
    
    setErrorCount(prev => prev + 1);
  }, [toast]);
  
  return {
    // State
    lastError,
    errorCount,
    hasError: lastError !== null,
    clearErrors,
    
    // Error handling functions
    handleError: handleErrorWithState,
    withErrorHandling: withErrorHandlingState,
    tryCatch: tryCatchWithState,
    showError,
    
    // Type guards
    isError,
    isErrorResponse,
    
    // Utility functions re-exported for convenience
    parseError
  };
}
