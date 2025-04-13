
/**
 * Numeric validation utilities for form fields
 * Contains validators for numbers, dates, credit cards, etc.
 */

/**
 * Validates number format and range
 * 
 * @param value - String representation of number to validate
 * @param options - Validation options (min, max, integer)
 * @returns Null if valid, error message if invalid
 */
export const validateNumber = (
  value: string, 
  options?: {
    min?: number;
    max?: number;
    integer?: boolean;
  }
): string | null => {
  try {
    if (!value.trim()) return "Number is required";
    
    const num = Number(value);
    if (isNaN(num)) return "Please enter a valid number";
    
    if (options?.integer && !Number.isInteger(num)) {
      return "Please enter a whole number";
    }
    
    if (options?.min !== undefined && num < options.min) {
      return `Number must be at least ${options.min}`;
    }
    
    if (options?.max !== undefined && num > options.max) {
      return `Number cannot exceed ${options.max}`;
    }
    
    return null;
  } catch (error) {
    console.error("Number validation error:", error);
    return "Number validation failed";
  }
};

/**
 * Validates date format and constraints
 * 
 * @param dateStr - Date string to validate
 * @param options - Validation options
 * @returns Null if valid, error message if invalid
 */
export const validateDate = (
  dateStr: string, 
  options?: {
    minDate?: Date;
    maxDate?: Date;
    notFuture?: boolean;
    notPast?: boolean;
  }
): string | null => {
  try {
    if (!dateStr) return "Date is required";
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date format";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (options?.minDate && date < options.minDate) {
      return `Date cannot be before ${options.minDate.toLocaleDateString()}`;
    }
    
    if (options?.maxDate && date > options.maxDate) {
      return `Date cannot be after ${options.maxDate.toLocaleDateString()}`;
    }
    
    if (options?.notFuture && date > today) {
      return "Date cannot be in the future";
    }
    
    if (options?.notPast && date < today) {
      return "Date cannot be in the past";
    }
    
    return null;
  } catch (error) {
    console.error("Date validation error:", error);
    return "Date validation failed";
  }
};

/**
 * Validates date range (start and end dates)
 * 
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Null if valid, error message if invalid
 */
export const validateDateRange = (
  startDate: string,
  endDate: string
): string | null => {
  try {
    if (!startDate || !endDate) return null; // Both dates must be provided
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid date format";
    }
    
    if (start > end) {
      return "End date must be after start date";
    }
    
    return null;
  } catch (error) {
    console.error("Date range validation error:", error);
    return "Date range validation failed";
  }
};

/**
 * Validates credit card number format using Luhn algorithm
 * 
 * @param cardNumber - Credit card number to validate
 * @returns Null if valid, error message if invalid
 */
export const validateCreditCard = (cardNumber: string): string | null => {
  try {
    if (!cardNumber.trim()) return "Credit card number is required";
    
    // Remove spaces and dashes
    const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');
    
    // Check if contains only digits
    if (!/^\d+$/.test(sanitizedNumber)) {
      return "Credit card number must contain only digits";
    }
    
    // Check length (most cards are 13-19 digits)
    if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
      return "Credit card number has an invalid length";
    }
    
    // Luhn algorithm (checksum) validation
    let sum = 0;
    let double = false;
    
    // Loop from right to left
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedNumber.charAt(i));
      
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      double = !double;
    }
    
    if (sum % 10 !== 0) {
      return "Invalid credit card number";
    }
    
    return null;
  } catch (error) {
    console.error("Credit card validation error:", error);
    return "Credit card validation failed";
  }
};
