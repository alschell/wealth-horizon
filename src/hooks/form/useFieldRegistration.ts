
import { useCallback } from 'react';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

export interface FieldOptions {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

export function useFieldRegistration<T extends FieldValues>(form: UseFormReturn<T>) {
  /**
   * Register a field with the form
   */
  const registerField = useCallback(
    <K extends Path<T>>(
      name: K,
      options?: FieldOptions
    ) => {
      return {
        ...form.register(name, options),
        id: name,
        name,
        'aria-invalid': !!form.formState.errors[name],
        'aria-describedby': form.formState.errors[name] ? `${String(name)}-error` : undefined,
      };
    },
    [form]
  );

  /**
   * Get error for a field
   */
  const getFieldError = useCallback(
    <K extends Path<T>>(name: K): string | undefined => {
      const error = form.formState.errors[name];
      return error?.message as string | undefined;
    },
    [form.formState.errors]
  );

  /**
   * Check if a field has an error
   */
  const hasFieldError = useCallback(
    <K extends Path<T>>(name: K): boolean => {
      return !!form.formState.errors[name];
    },
    [form.formState.errors]
  );

  return {
    registerField,
    getFieldError,
    hasFieldError,
  };
}
