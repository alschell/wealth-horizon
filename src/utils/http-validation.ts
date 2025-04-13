
/**
 * Utilities for HTTP response validation and security checks
 */

// Validate CORS headers for cross-origin requests
export const validateCorsHeaders = (response: Response): boolean => {
  try {
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
  } catch (error) {
    console.error('Error validating CORS headers:', error);
    return false;
  }
};

// Validate X-Content-Type-Options to prevent MIME type sniffing
export const validateNoSniff = (response: Response): boolean => {
  try {
    const contentTypeOptions = response.headers.get('X-Content-Type-Options');
    return contentTypeOptions === 'nosniff';
  } catch (error) {
    console.error('Error validating X-Content-Type-Options header:', error);
    return false;
  }
};

// Check if response is a success (2xx status code)
export const isSuccessResponse = (response: Response): boolean => {
  try {
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Error checking response status:', error);
    return false;
  }
};

// Validate Content-Security-Policy headers
export const validateCSP = (response: Response): boolean => {
  try {
    return !!response.headers.get('Content-Security-Policy');
  } catch (error) {
    console.error('Error validating CSP header:', error);
    return false;
  }
};

// Validate that sensitive responses use HTTPS
export const validateSecureConnection = (url: string): boolean => {
  try {
    return url.startsWith('https://') || url.startsWith('/') || window.location.protocol === 'https:';
  } catch (error) {
    console.error('Error validating secure connection:', error);
    return false;
  }
};

// Validate Cache-Control headers for sensitive data
export const validateCacheControl = (response: Response, sensitiveData: boolean = false): boolean => {
  try {
    if (!sensitiveData) return true;
    
    const cacheControl = response.headers.get('Cache-Control');
    if (!cacheControl) return false;
    
    // For sensitive data, we want no-store and private
    return cacheControl.includes('no-store') && cacheControl.includes('private');
  } catch (error) {
    console.error('Error validating Cache-Control header:', error);
    return false;
  }
};

// Validate response integrity if using SRI
export const validateIntegrity = (response: Response, expectedHash?: string): boolean => {
  try {
    if (!expectedHash) return true;
    
    // This is simplified - real SRI would require computing the hash of the response body
    // and comparing it to the expectedHash
    return true;
  } catch (error) {
    console.error('Error validating response integrity:', error);
    return false;
  }
};

// Comprehensive validation of HTTP responses
export const validateHttpResponse = (
  response: Response, 
  options?: {
    requireCors?: boolean,
    requireNoSniff?: boolean,
    requireCsp?: boolean,
    sensitiveData?: boolean
  }
): { valid: boolean, issues: string[] } => {
  const issues: string[] = [];
  
  try {
    // Default all validations to false unless explicitly provided
    const {
      requireCors = false,
      requireNoSniff = true,
      requireCsp = false,
      sensitiveData = false
    } = options || {};
    
    // Check for success response
    if (!isSuccessResponse(response)) {
      issues.push(`HTTP error status: ${response.status}`);
    }
    
    // Check for CORS headers if needed
    if (requireCors && !validateCorsHeaders(response)) {
      issues.push('Missing or invalid CORS headers');
    }
    
    // Check for X-Content-Type-Options: nosniff
    if (requireNoSniff && !validateNoSniff(response)) {
      issues.push('Missing X-Content-Type-Options: nosniff header');
    }
    
    // Check for Content-Security-Policy header
    if (requireCsp && !validateCSP(response)) {
      issues.push('Missing Content-Security-Policy header');
    }
    
    // Check cache control for sensitive data
    if (sensitiveData && !validateCacheControl(response, true)) {
      issues.push('Insufficient cache control for sensitive data');
    }
    
    return {
      valid: issues.length === 0,
      issues
    };
  } catch (error) {
    console.error('Error during HTTP response validation:', error);
    issues.push('Unexpected error during validation');
    return { valid: false, issues };
  }
};
