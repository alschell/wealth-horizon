
/**
 * Standardized data fetching hook built on React Query
 * with integrated error handling and loading states
 */

import { useQuery, UseQueryOptions, UseQueryResult, QueryKey } from '@tanstack/react-query';
import { useErrorHandler } from './useErrorHandler';
import { useState, useCallback } from 'react';

interface FetchDataOptions<TData, TError> extends 
  Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'> {
  
  /** Custom error message to display if fetch fails */
  errorMessage?: string;
  
  /** Whether to show toast notification on error */
  showErrorToast?: boolean;
  
  /** Component name for error logging context */
  componentName?: string;
  
  /** Whether to automatically retry failed requests */
  autoRetry?: boolean;
  
  /** Maximum number of retry attempts */
  maxRetries?: number;
}

/**
 * Hook for standardized data fetching with built-in error handling
 * 
 * @param queryKey Unique key for this query
 * @param fetchFn Function that returns a promise with the data
 * @param options Additional options for the query
 * @returns Query result with data, loading state, and error handling
 */
export function useFetchData<TData, TError = Error>(
  queryKey: string | string[],
  fetchFn: () => Promise<TData>,
  options: FetchDataOptions<TData, TError> = {}
): UseQueryResult<TData, TError> & { isRefetching: boolean; refetchWithState: () => Promise<void> } {
  const { 
    errorMessage = 'Failed to fetch data',
    showErrorToast = true,
    componentName,
    autoRetry = true,
    maxRetries = 3,
    ...queryOptions
  } = options;
  
  const errorHandler = useErrorHandler();
  const [isRefetching, setIsRefetching] = useState(false);
  
  // Normalize query key to array format
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  // Wrap the fetch function to handle errors
  const handleFetchWithErrorHandling = useCallback(async () => {
    try {
      const data = await fetchFn();
      return data;
    } catch (error) {
      // Handle the error using our error handling system
      errorHandler.handleError(error, {
        fallbackMessage: errorMessage,
        showToast: showErrorToast,
        componentName
      });
      
      // Re-throw to let React Query handle error states
      throw error;
    }
  }, [fetchFn, errorHandler, errorMessage, showErrorToast, componentName]);
  
  // Set up the refetch wrapper
  const handleRefetch = useCallback(async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  }, []);
  
  // Configure and execute the query
  const {
    data,
    error,
    isLoading,
    isError,
    refetch,
    ...rest
  } = useQuery<TData, TError>({
    queryKey: normalizedQueryKey,
    queryFn: handleFetchWithErrorHandling,
    retry: autoRetry ? maxRetries : false,
    ...queryOptions,
    meta: {
      ...queryOptions.meta
    }
  });
  
  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
    isRefetching,
    refetchWithState: handleRefetch,
    ...rest
  };
}

/**
 * Creates a pre-configured fetch function for consistent API calls
 * 
 * @param baseUrl Base URL for API endpoints
 * @returns Configured fetch function
 */
export function createApiClient(baseUrl: string) {
  return async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      const error = new Error(
        errorData.message || `API error: ${response.status}`
      );
      
      (error as any).status = response.status;
      (error as any).statusText = response.statusText;
      (error as any).data = errorData;
      
      throw error;
    }
    
    // Handle empty responses
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }
    
    return response.json();
  };
}
