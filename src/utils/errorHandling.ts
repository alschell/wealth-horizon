
import { showError } from './toast';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

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
 * Safely extracts error message from various error types
 * 
 * @param error - The error to extract message from
 * @param fallbackMessage - Fallback message if error can't be parsed
 * @returns Error message string
 */
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return String((error as ErrorResponse).message);
    }
  }
  
  return fallbackMessage;
}

/**
 * Handles errors consistently across the application
 * 
 * @param error - The error to handle
 * @param options - Error handling options
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
    showError("Error", errorMessage);
  }
  
  // Call error callback
  if (onError) {
    onError(error);
  }
}

/**
 * Wraps an async function with error handling
 * 
 * @param fn - Function to wrap
 * @param options - Error handling options
 * @returns Wrapped function with error handling
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
