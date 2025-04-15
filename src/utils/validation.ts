
/**
 * Centralized validation utilities for consistent form validation across the app
 */

// Type definitions for validation results
export type ValidationResult = {
  valid: boolean;
  message: string | null;
};

// Email validation with proper pattern and error handling
export const validateEmail = (email: string): string | null => {
  try {
    if (!email.trim()) return "Email is required";
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    return null;
  } catch (error) {
    console.error("Email validation error:", error);
    return "Email validation failed";
  }
};

// Phone validation with international format support and error handling
export const validatePhone = (phone: string): string | null => {
  try {
    if (!phone.trim()) return "Phone number is required";
    
    // Allow for different international formats
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    
    return null;
  } catch (error) {
    console.error("Phone validation error:", error);
    return "Phone validation failed";
  }
};

// Password validation with security requirements and error handling
export const validatePassword = (password: string): string | null => {
  try {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    
    // Check for complexity requirements
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    if (!(hasUppercase && hasLowercase && (hasNumber || hasSpecial))) {
      return "Password must include uppercase, lowercase, and either numbers or special characters";
    }
    
    return null;
  } catch (error) {
    console.error("Password validation error:", error);
    return "Password validation failed";
  }
};

// URL validation with error handling
export const validateUrl = (url: string): string | null => {
  try {
    if (!url.trim()) return "URL is required";
    
    try {
      new URL(url);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  } catch (error) {
    console.error("URL validation error:", error);
    return "URL validation failed";
  }
};

// Legal Entity Identifier (LEI) validation with improved error handling
export const validateLei = (lei: string): string | null => {
  try {
    if (!lei.trim()) return null; // LEI might be optional

    // LEI is a 20-character alphanumeric string
    const leiRegex = /^[A-Z0-9]{18}[0-9]{2}$/;
    if (!leiRegex.test(lei)) {
      return "Please enter a valid LEI (20 characters, alphanumeric)";
    }
    
    // Additional check for the checksum digits if needed
    // This would require implementing the ISO 17442 standard checksum algorithm
    
    return null;
  } catch (error) {
    console.error("LEI validation error:", error);
    return "LEI validation failed";
  }
};

// File size validation with error handling
export const validateFileSize = (file: File, maxSizeMB: number): string | null => {
  try {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
    }
    return null;
  } catch (error) {
    console.error("File size validation error:", error);
    return "File size validation failed";
  }
};

// File type validation with error handling
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  try {
    // Check file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = `.${fileName.split('.').pop()}`;
    
    // If allowedTypes contains MIME types (with '/'), check against file.type
    // Otherwise, check against the file extension
    const isValidType = allowedTypes.some(type => 
      type.includes('/') 
        ? file.type === type
        : fileExtension === type.toLowerCase()
    );
    
    if (!isValidType) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }
    
    return null;
  } catch (error) {
    console.error("File type validation error:", error);
    return "File type validation failed";
  }
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): string | null => {
  try {
    return !value.trim() ? `${fieldName} is required` : null;
  } catch (error) {
    console.error(`Required field validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};

// Text length validation
export const validateLength = (
  value: string, 
  fieldName: string, 
  min?: number, 
  max?: number
): string | null => {
  try {
    if (min !== undefined && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    
    if (max !== undefined && value.length > max) {
      return `${fieldName} cannot exceed ${max} characters`;
    }
    
    return null;
  } catch (error) {
    console.error(`Length validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};

// Date validation
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

// Number validation
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

// Composite field validation (combine multiple validation rules)
export const validateComposite = (
  value: string,
  fieldName: string,
  validations: Array<(value: string) => string | null>
): string | null => {
  try {
    for (const validation of validations) {
      const error = validation(value);
      if (error) return error;
    }
    return null;
  } catch (error) {
    console.error(`Composite validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};

// Date range validation
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

// Credit card number validation
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
