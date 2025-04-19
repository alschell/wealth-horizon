
/**
 * File validation utilities
 */

export interface FileValidationOptions {
  maxSize?: number; // In bytes
  allowedTypes?: string[];
  required?: boolean;
}

const DEFAULT_OPTIONS: FileValidationOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ],
  required: true
};

/**
 * Validates a file against size and type constraints
 * @param file - File to validate
 * @param options - Validation options
 * @returns Error message or null if valid
 */
export const validateFile = (
  file: File | null,
  options: FileValidationOptions = DEFAULT_OPTIONS
): string | null => {
  const { maxSize, allowedTypes, required } = { ...DEFAULT_OPTIONS, ...options };
  
  // Check if required
  if (required && !file) {
    return 'File is required';
  }
  
  // If not required and not provided, it's valid
  if (!required && !file) {
    return null;
  }
  
  // At this point, file should be non-null
  if (file) {
    // Check file size
    if (maxSize && file.size > maxSize) {
      const sizeMB = Math.round(maxSize / (1024 * 1024));
      return `File size exceeds ${sizeMB}MB limit`;
    }
    
    // Check file type
    if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
  }
  
  return null;
};

/**
 * Validates file size
 * @param file - File to validate
 * @param maxSize - Maximum file size in bytes
 * @returns Error message or null if valid
 */
export const validateFileSize = (file: File, maxSize: number = 5 * 1024 * 1024): string | null => {
  if (file.size > maxSize) {
    const sizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size exceeds ${sizeMB}MB limit`;
  }
  return null;
};

/**
 * Validates file type
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @returns Error message or null if valid
 */
export const validateFileType = (
  file: File,
  allowedTypes: string[] = DEFAULT_OPTIONS.allowedTypes || []
): string | null => {
  if (!allowedTypes.includes(file.type)) {
    return `File type ${file.type} is not supported`;
  }
  return null;
};
