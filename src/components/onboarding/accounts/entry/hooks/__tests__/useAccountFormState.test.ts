
import { renderHook, act } from '@testing-library/react-hooks';
import { useAccountFormState } from '../useAccountFormState';
import { toast } from '@/components/ui/use-toast';
import { createPlaceholderAccount } from '../form/types';

// Mock the imported hooks
jest.mock('../form/useFormValidation', () => ({
  useFormValidation: jest.fn().mockReturnValue({
    errors: {},
    validateForm: jest.fn().mockReturnValue(true),
    clearError: jest.fn(),
    setError: jest.fn()
  })
}));

jest.mock('../form/useLeiHandler', () => ({
  useLeiHandler: jest.fn().mockReturnValue({
    handleLeiInputChange: jest.fn(),
    handleLeiChange: jest.fn()
  })
}));

jest.mock('../form/useLegalEntityHandler', () => ({
  useLegalEntityHandler: jest.fn().mockReturnValue({
    handleLegalEntityChange: jest.fn()
  })
}));

jest.mock('../form/useInputHandlers', () => ({
  useInputHandlers: jest.fn().mockReturnValue({
    handleInputChange: jest.fn(),
    handleSelectionChange: jest.fn(),
    handleFilesSelected: jest.fn()
  })
}));

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn()
}));

describe('useAccountFormState', () => {
  const onAddAccount = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values if no initial account is provided', () => {
    const { result } = renderHook(() => useAccountFormState({ onAddAccount }));
    
    // Check if the account is initialized with the default values
    expect(result.current.newAccount).toEqual(createPlaceholderAccount());
  });

  it('should initialize with provided initial account', () => {
    const initialAccount = {
      accountName: 'Test Account',
      institution: 'Test Bank',
      accountType: 'cash' as const,
      legalEntity: 'Test Entity',
      legalEntityIdentifier: 'TEST123456789ABCDEFG',
      accountSubtype: 'Regular',
      currency: 'USD',
      approximateValue: '10000',
      statements: []
    };
    
    const { result } = renderHook(() => 
      useAccountFormState({ onAddAccount, initialAccount })
    );
    
    // Check if the account is initialized with the provided values
    expect(result.current.newAccount).toEqual(initialAccount);
  });

  it('should expose expected properties and methods', () => {
    const { result } = renderHook(() => useAccountFormState({ onAddAccount }));
    
    expect(result.current).toHaveProperty('newAccount');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('legalEntities');
    expect(result.current).toHaveProperty('handleInputChange');
    expect(result.current).toHaveProperty('handleSelectionChange');
    expect(result.current).toHaveProperty('handleLegalEntityChange');
    expect(result.current).toHaveProperty('handleLeiChange');
    expect(result.current).toHaveProperty('handleFilesSelected');
    expect(result.current).toHaveProperty('handleAddAccount');
  });

  it('should call onAddAccount when form is valid', () => {
    // Get the mock useFormValidation from above
    const { useFormValidation } = require('../form/useFormValidation');
    // Make validateForm return true to simulate valid form
    useFormValidation.mockReturnValue({
      errors: {},
      validateForm: jest.fn().mockReturnValue(true),
      clearError: jest.fn(),
      setError: jest.fn()
    });
    
    const { result } = renderHook(() => useAccountFormState({ onAddAccount }));
    
    act(() => {
      result.current.handleAddAccount();
    });
    
    // Check if onAddAccount is called with the new account
    expect(onAddAccount).toHaveBeenCalledWith(result.current.newAccount);
    
    // Check if toast is shown
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Account added'
    }));
  });

  it('should show error toast when form is invalid', () => {
    // Get the mock useFormValidation from above
    const { useFormValidation } = require('../form/useFormValidation');
    // Make validateForm return false to simulate invalid form
    useFormValidation.mockReturnValue({
      errors: { accountName: 'Required' },
      validateForm: jest.fn().mockReturnValue(false),
      clearError: jest.fn(),
      setError: jest.fn()
    });
    
    const { result } = renderHook(() => useAccountFormState({ onAddAccount }));
    
    act(() => {
      result.current.handleAddAccount();
    });
    
    // Check that onAddAccount is not called
    expect(onAddAccount).not.toHaveBeenCalled();
    
    // Check that error toast is shown
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Form validation failed',
      variant: 'destructive'
    }));
  });

  it('should handle errors gracefully', () => {
    // Get the mock useFormValidation from above
    const { useFormValidation } = require('../form/useFormValidation');
    // Make validateForm throw an error
    useFormValidation.mockReturnValue({
      errors: {},
      validateForm: jest.fn().mockImplementation(() => {
        throw new Error('Test error');
      }),
      clearError: jest.fn(),
      setError: jest.fn()
    });
    
    const { result } = renderHook(() => useAccountFormState({ onAddAccount }));
    
    act(() => {
      result.current.handleAddAccount();
    });
    
    // Check that onAddAccount is not called
    expect(onAddAccount).not.toHaveBeenCalled();
    
    // Check that error toast is shown
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      variant: 'destructive'
    }));
  });
});
