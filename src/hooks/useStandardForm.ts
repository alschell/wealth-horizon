
import { useUnifiedForm } from './form/useUnifiedForm';
import { ValidationRules } from './form/useFormValidation';

interface StandardFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export function useStandardForm<T extends Record<string, any>>(options: StandardFormOptions<T>) {
  const { onSubmit, validate, ...rest } = options;
  
  // Wrap onSubmit to ensure it always returns a Promise
  const wrappedOnSubmit = onSubmit 
    ? async (values: T) => { 
        const result = onSubmit(values);
        if (result instanceof Promise) {
          return result;
        }
        return Promise.resolve();
      }
    : undefined;

  return useUnifiedForm({
    ...rest,
    onSubmit: wrappedOnSubmit,
    validate
  });
}
