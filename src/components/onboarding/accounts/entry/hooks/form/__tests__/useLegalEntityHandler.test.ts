
import { renderHook, act } from '@testing-library/react-hooks';
import { useLegalEntityHandler } from '../useLegalEntityHandler';
import { LEI_MAPPING } from '../../../constants/leiMappings';
import { toast } from "@/components/ui/use-toast";

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('useLegalEntityHandler', () => {
  const setAccount = jest.fn();
  const clearError = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the legal entity when called with a valid value', () => {
    const { result } = renderHook(() => useLegalEntityHandler(setAccount, clearError));
    
    act(() => {
      result.current.handleLegalEntityChange('Test Entity');
    });
    
    expect(setAccount).toHaveBeenCalledWith(expect.any(Function));
    expect(clearError).toHaveBeenCalledWith('legalEntity');
  });

  it('should show an error when called with an empty value', () => {
    const { result } = renderHook(() => useLegalEntityHandler(setAccount, clearError));
    
    act(() => {
      result.current.handleLegalEntityChange('');
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Validation Error',
      description: 'Legal entity cannot be empty',
      variant: 'destructive'
    }));
    expect(setAccount).not.toHaveBeenCalled();
  });

  it('should auto-populate LEI for known legal entities', () => {
    const { result } = renderHook(() => useLegalEntityHandler(setAccount, clearError));
    
    // Get a known entity from the mapping
    const knownEntity = Object.keys(LEI_MAPPING)[0];
    const expectedLei = LEI_MAPPING[knownEntity];
    
    act(() => {
      result.current.handleLegalEntityChange(knownEntity);
    });
    
    // Check that setAccount is called twice - once for legal entity, once for LEI
    expect(setAccount).toHaveBeenCalledTimes(2);
    
    // Verify the second call has both the entity and LEI
    const updater = setAccount.mock.calls[1][0];
    const prevState = { legalEntity: '', legalEntityIdentifier: '' };
    const newState = updater(prevState);
    
    expect(newState.legalEntity).toBe(knownEntity);
    expect(newState.legalEntityIdentifier).toBe(expectedLei);
    
    // Check that toast notification was shown
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Auto-populated LEI',
    }));
  });

  it('should handle errors gracefully', () => {
    // Force setAccount to throw an error
    const buggySetAccount = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });
    
    const { result } = renderHook(() => useLegalEntityHandler(buggySetAccount, clearError));
    
    act(() => {
      result.current.handleLegalEntityChange('Test Entity');
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      variant: 'destructive'
    }));
  });
});
