
/**
 * Common validation types
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FieldValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export interface ValidationOptions {
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnSubmit?: boolean;
}
