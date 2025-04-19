
import { toast } from "@/hooks/use-toast";

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  status?: number;
  originalError?: unknown;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  componentName?: string;
  silent?: boolean;
  logError?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  fallbackMessage?: string;
  reportError?: boolean;
  onError?: (error: ErrorResponse) => void;
}

/**
 * Default error handler options
 */
const DEFAULT_OPTIONS: ErrorHandlerOptions = {
  silent: false,
  logError: true,
  showToast: true,
  toastTitle: 'Error',
  fallbackMessage: 'An unexpected error occurred',
  reportError: false
};

/**
 * Parse an error into a standardized format
 * @param error Any error object or value
 * @returns Standardized error response
 */
export function parseError(error: unknown): ErrorResponse {
  // Already in our format
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: String((error as ErrorResponse).message),
      code: (error as ErrorResponse).code,
      details: (error as ErrorResponse).details,
      status: (error as ErrorResponse).status,
      originalError: error
    };
  }
  
  // Standard Error object
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      status: error.cause && typeof error.cause === 'object' && 'status' in error.cause
        ? Number((error.cause as any).status)
        : undefined,
      originalError: error
    };
  }
  
  // String error
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR'
    };
  }
  
  // Unknown error format
  return {
    message: DEFAULT_OPTIONS.fallbackMessage!,
    code: 'UNKNOWN_ERROR',
    originalError: error
  };
}

/**
 * Handle an error with standardized approach
 * @param error Any error to handle
 * @param options Error handling options
 * @returns Parsed error response
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const parsedError = parseError(error);
  
  // Context information for logging
  const context = opts.componentName ? `[${opts.componentName}]` : '';
  
  // Log error to console if enabled
  if (opts.logError && !opts.silent) {
    console.error(`${context} Error:`, parsedError.message, parsedError.originalError || '');
  }
  
  // Show toast notification if enabled
  if (opts.showToast && !opts.silent) {
    toast({
      title: opts.toastTitle!,
      description: parsedError.message,
      variant: "destructive"
    });
  }
  
  // Call custom error handler if provided
  if (opts.onError) {
    opts.onError(parsedError);
  }
  
  return parsedError;
}

/**
 * Create a contextual error handler with pre-configured options
 * @param defaultOptions Default options for this error handler
 * @returns Specialized error handler function
 */
export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => 
    handleError(error, { ...defaultOptions, ...options });
}

/**
 * Get a human-readable message from an error
 * @param error Any error object or value
 * @returns Error message string
 */
export function getErrorMessage(error: unknown): string {
  return parseError(error).message;
}

/**
 * Wrap an async function with error handling
 * @param fn Async function to wrap
 * @param options Error handling options
 * @returns Wrapped function that handles errors
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
 * Create an error with additional context
 * @param message Error message
 * @param details Additional error details
 * @returns Error object with context
 */
export function createContextualError(
  message: string,
  details?: Record<string, any>
): Error & { details?: Record<string, any> } {
  const error = new Error(message) as Error & { details?: Record<string, any> };
  if (details) {
    error.details = details;
  }
  return error;
}

/**
 * Try-catch wrapper for async functions
 * @param fn Function to execute
 * @param options Error handling options
 * @returns Result of the function or undefined if error
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
