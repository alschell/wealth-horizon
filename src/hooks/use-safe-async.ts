
// A hook for safely handling async operations and preventing memory leaks
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSafeAsyncOptions {
  onError?: (error: Error) => void;
  onSuccess?: (data: any) => void;
}

export function useSafeAsync<T>(options: UseSafeAsyncOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Use a ref to track if the component is mounted
  const isMountedRef = useRef<boolean>(true);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const execute = useCallback(
    async (promise: Promise<T>) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await promise;
        
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setData(result);
          setIsLoading(false);
          if (options.onSuccess) {
            options.onSuccess(result);
          }
        }
        
        return result;
      } catch (err) {
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          setIsLoading(false);
          if (options.onError) {
            options.onError(error);
          }
        }
        
        throw err;
      }
    },
    [options]
  );
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);
  
  return {
    data,
    error,
    isLoading,
    execute,
    reset
  };
}
