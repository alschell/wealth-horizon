
/**
 * Unified form validation utilities
 */

import { z } from 'zod';

/**
 * Validates required fields in a form data object
 * 
 * @param values Object containing form data
 * @param requiredFields Array of field names that are required
 * @returns Object with validation errors (if any)
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  values: T, 
  requiredFields: Array<keyof T>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  requiredFields.forEach(field => {
    const value = values[field];
    
    if (
      value === undefined || 
      value === null || 
      value === '' || 
      (Array.isArray(value) && value.length === 0)
    ) {
      errors[field as string] = 'This field is required';
    }
  });
  
  return errors;
};

/**
 * Factory function to create an error clearing function
 * 
 * @returns A function that clears a specified field error
 */
export const createErrorClearer = <T>(
  setFormState: React.Dispatch<React.SetStateAction<{
    errors: Record<string, string>;
    [key: string]: any;
  }>>
) => {
  return (field: keyof T) => {
    setFormState(prev => {
      const newErrors = { ...prev.errors };
      delete newErrors[field as string];
      return {
        ...prev,
        errors: newErrors
      };
    });
  };
};

/**
 * Validates a form using Zod schema
 * 
 * @param values Form values to validate
 * @param schema Zod schema for validation
 * @returns Object with validation errors (if any)
 */
export const validateWithZodSchema = <T extends Record<string, any>>(
  values: T, 
  schema: z.ZodType<T>
): Record<string, string> => {
  try {
    schema.parse(values);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.reduce((acc, curr) => {
        if (curr.path[0]) {
          acc[curr.path[0] as string] = curr.message;
        }
        return acc;
      }, {} as Record<string, string>);
    }
    return {};
  }
};

/**
 * Creates a function to check if a field has an error
 */
export const createErrorChecker = (errors: Record<string, string>) => {
  return (field: string): boolean => {
    return Boolean(errors[field]);
  };
};

/**
 * Creates a function to get an error message for a field
 */
export const createErrorMessageGetter = (errors: Record<string, string>) => {
  return (field: string): string => {
    return errors[field] || '';
  };
};
