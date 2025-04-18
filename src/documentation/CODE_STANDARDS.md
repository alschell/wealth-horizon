
# Code Standards for Enterprise Application

## Form Handling Standards

All forms in the application should use the standardized form components and hooks to ensure consistency:

### Components to Use

1. `StandardForm`: The base form component that provides consistent layout and behavior.
2. `FormField`: A standardized field component that handles input, textarea and other field types.

### Hooks to Use

1. `useStandardForm`: The primary form hook for all forms in the application.

### Example Usage

```tsx
import { useStandardForm } from '@/hooks/useStandardForm';
import { StandardForm } from '@/components/ui/StandardForm';
import { FormField } from '@/components/ui/FormField';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useStandardForm<LoginFormData>({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: (value) => !value ? 'Email is required' : undefined,
      password: (value) => !value ? 'Password is required' : undefined
    },
    onSubmit: async (data) => {
      // Submit logic here
      await loginUser(data);
    },
    successMessage: 'Successfully logged in',
    errorMessage: 'Failed to log in'
  });

  return (
    <StandardForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      formTitle="Login"
      submitLabel="Log in"
    >
      <FormField
        id="email"
        label="Email"
        type="email"
        required
        error={errors.email}
        inputProps={{
          name: "email",
          value: formData.email,
          onChange: handleChange,
          onBlur: handleBlur,
          placeholder: "Enter your email"
        }}
      />
      
      <FormField
        id="password"
        label="Password"
        type="password"
        required
        error={errors.password}
        inputProps={{
          name: "password",
          value: formData.password,
          onChange: handleChange,
          onBlur: handleBlur,
          placeholder: "Enter your password"
        }}
      />
    </StandardForm>
  );
}
```

## Error Handling Standards

1. Always use try-catch blocks for async operations
2. Use the `showError` and `showSuccess` utilities for user feedback
3. Log errors to the console for debugging

## TypeScript Standards

1. Always define interfaces for props and state
2. Use proper return types for functions
3. Avoid using `any` type - use `unknown` if the type is uncertain
4. Use generics for reusable components and utilities

## Component Structure Standards

1. One component per file
2. Group related components in feature folders
3. Keep component files under 200 lines of code
4. Extract complex logic to custom hooks

## Styling Standards

1. Use Tailwind CSS for styling
2. Use the `cn` utility for conditional classNames
3. Keep styling consistent with the design system
4. Use the shadcn/ui components where appropriate
