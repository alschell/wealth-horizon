
export interface PasswordValidationResult {
  valid: boolean;
  message: string;
  strength?: number;
  errors?: string[];
}

interface PasswordValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  maxLength?: number;
}

/**
 * Validates password strength and security requirements
 */
export function validatePasswordStrength(
  password: string,
  options: PasswordValidationOptions = {}
): PasswordValidationResult {
  const {
    minLength = 12,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    maxLength = 128
  } = options;
  
  const errors: string[] = [];
  
  // Basic validation
  if (!password) {
    return { valid: false, message: 'Password is required', errors: ['Password is required'] };
  }
  
  // Length checks
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (password.length > maxLength) {
    errors.push(`Password cannot exceed ${maxLength} characters`);
  }
  
  // Character requirements
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter');
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must include at least one lowercase letter');
  }
  
  if (requireNumbers && !/[0-9]/.test(password)) {
    errors.push('Password must include at least one number');
  }
  
  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must include at least one special character');
  }
  
  // Pattern checks
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) {
    errors.push('Password is too common and easily guessable');
  }
  
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password contains repetitive patterns');
  }
  
  if (/abcdef|bcdefg|cdefgh|defghi|qwerty|asdfgh/i.test(password)) {
    errors.push('Password contains sequential characters');
  }
  
  // Calculate strength
  let strength = 0;
  strength += Math.min(password.length * 4, 40);
  if (/[A-Z]/.test(password)) strength += 10;
  if (/[a-z]/.test(password)) strength += 10;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 15;
  if (/(.)\1{2,}/.test(password)) strength -= 10;
  if (/^123456|password|admin|qwerty|welcome|123123/i.test(password)) strength -= 20;
  
  strength = Math.max(0, Math.min(100, strength));
  
  const valid = errors.length === 0;
  const message = valid ? 
    'Password meets all requirements' : 
    errors[0];
  
  return { valid, message, strength, errors };
}
