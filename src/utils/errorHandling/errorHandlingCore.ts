
/**
 * Core error handling utilities for the application
 */

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  stack?: string;
  timestamp?: number;
  source?: string;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  /** Whether to suppress error notifications */
  silent?: boolean;
  /** Text for action button in error notification */
  actionText?: string;
  /** Function to call when action button is clicked */
  action?: () => void;
  /** Fallback message when error details can't be extracted */
  fallbackMessage?: string;
  /** Component or feature name where error occurred */
  componentName?: string;
  /** Whether to log error to console */
  logError?: boolean;
  /** Whether to show error toast */
  showToast?: boolean;
  /** Whether to include stack trace in error details */
  includeStack?: boolean;
  /** Additional error context */
  context?: Record<string, any>;
}

/**
 * Parse any error into a standardized error response
 * @param error - The error to parse
 * @param options - Additional parsing options
 * @returns Standardized error response
 */
export function parseError(
  error: unknown, 
  options: { includeStack?: boolean, context?: Record<string, any> } = {}
): ErrorResponse {
  const { includeStack = false, context } = options;
  const timestamp = Date.now();
  
  // Handle Error instances
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      stack: includeStack ? error.stack : undefined,
      timestamp,
      details: context
    };
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR',
      timestamp,
      details: context
    };
  }
  
  // Handle error-like objects with message property
  if (error && typeof error === 'object') {
    if ('message' in error) {
      const errorObj = error as Record<string, any>;
      return {
        message: String(errorObj.message),
        code: 'code' in errorObj ? String(errorObj.code) : 'ERROR',
        details: {
          ...('details' in errorObj ? errorObj.details : {}),
          ...context
        },
        stack: includeStack && 'stack' in errorObj ? String(errorObj.stack) : undefined,
        timestamp
      };
    }
    
    // Handle unknown object errors by converting to string
    try {
      return {
        message: JSON.stringify(error),
        code: 'UNKNOWN_ERROR',
        timestamp,
        details: context
      };
    } catch {
      return {
        message: 'Unknown error object (cannot stringify)',
        code: 'UNKNOWN_ERROR',
        timestamp,
        details: context
      };
    }
  }
  
  // Handle all other cases
  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    timestamp,
    details: context
  };
}

/**
 * Handle an error with standardized approach
 * @param error - The error to handle
 * @param options - Error handling options
 * @returns Parsed error details
 */
export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): ErrorResponse {
  const {
    silent = false,
    logError = true,
    componentName,
    includeStack = false,
    context
  } = options;
  
  // Parse error into standard format
  const errorDetails = parseError(error, { includeStack, context });
  
  // Add source information if provided
  if (componentName) {
    errorDetails.source = componentName;
  }
  
  // Log error to console if not silenced
  if (logError && !silent) {
    console.error(
      `Error${componentName ? ` in ${componentName}` : ''}:`,
      errorDetails.message,
      errorDetails
    );
  }
  
  return errorDetails;
}

/**
 * Create a function that handles errors in a standardized way
 * @param defaultOptions - Default error handling options
 * @returns Error handler function
 */
export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  };
}

/**
 * Create a wrapper that handles errors for async functions
 * @param errorHandler - Error handler function
 * @returns Function wrapper
 */
export function createErrorHandlerWrapper(errorHandler: typeof handleError) {
  return function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ) {
    return async function(...args: Parameters<T>): Promise<ReturnType<T> | undefined> {
      try {
        return await fn(...args);
      } catch (error) {
        errorHandler(error, options);
        return undefined;
      }
    };
  };
}
