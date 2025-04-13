
import { RegisterOptions, UseFormReturn, FieldValues, Path } from 'react-hook-form';

/**
 * Helper function to register a field with react-hook-form with improved type safety
 * 
 * @param form - The form instance from useForm
 * @param name - Field name
 * @param options - Registration options
 * @returns The field registration properties
 */
export function registerField<T extends FieldValues>(
  form: UseFormReturn<T>,
  name: Path<T>,
  options?: Omit<RegisterOptions<T, Path<T>>, 'deps'> & {
    deps?: Path<T>[] | Path<T>;
  }
): ReturnType<UseFormReturn<T>['register']> {
  return form.register(name, options as RegisterOptions<T, Path<T>>);
}

/**
 * Helper to create a field error accessor
 * 
 * @param form - The form instance from useForm
 * @returns A function to get field errors
 */
export function createErrorAccessor<T extends FieldValues>(
  form: UseFormReturn<T>
) {
  return (name: Path<T>): string | undefined => {
    return form.formState.errors[name]?.message as string | undefined;
  };
}

/**
 * Helper to check if a field has an error
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
