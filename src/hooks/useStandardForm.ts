
import { useUnifiedForm } from './form/useUnifiedForm';
import { ValidationRules } from './form/useFormValidation';

interface StandardFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export function useStandardForm<T extends Record<string, any>>(options: StandardFormOptions<T>) {
  return useUnifiedForm(options);
}
