
import teamLogger from "@/components/team/utils/teamLogger";

/**
 * Dedicated logger for market data operations
 * Provides consistent formatting and categorization for market data logs
 */
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
