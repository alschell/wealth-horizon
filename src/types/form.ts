
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

/**
 * Form validation rules mapping fields to validator functions
 */
export interface FormValidationRules<T> {
  [key: string]: ((value: any) => string | null) | undefined;
}

/**
 * Internal form state
 */
export interface FormState<T> {
  /** Current form values */
  values: T;
  
  /** Validation errors by field */
  errors: Record<string, string>;
  
  /** Fields that have been touched/blurred */
  touched: Record<string, boolean>;
  
  /** Whether the form has been modified */
  isDirty: boolean;
  
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  
  /** Whether the form was successfully submitted */
  isSuccess: boolean;
  
  /** Whether the form has been validated */
  isValid?: boolean;
}

/**
 * Form action handlers
 */
export interface FormActions<T> {
  /** Handle input change events */
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  
  /** Handle input blur events */
  handleBlur: (field: keyof T) => void;
  
  /** Set a field's value programmatically */
  setFieldValue: (field: keyof T, value: any) => void;
  
  /** Set multiple field values at once */
  setFieldValues: (fields: Partial<T>) => void;
  
  /** Set a field error manually */
  setFieldError: (field: keyof T, message: string) => void;
  
  /** Clear a field's error */
  clearFieldError: (field: keyof T) => void;
  
  /** Validate the entire form */
  validateForm: () => boolean;
  
  /** Handle form submission */
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  
  /** Reset the form to initial values */
  resetForm: () => void;
}

/**
 * Helper functions for form UI
 */
export interface FormHelpers<T> {
  /** Check if a field has an error */
  hasError: (field: keyof T) => boolean;
  
  /** Get error message for a field */
  getErrorMessage: (field: keyof T) => string;
}

/**
 * Form submission configuration options
 */
export interface FormSubmissionOptions<T> {
  /** Function to call on successful submission */
  onSuccess?: (data: T) => void;
  
  /** Function to call on submission error */
  onError?: (error: unknown) => void;
  
  /** Success message to display */
  successMessage?: string;
  
  /** Error message to display on failure */
  errorMessage?: string;
  
  /** Whether to reset form after submission */
  resetAfterSubmit?: boolean;
}

/**
 * Return type of the useUnifiedForm hook
 */
export interface UseUnifiedFormReturn<T> extends FormActions<T>, FormHelpers<T> {
  formState: FormState<T>;
}

/**
 * Configuration options for the useUnifiedForm hook
 */
export interface UseUnifiedFormProps<T> {
  /** Initial form values */
  initialValues: T;
  
  /** Custom validation function */
  validate?: (values: T) => Record<string, string>;
  
  /** Form submission handler */
  onSubmit?: (values: T) => Promise<void> | void;
  
  /** Success callback */
  onSuccess?: () => void;
  
  /** Error callback */
  onError?: (error: unknown) => void;
  
  /** Success message */
  successMessage?: string;
  
  /** Error message */
  errorMessage?: string;
  
  /** Fields that are required */
  requiredFields?: (keyof T)[];
}

/**
 * Form field props for reusable form components
 */
export interface FormFieldProps {
  /** Field name */
  name: string;
  
  /** Field label */
  label?: string;
  
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'textarea';
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Error message */
  error?: string | FieldError;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Whether the field is disabled */
  disabled?: boolean;
  
  /** Optional className for the container */
  className?: string;
  
  /** Optional className for the input element */
  inputClassName?: string;
  
  /** Optional className for the label */
  labelClassName?: string;
  
  /** Optional className for the error message */
  errorClassName?: string;
  
  /** Any additional props */
  [key: string]: any;
}

/**
 * Form section props for layout components
 */
export interface FormSectionProps {
  /** Section title */
  title: string;
  
  /** Section description */
  description?: string;
  
  /** Section children */
  children: ReactNode;
  
  /** Whether the section is collapsible */
  collapsible?: boolean;
  
  /** Whether the section is initially collapsed */
  defaultCollapsed?: boolean;
  
  /** Optional className */
  className?: string;
}
