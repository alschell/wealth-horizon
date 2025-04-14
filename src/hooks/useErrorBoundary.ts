
import { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ErrorBoundaryHookOptions {
  fallbackMessage?: string;
  showToast?: boolean;
  resetOnUnmount?: boolean;
  logToConsole?: boolean;
}

/**
 * Hook for use in components to show error boundary functionality
 * without using class components
 */
export function useErrorBoundary(options: ErrorBoundaryHookOptions = {}) {
  const {
    fallbackMessage = "Something went wrong",
    showToast = true,
    resetOnUnmount = true,
    logToConsole = true
  } = options;
  
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((caught: unknown) => {
    const err = caught instanceof Error ? caught : new Error(String(caught));
    
    setError(err);
    
    if (logToConsole) {
      console.error("Error caught by boundary:", err);
    }
    
    if (showToast) {
      toast({
        title: "An error occurred",
        description: err.message || fallbackMessage,
        variant: "destructive"
      });
    }
    
    return err;
  }, [fallbackMessage, showToast, logToConsole]);
  
  const reset = useCallback(() => {
    setError(null);
  }, []);
  
  return {
    error,
    handleError,
    reset,
    isError: error !== null
  };
}

export default useErrorBoundary;
