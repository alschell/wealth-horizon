
import { FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';

/**
 * Enhanced version of registerField with better TypeScript support
 * and more consistent ARIA attributes
 */
export function enhancedRegisterField<T extends FieldValues>(
  register: UseFormRegister<T>,
  errors: Record<string, any>,
) {
  return <K extends Path<T>>(
    name: K,
    options?: RegisterOptions<T, K>,
    ariaLabel?: string,
    id?: string
  ) => {
    const hasError = !!errors[name];
    const errorId = hasError ? `${String(name)}-error` : undefined;
    const fieldId = id || String(name);
    
    return {
      ...register(name, options),
      'aria-invalid': hasError ? 'true' : 'false',
      'aria-describedby': errorId,
      'aria-label': ariaLabel || String(name).replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      id: fieldId,
      name: String(name),
    };
  };
}

/**
 * Enhanced helper function to get the error message for a field with better TypeScript support
 */
export function getFieldError<T extends FieldValues>(
  errors: Record<string, any>,
  name: Path<T>
): string | undefined {
  if (!errors) return undefined;
  const error = errors[name];
  return error?.message;
}

/**
 * Enhanced helper to create form field IDs and ARIA attributes with better TypeScript support
 */
export function getEnhancedFieldAttrs<T extends FieldValues>(
  name: Path<T>,
  errors: Record<string, any>,
  options?: {
    ariaLabel?: string;
    id?: string;
    required?: boolean;
  }
) {
  const hasError = !!errors?.[name];
  const errorId = hasError ? `${String(name)}-error` : undefined;
  const fieldId = options?.id || String(name);
  
  return {
    id: fieldId,
    name: String(name),
    'aria-invalid': hasError ? 'true' : 'false',
    'aria-describedby': errorId,
    'aria-label': options?.ariaLabel || String(name).replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    'aria-required': options?.required ? 'true' : 'false',
  };
}
