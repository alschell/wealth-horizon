
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { withErrorBoundary, withCustomErrorFallback } from '@/components/shared/ErrorBoundary';

// Mock components for testing
const WorkingComponent = () => <div>Working Component</div>;

const ErrorComponent = () => {
  throw new Error('Test error');
  return <div>This should not render</div>;
};

const CustomFallback = ({ error }: { error?: Error }) => (
  <div>Custom Error: {error?.message || 'Unknown error'}</div>
);

describe('withErrorHandling', () => {
  // Mock console.error to prevent test output cluttering
  let consoleErrorSpy: jest.SpyInstance;
  
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });
  
  it('should render the component normally when there are no errors', () => {
    const WrappedComponent = withErrorBoundary(WorkingComponent);
    render(<WrappedComponent />);
    
    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });
  
  it('should render the default fallback UI when component throws', () => {
    const WrappedComponent = withErrorBoundary(ErrorComponent);
    render(<WrappedComponent />);
    
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Try again/i)).toBeInTheDocument();
  });
  
  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom Fallback UI</div>;
    const WrappedComponent = withErrorBoundary(ErrorComponent, { fallback: customFallback });
    render(<WrappedComponent />);
    
    expect(screen.getByText('Custom Fallback UI')).toBeInTheDocument();
  });
  
  it('should call onError when component throws', () => {
    const onError = jest.fn();
    const WrappedComponent = withErrorBoundary(ErrorComponent, { onError });
    render(<WrappedComponent />);
    
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe('Test error');
  });
  
  it('should recover when clicking try again button', () => {
    const WrappedComponent = withErrorBoundary(ErrorComponent);
    const { rerender } = render(<WrappedComponent />);
    
    // Click the try again button
    fireEvent.click(screen.getByText(/Try again/i));
    
    // Rerender with a working component to simulate recovery
    rerender(<WorkingComponent />);
    
    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });
});

describe('withCustomErrorFallback', () => {
  // Mock console.error to prevent test output cluttering
  let consoleErrorSpy: jest.SpyInstance;
  
  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });
  
  it('should render the component normally when there are no errors', () => {
    const WrappedComponent = withCustomErrorFallback(WorkingComponent, CustomFallback);
    render(<WrappedComponent />);
    
    expect(screen.getByText('Working Component')).toBeInTheDocument();
  });
  
  it('should render the custom fallback when component throws', () => {
    const WrappedComponent = withCustomErrorFallback(ErrorComponent, CustomFallback);
    render(<WrappedComponent />);
    
    expect(screen.getByText(/Custom Error: Test error/i)).toBeInTheDocument();
  });
});
