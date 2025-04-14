
/**
 * Core error handling utilities for standardized error management
 */

import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  cause?: Error;
}

/**
 * Options for error handler
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  silent?: boolean;
  context?: string;
  captureException?: boolean;
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
  
  if (error && typeof error === "object") {
    if ('message' in error) {
      return String((error as ErrorResponse).message);
    }
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return firstError ? `Validation error: ${firstError.message}` : 'Validation failed';
    }
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
      cause: error
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR_STRING"
    };
  }
  
  if (error && typeof error === "object") {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error.errors.reduce((acc, curr) => {
          const path = curr.path.join('.');
          acc[path] = curr.message;
          return acc;
        }, {} as Record<string, string>)
      };
    }
    
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || "ERROR_OBJECT",
        details: (error as ErrorResponse).details,
        cause: (error as ErrorResponse).cause
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}

/**
 * Logs error details to the console
 */
export function logError(error: unknown, componentName?: string): void {
  const errorDetails = parseError(error);
  
  console.error(
    `Error${componentName ? ` in ${componentName}` : ''}:`, 
    {
      message: errorDetails.message,
      code: errorDetails.code,
      details: errorDetails.details
    }
  );
  
  if (errorDetails.cause && errorDetails.cause.stack) {
    console.error('Stack trace:', errorDetails.cause.stack);
  } else if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Creates a contextual error with component context
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
    showToast: shouldShowToast = true,
    silent = false,
    context,
    actionText,
    action,
    onError
  } = options;
  
  // Parse error details
  const errorDetails = parseError(error);
  const errorMessage = errorDetails.message || fallbackMessage;
  
  // Add context to error if provided
  if (context && !errorDetails.message.includes(`[${context}]`)) {
    errorDetails.message = `[${context}] ${errorDetails.message}`;
  }
  
  // Log error to console if enabled
  if (shouldLogError && !silent) {
    console.error("Error:", {
      message: errorMessage,
      code: errorDetails.code,
      details: errorDetails.details,
      context,
      original: error
    });
  }
  
  // Show toast notification if enabled and not silent
  if (shouldShowToast && !silent) {
    toast({
      title: context ? `Error in ${context}` : "Error",
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
 * Higher-order function to wrap components with error handling
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
 * Try-catch utility for async functions
 */
export function tryCatch<T>(
  promise: Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<[T, null] | [null, ErrorResponse]> {
  return promise
    .then((data) => [data, null] as [T, null])
    .catch((error) => {
      const errorResponse = handleError(error, options);
      return [null, errorResponse] as [null, ErrorResponse];
    });
}
