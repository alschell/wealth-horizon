
import { ErrorInfo } from 'react';

/**
 * Standard error response format
 * Used for consistent error handling across the application
 */
export interface ErrorResponse {
  /** Human-readable error message */
  message: string;
  /** Error code for categorization and handling */
  code: string;
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
  /** Additional context information to include with the error */
  context?: Record<string, unknown>;
  /** Whether to show a toast notification for this error */
  showToast?: boolean;
  /** Whether to log this error to the console */
  logToConsole?: boolean;
  /** Whether to re-throw the error after handling */
  rethrow?: boolean;
  /** Custom fallback message to use if error doesn't have one */
  fallbackMessage?: string;
  /** Action text for toast notifications */
  actionText?: string;
  /** Action function for toast notifications */
  action?: () => void;
  /** Component name for contextual error messages */
  componentName?: string;
  /** Optional callback to execute when error occurs */
  onError?: (error: unknown) => void;
  /** Custom fallback UI to show when an error occurs */
  fallback?: React.ReactNode;
  /** Custom toast title for error notifications */
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
