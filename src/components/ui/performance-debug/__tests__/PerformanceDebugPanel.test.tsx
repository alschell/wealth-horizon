
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PerformanceDebugPanel from '../PerformanceDebugPanel';
import { usePerformanceMonitor } from '@/utils/hooks/usePerformanceMonitor';
import { clearRenderMetrics, clearAnimationMetrics } from '@/utils/performance';

// Mock the hooks and utilities
jest.mock('@/utils/hooks/usePerformanceMonitor');
jest.mock('@/utils/performance', () => ({
  clearRenderMetrics: jest.fn(),
  clearAnimationMetrics: jest.fn(),
}));

// Mock environment variable
const originalNodeEnv = process.env.NODE_ENV;

describe('PerformanceDebugPanel', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock the hook implementation
    (usePerformanceMonitor as jest.Mock).mockReturnValue({
      renderMetrics: {
        component1: {
          component: 'TestComponent',
          renderCount: 5,
          lastRenderTime: 10,
          averageRenderTime: 8,
        },
        component2: {
          component: 'SlowComponent',
          renderCount: 3,
          lastRenderTime: 25,
          averageRenderTime: 20,
        }
      },
      animationMetrics: [
        {
          component: 'AnimatedComponent',
          duration: 50,
          dropped: 2,
        },
        {
          component: 'HeavyAnimation',
          duration: 100,
          dropped: 5,
        }
      ],
      slowComponents: ['SlowComponent'],
    });
  });
  
  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });
  
  test('should not render in production', () => {
    process.env.NODE_ENV = 'production';
    render(<PerformanceDebugPanel />);
    
    // Panel should not be visible in production
    expect(screen.queryByText('Performance Monitor')).not.toBeInTheDocument();
  });
  
  test('should toggle panel visibility when button is clicked', () => {
    render(<PerformanceDebugPanel />);
    
    // Initially not visible
    expect(screen.queryByText('Performance Monitor')).not.toBeInTheDocument();
    
    // Click the toggle button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Panel should now be visible
    expect(screen.getByText('Performance Monitor')).toBeInTheDocument();
    
    // Click the close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Panel should be hidden again
    expect(screen.queryByText('Performance Monitor')).not.toBeInTheDocument();
  });
  
  test('should clear metrics when refresh button is clicked', () => {
    render(<PerformanceDebugPanel />);
    
    // Open the panel
    fireEvent.click(screen.getByRole('button'));
    
    // Click the refresh button
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);
    
    // Verify that clear functions were called
    expect(clearRenderMetrics).toHaveBeenCalledTimes(1);
    expect(clearAnimationMetrics).toHaveBeenCalledTimes(1);
  });
  
  test('should display render metrics and animation metrics', () => {
    render(<PerformanceDebugPanel />);
    
    // Open the panel
    fireEvent.click(screen.getByRole('button'));
    
    // Check render metrics tab
    expect(screen.getByText('TestComponent')).toBeInTheDocument();
    expect(screen.getByText('SlowComponent')).toBeInTheDocument();
    
    // Switch to animation tab
    fireEvent.click(screen.getByRole('tab', { name: /animation/i }));
    
    // Check animation metrics
    expect(screen.getByText('AnimatedComponent')).toBeInTheDocument();
    expect(screen.getByText('HeavyAnimation')).toBeInTheDocument();
  });
});
