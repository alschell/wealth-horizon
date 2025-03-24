
import { renderHook, act } from '@testing-library/react-hooks';
import { useLeiHandler } from '../useLeiHandler';
import { LEI_MAPPING } from '../../../constants/leiMappings';
import { LEGAL_ENTITIES } from '../../../constants/legalEntities';
import { toast } from "@/components/ui/use-toast";

// Mock toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

describe('useLeiHandler', () => {
  const setAccount = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the LEI when handleLeiInputChange is called', () => {
    const { result } = renderHook(() => useLeiHandler(setAccount));
    
    act(() => {
      result.current.handleLeiInputChange('TEST123456789ABCDEFG');
    });
    
    expect(setAccount).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should auto-populate institution and legal entity when a known LEI is provided', () => {
    const { result } = renderHook(() => useLeiHandler(setAccount));
    
    // Get an actual LEI from the mapping
    const knownLei = Object.values(LEI_MAPPING)[0];
    const knownEntity = Object.keys(LEI_MAPPING).find(
      entity => LEI_MAPPING[entity] === knownLei
    ) as string;
    
    // Find institution for this entity
    let knownInstitution = '';
    for (const [institution, entities] of Object.entries(LEGAL_ENTITIES)) {
      if (entities.includes(knownEntity)) {
        knownInstitution = institution;
        break;
      }
    }
    
    act(() => {
      result.current.handleLeiInputChange(knownLei);
    });
    
    expect(setAccount).toHaveBeenCalled();
    
    // Check that it was called with the right values
    // This is complex since we're using a function updater
    const updater = setAccount.mock.calls[0][0];
    const prevState = { legalEntityIdentifier: '' };
    const newState = updater(prevState);
    
    expect(newState.legalEntityIdentifier).toBe(knownLei);
    
    // Now check that toast was shown for auto-population
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: expect.stringContaining('populated'),
    }));
  });

  it('should handle input events correctly', () => {
    const { result } = renderHook(() => useLeiHandler(setAccount));
    
    const mockEvent = {
      target: {
        value: 'TEST123456789ABCDEFG'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    act(() => {
      result.current.handleLeiChange(mockEvent);
    });
    
    expect(setAccount).toHaveBeenCalled();
  });

  it('should handle errors gracefully', () => {
    const { result } = renderHook(() => useLeiHandler(setAccount));
    
    // Create an error by passing an invalid event
    act(() => {
      result.current.handleLeiChange(null as any);
    });
    
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Error',
      variant: 'destructive'
    }));
  });
});
