
/**
 * Centralized export point for error handling utilities
 * This file unifies all error handling exports to prevent duplication
 */

// Re-export all core error handling utilities
export {
  parseError,
  handleError,
  getErrorMessage,
  createErrorHandler,
  createContextualError,
  withErrorHandling,
  tryCatch,
  type ErrorResponse,
  type ErrorHandlerOptions
} from './errorHandlingCore';

// Re-export error boundary HOCs from common components
export { 
  withErrorBoundary
} from '@/components/common/ErrorBoundary';

// Re-export error hook for functional components
export { useErrorHandler } from '@/hooks/useErrorHandler';
