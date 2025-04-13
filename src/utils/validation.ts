
/**
 * Centralized validation utilities for consistent form validation across the app
 */

// Email validation with proper pattern
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email is required";
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  
  return null;
};

// Phone validation with international format support
export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return "Phone number is required";
  
  // Allow for different international formats
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number";
  }
  
  return null;
};

// Password validation with security requirements
export const validatePassword = (password: string): string | null => {
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
};

// URL validation
export const validateUrl = (url: string): string | null => {
  if (!url.trim()) return "URL is required";
  
  try {
    new URL(url);
    return null;
  } catch {
    return "Please enter a valid URL";
  }
};

// Legal Entity Identifier (LEI) validation
export const validateLei = (lei: string): string | null => {
  if (!lei.trim()) return null; // LEI might be optional

  // LEI is a 20-character alphanumeric string
  const leiRegex = /^[A-Z0-9]{18}[0-9]{2}$/;
  if (!leiRegex.test(lei)) {
    return "Please enter a valid LEI (20 characters, alphanumeric)";
  }
  
  return null;
};

// File size validation
export const validateFileSize = (file: File, maxSizeMB: number): string | null => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
  }
  return null;
};

// File type validation
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
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
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): string | null => {
  return !value.trim() ? `${fieldName} is required` : null;
};

// Text length validation
export const validateLength = (
  value: string, 
  fieldName: string, 
  min?: number, 
  max?: number
): string | null => {
  if (min !== undefined && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  
  if (max !== undefined && value.length > max) {
    return `${fieldName} cannot exceed ${max} characters`;
  }
  
  return null;
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
};
