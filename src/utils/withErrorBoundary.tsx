import React from 'react';
import { ErrorBoundary } from '@/components/error-boundary';

interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 * 
 * @param Component - Component to wrap
 * @param options - Error boundary options
 * @returns Component wrapped with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.FC<P> {
  const { fallback, onError } = options;
  
  const WithErrorBoundary: React.FC<P> = (props) => {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  
  // Set display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
}

/**
 * Creates a component wrapped with error boundary and custom fallback
 * 
 * @param Component - Component to wrap
 * @param FallbackComponent - Custom fallback component
 * @returns Component wrapped with error boundary and custom fallback
 */
export function withCustomErrorFallback<P extends object, FallbackProps extends {error?: Error}>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<FallbackProps>
): React.ComponentType<P> {
  return class WithCustomErrorFallback extends React.Component<P, {hasError: boolean; error?: Error}> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("Error caught by withCustomErrorFallback:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <FallbackComponent error={this.state.error} {...{} as any} />;
      }

      return <Component {...this.props} />;
    }
  };
}
