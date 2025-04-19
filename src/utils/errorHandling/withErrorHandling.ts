
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorFallback } from '@/components/shared/ErrorFallback';
import { logError } from './errorUtils';

interface ErrorBoundaryOptions {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showReset?: boolean;
  message?: string;
}

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorBoundaryOptions = {}
) => {
  const { 
    fallback, 
    onError = (error) => logError(error),
    showReset = true,
    message
  } = options;

  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary
        fallback={fallback ?? ((props) => (
          <ErrorFallback
            {...props}
            showReset={showReset}
            message={message}
          />
        ))}
        onError={onError}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export const withCustomErrorFallback = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType<{ error?: Error }>
) => {
  return withErrorBoundary(Component, {
    fallback: (props) => <FallbackComponent error={props.error} />
  });
};
