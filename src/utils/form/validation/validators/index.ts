
export * from './emailValidator';
export * from './numberValidator';

export const required = (fieldName: string = 'This field') => {
  return (value: any): string | null => {
    if (
      value === undefined || 
      value === null || 
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return `${fieldName} is required`;
    }
    return null;
  };
};
