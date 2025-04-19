
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: ((data: T) => boolean | Promise<boolean>) | (() => boolean | Promise<boolean>);
  resetAfterSubmit?: boolean;
  resetForm?: () => void;
}
