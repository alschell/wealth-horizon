
import { useState, useCallback } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { useIsComponentMounted } from "@/hooks/useIsComponentMounted";

interface UseFormControlsProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: (values: T) => Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * A comprehensive hook for managing form state, validation, and submission
 */
export function useFormControls<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  successMessage = "Form submitted successfully",
  errorMessage = "There was an error submitting the form"
}: UseFormControlsProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isMounted = useIsComponentMounted();

  // Handle input changes for any form field
  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle selection changes (for custom selects)
  const handleSelect = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Reset the form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
  }, [initialValues]);

  // Submit the form with validation
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    // Validate the form if a validation function is provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        resetForm();
        showSuccess("Success", successMessage);
      }
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        const message = error instanceof Error ? error.message : errorMessage;
        showError("Error", message);
      }
    } finally {
      // Only update state if component is still mounted
      if (isMounted()) {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, resetForm, isMounted, successMessage, errorMessage]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    handleChange,
    handleSelect,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
}
