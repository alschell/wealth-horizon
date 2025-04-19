
/**
 * Error Handling Utilities
 * 
 * This module exports a unified API for error handling across the application.
 * It provides utilities for logging, displaying, and managing errors.
 */

// Error utilities
export { 
  logError,
  createContextualError,
  type ErrorResponse,
  getErrorMessage,
  parseError
} from './errorUtils';

// Error boundaries and components
export {
  withErrorHandling,
  withCustomErrorFallback
} from './withErrorHandling';

// Function wrappers and handlers
export {
  handleError,
  type ErrorHandlerOptions,
  withErrorCatch
} from './errorHandlingUtils';

// React hooks
export { useErrorHandler } from './useErrorHandler';
