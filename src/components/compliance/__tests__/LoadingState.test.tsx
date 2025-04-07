
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingState } from '../LoadingState';

describe('LoadingState Component', () => {
  it('renders with default props correctly', () => {
    render(<LoadingState />);
    
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });
  
  it('renders with custom message correctly', () => {
    render(<LoadingState message="Custom loading message" />);
    
    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });
  
  it('applies fullPage class when fullPage prop is true', () => {
    const { container } = render(<LoadingState fullPage />);
    
    expect(container.firstChild).toHaveClass('min-h-[50vh]');
  });
  
  it('applies custom className when provided', () => {
    const { container } = render(<LoadingState className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
