
import { useUnifiedForm } from './form/useUnifiedForm';
import type { UseUnifiedFormReturn } from './form/unified/types';

interface StandardFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, (value: any) => string | null>>;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
}

export function useStandardForm<T extends Record<string, any>>(options: StandardFormOptions<T>): UseUnifiedFormReturn<T> {
  const { onSubmit, validate, validationRules, ...rest } = options;
  
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
    validators: validationRules,
    onSubmit: wrappedOnSubmit,
    validate
  });
}
