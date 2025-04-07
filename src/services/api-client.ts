
// Initialize React Query client - but don't export it directly
// It should only be used within React components
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
  }
};
