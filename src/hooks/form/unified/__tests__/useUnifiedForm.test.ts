
import { renderHook, act } from '@testing-library/react-hooks';
import { useUnifiedForm } from '../useUnifiedForm';
import { z } from 'zod';

describe('useUnifiedForm', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email')
  });

  const defaultValues = {
    name: '',
    email: ''
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => 
      useUnifiedForm({ defaultValues, schema })
    );

    expect(result.current.formState.values).toEqual(defaultValues);
    expect(result.current.formState.errors).toEqual({});
  });

  // Add more tests as needed
});
