
# Enterprise Application Codebase Documentation

This documentation outlines the structure, standards, and best practices for our enterprise application.

## Documentation Structure

- [Code Standards](src/documentation/CODE_STANDARDS.md) - Coding standards and best practices
- [Component Template](src/documentation/COMPONENT_TEMPLATE.tsx) - Template for creating new components

## Project Structure

The application follows a feature-based organization with the following structure:

```
src/
├── components/
│   ├── common/       # Common components used across the application
│   ├── features/     # Feature-specific components
│   │   ├── auth/     # Authentication related components
│   │   ├── users/    # User management components
│   │   └── ...
│   └── ui/           # UI components (shadcn)
├── hooks/            # Custom React hooks
├── context/          # React context providers
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API services
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Code Standards

1. Form Handling
   - Use `useStandardForm` hook for form state management
   - Use `StandardForm` component for form layout
   - Use `FormField` component for individual form fields

2. Error Handling
   - Use try-catch blocks for async operations
   - Display user-friendly error messages
   - Log detailed errors for debugging

3. Component Structure
   - One component per file
   - Group related components in feature folders
   - Extract reusable logic to custom hooks
   - Keep components focused and small

4. TypeScript
   - Define interfaces for all props
   - Use proper return types
   - Avoid using `any` type

5. Styling
   - Use Tailwind CSS for styling
   - Maintain consistent design system
   - Use the `cn` utility for conditional styling

## How to Update This Documentation

This documentation should be updated whenever:
- New standards are established
- New major features are added
- Project structure changes

## Migration Plan

As we standardize the codebase, we will follow a phased approach:
1. Create standards documentation (this document)
2. Implement core utilities and components
3. Gradually migrate existing components to follow the new standards
4. Review and update as needed
