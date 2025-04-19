
/**
 * Core error handling utilities
 * Provides standardized error parsing, handling, and utility functions
 */

/**
 * Error response type returned by error handling functions
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  originalError?: unknown;
  context?: Record<string, unknown>;
}

/**
 * Options for error handling functions
 */
export interface ErrorHandlerOptions {
  silent?: boolean;
  context?: Record<string, unknown>;
  showToast?: boolean;
  logToConsole?: boolean;
  rethrow?: boolean;
  fallbackMessage?: string;
  logError?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Parse any error into a standardized error response
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      originalError: error,
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
    };
  }
  
  if (error && typeof error === 'object') {
    // Handle API error responses
    if ('message' in error && typeof error.message === 'string') {
      return {
        message: error.message,
        code: 'code' in error ? String(error.code) : undefined,
        originalError: error,
      };
    }
  }
  
  return {
    message: 'An unknown error occurred',
    originalError: error,
  };
}

/**
 * Standard error handler function
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const { 
    silent = false, 
    logToConsole = true, 
    fallbackMessage = 'An unexpected error occurred' 
  } = options;
  const parsedError = parseError(error);
  
  if (logToConsole) {
    console.error('Error:', parsedError.message, parsedError.originalError);
  }
  
  if (options.context) {
    parsedError.context = options.context;
  }
  
  if (options.rethrow) {
    throw error;
  }
  
  return parsedError;
}

/**
 * Get a human-readable error message from any error
 */
export function getErrorMessage(error: unknown): string {
  return parseError(error).message;
}

/**
 * Create a contextual error with additional information
 */
export function createContextualError(message: string, originalError?: unknown, context?: Record<string, unknown>): Error {
  const contextualError = new Error(message);
  // Using optional chaining to avoid the Error.cause compatibility issue
  if (originalError) {
    // @ts-ignore - Ignore the TypeScript error for Error.cause
    contextualError.cause = originalError;
  }
  if (context) {
    (contextualError as any).context = context;
  }
  return contextualError;
}

/**
 * Create an error handler function with default options
 */
export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  };
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
      
      if (options.rethrow) {
        throw error;
      }
      
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
    
    if (options.rethrow) {
      throw error;
    }
    
    return undefined;
  }
}

/**
 * Log an error with standardized format
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  const parsedError = parseError(error);
  
  if (context) {
    parsedError.context = context;
  }
  
  console.error('[ERROR]', parsedError.message, {
    code: parsedError.code,
    context: parsedError.context,
    error: parsedError.originalError
  });
}
