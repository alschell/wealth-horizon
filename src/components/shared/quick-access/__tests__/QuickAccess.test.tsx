
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuickAccess from '../QuickAccess';
import { useQuickAccess } from '../useQuickAccess';
import { allQuickLinks, defaultQuickLinks } from '../quickLinksData';

// Mock the useQuickAccess hook
jest.mock('../useQuickAccess', () => ({
  useQuickAccess: jest.fn()
}));

describe('QuickAccess', () => {
  const mockUseQuickAccess = {
    isCustomizing: false,
    setIsCustomizing: jest.fn(),
    filteredItems: defaultQuickLinks,
    temporarySelection: defaultQuickLinks.map(item => item.id),
    handleCustomizeOpen: jest.fn(),
    handleCustomizeSave: jest.fn(),
    toggleItem: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useQuickAccess as jest.Mock).mockReturnValue(mockUseQuickAccess);
  });
  
  test('renders quick access card with title', () => {
    render(<QuickAccess />);
    
    expect(screen.getByText('Quick Access')).toBeInTheDocument();
  });
  
  test('renders customize button', () => {
    render(<QuickAccess />);
    
    const customizeButton = screen.getByRole('button');
    expect(customizeButton).toBeInTheDocument();
  });
  
  test('renders QuickAccessGrid with filtered items', () => {
    render(<QuickAccess />);
    
    // Check that filtered items are rendered
    mockUseQuickAccess.filteredItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  
  test('opens customize dialog when customize button is clicked', () => {
    render(<QuickAccess />);
    
    const customizeButton = screen.getByRole('button');
    fireEvent.click(customizeButton);
    
    expect(mockUseQuickAccess.handleCustomizeOpen).toHaveBeenCalled();
  });
  
  test('renders customize dialog when isCustomizing is true', () => {
    (useQuickAccess as jest.Mock).mockReturnValue({
      ...mockUseQuickAccess,
      isCustomizing: true
    });
    
    render(<QuickAccess />);
    
    expect(screen.getByText('Customize Quick Access')).toBeInTheDocument();
  });
  
  test('passes pathname to useQuickAccess', () => {
    render(<QuickAccess pathname="/test-path" />);
    
    expect(useQuickAccess).toHaveBeenCalledWith('/test-path');
  });
  
  test('handles customization dialog actions correctly', () => {
    (useQuickAccess as jest.Mock).mockReturnValue({
      ...mockUseQuickAccess,
      isCustomizing: true
    });
    
    render(<QuickAccess />);
    
    // Find and click save button
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
    
    expect(mockUseQuickAccess.handleCustomizeSave).toHaveBeenCalled();
  });
});
