/**
 * File validation utilities
 */

/**
 * File size validation with error handling
 */
export const validateFileSize = (file: File, maxSizeMB: number): string | null => {
  try {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds the maximum allowed size of ${maxSizeMB}MB`;
    }
    return null;
  } catch (error) {
    console.error("File size validation error:", error);
    return "File size validation failed";
  }
};

/**
 * File type validation with error handling
 */
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  try {
    // Check file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = `.${fileName.split('.').pop()}`;
    
    // If allowedTypes contains MIME types (with '/'), check against file.type
    // Otherwise, check against the file extension
    const isValidType = allowedTypes.some(type => 
      type.includes('/') 
        ? file.type === type
        : fileExtension === type.toLowerCase()
    );
    
    if (!isValidType) {
      return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
    }
    
    return null;
  } catch (error) {
    console.error("File type validation error:", error);
    return "File type validation failed";
  }
};
