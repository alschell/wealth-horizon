
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TeamMemberImage from '../TeamMemberImage';

// Create a mock for the announceToScreenReader function
vi.mock('@/utils/a11y', () => ({
  announceToScreenReader: vi.fn()
}));

// Create a mock for the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock the performance tracking utility
vi.mock('../utils/performanceTracking', () => ({
  trackImagePerformance: vi.fn()
}));

describe('TeamMemberImage Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock the global Image constructor
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: ((err: ErrorEvent) => void) | null = null;
      src: string = '';
      
      constructor() {
        setTimeout(() => {
          if (this.src.includes('error') || this.src.includes('fail')) {
            this.onerror && this.onerror(new ErrorEvent('error'));
          } else {
            this.onload && this.onload();
          }
        }, 10);
      }
    } as unknown as typeof Image;
  });
  
  it('renders correctly with valid image', async () => {
    render(
      <TeamMemberImage 
        image="https://example.com/avatar.jpg" 
        name="John Doe" 
        className="test-class"
      />
    );
    
    // Initially it should show loading state
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Wait for image to load
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
    
    // Image should be displayed
    expect(screen.getByAltText('John Doe profile photo')).toBeInTheDocument();
    
    // Container should have the custom class
    const container = screen.getByTestId('team-member-image');
    expect(container).toHaveClass('test-class');
  });
  
  it('shows fallback when image fails to load', async () => {
    render(
      <TeamMemberImage 
        image="https://example.com/error.jpg" 
        name="Jane Doe" 
      />
    );
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.queryByAltText('Jane Doe profile photo')).not.toBeInTheDocument();
    });
    
    // Fallback should be shown
    expect(screen.getByRole('img', { name: 'Placeholder for Jane Doe' })).toBeInTheDocument();
    
    // Retry button should be available
    expect(screen.getByRole('button', { name: 'Retry loading image for Jane Doe' })).toBeInTheDocument();
  });
  
  it('shows custom placeholder when provided', async () => {
    const CustomPlaceholder = () => <div data-testid="custom-placeholder">Custom Loading...</div>;
    
    render(
      <TeamMemberImage 
        image="https://example.com/avatar.jpg" 
        name="Custom User" 
        placeholder={<CustomPlaceholder />}
      />
    );
    
    // Custom placeholder should be shown during loading
    expect(screen.getByTestId('custom-placeholder')).toBeInTheDocument();
    
    // Wait for image to load
    await waitFor(() => {
      expect(screen.queryByTestId('custom-placeholder')).not.toBeInTheDocument();
    });
  });
  
  it('calls onLoad callback when image loads successfully', async () => {
    const onLoadMock = vi.fn();
    
    render(
      <TeamMemberImage 
        image="https://example.com/success.jpg" 
        name="Success User" 
        onLoad={onLoadMock}
      />
    );
    
    // Wait for image to load
    await waitFor(() => {
      expect(onLoadMock).toHaveBeenCalledTimes(1);
    });
  });
  
  it('calls onError callback when image fails to load', async () => {
    const onErrorMock = vi.fn();
    
    render(
      <TeamMemberImage 
        image="https://example.com/fail.jpg" 
        name="Error User" 
        onError={onErrorMock}
      />
    );
    
    // Wait for error callback
    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledTimes(1);
    });
  });
  
  it('handles retry logic correctly', async () => {
    // Mock console.error to suppress expected error logs
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    render(
      <TeamMemberImage 
        image="https://example.com/fail.jpg" 
        name="Retry User" 
      />
    );
    
    // Wait for error state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Retry loading image for Retry User' })).toBeInTheDocument();
    });
    
    // Click retry button
    fireEvent.click(screen.getByRole('button', { name: 'Retry loading image for Retry User' }));
    
    // Should go back to loading state
    expect(screen.getByText('Loading image for Retry User')).toBeInTheDocument();
    
    // Restore console.error
    console.error = originalConsoleError;
  });
  
  it('applies correct priority classes', async () => {
    render(
      <TeamMemberImage 
        image="https://example.com/avatar.jpg" 
        name="Priority User" 
        priority={1}
      />
    );
    
    // Container should have priority data attribute
    const container = screen.getByTestId('team-member-image');
    expect(container).toHaveAttribute('data-priority', '1');
    
    // Wait for image to load
    await waitFor(() => {
      const img = screen.getByAltText('Priority User profile photo');
      expect(img).toHaveClass('priority-1');
    });
  });
});
