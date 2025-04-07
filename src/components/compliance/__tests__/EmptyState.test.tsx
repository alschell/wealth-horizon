
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileText } from 'lucide-react';
import { EmptyState } from '../EmptyState';

describe('EmptyState Component', () => {
  const mockOnClick = jest.fn();
  
  it('renders with basic props correctly', () => {
    render(
      <EmptyState
        icon={FileText}
        title="No Data"
        description="There is no data available."
      />
    );
    
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(screen.getByText('There is no data available.')).toBeInTheDocument();
  });
  
  it('renders with action button when action prop is provided', () => {
    render(
      <EmptyState
        icon={FileText}
        title="No Data"
        description="There is no data available."
        action={{
          label: "Create New",
          onClick: mockOnClick
        }}
      />
    );
    
    const button = screen.getByRole('button', { name: 'Create New' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className when provided', () => {
    const { container } = render(
      <EmptyState
        icon={FileText}
        title="No Data"
        description="There is no data available."
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
