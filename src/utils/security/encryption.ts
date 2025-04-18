
/**
 * Security utilities for encryption and decryption
 * 
 * This module provides specialized encryption functionality that builds
 * upon the core encryption utilities defined in authentication.ts.
 * 
 * @module encryption
 */

// Import core encryption functionality from authentication
import { 
  encryptData as baseEncryptData,
  decryptData as baseDecryptData
} from './authentication';

/**
 * Encrypt sensitive data with additional metadata
 * 
 * @param data - String data to encrypt
 * @param encryptionKey - Key for encryption
 * @param metadata - Optional metadata to include with encrypted data
 * @returns Promise resolving to encrypted string with metadata
 */
export const encryptDataWithMetadata = async (
  data: string,
  encryptionKey: string,
  metadata?: Record<string, unknown>
): Promise<string> => {
  // If no metadata, use the base implementation
  if (!metadata) {
    return baseEncryptData(data, encryptionKey);
  }
  
  // Add metadata to payload
  const payload = JSON.stringify({
    data,
    metadata,
    timestamp: Date.now()
  });
  
  // Encrypt the combined payload
  return baseEncryptData(payload, encryptionKey);
};

/**
 * Decrypt data that may contain metadata
 * 
 * @param encryptedData - Encrypted data string
 * @param encryptionKey - Key for decryption
 * @returns Promise resolving to decrypted data and any metadata
 */
export const decryptDataWithMetadata = async (
  encryptedData: string,
  encryptionKey: string
): Promise<{ data: string; metadata?: Record<string, unknown>; timestamp?: number }> => {
  try {
    // Decrypt the data
    const decrypted = await baseDecryptData(encryptedData, encryptionKey);
    
    // Try to parse as JSON with metadata
    try {
      const parsed = JSON.parse(decrypted);
      
      // Check if it has the expected structure
      if (parsed && typeof parsed === 'object' && 'data' in parsed) {
        return parsed;
      }
    } catch (e) {
      // Not JSON, so it's just the data without metadata
    }
    
    // Return just the data if no metadata format detected
    return { data: decrypted };
  } catch (error) {
    console.error('Failed to decrypt data with metadata:', error);
    throw new Error('Decryption failed');
  }
};

// Re-export base encryption functions for backward compatibility
export { baseEncryptData as encryptData, baseDecryptData as decryptData };
