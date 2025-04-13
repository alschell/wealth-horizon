
// Initialize React Query client - but don't export it directly
// It should only be used within React components
import { validateCorsHeaders, validateNoSniff, isSuccessResponse, validateHttpResponse } from '@/utils/http-validation';

const API_BASE_URL = "/api";

interface ApiError extends Error {
  status?: number;
  data?: any;
  endpoint?: string;
  timestamp?: string;
}

// Enhanced cache implementation with TTL and cache invalidation strategies
const cache = new Map<string, { data: any, timestamp: number, etag?: string }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_STALE_WHILE_REVALIDATE = 30 * 60 * 1000; // 30 minutes in milliseconds

// Track cache tags for more granular cache invalidation
const cacheTagsMap = new Map<string, Set<string>>();

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
const handleResponse = async <T>(response: Response, endpoint: string): Promise<T> => {
  // Comprehensive validation of HTTP responses
  const validation = validateHttpResponse(response, {
    requireNoSniff: true,
    requireCors: true
  });
  
  if (!validation.valid) {
    console.warn(`HTTP validation issues for ${endpoint}:`, validation.issues.join(', '));
  }
  
  if (!isSuccessResponse(response)) {
    const error: ApiError = new Error(`API error: ${response.status}`);
    error.status = response.status;
    error.endpoint = endpoint;
    error.timestamp = new Date().toISOString();
    
    try {
      error.data = await response.json();
    } catch (e) {
      error.data = 'Unable to parse error response';
    }
    
    // Log structured error information for debugging
    console.error(`API Error [${response.status}]:`, {
      endpoint,
      statusText: response.statusText,
      errorData: error.data,
      timestamp: error.timestamp,
      validationIssues: validation.issues
    });
    
    throw error;
  }
  
  // Store ETag for conditional requests if available
  const etag = response.headers.get('ETag');
  
  // For non-JSON responses or empty responses
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return {} as T;
  }
  
  // Check content type to determine how to parse the response
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    return { data, etag } as T;
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

// Check if the cached data is stale but still usable
const isCacheStale = (cacheKey: string): boolean => {
  const cachedItem = cache.get(cacheKey);
  if (!cachedItem) return false;
  
  const now = Date.now();
  const age = now - cachedItem.timestamp;
  return age >= CACHE_TTL && age < CACHE_STALE_WHILE_REVALIDATE;
};

// Associate a cache key with tags for invalidation
const tagCacheItem = (cacheKey: string, tags: string[] = []): void => {
  tags.forEach(tag => {
    if (!cacheTagsMap.has(tag)) {
      cacheTagsMap.set(tag, new Set());
    }
    cacheTagsMap.get(tag)?.add(cacheKey);
  });
};

