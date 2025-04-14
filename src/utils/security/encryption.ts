
/**
 * Security utilities for encryption and decryption
 * 
 * Note: The main implementations of encryptData and decryptData 
 * are in authentication.ts. This file exists for organization purposes
 * and potential future expansion of encryption features.
 */

// Export a reference to the location of the actual implementation
// We don't redefine the functions here to avoid duplicates
export * from './authentication';

