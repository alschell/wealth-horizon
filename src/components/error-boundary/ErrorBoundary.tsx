
import React, { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import ErrorFallback from '@/components/shared/ErrorFallback/ErrorFallback';
import { handleError } from '@/utils/errorHandling/core';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    handleError(error, {
      componentName: this.props.componentName,
      context: { componentStack: errorInfo.componentStack },
      onError: this.props.onError ? 
        () => {
          if (this.props.onError) {
            this.props.onError(error);
          }
        } : 
        undefined
    });
    
    this.setState({ errorInfo });
  }

  public resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    if (this.props.resetErrorBoundary) {
      this.props.resetErrorBoundary();
    }
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorFallback 
          error={this.state.error || new Error('Unknown error')}
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
