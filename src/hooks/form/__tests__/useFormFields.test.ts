
import { renderHook } from '@testing-library/react-hooks';
import { useFormFields } from '../useFormFields';

describe('useFormFields', () => {
  it('should return field handling functions', () => {
    const setValues = jest.fn();
    const setTouched = jest.fn();
    const clearError = jest.fn();

    const { result } = renderHook(() => 
      useFormFields(setValues, setTouched, clearError)
    );

    expect(result.current.handleChange).toBeDefined();
    expect(result.current.handleBlur).toBeDefined();
    expect(result.current.setFieldValue).toBeDefined();
  });
});
