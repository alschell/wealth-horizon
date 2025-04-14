
/**
 * Numeric validation utilities with enhanced error handling
 * 
 * @module numericValidation
 */

/**
 * Validation options for numeric input
 */
export interface NumericValidationOptions {
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Whether value must be an integer */
  requireInteger?: boolean;
  /** Whether to allow negative values */
  allowNegative?: boolean;
  /** Maximum decimal places allowed */
  maxDecimalPlaces?: number;
}

/**
 * Validates numeric values with comprehensive options
 * 
 * @param value - Value to validate, can be number or string
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateNumber = (
  value: number | string,
  options?: NumericValidationOptions
): string | null => {
  try {
    const { 
      min, 
      max, 
      requireInteger = false,
      allowNegative = true,
      maxDecimalPlaces
    } = options || {};
    
    // Convert string to number if needed
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Check if value is a valid number
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    
    // Integer check
    if (requireInteger && !Number.isInteger(numValue)) {
      return "Please enter a whole number";
    }
    
    // Negative value check
    if (!allowNegative && numValue < 0) {
      return "Negative values are not allowed";
    }
    
    // Min/max range validation
    if (min !== undefined && numValue < min) {
      return `Value must be at least ${min}`;
    }
    
    if (max !== undefined && numValue > max) {
      return `Value cannot exceed ${max}`;
    }
    
    // Decimal places check
    if (maxDecimalPlaces !== undefined) {
      const decimalString = numValue.toString();
      if (decimalString.includes('.')) {
        const decimalPlaces = decimalString.split('.')[1].length;
        if (decimalPlaces > maxDecimalPlaces) {
          return `Value cannot have more than ${maxDecimalPlaces} decimal place${maxDecimalPlaces !== 1 ? 's' : ''}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Number validation error:", error);
    return "Number validation failed";
  }
};

/**
 * Validates percentage values (0-100)
 * 
 * @param value - Percentage value to validate
 * @param allowExceeding - Whether to allow values outside 0-100 range
 * @returns Error message or null if valid
 */
export const validatePercentage = (
  value: number | string,
  allowExceeding = false
): string | null => {
  try {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return "Please enter a valid percentage";
    }
    
    if (!allowExceeding && (numValue < 0 || numValue > 100)) {
      return "Percentage must be between 0 and 100";
    }
    
    return null;
  } catch (error) {
    console.error("Percentage validation error:", error);
    return "Percentage validation failed";
  }
};

/**
 * Validates currency values with formatting options
 * 
 * @param value - Currency value to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateCurrency = (
  value: number | string,
  options?: {
    min?: number;
    max?: number;
    currency?: string;
    allowNegative?: boolean;
  }
): string | null => {
  try {
    const { 
      min = 0, 
      max, 
      currency = 'USD',
      allowNegative = false 
    } = options || {};
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return "Please enter a valid amount";
    }
    
    if (!allowNegative && numValue < 0) {
      return "Negative amounts are not allowed";
    }
    
    if (numValue < min) {
      return `Amount must be at least ${formatCurrency(min, currency)}`;
    }
    
    if (max !== undefined && numValue > max) {
      return `Amount cannot exceed ${formatCurrency(max, currency)}`;
    }
    
    return null;
  } catch (error) {
    console.error("Currency validation error:", error);
    return "Currency validation failed";
  }
};

/**
 * Helper to format currency values
 */
function formatCurrency(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}
