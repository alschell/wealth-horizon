
/**
 * Types for form submission handling
 */

/**
 * Options for form submission handler creation
 */
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateForm?: () => Promise<boolean> | boolean;
  resetForm?: () => void;
}

/**
 * Form submission state 
 */
export interface FormSubmissionState {
  isSubmitting: boolean;
  lastError: string | null;
  isSuccess: boolean;
}

/**
 * Return type for useFormControls hook
 */
export interface UseFormControlsReturn<T> {
  formSubmissionState: FormSubmissionState;
  resetState: () => void;
  createSubmitHandler: (
    onSubmit: (data: T) => Promise<void> | void,
    options?: FormSubmissionOptions<T>
  ) => (data: T) => Promise<void>;
}
