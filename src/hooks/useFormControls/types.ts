
/**
 * Form submission state interface
 */
export interface FormSubmissionState {
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  
  /** Last error message from failed submission or null */
  lastError: string | null;
  
  /** Whether the last submission was successful */
  isSuccess: boolean;
}

/**
 * Options for form submission
 * @template T The type of form data being submitted
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
  validateForm?: () => Promise<boolean> | boolean;
}

/**
 * Return type for useFormControls hook
 * @template T The type of form data being submitted
 */
export interface UseFormControlsReturn<T> {
  /** The current form submission state */
  formSubmissionState: FormSubmissionState;
  
  /** Function to reset the form state */
  resetState: () => void;
  
  /** Function to create a submit handler */
  createSubmitHandler: (
    onSubmit: (data: T) => Promise<void> | void,
    options?: FormSubmissionOptions<T>
  ) => (data: T) => Promise<void>;
}
