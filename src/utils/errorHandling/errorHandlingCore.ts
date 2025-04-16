
/**
 * Core error handling utilities for consistent error management
 * throughout the application
 */

// Standard error response type
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
  context?: Record<string, any>;
  timestamp: string;
  path?: string;
}

export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  componentName?: string;
  logError?: boolean;
  showToast?: boolean;
  rethrow?: boolean;
  context?: Record<string, any>;
  onError?: (error: unknown) => void;
}

/**
 * Extract a readable error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (typeof error === 'object' && error !== null) {
    // @ts-ignore - Try to get message from object
    if (error.message) {
      // @ts-ignore
      return error.message;
    }
    // Return stringified object if no message property
    try {
      return JSON.stringify(error);
    } catch (e) {
      return 'Unknown error object';
    }
  }
  return 'An unknown error occurred';
}

/**
 * Parse any error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  const timestamp = new Date().toISOString();
  
  // Handle Error instances
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      details: error.stack,
      timestamp
    };
  }
  
  // Handle API error responses (assuming a common structure)
  if (typeof error === 'object' && error !== null) {
    // @ts-ignore - Check for common API error structures
    const apiMessage = error.message || error.error || error.errorMessage;
    // @ts-ignore
    const apiCode = error.code || error.status || error.statusCode;
    
    if (apiMessage) {
      return {
        message: apiMessage,
        code: apiCode?.toString(),
        // @ts-ignore
        details: error.details || error.data,
        timestamp
      };
    }
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      timestamp
    };
  }
  
  // Default fallback
  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    details: error,
    timestamp
  };
}

/**
 * Log an error with contextual information
 */
export function logError(
  error: unknown, 
  context: Record<string, any> = {}
): void {
  const parsedError = parseError(error);
  
  console.error(
    'Error:', 
    parsedError.message,
    '\nCode:', parsedError.code || 'N/A',
    '\nContext:', { ...parsedError.context, ...context },
    '\nDetails:', parsedError.details || 'N/A'
  );
}

/**
 * Create an error with additional context
 */
export function createContextualError(
  message: string, 
  context: Record<string, any> = {}
): Error {
  const error = new Error(message);
  // @ts-ignore - Add context to error
  error.context = context;
  return error;
}

/**
 * Universal error handler function
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const {
    fallbackMessage = 'An unexpected error occurred',
    componentName,
    logError: shouldLogError = true,
    showToast = false,
    rethrow = false,
    context = {},
    onError
  } = options;
  
  // Parse the error into a standard format
  const parsedError = parseError(error);
  
  // Add additional context
  parsedError.context = {
    ...parsedError.context,
    ...context,
    componentName
  };
  
  // Log the error if requested
  if (shouldLogError) {
    if (componentName) {
      console.error(`Error in ${componentName}:`, parsedError);
    } else {
      console.error('Error:', parsedError);
    }
  }
  
  // Show toast notification if requested
  if (showToast) {
    // This would typically call a toast notification function
    // You would implement this based on your UI library
    console.log('TOAST:', parsedError.message || fallbackMessage);
  }
  
  // Call onError callback if provided
  if (onError) {
    onError(error);
  }
  
  // Rethrow if requested
  if (rethrow) {
    throw error;
  }
  
  return parsedError;
}

/**
 * Higher-order function to wrap any function with error handling
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
 * Utility function for try/catch pattern
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
