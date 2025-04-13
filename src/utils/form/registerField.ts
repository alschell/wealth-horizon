
import { FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';

/**
 * Creates a function that registers a field with react-hook-form
 * and provides appropriate ARIA attributes
 */
export function registerField<T extends FieldValues>(
  register: UseFormRegister<T>,
  errors: Record<string, any>,
) {
  return <K extends Path<T>>(
    name: K,
    options?: RegisterOptions,
    ariaLabel?: string
  ) => {
    const hasError = !!errors[name];
    const errorId = hasError ? `${String(name)}-error` : undefined;
    
    return {
      ...register(name, options),
      'aria-invalid': hasError,
      'aria-describedby': errorId,
      'aria-label': ariaLabel,
      id: String(name),
    };
  };
}

/**
 * Helper function to get the error message for a field
 */
export function getFieldError<T extends FieldValues>(
  errors: Record<string, any>,
  name: Path<T>
): string | undefined {
  const error = errors[name];
  return error?.message;
}

/**
 * Helper to create form field IDs and ARIA attributes
 */
export function getFieldAttrs<T extends FieldValues>(
  name: Path<T>,
  errors: Record<string, any>,
  ariaLabel?: string
) {
  const hasError = !!errors[name];
  const errorId = hasError ? `${String(name)}-error` : undefined;
  
  return {
    id: String(name),
    name,
    'aria-invalid': hasError,
    'aria-describedby': errorId,
    'aria-label': ariaLabel,
  };
}
