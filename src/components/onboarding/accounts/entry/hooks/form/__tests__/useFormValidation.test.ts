
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormValidation } from '../useFormValidation';
import { toast } from '@/hooks/use-toast';
import { createMockAccount } from './helper-mocks';

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn()
}));

describe('useFormValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should validate required fields', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = createMockAccount({
      institution: "",
      legalEntity: "",
    });
    
    act(() => {
      const isValid = result.current.validateForm(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.institution).toBeDefined();
    expect(result.current.errors.legalEntity).toBeDefined();
  });
  
  it('should pass validation with all required fields', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = createMockAccount({
      accountName: "Test Account",
      institution: "JP Morgan",
      accountType: "cash",
      legalEntity: "JP Morgan LLC",
      legalEntityIdentifier: "7H6GLXDRUGQFU57RNE97", // Valid 20-char LEI
      accountSubtype: "Regular",
      currency: "USD",
      approximateValue: "10000",
      accountNumber: "12345678",
      swiftCode: "JPMCUS33"
    });
    
    act(() => {
      const isValid = result.current.validateForm(account);
      expect(isValid).toBe(true);
    });
    
    expect(Object.keys(result.current.errors).length).toBe(0);
  });
  
  it('should validate institution field', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = createMockAccount({
      institution: "",
      legalEntity: "JP Morgan LLC",
    });
    
    act(() => {
      const isValid = result.current.validateForm(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.institution).toBeDefined();
    expect(result.current.errors.legalEntity).toBeUndefined();
  });
  
  it('should validate legalEntity field', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = createMockAccount({
      institution: "JP Morgan",
      legalEntity: "",
    });
    
    act(() => {
      const isValid = result.current.validateForm(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.institution).toBeUndefined();
    expect(result.current.errors.legalEntity).toBeDefined();
  });

  it('should validate LEI format', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = createMockAccount({
      legalEntityIdentifier: "123", // Too short
    });
    
    act(() => {
      const isValid = result.current.validateForm(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.legalEntityIdentifier).toBeDefined();
  });
});
