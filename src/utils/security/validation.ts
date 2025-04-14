
/**
 * Security utilities for validating user input, URLs, and more
 */

/**
 * Enhanced URL validation to prevent open redirect vulnerabilities
 * @param url - URL to validate
 * @param options - Validation options
 * @returns Boolean indicating if URL is valid
 */
export const validateUrl = (url: string, options: {
  allowedDomains?: string[],
  allowRelative?: boolean,
  allowDataUrls?: boolean,
  allowedProtocols?: string[]
} = {}): boolean => {
  if (!url) return false;
  
  const {
    allowedDomains = ['wealthhorizon.com', 'api.wealthhorizon.com', 'cdn.wealthhorizon.com'],
    allowRelative = true,
    allowDataUrls = false,
    allowedProtocols = ['https:', 'http:']
  } = options;
  
  // Allow relative URLs if specified
  if (allowRelative && url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  // Check data URLs if allowed
  if (url.startsWith('data:') && !allowDataUrls) {
    return false;
  }
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // Check domain
    return allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false; // Invalid URL
  }
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @param options - Validation options
 * @returns Object with validity and message
 */
export const validatePasswordStrength = (
  password: string,
  options: {
    minLength?: number,
    requireUppercase?: boolean,
    requireLowercase?: boolean,
    requireNumbers?: boolean,
    requireSpecialChars?: boolean,
    maxLength?: number
  } = {}
): { valid: boolean, message: string } => {
  const {
    minLength = 12,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    maxLength = 128
  } = options;
  
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < minLength) {
    return { valid: false, message: `Password must be at least ${minLength} characters long` };
  }
  
  if (password.length > maxLength) {
    return { valid: false, message: `Password cannot exceed ${maxLength} characters` };
  }
  
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must include at least one uppercase letter' };
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must include at least one lowercase letter' };
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must include at least one number' };
  }
  
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: 'Password must include at least one special character' };
  }
  
  // Check for common patterns and dictionary words
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) {
    return { valid: false, message: 'Password is too common and easily guessable' };
  }
  
  // Check for repetitive patterns
  if (/(.)\1{2,}/.test(password)) {
    return { valid: false, message: 'Password contains repetitive patterns' };
  }
  
  // Check for sequential characters
  if (/abcdef|bcdefg|cdefgh|defghi|qwerty|asdfgh/i.test(password)) {
    return { valid: false, message: 'Password contains sequential characters' };
  }
  
  return { valid: true, message: 'Password meets all requirements' };
};

/**
 * Enhanced file content type validation
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param scanContent - Whether to scan content for deep validation
 * @returns Promise resolving to validation result
 */
export const validateFileContentType = (
  file: File, 
  allowedTypes: string[],
  scanContent: boolean = false
): Promise<boolean> => {
  if (!allowedTypes.includes(file.type)) {
    return Promise.resolve(false);
  }
  
  // Basic validation passed, but we can do deeper scanning if required
  if (scanContent && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For images, try to load them to verify they're valid
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  }
  
  return Promise.resolve(true);
};
