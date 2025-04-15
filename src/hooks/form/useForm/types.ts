
import { 
  FieldValues, 
  DefaultValues,
  Path,
  UseFormReturn as RHFUseFormReturn,
  UseFormProps
} from 'react-hook-form';
import { z } from 'zod';
import { SyntheticEvent } from 'react';

/**
 * Form validation errors object
 */
export type FormErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Form submission state
 */
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

/**
 * Form submission options
 */
export interface FormSubmissionOptions<T extends FieldValues> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateBeforeSubmit?: boolean;
}

/**
 * Form state options
 */
export interface FormStateOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  schema?: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
}

/**
 * Enhanced form configuration options
 */
export interface UseFormOptions<T extends FieldValues> extends FormStateOptions<T> {
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateBeforeSubmit?: boolean;
}

/**
 * Custom handle submit function type that can handle both event and regular submissions
 */
export type EnhancedHandleSubmit<T extends FieldValues> = 
  ((e?: SyntheticEvent) => Promise<void>) & 
  RHFUseFormReturn<T>['handleSubmit'];

/**
 * Return type for useForm hook
 */
export interface UseFormReturn<T extends FieldValues> extends Omit<RHFUseFormReturn<T>, 'handleSubmit'> {
  handleSubmit: EnhancedHandleSubmit<T>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  resetFormState: () => void;
  submit: (data: T) => Promise<void>;
}
