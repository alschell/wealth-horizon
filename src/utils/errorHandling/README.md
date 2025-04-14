
# Error Handling System

This document outlines the error handling patterns and utilities available in the application.

## Core Principles

1. **Standardized Error Format** - All errors should follow the `ErrorResponse` interface
2. **Contextual Reporting** - Errors should include component context
3. **User-Friendly Messages** - Errors displayed to users should be meaningful
4. **Centralized Handling** - Use the central utilities for consistent handling
5. **Fallback UI** - Always provide fallback UI when errors occur

## Available Utilities

### Error Parsing and Formatting

- `getErrorMessage(error, fallbackMessage?)` - Extract a human-readable message from any error
- `parseError(error)` - Convert any error to a standardized `ErrorResponse`
- `formatZodErrors(zodError)` - Convert Zod validation errors to a simple object

### Error Handling

- `handleError(error, options?)` - Process errors with optional toast notifications
- `logError(error, componentName?)` - Log detailed error information to console
- `createContextualError(message, componentName)` - Create an error with context
- `withErrorHandling(fn, options?)` - HOF to wrap async functions with error handling
- `tryCatch(promise, options?)` - Utility to safely await promises with error handling

### Error Components

- `ErrorFallback` - Standard component for displaying errors
- `ErrorBoundary` - React error boundary to catch rendering errors

## Usage Examples

### Basic Error Handling

```typescript
import { handleError } from '@/utils/errorHandling';

try {
  await riskyOperation();
} catch (error) {
  handleError(error, { 
    context: 'UserProfile',
    fallbackMessage: 'Could not load user profile'
  });
}
```

### With Async Functions

```typescript
import { withErrorHandling } from '@/utils/errorHandling';

const fetchUserSafe = withErrorHandling(fetchUser, {
  context: 'UserProfile',
  fallbackMessage: 'Could not load user profile'
});

// No try/catch needed
const user = await fetchUserSafe(userId);
```

### With Error Boundaries

```tsx
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorFallback from '@/components/shared/ErrorFallback';

<ErrorBoundary
  fallback={({error, resetErrorBoundary}) => (
    <ErrorFallback 
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      message="Could not load dashboard"
    />
  )}
  onError={(error) => logError(error, 'Dashboard')}
>
  <Dashboard />
</ErrorBoundary>
```

### Form Validation with Zod

```tsx
import { validateForm } from '@/utils/validation/formValidationCore';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const handleSubmit = (data) => {
  const result = validateForm(data, schema);
  
  if (result.errors) {
    setErrors(result.errors);
    return;
  }
  
  // Proceed with valid data
  submitForm(result.data);
};
```

## Best Practices

1. Always provide context when handling errors
2. Use error boundaries for component rendering errors
3. Prefer the `tryCatch` utility for async operations
4. Use Zod for form validation when possible
5. Always log errors in development, but be selective in production
6. Provide user-friendly fallback UI for all error states
