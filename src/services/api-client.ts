
// Initialize React Query client - but don't export it directly
// It should only be used within React components
const API_BASE_URL = "/api";

interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Add CSRF token handling
const getCsrfToken = (): string => {
  // Get token from meta tag or cookie
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute('content') || '';
  }
  return '';
};

// Create default headers with security measures
const createHeaders = (contentType = 'application/json'): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': contentType,
    'X-Requested-With': 'XMLHttpRequest', // Helps protect against CSRF
  };
  
  // Add CSRF token if available
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken;
  }
  
  return headers;
};

// Sanitize URL path to prevent path traversal
const sanitizeEndpoint = (endpoint: string): string => {
  // Ensure endpoint starts with / and contains no ../ sequences
  if (!endpoint.startsWith('/') || endpoint.includes('..')) {
    throw new Error('Invalid endpoint path');
  }
  return endpoint;
};

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      
      // In a real implementation, this would include the fetch call
      // For now we'll simulate a response
      
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      
      // In a real implementation, this would include the fetch call with:
      // headers: createHeaders(),
      // body: JSON.stringify(data),
      
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      
      // In a real implementation, this would include the fetch call with:
      // headers: createHeaders(),
      // body: JSON.stringify(data),
      
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      
      // In a real implementation, this would include the fetch call
      
      return {} as T;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  }
};
