
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook to check if a component is still mounted
 * Useful for preventing state updates on unmounted components
 */
export function useIsComponentMounted() {
  const isMountedRef = useRef(false);
  
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return useCallback(() => isMountedRef.current, []);
}
