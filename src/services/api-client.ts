
import { QueryClient } from "@tanstack/react-query";

// Initialize React Query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const API_BASE_URL = "/api";

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      // In a real implementation, this would be a fetch call to your API
      // For now we'll simulate a response
      console.log(`GET request to ${API_BASE_URL}${endpoint}`);
      return {} as T;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      console.log(`POST request to ${API_BASE_URL}${endpoint}`, data);
      return {} as T;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      console.log(`PUT request to ${API_BASE_URL}${endpoint}`, data);
      return {} as T;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      console.log(`DELETE request to ${API_BASE_URL}${endpoint}`);
      return {} as T;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  },
  
  // Method to invalidate cached data
  invalidateQueries: (queryKey: string | string[]) => {
    const key = Array.isArray(queryKey) ? queryKey : [queryKey];
    queryClient.invalidateQueries({ queryKey: key });
  },
  
  // Method to prefetch data
  prefetchQuery: async <T>(
    queryKey: string | string[],
    endpoint: string
  ): Promise<void> => {
    const key = Array.isArray(queryKey) ? queryKey : [queryKey];
    await queryClient.prefetchQuery({
      queryKey: key,
      queryFn: () => apiClient.get<T>(endpoint),
    });
  },
};
