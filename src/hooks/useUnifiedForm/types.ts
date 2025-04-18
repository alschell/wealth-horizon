
import { ReactNode } from 'react';

/**
 * Form validation rules mapping field names to validation functions
 */
export interface FormValidationRules<T> {
  [key: string]: ((value: any) => string | null) | undefined;
}

/**
 * Form state containing values, errors, and metadata
 */
export interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}

/**
 * Form actions for manipulation and submission
 */
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

/**
 * Form helpers for checking state
 */
export interface FormHelpers<T> {
  hasError: (field: keyof T) => boolean;
  getErrorMessage: (field: keyof T) => string;
}

/**
 * Options for form submission
 */
export interface FormSubmissionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

/**
 * Return value of useUnifiedForm hook
 */
export interface UseUnifiedFormReturn<T> extends FormActions<T>, FormHelpers<T> {
  formState: FormState<T>;
}

/**
 * Props for useUnifiedForm hook
 */
export interface UseUnifiedFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  requiredFields?: (keyof T)[];
}
