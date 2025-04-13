
/**
 * Utilities for HTTP response validation and security checks
 */

// Validate CORS headers for cross-origin requests
export const validateCorsHeaders = (response: Response): boolean => {
  // Check if response has appropriate CORS headers when needed
  // This is especially important for cross-origin requests
  const corsHeadersNeeded = window.location.origin !== new URL(response.url).origin;
  
  if (!corsHeadersNeeded) {
    return true; // No need to check CORS headers for same-origin requests
  }
  
  const accessControlAllowOrigin = response.headers.get('Access-Control-Allow-Origin');
  const accessControlAllowMethods = response.headers.get('Access-Control-Allow-Methods');
  
  // Check for the minimal set of CORS headers
  return !!accessControlAllowOrigin && 
    (accessControlAllowOrigin === '*' || accessControlAllowOrigin.includes(window.location.origin));
};

// Validate X-Content-Type-Options to prevent MIME type sniffing
export const validateNoSniff = (response: Response): boolean => {
  const contentTypeOptions = response.headers.get('X-Content-Type-Options');
  return contentTypeOptions === 'nosniff';
};

// Check if response is a success (2xx status code)
export const isSuccessResponse = (response: Response): boolean => {
  return response.status >= 200 && response.status < 300;
};

// Validate Content-Security-Policy headers
export const validateCSP = (response: Response): boolean => {
  return !!response.headers.get('Content-Security-Policy');
};

// Validate that sensitive responses use HTTPS
export const validateSecureConnection = (url: string): boolean => {
  return url.startsWith('https://') || url.startsWith('/') || window.location.protocol === 'https:';
};
