
// Initialize React Query client - but don't export it directly
// It should only be used within React components
const API_BASE_URL = "/api";

interface ApiError extends Error {
  status?: number;
  data?: any;
}

// Simple in-memory cache implementation
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

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

// Validate and sanitize API request data
const sanitizeRequestData = (data: any): any => {
  if (!data) return data;
  
  // If data is a string, sanitize it
  if (typeof data === 'string') {
    // Replace potentially dangerous characters
    return data.replace(/[<>]/g, '');
  }
  
  // If data is an array, sanitize each element
  if (Array.isArray(data)) {
    return data.map(item => sanitizeRequestData(item));
  }
  
  // If data is an object, sanitize each property
  if (typeof data === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeRequestData(value);
    }
    return sanitized;
  }
  
  return data;
};

// Sanitize URL path to prevent path traversal
const sanitizeEndpoint = (endpoint: string): string => {
  // Ensure endpoint starts with / and contains no ../ sequences
  if (!endpoint.startsWith('/')) {
    endpoint = '/' + endpoint;
  }
  
  if (endpoint.includes('..')) {
    throw new Error('Invalid endpoint path: Path traversal attempt detected');
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
    
    // Log structured error information for debugging
    console.error(`API Error [${response.status}]:`, {
      endpoint: response.url,
      statusText: response.statusText,
      errorData: error.data
    });
    
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

// Check if the cached data is still valid
const isCacheValid = (cacheKey: string): boolean => {
  const cachedItem = cache.get(cacheKey);
  if (!cachedItem) return false;
  
  const now = Date.now();
  return now - cachedItem.timestamp < CACHE_TTL;
};

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string, skipCache = false): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      // Check cache first if not explicitly skipped
      if (!skipCache) {
        const cacheKey = url;
        if (isCacheValid(cacheKey)) {
          return cache.get(cacheKey)!.data as T;
        }
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: createHeaders(),
        credentials: 'same-origin'
      });
      
      const data = await handleResponse<T>(response);
      
      // Cache the successful response
      if (!skipCache) {
        cache.set(url, { data, timestamp: Date.now() });
      }
      
      return data;
    } catch (error) {
      console.error(`API GET error for ${endpoint}:`, error);
      throw error;
    }
  },
  
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      const sanitizedData = sanitizeRequestData(data);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: createHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify(sanitizedData)
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`API POST error for ${endpoint}:`, error);
      throw error;
    }
  },
  
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      const sanitizedData = sanitizeRequestData(data);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: createHeaders(),
        credentials: 'same-origin',
        body: JSON.stringify(sanitizedData)
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      console.error(`API PUT error for ${endpoint}:`, error);
      throw error;
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
      console.error(`API DELETE error for ${endpoint}:`, error);
      throw error;
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
      console.error(`API file upload error for ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Clear the cache for specific endpoints or all cached data
  clearCache: (endpoint?: string) => {
    if (endpoint) {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      cache.delete(url);
    } else {
      cache.clear();
    }
  }
};
