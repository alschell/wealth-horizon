
# Security Utilities Documentation

This directory contains comprehensive security utilities for protecting application data and preventing common web vulnerabilities.

## Overview

The security module is organized into focused submodules:

- **Authentication**: Token generation, password validation, encryption
- **Sanitization**: Input cleaning for XSS prevention
- **Storage**: Secure client-side storage with proper attributes
- **Validation**: Path, URL, and content validation
- **Encryption**: Advanced encryption with metadata support

## Usage Examples

### Basic Sanitization

```typescript
import { sanitize } from '@/utils/security';

// Prevent XSS in user-generated content
const safeHtml = sanitize.sanitizeHtml(userInput);
```

### Token Generation

```typescript
import { authentication } from '@/utils/security';

// Generate secure CSRF token
const csrfToken = authentication.generateCsrfToken();
```

### Secure Storage

```typescript
import { storage } from '@/utils/security';

// Store sensitive data securely
storage.secureStore.set('auth_token', token, {
  expireInSeconds: 3600,
  secure: true,
  sameSite: 'Strict'
});
```

### Input Validation

```typescript
import { validation } from '@/utils/security';

// Validate user-provided URL
const isSafeUrl = validation.validateUrl(userUrl, {
  allowedDomains: ['trusted-domain.com']
});
```

### Data Encryption

```typescript
import { encryption } from '@/utils/security';

// Encrypt sensitive data with metadata
const encrypted = await encryption.encryptDataWithMetadata(
  sensitiveData,
  encryptionKey,
  { purpose: 'payment-info' }
);
```

## Security Best Practices

1. **Always sanitize user input** before displaying or processing
2. **Use CSRF tokens** for all state-changing operations
3. **Validate all file uploads** with proper content verification
4. **Implement proper error handling** that doesn't expose sensitive information
5. **Store sensitive data** with encryption and proper access controls

## Extending the Security Module

When adding new security utilities:

1. Place them in the appropriate submodule
2. Export them through the central `index.ts`
3. Maintain consistent error handling patterns
4. Add comprehensive JSDoc comments
5. Consider adding related tests

