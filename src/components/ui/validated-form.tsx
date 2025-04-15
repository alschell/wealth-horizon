
import React from 'react';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FormValidationError } from '@/components/ui/form-validation-error';
import { withErrorHandling } from '@/hooks/useErrorBoundary';

interface ValidatedFormProps<T extends Record<string, any>> {
  schema: z.ZodSchema<T>;
  defaultValues: T;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode | ((props: ValidatedFormChildrenProps<T>) => React.ReactNode);
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
  formTitle?: string;
  formDescription?: string;
  successMessage?: string;
  errorMessage?: string;
  showValidationSummary?: boolean;
}

interface ValidatedFormChildrenProps<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLElement>) => void;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  hasFieldError: (field: keyof T) => boolean;
  getFieldError: (field: keyof T) => string | undefined;
}

function ValidatedFormInner<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  className,
  formTitle,
  formDescription,
  successMessage,
  errorMessage,
  showValidationSummary = true
}: ValidatedFormProps<T>) {
  // Import the useValidatedForm hook
  const { 
    useValidatedForm 
  } = require('@/hooks/useValidatedForm');

  // Use our custom form hook
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setValue,
    handleSubmit,
    hasFieldError,
    getFieldError
  } = useValidatedForm({
    schema,
    defaultValues,
    onSubmit,
    successMessage,
    errorMessage
  });

  // Prepare props for children if they're a function
  const childrenProps: ValidatedFormChildrenProps<T> = {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setValue,
    hasFieldError,
    getFieldError
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {formTitle && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{formTitle}</h2>
          {formDescription && (
            <p className="text-gray-500">{formDescription}</p>
          )}
        </div>
      )}
      
      {showValidationSummary && Object.keys(errors).length > 0 && (
        <FormValidationError 
          errors={errors} 
          showAllErrors={true} 
        />
      )}
      
      <div className="space-y-4">
        {typeof children === 'function' ? children(childrenProps) : children}
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            {cancelLabel}
          </Button>
        )}
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

// Fix: Use proper options for withErrorHandling
export const ValidatedForm = withErrorHandling(
  ValidatedFormInner,
  {
    fallbackMessage: 'There was a problem with the form. Please try again.',
    showReset: true
  }
) as typeof ValidatedFormInner;

export default ValidatedForm;
