
import { QueryObserverOptions } from "@tanstack/react-query";

// Create a logger for market data operations
export const marketLogger = {
  info: (message: string, data?: any) => {
    console.info(`[Market Data] ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    console.debug(`[Market Data] ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[Market Data] ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[Market Data] ${message}`, data || '');
  }
};

// Default configuration for market data queries
export const DEFAULT_QUERY_CONFIG: Partial<QueryObserverOptions> = {
  refetchOnWindowFocus: false,
  refetchOnMount: true,
  retry: 2,
  staleTime: 5 * 60 * 1000, // 5 minutes default
  gcTime: 15 * 60 * 1000, // 15 minutes default
};
