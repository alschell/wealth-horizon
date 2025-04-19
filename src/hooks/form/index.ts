
/**
 * Form hooks module
 * 
 * This module exports all form-related hooks and utilities
 * for form state management, validation, and submission.
 */

// Re-export from unified module
export { useUnifiedForm } from './unified';
export { useFormFieldHandlers } from './handlers/useFormFieldHandlers';
export { useFormValidation } from './useFormValidation';
export { useFormValidationUtils } from './useFormValidationUtils';
export { useFormSubmission } from './useFormSubmission';

// Individual hooks for specific use cases
export { useFormState } from './useFormState';
export { useFormSubmissionState } from './submission/useFormSubmissionState';
export { useFormFields } from './useFormFields';

// Validators
export * from './validators';

// Types - directly export from types.ts to avoid conflicts with unified module
export type {
  FormFieldProps,
  UseUnifiedFormProps,
  UseUnifiedFormReturn
} from './types';
