
import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '../useErrorHandler';

// Mock toast
jest.mock('@/hooks/use-toast', () => ({
  toast: jest.fn()
}));

describe('useErrorHandler', () => {
  // Mock console.error to prevent test output cluttering
  let consoleErrorSpy: jest.SpyInstance;
  
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should provide error handling methods', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    expect(result.current.handleError).toBeDefined();
    expect(result.current.withErrorHandling).toBeDefined();
    expect(result.current.tryCatch).toBeDefined();
    expect(result.current.lastError).toBeNull();
    expect(result.current.clearLastError).toBeDefined();
  });
  
  it('should set lastError when handleError is called', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Test error');
    
    act(() => {
      result.current.handleError(testError);
    });
    
    expect(result.current.lastError).toBeDefined();
    expect(result.current.lastError?.message).toBe('Test error');
  });
  
  it('should clear lastError when clearLastError is called', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Test error');
    
    act(() => {
      result.current.handleError(testError);
    });
    
    expect(result.current.lastError).not.toBeNull();
    
    act(() => {
      result.current.clearLastError();
    });
    
    expect(result.current.lastError).toBeNull();
  });
  
  it('should execute withErrorHandling correctly', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Function that succeeds
    const successFn = jest.fn().mockResolvedValue('success');
    
    // Function that fails
    const failureFn = jest.fn().mockRejectedValue(new Error('Function failed'));
    
    // Test successful execution
    let returnValue;
    await act(async () => {
      returnValue = await result.current.withErrorHandling(successFn)();
    });
    
    expect(successFn).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe('success');
    expect(result.current.lastError).toBeNull();
    
    // Test failed execution
    await act(async () => {
      returnValue = await result.current.withErrorHandling(failureFn)();
    });
    
    expect(failureFn).toHaveBeenCalledTimes(1);
    expect(returnValue).toBeUndefined();
    expect(result.current.lastError).not.toBeNull();
    expect(result.current.lastError?.message).toBe('Function failed');
  });
  
  it('should execute tryCatch correctly', async () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Test successful execution
    let returnValue;
    await act(async () => {
      returnValue = await result.current.tryCatch(() => 'success')();
    });
    
    expect(returnValue).toBe('success');
    expect(result.current.lastError).toBeNull();
    
    // Test failed execution
    await act(async () => {
      returnValue = await result.current.tryCatch(() => {
        throw new Error('Function failed');
      })();
    });
    
    expect(returnValue).toBeUndefined();
    expect(result.current.lastError).not.toBeNull();
    expect(result.current.lastError?.message).toBe('Function failed');
  });
});
