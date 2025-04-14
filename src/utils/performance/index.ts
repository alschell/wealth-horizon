
/**
 * Performance utilities for optimizing application performance
 */

export * from './animationPerformance';
export * from './renderPerformance';

/**
 * Check if the current device is likely to be low-powered
 * @returns Boolean indicating if device is potentially low-powered
 */
export const isLowPoweredDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check for reduced motion preference
  const prefersReducedMotion = 
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for connection type if available
  const hasSlowConnection = 
    'connection' in navigator && 
    (navigator as any).connection && 
    ((navigator as any).connection.saveData || 
     /(slow-2g|2g|3g)/i.test((navigator as any).connection.effectiveType));
  
  return isMobile || prefersReducedMotion || hasSlowConnection;
};

/**
 * Debounce a function to limit how often it can be called
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Throttle a function to limit how often it can be called
 * @param fn - The function to throttle
 * @param limit - The minimum time between calls in milliseconds
 * @returns A throttled version of the function
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T, 
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall < limit) {
      // If we're within the limit, clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Schedule the call for later
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
        timeoutId = null;
      }, limit - (now - lastCall));
    } else {
      // If we're outside the limit, call immediately
      lastCall = now;
      fn(...args);
    }
  };
};
