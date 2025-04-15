
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStateOptions } from './types';
import { FieldValues } from 'react-hook-form';

/**
 * Hook for managing form state using react-hook-form
 * 
 * @param options Form state options
 * @returns Form methods from react-hook-form
 */
export function useFormState<T extends FieldValues>({
  schema,
  defaultValues,
  ...formOptions
}: FormStateOptions<T>) {
  // Initialize react-hook-form with zod resolver if schema is provided
  return useForm<T>({
    ...formOptions,
    defaultValues,
    ...(schema && { resolver: zodResolver(schema) })
  });
}
