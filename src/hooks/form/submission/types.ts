
import { ErrorHandlerOptions } from '@/utils/errorHandling';

export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: (data: T) => boolean;
  resetAfterSubmit?: boolean;
}

export interface SubmissionState {
  isSubmitting: boolean;
  lastError: string | null;
  isSuccess: boolean;
}
