
import { toast } from 'sonner';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ErrorHandlerOptions {
  componentName?: string;
  showToast?: boolean;
  logError?: boolean;
  context?: Record<string, unknown>;
}

/**
 * Extracts a human-readable message from different error types
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  
  return 'An unknown error occurred';
}

/**
 * Parses an error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.stack
    };
  }
  
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as any;
    return {
      message: errorObj.message || 'Unknown error',
      code: errorObj.code || errorObj.statusCode,
      details: errorObj
    };
  }
  
  return {
    message: typeof error === 'string' ? error : 'Unknown error'
  };
}

/**
 * Logs an error to the console with additional context
 */
export function logError(error: unknown, context: Record<string, unknown> = {}): void {
  const parsedError = parseError(error);
  console.error('Error:', parsedError.message, {
    code: parsedError.code,
    details: parsedError.details,
    ...context
  });
}

/**
 * Creates a contextualized error with component information
 */
export function createContextualError(originalError: unknown, componentName: string): Error {
  const message = getErrorMessage(originalError);
  const contextualError = new Error(`Error in ${componentName}: ${message}`);
  
  if (originalError instanceof Error) {
    contextualError.stack = originalError.stack;
  }
  
  return contextualError;
}

/**
 * Unified error handler that logs errors and optionally shows a toast notification
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): void {
  const { componentName, showToast = true, logError: shouldLogError = true, context = {} } = options;
  
  // Add component information to the context if provided
  const errorContext = componentName ? { ...context, component: componentName } : context;
  
  // Always log the error unless explicitly disabled
  if (shouldLogError) {
    logError(error, errorContext);
  }
  
  // Show a toast notification if enabled
  if (showToast) {
    const message = getErrorMessage(error);
    toast.error(componentName 
      ? `Error in ${componentName}: ${message}` 
      : message
    );
  }
}

/**
 * Higher-order function that wraps a function with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args);
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
}

/**
 * Utility function for try/catch pattern with standardized error handling
 */
export async function tryCatch<T>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    if (typeof promiseOrFn === 'function') {
      return await promiseOrFn();
    }
    return await promiseOrFn;
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
}
