
/**
 * Hook to check if a component is still mounted
 * Used to prevent state updates on unmounted components
 */
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook that returns a function to check if the component is still mounted
 * Useful for async operations to prevent state updates after unmounting
 * 
 * @returns Function that returns true if the component is mounted
 */
export function useIsComponentMounted() {
  const isMountedRef = useRef(false);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  const isMounted = useCallback(() => isMountedRef.current, []);
  
  return isMounted;
}
