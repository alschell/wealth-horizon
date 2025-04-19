
import { validateRequiredFields, createErrorClearer } from '../formValidation';

describe('validateRequiredFields', () => {
  it('should return errors for missing required fields', () => {
    const values = { name: '', email: 'test@example.com' };
    const requiredFields = ['name', 'email', 'password'] as const;
    
    const errors = validateRequiredFields(values, requiredFields);
    
    expect(errors).toHaveProperty('name');
    expect(errors).toHaveProperty('password');
    expect(errors).not.toHaveProperty('email');
  });
});

describe('createErrorClearer', () => {
  it('should create a function that clears errors', () => {
    const setErrors = jest.fn();
    const clearError = createErrorClearer(setErrors);
    
    clearError('name');
    
    expect(setErrors).toHaveBeenCalled();
  });
});
