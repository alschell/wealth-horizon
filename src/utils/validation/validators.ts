
import { 
  ValidationResult, 
  Validator, 
  combineValidators, 
  minLength, 
  maxLength, 
  matchesPattern 
} from './core';

/**
 * Validate that a field is required
 * @param fieldName - The name of the field (for error message)
 * @returns Validator function
 */
export function required(fieldName: string = 'This field'): Validator {
  return (value: any): ValidationResult => {
    if (value === undefined || value === null || value === '') {
      return `${fieldName} is required`;
    }
    if (Array.isArray(value) && value.length === 0) {
      return `${fieldName} is required`;
    }
    return null;
  };
}

/**
 * Validate an email address
 * @returns Validator function
 */
export function email(): Validator<string> {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return matchesPattern(emailRegex, 'Please enter a valid email address');
}

/**
 * Validate a phone number
 * @returns Validator function
 */
export function phone(): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    
    // Allow various phone formats but ensure it's at least 10 digits
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return 'Phone number must have at least 10 digits';
    }
    return null;
  };
}

/**
 * Validate a URL
 * @returns Validator function
 */
export function url(): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    
    try {
      new URL(value);
      return null;
    } catch (e) {
      return 'Please enter a valid URL';
    }
  };
}

/**
 * Validate a number
 * @returns Validator function
 */
export function number(): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    
    if (isNaN(Number(value))) {
      return 'Must be a valid number';
    }
    return null;
  };
}

/**
 * Validate a number within a range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Validator function
 */
export function numberRange(min: number, max: number): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    
    const num = Number(value);
    if (isNaN(num)) {
      return 'Must be a valid number';
    }
    
    if (num < min || num > max) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  };
}

/**
 * Validate a percentage (0-100)
 * @returns Validator function
 */
export function percentage(): Validator<string> {
  return numberRange(0, 100);
}

/**
 * Create a validator for a password with common requirements
 * @param options - Password validation options
 * @returns Validator function
 */
export function password(options = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true
}): Validator<string> {
  return (value: string): ValidationResult => {
    if (!value) return null;
    
    const errors: string[] = [];
    
    if (options.minLength && value.length < options.minLength) {
      errors.push(`Password must be at least ${options.minLength} characters long`);
    }
    
    if (options.requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (options.requireLowercase && !/[a-z]/.test(value)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (options.requireNumber && !/\d/.test(value)) {
      errors.push('Password must contain at least one number');
    }
    
    if (options.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors.length > 0 ? errors[0] : null;
  };
}
