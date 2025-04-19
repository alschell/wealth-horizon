
# Form Controls Hook System

## Overview
This directory contains a comprehensive system for form state management and submission handling.

## Core Components

1. **Types (`types.ts`)**
   - Defines type interfaces for form submission
   - Ensures type safety across the system
   - Provides reusable type definitions

2. **Form State (`useFormState.ts`)**
   - Manages form submission state
   - Handles loading, error, and success states
   - Provides state reset functionality

3. **Reset State (`useResetState.ts`)**
   - Handles form state reset logic
   - Ensures proper cleanup of form state
   - Maintains state consistency

## Usage Example

```typescript
const {
  formSubmissionState,
  resetState,
  createSubmitHandler
} = useFormControls<FormData>();

const handleSubmit = createSubmitHandler(
  async (data) => {
    await submitForm(data);
  },
  {
    successMessage: 'Form submitted successfully',
    resetAfterSubmit: true
  }
);
```
