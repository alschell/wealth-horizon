
import { 
  QueryClient, 
  QueryClientProvider as TanstackQueryClientProvider 
} from "@tanstack/react-query";

// Factory function to create a query client with default options
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * (2 ** attemptIndex), 30000),
      },
    }
  });
};

// Re-export the provider
export const QueryClientProvider = TanstackQueryClientProvider;
