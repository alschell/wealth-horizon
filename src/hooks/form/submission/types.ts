
/**
 * Options for form submission
 * @template T The type of form data being submitted
 */
export interface FormSubmissionOptions<T> {
  /** Callback executed after successful submission */
  onSuccess?: (data: T) => void;
  
  /** Callback executed when an error occurs */
  onError?: (error: unknown) => void;
  
  /** Success message to display */
  successMessage?: string;
  
  /** Error message to display on failure */
  errorMessage?: string;
  
  /** Function to validate form before submission */
  validateForm?: (data: T) => boolean;
  
  /** Whether to reset form state after submission */
  resetAfterSubmit?: boolean;
}

/**
 * Form submission state
 */
export interface SubmissionState {
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  
  /** Last error message from failed submission */
  lastError: string | null;
  
  /** Whether the last submission was successful */
  isSuccess: boolean;
}
