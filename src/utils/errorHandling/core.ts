
import { toast } from '@/hooks/use-toast';
import { ErrorHandlerOptions, ErrorResponse } from './types/core';

export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      details: { stack: error.stack },
      originalError: error,
      timestamp: new Date().toISOString()
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      code: 'STRING_ERROR',
      timestamp: new Date().toISOString()
    };
  }

  if (error && typeof error === 'object') {
    if ('message' in error) {
      return {
        message: String((error as any).message),
        code: (error as any).code || 'OBJECT_ERROR',
        details: error as Record<string, unknown>,
        originalError: error,
        timestamp: new Date().toISOString()
      };
    }
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    originalError: error,
    timestamp: new Date().toISOString()
  };
}

export function handleError(error: unknown, options: ErrorHandlerOptions = {}): ErrorResponse {
  const {
    silent = false,
    showToast = true,
    logToConsole = true,
    toastTitle = 'Error',
    fallbackMessage = 'An unexpected error occurred',
    componentName,
    action,
    actionText,
    onError
  } = options;

  const parsedError = parseError(error);
  const errorMessage = parsedError.message || fallbackMessage;

  if (!silent) {
    if (logToConsole) {
      console.error(
        `[${componentName || 'Error'}]`,
        errorMessage,
        parsedError.details || parsedError.originalError
      );
    }

    if (showToast) {
      toast({
        title: toastTitle,
        description: errorMessage,
        variant: "destructive",
        action: actionText && action ? {
          label: actionText,
          onClick: action
        } : undefined
      });
    }
  }

  if (onError) {
    onError(error);
  }

  if (options.rethrow) {
    throw error;
  }

  return parsedError;
}

export const createErrorHandler = (defaultOptions: ErrorHandlerOptions = {}) => {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...options });
  };
};
