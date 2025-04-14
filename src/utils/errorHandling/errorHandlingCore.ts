
import { toast } from '@/hooks/use-toast';
import { ReactNode } from 'react';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  timestamp?: string;
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
  componentName?: string;
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
      code: error.name,
      timestamp: new Date().toISOString()
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR_STRING",
      timestamp: new Date().toISOString()
    };
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || "ERROR_OBJECT",
        details: (error as ErrorResponse).details,
        timestamp: new Date().toISOString()
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
    timestamp: new Date().toISOString()
  };
}

/**
 * Logs error details to the console
 */
export function logError(error: unknown, componentName?: string): void {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Creates a descriptive error with component context
 */
export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

/**
 * Unified error handling function
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logError: shouldLogError = true,
    showToast = true,
    silent = false,
    actionText,
    action,
    onError,
    componentName
  } = options;
  
  // Get error message
  const errorMessage = getErrorMessage(error, fallbackMessage);
  
  // Parse error details
  const errorDetails = parseError(error);
  
  // Log error to console if enabled
  if (shouldLogError && !silent) {
    logError(error, componentName);
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
  
  return errorDetails;
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

/**
 * Try-catch helper for async operations
 */
export async function tryCatch<T>(
  operation: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
}

