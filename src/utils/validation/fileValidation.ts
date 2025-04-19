/**
 * File validation utilities
 */

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  required?: boolean;
  minFiles?: number;
  maxFiles?: number;
}

/**
 * Validates a file against specified constraints
 * 
 * @param file File to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateFile = (
  file: File | null,
  options: FileValidationOptions = {}
): string | null => {
  const { 
    maxSize, 
    allowedTypes, 
    required = false 
  } = options;

  // Check if file is required but not provided
  if (required && (!file || !(file instanceof File))) {
    return 'File is required';
  }

  // If no file and not required, skip validation
  if (!file) {
    return null;
  }

  // Check file type if specified
  if (allowedTypes && allowedTypes.length > 0) {
    const fileType = file.type.toLowerCase();
    if (!allowedTypes.some(type => fileType.includes(type.toLowerCase()))) {
      return `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`;
    }
  }

  // Check file size if specified
  if (maxSize && file.size > maxSize) {
    // Format size for display
    const formattedSize = maxSize >= 1048576 
      ? `${(maxSize / 1048576).toFixed(1)} MB` 
      : `${Math.floor(maxSize / 1024)} KB`;
      
    return `File is too large. Maximum size: ${formattedSize}`;
  }

  return null;
};

/**
 * Validates a collection of files
 * 
 * @param files Files to validate
 * @param options Validation options
 * @returns Error message or null if valid
 */
export const validateFiles = (
  files: File[] | FileList | null,
  options: FileValidationOptions = {}
): string | null => {
  const { 
    minFiles = 0, 
    maxFiles,
    required = false 
  } = options;

  // Convert FileList to array if needed
  const fileArray = files 
    ? Array.from(files)
    : [];

  // Check if files are required but not provided
  if (required && fileArray.length === 0) {
    return 'File upload is required';
  }

  // Check minimum files
  if (minFiles > 0 && fileArray.length < minFiles) {
    return `Please upload at least ${minFiles} file${minFiles !== 1 ? 's' : ''}`;
  }

  // Check maximum files
  if (maxFiles && fileArray.length > maxFiles) {
    return `You can upload a maximum of ${maxFiles} file${maxFiles !== 1 ? 's' : ''}`;
  }

  // Validate each file
  for (const file of fileArray) {
    const error = validateFile(file, options);
    if (error) return error;
  }

  return null;
};

/**
 * Validates file size
 * 
 * @param file File to validate
 * @param maxSize Maximum size in bytes
 * @returns Error message or null if valid
 */
export const validateFileSize = (file: File, maxSize: number): string | null => {
  if (file.size > maxSize) {
    const sizeInMB = (maxSize / 1048576).toFixed(1);
    return `File exceeds maximum size of ${sizeInMB} MB`;
  }
  return null;
};

/**
 * Validates file type
 * 
 * @param file File to validate
 * @param allowedTypes Array of allowed MIME types or extensions
 * @returns Error message or null if valid
 */
export const validateFileType = (file: File, allowedTypes: string[]): string | null => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  const isAllowed = allowedTypes.some(type => {
    // Check if it's a MIME type pattern
    if (type.includes('/')) {
      if (type.endsWith('*')) {
        // Handle wildcard MIME types, e.g., "image/*"
        const typePrefix = type.split('/')[0];
        return fileType.startsWith(`${typePrefix}/`);
      }
      return fileType === type;
    }
    
    // Otherwise, check file extension
    return fileName.endsWith(`.${type.replace('.', '')}`);
  });
  
  if (!isAllowed) {
    return `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};
