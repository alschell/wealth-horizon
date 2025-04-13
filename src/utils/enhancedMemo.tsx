
import React, { memo, ComponentType, FC, useCallback } from 'react';

/**
 * Enhanced higher-order component for memoizing React components with proper typing,
 * customizable comparison functions, and performance debugging
 * 
 * @param Component - The component to memoize
 * @param propsAreEqual - Optional custom comparison function
 * @param debugLabel - Optional label for debugging memo rerenders
 * @returns Memoized component
 */
export function enhancedMemo<P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
  debugLabel?: string
): React.MemoExoticComponent<ComponentType<P>> {
  // Add debug wrapper in development
  const MemoizedComponent = process.env.NODE_ENV === 'development' && debugLabel
    ? memo((props: P) => {
        console.log(`Rendering ${debugLabel}`);
        return <Component {...props} />;
      }, propsAreEqual)
    : memo(Component, propsAreEqual);
  
  // Preserve the display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  MemoizedComponent.displayName = `Memo(${displayName})`;
  
  return MemoizedComponent;
}

/**
 * Create an enhanced props comparison function that only compares specified props
 * with better performance characteristics
 * 
 * @param propNames - Array of prop names to compare
 * @param strictEquality - Whether to use strict equality (===) comparison
 * @returns A props comparison function for React.memo
 */
export function createEnhancedPropsComparator<P extends object>(
  propNames: (keyof P)[],
  strictEquality = true
): (prevProps: P, nextProps: P) => boolean {
  // For small number of props, use a more efficient approach
  if (propNames.length <= 3) {
    return (prevProps, nextProps) => {
      for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        if (strictEquality ? 
            prevProps[propName] !== nextProps[propName] : 
            !Object.is(prevProps[propName], nextProps[propName])) {
          return false;
        }
      }
      return true;
    };
  }
  
  // For larger number of props, use the every approach
  return (prevProps, nextProps) => {
    return propNames.every(propName => 
      strictEquality ? 
        prevProps[propName] === nextProps[propName] : 
        Object.is(prevProps[propName], nextProps[propName])
    );
  };
}

/**
 * React hook to memoize a callback with proper dependencies tracking
 * and optimized for frequently accessed callbacks
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T {
  return useCallback(callback, dependencies);
}

/**
 * Enhanced HOC that applies memoization to a component with a specific props comparator
 * 
 * @param propNames - Array of prop names to compare
 * @param debugLabel - Optional label for debugging memo rerenders
 * @returns HOC that memoizes a component checking only the specified props
 */
export function enhancedSelectiveMemo<P extends object>(
  propNames: (keyof P)[], 
  debugLabel?: string
) {
  return (Component: ComponentType<P>): React.MemoExoticComponent<ComponentType<P>> => {
    return enhancedMemo(
      Component, 
      createEnhancedPropsComparator<P>(propNames),
      debugLabel
    );
  };
}
