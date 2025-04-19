
import { ErrorInfo } from 'react';

export interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  message?: string;
  showReset?: boolean;
  resetText?: string;
  showDetails?: boolean;
  errorInfo?: ErrorInfo;  // Added this property
}
