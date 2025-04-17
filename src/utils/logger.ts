
/**
 * Simple logger utility for consistent logging across the application
 */
export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public info(message: string, ...data: any[]): void {
    console.info(`[${this.name}] ${message}`, ...data);
  }

  public debug(message: string, ...data: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[${this.name}] ${message}`, ...data);
    }
  }

  public warn(message: string, ...data: any[]): void {
    console.warn(`[${this.name}] ${message}`, ...data);
  }

  public error(message: string, ...data: any[]): void {
    console.error(`[${this.name}] ${message}`, ...data);
  }

  /**
   * Create a new logger instance with the given name
   */
  public static createLogger(name: string): Logger {
    return new Logger(name);
  }
}
