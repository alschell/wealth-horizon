
/**
 * File validation utilities
 */

/**
 * Validates file size
 * 
 * @param file - File to validate
 * @param maxSizeInMB - Maximum file size in MB
 * @returns Error message or null if valid
 */
export const validateFileSize = (file: File, maxSizeInMB: number): string | null => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
  if (file.size > maxSizeInBytes) {
    return `File size exceeds ${maxSizeInMB}MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
  }
  
  return null;
};

/**
 * Validates file type
 * 
 * @param file - File to validate
 * @param allowedMimeTypes - Array of allowed MIME types
 * @returns Error message or null if valid
 */
export const validateFileType = (file: File, allowedMimeTypes: string[]): string | null => {
  if (!allowedMimeTypes.includes(file.type)) {
    return `File type ${file.type} is not supported. Supported types: ${allowedMimeTypes.join(', ')}`;
  }
  
  return null;
};

/**
 * Validates image dimensions
 * 
 * @param file - Image file to validate
 * @param minWidth - Minimum width in pixels
 * @param minHeight - Minimum height in pixels
 * @param maxWidth - Maximum width in pixels
 * @param maxHeight - Maximum height in pixels
 * @returns Promise resolving to error message or null if valid
 */
export const validateImageDimensions = async (
  file: File,
  minWidth: number = 0,
  minHeight: number = 0,
  maxWidth: number = Infinity,
  maxHeight: number = Infinity
): Promise<string | null> => {
  if (!file.type.startsWith('image/')) {
    return "Not an image file";
  }
  
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      
      if (img.width < minWidth || img.height < minHeight) {
        resolve(`Image dimensions too small (minimum ${minWidth}x${minHeight}px)`);
      } else if (img.width > maxWidth || img.height > maxHeight) {
        resolve(`Image dimensions too large (maximum ${maxWidth}x${maxHeight}px)`);
      } else {
        resolve(null);
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve("Failed to load image");
    };
    
    img.src = objectUrl;
  });
};

/**
 * Validates file name length
 * 
 * @param file - File to validate
 * @param maxLength - Maximum file name length
 * @returns Error message or null if valid
 */
export const validateFileName = (file: File, maxLength: number = 255): string | null => {
  if (file.name.length > maxLength) {
    return `File name is too long (maximum ${maxLength} characters)`;
  }
  
  return null;
};

/**
 * Comprehensive file validation
 * 
 * @param file - File to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateFile = (file: File, options: {
  maxSizeInMB?: number;
  allowedMimeTypes?: string[];
  maxFileNameLength?: number;
} = {}): string | null => {
  const {
    maxSizeInMB = 5,
    allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'],
    maxFileNameLength = 255
  } = options;
  
  // Validate file size
  const sizeError = validateFileSize(file, maxSizeInMB);
  if (sizeError) return sizeError;
  
  // Validate file type
  const typeError = validateFileType(file, allowedMimeTypes);
  if (typeError) return typeError;
  
  // Validate file name
  const nameError = validateFileName(file, maxFileNameLength);
  if (nameError) return nameError;
  
  return null;
};
