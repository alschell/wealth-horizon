
import { toast } from '@/hooks/use-toast';
import { getErrorMessage, parseError, type ErrorResponse } from './errorUtils';

/**
 * Options for error handler
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logToConsole?: boolean;
  showToast?: boolean;
  silent?: boolean;
  actionText?: string;
  action?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Unified error handling function
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): void {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logToConsole = true,
    showToast = true,
    silent = false,
    actionText,
    action,
    onError
  } = options;
  
  // Parse error details
  const errorDetails = parseError(error);
  const errorMessage = errorDetails.message || fallbackMessage;
  
  // Log error to console if enabled
  if (logToConsole && !silent) {
    console.error("Error:", {
      message: errorMessage,
      code: errorDetails.code,
      details: errorDetails.details,
      original: error
    });
  }
  
  // Show toast notification if enabled and not silent
  if (showToast && !silent) {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
      action: actionText && action ? {
        label: actionText,
        onClick: action
      } : undefined
    });
  }
  
  // Call error callback if provided
  if (onError) {
    onError(error);
  }
}

/**
 * Creates a try-catch wrapper for async functions
 */
export function withErrorCatch<T extends (...args: any[]) => Promise<any>>(
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
