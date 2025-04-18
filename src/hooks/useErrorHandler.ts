
import React from 'react';
import { useErrorHandler } from './useErrorHandler';

export function withErrorHandling<P extends object>(
  Component: React.ComponentType<P>, 
  options?: ErrorHandlerOptions
): React.FC<P> {
  const WithErrorHandling: React.FC<P> = (props) => {
    const errorHandler = useErrorHandler(options);
    return <Component {...props} errorHandler={errorHandler} />;
  };

  WithErrorHandling.displayName = `withErrorHandling(${Component.displayName || Component.name || 'Component'})`;

  return WithErrorHandling;
}
