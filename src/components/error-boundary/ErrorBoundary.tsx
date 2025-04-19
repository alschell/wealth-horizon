import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/utils/errorHandling/types';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';
import { logError } from '@/utils/errorHandling/errorUtils';

/**
 * Error Boundary component that catches JavaScript errors anywhere in its child
 * component tree and displays a fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    logError(error, this.props.componentName);
    console.error('Component Stack:', errorInfo.componentStack);
    
    // Call onError handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Update state with error info
    this.setState({ errorInfo });
  }

  // Reset the error boundary state
  public resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    if (this.props.resetErrorBoundary) {
      this.props.resetErrorBoundary();
    }
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise use the default ErrorFallback
      return (
        <ErrorFallback 
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
          title={`Error in ${this.props.componentName || 'component'}`}
          errorInfo={this.state.errorInfo}
          showResetButton={true}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
