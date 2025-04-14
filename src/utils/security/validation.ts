
/**
 * Security utilities for input validation with enhanced type safety
 */

/**
 * Valid URL protocols that are considered safe
 */
export type SafeProtocol = 'https:' | 'http:' | 'mailto:' | 'tel:';

/**
 * Options for URL validation with stricter types
 */
export interface UrlValidationOptions {
  /** Domains that are allowed in the URL */
  allowedDomains?: string[];
  /** Whether to allow relative URLs without domain */
  allowRelative?: boolean;
  /** Whether to allow data URLs (use with caution) */
  allowDataUrls?: boolean;
  /** Protocols that are allowed in the URL */
  allowedProtocols?: SafeProtocol[];
}

/**
 * File validation options with better type constraints
 */
export interface FileValidationOptions {
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Whether to perform deeper content scanning */
  scanContent?: boolean;
  /** Allowed MIME types or extensions */
  allowedTypes: string[];
}

/**
 * Result of a file validation operation
 */
export interface FileValidationResult {
  valid: boolean;
  message: string | null;
}

/**
 * Validate path to prevent path traversal with enhanced security
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
    !normalizedPath.match(/^\\\\/) && // UNC paths
    !normalizedPath.includes('\0') // Null bytes
  );
};

/**
 * Enhanced URL validation to prevent open redirect vulnerabilities
 * 
 * @param url - URL to validate
 * @param options - Validation options
 * @returns Boolean indicating if URL is safe
 */
export const validateUrl = (url: string, options: UrlValidationOptions = {}): boolean => {
  if (!url) return false;
  
  const {
    allowedDomains = ['wealthhorizon.com', 'api.wealthhorizon.com', 'cdn.wealthhorizon.com'],
    allowRelative = true,
    allowDataUrls = false,
    allowedProtocols = ['https:', 'http:'] as SafeProtocol[]
  } = options;
  
  // Trim the URL to prevent bypass with whitespace
  const trimmedUrl = url.trim();
  
  // Allow relative URLs if specified
  if (allowRelative && trimmedUrl.startsWith('/') && !trimmedUrl.startsWith('//')) {
    return true;
  }
  
  // Check data URLs if allowed
  if (trimmedUrl.startsWith('data:')) {
    return allowDataUrls;
  }
  
  try {
    const urlObj = new URL(trimmedUrl, window.location.origin);
    
    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol as SafeProtocol)) {
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
 * Enhanced file content type validation with improved typing
 * 
 * @param file - File to validate
 * @param options - Validation options
 * @returns Promise resolving to validation result
 */
export const validateFileContentType = (
  file: File, 
  options: FileValidationOptions
): Promise<FileValidationResult> => {
  const { allowedTypes, maxSizeMB = 10, scanContent = false } = options;
  
  // Check file size if specified
  if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
    return Promise.resolve({ 
      valid: false, 
      message: `File size exceeds the maximum allowed size of ${maxSizeMB}MB`
    });
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return Promise.resolve({ 
      valid: false, 
      message: `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    });
  }
  
  // Basic validation passed, but we can do deeper scanning if required
  if (scanContent && file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For images, try to load them to verify they're valid
        const img = new Image();
        img.onload = () => resolve({ valid: true, message: null });
        img.onerror = () => resolve({ 
          valid: false, 
          message: 'Image file appears to be corrupted or invalid'
        });
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve({ 
        valid: false, 
        message: 'Failed to read file content'
      });
      reader.readAsDataURL(file);
    });
  }
  
  return Promise.resolve({ valid: true, message: null });
};

/**
 * Check for vulnerable patterns in user input with improved detection
 * 
 * @param input - String to check for injection patterns
 * @returns Boolean indicating if input contains dangerous patterns
 */
export const containsInjectionPatterns = (input: string): boolean => {
  if (!input) return false;
  
  const dangerousPatterns = [
    /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i, // Script injection
    /(document\.|window\.|eval\(|setTimeout\(|setInterval\()/i, // JavaScript execution
    /(alert\(|confirm\(|prompt\(|console\.)/i, // Browser dialogs
    /<iframe|<object|<embed|<img[^>]+src=["']?data:/i, // Dangerous HTML elements
    /[<>'"=].*=[<>'"=]|data:/i, // Attribute injection
    /\s+style\s*=\s*["']?\s*\w+\s*:\s*url/i, // CSS injection
    /url\(\s*["']?\s*data:/i, // CSS URL injection
    /--.*?=/i, // SQL injection attempt
    /\b(union|select|from|where|group by|order by|having)\b.*\b(union|select|from|where|group by|order by|having)\b/i // SQL keywords
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};
