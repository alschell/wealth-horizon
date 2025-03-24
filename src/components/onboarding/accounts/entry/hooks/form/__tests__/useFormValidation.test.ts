
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormValidation } from '../useFormValidation';
import { toast } from '@/components/ui/use-toast';

// Mock toast function
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('useFormValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty errors', () => {
    const { result } = renderHook(() => useFormValidation());
    expect(result.current.errors).toEqual({});
  });

  it('should validate required fields correctly', () => {
    const { result } = renderHook(() => useFormValidation());
    
    // Test with missing required fields
    const testAccount = {
      accountName: '',
      institution: 'Test Bank',
      accountType: 'cash' as const,
      legalEntity: '',
      legalEntityIdentifier: '',
      accountSubtype: '',
      currency: 'USD',
      approximateValue: '',
      statements: [],
    };
    
    let isValid;
    act(() => {
      isValid = result.current.validateForm(testAccount);
    });
    
    expect(isValid).toBe(false);
    expect(result.current.errors).toHaveProperty('accountName');
    expect(result.current.errors).toHaveProperty('legalEntity');
    expect(result.current.errors).toHaveProperty('legalEntityIdentifier');
    expect(result.current.errors).toHaveProperty('accountSubtype');
    
    // Test with all required fields present
    const validAccount = {
      accountName: 'Test Account',
      institution: 'Test Bank',
      accountType: 'cash' as const,
      legalEntity: 'Test Entity',
      legalEntityIdentifier: 'LE123456789ABCDEFGHI',
      accountSubtype: 'Regular',
      currency: 'USD',
      approximateValue: '10000',
      statements: [],
    };
    
    act(() => {
      isValid = result.current.validateForm(validAccount);
    });
    
    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('should validate LEI format', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const accountWithInvalidLEI = {
      accountName: 'Test Account',
      institution: 'Test Bank',
      accountType: 'cash' as const,
      legalEntity: 'Test Entity',
      legalEntityIdentifier: 'INVALID', // Too short
      accountSubtype: 'Regular',
      currency: 'USD',
      approximateValue: '10000',
      statements: [],
    };
    
    let isValid;
    act(() => {
      isValid = result.current.validateForm(accountWithInvalidLEI);
    });
    
    expect(isValid).toBe(false);
    expect(result.current.errors).toHaveProperty('legalEntityIdentifier');
  });

  it('should validate approximate value is a number', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const accountWithInvalidValue = {
      accountName: 'Test Account',
      institution: 'Test Bank',
      accountType: 'cash' as const,
      legalEntity: 'Test Entity',
      legalEntityIdentifier: 'LE123456789ABCDEFGHI',
      accountSubtype: 'Regular',
      currency: 'USD',
      approximateValue: 'not-a-number',
      statements: [],
    };
    
    let isValid;
    act(() => {
      isValid = result.current.validateForm(accountWithInvalidValue);
    });
    
    expect(isValid).toBe(false);
    expect(result.current.errors).toHaveProperty('approximateValue');
  });

  it('should clear a specific error', () => {
    const { result } = renderHook(() => useFormValidation());
    
    // First set some errors
    act(() => {
      result.current.setError('accountName', 'This field is required');
      result.current.setError('legalEntity', 'This field is required');
    });
    
    expect(result.current.errors).toHaveProperty('accountName');
    expect(result.current.errors).toHaveProperty('legalEntity');
    
    // Clear one error
    act(() => {
      result.current.clearError('accountName');
    });
    
    expect(result.current.errors).not.toHaveProperty('accountName');
    expect(result.current.errors).toHaveProperty('legalEntity');
  });

  it('should handle validation errors gracefully', () => {
    const { result } = renderHook(() => useFormValidation());
    
    // Create an error scenario by passing null instead of an account object
    act(() => {
      result.current.validateForm(null as any);
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Validation Error',
      variant: 'destructive'
    }));
  });
});
