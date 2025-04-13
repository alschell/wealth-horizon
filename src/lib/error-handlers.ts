
import { useToast } from "@/hooks/use-toast";

/**
 * Standard error response format
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Options for error handling
 */
export interface ErrorHandlerOptions {
  silent?: boolean;
  actionText?: string;
  action?: () => void;
  fallbackMessage?: string;
}

/**
 * Custom hook for handling errors in a consistent way
 */
export function useErrorHandler() {
  const { toast } = useToast();
  
  /**
   * Handles an error and shows an appropriate toast message
   * @param error - The error to handle
   * @param options - Error handling options
   */
  const handleError = (error: unknown, options: ErrorHandlerOptions = {}) => {
    console.error("Error occurred:", error);
    
    if (options.silent) return;
    
    let errorMessage = options.fallbackMessage || "An unexpected error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = String((error as ErrorResponse).message);
    }
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };
  
  /**
   * Creates a try-catch wrapper for async functions
   * @param fn - The async function to wrap
   * @param options - Error handling options
   * @returns A wrapped function that handles errors
   */
  const withErrorHandling = <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    options: ErrorHandlerOptions = {}
  ) => {
    return async (...args: T): Promise<R | undefined> => {
      try {
        return await fn(...args);
      } catch (error) {
        handleError(error, options);
        return undefined;
      }
    };
  };
  
  return {
    handleError,
    withErrorHandling
  };
}

/**
 * Parses an API error response
 * @param error - The error to parse
 * @returns A standardized error object
 */
export function parseApiError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: "ERROR"
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR"
    };
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || "ERROR",
        details: (error as ErrorResponse).details
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}
