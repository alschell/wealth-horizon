
/**
 * Email validation with proper pattern and error handling
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
