
/**
 * Security utilities for input validation
 */

/**
 * Validate path to prevent path traversal
 * 
 * @param path - Path to validate
 * @returns Boolean indicating if path is safe
 */
export const validatePath = (path: string): boolean => {
  if (!path) return false;
  
  // Normalize path to handle different path separators
  const normalizedPath = path.replace(/\\/g, '/');
  
  // More comprehensive path validation
  return (
    !normalizedPath.includes('../') && 
    !normalizedPath.includes('..\\') && 
    !normalizedPath.includes('//') &&
    !normalizedPath.startsWith('/') &&
    !normalizedPath.includes(':\\') &&
    !normalizedPath.match(/^[a-zA-Z]:\//) &&
    !normalizedPath.match(/^\\\\/) // UNC paths
  );
};

/**
 * Enhanced URL validation to prevent open redirect vulnerabilities
 * 
 * @param url - URL to validate
 * @param options - Validation options
 * @returns Boolean indicating if URL is safe
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

/**
 * Enhanced file content type validation
 * 
 * @param file - File to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param scanContent - Whether to scan content for deeper validation
 * @returns Promise resolving to boolean indicating if file is valid
 */
export const validateFileContentType = (
  file: File, 
  allowedTypes: string[],
  scanContent: boolean = false
): Promise<boolean> => {
  if (!allowedTypes.includes(file.type)) {
    return Promise.resolve(false);
  }
  
  // Basic validation passed, but we can do deeper scanning if required
  if (scanContent && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For images, try to load them to verify they're valid
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(false);
      reader.readAsDataURL(file);
    });
  }
  
  return Promise.resolve(true);
};

/**
 * Check for vulnerable patterns in user input
 * 
 * @param input - String to check for injection patterns
 * @returns Boolean indicating if input contains dangerous patterns
 */
export const containsInjectionPatterns = (input: string): boolean => {
  if (!input) return false;
  
  const dangerousPatterns = [
    /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
    /(document\.|window\.|eval\(|setTimeout\(|setInterval\()/i,
    /(alert\(|confirm\(|prompt\(|console\.)/i,
    /<iframe|<object|<embed|<img[^>]+src=["']?data:/i,
    /[<>'"=].*=[<>'"=]|data:/i,
    /\s+style\s*=\s*["']?\s*\w+\s*:\s*url/i,
    /url\(\s*["']?\s*data:/i
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};

