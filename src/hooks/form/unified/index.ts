
/**
 * Unified form module
 * 
 * This module exports the unified form hook and related types.
 * It provides a complete solution for form state management,
 * validation, and submission.
 */

export { useUnifiedForm } from './useUnifiedForm';
export { useFormFieldHandlers } from '../handlers/useFormFieldHandlers';
export { useFormSubmission } from '../useFormSubmission';
export { useFormState } from '../useFormState';
export { useFormValidation } from '../useFormValidation';
export { useFormValidationUtils } from '../useFormValidationUtils';

// Only export types that don't conflict with the main types.ts
export type {
  UseUnifiedFormReturn,
  UseUnifiedFormProps
} from './types';

// Re-export utility functions
export * from './utils';
