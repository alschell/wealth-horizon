
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
export { useErrorBoundary } from './useErrorBoundary';
export { useDocumentManager } from '@/context/DocumentContext';

// Add the new validated form hook
export { useValidatedForm } from './useValidatedForm';

// Using withErrorHandling from useErrorBoundary
export { withErrorHandling } from './useErrorBoundary';

// Export error utilities for convenience
export {
  parseError,
  logError,
  handleError,
  tryCatch
} from '@/utils/errorHandling';

// Export all market data hooks for convenience
export {
  useQuote,
  useMarketNews,
  useCompanyNews,
  useSymbolSearch,
  useIndices,
  useCandleData,
  useMarketDataRefresh,
  formatQuote,
  refreshMarketData
} from './market-data';
