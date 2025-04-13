
/**
 * Form utility functions for forms throughout the application
 */

/**
 * Create an error state setter function that clears errors when values change
 * 
 * @param setErrors - Error state setter function
 * @returns Function to clear error for a specific field
 */
export const createErrorClearer = <T extends Record<string, any>>(
  setErrors: React.Dispatch<React.SetStateAction<T>>
) => {
  return (field: keyof T) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field as string];
      return newErrors;
    });
  };
};

/**
 * Validates required form fields
 * 
 * @param formData - Form data object
 * @param requiredFields - Array of required field keys
 * @returns Object with error messages for missing fields
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  formData: T,
  requiredFields: (keyof T)[]
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || 
        (typeof formData[field] === 'string' && formData[field].trim() === '') ||
        (Array.isArray(formData[field]) && formData[field].length === 0)) {
      errors[field] = `${String(field)} is required`;
    }
  });
  
  return errors;
};

/**
 * Creates an input change handler that updates form state
 * 
 * @param setFormData - Form data setter function
 * @param clearError - Optional function to clear error for field
 * @returns Input change handler function
 */
export const createInputChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  clearError?: (field: keyof T) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (clearError) {
      clearError(name as keyof T);
    }
  };
};

/**
 * Creates a selection change handler for form state
 * 
 * @param setFormData - Form data setter function
 * @param clearError - Optional function to clear error for field
 * @returns Selection change handler function
 */
export const createSelectionChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  clearError?: (field: keyof T) => void
) => {
  return (field: keyof T, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (clearError) {
      clearError(field);
    }
  };
};

/**
 * Creates a checkbox change handler for form state
 * 
 * @param setFormData - Form data setter function
 * @param clearError - Optional function to clear error for field
 * @returns Checkbox change handler function
 */
export const createCheckboxChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  clearError?: (field: keyof T) => void
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    if (clearError) {
      clearError(name as keyof T);
    }
  };
};

/**
 * Creates a form submission handler
 * 
 * @param validateFn - Validation function returning an object with errors or null
 * @param onSubmit - Submit callback when validation passes
 * @param setErrors - Function to set error state
 * @returns Form submission handler function
 */
export const createFormSubmitHandler = <T extends Record<string, any>>(
  validateFn: (formData: T) => Record<string, string> | null,
  onSubmit: (formData: T) => void,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  return (formData: T) => {
    const errors = validateFn(formData);
    
    if (errors && Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    
    onSubmit(formData);
    return true;
  };
};
