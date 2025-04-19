
import { useCallback } from 'react';
import { useIsComponentMounted } from '../useIsComponentMounted';
import { useFormState } from './core/useFormState';
import { useFormHandlers } from './core/useFormHandlers';
import { useFormValidation } from './core/useFormValidation';
import { useFormSubmission } from './core/useFormSubmission';
import { validateRequiredFields, createErrorClearer } from './utils';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';

/**
 * Unified form hook for handling form state, validation, and submission
 * @param props - Form configuration
 * @returns Form state, actions, and helpers
 */
export function useUnifiedForm<T extends Record<string, any>>(props: UseUnifiedFormProps<T>): UseUnifiedFormReturn<T> {
  const {
    initialValues,
    validate,
    onSubmit,
    onSuccess,
    onError,
    successMessage = 'Form submitted successfully',
    errorMessage = 'An error occurred. Please try again.',
    requiredFields = []
  } = props;

  const isMounted = useIsComponentMounted();
  
  // Initialize form state
  const {
    formState,
    setValues,
    setErrors,
    setTouched,
    resetFormState
  } = useFormState<T>(initialValues);

  // Initialize form handlers
  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues
  } = useFormHandlers<T>({
    setValues,
    clearError: (field) => {
      // Fix the type error by using separate variable and proper typing
      const clearFieldError = (prevErrors: Record<string, string>) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field as string];
        return newErrors as Partial<Record<keyof T, string>>;
      };
      setErrors(clearFieldError);
    },
    setTouched
  });

  // Initialize form validation
  const {
    validateForm: validateFormFields,
    setFieldError,
    clearFieldError
  } = useFormValidation<T>({
    validate,
    requiredFields,
    setErrors
  });

  // Validate form
  const validateForm = useCallback(() => {
    return validateFormFields(formState.values);
  }, [validateFormFields, formState.values]);

  // Initialize form submission
  const { createSubmitHandler } = useFormSubmission<T>();

  // Handle form submission
  const submitHandler = createSubmitHandler(
    onSubmit || (async () => {}),
    {
      validateForm,
      onSuccess,
      onError,
      successMessage,
      errorMessage,
      resetForm: resetFormState
    }
  );

  // Submit form
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }
      
      // Mark all fields as touched
      const allTouched = Object.keys(formState.values).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );
      
      setTouched(allTouched as Partial<Record<keyof T, boolean>>);
      
      return submitHandler(formState.values);
    },
    [submitHandler, formState.values, setTouched]
  );

  // Helper to check if field has error
  const hasError = useCallback(
    (field: keyof T) => {
      return Boolean(formState.errors[field as string]);
    },
    [formState.errors]
  );

  // Helper to get error message for field
  const getErrorMessage = useCallback(
    (field: keyof T) => {
      return formState.errors[field as string] || '';
    },
    [formState.errors]
  );

  // Reset form
  const resetForm = useCallback(() => {
    resetFormState();
  }, [resetFormState]);

  return {
    formState,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldValues,
    setFieldError,
    clearFieldError,
    validateForm,
    handleSubmit,
    resetForm,
    hasError,
    getErrorMessage
  };
}

export * from './types';
export * from './utils';
