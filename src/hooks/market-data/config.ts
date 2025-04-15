
/**
 * Base configuration for all market data queries
 */
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 60 * 1000, // 1 minute
  retry: 2,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true
};
