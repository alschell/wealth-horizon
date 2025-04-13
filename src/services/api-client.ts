
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
  
  // Try to get from cookie
  const match = document.cookie.match(/csrf-token=([^;]+)/);
  if (match) {
    return match[1];
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

// Helper to handle API response
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ApiError = new Error(`API error: ${response.status}`);
    error.status = response.status;
    
    try {
      error.data = await response.json();
    } catch (e) {
      error.data = 'Unable to parse error response';
    }
    
    throw error;
  }
  
  // For non-JSON responses or empty responses
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return {} as T;
  }
  
  // Check content type to determine how to parse the response
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return {} as T;
};

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
        credentials: 'same-origin'
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: createHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: createHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: createHeaders(),
        credentials: 'same-origin'
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  },
  
  uploadFile: async <T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const formData = new FormData();
      formData.append('file', file);
      
      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': getCsrfToken()
        },
        credentials: 'same-origin',
        body: formData
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  }
};
