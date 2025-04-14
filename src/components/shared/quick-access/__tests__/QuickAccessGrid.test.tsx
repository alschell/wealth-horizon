
import React from 'react';
import { render, screen } from '@testing-library/react';
import QuickAccessGrid from '../QuickAccessGrid';
import { allQuickLinks } from '../quickLinksData';

describe('QuickAccessGrid', () => {
  test('renders all provided items', () => {
    const testItems = allQuickLinks.slice(0, 3);
    render(<QuickAccessGrid items={testItems} />);
    
    // Check that each item is rendered
    testItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('renders item links with correct href', () => {
    const testItems = allQuickLinks.slice(0, 2);
    render(<QuickAccessGrid items={testItems} />);
    
    // Check that links have correct hrefs
    testItems.forEach(item => {
      const linkElement = screen.getByText(item.title).closest('a');
      expect(linkElement).toHaveAttribute('href', item.href);
    });
  });

  test('renders empty grid when no items provided', () => {
    render(<QuickAccessGrid items={[]} />);
    
    // The grid should be empty but still render
    const gridElement = screen.getByRole('list');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement.children.length).toBe(0);
  });
  
  test('renders grid with proper aria attributes for accessibility', () => {
    const testItems = allQuickLinks.slice(0, 2);
    render(<QuickAccessGrid items={testItems} />);
    
    const gridElement = screen.getByRole('list');
    expect(gridElement).toHaveAttribute('aria-label', 'Quick access links');
  });
  
  test('handles null or undefined items gracefully', () => {
    // @ts-ignore - Testing incorrect prop types for error handling
    render(<QuickAccessGrid items={null} />);
    
    const gridElement = screen.getByRole('list');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement.children.length).toBe(0);
  });
});
