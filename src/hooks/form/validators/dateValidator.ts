
/**
 * Date validation utility
 */

/**
 * Creates a validator function for date values
 * @param options Date validation options
 * @returns Validator function
 */
export const date = (options: { min?: Date; max?: Date; notFuture?: boolean; notPast?: boolean } = {}) => {
  return (value: string | Date): string | null => {
    if (!value) return null; // Skip validation if empty
    
    try {
      const dateObj = value instanceof Date ? value : new Date(value);
      
      if (isNaN(dateObj.getTime())) {
        return 'Please enter a valid date';
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (options.min && dateObj < options.min) {
        return `Date must be on or after ${options.min.toLocaleDateString()}`;
      }
      
      if (options.max && dateObj > options.max) {
        return `Date must be on or before ${options.max.toLocaleDateString()}`;
      }
      
      if (options.notFuture && dateObj > today) {
        return 'Date cannot be in the future';
      }
      
      if (options.notPast && dateObj < today) {
        return 'Date cannot be in the past';
      }
      
      return null;
    } catch (error) {
      return 'Please enter a valid date';
    }
  };
};
