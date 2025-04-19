
/**
 * Validates required fields in a form
 * 
 * @param values - Form values
 * @param requiredFields - Array of required field names
 * @returns Object with error messages for missing required fields
 */
export function validateRequiredFields<T extends Record<string, any>>(
  values: T, 
  requiredFields: Array<keyof T>
): Record<string, string> {
  const errors: Record<string, string> = {};
  
  requiredFields.forEach(field => {
    const value = values[field];
    
    // Check for undefined, null, empty string
    if (value === undefined || value === null || value === '') {
      errors[field as string] = 'This field is required';
    }
    // Check for empty arrays
    else if (Array.isArray(value) && value.length === 0) {
      errors[field as string] = 'At least one item is required';
    }
  });
  
  return errors;
}

/**
 * Creates a function to clear errors for specific fields
 * 
 * @param setErrors - Function to update errors state
 * @returns Function that clears errors for specified fields
 */
export function createErrorClearer<T>(
  setErrors: (updater: (prev: Record<string, string>) => Record<string, string>) => void
): (fields: Array<keyof T>) => void {
  return (fields: Array<keyof T>) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      fields.forEach(field => {
        delete newErrors[field as string];
      });
      return newErrors;
    });
  };
}

/**
 * Validates email format
 * 
 * @param email - Email string to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format
 * 
 * @param phone - Phone string to validate
 * @returns Boolean indicating if phone is valid
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}
