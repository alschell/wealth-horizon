
/**
 * Utility functions for form handling
 */

/**
 * Validates required fields in a form
 * @param values - Form values
 * @param requiredFields - Array of field names that are required
 * @returns Object with validation errors
 */
export const validateRequiredFields = <T>(values: T, requiredFields: (keyof T)[]): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  requiredFields.forEach(field => {
    const value = values[field];
    // Check for undefined, null, empty string, or empty array
    if (
      value === undefined || 
      value === null || 
      value === '' || 
      (Array.isArray(value) && value.length === 0)
    ) {
      errors[field as string] = `${String(field)} is required`;
    }
  });
  
  return errors;
};

/**
 * Creates a function to clear errors by field name
 */
export const createErrorClearer = <T>(
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };
};

/**
 * Creates a function to check if a field has an error
 */
export const createErrorChecker = (
  errors: Record<string, string>
) => {
  return (field: string): boolean => {
    return Boolean(errors[field]);
  };
};

/**
 * Creates a function to get error message for a field
 */
export const createErrorMessageGetter = (
  errors: Record<string, string>
) => {
  return (field: string): string => {
    return errors[field] || '';
  };
};
