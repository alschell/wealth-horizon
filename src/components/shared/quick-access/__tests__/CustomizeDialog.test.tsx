
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomizeDialog from '../CustomizeDialog';
import { allQuickLinks } from '../quickLinksData';

describe('CustomizeDialog', () => {
  const mockOnOpenChange = jest.fn();
  const mockOnItemToggle = jest.fn();
  const mockOnSave = jest.fn();
  
  const defaultProps = {
    isOpen: true,
    onOpenChange: mockOnOpenChange,
    items: allQuickLinks.slice(0, 5),
    selectedItems: [allQuickLinks[0].id, allQuickLinks[2].id],
    onItemToggle: mockOnItemToggle,
    onSave: mockOnSave
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders correctly when open', () => {
    render(<CustomizeDialog {...defaultProps} />);
    
    expect(screen.getByText('Customize Quick Access')).toBeInTheDocument();
    
    // Check that all items are rendered
    defaultProps.items.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
  
  test('does not render when closed', () => {
    render(<CustomizeDialog {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Customize Quick Access')).not.toBeInTheDocument();
  });
  
  test('calls onItemToggle when item is clicked', () => {
    render(<CustomizeDialog {...defaultProps} />);
    
    // Click the first item
    fireEvent.click(screen.getByText(defaultProps.items[0].title));
    
    expect(mockOnItemToggle).toHaveBeenCalledWith(defaultProps.items[0].id);
  });
  
  test('calls onSave when save button is clicked', () => {
    render(<CustomizeDialog {...defaultProps} />);
    
    // Click the save button
    fireEvent.click(screen.getByText('Save Changes'));
    
    expect(mockOnSave).toHaveBeenCalled();
  });
  
  test('calls onOpenChange when cancel button is clicked', () => {
    render(<CustomizeDialog {...defaultProps} />);
    
    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });
  
  test('displays check icon for selected items', () => {
    render(<CustomizeDialog {...defaultProps} />);
    
    // Get first item (which is selected)
    const firstItemRow = screen.getByText(defaultProps.items[0].title).closest('div');
    
    // There should be a Check icon for selected items
    const checkIcon = firstItemRow?.querySelector('.text-primary');
    expect(checkIcon).toBeInTheDocument();
    
    // Get second item (which is not selected)
    const secondItemRow = screen.getByText(defaultProps.items[1].title).closest('div');
    
    // There should be an X icon for non-selected items
    const xIcon = secondItemRow?.querySelector('.text-muted-foreground\\/50');
    expect(xIcon).toBeInTheDocument();
  });
});
