
import { toast } from '@/hooks/use-toast';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  silent?: boolean;
  logError?: boolean;
  showToast?: boolean;
  fallbackMessage?: string;
  onError?: (error: unknown) => void;
  componentName?: string; // Added for context in error logging
}

export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR'
    };
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: String((error as ErrorResponse).message),
      code: (error as ErrorResponse).code || 'ERROR',
      details: (error as ErrorResponse).details
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
}

// Add these missing utility functions
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return String((error as ErrorResponse).message);
  }
  
  return fallbackMessage;
}

export function logError(error: unknown, componentName?: string): void {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

export function handleError(error: unknown, options: ErrorHandlerOptions = {}) {
  const { 
    silent = false,
    logError = true,
    showToast = true,
    fallbackMessage = 'An unexpected error occurred',
    onError,
    componentName
  } = options;

  const errorDetails = parseError(error);
  
  if (logError && !silent) {
    console.error('[Error Handler]:', {
      error: errorDetails,
      originalError: error,
      component: componentName
    });
  }

  if (showToast && !silent) {
    toast({
      title: 'Error',
      description: errorDetails.message || fallbackMessage,
      variant: 'destructive'
    });
  }

  if (onError) {
    onError(error);
  }

  return errorDetails;
}

export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
) {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
}

export function tryCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  return Promise.resolve()
    .then(() => fn())
    .catch((error) => {
      handleError(error, options);
      return undefined;
    });
}
