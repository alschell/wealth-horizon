
/**
 * Core error handling utilities for consistent error management
 */

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
  originalError?: unknown;
  details?: Record<string, unknown>;
}

/**
 * Options for error handler
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  showToast?: boolean;
  logError?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Parse an error into a standardized format
 */
export const parseError = (error: unknown): ErrorResponse => {
  // Default error response
  const defaultResponse: ErrorResponse = {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR'
  };
  
  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR_MESSAGE'
    };
  }
  
  // Handle Error objects
  if (error instanceof Error) {
    return {
      message: error.message || defaultResponse.message,
      code: error.name || 'ERROR',
      originalError: error,
      // Use safer approach without Error.cause
      details: {
        stack: error.stack
      }
    };
  }
  
  // Handle API responses with error data (common format)
  if (error && typeof error === 'object') {
    const apiError = error as any;
    
    if (apiError.message) {
      return {
        message: apiError.message,
        code: apiError.code || apiError.error || 'API_ERROR',
        status: apiError.status || apiError.statusCode,
        originalError: error,
        details: apiError
      };
    }
  }
  
  return {
    ...defaultResponse,
    originalError: error
  };
};

/**
 * Get a human-readable error message
 */
export const getErrorMessage = (error: unknown, fallback = 'An error occurred'): string => {
  const parsedError = parseError(error);
  return parsedError.message || fallback;
};

/**
 * Handle an error with consistent approach
 */
export const handleError = (error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse => {
  const { fallbackMessage = 'An error occurred', logError = true, onError } = options;
  
  const parsedError = parseError(error);
  
  // Log error if requested
  if (logError) {
    console.error('Error:', parsedError.message, parsedError);
  }
  
  // Call provided error handler if available
  if (onError) {
    onError(error);
  }
  
  return parsedError;
};

/**
 * Create a reusable error handler with default options
 */
export const createErrorHandler = (defaultOptions: ErrorHandlerOptions = {}) => {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  };
};

/**
 * Create a contextualized error
 */
export const createContextualError = (context: string, originalError: unknown): Error => {
  const parsedError = parseError(originalError);
  const contextualError = new Error(`${context}: ${parsedError.message}`);
  return contextualError;
};

/**
 * Wrap a function with error handling
 */
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
};

/**
 * Try-catch wrapper for async functions
 */
export const tryCatch = async <T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
};
