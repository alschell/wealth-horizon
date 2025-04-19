
import { useEffect, useState, useCallback } from 'react';
import { isLowPoweredDevice, debounce } from '@/utils/performance';

interface PerformanceOptions {
  /**
   * Whether to enable reduced motion for animations
   * @default true
   */
  enableReducedMotion?: boolean;
  /**
   * Whether to enable debouncing for expensive operations
   * @default true
   */
  enableDebouncing?: boolean;
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceDelay?: number;
}

/**
 * Hook for performance optimization
 * 
 * Provides utilities to optimize performance based on device capabilities
 * including reduced motion, debouncing, and throttling.
 */
export function usePerformanceOptimization({
  enableReducedMotion = true,
  enableDebouncing = true,
  debounceDelay = 300
}: PerformanceOptions = {}) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  
  useEffect(() => {
    if (enableReducedMotion) {
      // Check if device is low-powered or user prefers reduced motion
      const preferReducedMotion = isLowPoweredDevice() || 
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      
      setShouldReduceMotion(preferReducedMotion);
      
      // Listen for changes in reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handleMediaChange = (e: MediaQueryListEvent) => {
        setShouldReduceMotion(e.matches || isLowPoweredDevice());
      };
      
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        // Older browsers support
        mediaQuery.addListener(handleMediaChange);
        return () => mediaQuery.removeListener(handleMediaChange);
      }
    }
  }, [enableReducedMotion]);
  
  // Create debounced function factory
  const createDebouncedFunction = useCallback(
    <T extends (...args: any[]) => any>(fn: T) => {
      if (enableDebouncing) {
        return debounce(fn, debounceDelay);
      }
      return fn;
    },
    [enableDebouncing, debounceDelay]
  );
  
  return {
    /**
     * Whether animations should be reduced or simplified
     */
    shouldReduceMotion,
    
    /**
     * Creates a debounced version of the provided function
     * @param fn Function to debounce
     */
    debounce: createDebouncedFunction,
    
    /**
     * Whether the device is likely to be low-powered
     */
    isLowPoweredDevice: isLowPoweredDevice()
  };
}
