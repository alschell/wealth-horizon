
import { useState, useCallback, useEffect } from "react";
import { showSuccess, showError } from "@/utils/toast";
import { useIsComponentMounted } from "@/hooks/useIsComponentMounted";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface UnifiedFormOptions<T> {
  initialValues: T;
  onSubmit?: (values: T) => Promise<void> | void;
  validate?: (values: T) => Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

/**
 * A comprehensive unified form hook that handles form state, validation, and submission
 */
export function useUnifiedForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  successMessage = "Form submitted successfully",
  errorMessage = "There was an error submitting the form",
  resetAfterSubmit = true
}: UnifiedFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const isMounted = useIsComponentMounted();

  // Update isValid when values or errors change
  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values);
      setIsValid(Object.keys(validationErrors).length === 0);
    } else {
      setIsValid(true);
    }
  }, [values, validate]);

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

  // Handle value changes for any form field
  const setValue = useCallback((name: string, value: any) => {
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
    setValue(name, value);
  }, [setValue]);

  // Reset the form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
  }, [initialValues]);

  // Validate the form
  const validateForm = useCallback((): ValidationResult => {
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      return {
        isValid: Object.keys(validationErrors).length === 0,
        errors: validationErrors
      };
    }
    return { isValid: true, errors: {} };
  }, [values, validate]);

  // Submit the form with validation
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    // Validate the form
    const { isValid, errors: validationErrors } = validateForm();
    if (!isValid) {
      return { success: false, errors: validationErrors };
    }

    if (!onSubmit) {
      return { success: true, data: values };
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
      
      // Only update state if component is still mounted
      if (isMounted()) {
        if (resetAfterSubmit) {
          resetForm();
        }
        showSuccess("Success", successMessage);
        return { success: true, data: values };
      }
    } catch (error) {
      // Only update state if component is still mounted
      if (isMounted()) {
        const message = error instanceof Error ? error.message : errorMessage;
        showError("Error", message);
        return { success: false, error: message };
      }
    } finally {
      // Only update state if component is still mounted
      if (isMounted()) {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit, resetForm, isMounted, successMessage, errorMessage, resetAfterSubmit]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    handleChange,
    handleSelect,
    setValue,
    handleSubmit,
    validateForm,
    resetForm,
    setValues,
    setErrors
  };
}
