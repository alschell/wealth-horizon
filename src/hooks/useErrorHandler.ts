
import React from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ErrorHandlerOptions {
  showToast?: boolean;
  fallbackMessage?: string;
  onError?: (error: unknown) => void;
  componentName?: string;
}

/**
 * Higher-order component to wrap a component with error handling
 */
export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>, 
  options?: ErrorHandlerOptions
): React.FC<P> {
  const WithErrorHandling: React.FC<P> = (props) => {
    const errorHandler = useErrorHandler(options);
    // Use React.createElement instead of JSX
    return React.createElement(Component, { ...props, errorHandler });
  };

  WithErrorHandling.displayName = `withErrorHandling(${Component.displayName || Component.name || 'Component'})`;

  return WithErrorHandling;
}

/**
 * Hook for consistent error handling across the application
 */
export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const { toast } = useToast();
  
  const handleError = (error: unknown) => {
    const { 
      showToast = true, 
      fallbackMessage = 'An unexpected error occurred',
      onError
    } = options;
    
    // Get error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : typeof error === 'string' 
        ? error 
        : fallbackMessage;
    
    // Show toast if enabled
    if (showToast) {
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    }
    
    // Log error to console
    console.error('[Error Handler]:', error);
    
    // Call custom error handler if provided
    if (onError) {
      onError(error);
    }
    
    return { error, message: errorMessage };
  };
  
  const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
    fn: T
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error);
        return undefined;
      }
    };
  };
  
  return {
    handleError,
    withErrorHandling
  };
}
