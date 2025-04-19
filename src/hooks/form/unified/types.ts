
/**
 * Form state interface
 */
export interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}

/**
 * Unified form state interface (used internally)
 */
export interface UnifiedFormState<T> extends FormState<T> {
  // Same as FormState for now, but may be extended in the future
}

/**
 * Props for the useUnifiedForm hook
 */
export interface UseUnifiedFormProps<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  requiredFields?: Array<keyof T>;
}

/**
 * Return type for the useUnifiedForm hook
 */
export interface UseUnifiedFormReturn<T> {
  formState: FormState<T>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldValues: (fields: Partial<T>) => void;
  setFieldError: (field: keyof T, message: string) => void;
  clearFieldError: (field: keyof T) => void;
  validateForm: () => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  resetForm: () => void;
  hasError: (field: keyof T) => boolean;
  getErrorMessage: (field: keyof T) => string;
}
