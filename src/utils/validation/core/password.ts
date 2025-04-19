
/**
 * Password validation with security requirements and error handling
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
