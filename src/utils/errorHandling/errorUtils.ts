
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
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * Safely extracts error message from various error types
 */
export function getErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return String((error as ErrorResponse).message);
    }
  }
  
  return fallbackMessage;
}

/**
 * Parses any error type into a standardized error response
 */
export function parseError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name
    };
  }
  
  if (typeof error === "string") {
    return {
      message: error,
      code: "ERROR_STRING"
    };
  }
  
  if (error && typeof error === "object") {
    if ("message" in error) {
      return {
        message: String((error as ErrorResponse).message),
        code: (error as ErrorResponse).code || "ERROR_OBJECT",
        details: (error as ErrorResponse).details
      };
    }
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}
