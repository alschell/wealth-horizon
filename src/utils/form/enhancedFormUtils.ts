
import { 
  RegisterOptions, 
  UseFormReturn, 
  FieldValues, 
  Path, 
  FieldError 
} from 'react-hook-form';

/**
 * Enhanced helper function to register a field with react-hook-form with improved type safety
 * 
 * @param form - The form instance from useForm
 * @param name - Field name
 * @param options - Registration options
 * @returns The field registration properties
 */
export function registerField<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
  options?: RegisterOptions<T, Path<T>>
): ReturnType<UseFormReturn<T>['register']> {
  return form.register(name, options);
}

/**
 * Helper to create a field error accessor with better typing
 * 
 * @param form - The form instance from useForm
 * @returns A function to get field errors
 */
export function createErrorAccessor<T extends FieldValues>(
  form: UseFormReturn<T>
) {
  return (name: Path<T>): string | undefined => {
    const fieldError = form.formState.errors[name] as FieldError | undefined;
    return fieldError?.message;
  };
}

/**
 * Helper to check if a field has an error with better typing
 * 
 * @param form - The form instance from useForm
 * @returns A function to check if a field has an error
 */
export function createErrorChecker<T extends FieldValues>(
  form: UseFormReturn<T>
) {
  return (name: Path<T>): boolean => {
    return !!form.formState.errors[name];
  };
}

/**
 * Helper to create a touched field checker
 * 
 * @param form - The form instance from useForm
 * @returns A function to check if a field has been touched
 */
export function createFocusedChecker<T extends FieldValues>(
  form: UseFormReturn<T>
) {
  return (name: Path<T>): boolean => {
    // Use hasOwnProperty to safely check if the field exists in touchedFields
    return Object.prototype.hasOwnProperty.call(form.formState.touchedFields, name) && 
           !!form.formState.touchedFields[name as keyof typeof form.formState.touchedFields];
  };
}

/**
 * Creates a field value accessor
 * 
 * @param form - The form instance from useForm
 * @returns A function to get field values
 */
export function createValueAccessor<T extends FieldValues>(
  form: UseFormReturn<T>
) {
  return <K extends Path<T>>(name: K): any => {
    return form.watch(name);
  };
}
