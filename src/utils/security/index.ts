
/**
 * Central export point for all security utilities
 */

// Re-export all functions from security modules
export * from './sanitization';
export * from './authentication';
export * from './storage';

/**
 * Enhanced URL validation to prevent open redirect vulnerabilities
 * 
 * @param url - URL to validate
 * @param options - Validation options
 * @returns Boolean indicating if URL is valid
 */
export const validateUrl = (url: string, options: {
  allowedDomains?: string[],
  allowRelative?: boolean,
  allowDataUrls?: boolean,
  allowedProtocols?: string[]
} = {}): boolean => {
  if (!url) return false;
  
  const {
    allowedDomains = ['wealthhorizon.com', 'api.wealthhorizon.com', 'cdn.wealthhorizon.com'],
    allowRelative = true,
    allowDataUrls = false,
    allowedProtocols = ['https:', 'http:']
  } = options;
  
  // Allow relative URLs if specified
  if (allowRelative && url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  // Check data URLs if allowed
  if (url.startsWith('data:') && !allowDataUrls) {
    return false;
  }
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // Check domain
    return allowedDomains.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false; // Invalid URL
  }
};
