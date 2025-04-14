
/**
 * String validation utilities with stronger typing and enhanced security
 * 
 * @module stringValidation
 */

/**
 * Validates email format with comprehensive checks
 * 
 * @param email - Email to validate
 * @returns String error message or null if valid
 */
export const validateEmail = (email: string): string | null => {
  try {
    if (!email.trim()) return "Email is required";
    
    // More comprehensive email validation
    // RFC 5322 compliant regex
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    // Check for common disposable email domains
    const disposableDomains = ['mailinator.com', 'tempmail.com', 'fakeinbox.com', 'yopmail.com'];
    const domain = email.split('@')[1].toLowerCase();
    
    if (disposableDomains.includes(domain)) {
      return "Please use a non-disposable email address";
    }
    
    return null;
  } catch (error) {
    console.error("Email validation error:", error);
    return "Email validation failed";
  }
};

/**
 * Validates phone number with international format support
 * 
 * @param phone - Phone number to validate
 * @param countryCode - Optional country code for region-specific validation
 * @returns String error message or null if valid
 */
export const validatePhone = (phone: string, countryCode?: string): string | null => {
  try {
    if (!phone.trim()) return "Phone number is required";
    
    // Basic universal phone format check
    const basicPhoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    
    if (!basicPhoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    
    // Country-specific validation if country code provided
    if (countryCode) {
      // Example: US phone validation
      if (countryCode === 'US' || countryCode === '+1') {
        const usPhoneRegex = /^(\+?1[-\s.]?)?(\(?\d{3}\)?[-\s.]?){1}\d{3}[-\s.]?\d{4}$/;
        if (!usPhoneRegex.test(phone)) {
          return "Please enter a valid US phone number";
        }
      }
      
      // Add more country-specific validation as needed
    }
    
    return null;
  } catch (error) {
    console.error("Phone validation error:", error);
    return "Phone validation failed";
  }
};

/**
 * Validates URL with enhanced security checks
 * 
 * @param url - URL to validate
 * @param options - Validation options including allowed domains
 * @returns String error message or null if valid
 */
export const validateUrl = (
  url: string, 
  options?: { 
    allowedDomains?: string[],
    requireHttps?: boolean,
    allowRelative?: boolean
  }
): string | null => {
  try {
    if (!url.trim()) return "URL is required";
    
    const { 
      allowedDomains = [], 
      requireHttps = true,
      allowRelative = true
    } = options || {};
    
    // Handle relative URLs
    if (allowRelative && url.startsWith('/') && !url.startsWith('//')) {
      return null;
    }
    
    // Full URL validation
    try {
      const urlObj = new URL(url);
      
      // HTTPS check
      if (requireHttps && urlObj.protocol !== 'https:') {
        return "URL must use HTTPS for security";
      }
      
      // Domain allowlist check
      if (allowedDomains.length > 0) {
        const isAllowedDomain = allowedDomains.some(domain => 
          urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
        );
        
        if (!isAllowedDomain) {
          return `URL domain not allowed. Allowed domains: ${allowedDomains.join(', ')}`;
        }
      }
      
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
 * Validates password strength with detailed feedback
 * 
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Validation result with details and strength score
 */
export interface PasswordValidationResult {
  valid: boolean;
  message: string;
  errors?: string[];
  strength?: number;
  suggestions?: string[];
}

export const validatePassword = (
  password: string,
  options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    maxLength?: number;
  }
): PasswordValidationResult => {
  try {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true,
      maxLength = 128
    } = options || {};
    
    if (!password) {
      return { 
        valid: false, 
        message: "Password is required",
        strength: 0
      };
    }
    
    const errors: string[] = [];
    const suggestions: string[] = [];
    let strength = 0;
    
    // Length checks
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
      suggestions.push(`Add ${minLength - password.length} more characters`);
    } else {
      strength += Math.min(30, password.length * 2);
    }
    
    if (password.length > maxLength) {
      errors.push(`Password cannot exceed ${maxLength} characters`);
    }
    
    // Character type checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
    
    if (requireUppercase && !hasUppercase) {
      errors.push("Password must include at least one uppercase letter");
      suggestions.push("Add an uppercase letter (A-Z)");
    } else if (hasUppercase) {
      strength += 10;
    }
    
    if (requireLowercase && !hasLowercase) {
      errors.push("Password must include at least one lowercase letter");
      suggestions.push("Add a lowercase letter (a-z)");
    } else if (hasLowercase) {
      strength += 10;
    }
    
    if (requireNumbers && !hasNumbers) {
      errors.push("Password must include at least one number");
      suggestions.push("Add a number (0-9)");
    } else if (hasNumbers) {
      strength += 10;
    }
    
    if (requireSpecialChars && !hasSpecialChars) {
      errors.push("Password must include at least one special character");
      suggestions.push("Add a special character (!@#$%^&*)");
    } else if (hasSpecialChars) {
      strength += 15;
    }
    
    // Common password check
    const commonPasswords = [
      'password', '123456', 'qwerty', 'admin', 'welcome',
      'letmein', 'monkey', 'password123', 'abc123'
    ];
    
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push("Password is too common and easily guessable");
      suggestions.push("Choose a unique password not based on common words");
      strength = Math.max(0, strength - 30);
    }
    
    // Pattern checks
    if (/(.)\1{2,}/.test(password)) {
      errors.push("Password contains repetitive patterns");
      suggestions.push("Avoid repeating characters (e.g., 'aaa')");
      strength = Math.max(0, strength - 10);
    }
    
    if (/12345|qwerty|asdfg|zxcvb/i.test(password)) {
      errors.push("Password contains sequential patterns");
      suggestions.push("Avoid sequential characters (e.g., '12345')");
      strength = Math.max(0, strength - 10);
    }
    
    // Variety bonus
    const uniqueChars = new Set(password.split('')).size;
    const varietyRatio = uniqueChars / password.length;
    const varietyBonus = Math.round(varietyRatio * 25);
    strength += varietyBonus;
    
    // Cap strength at 100
    strength = Math.min(100, strength);
    
    return {
      valid: errors.length === 0,
      message: errors.length === 0 
        ? `Password is ${strength >= 80 ? 'strong' : strength >= 50 ? 'moderate' : 'weak'}`
        : errors[0],
      errors: errors.length > 0 ? errors : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      strength
    };
  } catch (error) {
    console.error("Password validation error:", error);
    return { 
      valid: false, 
      message: "Password validation failed",
      strength: 0
    };
  }
};
