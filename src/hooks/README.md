
# Hooks Architecture

This directory contains React hooks for handling common UI patterns:

## Form Management

- `useUnifiedForm` - Complete form state and submission management
- `useFormSubmission` - Form submission with success/error handling
- `useFormSubmissionWithFeedback` - Enhanced submission with user feedback
- `enhancedUseForm` - Integration with react-hook-form

## Toast

- `useToast` - Hook for displaying toast notifications

## Usage Examples

```typescript
// Basic form handling with validation
const {
  formData,
  handleInputChange,
  setFieldValue,
  errors,
  setFieldError,
  submitForm,
  isSubmitting
} = useUnifiedForm({
  name: '',
  email: '',
  age: 0
});

// Form validation
const validateUserForm = (data) => {
  let isValid = true;
  
  if (!data.name) {
    setFieldError('name', 'Name is required');
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  await submitForm(
    async (data) => {
      await api.createUser(data);
    },
    {
      validateForm: validateUserForm,
      successMessage: 'User created successfully',
      resetAfterSubmit: true
    }
  );
};
```
