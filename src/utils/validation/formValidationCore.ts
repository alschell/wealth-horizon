
/**
 * Core validation functions for form fields
 */

/**
 * Check if a field is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Required field validation
 */
export function validateRequired(value: any, fieldName: string = 'Field'): string | null {
  return isEmpty(value) ? `${fieldName} is required` : null;
}

/**
 * Email validation
 */
export function validateEmail(email: string): string | null {
  if (isEmpty(email)) return null; // Let required validation handle empty case
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) ? null : 'Please enter a valid email address';
}

/**
 * Phone number validation
 */
export function validatePhone(phone: string): string | null {
  if (isEmpty(phone)) return null; // Let required validation handle empty case
  
  // This is a simplified regex - adjust based on your needs
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone) ? null : 'Please enter a valid phone number';
}

/**
 * Date validation
 */
export function validateDate(date: string): string | null {
  if (isEmpty(date)) return null; // Let required validation handle empty case
  
  const dateObj = new Date(date);
  return isNaN(dateObj.getTime()) ? 'Please enter a valid date' : null;
}

/**
 * URL validation
 */
export function validateUrl(url: string): string | null {
  if (isEmpty(url)) return null; // Let required validation handle empty case
  
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
}

/**
 * Min length validation
 */
export function validateMinLength(value: string, minLength: number): string | null {
  if (isEmpty(value)) return null; // Let required validation handle empty case
  
  return value.length < minLength ? `Must be at least ${minLength} characters` : null;
}

/**
 * Max length validation
 */
export function validateMaxLength(value: string, maxLength: number): string | null {
  if (isEmpty(value)) return null; // Let required validation handle empty case
  
  return value.length > maxLength ? `Must be no more than ${maxLength} characters` : null;
}

/**
 * Confirm password validation
 */
export function validatePasswordMatch(password: string, confirmPassword: string): string | null {
  if (isEmpty(confirmPassword)) return null; // Let required validation handle empty case
  
  return password !== confirmPassword ? 'Passwords do not match' : null;
}

/**
 * Numeric value validation
 */
export function validateNumeric(value: string): string | null {
  if (isEmpty(value)) return null; // Let required validation handle empty case
  
  return isNaN(Number(value)) ? 'Please enter a numeric value' : null;
}

/**
 * Value between min and max validation
 */
export function validateRange(value: string | number, min: number, max: number): string | null {
  if (isEmpty(value)) return null; // Let required validation handle empty case
  
  const numValue = typeof value === 'number' ? value : Number(value);
  
  if (isNaN(numValue)) return 'Please enter a numeric value';
  
  if (numValue < min) return `Value must be at least ${min}`;
  if (numValue > max) return `Value must be no more than ${max}`;
  
  return null;
}