// Generic API client with type safety
export const apiClient = {
  get: async <T>(endpoint: string, options: {
    skipCache?: boolean,
    cacheTags?: string[],
    signal?: AbortSignal,
    headers?: HeadersInit
  } = {}): Promise<T> => {
    const { skipCache = false, cacheTags = [], signal, headers = {} } = options;
    
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      const cacheKey = url;
      
      // Check cache first if not explicitly skipped
      if (!skipCache) {
        // If cache is valid, use it
        if (isCacheValid(cacheKey)) {
          return cache.get(cacheKey)!.data as T;
        }
        
        // If cache is stale but still usable, use it and fetch in background
        if (isCacheStale(cacheKey)) {
          const staleData = cache.get(cacheKey)!.data as T;
          
          // Background fetch to update cache
          setTimeout(() => {
            apiClient.get<T>(endpoint, { skipCache: true, cacheTags });
          }, 0);
          
          return staleData;
        }
      }
      
      // Prepare for conditional request if we have an ETag
      const cachedItem = cache.get(cacheKey);
      const conditionalHeaders: HeadersInit = { ...createHeaders(), ...headers };
      
      if (cachedItem?.etag) {
        conditionalHeaders['If-None-Match'] = cachedItem.etag;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: conditionalHeaders,
        credentials: 'same-origin',
        signal
      });
      
      // Handle 304 Not Modified
      if (response.status === 304 && cachedItem) {
        cachedItem.timestamp = Date.now(); // Refresh timestamp
        return cachedItem.data as T;
      }
      
      const { data, etag } = await handleResponse<any>(response, endpoint);
      
      // Cache the successful response
      if (!skipCache) {
        cache.set(cacheKey, { data, timestamp: Date.now(), etag });
        tagCacheItem(cacheKey, cacheTags);
      }
      
      return data as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log(`Request to ${endpoint} was aborted`);
      } else {
        console.error(`API GET error for ${endpoint}:`, error);
      }
      throw error;
    }
  },
  
  post: async <T>(endpoint: string, data: any, options: {
    signal?: AbortSignal,
    headers?: HeadersInit,
    invalidateTags?: string[]
  } = {}): Promise<T> => {
    const { signal, headers = {}, invalidateTags = [] } = options;
    
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      const sanitizedData = sanitizeRequestData(data);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { ...createHeaders(), ...headers },
        credentials: 'same-origin',
        body: JSON.stringify(sanitizedData),
        signal
      });
      
      const result = await handleResponse<T>(response, endpoint);
      
      // Invalidate relevant cache entries
      if (invalidateTags.length > 0) {
        apiClient.invalidateTags(invalidateTags);
      }
      
      return result;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log(`Request to ${endpoint} was aborted`);
      } else {
        console.error(`API POST error for ${endpoint}:`, error);
      }
      throw error;
    }
  },
  
  put: async <T>(endpoint: string, data: any, options: {
    signal?: AbortSignal,
    headers?: HeadersInit,
    invalidateTags?: string[]
  } = {}): Promise<T> => {
    const { signal, headers = {}, invalidateTags = [] } = options;
    
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      const sanitizedData = sanitizeRequestData(data);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { ...createHeaders(), ...headers },
        credentials: 'same-origin',
        body: JSON.stringify(sanitizedData),
        signal
      });
      
      const result = await handleResponse<T>(response, endpoint);
      
      // Invalidate relevant cache entries
      if (invalidateTags.length > 0) {
        apiClient.invalidateTags(invalidateTags);
      }
      
      return result;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log(`Request to ${endpoint} was aborted`);
      } else {
        console.error(`API PUT error for ${endpoint}:`, error);
      }
      throw error;
    }
  },
  
  delete: async <T>(endpoint: string, options: {
    signal?: AbortSignal,
    headers?: HeadersInit,
    invalidateTags?: string[]
  } = {}): Promise<T> => {
    const { signal, headers = {}, invalidateTags = [] } = options;
    
    try {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { ...createHeaders(), ...headers },
        credentials: 'same-origin',
        signal
      });
      
      const result = await handleResponse<T>(response, endpoint);
      
      // Invalidate relevant cache entries
      if (invalidateTags.length > 0) {
        apiClient.invalidateTags(invalidateTags);
      }
      
      return result;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log(`Request to ${endpoint} was aborted`);
      } else {
        console.error(`API DELETE error for ${endpoint}:`, error);
      }
      throw error;
    }
  },
  
  uploadFile: async <T>(
    endpoint: string, 
    file: File, 
    options: {
      additionalData?: Record<string, any>,
      onProgress?: (progress: number) => void,
      signal?: AbortSignal,
      invalidateTags?: string[]
    } = {}
  ): Promise<T> => {
    const { additionalData, onProgress, signal, invalidateTags = [] } = options;
    
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
      
      // Use XMLHttpRequest for progress monitoring
      if (onProgress) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          
          xhr.open('POST', url, true);
          
          // Add headers
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          const csrfToken = getCsrfToken();
          if (csrfToken) {
            xhr.setRequestHeader('X-CSRF-Token', csrfToken);
          }
          
          // Set up progress handler
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              onProgress(percentComplete);
            }
          };
          
          // Set up completion handlers
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                
                // Invalidate relevant cache entries
                if (invalidateTags.length > 0) {
                  apiClient.invalidateTags(invalidateTags);
                }
                
                resolve(response as T);
              } catch (e) {
                reject(new Error('Invalid JSON response'));
              }
            } else {
              const error: ApiError = new Error(`Upload failed: ${xhr.status}`);
              error.status = xhr.status;
              error.endpoint = endpoint;
              
              try {
                error.data = JSON.parse(xhr.responseText);
              } catch {
                error.data = xhr.responseText || 'Unknown error';
              }
              
              reject(error);
            }
          };
          
          xhr.onerror = function() {
            reject(new Error('Network error during upload'));
          };
          
          xhr.onabort = function() {
            reject(new Error('Upload aborted'));
          };
          
          // Send the request
          xhr.send(formData);
          
          // Attach abort signal if provided
          if (signal) {
            signal.onabort = () => xhr.abort();
          }
        });
      }
      
      // Fallback to fetch for simple uploads without progress
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': getCsrfToken()
        },
        credentials: 'same-origin',
        body: formData,
        signal
      });
      
      const result = await handleResponse<T>(response, endpoint);
      
      // Invalidate relevant cache entries
      if (invalidateTags.length > 0) {
        apiClient.invalidateTags(invalidateTags);
      }
      
      return result;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log(`Upload to ${endpoint} was aborted`);
      } else {
        console.error(`API file upload error for ${endpoint}:`, error);
      }
      throw error;
    }
  },
  
  // Improved cache management functions
  
  // Clear the cache for specific endpoints or all cached data
  clearCache: (endpoint?: string) => {
    if (endpoint) {
      const sanitizedEndpoint = sanitizeEndpoint(endpoint);
      const url = `${API_BASE_URL}${sanitizedEndpoint}`;
      cache.delete(url);
    } else {
      cache.clear();
      cacheTagsMap.clear();
    }
  },
  
  // Invalidate cache entries by tags
  invalidateTags: (tags: string[]) => {
    tags.forEach(tag => {
      const cacheKeys = cacheTagsMap.get(tag);
      if (cacheKeys) {
        cacheKeys.forEach(key => {
          cache.delete(key);
        });
        cacheTagsMap.delete(tag);
      }
    });
  },
  
  // Prefetch and cache data
  prefetch: async <T>(endpoint: string, cacheTags: string[] = []): Promise<void> => {
    try {
      await apiClient.get<T>(endpoint, { cacheTags });
      console.log(`Prefetched: ${endpoint}`);
    } catch (error) {
      console.error(`Prefetch error for ${endpoint}:`, error);
    }
  }
};
