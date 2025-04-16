
/**
 * Core validation utilities for the application
 */

// Email validation
export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  return null;
}

// Name validation
export function validateName(name: string): string | null {
  if (!name) return 'Name is required';
  
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  return null;
}

// LEI (Legal Entity Identifier) validation
export function validateLei(lei: string): string | null {
  if (!lei) return null; // Optional field
  
  // LEI is a 20-character alphanumeric code
  if (lei.length !== 20) {
    return 'LEI must be exactly 20 characters';
  }
  
  // LEI format validation (basic check)
  if (!/^[A-Z0-9]{18}[0-9]{2}$/.test(lei)) {
    return 'Invalid LEI format';
  }
  
  // More sophisticated validation could be added here
  // e.g., checksum validation, issuer prefix validation, etc.
  
  return null;
}

// URL validation
export function validateUrl(url: string): string | null {
  if (!url) return null; // Optional field
  
  try {
    new URL(url);
    return null;
  } catch (e) {
    return 'Please enter a valid URL';
  }
}

// Phone number validation (basic)
export function validatePhone(phone: string): string | null {
  if (!phone) return null; // Optional field
  
  // Remove non-digit characters for validation
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length < 10) {
    return 'Phone number must have at least 10 digits';
  }
  
  return null;
}

// Date validation
export function validateDate(date: string | Date): string | null {
  if (!date) return null; // Optional field
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }
  
  return null;
}

// Required field validation
export function validateRequired(value: any, fieldName: string = 'Field'): string | null {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  
  if (Array.isArray(value) && value.length === 0) {
    return `${fieldName} is required`;
  }
  
  return null;
}

// Composite validation (run multiple validations)
export function validateComposite(value: any, validators: ((value: any) => string | null)[]): string | null {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  
  return null;
}
