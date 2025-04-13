
import React, { memo, ComponentType, FC } from 'react';

/**
 * Higher-order component for memoizing React components with proper typing
 * and customizable comparison functions
 * 
 * @param Component - The component to memoize
 * @param propsAreEqual - Optional custom comparison function
 * @returns Memoized component
 */
export function withMemo<P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.MemoExoticComponent<ComponentType<P>> {
  const MemoizedComponent = memo(Component, propsAreEqual);
  
  // Preserve the display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  MemoizedComponent.displayName = `Memo(${displayName})`;
  
  return MemoizedComponent;
}

/**
 * Creates an optimized props comparison function that only compares specified props
 * 
 * @param propNames - Array of prop names to compare
 * @returns A props comparison function for React.memo
 */
export function createPropsComparator<P extends object>(propNames: (keyof P)[]): (prevProps: P, nextProps: P) => boolean {
  return (prevProps, nextProps) => {
    return propNames.every(propName => {
      return Object.is(prevProps[propName], nextProps[propName]);
    });
  };
}

/**
 * HOC that applies memoization to a component with a specific props comparator
 * 
 * @param propNames - Array of prop names to compare
 * @returns HOC that memoizes a component checking only the specified props
 */
export function withSelectiveMemo<P extends object>(propNames: (keyof P)[]) {
  return (Component: ComponentType<P>): React.MemoExoticComponent<ComponentType<P>> => {
    return withMemo(Component, createPropsComparator<P>(propNames));
  };
}
