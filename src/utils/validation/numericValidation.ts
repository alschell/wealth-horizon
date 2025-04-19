
/**
 * Numeric validation utilities
 */

/**
 * Validates if a value is a valid number within given constraints
 * @param value - Value to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateNumber = (
  value: string | number,
  options: { min?: number; max?: number; required?: boolean } = {}
): string | null => {
  const { min, max, required = true } = options;
  
  // Check if required
  if (required && (value === '' || value === null || value === undefined)) {
    return 'This field is required';
  }
  
  // If not required and empty, it's valid
  if (!required && (value === '' || value === null || value === undefined)) {
    return null;
  }
  
  // Convert to number
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  
  // Check min constraint
  if (min !== undefined && num < min) {
    return `Value must be at least ${min}`;
  }
  
  // Check max constraint
  if (max !== undefined && num > max) {
    return `Value must be at most ${max}`;
  }
  
  return null;
};

/**
 * Validates if a value is a valid percentage (0-100)
 * @param value - Value to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validatePercentage = (
  value: string | number,
  options: { required?: boolean } = {}
): string | null => {
  return validateNumber(value, {
    min: 0,
    max: 100,
    required: options.required
  });
};

/**
 * Validates if a value is a valid currency amount
 * @param value - Value to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateCurrency = (
  value: string | number,
  options: { min?: number; max?: number; required?: boolean } = {}
): string | null => {
  const { required = true } = options;
  
  // Check if required
  if (required && (value === '' || value === null || value === undefined)) {
    return 'Amount is required';
  }
  
  // If not required and empty, it's valid
  if (!required && (value === '' || value === null || value === undefined)) {
    return null;
  }
  
  // Convert to string and check format
  const valueStr = String(value);
  const currencyRegex = /^-?\d+(\.\d{1,2})?$/;
  
  if (!currencyRegex.test(valueStr)) {
    return 'Please enter a valid amount with up to 2 decimal places';
  }
  
  // Use validateNumber for min/max checks
  return validateNumber(value, options);
};
