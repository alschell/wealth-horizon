
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
  resetForm?: () => void;
}
