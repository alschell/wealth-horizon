
import { 
  UseFormProps, 
  UseFormReturn, 
  FieldValues, 
  DefaultValues,
  Path
} from 'react-hook-form';
import { z } from 'zod';

// Enhanced Form Options
export interface EnhancedFormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  schema?: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  validateBeforeSubmit?: boolean;
}

// Enhanced Form Submission Options
export interface FormSubmissionOptions<T> {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  validateForm?: () => boolean;
  resetAfterSubmit?: boolean;
}

// Form State Options
export interface FormStateOptions<T extends FieldValues> extends Omit<UseFormProps<T>, 'defaultValues'> {
  schema?: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
}

// Extended UseFormReturn with additional properties
export interface UseEnhancedFormReturn<T extends FieldValues> extends UseFormReturn<T> {
  isSubmitting: boolean;
  lastError: string | null;
  isSuccess: boolean;
  resetFormState: () => void;
  submit: (data: T) => Promise<void>;
}

// Error type for form validation
export interface FormError {
  field: string;
  message: string;
}
