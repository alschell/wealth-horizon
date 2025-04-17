
/**
 * Props for the ErrorFallback component
 */
export interface ErrorFallbackProps {
  /** The error that was caught */
  error: Error;
  
  /** Function to reset the error boundary */
  resetErrorBoundary?: () => void;
  
  /** Custom title for the error message */
  title?: string;
  
  /** Whether to show the reset button */
  showReset?: boolean;
  
  /** Custom text for the reset button */
  resetText?: string;
}
