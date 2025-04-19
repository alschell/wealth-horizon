
import { useErrorHandler as useAppErrorHandler } from '@/utils/errorHandling';
import { ErrorHandlerOptions, ErrorResponse } from '@/utils/errorHandling/types/core';

/**
 * Hook for error handling
 * Re-exports the centralized implementation for backward compatibility
 */
export const useErrorHandler = useAppErrorHandler;

// Define types for the hook return value for better type safety
export interface ErrorHandlerResult {
  handleError: (error: unknown, options?: ErrorHandlerOptions) => ErrorResponse;
  withTry: <T>(fn: () => Promise<T> | T, options?: ErrorHandlerOptions) => () => Promise<T | undefined>;
  tryCatch: <T>(fn: () => Promise<T> | T, options?: ErrorHandlerOptions) => () => Promise<T | undefined>;
  withErrorHandling: <T>(fn: () => Promise<T> | T, options?: ErrorHandlerOptions) => () => Promise<T | undefined>;
  lastError: ErrorResponse | null;
  clearLastError: () => void;
}

// Export everything from the centralized implementation
export * from '@/utils/errorHandling';
