
/**
 * Type definitions for performance utilities
 */

export interface RenderMetric {
  id: string;
  component: string;
  renderCount: number;
  lastRenderTime: number;
  totalRenderTime: number;
  averageRenderTime: number;
}

export interface AnimationMetric {
  id: string;
  component: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  dropped?: number;
}

export function trackRender(componentName: string): RenderMetric;

export function withRenderTracking<P>(
  Component: React.ComponentType<P>, 
  componentName?: string
): React.ComponentType<P>;

export function getRenderMetrics(): Record<string, RenderMetric>;

export function clearRenderMetrics(): void;

export function trackAnimationStart(component: string): () => void;

export function getAnimationMetrics(): readonly AnimationMetric[];

export function clearAnimationMetrics(): void;

export function shouldReduceAnimations(): boolean;

export function isLowPoweredDevice(): boolean;

export function debounce<T extends (...args: any[]) => any>(
  fn: T, 
  delay: number
): ((...args: Parameters<T>) => void);

export function throttle<T extends (...args: any[]) => any>(
  fn: T, 
  limit: number
): ((...args: Parameters<T>) => void);
