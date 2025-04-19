
import { renderHook, act } from '@testing-library/react-hooks';
import { useUnifiedForm } from '../useUnifiedForm';
import { z } from 'zod';

describe('useUnifiedForm', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email')
  });

  const initialValues = {
    name: '',
    email: ''
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => 
      useUnifiedForm({ 
        initialValues, 
        validate: (values) => {
          try {
            schema.parse(values);
            return {};
          } catch (error) {
            if (error instanceof z.ZodError) {
              return error.errors.reduce((acc, curr) => {
                if (curr.path[0]) {
                  acc[curr.path[0]] = curr.message;
                }
                return acc;
              }, {} as Record<string, string>);
            }
            return {};
          }
        }
      })
    );

    expect(result.current.formState.values).toEqual(initialValues);
    expect(result.current.formState.errors).toEqual({});
  });

  it('should update form values correctly', () => {
    const { result } = renderHook(() => useUnifiedForm({ initialValues }));

    act(() => {
      result.current.setFieldValue('name', 'John Doe');
    });

    expect(result.current.formState.values.name).toBe('John Doe');
    expect(result.current.formState.isDirty).toBe(true);
  });

  it('should validate form fields', () => {
    const { result } = renderHook(() => 
      useUnifiedForm({
        initialValues,
        validate: (values) => {
          const errors: Record<string, string> = {};
          
          if (!values.name) {
            errors.name = 'Name is required';
          }
          
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email';
          }
          
          return errors;
        },
        requiredFields: ['name', 'email']
      })
    );

    act(() => {
      result.current.validateForm();
    });

    expect(result.current.formState.errors.name).toBe('Name is required');
    expect(result.current.formState.errors.email).toBe('Email is required');
  });
});
