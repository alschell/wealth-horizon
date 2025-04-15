
/**
 * Default configuration for form hooks
 */
export const formConfig = {
  defaultSuccessMessage: 'Form submitted successfully',
  defaultErrorMessage: 'Error submitting form',
  validationMessages: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must be no more than ${max} characters`,
    pattern: 'Please enter a valid value',
    custom: 'Invalid value'
  }
};
