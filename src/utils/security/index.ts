
/**
 * Central export point for all security utilities
 * 
 * This file provides a clean API for consuming security utilities
 * throughout the application, with proper namespacing to avoid
 * naming conflicts.
 */

// Import all modules
import * as sanitation from './sanitization';
import * as auth from './authentication';
import * as store from './storage';
import * as validate from './validation';
import * as encrypt from './encryption';

// Re-export with namespaces to avoid duplication and collisions
export const sanitize = sanitation;
export const authentication = auth;
export const storage = store;
export const validation = validate;
export const encryption = encrypt;

// Direct exports for commonly used functions to maintain backward compatibility
export const {
  sanitizeHtml,
  sanitizeFileName,
  obfuscateData,
  sanitizeHtmlAttribute,
  sanitizeSqlInput
} = sanitation;

export const {
  generateSecureToken,
  generateCsrfToken,
  generateCspNonce,
  validatePasswordStrength
} = auth;

export const {
  secureStore,
  storeCsrfToken,
  getCsrfToken
} = store;

export const {
  validatePath,
  validateUrl,
  validateFileContentType,
  containsInjectionPatterns
} = validate;

export const {
  encryptData,
  decryptData,
  encryptDataWithMetadata,
  decryptDataWithMetadata
} = encrypt;
