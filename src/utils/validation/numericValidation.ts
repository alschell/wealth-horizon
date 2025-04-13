
/**
 * Numeric validation utilities
 */

/**
 * Validates if a value is a valid number
 * 
 * @param value - Value to validate
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validateNumber = (value: string, allowEmpty = true): string | null => {
  if (!value && allowEmpty) return null;
  
  if (isNaN(Number(value))) {
    return "Please enter a valid number";
  }
  
  return null;
};

/**
 * Validates if a value is a positive number
 * 
 * @param value - Value to validate
 * @param allowZero - Whether to allow zero
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validatePositiveNumber = (
  value: string, 
  allowZero = true,
  allowEmpty = true
): string | null => {
  if (!value && allowEmpty) return null;
  
  const numberError = validateNumber(value, false);
  if (numberError) return numberError;
  
  const num = Number(value);
  
  if (allowZero) {
    if (num < 0) {
      return "Please enter a positive number";
    }
  } else {
    if (num <= 0) {
      return "Please enter a number greater than zero";
    }
  }
  
  return null;
};

/**
 * Validates if a value is a number within range
 * 
 * @param value - Value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validateNumberInRange = (
  value: string, 
  min: number, 
  max: number,
  allowEmpty = true
): string | null => {
  if (!value && allowEmpty) return null;
  
  const numberError = validateNumber(value, false);
  if (numberError) return numberError;
  
  const num = Number(value);
  
  if (num < min || num > max) {
    return `Please enter a number between ${min} and ${max}`;
  }
  
  return null;
};

/**
 * Validates if a value is a valid percentage (0-100)
 * 
 * @param value - Value to validate
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validatePercentage = (value: string, allowEmpty = true): string | null => {
  return validateNumberInRange(value, 0, 100, allowEmpty);
};

/**
 * Validates if a value is an integer
 * 
 * @param value - Value to validate
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validateInteger = (value: string, allowEmpty = true): string | null => {
  if (!value && allowEmpty) return null;
  
  const numberError = validateNumber(value, false);
  if (numberError) return numberError;
  
  if (!Number.isInteger(Number(value))) {
    return "Please enter a whole number";
  }
  
  return null;
};

/**
 * Validates if a value is a valid currency amount
 * 
 * @param value - Value to validate
 * @param allowEmpty - Whether to allow empty values
 * @returns Error message or null if valid
 */
export const validateCurrencyAmount = (value: string, allowEmpty = true): string | null => {
  if (!value && allowEmpty) return null;
  
  // Remove currency symbols and commas
  const cleanValue = value.replace(/[$£€,]/g, '');
  
  const numberError = validateNumber(cleanValue, false);
  if (numberError) return numberError;
  
  // Check format (allow up to 2 decimal places)
  if (!/^\d+(\.\d{1,2})?$/.test(cleanValue)) {
    return "Please enter a valid currency amount";
  }
  
  return null;
};
