
import { useErrorHandler as useAppErrorHandler } from '@/utils/errorHandling';

/**
 * Hook for error handling
 * Re-exports the centralized implementation for backward compatibility
 */
export const useErrorHandler = useAppErrorHandler;

// Export everything from the centralized implementation
export * from '@/utils/errorHandling';
