
export const FILE_VALIDATION = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'] as const,
  MESSAGES: {
    FILE_SIZE: 'File size must be less than 10MB',
    FILE_TYPE: 'Only PDF, JPEG and PNG files are allowed',
    REQUIRED_FIELD: 'This field is required',
  }
} as const;

// Re-export constants for backward compatibility
export const MAX_FILE_SIZE = FILE_VALIDATION.MAX_SIZE;
export const ALLOWED_FILE_TYPES = FILE_VALIDATION.ALLOWED_TYPES;
export const ERROR_MESSAGES = {
  FILE_SIZE: FILE_VALIDATION.MESSAGES.FILE_SIZE,
  FILE_TYPE: FILE_VALIDATION.MESSAGES.FILE_TYPE,
  REQUIRED_FIELD: FILE_VALIDATION.MESSAGES.REQUIRED_FIELD
};
