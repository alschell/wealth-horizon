
import { renderHook, act } from '@testing-library/react';
import { useQuickAccess } from '../useQuickAccess';
import { defaultQuickLinks } from '../quickLinksData';

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
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    getAll: () => store,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('useQuickAccess Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });
  
  test('initializes with defaultQuickLinks when no localStorage data', () => {
    const { result } = renderHook(() => useQuickAccess());
    
    expect(result.current.filteredItems.length).toBe(defaultQuickLinks.length);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('quickAccessLinks');
  });
  
  test('loads data from localStorage when available', () => {
    const savedIds = ['documents', 'reports', 'users'];
    mockLocalStorage.setItem('quickAccessLinks', JSON.stringify(savedIds));
    
    const { result } = renderHook(() => useQuickAccess());
    
    expect(result.current.filteredItems.length).toBe(3);
    expect(result.current.filteredItems.map(item => item.id)).toEqual(savedIds);
  });
  
  test('handles invalid localStorage data gracefully', () => {
    mockLocalStorage.setItem('quickAccessLinks', 'invalid json');
    
    const { result } = renderHook(() => useQuickAccess());
    
    // Should fallback to defaults
    expect(result.current.filteredItems.length).toBe(defaultQuickLinks.length);
    expect(result.current.error).toBe('Failed to load saved quick links. Using defaults.');
  });
  
  test('toggleItem adds and removes items from temporarySelection', () => {
    const { result } = renderHook(() => useQuickAccess());
    
    // Open the customize dialog to set temporarySelection
    act(() => {
      result.current.handleCustomizeOpen();
    });
    
    const initialLength = result.current.temporarySelection.length;
    const newItemId = 'entity'; // An item not in default selection
    
    // Add a new item
    act(() => {
      result.current.toggleItem(newItemId);
    });
    
    expect(result.current.temporarySelection.length).toBe(initialLength + 1);
    expect(result.current.temporarySelection).toContain(newItemId);
    
    // Remove the same item
    act(() => {
      result.current.toggleItem(newItemId);
    });
    
    expect(result.current.temporarySelection.length).toBe(initialLength);
    expect(result.current.temporarySelection).not.toContain(newItemId);
  });
  
  test('handleCustomizeSave updates localStorage and selection', () => {
    const { result } = renderHook(() => useQuickAccess());
    
    // Open the customize dialog
    act(() => {
      result.current.handleCustomizeOpen();
    });
    
    // Modify the selection
    act(() => {
      result.current.toggleItem('entity');
    });
    
    // Initial filteredItems count
    const initialCount = result.current.filteredItems.length;
    
    // Save changes
    act(() => {
      result.current.handleCustomizeSave();
    });
    
    // Should have saved to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
    // Should have updated the filteredItems
    expect(result.current.filteredItems.length).toBe(initialCount + 1);
    // Dialog should be closed
    expect(result.current.isCustomizing).toBe(false);
  });
  
  test('resetToDefaults reverts to default selection', () => {
    // Start with custom selection
    const customIds = ['documents', 'tax'];
    mockLocalStorage.setItem('quickAccessLinks', JSON.stringify(customIds));
    
    const { result } = renderHook(() => useQuickAccess());
    
    // Verify initial custom state
    expect(result.current.filteredItems.length).toBe(2);
    
    // Reset to defaults
    act(() => {
      result.current.resetToDefaults();
    });
    
    // Should now have default items
    expect(result.current.filteredItems.length).toBe(defaultQuickLinks.length);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('quickAccessLinks', 
      JSON.stringify(defaultQuickLinks.map(item => item.id)));
  });
  
  test('handles error when trying to save empty selection', () => {
    const { result } = renderHook(() => useQuickAccess());
    
    // Open customize and clear selection
    act(() => {
      result.current.handleCustomizeOpen();
      // Clear the selection by toggling all items
      const initialSelection = [...result.current.temporarySelection];
      initialSelection.forEach(id => {
        result.current.toggleItem(id);
      });
    });
    
    // Try to save empty selection
    act(() => {
      result.current.handleCustomizeSave();
    });
    
    // Should show error
    expect(result.current.error).toBe('Please select at least one item');
    // Dialog should remain open
    expect(result.current.isCustomizing).toBe(true);
  });
  
  test('clearError resets error state', () => {
    const { result } = renderHook(() => useQuickAccess());
    
    // Create an error state
    act(() => {
      result.current.handleCustomizeOpen();
      // Clear selection and try to save
      const initialSelection = [...result.current.temporarySelection];
      initialSelection.forEach(id => {
        result.current.toggleItem(id);
      });
      result.current.handleCustomizeSave();
    });
    
    // Verify error state
    expect(result.current.error).toBeTruthy();
    
    // Clear error
    act(() => {
      result.current.clearError();
    });
    
    // Error should be cleared
    expect(result.current.error).toBeNull();
  });
});
