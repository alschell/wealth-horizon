
import { ReactNode } from 'react';

export interface BaseErrorOptions {
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
  /** Toast title for error notifications */
  toastTitle?: string;
  /** Component name for contextual errors */
  componentName?: string;
}

export interface ErrorHandlerOptions extends BaseErrorOptions {
  /** Action text for toast notifications */
  actionText?: string;
  /** Action function for toast notifications */
  action?: () => void;
  /** Optional callback when error occurs */
  onError?: (error: unknown) => void;
  /** Custom fallback UI */
  fallback?: ReactNode;
}

export interface ErrorResponse {
  /** Human-readable error message */
  message: string;
  /** Error code for categorization */
  code?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
  /** Original error that caused this */
  originalError?: unknown;
  /** Timestamp when error occurred */
  timestamp?: string;
}
