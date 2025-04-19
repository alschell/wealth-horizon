
/**
 * URL validation with error handling
 */
export const validateUrl = (url: string): string | null => {
  try {
    if (!url.trim()) return "URL is required";
    
    try {
      new URL(url);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  } catch (error) {
    console.error("URL validation error:", error);
    return "URL validation failed";
  }
};
