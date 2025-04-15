
# Utilities Architecture

This directory contains utility functions organized by domain:

## Error Handling

`/errorHandling` - Centralized error management:
- `getErrorMessage` - Extract readable messages from any error
- `parseError` - Convert errors to standardized format
- `handleError` - Process errors with customizable options
- `withErrorHandling` - Higher-order function for try/catch wrapping

## Toast Notifications

`/toast` - Unified toast notification system:
- `showToast` - Base toast function with customization options
- Convenience methods: `showSuccess`, `showError`, `showInfo`, `showWarning`
- Domain-specific toasts (documentation, copy, download operations)

## Validation

`/validation` - Form and input validation:
- Namespaced validations to avoid conflicts:
  - `field` - Field validation (required, patterns, dates, etc.)
  - `input` - Input validation (email, phone, passwords, etc.)
- File and numeric validations
- Composite validation for multiple rules
- Form-level validation helpers

## Security

`/security` - Security-related utilities:
- Data sanitization
- Authentication helpers
- URL validation with security checks

## Usage Examples

```typescript
// Error handling
import { handleError, withErrorHandling } from '@/utils/errorHandling';

try {
  // Code that might throw
} catch (error) {
  handleError(error, { 
    fallbackMessage: 'Custom error message',
    showToast: true 
  });
}

// Wrap async function with error handling
const safeFetch = withErrorHandling(fetchData);
await safeFetch(params);

// Toast notifications
import { showSuccess, showError } from '@/utils/toast';

showSuccess('Operation complete', 'Your data has been saved');
showError('Error', 'Failed to save data');

// Validation
import { field, input, validateComposite } from '@/utils/validation';

const nameError = field.required('John', 'Name');
const emailError = input.email('user@example.com');
const passwordError = validateComposite('Password123', [
  (value) => field.required(value, 'Password'),
  input.password
]);
```
