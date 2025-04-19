
/**
 * Credit card validation
 */
export const validateCreditCard = (cardNumber: string): string | null => {
  try {
    if (!cardNumber.trim()) return "Credit card number is required";
    
    // Remove spaces and dashes
    const sanitizedNumber = cardNumber.replace(/[\s-]/g, '');
    
    // Check if contains only digits
    if (!/^\d+$/.test(sanitizedNumber)) {
      return "Credit card number must contain only digits";
    }
    
    // Check length (most cards are 13-19 digits)
    if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
      return "Credit card number has an invalid length";
    }
    
    // Luhn algorithm (checksum) validation
    let sum = 0;
    let double = false;
    
    // Loop from right to left
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedNumber.charAt(i));
      
      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      double = !double;
    }
    
    if (sum % 10 !== 0) {
      return "Invalid credit card number";
    }
    
    return null;
  } catch (error) {
    console.error("Credit card validation error:", error);
    return "Credit card validation failed";
  }
};
