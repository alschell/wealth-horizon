
import { useEffect, useState } from 'react';
import { getRenderMetrics, getAnimationMetrics } from '../performance';

/**
 * Interface for performance metrics
 */
interface PerformanceMetrics {
  renderMetrics: Record<string, {
    component: string;
    renderCount: number;
    averageRenderTime: number;
    lastRenderTime: number;
  }>;
  animationMetrics: Array<{
    component: string;
    duration?: number;
    dropped?: number;
  }>;
  slowComponents: string[];
}

/**
 * Hook for monitoring performance metrics in development
 * @param updateInterval - Interval in ms to update metrics
 * @param slowThreshold - Threshold in ms to consider a render slow
 * @returns Performance metrics object
 */
export function usePerformanceMonitor(
  updateInterval: number = 2000,
  slowThreshold: number = 16
): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderMetrics: {},
    animationMetrics: [],
    slowComponents: []
  });

  useEffect(() => {
    // Skip in production
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const updateMetrics = () => {
      const renderMetrics = getRenderMetrics();
      const animationMetrics = getAnimationMetrics();
      
      // Find slow components
      const slowComponents = Object.values(renderMetrics)
        .filter(metric => metric.lastRenderTime > slowThreshold)
        .map(metric => metric.component);
      
      setMetrics({
        renderMetrics,
        animationMetrics: animationMetrics.map(metric => ({
          component: metric.component,
          duration: metric.duration,
          dropped: metric.dropped
        })),
        slowComponents
      });
    };

    // Initial update
    updateMetrics();
    
    // Set interval for updates
    const intervalId = setInterval(updateMetrics, updateInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [updateInterval, slowThreshold]);

  return metrics;
}
