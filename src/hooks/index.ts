
// Re-export all hooks for easier imports
export { useToast } from '@/hooks/use-toast';
export { useUnifiedForm } from './form/useUnifiedForm';
export { useFormSubmission } from './useFormSubmission';
export { useFormSubmissionWithFeedback } from './useFormSubmissionWithFeedback';
export { enhancedUseFormSubmission } from './enhancedUseFormSubmission';
export { enhancedUseForm } from './enhancedUseForm';
export { useFormWithValidation } from './useFormWithValidation';
export { useIsComponentMounted } from './useIsComponentMounted';
export { useNotifications } from './use-notifications';
export { useErrorHandler } from './useErrorHandler';
export { useErrorBoundary, withErrorHandling } from './useErrorBoundary';
export { useDocumentManager } from '@/context/DocumentContext';

// Export error utilities for convenience
export {
  getErrorMessage,
  parseError,
  logError,
  handleError,
  withErrorHandling as withAsyncErrorHandling,
  tryCatch
} from '@/utils/errorHandling';

