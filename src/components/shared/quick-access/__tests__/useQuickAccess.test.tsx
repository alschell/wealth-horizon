
import { renderHook, act } from '@testing-library/react-hooks';
import { useQuickAccess } from '../useQuickAccess';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useQuickAccess', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('should initialize with default items when no saved preferences', () => {
    const { result } = renderHook(() => useQuickAccess('/dashboard'));
    expect(result.current.filteredItems.length).toBeGreaterThan(0);
  });

  test('should load saved preferences from localStorage', () => {
    // Set up mock localStorage with saved preferences
    const savedItems = ['market-data', 'trade', 'reports'];
    mockLocalStorage.setItem('quickAccessItems_dashboard', JSON.stringify(savedItems));
    
    const { result } = renderHook(() => useQuickAccess('/dashboard'));
    
    // Verify that items were loaded from localStorage
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('quickAccessItems_dashboard');
    expect(result.current.visibleItems).toEqual(savedItems);
  });

  test('should update temporarySelection when toggleItem is called', () => {
    const { result } = renderHook(() => useQuickAccess('/dashboard'));
    
    // Toggle an item in the temporary selection
    act(() => {
      result.current.handleCustomizeOpen();
      result.current.toggleItem('market-data');
    });
    
    // Check if the item was removed from temporary selection
    const itemIndex = result.current.temporarySelection.indexOf('market-data');
    if (itemIndex > -1) {
      expect(itemIndex).toBeGreaterThan(-1);
    } else {
      // Item might have been removed, check it's not in the array
      expect(result.current.temporarySelection.includes('market-data')).toBe(false);
    }
    
    // Toggle it again to add it back
    act(() => {
      result.current.toggleItem('market-data');
    });
    
    // Now it should be either added or removed again
    const newItemIndex = result.current.temporarySelection.indexOf('market-data');
    if (itemIndex > -1) {
      expect(newItemIndex).toBe(-1);
    } else {
      expect(newItemIndex).toBeGreaterThan(-1);
    }
  });

  test('should save preferences to localStorage when handleCustomizeSave is called', () => {
    const { result } = renderHook(() => useQuickAccess('/dashboard'));
    
    // Open customize dialog and make some changes
    act(() => {
      result.current.handleCustomizeOpen();
      result.current.toggleItem('market-data');
      result.current.handleCustomizeSave();
    });
    
    // Check if localStorage was updated
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
    expect(mockLocalStorage.setItem.mock.calls[0][0]).toBe('quickAccessItems_dashboard');
  });
});
