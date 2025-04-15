
/**
 * Core error handling utilities
 * This centralizes error handling logic for consistent error management
 */

import { toast } from '@/hooks/use-toast';
import { ErrorResponse, ErrorHandlerOptions } from '@/types/common';

/**
 * Extract a readable message from various error types
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
 * Parse an error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR'
    };
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || 'ERROR',
        details: (error as ErrorResponse).details
      };
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
}

/**
 * Log error details to the console
 */
export function logError(error: unknown, componentName?: string): void {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Create a descriptive error with component context
 */
export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

/**
 * Handle an error with consistent approach
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const { 
    componentName, 
    showToast = true, 
    logError: shouldLogError = true,
    rethrow = false,
    fallbackMessage = "An unexpected error occurred"
  } = options;
  
  // Parse error into standardized format
  const errorDetails = parseError(error);
  
  // Log error if requested
  if (shouldLogError) {
    logError(error, componentName);
  }
  
  // Show toast if requested
  if (showToast) {
    toast({
      title: "Error",
      description: errorDetails.message || fallbackMessage,
      variant: "destructive"
    });
  }
  
  // Rethrow if requested
  if (rethrow && error instanceof Error) {
    throw error;
  }
  
  return errorDetails;
}

/**
 * HOC to wrap a function with error handling
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
