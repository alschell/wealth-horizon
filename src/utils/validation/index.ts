
export * from './core';
export * from './validators';

// Export convenience validators for common use cases
import { required, email, phone, url, number, percentage, password } from './validators';
import { combineValidators } from './core';

/**
 * Standard validators for common form fields
 */
export const validators = {
  required,
  email,
  phone,
  url,
  number,
  percentage,
  password,
  
  // Combined validators for common use cases
  requiredEmail: combineValidators(required('Email'), email()),
  requiredPhone: combineValidators(required('Phone number'), phone()),
  requiredUrl: combineValidators(required('URL'), url()),
  requiredNumber: combineValidators(required('Number'), number()),
  requiredPercentage: combineValidators(required('Percentage'), percentage()),
};
