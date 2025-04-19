
export const validateNumber = (
  value: string | number,
  options: { min?: number; max?: number; integer?: boolean } = {}
): string | null => {
  try {
    if (!value && value !== 0) return null;
    const num = typeof value === 'string' ? Number(value) : value;
    
    if (isNaN(num)) return 'Please enter a valid number';
    if (options.integer && !Number.isInteger(num)) return 'Please enter a whole number';
    if (options.min !== undefined && num < options.min) return `Value must be at least ${options.min}`;
    if (options.max !== undefined && num > options.max) return `Value must be no more than ${options.max}`;
    
    return null;
  } catch (error) {
    console.error("Number validation error:", error);
    return "Number validation failed";
  }
};
