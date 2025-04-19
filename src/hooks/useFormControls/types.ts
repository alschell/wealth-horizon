
import { FormSubmissionState } from '../form/submission/types';

/**
 * Options for form submission
 */
export interface FormSubmissionOptions<T> {
  /** Callback executed after successful submission */
  onSuccess?: () => void;
  
  /** Callback executed when an error occurs */
  onError?: (error: unknown) => void;
  
  /** Success message to display */
  successMessage?: string;
  
  /** Error message to display on failure */
  errorMessage?: string;
  
  /** Whether to reset form state after submission */
  resetAfterSubmit?: boolean;
  
  /** Function to validate form before submission */
  validateForm?: (data: T) => boolean | Promise<boolean>;
}

/**
 * Form submission state
 */
export interface FormSubmissionState {
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  
  /** Last error message from failed submission */
  lastError: string | null;
  
  /** Whether the last submission was successful */
  isSuccess: boolean;
}

/**
 * Return type for the useFormControls hook
 */
export interface UseFormControlsReturn<T> {
  formSubmissionState: FormSubmissionState;
  resetState: () => void;
  createSubmitHandler: (
    onSubmit: (data: T) => Promise<void> | void,
    options?: FormSubmissionOptions<T>
  ) => (data: T) => Promise<void>;
}
