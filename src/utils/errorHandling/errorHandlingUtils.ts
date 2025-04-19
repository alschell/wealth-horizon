
import { toast } from '@/hooks/use-toast';
import { ErrorHandlerOptions, ErrorResponse } from './types';
import { getErrorMessage, parseError, logError } from './errorUtils';

/**
 * Unified error handling function
 * Performs logging, notification, and optional callback actions for errors
 * 
 * @param error - The error to handle
 * @param options - Error handling options
 * @returns The parsed error response
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logToConsole = true,
    showToast = true,
    silent = false,
    actionText,
    action,
    onError,
    componentName,
    toastTitle = "Error"
  } = options;
  
  // Parse error details
  const errorDetails = parseError(error);
  const errorMessage = errorDetails.message || fallbackMessage;
  
  // Log error to console if enabled
  if (logToConsole && !silent) {
    if (componentName) {
      logError(error, componentName);
    } else {
      console.error("Error:", {
        message: errorMessage,
        code: errorDetails.code,
        details: errorDetails.details,
        original: error
      });
    }
  }
  
  // Show toast notification if enabled and not silent
  if (showToast && !silent) {
    toast({
      title: toastTitle,
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
  
  return errorDetails;
}

/**
 * Creates a try-catch wrapper for async functions
 * Handles errors using the standard error handling utility
 * 
 * @param fn - The function to wrap with error handling
 * @param options - Error handling options
 * @returns A wrapped function that handles errors
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
      
      if (options.rethrow) {
        throw error;
      }
      
      return undefined;
    }
  };
}

/**
 * Try-catch wrapper for any function (async or sync)
 * Provides a cleaner way to handle errors in either case
 * 
 * @param fn - The function to execute
 * @param options - Error handling options
 * @returns The result of the function or undefined
 */
export async function tryCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, options);
    
    if (options.rethrow) {
      throw error;
    }
    
    return undefined;
  }
}
