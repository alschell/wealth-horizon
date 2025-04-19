
import { useRef, useEffect } from 'react';

/**
 * Hook to check if a component is still mounted
 * 
 * Useful for preventing state updates on unmounted components,
 * which would trigger React warnings.
 * 
 * @example
 * ```tsx
 * const isMounted = useIsComponentMounted();
 * 
 * useEffect(() => {
 *   const fetchData = async () => {
 *     const data = await fetchSomething();
 *     if (isMounted()) {
 *       setData(data); // Only update state if still mounted
 *     }
 *   };
 *   fetchData();
 * }, []);
 * ```
 * 
 * @returns A function that returns whether the component is mounted
 */
export function useIsComponentMounted(): () => boolean {
  const isMountedRef = useRef<boolean>(true);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return () => isMountedRef.current;
}
