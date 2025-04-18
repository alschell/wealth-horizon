
import { ReactNode } from 'react';

export interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export interface FormActions<T> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldValues: (fields: Partial<T>) => void;
  setFieldError: (field: keyof T, message: string) => void;
  clearFieldError: (field: keyof T) => void;
  validateForm: () => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  resetForm: () => void;
}

export interface FormHelpers<T> {
  hasError: (field: keyof T) => boolean;
  getErrorMessage: (field: keyof T) => string;
}

export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export interface UseUnifiedFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  requiredFields?: (keyof T)[];
}

export interface UseUnifiedFormReturn<T> extends FormActions<T>, FormHelpers<T> {
  formState: FormState<T>;
}
