
import { showError } from '@/utils/toast';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  onError?: (error: unknown) => void;
  componentName?: string; // Added this property
}

export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "ERROR"
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR"
    };
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return {
      message: String((error as ErrorResponse).message),
      code: (error as ErrorResponse).code || "ERROR",
      details: (error as ErrorResponse).details
    };
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}

export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): void {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logError = true,
    showToast = true,
    onError,
    componentName
  } = options;
  
  const parsedError = parseError(error);
  const errorMessage = parsedError.message || fallbackMessage;
  
  if (logError) {
    console.error(`[${componentName || 'Error Handler'}]:`, parsedError);
  }
  
  if (showToast) {
    showError("Error", errorMessage);
  }
  
  if (onError) {
    onError(error);
  }
}

// Add the missing utility functions
export function getErrorMessage(error: unknown, fallbackMessage: string = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object" && "message" in error) {
    return String((error as {message: unknown}).message);
  }
  
  return fallbackMessage;
}

export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    handleError(error, { ...defaultOptions, ...options });
  };
}

export function logError(error: unknown, componentName?: string): void {
  console.error(`[${componentName || 'Error'}]:`, error);
  
  if (error instanceof Error && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

export function createContextualError(message: string, componentName: string): Error {
  const error = new Error(`[${componentName}] ${message}`);
  return error;
}

export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions = {}
): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
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
  promise: Promise<T> | (() => Promise<T>),
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  const executor = typeof promise === 'function' ? promise : () => promise;
  
  return executor().catch(error => {
    handleError(error, options);
    return undefined;
  });
}
