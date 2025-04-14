
import React from 'react';
import { render } from '@testing-library/react';
import { allQuickLinks, defaultQuickLinks } from '../quickLinksData';

describe('quickLinksData', () => {
  test('allQuickLinks should have the correct structure', () => {
    // Check that all quicklinks have required properties
    allQuickLinks.forEach(link => {
      expect(link).toHaveProperty('id');
      expect(link).toHaveProperty('title');
      expect(link).toHaveProperty('description');
      expect(link).toHaveProperty('icon');
      expect(link).toHaveProperty('href');
      
      // Check that href is a string
      expect(typeof link.href).toBe('string');
      
      // Check that id is unique
      const idCount = allQuickLinks.filter(l => l.id === link.id).length;
      expect(idCount).toBe(1);
    });
  });

  test('defaultQuickLinks should be a subset of allQuickLinks', () => {
    expect(defaultQuickLinks.length).toBeLessThanOrEqual(allQuickLinks.length);
    
    // Ensure all default links exist in allQuickLinks
    defaultQuickLinks.forEach(defaultLink => {
      const found = allQuickLinks.some(link => link.id === defaultLink.id);
      expect(found).toBe(true);
    });
  });

  test('icons should render without errors', () => {
    // Test that each icon can be rendered
    allQuickLinks.forEach(link => {
      const { container } = render(<div>{link.icon}</div>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
