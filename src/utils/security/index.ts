
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
import * as audit from './securityAuditor';

// Re-export with namespaces to avoid duplication and collisions
export const sanitize = sanitation;
export const authentication = auth;
export const storage = store;
export const validation = validate;
export const encryption = encrypt;
export const securityAudit = audit;

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
  validatePasswordStrength,
  encryptData,
  decryptData
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
  encryptDataWithMetadata,
  decryptDataWithMetadata
} = encrypt;

// Export security audit utilities - make sure these are exported
export const {
  SecurityAuditor,
  auditSecurity,
  auditUserInput
} = audit;
