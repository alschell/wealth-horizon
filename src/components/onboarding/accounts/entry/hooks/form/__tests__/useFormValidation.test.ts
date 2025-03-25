
import { renderHook, act } from '@testing-library/react-hooks';
import { useFormValidation } from '../useFormValidation';
import { toast } from '@/hooks/use-toast';

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
    
    const account = {
      accountName: "",
      institution: "",
      accountType: "cash",
      legalEntity: "",
      legalEntityIdentifier: "",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: [],
      accountNumber: "",
      swiftCode: ""
    };
    
    act(() => {
      const isValid = result.current.validateFields(account);
      expect(isValid).toBe(false);
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Missing required fields",
      variant: "destructive"
    }));
  });
  
  it('should pass validation with all required fields', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = {
      accountName: "Test Account",
      institution: "JP Morgan",
      accountType: "cash",
      legalEntity: "JP Morgan LLC",
      legalEntityIdentifier: "123456",
      accountSubtype: "Regular",
      currency: "USD",
      approximateValue: "10000",
      statements: [],
      accountNumber: "12345678",
      swiftCode: "JPMCUS33"
    };
    
    act(() => {
      const isValid = result.current.validateFields(account);
      expect(isValid).toBe(true);
    });
    
    expect(toast).not.toHaveBeenCalled();
  });
  
  it('should validate institution field', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = {
      accountName: "Test Account",
      institution: "",
      accountType: "cash",
      legalEntity: "JP Morgan LLC",
      legalEntityIdentifier: "123456",
      accountSubtype: "Regular",
      currency: "USD",
      approximateValue: "10000",
      statements: [],
      accountNumber: "12345678",
      swiftCode: "JPMCUS33"
    };
    
    act(() => {
      const isValid = result.current.validateFields(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.institution).toBeDefined();
  });
  
  it('should validate legalEntity field', () => {
    const { result } = renderHook(() => useFormValidation());
    
    const account = {
      accountName: "Test Account",
      institution: "JP Morgan",
      accountType: "cash",
      legalEntity: "",
      legalEntityIdentifier: "123456",
      accountSubtype: "Regular",
      currency: "USD",
      approximateValue: "10000",
      statements: [],
      accountNumber: "12345678",
      swiftCode: "JPMCUS33"
    };
    
    act(() => {
      const isValid = result.current.validateFields(account);
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.legalEntity).toBeDefined();
  });
});
