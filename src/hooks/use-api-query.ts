
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type FetchFn<T> = () => Promise<T>;

/**
 * Hook for handling API requests with consistent loading, error states
 */
export function useApiQuery<T>(
  queryKey: string | string[],
  fetchFn: FetchFn<T>,
  options?: UseQueryOptions<T, Error, T>
) {
  const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey];
  
  const { 
    data, 
    isLoading, 
    error, 
    refetch, 
    isError, 
    isFetching 
  } = useQuery({
    queryKey: queryKeyArray,
    queryFn: fetchFn,
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    ...options,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    isError,
    isFetching
  };
}
