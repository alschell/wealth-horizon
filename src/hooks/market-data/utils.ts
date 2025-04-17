
import { QueryObserverOptions } from "@tanstack/react-query";
import { createLogger } from "@/utils/logger";

/**
 * Logger for market data operations
 */
export const marketLogger = createLogger("market-data");

/**
 * Default configuration for React Query
 */
export const DEFAULT_QUERY_CONFIG: Partial<QueryObserverOptions<unknown, Error, unknown>> = {
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  refetchOnReconnect: true,
  staleTime: 60 * 1000 // 1 minute default stale time
};
