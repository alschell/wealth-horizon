
import { FieldValues, UseFormProps, DefaultValues } from 'react-hook-form';
import { z } from 'zod';

export interface UseUnifiedFormSubmissionOptions<T> {
  onSubmit: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
}

export interface UseUnifiedFormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  schema?: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export interface UnifiedFormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}
