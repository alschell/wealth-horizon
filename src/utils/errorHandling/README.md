
# Error Handling Architecture

This directory contains a comprehensive error handling system designed to provide consistent error management throughout the application.

## Core Components

### 1. Error Response Standardization

All errors are processed into a standard format:

```typescript
interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
  timestamp?: string;
}
```

### 2. Error Handling Functions

The system provides several key functions:

- `getErrorMessage`: Extract readable messages from any error type
- `parseError`: Convert various error formats into the standard ErrorResponse
- `logError`: Consistently log errors with context to the console
- `handleError`: Process errors with customizable options, including toast notifications
- `withErrorHandling`: HOC for wrapping async functions with error handling
- `tryCatch`: Utility for try/catch operations with standardized error management

### 3. Error Boundaries

React error boundaries to catch UI rendering errors:

- `ErrorBoundary`: Class component implementation 
- `withErrorBoundary`: HOC for wrapping components
- `useErrorBoundary`: Hook for functional components

### 4. Integration with Toast System

Errors can automatically trigger toast notifications with configured severity levels.

## Usage Examples

### Basic Error Handling

```typescript
import { handleError } from '@/utils/errorHandling';

try {
  // Risky operation
} catch (error) {
  handleError(error, { 
    componentName: 'MyComponent',
    fallbackMessage: 'Failed to load data'
  });
}
```

### Wrapping Async Functions

```typescript
import { withErrorHandling } from '@/utils/errorHandling';

const fetchDataSafely = withErrorHandling(fetchData, {
  fallbackMessage: 'Could not retrieve your information'
});

await fetchDataSafely(params);
```

### Using Error Boundaries

```tsx
import { withErrorBoundary } from '@/utils/errorHandling';

// As HOC
const SafeComponent = withErrorBoundary(MyComponent, {
  fallback: <CustomFallback />,
  onError: (error) => logToService(error)
});

// As hook
function MyComponent() {
  const { ErrorBoundaryWrapper } = useErrorBoundary({
    componentName: 'MyComponent'
  });
  
  return (
    <ErrorBoundaryWrapper>
      {/* Component content */}
    </ErrorBoundaryWrapper>
  );
}
```

## Best Practices

1. Always provide component names for context
2. Include fallback messages for user-friendly error presentation
3. Use error boundaries around complex UI sections
4. Leverage the error handler options to customize behavior
5. Remember to handle both sync and async errors appropriately
