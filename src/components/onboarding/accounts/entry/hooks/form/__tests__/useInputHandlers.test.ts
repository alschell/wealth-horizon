
import { renderHook, act } from '@testing-library/react-hooks';
import { useInputHandlers } from '../useInputHandlers';
import { toast } from '@/components/ui/use-toast';

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('useInputHandlers', () => {
  const setAccount = jest.fn();
  const handleLeiInputChange = jest.fn();
  const clearError = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle standard input changes', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    const mockEvent = {
      target: {
        name: 'accountName',
        value: 'Test Account'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleInputChange(mockEvent);
    });
    
    expect(setAccount).toHaveBeenCalledWith(expect.any(Function));
    expect(clearError).toHaveBeenCalledWith('accountName');
    expect(handleLeiInputChange).not.toHaveBeenCalled();
  });

  it('should handle LEI input changes specially', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    const mockEvent = {
      target: {
        name: 'legalEntityIdentifier',
        value: 'TEST123456789ABCDEFG'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleInputChange(mockEvent);
    });
    
    expect(handleLeiInputChange).toHaveBeenCalledWith('TEST123456789ABCDEFG');
    expect(setAccount).not.toHaveBeenCalled(); // The LEI handler should handle this
  });

  it('should handle selection changes', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    act(() => {
      result.current.handleSelectionChange('accountType', 'cash');
    });
    
    expect(setAccount).toHaveBeenCalledWith(expect.any(Function));
    expect(clearError).toHaveBeenCalledWith('accountType');
  });

  it('should reset legal entity and LEI when institution changes', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    act(() => {
      result.current.handleSelectionChange('institution', 'New Bank');
    });
    
    // Check that setAccount is called with a function that resets these fields
    expect(setAccount).toHaveBeenCalledTimes(2);
    
    // Verify the second call resets legal entity and LEI
    const updater = setAccount.mock.calls[1][0];
    const prevState = { legalEntity: 'Old Entity', legalEntityIdentifier: 'OLD123' };
    const newState = updater(prevState);
    
    expect(newState.legalEntity).toBe('');
    expect(newState.legalEntityIdentifier).toBe('');
  });

  it('should clear account subtype for certain account types', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    act(() => {
      result.current.handleSelectionChange('accountType', 'cash');
    });
    
    // Check that setAccount is called with a function that resets the subtype
    expect(setAccount).toHaveBeenCalledTimes(2);
    
    // Verify the second call clears the account subtype
    const updater = setAccount.mock.calls[1][0];
    const prevState = { accountSubtype: 'Special' };
    const newState = updater(prevState);
    
    expect(newState.accountSubtype).toBe('');
  });

  it('should handle file selection', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    const files = [new File(['test'], 'test.pdf')];
    
    act(() => {
      result.current.handleFilesSelected(files);
    });
    
    expect(setAccount).toHaveBeenCalledWith(expect.any(Function));
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Files selected',
    }));
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => 
      useInputHandlers(setAccount, handleLeiInputChange, clearError)
    );
    
    // Pass invalid event to trigger error
    act(() => {
      result.current.handleInputChange(null as any);
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      variant: 'destructive'
    }));
  });
});
