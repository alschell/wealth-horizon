
import React from 'react';

/**
 * Utility for monitoring component render performance
 */

// Define types
interface RenderMetric {
  id: string;
  component: string;
  renderCount: number;
  lastRenderTime: number;
  totalRenderTime: number;
  averageRenderTime: number;
}

// Store metrics
const renderMetrics: Record<string, RenderMetric> = {};

/**
 * Track component render performance
 * @param componentName - The name of the component being rendered
 * @returns The updated metrics for the component
 */
export const trackRender = (componentName: string): RenderMetric => {
  // Skip in production to avoid overhead
  if (process.env.NODE_ENV === 'production') {
    return {} as RenderMetric;
  }

  const startTime = performance.now();
  
  // If component hasn't been tracked yet, initialize it
  if (!renderMetrics[componentName]) {
    renderMetrics[componentName] = {
      id: `render-${componentName}`,
      component: componentName,
      renderCount: 0,
      lastRenderTime: 0,
      totalRenderTime: 0,
      averageRenderTime: 0
    };
  }
  
  // Create a unique mark name for this render
  const markName = `render-${componentName}-${Date.now()}`;
  
  // Create performance mark if available
  if (performance && typeof performance.mark === 'function') {
    performance.mark(`${markName}-start`);
  }
  
  // Schedule end of render tracking
  setTimeout(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Update metrics
    renderMetrics[componentName].renderCount += 1;
    renderMetrics[componentName].lastRenderTime = renderTime;
    renderMetrics[componentName].totalRenderTime += renderTime;
    renderMetrics[componentName].averageRenderTime = 
      renderMetrics[componentName].totalRenderTime / renderMetrics[componentName].renderCount;
    
    // Create performance measure if available
    if (performance && typeof performance.mark === 'function' && typeof performance.measure === 'function') {
      try {
        performance.mark(`${markName}-end`);
        performance.measure(componentName, `${markName}-start`, `${markName}-end`);
        performance.clearMarks(`${markName}-start`);
        performance.clearMarks(`${markName}-end`);
      } catch (e) {
        // Ignore errors in performance API
      }
    }
    
    // Log slow renders in development
    if (renderTime > 16.67 && renderMetrics[componentName].renderCount > 1) {
      console.warn(
        `Slow render for ${componentName}: ${renderTime.toFixed(2)}ms ` +
        `(avg: ${renderMetrics[componentName].averageRenderTime.toFixed(2)}ms, count: ${renderMetrics[componentName].renderCount})`
      );
    }
  }, 0);
  
  return renderMetrics[componentName];
};

/**
 * Create a higher-order component that tracks render performance
 * @param Component - The component to track
 * @returns A wrapped component with performance tracking
 */
export function withRenderTracking<P>(
  Component: React.ComponentType<P>, 
  componentName?: string
): React.ComponentType<P> {
  // Skip in production to avoid overhead
  if (process.env.NODE_ENV === 'production') {
    return Component;
  }
  
  const displayName = componentName || Component.displayName || Component.name || 'UnknownComponent';
  
  const WrappedComponent: React.FC<P> = (props) => {
    trackRender(displayName);
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `withRenderTracking(${displayName})`;
  
  return WrappedComponent;
}

/**
 * Get all render metrics collected
 * @returns Object containing render metrics for all tracked components
 */
export const getRenderMetrics = (): Record<string, RenderMetric> => {
  return { ...renderMetrics };
};

/**
 * Clear all collected render metrics
 */
export const clearRenderMetrics = (): void => {
  Object.keys(renderMetrics).forEach(key => {
    delete renderMetrics[key];
  });
};
