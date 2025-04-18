
import { useState, useCallback } from 'react';
import { useFormState } from './useFormState';
import { useFormActions } from './useFormActions';
import { UseUnifiedFormProps, UseUnifiedFormReturn } from './types';
import { showSuccess, showError } from '@/utils/toast';

export function useUnifiedForm<T extends Record<string, any>>(
  props: UseUnifiedFormProps<T>
): UseUnifiedFormReturn<T> {
  const [formState, setFormState] = useState(useFormState<T>(props.initialValues));
  const formActions = useFormActions<T>(formState, setFormState);

  return {
    formState,
    ...formActions
  };
}

export * from './types';
