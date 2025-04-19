
import { validateRequiredFields, createErrorClearer } from '../formValidation';

describe('validateRequiredFields', () => {
  it('should return errors for missing required fields', () => {
    const values = { name: '', email: 'test@example.com' };
    
    // Define the type for values and make sure requiredFields matches it
    type FormValues = typeof values;
    const requiredFields: Array<keyof FormValues> = ['name', 'email', 'password' as keyof FormValues];
    
    const errors = validateRequiredFields(values, requiredFields);
    
    expect(errors).toHaveProperty('name');
    expect(errors).toHaveProperty('password');
    expect(errors).not.toHaveProperty('email');
  });
  
  it('should handle arrays and check if they are empty', () => {
    const values = { 
      name: 'John',
      tags: [] as string[],
      categories: ['one', 'two']
    };
    
    type FormValues = typeof values;
    const requiredFields: Array<keyof FormValues> = ['name', 'tags', 'categories'];
    
    const errors = validateRequiredFields(values, requiredFields);
    
    expect(errors).toHaveProperty('tags');
    expect(errors).not.toHaveProperty('name');
    expect(errors).not.toHaveProperty('categories');
  });
  
  it('should treat zero as an empty value', () => {
    const values = { count: 0, price: 10 };
    
    type FormValues = typeof values;
    const requiredFields: Array<keyof FormValues> = ['count', 'price'];
    
    const errors = validateRequiredFields(values, requiredFields);
    
    expect(errors).toHaveProperty('count');
    expect(errors).not.toHaveProperty('price');
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
  
  it('should modify errors state correctly', () => {
    let errors = { name: 'Required', email: 'Invalid' };
    const setErrors = jest.fn(updater => {
      if (typeof updater === 'function') {
        errors = updater(errors);
      } else {
        errors = updater;
      }
      return errors;
    });
    
    type FormValues = Record<string, string>;
    const clearError = createErrorClearer<FormValues>(setErrors);
    
    clearError('name');
    
    expect(errors).not.toHaveProperty('name');
    expect(errors).toHaveProperty('email');
  });
});
