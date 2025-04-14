
/**
 * Input validation utilities
 */

/**
 * Validates an email address
 * 
 * @param email - Email to validate
 * @returns Error message or null if valid
 */
export const validateEmail = (email: string): string | null => {
  if (!email) return null; // Empty check should be done separately
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

/**
 * Validates a phone number
 * 
 * @param phone - Phone number to validate
 * @returns Error message or null if valid
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone) return null; // Empty check should be done separately
  
  // Allow formats like +1 123-456-7890, (123) 456-7890, 123.456.7890, etc.
  const phoneRegex = /^(\+\d{1,3} ?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number";
  }
  return null;
};

/**
 * Validates a URL
 * 
 * @param url - URL to validate
 * @returns Error message or null if valid
 */
export const validateUrl = (url: string): string | null => {
  if (!url) return null; // Empty check should be done separately
  
  try {
    new URL(url);
    return null;
  } catch {
    return "Please enter a valid URL";
  }
};

/**
 * Validates a password meets minimum requirements
 * 
 * @param password - Password to validate
 * @returns Error message or null if valid
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return null; // Empty check should be done separately
  
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  // Check if it has at least one lowercase, one uppercase, one digit, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character";
  }
  
  return null;
};

/**
 * Validates a ZIP/postal code
 * 
 * @param zipCode - ZIP/postal code to validate
 * @param countryCode - Optional country code for format validation
 * @returns Error message or null if valid
 */
export const validateZipCode = (zipCode: string, countryCode = 'US'): string | null => {
  if (!zipCode) return null; // Empty check should be done separately
  
  // US zip code format (5 digits, or 5+4)
  if (countryCode === 'US') {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      return "Please enter a valid US ZIP code (e.g., 12345 or 12345-6789)";
    }
  } else if (countryCode === 'CA') {
    // Canadian postal code format (A1A 1A1)
    const zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!zipRegex.test(zipCode)) {
      return "Please enter a valid Canadian postal code (e.g., A1A 1A1)";
    }
  } else if (countryCode === 'UK' || countryCode === 'GB') {
    // UK postcode format (complex)
    const zipRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!zipRegex.test(zipCode)) {
      return "Please enter a valid UK postcode";
    }
  }
  
  // Generic fallback validation (allow alphanumeric with spaces and hyphens)
  if (!/^[a-zA-Z0-9 -]+$/.test(zipCode)) {
    return "Please enter a valid postal/ZIP code";
  }
  
  return null;
};

/**
 * Validates a name (prevents numbers and special characters)
 * 
 * @param name - Name to validate
 * @returns Error message or null if valid
 */
export const validateName = (name: string): string | null => {
  if (!name) return null; // Empty check should be done separately
  
  // Allow letters, spaces, hyphens, and apostrophes (common in names)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return "Please enter a valid name (letters, spaces, hyphens, and apostrophes only)";
  }
  
  return null;
};
