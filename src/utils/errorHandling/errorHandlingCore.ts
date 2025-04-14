
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
