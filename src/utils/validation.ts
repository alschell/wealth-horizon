
// Utility functions for validation

/**
 * Validates if the value is not empty
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validates email format
 */
export const validateEmail = (value: string): string | null => {
  if (!value) return 'Email is required';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Validates phone number format
 */
export const validatePhone = (value: string): string | null => {
  if (!value) return 'Phone number is required';
  
  // Allow various formats like: +1 (555) 123-4567, 555-123-4567, 5551234567, etc.
  const phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,4}\)\s?)?[\d\s-]{7,}$/;
  if (!phoneRegex.test(value)) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

/**
 * Validates LEI (Legal Entity Identifier) format
 */
export const validateLei = (value: string): string | null => {
  if (!value) return null; // LEI might be optional
  
  // LEI is a 20-character alphanumeric code
  const leiRegex = /^[A-Z0-9]{18}[0-9]{2}$/;
  if (!leiRegex.test(value)) {
    return 'Please enter a valid Legal Entity Identifier (20 characters)';
  }
  
  return null;
};

/**
 * Validates file size
 */
export const validateFileSize = (file: File, maxSizeInMB: number): string | null => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return `File size should not exceed ${maxSizeInMB}MB`;
  }
  return null;
};

/**
 * Validates file type based on allowed extensions
 */
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  if (!allowedTypes.includes(`.${fileExtension}`)) {
    return `Accepted file types: ${allowedTypes.join(', ')}`;
  }
  return null;
};

/**
 * Validates password strength
 */
export const validatePassword = (value: string): string | null => {
  if (!value) return 'Password is required';
  
  if (value.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  // Check for at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(value)) {
    return 'Password must include uppercase, lowercase, and numbers';
  }
  
  return null;
};
