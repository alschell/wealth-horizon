
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuickAccessItem from '../QuickAccessItem';
import { FileText } from 'lucide-react';

describe('QuickAccessItem', () => {
  const mockItem = {
    id: 'test-item',
    title: 'Test Item',
    description: 'This is a test item',
    icon: <FileText className="h-4 w-4" />,
    href: '/test-path'
  };

  test('renders item with correct title and description', () => {
    render(<QuickAccessItem item={mockItem} />);
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('This is a test item')).toBeInTheDocument();
  });
  
  test('renders link with correct href', () => {
    render(<QuickAccessItem item={mockItem} />);
    
    const linkElement = screen.getByText('Test Item').closest('a');
    expect(linkElement).toHaveAttribute('href', '/test-path');
  });
  
  test('renders with proper aria-label for accessibility', () => {
    render(<QuickAccessItem item={mockItem} />);
    
    const linkElement = screen.getByText('Test Item').closest('a');
    expect(linkElement).toHaveAttribute('aria-label', 'Test Item: This is a test item');
  });
  
  test('renders icon', () => {
    render(<QuickAccessItem item={mockItem} />);
    
    // Check for icon container
    const iconContainer = screen.getByText('Test Item').parentElement?.querySelector('div');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer).toHaveClass('bg-primary/10');
  });

  test('handles keyboard navigation correctly', () => {
    const { container } = render(<QuickAccessItem item={mockItem} />);
    
    const linkElement = screen.getByText('Test Item').closest('a');
    
    // Mock the window.location for testing
    const originalHref = window.location.href;
    
    // Create a mock implementation for modifying href
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        href: '',
      },
      writable: true,
    });
    
    // Test Enter key
    fireEvent.keyDown(linkElement as HTMLElement, { key: 'Enter' });
    expect(window.location.href).toBe('/test-path');
    
    // Reset and test Space key
    window.location.href = '';
    fireEvent.keyDown(linkElement as HTMLElement, { key: ' ' });
    expect(window.location.href).toBe('/test-path');
    
    // Restore original location
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        href: originalHref,
      },
      writable: true,
    });
  });
  
  test('applies custom className when provided', () => {
    render(<QuickAccessItem item={mockItem} className="custom-class" />);
    
    const linkElement = screen.getByText('Test Item').closest('a');
    expect(linkElement).toHaveClass('custom-class');
  });
});
