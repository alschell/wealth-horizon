
/**
 * Form hooks index file
 * Centralizes exports for form-related hooks and utilities
 */

// Export form state management
export { useFormState } from './useFormState';

// Export form field handlers
export { useFormFields } from './useFormFields';

// Export form submission utilities
export { 
  useFormSubmission,
  type FormSubmissionState,
  type FormSubmissionOptions
} from './useFormSubmission';

// Export form validation utilities
export { useFormValidation } from './useFormValidation';

// Export unified form hook
export { useUnifiedForm } from './useUnifiedForm';
export type { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';

// Export other form utilities
export { createInitialFormState } from './useFormState';
export { useFormValidationUtils } from './useFormValidationUtils';
