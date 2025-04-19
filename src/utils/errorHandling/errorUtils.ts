
import { ErrorResponse } from './types/core';

/**
 * Extracts a human-readable message from any error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as any).message);
  }
  
  return 'An unexpected error occurred';
}

/**
 * Logs an error to the console with context
 */
export function logError(error: unknown, componentName?: string): void {
  console.error(`[${componentName || 'Error'}]`, error);
}

/**
 * Creates a contextual error with additional metadata
 */
export function createContextualError(
  message: string, 
  context: Record<string, unknown> = {}
): Error {
  const error = new Error(message);
  Object.assign(error, { context });
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
export function isApiErrorResponse(obj: unknown): obj is ErrorResponse {
  return Boolean(
    obj &&
    typeof obj === 'object' &&
    'message' in obj &&
    typeof (obj as ErrorResponse).message === 'string'
  );
}
