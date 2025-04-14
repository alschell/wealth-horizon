
import { AppError, APIError, ValidationError, AuthError, NotFoundError, PermissionError } from './errorTypes';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  componentName?: string;
  logError?: boolean;
  showToast?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Get a standardized error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
}

/**
 * Parse an error into a standardized format
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error instanceof APIError ? { endpoint: error.endpoint } :
               error instanceof ValidationError ? { field: error.field } :
               error instanceof NotFoundError || error instanceof PermissionError ? 
               { resource: error.resource } : undefined
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  } else if (typeof error === 'string') {
    return {
      message: error,
      code: 'STRING_ERROR'
    };
  } else {
    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
}

/**
 * Log an error to the console with additional context
 */
export function logError(error: unknown, context?: Record<string, any>): void {
  const parsedError = parseError(error);
  
  console.error('Application Error:', {
    ...parsedError,
    ...(context ? { context } : {}),
    originalError: error,
    timestamp: new Date().toISOString()
  });
}

/**
 * Create an error with additional context
 */
export function createContextualError(
  originalError: unknown,
  context: string,
  options: { preserveStack?: boolean } = {}
): Error {
  const message = `${context}: ${getErrorMessage(originalError)}`;
  
  if (originalError instanceof Error && options.preserveStack) {
    originalError.message = message;
    return originalError;
  }
  
  return new Error(message);
}

/**
 * Unified error handler
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): void {
  const {
    fallbackMessage = 'An error occurred',
    componentName,
    logError: shouldLogError = true,
    showToast = true,
    onError
  } = options;
  
  const errorMessage = getErrorMessage(error) || fallbackMessage;
  
  // Log error if requested
  if (shouldLogError) {
    logError(error, { componentName });
  }
  
  // Show toast if requested
  if (showToast) {
    // Import dynamically to avoid circular dependencies
    import('@/utils/toast').then(({ showError }) => {
      showError('Error', errorMessage);
    }).catch(() => {
      // If toast module fails to load, fallback to console
      console.error('Failed to show error toast:', errorMessage);
    });
  }
  
  // Call custom error handler if provided
  if (onError) {
    onError(error);
  }
}

/**
 * Higher-order function for wrapping functions with error handling
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    try {
      const result = fn(...args);
      
      // Handle promises
      if (result instanceof Promise) {
        return result.catch(error => {
          handleError(error, options);
          throw error; // Re-throw to maintain promise rejection
        }) as ReturnType<T>;
      }
      
      return result;
    } catch (error) {
      handleError(error, options);
      throw error; // Re-throw to maintain original behavior
    }
  };
}

/**
 * Utility for try/catch patterns
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
}

// Re-export error types for convenience
export * from './errorTypes';
