
/**
 * Numeric validation utilities
 */

/**
 * Validates if a value is a valid number
 * @param value Value to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateNumber = (
  value: string | number,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
    allowNegative?: boolean;
  } = {}
): string | null => {
  const {
    required = false,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    integer = false,
    allowNegative = true
  } = options;

  // Handle empty values
  if (value === '' || value === null || value === undefined) {
    return required ? 'This field is required' : null;
  }

  // Convert to number
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }

  // Check integer constraint
  if (integer && !Number.isInteger(num)) {
    return 'Please enter a whole number';
  }

  // Check negative constraint
  if (!allowNegative && num < 0) {
    return 'Please enter a positive number';
  }

  // Check min/max constraints
  if (num < min) {
    return `Value must be at least ${min}`;
  }

  if (num > max) {
    return `Value must be at most ${max}`;
  }

  return null;
};

/**
 * Validates a percentage value (0-100)
 * @param value Value to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validatePercentage = (
  value: string | number,
  options: {
    required?: boolean;
    allowDecimal?: boolean;
  } = {}
): string | null => {
  const { required = false, allowDecimal = true } = options;

  // First use the standard number validation
  const numberError = validateNumber(value, {
    required,
    min: 0,
    max: 100,
    integer: !allowDecimal,
    allowNegative: false
  });

  if (numberError) {
    return numberError;
  }

  return null;
};

/**
 * Validates a currency value
 * @param value Value to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateCurrency = (
  value: string | number,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    allowNegative?: boolean;
  } = {}
): string | null => {
  const { required = false, min, max, allowNegative = true } = options;

  // First use the standard number validation
  const numberError = validateNumber(value, {
    required,
    min,
    max,
    integer: false,
    allowNegative
  });

  if (numberError) {
    return numberError;
  }

  // Additional currency-specific validations could be added here
  return null;
};
