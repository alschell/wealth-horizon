
import { useUnifiedForm } from './form/useUnifiedForm';
import type { UseUnifiedFormReturn } from './form/unified/types';
import type { Validator } from './form/validators';

interface StandardFormOptions<T> {
  initialValues: T;
  validators?: Partial<Record<keyof T, Validator>>;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSubmit?: boolean;
  requiredFields?: Array<keyof T>;
}

/**
 * A standardized form hook that provides a simplified API surface
 * while leveraging the unified form system underneath
 * 
 * @param options Configuration options for the form
 * @returns Form state and handlers
 */
export function useStandardForm<T extends Record<string, any>>(options: StandardFormOptions<T>): UseUnifiedFormReturn<T> {
  const { onSubmit, validate, validators, ...rest } = options;
  
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
    validators: validators,
    onSubmit: wrappedOnSubmit,
    validate
  });
}
