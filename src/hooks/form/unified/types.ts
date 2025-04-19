
import { FieldValues } from 'react-hook-form';
import { ZodSchema } from 'zod';

/**
 * Options for unified form configuration
 */
export interface UseUnifiedFormOptions<T extends FieldValues> {
  /** Zod schema for form validation */
  schema?: ZodSchema<T>;
  /** Default form values */
  defaultValues: T;
  /** Form submission handler */
  onSubmit?: (data: T) => Promise<void> | void;
  /** Success callback after form submission */
  onSuccess?: () => void;
  /** Error callback after form submission failure */
  onError?: (error: unknown) => void;
  /** Success message to display after successful submission */
  successMessage?: string;
  /** Error message to display after failed submission */
  errorMessage?: string;
  /** Whether to reset form after successful submission */
  resetAfterSubmit?: boolean;
  /** Additional form options */
  [key: string]: any;
}

/**
 * Form state for unified form
 */
export interface UnifiedFormState<T extends FieldValues> {
  /** Current form values */
  values: T;
  /** Form validation errors */
  errors: Record<string, string>;
  /** Fields that have been touched/interacted with */
  touched: Record<string, boolean>;
  /** Whether form has been modified from initial state */
  isDirty: boolean;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Whether form submission was successful */
  isSuccess: boolean;
}
