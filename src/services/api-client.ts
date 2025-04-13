
// Initialize React Query client - but don't export it directly
// It should only be used within React components
const API_BASE_URL = "/api";

interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      // In a real implementation, this would be a fetch call to your API
      // For now we'll simulate a response
      console.log(`GET request to ${API_BASE_URL}${endpoint}`);
      
      // Prevent path traversal attacks
      if (endpoint.includes('..') || !endpoint.startsWith('/')) {
        throw new Error('Invalid endpoint path');
      }
      
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("API error:", apiError);
      throw apiError;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      // Prevent path traversal attacks
      if (endpoint.includes('..') || !endpoint.startsWith('/')) {
        throw new Error('Invalid endpoint path');
      }
      
      console.log(`POST request to ${API_BASE_URL}${endpoint}`, data);
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("API error:", apiError);
      throw apiError;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      // Prevent path traversal attacks
      if (endpoint.includes('..') || !endpoint.startsWith('/')) {
        throw new Error('Invalid endpoint path');
      }
      
      console.log(`PUT request to ${API_BASE_URL}${endpoint}`, data);
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("API error:", apiError);
      throw apiError;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      // Prevent path traversal attacks
      if (endpoint.includes('..') || !endpoint.startsWith('/')) {
        throw new Error('Invalid endpoint path');
      }
      
      console.log(`DELETE request to ${API_BASE_URL}${endpoint}`);
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      console.error("API error:", apiError);
      throw apiError;
    }
  }
};
