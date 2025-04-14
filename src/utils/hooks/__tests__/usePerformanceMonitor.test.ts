
import { renderHook } from '@testing-library/react-hooks';
import { usePerformanceMonitor } from '../usePerformanceMonitor';
import { getRenderMetrics, getAnimationMetrics } from '../../performance';

// Mock the performance utilities
jest.mock('../../performance', () => ({
  getRenderMetrics: jest.fn(),
  getAnimationMetrics: jest.fn(),
  clearRenderMetrics: jest.fn(),
  clearAnimationMetrics: jest.fn(),
}));

describe('usePerformanceMonitor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock implementation for getRenderMetrics
    (getRenderMetrics as jest.Mock).mockReturnValue({
      component1: {
        component: 'TestComponent',
        renderCount: 5,
        lastRenderTime: 10,
        averageRenderTime: 8,
        id: 'test-id',
        totalRenderTime: 40,
      },
      component2: {
        component: 'SlowComponent',
        renderCount: 3,
        lastRenderTime: 25, // Above threshold
        averageRenderTime: 20,
        id: 'slow-id',
        totalRenderTime: 60,
      }
    });
    
    // Mock implementation for getAnimationMetrics
    (getAnimationMetrics as jest.Mock).mockReturnValue([
      {
        id: 'anim-1',
        component: 'AnimatedComponent',
        startTime: 100,
        endTime: 150,
        duration: 50,
        dropped: 2,
      },
      {
        id: 'anim-2',
        component: 'HeavyAnimation',
        startTime: 200,
        endTime: 300,
        duration: 100,
        dropped: 5,
      }
    ]);
  });
  
  test('should return performance metrics', () => {
    const { result } = renderHook(() => usePerformanceMonitor(1000, 16));
    
    expect(result.current.renderMetrics).toHaveProperty('component1');
    expect(result.current.renderMetrics).toHaveProperty('component2');
    expect(result.current.animationMetrics).toHaveLength(2);
    expect(result.current.slowComponents).toContain('SlowComponent');
    
    // Check that SlowComponent is identified correctly
    expect(result.current.slowComponents).toEqual(['SlowComponent']);
  });
  
  test('should properly format metric data', () => {
    const { result } = renderHook(() => usePerformanceMonitor());
    
    // Check animation metrics
    expect(result.current.animationMetrics[0]).toEqual({
      component: 'AnimatedComponent',
      duration: 50,
      dropped: 2,
    });
    
    // Check render metrics
    expect(result.current.renderMetrics.component1).toEqual({
      component: 'TestComponent',
      renderCount: 5,
      lastRenderTime: 10,
      averageRenderTime: 8,
    });
  });
  
  test('should handle empty metrics', () => {
    (getRenderMetrics as jest.Mock).mockReturnValue({});
    (getAnimationMetrics as jest.Mock).mockReturnValue([]);
    
    const { result } = renderHook(() => usePerformanceMonitor());
    
    expect(Object.keys(result.current.renderMetrics)).toHaveLength(0);
    expect(result.current.animationMetrics).toHaveLength(0);
    expect(result.current.slowComponents).toHaveLength(0);
  });
});
