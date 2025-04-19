
/**
 * Common form validation utilities
 */

/**
 * Validates required fields in a form
 * @param values Form values to validate
 * @param requiredFields Array of field names that are required
 * @returns Record of validation errors
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  values: T,
  requiredFields: (keyof T)[]
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
 * Creates a function to clear errors by field name
 */
export const createErrorClearer = <T>(
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
): (field: keyof T) => void => {
  return (field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  };
};
