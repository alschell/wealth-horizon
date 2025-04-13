
/**
 * Logging utility for team components with different log levels and contexts
 */

// Log levels
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Log contexts for different parts of the team components
type LogContext = 'data' | 'filter' | 'sort' | 'render' | 'accessibility' | 'interaction';

// Configuration for the logger
interface LoggerConfig {
  enabled: boolean;
  minLevel: LogLevel;
  includeTimestamp: boolean;
  consoleEnabled: boolean;
}

// Default configuration
const defaultConfig: LoggerConfig = {
  enabled: process.env.NODE_ENV !== 'production',
  minLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  includeTimestamp: true,
  consoleEnabled: true
};

// Logger configuration - can be modified at runtime
let config: LoggerConfig = { ...defaultConfig };

// Log level priorities (higher number = more severe)
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

/**
 * Format a log message
 * @param level The log level
 * @param context The component context
 * @param message The log message
 * @param data Additional data to log
 * @returns Formatted log string
 */
function formatLogMessage(level: LogLevel, context: LogContext, message: string, data?: any): string {
  const timestamp = config.includeTimestamp ? `[${new Date().toISOString()}] ` : '';
  const formattedContext = context ? `[${context}] ` : '';
  const formattedLevel = `[${level.toUpperCase()}] `;
  
  return `${timestamp}${formattedLevel}${formattedContext}${message}`;
}

/**
 * Check if a log should be processed based on configured level
 * @param level The log level
 * @returns True if the log should be processed
 */
function shouldLog(level: LogLevel): boolean {
  if (!config.enabled) return false;
  
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[config.minLevel];
}

/**
 * Log a message with specified level and context
 * @param level The log level
 * @param context The component context
 * @param message The log message
 * @param data Additional data to log
 */
function log(level: LogLevel, context: LogContext, message: string, data?: any): void {
  if (!shouldLog(level)) return;
  
  const formattedMessage = formatLogMessage(level, context, message, data);
  
  if (config.consoleEnabled) {
    switch (level) {
      case 'debug':
        console.debug(formattedMessage, data ?? '');
        break;
      case 'info':
        console.info(formattedMessage, data ?? '');
        break;
      case 'warn':
        console.warn(formattedMessage, data ?? '');
        break;
      case 'error':
        console.error(formattedMessage, data ?? '');
        break;
    }
  }
  
  // Here you could add other logging destinations (e.g., remote logging service)
}

// Public API
const teamLogger = {
  /**
   * Configure the logger
   * @param newConfig New configuration options
   */
  configure(newConfig: Partial<LoggerConfig>): void {
    config = { ...config, ...newConfig };
  },
  
  /**
   * Reset the logger configuration to defaults
   */
  resetConfig(): void {
    config = { ...defaultConfig };
  },
  
  /**
   * Log a debug message
   * @param context The component context
   * @param message The log message
   * @param data Additional data to log
   */
  debug(context: LogContext, message: string, data?: any): void {
    log('debug', context, message, data);
  },
  
  /**
   * Log an info message
   * @param context The component context
   * @param message The log message
   * @param data Additional data to log
   */
  info(context: LogContext, message: string, data?: any): void {
    log('info', context, message, data);
  },
  
  /**
   * Log a warning message
   * @param context The component context
   * @param message The log message
   * @param data Additional data to log
   */
  warn(context: LogContext, message: string, data?: any): void {
    log('warn', context, message, data);
  },
  
  /**
   * Log an error message
   * @param context The component context
   * @param message The log message
   * @param data Additional data to log
   */
  error(context: LogContext, message: string, data?: any): void {
    log('error', context, message, data);
  },
  
  /**
   * Create a contextualized logger for a specific component
   * @param context The component context
   * @returns Object with logging methods
   */
  forContext(context: LogContext) {
    return {
      debug: (message: string, data?: any) => log('debug', context, message, data),
      info: (message: string, data?: any) => log('info', context, message, data),
      warn: (message: string, data?: any) => log('warn', context, message, data),
      error: (message: string, data?: any) => log('error', context, message, data)
    };
  }
};

export default teamLogger;
