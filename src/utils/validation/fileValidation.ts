
/**
 * File validation utilities for checking file size and type
 */

interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Validates if a file is within the specified size limit
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in megabytes
 * @returns ValidationResult with valid status and error message if invalid
 */
export const validateFileSize = (file: File, maxSizeMB: number): ValidationResult => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `File size exceeds the maximum allowed size of ${maxSizeMB}MB`
    };
  }
  
  return { valid: true };
};

/**
 * Validates if a file type is within the accepted types
 * @param file The file to validate
 * @param acceptedTypes Array of accepted file types/extensions
 * @returns ValidationResult with valid status and error message if invalid
 */
export const validateFileType = (file: File, acceptedTypes: string[]): ValidationResult => {
  // If no accepted types are specified, allow all types
  if (!acceptedTypes || acceptedTypes.length === 0) {
    return { valid: true };
  }
  
  // Check for direct mime type match
  if (acceptedTypes.some(type => {
    // Handle wildcard types like "image/*"
    if (type.includes('/*')) {
      const mainType = type.split('/')[0];
      return file.type.startsWith(`${mainType}/`);
    }
    
    // Handle direct mime type matches
    if (!type.startsWith('.') && file.type === type) {
      return true;
    }
    
    // Handle file extensions
    if (type.startsWith('.')) {
      const extension = type.toLowerCase();
      return file.name.toLowerCase().endsWith(extension);
    }
    
    return false;
  })) {
    return { valid: true };
  }
  
  return {
    valid: false,
    message: `File type not allowed. Accepted formats: ${acceptedTypes.join(', ')}`
  };
};
