
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { handleError, ErrorHandlerOptions } from '@/utils/errorHandling';

/**
 * Options for the useFetchWithCache hook
 */
export interface FetchWithCacheOptions<TData, TError> 
  extends Omit<UseQueryOptions<TData, TError, TData, any[]>, 'queryKey' | 'queryFn'> {
  /**
   * Function to execute when an error occurs
   */
  onError?: (error: TError) => void;
  
  /**
   * Custom error message to display
   */
  errorMessage?: string;
  
  /**
   * Whether to show a toast notification on error
   */
  showErrorToast?: boolean;
  
  /**
   * Component name for better error logging
   */
  componentName?: string;
}

/**
 * Hook for data fetching with caching and error handling
 * 
 * @param queryKey - Unique key for the query
 * @param fetchFn - Function to fetch the data
 * @param options - Additional options for the query
 */
export function useFetchWithCache<TData, TError = unknown>(
  queryKey: any[],
  fetchFn: () => Promise<TData>,
  options: FetchWithCacheOptions<TData, TError> = {}
) {
  const { 
    onError,
    errorMessage = 'Failed to fetch data',
    showErrorToast = true,
    componentName,
    ...queryOptions
  } = options;
  
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      try {
        const result = await fetchFn();
        if (result === undefined) {
          throw new Error(errorMessage);
        }
        return result;
      } catch (error) {
        const errorHandlerOptions: ErrorHandlerOptions = {
          fallbackMessage: errorMessage,
          showToast: showErrorToast,
          componentName
        };
        
        if (onError) {
          errorHandlerOptions.onError = onError as (error: unknown) => void;
        }
        
        handleError(error, errorHandlerOptions);
        throw error; // Let React Query handle the error state
      }
    },
    ...queryOptions
  });
}
