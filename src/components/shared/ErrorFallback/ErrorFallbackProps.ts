
import { ErrorInfo } from 'react';

export interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  title?: string;
  message?: string;
  description?: string;
  showReset?: boolean;
  showResetButton?: boolean;
  resetText?: string;
  showDetails?: boolean;
  errorInfo?: ErrorInfo;
}
