
/**
 * Error Handling Module
 * 
 * Provides a unified API for error handling across the application.
 * Includes utilities for parsing, logging, and displaying errors.
 */

// Core error types and interfaces
export type { 
  ErrorResponse,
  ErrorHandlerOptions,
  BaseErrorOptions
} from './types/core';

// Additional types
export * from './types';

// Error utilities for parsing, formatting, and logging errors
export { 
  getErrorMessage,
  parseError,
  logError,
  createContextualError,
  formatErrorDetails,
  isApiErrorResponse
} from './errorUtils';

// Error handling functions
export {
  handleError,
  createErrorHandler
} from './core';

export {
  withErrorCatch,
  tryCatch,
  handleWithTry
} from './errorHandlingUtils';

// React hooks for error handling
export { useErrorHandler } from './useErrorHandler';

// Higher order components for error boundaries
export {
  withErrorHandling,
  withCustomErrorFallback
} from './withErrorHandling';
