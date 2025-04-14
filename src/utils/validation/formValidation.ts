
import { FieldValues, Path } from 'react-hook-form';
import { validateComposite } from './index';

/**
 * Type for a validation function that returns either an error message or null
 */
export type ValidationFn<T> = (value: T) => string | null;

/**
 * Creates a field validation schema with proper typing
 * 
 * @param validationMap - Map of field names to validation functions
 * @returns Validation schema object
 */
export function createFieldValidationSchema<T extends FieldValues>(
  validationMap: Partial<Record<Path<T>, ValidationFn<any>>>
) {
  return validationMap;
}

/**
 * Creates a validation schema for a specific form type
 * 
 * @param validationRules - Object mapping field names to validation functions 
 * @returns A function that validates an entire form
 */
export function createFormValidator<T extends FieldValues>(
  validationRules: Partial<Record<Path<T>, ValidationFn<any> | ValidationFn<any>[]>>
) {
  return (formData: T): Partial<Record<Path<T>, string>> => {
    const errors: Partial<Record<Path<T>, string>> = {};
    
    for (const [field, rule] of Object.entries(validationRules) as [Path<T>, ValidationFn<any> | ValidationFn<any>[]][]) {
      const value = formData[field];
      
      // Handle array of validation functions
      if (Array.isArray(rule)) {
        const error = validateComposite(value, rule);
        if (error) {
          errors[field] = error;
        }
      } 
      // Handle single validation function
      else if (rule) {
        const error = rule(value);
        if (error) {
          errors[field] = error;
        }
      }
    }
    
    return errors;
  };
}

/**
 * Helper to check if a form has any validation errors
 * 
 * @param errors - Form errors object 
 * @returns Boolean indicating if form has errors
 */
export function hasFormErrors(errors: Record<string, any>): boolean {
  return Object.keys(errors).length > 0;
}
