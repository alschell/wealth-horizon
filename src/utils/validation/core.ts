
/**
 * Core validation utilities for form data
 */
import { z } from 'zod';

/**
 * Type for validation functions
 */
export type Validator = (value: any) => string | null;

/**
 * Combines multiple validation functions for a single field
 * Stops at the first validation error
 * 
 * @param validators Array of validator functions
 * @returns Combined validator function
 */
export const combineValidators = (...validators: Validator[]): Validator => {
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
 * 
 * @param fieldValidators Record of field names to validation functions
 * @returns Function that validates an entire form and returns validation errors
 */
export const createFormValidator = <T extends Record<string, any>>(
  fieldValidators: Partial<Record<keyof T, Validator>>
) => {
  return (values: T): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    for (const [field, validator] of Object.entries(fieldValidators)) {
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

/**
 * Generic form validation using Zod schema
 * 
 * @param data Data to validate
 * @param schema Zod schema to validate against
 * @returns Validated data or validation errors
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
 * 
 * @param zodError Zod validation error
 * @returns Record of field paths to error messages
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
 * 
 * @param data Data to validate
 * @param schema Zod schema to validate against
 * @returns Validated data or formatted validation errors
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
 * 
 * @param schema Zod schema to validate against
 * @returns Function that validates data against the schema
 */
export const createValidator = <T>(schema: z.ZodType<T>) => {
  return (data: unknown) => validateForm(data, schema);
};
