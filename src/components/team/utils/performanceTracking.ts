
/**
 * Performance tracking utilities for team components
 * Helps identify slow-loading images and opportunities for optimization
 */

interface PerformanceMetric {
  id: string;
  timestamp: number;
  duration?: number;
  category: string;
  data: Record<string, any>;
}

// Store metrics in memory for analysis
const metrics: PerformanceMetric[] = [];

/**
 * Track performance of image loading
 * 
 * @param category - Category of the performance event
 * @param url - URL of the image being loaded
 * @param priority - Priority level of the image
 * @param additionalData - Any additional data to track
 */
export const trackImagePerformance = (
  category: string,
  url: string,
  priority: number = 3,
  additionalData: Record<string, any> = {}
): void => {
  try {
    // Create unique ID for this performance event
    const id = `${category}-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Start marking performance
    if (performance && typeof performance.mark === 'function') {
      performance.mark(`${id}-start`);
    }
    
    // Create the metric
    const metric: PerformanceMetric = {
      id,
      timestamp: Date.now(),
      category,
      data: {
        url,
        priority,
        ...additionalData
      }
    };
    
    // Store the metric
    metrics.push(metric);
    
    // For high priority images, log detailed information
    if (priority <= 2) {
      console.debug(`[Performance] Tracking ${category} for priority ${priority} image: ${url}`);
    }
    
    // Create an object to track the end of the operation
    const finishTracking = () => {
      if (performance && typeof performance.mark === 'function' && typeof performance.measure === 'function') {
        try {
          // Create end marker
          performance.mark(`${id}-end`);
          
          // Measure between start and end
          performance.measure(`${category}`, `${id}-start`, `${id}-end`);
          
          // Get the measure
          const entries = performance.getEntriesByName(`${category}`);
          const duration = entries.length > 0 ? entries[entries.length - 1].duration : undefined;
          
          // Update the stored metric with duration
          const metricIndex = metrics.findIndex(m => m.id === id);
          if (metricIndex >= 0 && duration !== undefined) {
            metrics[metricIndex].duration = duration;
            
            // Log slow images
            if (duration > 1000) {
              console.warn(`[Performance] Slow image load (${duration.toFixed(2)}ms): ${url}`);
            }
          }
          
          // Clean up performance entries
          performance.clearMarks(`${id}-start`);
          performance.clearMarks(`${id}-end`);
          performance.clearMeasures(`${category}`);
        } catch (e) {
          console.error('[Performance] Error measuring performance:', e);
        }
      }
    };
    
    return finishTracking();
  } catch (error) {
    // Don't let performance tracking crash the app
    console.error('[Performance] Error tracking performance:', error);
  }
};

/**
 * Get performance metrics for analysis
 */
export const getPerformanceMetrics = () => {
  return [...metrics];
};

/**
 * Clear all stored performance metrics
 */
export const clearPerformanceMetrics = () => {
  metrics.length = 0;
};

/**
 * Get summary of performance by category
 */
export const getPerformanceSummary = () => {
  const summary: Record<string, { count: number; avgDuration?: number; slowCount: number }> = {};
  
  metrics.forEach(metric => {
    if (!summary[metric.category]) {
      summary[metric.category] = { count: 0, avgDuration: undefined, slowCount: 0 };
    }
    
    summary[metric.category].count++;
    
    if (metric.duration !== undefined) {
      const avg = summary[metric.category].avgDuration;
      summary[metric.category].avgDuration = avg !== undefined
        ? (avg * (summary[metric.category].count - 1) + metric.duration) / summary[metric.category].count
        : metric.duration;
        
      if (metric.duration > 1000) {
        summary[metric.category].slowCount++;
      }
    }
  });
  
  return summary;
};
