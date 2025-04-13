
import { renderHook, act } from '@testing-library/react-hooks';
import { useOptimizedImageLoading } from '../hooks/useOptimizedImageLoading';

// Mock toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock performance API
const originalPerformance = global.performance;
beforeAll(() => {
  global.performance = {
    ...originalPerformance,
    mark: jest.fn()
  };
});

afterAll(() => {
  global.performance = originalPerformance;
});

describe('useOptimizedImageLoading Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image')
    );
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
  });
  
  it('should set loading to false and keep hasError false on successful load', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image')
    );
    
    // Simulate image load success
    act(() => {
      result.current.imageProps.onLoad();
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });
  
  it('should set hasError to true on load error', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image')
    );
    
    // Simulate image load error
    act(() => {
      result.current.imageProps.onError();
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
  });
  
  it('should call performance.mark for high priority images', () => {
    renderHook(() => 
      useOptimizedImageLoading('priority-image.jpg', 'High Priority Image', { priority: 1 })
    );
    
    // Should have called performance.mark for high priority
    expect(performance.mark).toHaveBeenCalled();
  });
  
  it('should not call performance.mark for low priority images', () => {
    renderHook(() => 
      useOptimizedImageLoading('low-priority.jpg', 'Low Priority Image', { priority: 5 })
    );
    
    // Should not have called performance.mark for low priority
    expect(performance.mark).not.toHaveBeenCalled();
  });
  
  it('should apply lazy loading by default', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image')
    );
    
    expect(result.current.imageProps.loading).toBe('lazy');
  });
  
  it('should apply eager loading when lazy is false', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image', { lazy: false })
    );
    
    expect(result.current.imageProps.loading).toBe('eager');
  });
  
  it('should call custom onSuccess callback when provided', () => {
    const onSuccess = jest.fn();
    
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image', { onSuccess })
    );
    
    // Simulate successful load
    act(() => {
      result.current.imageProps.onLoad();
    });
    
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
  
  it('should call custom onError callback when provided', () => {
    const onError = jest.fn();
    
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image', { onError })
    );
    
    // Simulate load error
    act(() => {
      result.current.imageProps.onError();
    });
    
    expect(onError).toHaveBeenCalledTimes(1);
  });
  
  it('should generate proper class names based on loading state', () => {
    const { result } = renderHook(() => 
      useOptimizedImageLoading('test-image.jpg', 'Test Image', { priority: 2 })
    );
    
    // Class name during loading
    expect(result.current.imageProps.className).toContain('opacity-0');
    expect(result.current.imageProps.className).toContain('priority-2');
    
    // Simulate load completion
    act(() => {
      result.current.imageProps.onLoad();
    });
    
    // Class name after loading
    expect(result.current.imageProps.className).toContain('opacity-100');
  });
});
