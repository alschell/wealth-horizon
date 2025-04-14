
import React from 'react';
import { UseFormReturn, Path, FieldValues } from 'react-hook-form';
import { FormControl, FormDescription, FormField as ShadcnFormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createErrorAccessor } from '@/utils/form/enhancedFormUtils';

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  showErrorMessage?: boolean;
}

/**
 * Enhanced form field component with better typing support
 */
export function FormField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  children,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  showErrorMessage = true,
}: FormFieldProps<T>) {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement, { ...field }) : children}
          </FormControl>
          {description && <FormDescription className={descriptionClassName}>{description}</FormDescription>}
          {showErrorMessage && <FormMessage className={errorClassName} />}
        </FormItem>
      )}
    />
  );
}

/**
 * Creates a helper function to get field error message
 */
export function useFormErrors<T extends FieldValues>(form: UseFormReturn<T>) {
  return {
    getError: createErrorAccessor(form),
    hasError: (name: Path<T>) => !!form.formState.errors[name],
    isSubmitted: form.formState.isSubmitted,
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
  };
}
