
import { useState } from 'react';
import { FormState } from './types';

export function useFormState<T>(initialValues: T): FormState<T> {
  return useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isDirty: false,
    isSubmitting: false,
    isSuccess: false
  })[0];
}
