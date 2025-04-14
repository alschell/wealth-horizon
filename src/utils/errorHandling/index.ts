
/**
 * Centralized export point for error handling utilities
 * This file unifies all error handling exports to prevent duplication
 */

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

// Re-export error boundary HOCs
export { 
  withErrorBoundary,
  withCustomErrorFallback
} from '@/components/shared/ErrorBoundary';

// Legacy utilities for backward compatibility
export {
  handleError as handleErrorLegacy,
  withErrorHandling as withErrorHandlingLegacy
} from './errorHandlingUtils';
