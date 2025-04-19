
/**
 * Date validation
 */
export const validateDate = (
  dateStr: string, 
  options?: {
    minDate?: Date;
    maxDate?: Date;
    notFuture?: boolean;
    notPast?: boolean;
  }
): string | null => {
  try {
    if (!dateStr) return "Date is required";
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date format";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (options?.minDate && date < options.minDate) {
      return `Date cannot be before ${options.minDate.toLocaleDateString()}`;
    }
    
    if (options?.maxDate && date > options.maxDate) {
      return `Date cannot be after ${options.maxDate.toLocaleDateString()}`;
    }
    
    if (options?.notFuture && date > today) {
      return "Date cannot be in the future";
    }
    
    if (options?.notPast && date < today) {
      return "Date cannot be in the past";
    }
    
    return null;
  } catch (error) {
    console.error("Date validation error:", error);
    return "Date validation failed";
  }
};
