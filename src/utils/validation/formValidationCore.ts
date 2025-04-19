
/**
 * Core validation utilities for form data
 */
import { z } from 'zod';

/**
 * Generic form validation using Zod schema
 */
export const validateWithSchema = <T>(
  data: unknown,
  schema: z.ZodType<T>
): { data: T; errors: null } | { data: null; errors: z.ZodError } => {
  try {
    const validatedData = schema.parse(data);
    return { data: validatedData, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, errors: error };
    }
    throw error;
  }
};

/**
 * Formats Zod validation errors into a more usable object
 */
export const formatZodErrors = (
  zodError: z.ZodError
): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  zodError.errors.forEach((error) => {
    const path = error.path.join('.');
    if (path) {
      formattedErrors[path] = error.message;
    }
  });
  
  return formattedErrors;
};

/**
 * Validate a form with a Zod schema and get formatted errors
 */
export const validateForm = <T>(
  data: unknown,
  schema: z.ZodType<T>
): { data: T; errors: null } | { data: null; errors: Record<string, string> } => {
  const result = validateWithSchema(data, schema);
  if (result.errors) {
    return { data: null, errors: formatZodErrors(result.errors) };
  }
  return result as { data: T; errors: null };
};

/**
 * Creates a validation function from a Zod schema
 */
export const createValidator = <T>(schema: z.ZodType<T>) => {
  return (data: unknown) => validateForm(data, schema);
};

/**
 * Combines multiple validation functions for a single field
 */
export const combineValidators = (
  validators: Array<(value: any) => string | null>
) => {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};

/**
 * Creates a form validation function from field validators
 */
export const createFormValidator = <T extends Record<string, any>>(
  validators: Partial<Record<keyof T, (value: any) => string | null>>
) => {
  return (values: T): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    for (const [field, validator] of Object.entries(validators)) {
      if (validator) {
        const error = validator(values[field]);
        if (error) {
          errors[field] = error;
        }
      }
    }
    
    return errors;
  };
};
