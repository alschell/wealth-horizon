
import { UseFormReturn } from 'react-hook-form';

interface FieldRegistrationOptions {
  required?: boolean | string;
  maxLength?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: any) => boolean | string | Promise<boolean | string>;
}

/**
 * Utility to register multiple form fields at once with react-hook-form
 * 
 * @param form - The form instance from useForm
 * @param fields - Object mapping field names to validation options
 * @returns Object with registered fields
 */
export function registerFormFields<TFieldValues extends Record<string, any>>(
  form: UseFormReturn<TFieldValues>,
  fields: Record<keyof TFieldValues, FieldRegistrationOptions>
): Record<keyof TFieldValues, ReturnType<typeof form.register>> {
  const registeredFields = {} as Record<keyof TFieldValues, ReturnType<typeof form.register>>;
  
  for (const [fieldName, options] of Object.entries(fields)) {
    registeredFields[fieldName as keyof TFieldValues] = form.register(fieldName as any, options);
  }
  
  return registeredFields;
}

/**
 * Helper function to create a required message
 * 
 * @param fieldDisplayName - User-friendly field name
 * @returns Validation option with required message
 */
export function requiredField(fieldDisplayName: string): { required: string } {
  return {
    required: `${fieldDisplayName} is required`
  };
}

/**
 * Helper to create standard email validation
 */
export function emailValidation(): { 
  required: string;
  pattern: { value: RegExp; message: string }
} {
  return {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  };
}

/**
 * Helper to create standard password validation
 */
export function passwordValidation(minLength = 8): {
  required: string;
  minLength: { value: number; message: string };
} {
  return {
    required: 'Password is required',
    minLength: {
      value: minLength,
      message: `Password must be at least ${minLength} characters`
    }
  };
}
