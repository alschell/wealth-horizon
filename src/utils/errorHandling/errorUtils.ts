
/**
 * Extracts a human-readable message from any error
 */
export function getErrorMessage(error: unknown, fallbackMessage?: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as any).message);
  }
  
  return fallbackMessage || 'An unexpected error occurred';
}

/**
 * Parse any error into a standardized format
 */
export function parseError(error: unknown): {
  message: string;
  code: string;
  details?: Record<string, unknown>;
  originalError?: unknown;
} {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      details: { stack: error.stack },
      originalError: error
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'STRING_ERROR'
    };
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error) {
      const errorObj = error as any;
      return {
        message: String(errorObj.message),
        code: errorObj.code || 'OBJECT_ERROR',
        details: errorObj,
        originalError: error
      };
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    originalError: error
  };
}

/**
 * Logs an error to the console with context
 */
export function logError(error: unknown, componentName?: string): void {
  const prefix = componentName ? `Error in ${componentName}:` : `Error:`;
  console.error(prefix, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Creates a contextual error with additional metadata
 */
export function createContextualError(
  message: string, 
  context: Record<string, unknown> | string = {}
): Error {
  const error = new Error(
    typeof context === 'string' 
      ? `[${context}] ${message}` 
      : message
  );
  
  if (typeof context !== 'string') {
    Object.assign(error, { context });
  }
  
  return error;
}

/**
 * Formats error details for display
 */
export function formatErrorDetails(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}${error.stack ? `\n${error.stack}` : ''}`;
  }
  
  return String(error);
}

/**
 * Checks if an object is an API error response
 */
export function isApiErrorResponse(obj: unknown): obj is {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
} {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    'message' in obj &&
    typeof (obj as { message: unknown }).message === 'string'
  );
}
