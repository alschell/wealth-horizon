
import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a configured QueryClient instance with default settings
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * (2 ** attemptIndex), 30000),
        meta: {
          onError: (error: Error) => {
            console.error("Query error:", error);
          }
        }
      },
    }
  });
}
