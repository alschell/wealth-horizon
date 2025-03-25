
import { renderHook, act } from '@testing-library/react-hooks';
import { useAccountFormState } from '../useAccountFormState';
import { FinancialAccountInfo } from '@/types/onboarding';

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn()
}));

describe('useAccountFormState', () => {
  const mockOnAddAccount = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should initialize with default account state', () => {
    const { result } = renderHook(() => 
      useAccountFormState({ onAddAccount: mockOnAddAccount })
    );
    
    expect(result.current.newAccount).toEqual({
      accountName: "",
      institution: "",
      accountType: "other",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      legalEntity: "",
      legalEntityIdentifier: "",
      statements: [],
      accountNumber: "",
      swiftCode: ""
    });
  });
  
  it('should update account properties on input change', () => {
    const { result } = renderHook(() => 
      useAccountFormState({ onAddAccount: mockOnAddAccount })
    );
    
    act(() => {
      result.current.handleInputChange({
        target: { name: 'accountName', value: 'Test Account' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.newAccount.accountName).toBe('Test Account');
  });
  
  it('should call onAddAccount with the new account when handling add account', () => {
    const { result } = renderHook(() => 
      useAccountFormState({ 
        onAddAccount: mockOnAddAccount,
        initialAccount: {
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
        }
      })
    );
    
    act(() => {
      result.current.handleAddAccount();
    });
    
    expect(mockOnAddAccount).toHaveBeenCalledWith(expect.objectContaining({
      accountName: "Test Account"
    }));
  });
});
