
import React from 'react';

/**
 * Props interface for the ErrorFallback component
 */
export interface ErrorFallbackProps {
  /**
   * The error that was caught
   */
  error?: Error;
  
  /**
   * Function to reset the error boundary state
   */
  resetErrorBoundary?: () => void;
  
  /**
   * Custom message to display
   */
  message?: string;
  
  /**
   * Whether to show the reset button
   */
  showReset?: boolean;
  
  /**
   * Whether to show technical details
   */
  showDetails?: boolean;
  
  /**
   * Additional information about the error
   */
  errorInfo?: React.ErrorInfo;
}
