
import React, { Component, ErrorInfo } from 'react';
import ErrorFallback from '@/components/shared/ErrorFallback';
import { handleError } from '@/utils/errorHandling/errorHandlingCore';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    handleError(error, {
      logError: true,
      showToast: false, // Don't show toast since we're showing fallback UI
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorFallback
          error={error}
          resetErrorBoundary={() => this.setState({ error: null, errorInfo: null })}
          showDetails={process.env.NODE_ENV === 'development'}
          errorInfo={errorInfo || undefined}
        />
      );
    }

    return children;
  }
}

export default GlobalErrorBoundary;
