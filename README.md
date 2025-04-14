
# Enterprise Financial Platform

A comprehensive financial platform with advanced form handling, error management, and type safety.

## Project Structure

```
src/
├── components/           # UI components
│   ├── ui/               # Reusable UI components
│   ├── team/             # Team-related components
│   ├── trading/          # Trading components
│   ├── compliance/       # Compliance components
│   ├── landing/          # Landing page components
│   └── cashflow/         # Cashflow management components
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── utils/                # Utility functions
│   ├── errorHandling/    # Error handling utilities
│   ├── form/             # Form utilities
│   ├── toast/            # Toast notification utilities
│   └── validation/       # Validation utilities
├── pages/                # Page components
└── context/              # React context providers
```

## Best Practices

### Form Handling

Use the unified form system for consistent form handling across the application:

```typescript
import { useFormSystem } from '@/hooks/useFormSystem';
import { z } from 'zod';

// Define your form schema with zod
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const form = useFormSystem({
    defaultValues: { email: '', password: '' },
    schema: formSchema,
    onSubmit: async (data) => {
      // Handle form submission
    }
  });
  
  return (
    <form onSubmit={form.handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### Error Handling

Use the standardized error handling utilities:

```typescript
import { withErrorHandling } from '@/utils/errorHandling';

// Wrap async functions for consistent error handling
const fetchUserData = withErrorHandling(async (userId: string) => {
  // API call logic
});
```

### Component Design

Follow these component design principles:

1. Use `withStrictTypes` for enhanced type safety
2. Keep components small and focused
3. Leverage composition for complex UI
4. Use the ButtonWithLoading component for all loading states
5. Implement FormField for consistent form UIs

## Available Tools

- **Form System**: Unified form handling with Zod validation
- **Error Handling**: Consistent error management across the app
- **Toast Notifications**: Centralized toast system
- **Type Safety**: Enhanced type checking with withStrictTypes
