
/**
 * Required field validation
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  try {
    return !value.trim() ? `${fieldName} is required` : null;
  } catch (error) {
    console.error(`Required field validation error for ${fieldName}:`, error);
    return `${fieldName} validation failed`;
  }
};
