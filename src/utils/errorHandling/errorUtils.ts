
import { ErrorResponse } from './types';

/**
 * Extracts error message from any error type
 * @param error - The error to extract a message from
 * @param fallbackMessage - Default message if none can be extracted
 * @returns A human-readable error message
 */
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return String((error as ErrorResponse).message);
  }
  
  return fallbackMessage;
}

/**
 * Parses an error into a standardized format
 * @param error - The error to parse
 * @returns A standardized error response object
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      details: { stack: error.stack }
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR_STRING"
    };
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as any).code || "ERROR_OBJECT",
        details: (error as any).details
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}

/**
 * Logs an error to the console with optional component context
 * @param error - The error to log
 * @param componentName - Optional component name for context
 */
export function logError(error: unknown, componentName?: string): void {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  if (error instanceof Error) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Creates an error with component context in the message
 * @param message - The base error message
 * @param componentName - The component name to include
 * @returns A new Error with context
 */
export function createContextualError(message: string, componentName: string): Error {
  return new Error(`[${componentName}] ${message}`);
}

/**
 * Format error details for display
 * @param error - The error to format
 * @returns Formatted error details as a string
 */
export function formatErrorDetails(error: unknown): string {
  if (error instanceof Error) {
    return error.stack || error.message;
  }
  
  return JSON.stringify(error, null, 2);
}

/**
 * Check if an object is an API error response
 * @param obj - The object to check
 * @returns Whether the object matches the API error format
 */
export function isApiErrorResponse(obj: unknown): obj is ErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as ErrorResponse).message === 'string'
  );
}
