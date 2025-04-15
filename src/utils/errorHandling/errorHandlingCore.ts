
/**
 * Core error handling utilities
 * This centralizes error handling logic for consistent error management
 */

import { toast } from '@/hooks/use-toast';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  timestamp?: string;
  source?: string;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  componentName?: string;
  showToast?: boolean;
  logError?: boolean;
  rethrow?: boolean;
  fallbackMessage?: string;
  silent?: boolean;
  logToConsole?: boolean;
  toastTitle?: string;
  onError?: (error: unknown) => void;
}

/**
 * Extract a readable message from various error types
 * @param error - The error to parse
 * @param fallbackMessage - Fallback message if error can't be parsed
 * @returns A human-readable error message
 */
export function getErrorMessage(error: unknown, fallbackMessage: string = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as {message: unknown}).message);
  }
  
  return fallbackMessage;
}

/**
 * Type guard to check if an object is an Error
 * @param error - The error to check
 * @returns True if the object is an Error instance
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Type guard to check if an object is a structured error response
 * @param error - The error to check
 * @returns True if the object matches our ErrorResponse interface
 */
export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === 'object' && 
    error !== null && 
    'message' in error &&
    typeof (error as ErrorResponse).message === 'string'
  );
}

/**
 * Parse an error into a standardized format
 * @param error - The error to parse
 * @returns A standardized error response object
 */
export function parseError(error: unknown): ErrorResponse {
  // Use the type guards to provide more specific type information
  if (isError(error)) {
    return {
      message: error.message,
      code: error.name,
      timestamp: new Date().toISOString(),
      details: {
        stack: error.stack
      }
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR',
      timestamp: new Date().toISOString()
    };
  }
  
  if (isErrorResponse(error)) {
    return {
      ...error,
      timestamp: error.timestamp || new Date().toISOString()
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    timestamp: new Date().toISOString()
  };
}

/**
 * Log error details to the console with improved formatting
 * @param error - The error to log
 * @param componentName - Optional source component name
 */
export function logError(error: unknown, componentName?: string): void {
  const errorDetails = parseError(error);
  const prefix = componentName ? `[${componentName}]` : '';
  
  console.error(`${prefix} Error:`, {
    message: errorDetails.message,
    code: errorDetails.code,
    details: errorDetails.details,
    timestamp: errorDetails.timestamp,
    originalError: error
  });
  
  if (isError(error) && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Create a descriptive error with component context
 * @param message - The error message
 * @param componentName - The component name
 * @returns A new Error with contextualized message
 */
export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

/**
 * Handle an error with consistent approach
 * @param error - The error to handle
 * @param options - Error handling options
 * @returns Parsed error details
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const { 
    componentName, 
    showToast = true, 
    logError: shouldLogError = true,
    rethrow = false,
    fallbackMessage = "An unexpected error occurred",
    onError,
    silent = false,
    toastTitle = "Error"
  } = options;
  
  // Skip processing if silent mode is enabled
  if (silent) {
    return parseError(error);
  }
  
  // Parse error into standardized format
  const errorDetails = parseError(error);
  
  // Add source information if component name is provided
  if (componentName) {
    errorDetails.source = componentName;
  }
  
  // Log error if requested
  if (shouldLogError) {
    logError(error, componentName);
  }
  
  // Show toast if requested
  if (showToast) {
    toast({
      title: toastTitle,
      description: errorDetails.message || fallbackMessage,
      variant: "destructive"
    });
  }
  
  // Call onError if provided
  if (onError) {
    onError(error);
  }
  
  // Rethrow if requested
  if (rethrow && isError(error)) {
    throw error;
  }
  
  return errorDetails;
}

/**
 * HOC to wrap a function with error handling
 * @param fn - The function to wrap
 * @param options - Error handling options
 * @returns A wrapped function with error handling
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
 * Try-catch wrapper with standardized error handling
 * @param fn - The function to execute
 * @param options - Error handling options
 * @returns The function result or undefined if an error occurred
 */
export async function tryCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
}
