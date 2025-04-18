
import { useCallback } from 'react';

export const useDocumentDateHandling = (form: any) => {
  const handleDateChange = useCallback((field: 'issueDate' | 'expiryDate', date?: Date) => {
    if (date) {
      form.setFieldValue(field, date.toISOString().split('T')[0]);
    } else {
      form.setFieldValue(field, '');
    }
  }, [form]);

  return { handleDateChange };
};
