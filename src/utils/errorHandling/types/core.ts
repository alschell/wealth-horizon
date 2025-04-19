
import { ErrorInfo } from 'react';

/**
 * Standard error response format
 */
export interface ErrorResponse {
  /** Error message */
  message: string;
  /** Error code or identifier */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
  /** Original error object */
  originalError?: unknown;
  /** Timestamp when error occurred */
  timestamp?: string;
  /** Context information related to the error */
  context?: Record<string, unknown>;
}

/**
 * Options for error handling functions
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
  /** Optional callback to execute when error occurs */
  onError?: (error: Error, errorInfo?: ErrorInfo) => void;
  /** Component name where error occurred (for logging) */
  componentName?: string;
  /** Toast notification title */
  toastTitle?: string;
  /** Action callback for toast notification */
  action?: () => void;
  /** Action text for toast notification */
  actionText?: string;
  /** Custom fallback UI when error occurs */
  fallback?: React.ReactNode;
}

/**
 * Base options for error handling components
 */
export interface BaseErrorOptions {
  /** Component name for error reporting */
  componentName?: string;
  /** Custom fallback UI when error occurs */
  fallback?: React.ReactNode;
  /** Custom fallback message */
  fallbackMessage?: string;
  /** Whether to log errors to console */
  logToConsole?: boolean;
}
