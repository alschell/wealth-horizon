
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook to track if a component is mounted
 * Useful for preventing state updates on unmounted components
 * 
 * @returns Function that returns true if component is mounted
 */
export function useIsComponentMounted(): () => boolean {
  const isMountedRef = useRef<boolean>(false);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return useCallback(() => isMountedRef.current, []);
}
