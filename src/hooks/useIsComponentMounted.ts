
import { useEffect, useRef, useCallback } from 'react';

/**
 * A hook to check if a component is still mounted.
 * Useful for avoiding state updates on unmounted components.
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
