
import { useMemo, useCallback } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';

interface OptimizationOptions {
  memoize?: boolean;
  optimizeAnimations?: boolean;
  debounceDelay?: number;
}

/**
 * Hook to apply various optimizations to components
 */
export function useOptimizedComponent<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[] = [],
  options: OptimizationOptions = {}
) {
  const {
    shouldReduceMotion,
    debounce,
    isLowPoweredDevice
  } = usePerformanceOptimization({
    enableReducedMotion: options.optimizeAnimations,
    debounceDelay: options.debounceDelay
  });

  // Memoize the callback if requested
  const memoizedCallback = useMemo(
    () => (options.memoize ? callback : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );

  // Apply debouncing if needed
  const debouncedCallback = useCallback(
    debounce(memoizedCallback || callback),
    [memoizedCallback, callback, debounce]
  );

  return {
    optimizedCallback: debouncedCallback,
    shouldReduceMotion,
    isLowPoweredDevice
  };
}
