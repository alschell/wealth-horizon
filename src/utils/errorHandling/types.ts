
import { ErrorInfo } from 'react';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  /** Human-readable error message */
  message: string;
  /** Error code for categorization and handling */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
  /** Original error that caused this error */
  originalError?: unknown;
  /** Timestamp when the error occurred */
  timestamp?: string;
}

/**
 * Options for error handler functions
 */
export interface ErrorHandlerOptions {
  /** Whether to suppress normal error handling behavior */
  silent?: boolean;
  /** Additional context information */
  context?: Record<string, unknown>;
  /** Whether to show a toast notification */
  showToast?: boolean;
  /** Whether to log to console */
  logToConsole?: boolean;
  /** Whether to re-throw the error */
  rethrow?: boolean;
  /** Custom fallback message */
  fallbackMessage?: string;
  /** Action text for toast notifications */
  actionText?: string;
  /** Action function for toast notifications */
  action?: () => void;
  /** Component name for contextual error messages */
  componentName?: string;
  /** Optional callback when error occurs */
  onError?: (error: Error, errorInfo?: React.ErrorInfo) => void;
  /** Custom fallback UI */
  fallback?: React.ReactNode;
  /** Custom toast title */
  toastTitle?: string;
}

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

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /** Child components to render */
  children: React.ReactNode;
  
  /** Custom fallback UI to show when an error occurs */
  fallback?: React.ReactNode;
  
  /** Name of the component being wrapped (for error messages) */
  componentName?: string;
  
  /** Callback when an error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  /** Function to reset the error boundary state */
  resetErrorBoundary?: () => void;
}

/**
 * State for the ErrorBoundary component
 */
export interface ErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  
  /** The error that was caught */
  error?: Error;
  
  /** Additional information about the error */
  errorInfo?: React.ErrorInfo;
}
