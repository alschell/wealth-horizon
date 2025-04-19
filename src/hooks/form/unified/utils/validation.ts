
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
    if (!values[field]) {
      errors[field as string] = 'This field is required';
    }
  });
  
  return errors;
};

/**
 * Creates a function to clear field errors
 * @param setErrors Function to update error state
 * @returns Function to clear errors for a specific field
 */
export const createErrorClearer = (
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };
};
