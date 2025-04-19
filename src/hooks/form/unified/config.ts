
/**
 * Configuration for form hooks
 */

export const FORM_CONFIG = {
  defaultSuccessMessage: 'Form submitted successfully',
  defaultErrorMessage: 'An error occurred. Please try again.',
  validationOptions: {
    validateOnChange: true,
    validateOnBlur: true,
    validateOnSubmit: true,
  },
  submissionConfig: {
    resetAfterSubmit: false,
    showSuccessNotification: true,
    showErrorNotification: true,
  }
};
