
import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useFormFields } from '../useFormFields';

describe('useFormFields', () => {
  const initialValues = {
    name: '',
    email: '',
    age: 0
  };
  
  it('should handle input changes correctly', () => {
    const setValues = jest.fn();
    const clearError = jest.fn();
    const setTouched = jest.fn();
    
    const { result } = renderHook(() => 
      useFormFields({ 
        setValues, 
        clearError, 
        setTouched,
        initialValues 
      })
    );
    
    const event = {
      target: {
        name: 'name',
        value: 'John Doe',
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleChange(event);
    });
    
    expect(setValues).toHaveBeenCalled();
    expect(clearError).toHaveBeenCalledWith('name');
    expect(setTouched).toHaveBeenCalled();
  });
  
  it('should handle blur events correctly', () => {
    const setTouched = jest.fn();
    
    const { result } = renderHook(() => 
      useFormFields({ 
        setValues: jest.fn(),
        setTouched,
        initialValues
      })
    );
    
    act(() => {
      result.current.handleBlur('email');
    });
    
    expect(setTouched).toHaveBeenCalled();
  });
  
  it('should set field value correctly', () => {
    const setValues = jest.fn();
    const clearError = jest.fn();
    const setTouched = jest.fn();
    
    const { result } = renderHook(() => 
      useFormFields({ 
        setValues, 
        clearError, 
        setTouched,
        initialValues
      })
    );
    
    act(() => {
      result.current.setFieldValue('age', 25);
    });
    
    expect(setValues).toHaveBeenCalled();
    expect(clearError).toHaveBeenCalledWith('age');
    expect(setTouched).toHaveBeenCalled();
  });
  
  it('should set multiple field values correctly', () => {
    const setValues = jest.fn();
    const clearError = jest.fn();
    const setTouched = jest.fn();
    
    const { result } = renderHook(() => 
      useFormFields({ 
        setValues, 
        clearError, 
        setTouched,
        initialValues
      })
    );
    
    const newValues = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    act(() => {
      result.current.setFieldValues(newValues);
    });
    
    expect(setValues).toHaveBeenCalled();
    expect(clearError).toHaveBeenCalledTimes(2);
    expect(setTouched).toHaveBeenCalled();
  });
  
  it('should work with a real state implementation', () => {
    const TestHook = () => {
      const [values, setValues] = useState(initialValues);
      const [errors, setErrors] = useState<Record<string, string>>({});
      const [touched, setTouched] = useState<Record<string, boolean>>({});
      
      const clearError = (field: keyof typeof initialValues) => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      };
      
      const { handleChange, setFieldValue } = useFormFields({
        setValues,
        clearError,
        setTouched,
        initialValues
      });
      
      return { values, errors, touched, handleChange, setFieldValue };
    };
    
    const { result } = renderHook(() => TestHook());
    
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
