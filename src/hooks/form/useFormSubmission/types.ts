
export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
  resetForm?: () => void;
}
