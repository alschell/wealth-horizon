
/**
 * Legal Entity Identifier (LEI) validation
 */
export const validateLei = (lei: string): string | null => {
  try {
    if (!lei.trim()) return null; // LEI might be optional

    // LEI is a 20-character alphanumeric string
    const leiRegex = /^[A-Z0-9]{18}[0-9]{2}$/;
    if (!leiRegex.test(lei)) {
      return "Please enter a valid LEI (20 characters, alphanumeric)";
    }
    
    return null;
  } catch (error) {
    console.error("LEI validation error:", error);
    return "LEI validation failed";
  }
};
