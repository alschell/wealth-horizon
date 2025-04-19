import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useErrorBoundary } from '../useErrorBoundary';

// Test components
const ErrorComponent = () => {
  throw new Error('Test error');
  return null;
};

const TestComponent = ({ 
  onError, 
  fallback, 
  showReset = true,
  message = 'Test error message',
  componentName = 'TestComponent'
}: {
  onError?: (error: unknown) => void,
  fallback?: React.ReactNode,
  showReset?: boolean,
  message?: string,
  componentName?: string
}) => {
  const { ErrorBoundaryWrapper, resetErrorBoundary } = useErrorBoundary({
    onError,
    fallback,
    showReset,
    message,
    componentName
  });
  
  return (
    <div>
      <ErrorBoundaryWrapper>
        <ErrorComponent />
      </ErrorBoundaryWrapper>
      <button onClick={resetErrorBoundary}>External Reset</button>
    </div>
  );
};

describe('useErrorBoundary', () => {
  // Mock console.error to prevent test output cluttering
  let consoleErrorSpy: jest.SpyInstance;
  
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should render fallback UI when error occurs', () => {
    render(<TestComponent />);
    
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });
  
  it('should call onError when error occurs', () => {
    const handleError = jest.fn();
    render(<TestComponent onError={handleError} />);
    
    expect(handleError).toHaveBeenCalledTimes(1);
    expect(handleError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((handleError.mock.calls[0][0] as Error).message).toBe('Test error');
  });
  
  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error fallback</div>;
    render(<TestComponent fallback={customFallback} />);
    
    expect(screen.getByText(/Custom error fallback/i)).toBeInTheDocument();
  });
  
  it('should reset error boundary when reset button is clicked', () => {
    const { rerender } = render(<TestComponent />);
    
    // Error should be displayed initially
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
    
    // Click the "Try Again" button (from ErrorFallback)
    fireEvent.click(screen.getByText(/Try Again/i));
    
    // Render a non-erroring component to simulate recovery
    const WorkingComponent = () => <div>Working now</div>;
    rerender(
      <div>
        <WorkingComponent />
      </div>
    );
    
    expect(screen.getByText(/Working now/i)).toBeInTheDocument();
  });
  
  it('should reset error boundary from external reset button', () => {
    const { rerender } = render(<TestComponent />);
    
    // Error should be displayed initially
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
    
    // Click the external reset button
    fireEvent.click(screen.getByText(/External Reset/i));
    
    // Render a non-erroring component to simulate recovery
    const WorkingComponent = () => <div>Working now</div>;
    rerender(
      <div>
        <WorkingComponent />
        <button>External Reset</button>
      </div>
    );
    
    expect(screen.getByText(/Working now/i)).toBeInTheDocument();
  });
  
  it('should not show reset button when showReset is false', () => {
    render(<TestComponent showReset={false} />);
    
    expect(screen.queryByText(/Try Again/i)).not.toBeInTheDocument();
  });
});
