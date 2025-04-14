
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
export { useErrorHandler } from '@/utils/errorHandling/useErrorHandler';
export { useErrorBoundary } from '@/utils/errorHandling/useErrorBoundary';
export { withErrorHandling } from '@/utils/errorHandling/withErrorHandling';
export { useDocumentManager } from '@/context/DocumentContext';

// Export error utilities
export { getErrorMessage, parseError, logError, createContextualError } from '@/utils/errorHandling/errorUtils';
export { handleError, withErrorHandling as withErrorHandlingFn } from '@/utils/errorHandling/withErrorHandling';
