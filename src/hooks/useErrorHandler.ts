
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ErrorHandlerOptions {
  /** Show toast notification on error */
  showToast?: boolean;
  /** Custom error formatter */
  formatError?: (error: unknown) => string;
  /** Callback to run on error */
  onError?: (error: unknown) => void;
  /** Whether to rethrow the error after handling */
  rethrow?: boolean;
  /** Toast duration in milliseconds */
  toastDuration?: number;
  /** Custom error logger */
  logger?: (error: unknown, context?: string) => void;
}

interface ErrorHandlerState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error message */
  errorMessage: string | null;
  /** The original error object */
  error: unknown | null;
  /** When the error occurred */
  timestamp: number | null;
}

type ErrorHandler = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
) => (...args: Parameters<T>) => Promise<ReturnType<T>>;

/**
 * Enhanced error handling hook with rich options and state tracking
 */
export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const {
    showToast = true,
    formatError = (err) => getErrorMessage(err),
    onError,
    rethrow = false,
    toastDuration = 5000,
    logger = console.error,
  } = options;

  const { toast } = useToast();
  
  // Error state management
  const [errorState, setErrorState] = useState<ErrorHandlerState>({
    hasError: false,
    errorMessage: null,
    error: null,
    timestamp: null,
  });

  /**
   * Clear the current error state
   */
  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      errorMessage: null,
      error: null,
      timestamp: null,
    });
  }, []);

  /**
   * Handle an error
   */
  const handleError = useCallback(
    (error: unknown, context?: string) => {
      const errorMessage = formatError(error);
      
      // Update error state
      setErrorState({
        hasError: true,
        errorMessage,
        error,
        timestamp: Date.now(),
      });

      // Log the error
      if (logger) {
        logger(error, context);
      }

      // Show toast if enabled
      if (showToast) {
        toast({
          title: 'An error occurred',
          description: errorMessage,
          variant: 'destructive',
          duration: toastDuration,
        });
      }

      // Run custom error handler if provided
      if (onError) {
        onError(error);
      }

      // Rethrow if requested
      if (rethrow) {
        throw error;
      }
    },
    [formatError, showToast, onError, rethrow, toast, toastDuration, logger]
  );

  /**
   * Wrap an async function with error handling
   */
  const withErrorHandling: ErrorHandler = useCallback(
    (fn, context) => {
      return async (...args) => {
        try {
          return await fn(...args);
        } catch (error) {
          handleError(error, context);
          throw error; // Rethrow to allow for further handling if needed
        }
      };
    },
    [handleError]
  );

  /**
   * Try to execute an async function with error handling
   */
  const tryCatch = useCallback(
    async <T,>(callback: () => Promise<T>, context?: string): Promise<T | undefined> => {
      try {
        return await callback();
      } catch (error) {
        handleError(error, context);
        return undefined;
      }
    },
    [handleError]
  );

  return {
    withErrorHandling,
    handleError,
    tryCatch,
    clearError,
    ...errorState,
  };
}

/**
 * Extract a readable message from an error
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
}

/**
 * Higher-order component to wrap a component with error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  options?: ErrorHandlerOptions
): React.FC<P> {
  return function WithErrorHandling(props: P) {
    const errorHandler = useErrorHandler(options);
    return <Component {...props} errorHandler={errorHandler} />;
  };
}

export default useErrorHandler;
