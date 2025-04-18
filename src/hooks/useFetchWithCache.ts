
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import type { QueryKey } from '@tanstack/query-core';

interface CacheOptions {
  staleTime?: number;
}

/**
 * Custom hook for fetching data with caching using React Query
 */
export function useFetchWithCache<T>(
  key: QueryKey,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const queryClient = useQueryClient();
  const { staleTime = 60 * 1000 } = options;
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const cachedData: T | undefined = queryClient.getQueryData(key);

        if (cachedData) {
          setData(cachedData);
          setIsLoading(false);
          return;
        }

        const result = await fetcher();
        setData(result);
        
        // Set data to cache
        queryClient.setQueryData(key, result);
      } catch (e: any) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, fetcher, queryClient, staleTime]);

  return {
    data,
    isLoading,
    error,
  };
}
