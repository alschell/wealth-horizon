
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { showErrorToast } from '@/utils/toast';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors anywhere in child component tree
 * Logs errors and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    // Reset the error state if specified by props and props have changed
    if (
      this.state.hasError &&
      this.props.resetOnPropsChange &&
      prevProps.children !== this.props.children
    ) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            <div className="space-y-4">
              <p>
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button onClick={this.resetErrorBoundary} variant="outline">
                Try again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with an ErrorBoundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: Omit<ErrorBoundaryProps, 'children'> = {}
): React.FC<P> {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;
  
  return WrappedComponent;
}
