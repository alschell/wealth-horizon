
import teamLogger from "@/components/team/utils/teamLogger";

// Create a dedicated logger for market data
export const marketLogger = {
  debug: (message: string, data?: any) => 
    teamLogger.debug('data', `[Market] ${message}`, data),
  info: (message: string, data?: any) => 
    teamLogger.info('data', `[Market] ${message}`, data),
  warn: (message: string, data?: any) => 
    teamLogger.warn('data', `[Market] ${message}`, data),
  error: (message: string, data?: any) => 
    teamLogger.error('data', `[Market] ${message}`, data)
};

/**
 * Base config for all market data queries
 */
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 60 * 1000, // 1 minute
  retry: 2,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true
};
