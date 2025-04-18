
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export const ERROR_MESSAGES = {
  FILE_SIZE: 'File size must be less than 10MB',
  FILE_TYPE: 'Only PDF, JPEG and PNG files are allowed',
  REQUIRED_FIELD: 'This field is required'
} as const;
