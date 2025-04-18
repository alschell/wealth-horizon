
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  handleError, 
  parseError,
  type ErrorHandlerOptions,
  type ErrorResponse 
} from '@/utils/errorHandling/errorHandlingCore';

export function useGlobalErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  const { toast } = useToast();

  const handleErrorWithFeedback = useCallback((
    error: unknown, 
    options: ErrorHandlerOptions = {}
  ) => {
    const mergedOptions = { ...defaultOptions, ...options };
    const errorDetails = handleError(error, mergedOptions);
    
    return errorDetails;
  }, [defaultOptions]);

  const withErrorHandling = useCallback(<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
  ) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleErrorWithFeedback(error, options);
        return undefined;
      }
    };
  }, [handleErrorWithFeedback]);

  return {
    handleError: handleErrorWithFeedback,
    withErrorHandling,
    parseError,
    showErrorToast: (message: string) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    }
  };
}
