
/**
 * Utility functions for consistent error handling
 */

/**
 * Extracts a readable message from various error types
 */
export function getErrorMessage(error: unknown, fallbackMessage: string = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as {message: unknown}).message);
  }
  
  return fallbackMessage;
}

/**
 * Standardized error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Parses an error into a standardized format
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
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || 'ERROR',
        details: (error as ErrorResponse).details
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
