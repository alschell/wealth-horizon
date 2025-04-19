
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/toast';
import { getErrorMessage, logError } from '@/utils/errorHandling';

export const useErrorHandler = (componentName?: string) => {
  const { toast } = useToast();
  const [lastError, setLastError] = useState<Error | null>(null);

  const handleError = useCallback((error: unknown) => {
    const errorMessage = getErrorMessage(error);
    setLastError(error instanceof Error ? error : new Error(errorMessage));
    logError(error, componentName);
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive'
    });
  }, [componentName, toast]);

  const clearLastError = useCallback(() => {
    setLastError(null);
  }, []);

  const withErrorHandling = useCallback(<T extends (...args: any[]) => any>(fn: T) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error);
        return undefined;
      }
    };
  }, [handleError]);

  const tryCatch = useCallback(async <T>(fn: () => Promise<T> | T): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (error) {
      handleError(error);
      return undefined;
    }
  }, [handleError]);

  return {
    handleError,
    lastError,
    clearLastError,
    withErrorHandling,
    tryCatch
  };
};
