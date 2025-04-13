
/**
 * Utilities for HTTP response validation and security checks
 */

// Validate proper CORS headers
export const validateCorsHeaders = (response: Response): boolean => {
  // Check for CORS-specific headers
  const accessControlAllowOrigin = response.headers.get('Access-Control-Allow-Origin');
  
  // If the response is from the same origin, we don't need CORS headers
  if (isSameOrigin(response.url)) return true;
  
  // For cross-origin requests, verify proper CORS headers exist
  return !!accessControlAllowOrigin;
};

// Check if URL is from the same origin
export const isSameOrigin = (url: string): boolean => {
  try {
    const currentOrigin = window.location.origin;
    const targetOrigin = new URL(url, window.location.href).origin;
    return currentOrigin === targetOrigin;
  } catch (error) {
    console.error('Error checking URL origin:', error);
    return false;
  }
};

// Validate Content-Type header
export const validateContentType = (response: Response, expectedType: string): boolean => {
  const contentType = response.headers.get('Content-Type');
  if (!contentType) return false;
  
  return contentType.includes(expectedType);
};

// Validate response status codes
export const isSuccessResponse = (response: Response): boolean => {
  return response.status >= 200 && response.status < 300;
};

// Validate Content-Security-Policy headers
export const validateCSPHeaders = (response: Response): boolean => {
  const cspHeader = response.headers.get('Content-Security-Policy') || 
                    response.headers.get('Content-Security-Policy-Report-Only');
  
  // For the most critical endpoints, we might want to require CSP
  // For regular endpoints, this might be optional
  return !!cspHeader;
};

// Check if response has proper caching directives for sensitive data
export const validateCacheControl = (response: Response, shouldCache: boolean): boolean => {
  const cacheControl = response.headers.get('Cache-Control');
  
  if (!shouldCache) {
    // Sensitive endpoints should have cache prevention headers
    return cacheControl?.includes('no-store') || 
           cacheControl?.includes('no-cache') || 
           cacheControl?.includes('private') || 
           false;
  }
  
  // For cacheable endpoints, we don't need specific cache directives
  return true;
};

// Validate X-Content-Type-Options to prevent MIME type sniffing
export const validateNoSniff = (response: Response): boolean => {
  const xContentTypeOptions = response.headers.get('X-Content-Type-Options');
  return xContentTypeOptions === 'nosniff';
};

// Validate X-Frame-Options to prevent clickjacking
export const validateFrameOptions = (response: Response): boolean => {
  const xFrameOptions = response.headers.get('X-Frame-Options');
  return xFrameOptions === 'DENY' || xFrameOptions === 'SAMEORIGIN';
};

// Comprehensive security validation for sensitive endpoints
export const validateSecurityHeaders = (
  response: Response, 
  options: {
    requireCORS?: boolean;
    requireCSP?: boolean;
    requireNoCache?: boolean;
    requireNoSniff?: boolean;
    requireFrameOptions?: boolean;
  } = {}
): boolean => {
  const {
    requireCORS = true,
    requireCSP = false,
    requireNoCache = false,
    requireNoSniff = true,
    requireFrameOptions = true
  } = options;
  
  let isValid = true;
  
  // Only check CORS for cross-origin requests
  if (requireCORS && !isSameOrigin(response.url)) {
    isValid = isValid && validateCorsHeaders(response);
  }
  
  if (requireCSP) {
    isValid = isValid && validateCSPHeaders(response);
  }
  
  if (requireNoCache) {
    isValid = isValid && validateCacheControl(response, false);
  }
  
  if (requireNoSniff) {
    isValid = isValid && validateNoSniff(response);
  }
  
  if (requireFrameOptions) {
    isValid = isValid && validateFrameOptions(response);
  }
  
  return isValid;
};

// Validate JWT format (basic structural validation)
export const validateJwtFormat = (token: string): boolean => {
  // JWT should have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  // Each part should be a valid base64url string
  const base64UrlRegex = /^[A-Za-z0-9_-]+$/;
  return parts.every(part => base64UrlRegex.test(part));
};

// Detect response size anomalies
export const detectResponseSizeAnomaly = (
  response: Response, 
  expectedMinSize: number, 
  expectedMaxSize: number
): boolean => {
  const contentLength = parseInt(response.headers.get('Content-Length') || '0', 10);
  
  if (contentLength === 0) return true; // Skip check if no Content-Length header
  
  return contentLength >= expectedMinSize && contentLength <= expectedMaxSize;
};
