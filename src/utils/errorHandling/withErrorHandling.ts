
import { getErrorMessage } from './errorUtils';
import { toast } from '@/hooks/use-toast';

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Handles errors consistently across the application
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): void {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logError = true,
    showToast = true,
    onError
  } = options;
  
  // Get error message
  const errorMessage = getErrorMessage(error, fallbackMessage);
  
  // Log error
  if (logError) {
    console.error("Error:", error);
  }
  
  // Show toast
  if (showToast) {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }
  
  // Call error callback
  if (onError) {
    onError(error);
  }
}

/**
 * Wraps an async function with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
}
