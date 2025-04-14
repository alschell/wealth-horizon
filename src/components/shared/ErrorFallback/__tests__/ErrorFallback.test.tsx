
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorFallback from '../ErrorFallback';

describe('ErrorFallback Component', () => {
  const resetErrorBoundary = jest.fn();
  const testError = new Error('Test error message');
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders with default message when no custom message provided', () => {
    render(<ErrorFallback error={testError} resetErrorBoundary={resetErrorBoundary} />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
  
  test('renders with custom message when provided', () => {
    render(
      <ErrorFallback 
        error={testError} 
        resetErrorBoundary={resetErrorBoundary} 
        message="Custom error message" 
      />
    );
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
  
  test('does not render reset button when showReset is false', () => {
    render(
      <ErrorFallback 
        error={testError} 
        resetErrorBoundary={resetErrorBoundary} 
        showReset={false} 
      />
    );
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });
  
  test('calls resetErrorBoundary when reset button is clicked', () => {
    render(<ErrorFallback error={testError} resetErrorBoundary={resetErrorBoundary} />);
    
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });
  
  test('does not render error details when showDetails is false', () => {
    render(
      <ErrorFallback 
        error={testError} 
        resetErrorBoundary={resetErrorBoundary} 
        showDetails={false} 
      />
    );
    
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });
  
  test('renders error info when provided', () => {
    const errorInfo = { 
      componentStack: 'Component Stack Line 1\nComponent Stack Line 2' 
    } as React.ErrorInfo;
    
    render(
      <ErrorFallback 
        error={testError} 
        resetErrorBoundary={resetErrorBoundary} 
        errorInfo={errorInfo}
      />
    );
    
    expect(screen.getByText('Component Stack:')).toBeInTheDocument();
    expect(screen.getByText(/Component Stack Line 1/)).toBeInTheDocument();
  });
});
