
import React, { useState, useCallback } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';
import { useErrorHandler } from './useErrorHandler';

interface ErrorBoundaryConfig {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showReset?: boolean;
  message?: string;
  componentName?: string;
  logError?: boolean;
  showToast?: boolean;
}

/**
 * Hook for consistent error boundary usage
 */
export function useErrorBoundary(config: ErrorBoundaryConfig = {}) {
  const {
    fallback,
    onError,
    showReset = true,
    message = "Something went wrong",
    componentName,
    logError = true,
    showToast = true
  } = config;
  
  const { showError } = useErrorHandler();
  const [key, setKey] = useState<number>(0);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);
  
  // Error callback
  const handleError = useCallback((error: Error, info: React.ErrorInfo) => {
    if (logError) {
      console.error(`Error in ${componentName || 'component'}:`, error);
      console.error('Component stack:', info.componentStack);
    }
    
    setErrorInfo(info);
    
    if (showToast) {
      showError(message, error.message || "The application encountered an error");
    }
    
    if (onError) {
      onError(error, info);
    }
  }, [componentName, logError, message, onError, showError, showToast]);
  
  // Reset the error boundary
  const resetErrorBoundary = useCallback(() => {
    setKey(prevKey => prevKey + 1);
    setErrorInfo(null);
  }, []);
  
  // Wrapper component with error boundary
  const ErrorBoundaryWrapper = useCallback(
    ({ children, customFallback }: { children: React.ReactNode, customFallback?: React.ReactNode }) => (
      <ErrorBoundary
        key={key}
        fallback={
          customFallback || fallback || (
            <ErrorFallback 
              message={message} 
              resetErrorBoundary={resetErrorBoundary}
              showReset={showReset}
              errorInfo={errorInfo || undefined}
            />
          )
        }
        onError={handleError}
        componentName={componentName}
      >
        {children}
      </ErrorBoundary>
    ),
    [key, fallback, message, resetErrorBoundary, showReset, handleError, componentName, errorInfo]
  );
  
  return {
    ErrorBoundaryWrapper,
    resetErrorBoundary,
    errorInfo
  };
}

/**
 * HOC to wrap a component with error boundary using the hook
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  options: ErrorBoundaryConfig = {}
) {
  const {
    componentName = Component.displayName || Component.name || 'Component',
    ...restOptions
  } = options;
  
  const WrappedComponent: React.FC<P> = (props) => {
    const { ErrorBoundaryWrapper } = useErrorBoundary({
      componentName,
      ...restOptions
    });
    
    return (
      <ErrorBoundaryWrapper>
        <Component {...props} />
      </ErrorBoundaryWrapper>
    );
  };
  
  WrappedComponent.displayName = `withErrorHandling(${componentName})`;
  return WrappedComponent;
}
