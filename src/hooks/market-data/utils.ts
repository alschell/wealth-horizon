
import { QueryClient } from "@tanstack/react-query";
import { Logger } from "@/utils/logger";

// Create a dedicated logger for market data operations
export const marketLogger = Logger.createLogger("MarketData");

// Default query configuration for all market data queries
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: true,
  retry: 1,
};

// Create a query client for market data
export const marketQueryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_CONFIG,
  },
});
