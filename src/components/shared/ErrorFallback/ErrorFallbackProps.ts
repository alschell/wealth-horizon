
import { ErrorInfo } from 'react';

/**
 * Props for the ErrorFallback component
 * Provides consistent error display across the application
 */
export interface ErrorFallbackProps {
  /** The error that was caught */
  error?: Error;
  
  /** Function to reset the error boundary */
  resetErrorBoundary?: () => void;
  
  /** Title of the error message */
  title?: string;
  
  /** Description of the error */
  description?: string;
  
  /** Alias for description (for backward compatibility) */
  message?: string;
  
  /** Whether to show the reset button */
  showResetButton?: boolean;
  
  /** Alias for showResetButton (for backward compatibility) */
  showReset?: boolean;
  
  /** Text for the reset button */
  resetText?: string;
  
  /** Whether to show error details */
  showDetails?: boolean;
  
  /** Additional information about the error */
  errorInfo?: ErrorInfo;
}
