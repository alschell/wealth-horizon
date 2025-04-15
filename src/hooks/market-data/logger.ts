
/**
 * Simple logger for market data operations
 */
export const marketLogger = {
  info: (message: string, ...args: any[]) => {
    console.info(`[Market Data] ${message}`, ...args);
  },
  
  error: (message: string, error?: any) => {
    console.error(`[Market Data Error] ${message}`, error);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[Market Data Warning] ${message}`, ...args);
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[Market Data Debug] ${message}`, ...args);
    }
  }
};
