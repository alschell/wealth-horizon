
/**
 * Unified form module types
 * 
 * This module exports all types related to form state management,
 * validation, and submission.
 */

import { ReactNode } from 'react';
import type { Validator } from './validators';

/**
 * Form validation rules
 */
export interface FormValidationRules<T> {
  [key: string]: ((value: any) => string | null) | undefined;
}

/**
 * Form state
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
 * Form actions
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
 * Form helpers
 */
export interface FormHelpers<T> {
  hasError: (field: keyof T) => boolean;
  getErrorMessage: (field: keyof T) => string;
}

/**
 * Form submission options
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
  
  /** Function to validate form before submission */
  validateForm?: (data: T) => boolean | Promise<boolean>;
  
  /** Whether to reset form state after submission */
  resetAfterSubmit?: boolean;
  
  /** Function to reset form state */
  resetForm?: () => void;
}

/**
 * Unified form return type
 */
export interface UseUnifiedFormReturn<T> extends FormActions<T>, FormHelpers<T> {
  formState: FormState<T>;
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  validateFields?: () => boolean; // For backward compatibility
}

/**
 * Unified form props
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
  validators?: Partial<Record<keyof T, Validator>>;
  resetAfterSubmit?: boolean;
}

/**
 * Form field props
 */
export interface FormFieldProps {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  [key: string]: any;
}
