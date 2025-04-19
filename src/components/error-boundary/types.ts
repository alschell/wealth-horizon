
import { ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  /**
   * Content wrapped by the error boundary
   */
  children: ReactNode;
  
  /**
   * Custom fallback component to render when an error occurs
   */
  fallback?: ReactNode;
  
  /**
   * Handler called when an error is caught
   */
  onError?: (error: unknown) => void;
  
  /**
   * Name of the component for error reporting
   */
  componentName?: string;
  
  /**
   * Function to reset the error boundary state
   */
  resetErrorBoundary?: () => void;
}

export interface ErrorBoundaryState {
  /**
   * Whether an error has been caught
   */
  hasError: boolean;
  
  /**
   * The error that was caught
   */
  error?: Error;
  
  /**
   * Error information including component stack
   */
  errorInfo?: ErrorInfo;
}
