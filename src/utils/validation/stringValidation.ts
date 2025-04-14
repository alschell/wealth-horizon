
/**
 * String validation utilities with enhanced error handling
 * 
 * @module stringValidation
 */

/**
 * Advanced email validation with proper pattern and error handling
 * 
 * @param email - Email to validate
 * @param options - Optional validation options
 * @returns Error message or null if valid
 */
export const validateEmail = (
  email: string, 
  options?: { requireMX?: boolean, requireSecureDomain?: boolean }
): string | null => {
  try {
    if (!email.trim()) return "Email is required";
    
    // More comprehensive email regex that handles most valid email formats
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    // Additional security checks could be added here
    // e.g., MX record validation or secure domain requirements
    
    return null;
  } catch (error) {
    console.error("Email validation error:", error);
    return "Email validation failed";
  }
};

/**
 * Advanced phone validation with international format support
 * 
 * @param phone - Phone number to validate
 * @param options - Optional validation options
 * @returns Error message or null if valid
 */
export const validatePhone = (
  phone: string,
  options?: { requireCountryCode?: boolean, allowExtensions?: boolean }
): string | null => {
  try {
    if (!phone.trim()) return "Phone number is required";
    
    // More permissive regex for international formats
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    
    // Check for country code if required
    if (options?.requireCountryCode && !phone.startsWith('+') && !phone.startsWith('00')) {
      return "Phone number must include country code (e.g., +1)";
    }
    
    return null;
  } catch (error) {
    console.error("Phone validation error:", error);
    return "Phone validation failed";
  }
};

/**
 * Advanced URL validation with security features
 * 
 * @param url - URL to validate
 * @param options - Optional validation options
 * @returns Error message or null if valid
 */
export const validateUrl = (
  url: string,
  options?: { requireHttps?: boolean, allowedDomains?: string[] }
): string | null => {
  try {
    if (!url.trim()) return "URL is required";
    
    let urlObj: URL;
    
    try {
      urlObj = new URL(url);
    } catch {
      return "Please enter a valid URL";
    }
    
    // Check for HTTPS if required
    if (options?.requireHttps && urlObj.protocol !== 'https:') {
      return "URL must use HTTPS for security";
    }
    
    // Check for allowed domains if specified
    if (options?.allowedDomains && options.allowedDomains.length > 0) {
      const domain = urlObj.hostname;
      if (!options.allowedDomains.some(allowed => 
          domain === allowed || domain.endsWith(`.${allowed}`))) {
        return `URL domain must be one of: ${options.allowedDomains.join(', ')}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("URL validation error:", error);
    return "URL validation failed";
  }
};

/**
 * Advanced password validation with security requirements
 * 
 * @param password - Password to validate
 * @param options - Optional validation options
 * @returns Validation result with validity and message
 */
export const validatePassword = (
  password: string,
  options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecial?: boolean;
  }
): { valid: boolean; message: string; strength?: number } => {
  try {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecial = true
    } = options || {};
    
    if (!password) {
      return { valid: false, message: "Password is required", strength: 0 };
    }
    
    const errors: string[] = [];
    
    // Check length
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters`);
    }
    
    // Check for required character types
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter");
    }
    
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must include at least one lowercase letter");
    }
    
    if (requireNumbers && !/[0-9]/.test(password)) {
      errors.push("Password must include at least one number");
    }
    
    if (requireSpecial && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("Password must include at least one special character");
    }
    
    // Calculate strength
    let strength = 0;
    
    // Length contributes up to 40 points
    strength += Math.min(40, Math.floor((password.length / minLength) * 25));
    
    // Character variety contributes up to 60 points
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    
    // Unique characters ratio contributes up to 15 points
    const uniqueChars = new Set(password.split('')).size;
    const varietyBonus = Math.min(15, Math.floor((uniqueChars / password.length) * 25));
    strength += varietyBonus;
    
    // Cap at 100
    strength = Math.min(100, strength);
    
    if (errors.length > 0) {
      return { valid: false, message: errors[0], strength };
    }
    
    return { valid: true, message: "Password meets requirements", strength };
  } catch (error) {
    console.error("Password validation error:", error);
    return { valid: false, message: "Password validation failed" };
  }
};
