
/**
 * Utility for monitoring animation performance
 */

// Track animation performance metrics
interface AnimationMetric {
  id: string;
  component: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  dropped?: number;
}

const metrics: AnimationMetric[] = [];
const PERFORMANCE_THRESHOLD = 16.67; // ~60fps threshold (ms)

/**
 * Start tracking an animation performance
 * @param component - The name of the component being animated
 * @returns A function to call when the animation completes
 */
export const trackAnimationStart = (component: string): () => void => {
  // Skip in production to avoid overhead
  if (process.env.NODE_ENV === 'production') {
    return () => {}; // No-op in production
  }

  const id = `${component}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const startTime = performance.now();
  
  // Create performance marker
  if (performance && typeof performance.mark === 'function') {
    performance.mark(`${id}-start`);
  }
  
  // Store the metric
  metrics.push({
    id,
    component,
    startTime
  });
  
  // Return a function to call when the animation completes
  return () => {
    const endTime = performance.now();
    const metricIndex = metrics.findIndex(m => m.id === id);
    
    if (metricIndex >= 0) {
      metrics[metricIndex].endTime = endTime;
      metrics[metricIndex].duration = endTime - startTime;
      
      // Calculate potentially dropped frames (if duration > 16.67ms per frame)
      if (metrics[metricIndex].duration) {
        metrics[metricIndex].dropped = Math.floor(metrics[metricIndex].duration / PERFORMANCE_THRESHOLD);
        
        // Log poor performance in development
        if (metrics[metricIndex].dropped && metrics[metricIndex].dropped > 3) {
          console.warn(
            `Animation performance: ${component} took ${metrics[metricIndex].duration?.toFixed(2)}ms ` +
            `(~${metrics[metricIndex].dropped} frames dropped)`
          );
        }
      }
    }
    
    // Clean up performance markers
    if (performance && typeof performance.mark === 'function' && typeof performance.measure === 'function') {
      try {
        performance.mark(`${id}-end`);
        performance.measure(`${component}-animation`, `${id}-start`, `${id}-end`);
        performance.clearMarks(`${id}-start`);
        performance.clearMarks(`${id}-end`);
        performance.clearMeasures(`${component}-animation`);
      } catch (e) {
        // Ignore errors in performance API
      }
    }
  };
};

/**
 * Get all performance metrics collected
 * @returns Array of performance metrics
 */
export const getAnimationMetrics = (): readonly AnimationMetric[] => {
  return [...metrics];
};

/**
 * Clear all collected metrics
 */
export const clearAnimationMetrics = (): void => {
  metrics.length = 0;
};

/**
 * Check if the browser should use reduced animations
 * @returns Boolean indicating if animations should be reduced
 */
export const shouldReduceAnimations = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for user preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }
  
  // Check for battery status if available
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      if (battery.level < 0.2 && !battery.charging) {
        return true;
      }
    }).catch(() => false);
  }
  
  return false;
};
