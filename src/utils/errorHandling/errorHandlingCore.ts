
import { toast } from 'sonner';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  original?: unknown;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  silent?: boolean;
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
  componentName?: string;
  onError?: (error: unknown) => void;
}

/**
 * Parse an error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  // If it's already our ErrorResponse type, return it
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error as ErrorResponse;
  }
  
  // If it's a standard Error object
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      original: error
    };
  }
  
  // If it's a string
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'STRING_ERROR'
    };
  }
  
  // Unknown error type
  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    original: error
  };
}

/**
 * Log an error to the console with additional context
 */
export function logError(error: unknown, context?: string): ErrorResponse {
  const parsedError = parseError(error);
  
  console.error(
    `[Error${context ? ` in ${context}` : ''}]:`, 
    parsedError.message,
    parsedError.original || ''
  );
  
  return parsedError;
}

/**
 * Create a contextual error with additional information
 */
export function createContextualError(
  originalError: unknown, 
  contextMessage: string
): Error {
  const parsedError = parseError(originalError);
  const newError = new Error(`${contextMessage}: ${parsedError.message}`);
  newError.name = parsedError.code || 'ContextualError';
  
  // Preserve the original stack trace if possible
  if (originalError instanceof Error) {
    newError.stack = originalError.stack;
  }
  
  return newError;
}

/**
 * Handle an error with standardized approach
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const {
    silent = false,
    showToast = !silent,
    logError: shouldLogError = !silent,
    fallbackMessage = 'An unexpected error occurred',
    componentName,
    onError
  } = options;
  
  // Parse the error
  const parsedError = parseError(error);
  
  // Log to console if enabled
  if (shouldLogError) {
    logError(error, componentName);
  }
  
  // Show toast notification if enabled
  if (showToast) {
    toast.error(parsedError.message || fallbackMessage);
  }
  
  // Execute custom error handler if provided
  if (onError) {
    onError(error);
  }
  
  return parsedError;
}

/**
 * Wrap an async function with error handling
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
 * Execute a function with try-catch and standardized error handling
 */
export function tryCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    const result = fn();
    return result instanceof Promise 
      ? result.catch(error => {
          handleError(error, options);
          return undefined;
        })
      : Promise.resolve(result);
  } catch (error) {
    handleError(error, options);
    return Promise.resolve(undefined);
  }
}
