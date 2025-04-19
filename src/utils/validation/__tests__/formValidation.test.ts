
import { validateRequiredFields, createErrorClearer } from '../formValidation';

describe('validateRequiredFields', () => {
  it('should return errors for missing required fields', () => {
    const values = { name: '', email: 'test@example.com' };
    
    // Fix: Define the type for values and make sure requiredFields matches it
    type FormValues = typeof values;
    const requiredFields: Array<keyof FormValues> = ['name', 'email', 'password' as keyof FormValues];
    
    const errors = validateRequiredFields(values, requiredFields);
    
    expect(errors).toHaveProperty('name');
    expect(errors).toHaveProperty('password');
    expect(errors).not.toHaveProperty('email');
  });
});

describe('createErrorClearer', () => {
  it('should create a function that clears errors', () => {
    const setErrors = jest.fn();
    
    // Provide the correct type for createErrorClearer
    type FormValues = Record<string, any>;
    const clearError = createErrorClearer<FormValues>(setErrors);
    
    clearError('name');
    
    expect(setErrors).toHaveBeenCalled();
  });
});
