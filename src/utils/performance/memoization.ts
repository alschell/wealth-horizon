
/**
 * Utility functions for optimizing component and function performance
 */

import { useCallback, useMemo, useRef, useState } from 'react';
import { dequal } from 'dequal';

/**
 * Custom hook for memoizing a value with deep equality comparison
 * Uses dequal for accurate deep comparisons
 * 
 * @param value The value to memoize
 * @returns Memoized value that only changes when deep equality check fails
 */
export function useDeepMemo<T>(value: T): T {
  const ref = useRef<T>(value);
  
  if (!dequal(value, ref.current)) {
    ref.current = value;
  }
  
  return ref.current;
}

/**
 * Hook to help memoize expensive calculations with proper dependency handling
 * 
 * @param factory Function that produces the value
 * @param deps Dependency array that determines when to recalculate
 * @returns Memoized computation result
 */
export function useMemoized<T>(factory: () => T, deps: React.DependencyList): T {
  return useMemo(factory, deps);
}

/**
 * Create a stable callback function that only changes when dependencies change
 * 
 * @param callback Function to memoize
 * @param deps Dependency array that determines when to recreate the callback
 * @returns Memoized callback function
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

/**
 * A hook that returns a value that can be updated but only causes
 * re-renders when the value has actually changed
 * 
 * @param initialValue Initial state value
 * @returns Array with state value and setter function
 */
export function useStateWithComparison<T>(initialValue: T): [T, (newValue: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  
  const setStateWithComparison = useCallback((newValue: T) => {
    setState(prevState => {
      if (dequal(prevState, newValue)) {
        return prevState;
      }
      return newValue;
    });
  }, []);
  
  return [state, setStateWithComparison];
}

/**
 * HOC to memoize a component using React.memo with deep comparison
 * 
 * @param Component The component to memoize
 * @returns Memoized component that only re-renders when props deeply change
 */
export function withDeepMemo<P extends object>(Component: React.ComponentType<P>): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component, (prevProps, nextProps) => {
    return dequal(prevProps, nextProps);
  });
}
