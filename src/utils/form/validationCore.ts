
import { z } from 'zod';

/**
 * Type for a validation function that returns either an error message or null
 */
export type ValidationFn<T = any> = (value: T) => string | null;

/**
 * Basic required field validation
 */
export const validateRequired = (value: any, message = 'This field is required'): string | null => {
  if (value === undefined || value === null || value === '') {
    return message;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return message;
  }
  
  return null;
};

/**
 * Email validation
 */
export const validateEmail = (value: string, message = 'Please enter a valid email address'): string | null => {
  if (!value) return null; // Don't validate empty values
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) ? null : message;
};

/**
 * Min length validation
 */
export const validateMinLength = (minLength: number, message?: string) => {
  return (value: string): string | null => {
    if (!value) return null; // Don't validate empty values
    
    return value.length >= minLength 
      ? null 
      : (message || `Must be at least ${minLength} characters`);
  };
};

/**
 * Max length validation
 */
export const validateMaxLength = (maxLength: number, message?: string) => {
  return (value: string): string | null => {
    if (!value) return null; // Don't validate empty values
    
    return value.length <= maxLength 
      ? null 
      : (message || `Must be at most ${maxLength} characters`);
  };
};

/**
 * Number range validation
 */
export const validateNumberRange = (min: number, max: number, message?: string) => {
  return (value: number): string | null => {
    if (value === undefined || value === null) return null;
    
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    
    return (num >= min && num <= max)
      ? null
      : (message || `Must be between ${min} and ${max}`);
  };
};

/**
 * Validate using a regular expression
 */
export const validatePattern = (pattern: RegExp, message: string) => {
  return (value: string): string | null => {
    if (!value) return null; // Don't validate empty values
    
    return pattern.test(value) ? null : message;
  };
};

/**
 * Apply multiple validation functions in sequence
 */
export const validateComposite = <T>(value: T, validators: ValidationFn<T>[]): string | null => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

/**
 * Create a Zod schema from validation functions
 */
export const createZodSchema = <T extends Record<string, any>>(
  validationMap: Record<keyof T, ValidationFn | ValidationFn[]>
): z.ZodSchema<T> => {
  const schemaMap: Record<string, z.ZodTypeAny> = {};
  
  for (const [field, validators] of Object.entries(validationMap)) {
    // Create a Zod type for the field
    const fieldSchema = z.any();
    
    // Add custom validation using superRefine instead of refine
    schemaMap[field] = fieldSchema.superRefine((value, ctx) => {
      let error: string | null = null;
      
      if (Array.isArray(validators)) {
        error = validateComposite(value, validators);
      } else {
        error = validators(value);
      }
      
      if (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error,
          path: [field]
        });
        return false;
      }
      
      return true;
    });
  }
  
  // Fix: Explicitly type cast to resolve the typescript error
  return z.object(schemaMap) as unknown as z.ZodSchema<T>;
};

/**
 * Apply form validation using Zod schema
 */
export const validateWithZod = <T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { data: T; errors: null } | { data: null; errors: Record<string, string> } => {
  try {
    const result = schema.parse(data);
    return { data: result, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        formattedErrors[path] = err.message;
      });
      
      return { data: null, errors: formattedErrors };
    }
    
    // Re-throw other errors
    throw error;
  }
};
