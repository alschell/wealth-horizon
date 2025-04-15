
import { z } from 'zod';

/**
 * Validates whether a field is required
 * 
 * @param value The value to check
 * @param message Optional custom error message
 * @returns Null if valid, error message if invalid
 */
export const validateRequired = (value: any, message = 'This field is required'): string | null => {
  if (value === undefined || value === null || value === '') {
    return message;
  }
  return null;
};

/**
 * Validates an email address format
 * 
 * @param value The email to validate
 * @param message Optional custom error message
 * @returns Null if valid, error message if invalid
 */
export const validateEmail = (value: string, message = 'Please enter a valid email address'): string | null => {
  if (!value) return null; // Don't validate empty values, use required validator for that
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) ? null : message;
};

/**
 * Validates minimum length of a string
 * 
 * @param length Minimum required length
 * @param message Optional custom error message
 * @returns Validation function
 */
export const validateMinLength = (length: number, message?: string) => {
  return (value: string): string | null => {
    if (!value) return null; // Don't validate empty values
    
    return value.length >= length 
      ? null 
      : (message || `Must be at least ${length} characters`);
  };
};

/**
 * Creates a Zod schema for a form based on field validations
 * 
 * @param fields Object containing field names and their Zod schemas
 * @returns A Zod schema for the entire form
 */
export const createFormSchema = <T extends Record<string, any>>(
  fields: Record<keyof T, z.ZodType<any>>
): z.ZodSchema<T> => {
  // Cast to unknown first, then to the target type to avoid TypeScript error
  return z.object(fields) as unknown as z.ZodSchema<T>;
};

/**
 * Creates a validator function from a Zod schema
 * 
 * @param schema Zod schema for validation
 * @returns Function that validates values against the schema
 */
export const createZodValidator = <T>(schema: z.ZodType<T>) => {
  return (values: unknown): Record<string, string> => {
    try {
      schema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.reduce((acc, curr) => {
          const key = curr.path.join('.');
          acc[key] = curr.message;
          return acc;
        }, {} as Record<string, string>);
      }
      return { _form: 'Validation failed' };
    }
  };
};
