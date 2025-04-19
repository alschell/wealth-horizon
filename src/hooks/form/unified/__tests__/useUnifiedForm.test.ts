
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

  // Add more tests as needed
});
