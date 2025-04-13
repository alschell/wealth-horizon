
import React from 'react';

type EqualityFn<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean;
type EqualitySelectors<P> = Partial<Record<keyof P, boolean>>;

/**
 * Creates a custom equality function based on selector configuration
 * 
 * @param selectors - Object specifying which props to compare
 * @returns Equality function for React.memo
 */
function createEqualityFn<P extends object>(selectors: EqualitySelectors<P>): EqualityFn<P> {
  return (prevProps, nextProps) => {
    // If no selectors specified, always re-render
    if (Object.keys(selectors).length === 0) {
      return false;
    }
    
    // Check each selected prop for equality
    for (const key in selectors) {
      if (selectors[key] && prevProps[key] !== nextProps[key]) {
        return false; // Props are different, should re-render
      }
    }
    
    return true; // No differences found, no need to re-render
  };
}

/**
 * Higher-order component that applies React.memo with selective prop comparison
 * 
 * @param Component - Component to memoize
 * @param selectors - Object specifying which props to compare for memoization
 * @returns Memoized component
 */
export function withSelectiveMemo<P extends object>(
  Component: React.ComponentType<P>,
  selectors: EqualitySelectors<P> = {}
): React.MemoExoticComponent<React.ComponentType<P>> {
  const equalityFn = createEqualityFn<P>(selectors);
  return React.memo(Component, equalityFn);
}

/**
 * Higher-order component that applies React.memo with full prop comparison
 * 
 * @param Component - Component to memoize
 * @returns Memoized component
 */
export function withMemo<P extends object>(
  Component: React.ComponentType<P>
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component);
}

/**
 * Higher-order component that applies React.memo with custom equality function
 * 
 * @param Component - Component to memoize
 * @param equalityFn - Custom equality function
 * @returns Memoized component
 */
export function withCustomMemo<P extends object>(
  Component: React.ComponentType<P>,
  equalityFn: EqualityFn<P>
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component, equalityFn);
}
