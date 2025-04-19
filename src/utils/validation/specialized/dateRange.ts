
/**
 * Date range validation
 */
export const validateDateRange = (
  startDate: string,
  endDate: string
): string | null => {
  try {
    if (!startDate || !endDate) return null; // Both dates must be provided
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "Invalid date format";
    }
    
    if (start > end) {
      return "End date must be after start date";
    }
    
    return null;
  } catch (error) {
    console.error("Date range validation error:", error);
    return "Date range validation failed";
  }
};
