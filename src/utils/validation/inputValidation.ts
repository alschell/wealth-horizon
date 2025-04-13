
/**
 * Input validation utilities for form fields
 * Contains validators for common input types like email, phone, password, etc.
 */

// Type definitions for validation results
export type ValidationResult = {
  valid: boolean;
  message: string | null;
};

/**
 * Validates email format with proper pattern and error handling
 * 
 * @param email - Email string to validate
 * @returns Null if valid, error message if invalid
 */
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

/**
 * Validates phone number format with international format support
 * 
 * @param phone - Phone number string to validate
 * @returns Null if valid, error message if invalid
 */
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

/**
 * Validates password strength with security requirements
 * 
 * @param password - Password string to validate
 * @returns Null if valid, error message if invalid
 */
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

/**
 * Validates URL format
 * 
 * @param url - URL string to validate
 * @returns Null if valid, error message if invalid
 */
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

/**
 * Validates required field
 * 
 * @param value - Field value to validate
 * @param fieldName - Name of the field for error message
 * @returns Null if valid, error message if invalid
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  try {
    return !value.trim() ? `${fieldName} is required` : null;
  } catch (error) {
    console.error(`Required field validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};

/**
 * Validates text length
 * 
 * @param value - Text value to validate
 * @param fieldName - Name of the field for error message
 * @param min - Minimum length (optional)
 * @param max - Maximum length (optional)
 * @returns Null if valid, error message if invalid
 */
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
