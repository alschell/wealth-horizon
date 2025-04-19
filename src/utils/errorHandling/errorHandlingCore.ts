
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
  /** Whether to suppress normal error handling behavior */
  silent?: boolean;
  /** Additional context information to include with the error */
  context?: Record<string, unknown>;
  /** Whether to show a toast notification for this error */
  showToast?: boolean;
  /** Whether to log this error to the console */
  logToConsole?: boolean;
  /** Whether to re-throw the error after handling */
  rethrow?: boolean;
  /** Custom fallback message to use if error doesn't have one */
  fallbackMessage?: string;
  /** Legacy property - use logToConsole instead */
  logError?: boolean;
  /** Optional callback to execute when error occurs */
  onError?: (error: unknown) => void;
}

/**
 * Parse any error into a standardized error response
 * @param error - The error to parse
 * @returns A standardized error response object
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
 * @param error - The error to handle
 * @param options - Error handling options
 * @returns Parsed error response
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
 * @param error - The error to extract a message from
 * @returns A human-readable error message string
 */
export function getErrorMessage(error: unknown): string {
  return parseError(error).message;
}

/**
 * Create a contextual error with additional information
 * @param message - The error message
 * @param originalError - The original error that caused this one
 * @param context - Additional context information
 * @returns A new Error object with additional context
 */
export function createContextualError(message: string, originalError?: unknown, context?: Record<string, unknown>): Error {
  const contextualError = new Error(message);
  
  // Using TypeScript ignore to handle the Error.cause compatibility issue
  // Error.cause was added in ES2022 but TypeScript may target an earlier version
  if (originalError) {
    // @ts-ignore - Error.cause is available in modern browsers and Node.js
    contextualError.cause = originalError;
  }
  
  if (context) {
    (contextualError as any).context = context;
  }
  
  return contextualError;
}

/**
 * Create an error handler function with default options
 * @param defaultOptions - Default options to use for all errors
 * @returns A configured error handler function
 */
export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  };
}

/**
 * Wrap an async function with error handling
 * @param fn - The async function to wrap
 * @param options - Error handling options
 * @returns A new function that handles errors
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
 * @param fn - The function to execute
 * @param options - Error handling options
 * @returns The result of the function or undefined if it throws
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
 * @param error - The error to log
 * @param context - Additional context information
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
