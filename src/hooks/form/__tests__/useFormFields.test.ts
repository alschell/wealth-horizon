import { renderHook, act } from '@testing-library/react-hooks';
import { useFormFields } from '../useFormFields';

describe('useFormFields', () => {
  const initialValues = {
    name: '',
    email: '',
    age: 0
  };
  
  it('should initialize with default values', () => {
    const { result } = renderHook(() => 
      useFormFields({ 
        initialValues 
      })
    );
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isDirty).toBe(false);
    expect(result.current.isValid).toBe(true);
  });
  
  it('should update field values correctly', () => {
    const { result } = renderHook(() => 
      useFormFields({ 
        initialValues 
      })
    );
    
    act(() => {
      result.current.setFieldValue('name', 'John Doe');
    });
    
    expect(result.current.values.name).toBe('John Doe');
    expect(result.current.touched.name).toBe(true);
    expect(result.current.isDirty).toBe(true);
  });
  
  it('should handle input change events', () => {
    const { result } = renderHook(() => 
      useFormFields({ 
        initialValues 
      })
    );
    
    const event = {
      target: {
        name: 'email',
        value: 'test@example.com',
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleChange(event);
    });
    
    expect(result.current.values.email).toBe('test@example.com');
    expect(result.current.touched.email).toBe(true);
    expect(result.current.isDirty).toBe(true);
  });
  
  it('should validate required fields', () => {
    const { result } = renderHook(() => 
      useFormFields({
        initialValues,
        requiredFields: ['name', 'email']
      })
    );
    
    act(() => {
      const isValid = result.current.validateFields();
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.name).toBeTruthy();
    expect(result.current.errors.email).toBeTruthy();
  });
  
  it('should use custom validators', () => {
    const { result } = renderHook(() => 
      useFormFields({
        initialValues,
        validators: {
          email: (value) => 
            !value ? 'Email is required' : 
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : 
            null,
          age: (value) => 
            value < 18 ? 'Must be at least 18 years old' : null
        }
      })
    );
    
    act(() => {
      result.current.setFieldValue('email', 'invalid-email');
      result.current.handleBlur('email');
    });
    
    expect(result.current.errors.email).toBe('Invalid email format');
    
    act(() => {
      result.current.setFieldValue('age', 15);
      result.current.validateFields();
    });
    
    expect(result.current.errors.age).toBe('Must be at least 18 years old');
  });
  
  it('should reset the form correctly', () => {
    const { result } = renderHook(() => 
      useFormFields({ 
        initialValues 
      })
    );
    
    // Modify form values
    act(() => {
      result.current.setFieldValue('name', 'John Doe');
      result.current.setFieldValue('email', 'john@example.com');
    });
    
    expect(result.current.isDirty).toBe(true);
    
    // Reset form
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isDirty).toBe(false);
  });
  
  it('should work with a real state implementation', () => {
    const { result } = renderHook(() => 
      useFormFields({
        initialValues: {
          name: '',
          email: '',
          age: 0
        }
      })
    );
    
    const event = {
      target: {
        name: 'name',
        value: 'Jane Doe',
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleChange(event);
    });
    
    expect(result.current.values.name).toBe('Jane Doe');
  });
});
