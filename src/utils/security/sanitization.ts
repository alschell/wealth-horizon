
/**
 * Security utilities for sanitizing user input
 * 
 * These utilities help prevent XSS attacks, HTML injection, and other
 * security vulnerabilities related to user input.
 */

/**
 * Type of sensitive data for specialized obfuscation
 */
export type SensitiveDataType = 'email' | 'phone' | 'creditCard' | 'ssn' | 'custom';

/**
 * Options for HTML sanitization
 */
export interface SanitizeHtmlOptions {
  /** Allow specific HTML tags (all others will be removed) */
  allowedTags?: string[];
  /** Strip all HTML (convert to plain text) */
  stripAllTags?: boolean;
  /** Whether to encode all entities */
  encodeEntities?: boolean;
  /** Remove all URLs starting with these protocols */
  stripProtocols?: string[];
}

/**
 * Sanitize strings to prevent XSS attacks with enhanced options
 * 
 * @param unsafeString - String to sanitize
 * @param options - Sanitization options
 * @returns Sanitized string safe for rendering
 */
export const sanitizeHtml = (
  unsafeString: string, 
  options: SanitizeHtmlOptions = {}
): string => {
  if (!unsafeString) return '';
  
  const {
    stripAllTags = true,
    encodeEntities = true,
    stripProtocols = ['javascript:', 'data:', 'vbscript:']
  } = options;
  
  let result = unsafeString;
  
  // Convert HTML entities if requested
  if (encodeEntities) {
    result = result
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Strip dangerous protocols
  stripProtocols.forEach(protocol => {
    const protocolRegex = new RegExp(protocol, 'gi');
    result = result.replace(protocolRegex, 'removed:');
  });
  
  // Remove event handlers
  result = result.replace(/on\w+=/gi, 'data-removed=');
  
  // If stripping all tags, remove anything that looks like a tag
  if (stripAllTags) {
    // This regex matches HTML tags and replaces them with nothing
    result = result.replace(/<[^>]*>/g, '');
  }
  
  return result;
};

/**
 * More secure file name sanitization with enhanced protection
 * 
 * @param fileName - File name to sanitize
 * @returns Sanitized file name safe for storage
 */
export const sanitizeFileName = (fileName: string): string => {
  try {
    if (!fileName) return 'unnamed_file';
    
    // More comprehensive sanitization to prevent path traversal and shell injection
    const sanitized = fileName
      .replace(/[^\w\s.-]/g, '') // Remove special characters
      .replace(/\.{2,}/g, '.') // Prevent path traversal via multiple dots
      .replace(/^\.+|\.+$/g, '') // Remove leading/trailing dots
      .replace(/^\/+|\\+/g, '') // Remove leading slashes or backslashes
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, 'invalid_$1') // Prevent reserved Windows filenames
      .replace(/[<>:"\/\\|?*\x00-\x1F]/g, '') // Remove characters not allowed in filenames
      .trim();
    
    // Limit length to prevent DoS
    const maxLength = 255;
    const truncated = sanitized.length > maxLength ? sanitized.substring(0, maxLength) : sanitized;
    
    // Ensure the filename isn't empty after sanitization
    return truncated || 'unnamed_file_' + Date.now(); // Fallback with timestamp
  } catch (error) {
    console.error("Error sanitizing filename:", error);
    return 'unnamed_file_' + Date.now(); // Fallback with timestamp
  }
};

/**
 * Obfuscate sensitive data for logging or display
 * 
 * @param data - Sensitive data to obfuscate
 * @param type - Type of data for specific obfuscation patterns
 * @param customPattern - Custom regex pattern for obfuscation
 * @returns Obfuscated string
 */
export const obfuscateData = (
  data: string,
  type: SensitiveDataType = 'custom',
  customPattern?: RegExp
): string => {
  if (!data) return '';
  
  switch (type) {
    case 'email': {
      const [username, domain] = data.split('@');
      if (!domain) return '***@***';
      return `${username.charAt(0)}${'*'.repeat(username.length > 1 ? username.length - 1 : 1)}@${domain}`;
    }
    case 'phone':
      return data.replace(/(\d{1,3})(\d{3,})(\d{2,4})/, (_, a, b, c) => 
        `${a}${'*'.repeat(b.length)}${c}`
      );
    case 'creditCard':
      return data.replace(/(\d{4})(\d{8,})(\d{4})/, (_, a, b, c) => 
        `${a}${'*'.repeat(b.length)}${c}`
      );
    case 'ssn':
      return data.replace(/(\d{3})(\d{2})(\d{4})/, (_, a, b, c) => 
        `${a}-${b}-${'*'.repeat(4)}`
      );
    case 'custom':
      if (customPattern) {
        return data.replace(customPattern, '****');
      }
      // Default redaction for custom - hide middle portion
      const length = data.length;
      const visibleChars = Math.max(Math.floor(length * 0.25), 1);
      return `${data.slice(0, visibleChars)}${'*'.repeat(length - 2 * visibleChars)}${data.slice(length - visibleChars)}`;
  }
};

/**
 * Sanitize HTML attributes to prevent injection attacks
 * 
 * @param attributeValue - Attribute value to sanitize
 * @returns Sanitized attribute value
 */
export const sanitizeHtmlAttribute = (attributeValue: string): string => {
  if (!attributeValue) return '';
  
  return attributeValue
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`/g, '&#x60;')
    .replace(/javascript:/gi, 'removed:')
    .replace(/data:/gi, 'removed:')
    .replace(/vbscript:/gi, 'removed:');
};

/**
 * Sanitize user input for use in SQL queries to prevent SQL injection
 * Note: This is a basic implementation - always use parameterized queries
 * 
 * @param input - User input to sanitize
 * @returns Sanitized input safe for SQL
 */
export const sanitizeSqlInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/'/g, "''") // Escape single quotes
    .replace(/\\/g, '\\\\') // Escape backslashes
    .replace(/\0/g, '') // Remove null bytes
    .replace(/\b(EXEC|EXECUTE|INSERT|DROP|ALTER|CREATE|SELECT|DELETE|UPDATE|UNION|JOIN)\b/gi, '') // Remove SQL keywords
    .replace(/--/g, '') // Remove SQL comments
    .replace(/;/g, ''); // Remove semicolons
};
