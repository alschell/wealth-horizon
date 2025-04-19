
/**
 * Number validation
 */
export const validateNumber = (
  value: string, 
  options?: {
    min?: number;
    max?: number;
    integer?: boolean;
  }
): string | null => {
  try {
    if (!value.trim()) return "Number is required";
    
    const num = Number(value);
    if (isNaN(num)) return "Please enter a valid number";
    
    if (options?.integer && !Number.isInteger(num)) {
      return "Please enter a whole number";
    }
    
    if (options?.min !== undefined && num < options.min) {
      return `Number must be at least ${options.min}`;
    }
    
    if (options?.max !== undefined && num > options.max) {
      return `Number cannot exceed ${options.max}`;
    }
    
    return null;
  } catch (error) {
    console.error("Number validation error:", error);
    return "Number validation failed";
  }
};
