
import { toast } from '@/hooks/use-toast';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Options for error handler
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  silent?: boolean;
  actionText?: string;
  action?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Extracts error message from any error type
 */
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return String((error as ErrorResponse).message);
  }
  
  return fallbackMessage;
}

/**
 * Parses an error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "ERROR"
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR"
    };
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || "ERROR",
        details: (error as ErrorResponse).details
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
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
    logError = true,
    showToast = true,
    silent = false,
    actionText,
    action,
    onError
  } = options;
  
  // Skip if silent mode
  if (silent) return;
  
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
 * Creates a try-catch wrapper for async functions
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
