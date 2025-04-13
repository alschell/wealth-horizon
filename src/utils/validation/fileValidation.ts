/**
 * File validation utilities
 * Contains validators for file types, sizes, and content
 */

/**
 * Validates file size
 * 
 * @param file - File object to validate
 * @param maxSizeMB - Maximum file size in megabytes
 * @returns Null if valid, error message if invalid
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
 * Validates file type based on extension or MIME type
 * 
 * @param file - File object to validate
 * @param allowedTypes - Array of allowed file types/extensions
 * @returns Null if valid, error message if invalid
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

/**
 * Validates file content type (deeper validation)
 * Can perform content inspection for certain file types
 * 
 * @param file - File object to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param scanContent - Whether to scan file content (for images, etc.)
 * @returns Promise resolving to boolean indicating validity
 */
export const validateFileContentType = (
  file: File, 
  allowedTypes: string[],
  scanContent: boolean = false
): Promise<boolean> => {
  if (!allowedTypes.includes(file.type)) {
    return Promise.resolve(false);
  }
  
  // Basic validation passed, but we can do deeper scanning if required
  if (scanContent && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For images, try to load them to verify they're valid
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  }
  
  return Promise.resolve(true);
};

/**
 * Comprehensive file validation that combines multiple checks
 * 
 * @param file - File object to validate
 * @param options - Validation options
 * @returns Promise resolving to validation result
 */
export const validateFile = async (
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
    scanContent?: boolean;
  } = {}
): Promise<{ valid: boolean; message: string | null }> => {
  try {
    const { 
      maxSizeMB = 5, 
      allowedTypes = ["application/pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
      scanContent = false
    } = options;
    
    // Check file size
    const sizeError = validateFileSize(file, maxSizeMB);
    if (sizeError) {
      return { valid: false, message: sizeError };
    }
    
    // Check file type
    const typeError = validateFileType(file, allowedTypes);
    if (typeError) {
      return { valid: false, message: typeError };
    }
    
    // Advanced content validation if enabled
    if (scanContent) {
      const isValidContent = await validateFileContentType(file, allowedTypes, true);
      if (!isValidContent) {
        return { valid: false, message: "File content validation failed" };
      }
    }
    
    return { valid: true, message: null };
  } catch (error) {
    console.error("File validation error:", error);
    return { valid: false, message: "File validation failed" };
  }
};
