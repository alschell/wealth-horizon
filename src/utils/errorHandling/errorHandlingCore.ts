
/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  silent?: boolean;
  logToConsole?: boolean;
  showToast?: boolean;
  toastTitle?: string;
  fallbackMessage?: string;
  onError?: (error: unknown) => void;
  componentName?: string;
  logError?: boolean;
}

/**
 * Get a readable message from any error type
 */
export function getErrorMessage(error: unknown, fallbackMessage: string = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as any).message);
  }
  
  return fallbackMessage;
}

/**
 * Parse an error into a standard format
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR'
    };
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error) {
      return {
        message: String((error as any).message),
        code: (error as any).code || 'ERROR',
        details: (error as any).details
      };
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
}

/**
 * Logs error details to the console
 */
export function logError(error: unknown, componentName?: string): void {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Creates a descriptive error with component context
 */
export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

/**
 * Handle an error with standardized approach
 */
export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const parsedError = parseError(error);
  
  if (options.logToConsole !== false) {
    console.error('[Error Handler]:', parsedError);
  }
  
  if (options.onError) {
    options.onError(error);
  }
  
  return parsedError;
}

/**
 * Wraps an async function with error handling
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
 * Safely executes a function with error handling
 */
export function tryCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  return Promise.resolve().then(async () => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  });
}

