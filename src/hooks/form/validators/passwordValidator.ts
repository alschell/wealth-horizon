
/**
 * Password validation utility
 */

/**
 * Creates a validator function for password security
 * @param options Password validation options
 * @returns Validator function
 */
export const password = (options: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
} = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = options;
  
  return (value: string): string | null => {
    if (!value) return null; // Skip validation if empty
    
    const errors: string[] = [];
    
    if (value.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (requireUppercase && !/[A-Z]/.test(value)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requireLowercase && !/[a-z]/.test(value)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requireNumbers && !/\d/.test(value)) {
      errors.push('Password must contain at least one number');
    }
    
    if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors.length > 0 ? errors.join('. ') : null;
  };
};
