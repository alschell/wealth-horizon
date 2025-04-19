
import { useRef, useEffect, useCallback } from 'react';

/**
 * Hook to check if a component is mounted
 * Prevents memory leaks by ensuring state updates only happen on mounted components
 * 
 * @returns Function that returns true if the component is mounted
 */
export function useIsMounted() {
  const isMounted = useRef(false);
  
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return useCallback(() => isMounted.current, []);
}
