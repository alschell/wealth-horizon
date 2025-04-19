
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateForm?: ((data: T) => boolean | Promise<boolean>) | (() => boolean | Promise<boolean>);
}

export interface FormSubmissionState {
  isSubmitting: boolean;
  lastError: string | null;
  isSuccess: boolean;
}

export interface UseFormControlsReturn<T> {
  formSubmissionState: FormSubmissionState;
  resetState: () => void;
  createSubmitHandler: (
    onSubmit: (data: T) => Promise<void> | void,
    options?: FormSubmissionOptions<T>
  ) => (data: T) => Promise<void>;
}
