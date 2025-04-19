# Form System Documentation

This document outlines the form handling system used throughout the application, providing guidelines for consistent implementation and usage.

## Core Components

### 1. Form State Management

The form system uses a consistent state structure across all implementations:

```typescript
interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
}
```

### 2. Main Hooks

- **useUnifiedForm**: Main hook for form management
- **useFormState**: Manages form state
- **useFormHandlers**: Provides field change handlers
- **useFormValidation**: Validates form data
- **useFormSubmission**: Handles form submission
- **useFormErrorHandling**: Provides error handling utilities

### 3. Validation System

The validation system provides:

- Core validation utilities in `src/utils/validation/core.ts`
- Field-specific validators in `src/utils/validation/validators.ts`
- Combined validators for common use cases

## Best Practices

1. **Always use typed form values:**
   ```typescript
   interface FormValues {
     name: string;
     email: string;
     // other fields
   }
   
   const { formState, handleSubmit } = useUnifiedForm<FormValues>({
     initialValues: { name: '', email: '' }
   });
   ```

2. **Prefer declarative validation:**
   ```typescript
   import { validators } from '@/utils/validation';
   
   const validate = (values: FormValues) => {
     const errors: Record<string, string> = {};
     
     const nameError = validators.required('Name')(values.name);
     if (nameError) errors.name = nameError;
     
     const emailError = validators.requiredEmail(values.email);
     if (emailError) errors.email = emailError;
     
     return errors;
   };
   ```

3. **Use error handling consistently:**
   ```typescript
   try {
     // form submission logic
   } catch (error) {
     handleFormError(error);
   }
   ```

4. **Manage complex forms with composition:**
   For complex forms, break down into multiple useUnifiedForm instances or use the individual hooks for custom behavior.

## Error Handling

The form system includes robust error handling:

1. **Validation Errors**: Displayed inline and summarized
2. **Submission Errors**: Captured and displayed as toast notifications
3. **Network Errors**: Handled gracefully with user-friendly messages

## Performance Considerations

1. **Memoize validators** for complex forms
2. **Use field-level validation** for immediate feedback
3. **Debounce validation** for fields that trigger expensive operations
