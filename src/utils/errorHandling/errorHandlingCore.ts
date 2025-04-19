
import { showError } from '@/utils/toast';

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  fallbackMessage?: string;
  logError?: boolean;
  showToast?: boolean;
  onError?: (error: unknown) => void;
}

export function parseError(error: unknown): ErrorResponse {
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
  
  if (error && typeof error === "object" && "message" in error) {
    return {
      message: String((error as ErrorResponse).message),
      code: (error as ErrorResponse).code || "ERROR",
      details: (error as ErrorResponse).details
    };
  }
  
  return {
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR"
  };
}

export function handleError(
  error: unknown, 
  options: ErrorHandlerOptions = {}
): void {
  const { 
    fallbackMessage = "An unexpected error occurred",
    logError = true,
    showToast = true,
    onError
  } = options;
  
  const parsedError = parseError(error);
  const errorMessage = parsedError.message || fallbackMessage;
  
  if (logError) {
    console.error("[Error Handler]:", parsedError);
  }
  
  if (showToast) {
    showError("Error", errorMessage);
  }
  
  if (onError) {
    onError(error);
  }
}
