
import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import { Calendar } from 'lucide-react';

describe('EmptyState', () => {
  it('renders with the provided icon, title and description', () => {
    render(
      <EmptyState 
        icon={Calendar} 
        title="No Data" 
        description="There is no data to display." 
      />
    );
    
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(screen.getByText('There is no data to display.')).toBeInTheDocument();
  });
  
  it('applies the correct CSS classes', () => {
    const { container } = render(
      <EmptyState 
        icon={Calendar} 
        title="No Data" 
        description="There is no data to display." 
      />
    );
    
    const emptyStateElement = container.firstChild;
    expect(emptyStateElement).toHaveClass('text-center');
    expect(emptyStateElement).toHaveClass('py-12');
  });
});
