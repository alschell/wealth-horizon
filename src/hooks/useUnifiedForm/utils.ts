
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
      errors[field as string] = 'This field is required';
    }
  });
  
  return errors;
};

/**
 * Creates a function to clear errors by field name
 * @param setErrors - Function to set errors state
 * @returns Function that clears error for a specific field
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
