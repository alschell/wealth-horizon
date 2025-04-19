
/**
 * Phone validation with international format support and error handling
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
