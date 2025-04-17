
import { QueryClient } from "@tanstack/react-query";
import { Logger } from "@/utils/logger";
import { toast } from "sonner";

// Create a dedicated logger for market data operations
export const marketLogger = Logger.createLogger("MarketData");

// Default query configuration for all market data queries
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: true,
  retry: 1,
};

// Extended query configuration with error handling
export const ROBUST_QUERY_CONFIG = {
  ...DEFAULT_QUERY_CONFIG,
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * (2 ** attemptIndex), 30000), // Exponential backoff with 30s cap
  onError: (error: Error) => {
    marketLogger.error(`Market data query failed: ${error.message}`);
    console.error("Market data query error details:", error);
  }
};

// Create a query client for market data
export const marketQueryClient = new QueryClient({
  defaultOptions: {
    queries: DEFAULT_QUERY_CONFIG,
  },
});

// Utility to handle API errors with fallback to cache
export const handleApiError = (error: Error, cacheKey: string, fallbackMessage: string) => {
  marketLogger.error(`API Error: ${error.message}, using cached data if available`);
  console.error("API Error details:", error);
  
  toast.error("Market data update failed", {
    description: fallbackMessage || "Using cached data. Please check your connection."
  });
};

// Properly format market data timestamps
export const formatTimestamp = (timestamp: number) => {
  // Ensure we're handling both seconds and milliseconds timestamps
  const normalizedTimestamp = timestamp > 9999999999 ? timestamp : timestamp * 1000;
  return new Date(normalizedTimestamp).toLocaleString();
};

// Format number to fixed decimal places with commas
export const formatNumber = (num: number, decimals: number = 2) => {
  return num.toLocaleString(undefined, { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
};

// Format percentage
export const formatPercent = (percent: number) => {
  const sign = percent > 0 ? '+' : '';
  return `${sign}${formatNumber(percent)}%`;
};
