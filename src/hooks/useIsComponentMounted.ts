
import { useRef, useEffect, useCallback } from 'react';

export function useIsComponentMounted() {
  const mountedRef = useRef(true);
  
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  return useCallback(() => mountedRef.current, []);
}
