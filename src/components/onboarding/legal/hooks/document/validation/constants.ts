
export const FILE_VALIDATION = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  MESSAGES: {
    FILE_SIZE: 'File size must be less than 10MB',
    FILE_TYPE: 'Only PDF, JPEG and PNG files are allowed',
    REQUIRED_FIELD: 'This field is required',
  }
} as const;
