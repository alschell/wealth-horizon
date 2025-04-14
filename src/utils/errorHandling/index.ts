
// Re-export all core error handling utilities
export {
  getErrorMessage,
  parseError,
  logError,
  createContextualError,
  handleError,
  withErrorHandling,
  tryCatch,
  type ErrorResponse,
  type ErrorHandlerOptions
} from './errorHandlingCore';

// For backward compatibility
export {
  handleError as handleErrorLegacy,
  withErrorHandling as withErrorHandlingLegacy
} from './errorHandlingUtils';
